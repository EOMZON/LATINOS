import type { DanceFeatures } from '../lib/danceFeatures'

/**
 * 肌肉发力地图 L1(标注驱动,非实时肌电):
 * 回答「这个动作该用哪里发力」——由参考动作的 3D 特征(重心脚/胯部旋转)
 * 按拉丁教学常识推导各肌群的目标发力强度,跟练时同步高亮。
 *
 * 诚实标注:这是教学标注(该发力的地方),不是从摄像头实测的肌肉激活;
 * UI 上必须带「教学标注 · 非实时肌电」字样(调研结论:2026 年无人能
 * 从普通摄像头实时测真实肌肉激活,健身产品也没有做到)。
 *
 * 拉丁(伦巴)发力常识(L1 配方):
 * - 重心腿一侧:臀中肌/臀大肌稳定骨盆,股四头+小腿三头肌承重推地;
 * - 胯部旋转(库克拉恰):腹斜肌+核心主导,旋转幅度越大强度越高;
 * - 胯部快速转换(角速度大):核心+臀部同时加强;
 * - 手臂造型:肩与手臂保持低强度张力(拉丁架型)。
 */

export type MuscleId =
  | 'shoulderL' | 'shoulderR'
  | 'armL' | 'armR'
  | 'abs'
  | 'obliqueL' | 'obliqueR'
  | 'quadL' | 'quadR'
  | 'calfL' | 'calfR'
  | 'upperBack'
  | 'gluteL' | 'gluteR'
  | 'hamL' | 'hamR'

export type MuscleActivation = Record<MuscleId, number>

export const MUSCLE_NAMES: Record<MuscleId, string> = {
  shoulderL: '左肩', shoulderR: '右肩',
  armL: '左臂', armR: '右臂',
  abs: '腹直肌',
  obliqueL: '左腹斜', obliqueR: '右腹斜',
  quadL: '左股四头', quadR: '右股四头',
  calfL: '左小腿', calfR: '右小腿',
  upperBack: '上背',
  gluteL: '左臀', gluteR: '右臀',
  hamL: '左腘绳', hamR: '右腘绳',
}

export function emptyActivation(): MuscleActivation {
  return {
    shoulderL: 0, shoulderR: 0, armL: 0, armR: 0,
    abs: 0, obliqueL: 0, obliqueR: 0,
    quadL: 0, quadR: 0, calfL: 0, calfR: 0,
    upperBack: 0, gluteL: 0, gluteR: 0, hamL: 0, hamR: 0,
  }
}

/** 拉丁架型基线:肩臂背保持低强度张力 */
const FRAME_TONE = 0.22

/** 胯部旋转达到该幅度(度)时腹斜肌记满强度 */
const YAW_FULL_DEG = 35
/** 胯部角速度达到该值(度/秒)时核心/臀加成记满 */
const YAW_VEL_FULL = 120

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))

/**
 * 由参考侧特征推导目标发力(L1 核心)。
 * @param hipYawDeg 参考髋线朝向角(度)
 * @param hipYawVelDegS 髋线角速度(度/秒,调用方帧差算好传入;不可得传 0)
 * @param weightFoot 参考重心脚
 */
export function activationFromRef(
  hipYawDeg: number,
  hipYawVelDegS: number,
  weightFoot: 'left' | 'right' | 'both',
): MuscleActivation {
  const a = emptyActivation()

  // 拉丁架型:肩臂背低强度张力
  a.shoulderL = a.shoulderR = a.armL = a.armR = FRAME_TONE
  a.upperBack = FRAME_TONE + 0.1

  // 核心:胯部旋转幅度 → 腹斜肌(向右转 = 左腹斜收缩带动,反之亦然)
  const yawAmp = clamp01(Math.abs(hipYawDeg) / YAW_FULL_DEG)
  const vel = clamp01(Math.abs(hipYawVelDegS) / YAW_VEL_FULL)
  a.abs = 0.3 + 0.4 * Math.max(yawAmp, vel)
  if (hipYawDeg > 4) {
    a.obliqueL = 0.35 + 0.65 * yawAmp
    a.obliqueR = 0.2 + 0.3 * yawAmp
  } else if (hipYawDeg < -4) {
    a.obliqueR = 0.35 + 0.65 * yawAmp
    a.obliqueL = 0.2 + 0.3 * yawAmp
  } else {
    a.obliqueL = a.obliqueR = 0.25 + 0.3 * vel
  }

  // 重心腿链:臀(稳定骨盆)+ 股四头(承重)+ 小腿(推地);快速转换时加成
  const legBoost = 0.15 * vel
  const strong = (side: 'L' | 'R') => {
    a[`glute${side}`] = clamp01(0.75 + legBoost)
    a[`quad${side}`] = clamp01(0.6 + legBoost)
    a[`calf${side}`] = clamp01(0.55 + legBoost)
    a[`ham${side}`] = 0.35
  }
  const light = (side: 'L' | 'R') => {
    a[`glute${side}`] = 0.25
    a[`quad${side}`] = 0.2
    a[`calf${side}`] = 0.25
    a[`ham${side}`] = 0.15
  }
  if (weightFoot === 'left') {
    strong('L')
    light('R')
  } else if (weightFoot === 'right') {
    strong('R')
    light('L')
  } else {
    // 双脚均分:两侧中等
    for (const s of ['L', 'R'] as const) {
      a[`glute${s}`] = 0.45
      a[`quad${s}`] = 0.4
      a[`calf${s}`] = 0.35
      a[`ham${s}`] = 0.2
    }
  }
  return a
}

/** 参考缺 world 数据时的兜底:只给拉丁架型基线(肩臂背张力 + 核心常量) */
export function baselineActivation(): MuscleActivation {
  const a = emptyActivation()
  a.shoulderL = a.shoulderR = a.armL = a.armR = FRAME_TONE
  a.upperBack = FRAME_TONE + 0.1
  a.abs = 0.3
  a.obliqueL = a.obliqueR = 0.25
  return a
}

/** 发力地图开关(localStorage 持久化,默认开——用户认为这是产品最本质部分) */
const STORAGE_KEY = 'latin-dance-game:muscle-map'

export function readMuscleMapEnabled(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== '0'
  } catch {
    return true
  }
}

export function saveMuscleMapEnabled(on: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, on ? '1' : '0')
  } catch {
    // 忽略
  }
}

/** 实时侧对照(可选增强):把实时特征也换算成发力,用于「你现在的发力」对比 */
export function activationFromLive(f: DanceFeatures, hipYawVelDegS: number): MuscleActivation {
  return activationFromRef(f.hipYawDeg, hipYawVelDegS, f.weightFoot)
}
