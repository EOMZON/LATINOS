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
export function judgmentFor(score: number | null): Judgment {
  if (score === null) return 'miss'
  if (score >= 85) return 'perfect'
  if (score >= 70) return 'great'
  if (score >= 50) return 'good'
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
