/** Just Dance 式判定:每个关键动作 ±0.3s 窗口内的相似度 → 四档判定
 *  判定色是功能色,三套视觉风格(skin)下保持一致,与主题紫色系分层:
 *  PERFECT 金 / GREAT·GOOD 绿青系 / MISS 红 */

export type Judgment = 'perfect' | 'great' | 'good' | 'miss'

export const JUDGMENT_META: Record<
  Judgment,
  { label: string; color: string; glow: string }
> = {
  perfect: { label: 'PERFECT', color: '#f5c542', glow: 'rgba(245, 197, 66, 0.55)' },
  great: { label: 'GREAT', color: '#2dffc4', glow: 'rgba(45, 255, 196, 0.45)' },
  good: { label: 'GOOD', color: '#67e8f9', glow: 'rgba(103, 232, 249, 0.4)' },
  miss: { label: 'MISS', color: '#ff4d5e', glow: 'rgba(255, 77, 94, 0.4)' },
}

/** score 为关键动作窗口内的平均分;null 表示窗口内未入镜 */
export type Sensitivity = 'strict' | 'standard' | 'relaxed'

export interface JudgmentThresholds {
  /** 四档阈值(0–100 分数) */
  perfect: number
  great: number
  good: number
}

/**
 * 灵敏度预设：严格提高门槛,宽松降低门槛。
 * 解决无摄像头环境无法实标阈值的问题——把标定权交还用户,
 * 用户在本机浏览器跑摄像头即可按手感调难度。
 */
export const SENSITIVITY_PRESETS: Record<
  Sensitivity,
  { label: string; desc: string; thresholds: JudgmentThresholds }
> = {
  strict: { label: '严格', desc: '动作要更准才给高分', thresholds: { perfect: 90, great: 78, good: 60 } },
  standard: { label: '标准', desc: '默认难度', thresholds: { perfect: 85, great: 70, good: 50 } },
  relaxed: { label: '宽松', desc: '新手友好,容错更高', thresholds: { perfect: 78, great: 62, good: 42 } },
}

export function judgmentFor(score: number | null, thresholds?: JudgmentThresholds): Judgment {
  const t = thresholds ?? SENSITIVITY_PRESETS.standard.thresholds
  if (score === null) return 'miss'
  if (score >= t.perfect) return 'perfect'
  if (score >= t.great) return 'great'
  if (score >= t.good) return 'good'
  return 'miss'
}

export function judgmentScoreValue(j: Judgment): number {
  return j === 'perfect' ? 100 : j === 'great' ? 80 : j === 'good' ? 55 : 0
}

/** 结算评级 */
export function ratingFor(avg: number): 'SS' | 'S' | 'A' | 'B' | 'C' {
  if (avg >= 92) return 'SS'
  if (avg >= 85) return 'S'
  if (avg >= 75) return 'A'
  if (avg >= 60) return 'B'
  return 'C'
}

export const RATING_COLORS: Record<string, string> = {
  SS: '#f5c542',
  S: '#ff9f43',
  A: '#2dffc4',
  B: '#67e8f9',
  C: '#ff4d5e',
}

/** 星星 1–5 */
export function starsFor(avg: number): number {
  if (avg >= 90) return 5
  if (avg >= 80) return 4
  if (avg >= 68) return 3
  if (avg >= 50) return 2
  return 1
}

/** 章节通关星(3 星制) */
export function chapterStarsFor(avg: number): number {
  if (avg >= 88) return 3
  if (avg >= 68) return 2
  if (avg >= 50) return 1
  return 0
}

/** 判定是否计入连击 */
export function countsCombo(j: Judgment): boolean {
  return j !== 'miss'
}
