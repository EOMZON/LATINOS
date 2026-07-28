import type { KeyPose } from '../lib/keyPoses'

/**
 * 教学分段(Break It Down):把参考序列按关键姿态自动切成若干教学段。
 * 纯函数,不依赖 React / DOM,参数都在 LESSON_DEFAULTS 里可调。
 *
 * 规则:
 * - 每段 1–3 个关键动作(maxKeys),长度 4–8s(minLen–maxLen);
 * - 段尾在最后一个关键动作之后留 padEnd 秒缓冲,段与段首尾相接、覆盖全曲;
 * - 关键动作之间的长间隙(没有关键动作的部分)按 maxLen 直接切;
 * - 末尾不足 minLen 的尾巴并入上一段;
 * - 口令(cues)目前是通用占位文案(「第 N 个动作,定格住」),
 *   以后接入动作词汇表(纽约步 / 定点转等)时只换这里的文案生成。
 */

export interface LessonCue {
  /** 秒,全曲绝对时间 */
  t: number
  text: string
}

export interface LessonSegment {
  index: number
  /** 秒,全曲绝对时间,首尾相接 */
  start: number
  end: number
  /** 本段包含的关键动作(绝对时间) */
  keyPoses: KeyPose[]
  title: string
  /** 进入本段演示时的语音口令 */
  intro: string
  /** 跟跳过程中的关键口令(占位,绝对时间) */
  cues: LessonCue[]
}

export const LESSON_DEFAULTS = {
  /** 段最短长度(秒) */
  minLen: 4,
  /** 段最长长度(秒) */
  maxLen: 8,
  /** 每段最多关键动作数 */
  maxKeys: 3,
  /** 段尾缓冲(秒):最后一个关键动作之后留多少收尾时间 */
  padEnd: 1.2,
} as const

export interface LessonPlanOptions {
  minLen?: number
  maxLen?: number
  maxKeys?: number
  padEnd?: number
}

export function buildLessonPlan(
  duration: number,
  keyPoses: KeyPose[],
  opts: LessonPlanOptions = {},
): LessonSegment[] {
  const minLen = opts.minLen ?? LESSON_DEFAULTS.minLen
  const maxLen = opts.maxLen ?? LESSON_DEFAULTS.maxLen
  const maxKeys = opts.maxKeys ?? LESSON_DEFAULTS.maxKeys
  const padEnd = opts.padEnd ?? LESSON_DEFAULTS.padEnd

  const sorted = [...keyPoses].sort((a, b) => a.t - b.t)
  const segments: LessonSegment[] = []
  let segStart = 0
  let i = 0

  while (segStart < duration - 0.4) {
    // 收集本段关键动作:时间窗内、最多 maxKeys 个
    const keys: KeyPose[] = []
    while (i < sorted.length && keys.length < maxKeys && sorted[i].t < segStart + maxLen - padEnd) {
      if (sorted[i].t >= segStart) keys.push(sorted[i])
      i += 1
    }

    let end: number
    if (keys.length > 0) {
      end = Math.min(keys[keys.length - 1].t + padEnd, segStart + maxLen, duration)
      if (end - segStart < minLen) end = Math.min(segStart + minLen, duration)
    } else {
      // 没有关键动作的长间隙:按 maxLen 切
      end = Math.min(segStart + maxLen, duration)
    }
    // 末尾不足 minLen 的尾巴并入本段
    if (duration - end < minLen) end = duration

    const index = segments.length
    segments.push({
      index,
      start: segStart,
      end,
      keyPoses: keys,
      title: `第 ${index + 1} 段`,
      intro:
        keys.length > 0
          ? `第 ${index + 1} 段,${keys.length} 个关键动作,先看老师做`
          : `第 ${index + 1} 段,先看老师做`,
      cues: keys.map((k, j) => ({ t: k.t, text: `第 ${j + 1} 个动作,定格住` })),
    })
    segStart = end
  }

  return segments
}

/** 秒 → "12s" 段时长标签 */
export function segTimeLabel(seg: LessonSegment): string {
  return `${seg.start.toFixed(0)}s – ${seg.end.toFixed(0)}s`
}
