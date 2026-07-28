import { PoseLandmarker, type NormalizedLandmark } from '@mediapipe/tasks-vision'

/**
 * MediaPipe Pose 33 个关键点中,0–10 是面部(鼻、眼、耳、嘴),
 * 11–32 是身体。本 demo 只保留身体:不画面部点、不画面部连线、
 * 打分特征也只使用身体关键点。
 */
export const FIRST_BODY_INDEX = 11

/** 仅保留两端都在身体上的连线(自动排除肩→耳/眼/鼻等连接) */
export const BODY_CONNECTIONS: ReadonlyArray<{ start: number; end: number }> =
  PoseLandmarker.POSE_CONNECTIONS.filter(
    (c) => c.start >= FIRST_BODY_INDEX && c.end >= FIRST_BODY_INDEX,
  )

export type BodyPart = 'leftArm' | 'rightArm' | 'leftLeg' | 'rightLeg' | 'torso'

export const PART_NAMES: Record<BodyPart, string> = {
  leftArm: '左臂',
  rightArm: '右臂',
  leftLeg: '左腿',
  rightLeg: '右腿',
  torso: '躯干',
}

const PART_GROUPS: Array<[BodyPart, number[]]> = [
  ['leftArm', [11, 13, 15, 17, 19, 21]],
  ['rightArm', [12, 14, 16, 18, 20, 22]],
  ['leftLeg', [23, 25, 27, 29, 31]],
  ['rightLeg', [24, 26, 28, 30, 32]],
]

/** 判断一条骨骼连线属于哪个身体部位(肩部到髋部等归为躯干) */
export function connectionPart(a: number, b: number): BodyPart {
  for (const [part, group] of PART_GROUPS) {
    if (group.includes(a) && group.includes(b)) return part
  }
  return 'torso'
}

/** 22 个身体关键点的归一化表示(索引 i 对应 landmark i+11) */
export interface BodyPoint {
  x: number
  y: number
  v: number
}
export type BodyPose = BodyPoint[]

export function emptyBodyPose(): BodyPose {
  return Array.from({ length: 22 }, () => ({ x: 0, y: 0, v: 0 }))
}

/**
 * 归一化:以双髋中点为原点、肩宽为单位长度(肩宽退化时用躯干长),
 * 消除身高、站位远近的影响。
 */
export function toBodyPose(landmarks: NormalizedLandmark[]): BodyPose {
  const hipL = landmarks[23]
  const hipR = landmarks[24]
  const shoL = landmarks[11]
  const shoR = landmarks[12]
  const origin = { x: (hipL.x + hipR.x) / 2, y: (hipL.y + hipR.y) / 2 }
  let scale = Math.hypot(shoL.x - shoR.x, shoL.y - shoR.y)
  if (scale < 1e-6) {
    const shoMid = { x: (shoL.x + shoR.x) / 2, y: (shoL.y + shoR.y) / 2 }
    scale = Math.hypot(shoMid.x - origin.x, shoMid.y - origin.y) || 1e-6
  }
  const out: BodyPose = []
  for (let i = FIRST_BODY_INDEX; i <= 32; i++) {
    const lm = landmarks[i]
    out.push({
      x: (lm.x - origin.x) / scale,
      y: (lm.y - origin.y) / scale,
      v: lm.visibility ?? 1,
    })
  }
  return out
}

/** 打分所需的关键身体点是否都清晰可见 */
const REQUIRED_BODY = [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28]

export function bodyVisible(landmarks: NormalizedLandmark[], minVis = 0.5): boolean {
  for (const i of REQUIRED_BODY) {
    const lm = landmarks[i]
    if (!lm || (lm.visibility ?? 0) < minVis) return false
  }
  return true
}

/**
 * 特征向量(9 维,弧度):
 * 0 左肩  1 右肩  2 左肘  3 右肘
 * 4 左髋  5 右髋  6 左膝  7 右膝  8 躯干倾斜角
 * 角度用向量夹角计算,对平移/缩放天然不变;左右统一按解剖学左右,
 * 镜像只是显示层变换,参考与实时两侧处理方式一致,不会左右颠倒。
 */
export const FEATURE_NAMES = [
  '左肩',
  '右肩',
  '左肘',
  '右肘',
  '左髋',
  '右髋',
  '左膝',
  '右膝',
  '躯干倾斜',
] as const

type Pt = { x: number; y: number }
type PtAt = (i: number) => Pt

function angleAt(p: PtAt, a: number, b: number, c: number): number {
  const ab = { x: p(a).x - p(b).x, y: p(a).y - p(b).y }
  const cb = { x: p(c).x - p(b).x, y: p(c).y - p(b).y }
  const dot = ab.x * cb.x + ab.y * cb.y
  const cross = ab.x * cb.y - ab.y * cb.x
  return Math.atan2(Math.abs(cross), dot)
}

function torsoTilt(p: PtAt): number {
  const sm = { x: (p(11).x + p(12).x) / 2, y: (p(11).y + p(12).y) / 2 }
  const hm = { x: (p(23).x + p(24).x) / 2, y: (p(23).y + p(24).y) / 2 }
  return Math.atan2(sm.x - hm.x, -(sm.y - hm.y))
}

export function extractFeatures(p: PtAt): number[] {
  return [
    angleAt(p, 13, 11, 23), // 左肩
    angleAt(p, 14, 12, 24), // 右肩
    angleAt(p, 11, 13, 15), // 左肘
    angleAt(p, 12, 14, 16), // 右肘
    angleAt(p, 11, 23, 25), // 左髋
    angleAt(p, 12, 24, 26), // 右髋
    angleAt(p, 23, 25, 27), // 左膝
    angleAt(p, 24, 26, 28), // 右膝
    torsoTilt(p),
  ]
}

/** 从完整 33 点(实时推理结果)提取特征 */
export function featuresFromLandmarks(landmarks: NormalizedLandmark[]): number[] {
  return extractFeatures((i) => landmarks[i])
}

/** 从归一化身体序列(参考帧)提取特征,角度不受归一化影响 */
export function featuresFromBody(body: BodyPose): number[] {
  return extractFeatures((i) => body[i - FIRST_BODY_INDEX])
}

const PART_FEATURES: Record<BodyPart, number[]> = {
  leftArm: [0, 2],
  rightArm: [1, 3],
  leftLeg: [4, 6],
  rightLeg: [5, 7],
  torso: [8],
}

export interface FrameScore {
  /** 0–100 */
  score: number
  /** 各部位平均角度偏差(度) */
  partErrDeg: Record<BodyPart, number>
}

const RAD2DEG = 180 / Math.PI
const FULL_MISS_RAD = Math.PI / 2 // 偏差 90° 记 0 分

export function scoreFrame(liveFeat: number[], refFeat: number[]): FrameScore {
  let sum = 0
  const diffs = liveFeat.map((a, i) => {
    let d = Math.abs(a - refFeat[i])
    if (d > Math.PI) d = 2 * Math.PI - d
    sum += Math.max(0, 100 * (1 - d / FULL_MISS_RAD))
    return d
  })
  const partErrDeg = {} as Record<BodyPart, number>
  for (const [part, idxList] of Object.entries(PART_FEATURES) as Array<[BodyPart, number[]]>) {
    const avg = idxList.reduce((s, i) => s + diffs[i], 0) / idxList.length
    partErrDeg[part] = avg * RAD2DEG
  }
  return { score: sum / liveFeat.length, partErrDeg }
}

/** 部位偏差 → 颜色:<15° 青绿,15–30° 黄,>30° 红 */
export const PART_GOOD_DEG = 15
export const PART_WARN_DEG = 30

export const COLOR_GOOD = '#2dffc4'
export const COLOR_WARN = '#facc15'
export const COLOR_BAD = '#ef4444'

export function partColor(errDeg: number): string {
  if (errDeg < PART_GOOD_DEG) return COLOR_GOOD
  if (errDeg < PART_WARN_DEG) return COLOR_WARN
  return COLOR_BAD
}
