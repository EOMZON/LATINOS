import type { NormalizedLandmark } from '@mediapipe/tasks-vision'

/**
 * 站位引导评估:从身体关键点推导结构化的站位状态,
 * 供语音播报(部位级具体)+ 超大字 + 轮廓部位点亮使用。
 * 阈值集中在 STAND_THRESHOLDS,可按场地实测调整。
 */

export const STAND_THRESHOLDS = {
  /** 关键点可见度下限 */
  visMin: 0.5,
  /** 肩宽(相对画面宽)小于此值 = 离镜头太远 */
  shoulderMin: 0.13,
  /** 肩宽大于此值 = 离镜头太近 */
  shoulderMax: 0.45,
  /** 髋部中心偏离画面中心的容差 */
  centerTol: 0.08,
  /** 脚踝超过此 y 值 = 脚快出画了 */
  footEdgeY: 0.97,
  /** 肩部低于此 y 值 = 上半身快出画了 */
  topEdgeY: 0.03,
}

/** 部位定义:播报名 + landmark 索引 + 轮廓上的相对位置(面向用户的镜像视角) */
export interface StandPart {
  id: string
  /** 播报用词,如「右手」 */
  label: string
  /** 「没看见」类播报用词(脚用「看见」更自然) */
  labelAlt?: string
  lm: number
  /** 轮廓相对坐标:rx 相对框半宽(右为正,用户右手在右),ry 相对框高 */
  spot: { x: number; y: number }
}

export const STAND_PARTS: StandPart[] = [
  { id: 'shoulderR', label: '右肩', lm: 12, spot: { x: 0.55, y: 0.22 } },
  { id: 'shoulderL', label: '左肩', lm: 11, spot: { x: -0.55, y: 0.22 } },
  { id: 'wristR', label: '右手', lm: 16, spot: { x: 0.85, y: 0.45 } },
  { id: 'wristL', label: '左手', lm: 15, spot: { x: -0.85, y: 0.45 } },
  { id: 'hipR', label: '右髋', lm: 24, spot: { x: 0.2, y: 0.52 } },
  { id: 'hipL', label: '左髋', lm: 23, spot: { x: -0.2, y: 0.52 } },
  { id: 'kneeR', label: '右膝', lm: 26, spot: { x: 0.24, y: 0.73 } },
  { id: 'kneeL', label: '左膝', lm: 25, spot: { x: -0.24, y: 0.73 } },
  { id: 'ankleR', label: '右脚', labelAlt: '右脚没有看见', lm: 28, spot: { x: 0.28, y: 0.93 } },
  { id: 'ankleL', label: '左脚', labelAlt: '左脚没有看见', lm: 27, spot: { x: -0.28, y: 0.93 } },
]

export type StandArrow = 'left' | 'right' | 'back' | 'closer' | null

export interface StandStatus {
  ok: boolean
  /** 一句话主提示(超大字) */
  main: string
  /** 次级详细说明(小字) */
  detail: string
  /** 方向图形 */
  arrow: StandArrow
  /** 缺失部位 id(轮廓红点) */
  missing: string[]
  /** 可见部位 id(轮廓点亮) */
  visible: string[]
  /** 语音播报文本(变化去重的 key) */
  speech: string
}

const T = STAND_THRESHOLDS

function missingText(parts: StandPart[]): string {
  return parts.map((p) => p.labelAlt ?? `${p.label}没入镜`).join(',')
}

export function evaluateStand(lm: NormalizedLandmark[] | null): StandStatus {
  const missing: string[] = []
  const visible: string[] = []
  if (!lm) {
    return {
      ok: false,
      main: '站进画面里',
      detail: '让我看到你的全身',
      arrow: null,
      missing: STAND_PARTS.map((p) => p.id),
      visible,
      speech: '站进画面里,让我看到你',
    }
  }
  const missingParts: StandPart[] = []
  for (const p of STAND_PARTS) {
    const pt = lm[p.lm]
    if (!pt || (pt.visibility ?? 0) < T.visMin) {
      missing.push(p.id)
      missingParts.push(p)
    } else {
      visible.push(p.id)
    }
  }

  // 1. 部位缺失优先(最多报两个,避免啰嗦)
  if (missingParts.length > 0) {
    const report = missingParts.slice(0, 2)
    const speech = missingText(report)
    return {
      ok: false,
      main: report[0].labelAlt ?? `${report[0].label}没入镜`,
      detail:
        missingParts.length > 1
          ? `还有 ${missingParts.length - 1} 个部位没看到,调整一下站位`
          : '调整站位,让它进画面',
      arrow: null,
      missing,
      visible,
      speech,
    }
  }

  // 2. 距离(肩宽)
  const shoW = Math.abs(lm[11].x - lm[12].x)
  if (shoW < T.shoulderMin) {
    return {
      ok: false,
      main: '走近一点',
      detail: '离镜头太远了,我看不清你的动作',
      arrow: 'closer',
      missing,
      visible,
      speech: '走近一点,离镜头太远了',
    }
  }
  if (shoW > T.shoulderMax) {
    return {
      ok: false,
      main: '退后一点',
      detail: '离镜头太近了,全身要都入镜',
      arrow: 'back',
      missing,
      visible,
      speech: '退后一点,离镜头太近了',
    }
  }

  // 3. 画面边缘
  if (lm[27].y > T.footEdgeY || lm[28].y > T.footEdgeY) {
    return {
      ok: false,
      main: '退后一点',
      detail: '脚要完全入镜',
      arrow: 'back',
      missing,
      visible,
      speech: '退后一点,脚要完全入镜',
    }
  }
  if (lm[11].y < T.topEdgeY || lm[12].y < T.topEdgeY) {
    return {
      ok: false,
      main: '退后一点',
      detail: '肩膀要完全入镜',
      arrow: 'back',
      missing,
      visible,
      speech: '退后一点,肩膀要完全入镜',
    }
  }

  // 4. 水平位置(镜像视角:landmark x 小 = 人显示在画面右侧 → 提示向左)
  const hipMidX = (lm[23].x + lm[24].x) / 2
  if (hipMidX < 0.5 - T.centerTol) {
    return {
      ok: false,
      main: '向左站一点',
      detail: '站到画面中间来',
      arrow: 'left',
      missing,
      visible,
      speech: '向左站一点',
    }
  }
  if (hipMidX > 0.5 + T.centerTol) {
    return {
      ok: false,
      main: '向右站一点',
      detail: '站到画面中间来',
      arrow: 'right',
      missing,
      visible,
      speech: '向右站一点',
    }
  }

  return {
    ok: true,
    main: '站好了,保持住',
    detail: '全身都入镜了,别动',
    arrow: null,
    missing,
    visible,
    speech: '站好了,准备',
  }
}

export const ARROW_GLYPHS: Record<NonNullable<StandArrow>, string> = {
  left: '←',
  right: '→',
  back: '⇩',
  closer: '⇧',
}
