import type { Judgment } from './judgments'
import type { ChapterDef, ModeDef } from '../modes/registry'

export type Screen =
  | { name: 'title' }
  | { name: 'onboarding' }
  | { name: 'modes' }
  | { name: 'game'; mode: ModeDef; chapter?: ChapterDef }
  | { name: 'results'; result: GameResult; mode: ModeDef; chapter?: ChapterDef }

export interface KeyResult {
  /** 关键动作时刻(秒) */
  t: number
  /** ±0.3s 窗口内平均分;null = 窗口内未入镜 */
  avg: number | null
  judgment: Judgment
}

export interface GameResult {
  /** 全程可计分帧的平均分(0–100) */
  avg: number
  judgments: Record<Judgment, number>
  maxCombo: number
  keyResults: KeyResult[]
  /** 闯关失败 */
  failed?: boolean
  /** 闯关中闯到的关数 */
  clearedCount?: number
  totalCount?: number
  /** 章节模式:本次得分对应的星数(0–3) */
  chapterStars?: number
  /** 章节模式:总章数 */
  chapterCount?: number
  /** 章节模式:下一章(存在且本章 ≥1 星时,结算屏显示「继续下一章」) */
  nextChapter?: ChapterDef
}

export const ONBOARDING_KEY = 'latin-dance-game:onboarding-done'

export function onboardingDone(): boolean {
  try {
    return localStorage.getItem(ONBOARDING_KEY) === '1'
  } catch {
    return false
  }
}

export function setOnboardingDone() {
  try {
    localStorage.setItem(ONBOARDING_KEY, '1')
  } catch {
    // 忽略
  }
}
