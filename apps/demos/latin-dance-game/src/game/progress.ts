/** 章节进度持久化(localStorage):每章最高星数 + 解锁进度 */

export interface ChapterProgress {
  /** stars[i] = 第 i 章历史最高星(0–3) */
  stars: number[]
  /** 已解锁到第几章(含,0 起) */
  unlocked: number
}

const key = (modeId: string) => `latin-dance-game:chapters:v1:${modeId}`

export function loadChapterProgress(modeId: string, chapterCount: number): ChapterProgress {
  const fallback: ChapterProgress = {
    stars: new Array(chapterCount).fill(0),
    unlocked: 0,
  }
  try {
    const text = localStorage.getItem(key(modeId))
    if (!text) return fallback
    const raw = JSON.parse(text) as { stars?: unknown; unlocked?: unknown }
    const stars = new Array(chapterCount).fill(0)
    if (Array.isArray(raw.stars)) {
      for (let i = 0; i < chapterCount; i++) {
        const s = Number(raw.stars[i])
        stars[i] = Number.isFinite(s) ? Math.max(0, Math.min(3, s)) : 0
      }
    }
    const unlocked = Math.max(
      0,
      Math.min(chapterCount - 1, Number(raw.unlocked) || 0),
    )
    return { stars, unlocked }
  } catch {
    return fallback
  }
}

/** 记录一章的成绩,返回更新后的进度;拿到 ≥1 星才解锁下一章 */
export function recordChapterResult(
  modeId: string,
  chapterCount: number,
  chapterIndex: number,
  stars: number,
): ChapterProgress {
  const p = loadChapterProgress(modeId, chapterCount)
  p.stars[chapterIndex] = Math.max(p.stars[chapterIndex], stars)
  if (stars >= 1 && chapterIndex === p.unlocked && p.unlocked < chapterCount - 1) {
    p.unlocked += 1
  }
  try {
    localStorage.setItem(key(modeId), JSON.stringify(p))
  } catch {
    // 配额不足仅本次不存
  }
  return p
}
