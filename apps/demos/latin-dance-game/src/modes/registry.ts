/**
 * 模式注册表:新增一个跟练模式 = 把示范视频放进 public/references/ + 在这里加一条记录。
 * 详见 README「如何新增一个模式」。
 */

export type DanceStyle = '伦巴' | '恰恰' | '桑巴' | '牛仔'

export type PlayKind = 'follow' | 'chapters' | 'challenge' | 'free' | 'live'

export const KIND_LABELS: Record<PlayKind, string> = {
  follow: '全程跟练',
  chapters: '章节练习',
  challenge: '闯关',
  free: '自由跳',
  live: '直播',
}

export interface ModeDef {
  id: string
  name: string
  /** 舞种标签;自由/直播模式为 null */
  dance: DanceStyle | null
  /** 难度 1–3 星 */
  difficulty: 1 | 2 | 3
  kind: PlayKind
  /** 参考视频(public 下相对路径),自由模式不需要 */
  referenceId?: string
  /** 一句话玩法说明 */
  description: string
  /** 占位卡:不可玩,点击显示解锁说明 */
  placeholder?: boolean
}

/** 默认示范:46.5s 伦巴基本步 */
export const DEFAULT_REF_ID = 'references/58_raw.mp4'

export function referenceUrl(referenceId: string): string {
  return `${import.meta.env.BASE_URL}${referenceId}`
}

export const MODES: ModeDef[] = [
  {
    id: 'follow-58',
    name: '58 号示范 · 全程跟练',
    dance: '伦巴',
    difficulty: 2,
    kind: 'follow',
    referenceId: DEFAULT_REF_ID,
    description: '跟着老师示范完整跳一遍,关键动作逐个判定,看你能拿多少 PERFECT。',
  },
  {
    id: 'chapters-58',
    name: '分段章节练习',
    dance: '伦巴',
    difficulty: 1,
    kind: 'chapters',
    referenceId: DEFAULT_REF_ID,
    description: '把 58 号示范切成 5 个短章节,逐段练习、逐段拿星,全部解锁算通关。',
  },
  {
    id: 'challenge-58',
    name: '闯关模式',
    dance: '伦巴',
    difficulty: 3,
    kind: 'challenge',
    referenceId: DEFAULT_REF_ID,
    description: '每个关键动作都是一道关卡,判定 MISS 三次就失败,试试你能闯到第几关。',
  },
  {
    id: 'free',
    name: '自由模式',
    dance: null,
    difficulty: 1,
    kind: 'free',
    description: '没有参考、不打分,只显示你的骨骼线条,想怎么跳就怎么跳。',
  },
  {
    id: 'live',
    name: '直播模式',
    dance: null,
    difficulty: 1,
    kind: 'live',
    referenceId: DEFAULT_REF_ID,
    description: '绿幕骨骼输出供 OBS 色度抠像,叠加实时判定特效,直播给观众看。',
  },
  {
    id: 'placeholder-chacha',
    name: '恰恰基本步 · 待补充',
    dance: '恰恰',
    difficulty: 1,
    kind: 'follow',
    placeholder: true,
    description: '把恰恰示范视频放进 public/references/ 并在注册表加一条记录即可解锁。',
  },
  {
    id: 'placeholder-jive',
    name: '牛仔 · 待补充',
    dance: '牛仔',
    difficulty: 1,
    kind: 'follow',
    placeholder: true,
    description: '把牛仔示范视频放进 public/references/ 并在注册表加一条记录即可解锁。',
  },
]

/** 章节练习:把参考按固定时长切章 */
export const CHAPTER_LENGTH_SEC = 9

export interface ChapterDef {
  index: number
  start: number
  end: number
}

export function splitChapters(duration: number): ChapterDef[] {
  const out: ChapterDef[] = []
  let start = 0
  let i = 0
  while (start < duration - 1) {
    out.push({ index: i, start, end: Math.min(start + CHAPTER_LENGTH_SEC, duration) })
    start += CHAPTER_LENGTH_SEC
    i += 1
  }
  return out
}
