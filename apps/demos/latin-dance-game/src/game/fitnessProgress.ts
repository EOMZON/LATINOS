import type { FitnessGoal } from './fitness'

/** 每日打卡:按本地日期记录一次训练小结 */
export interface FitnessCheckin {
  /** 本地日期 YYYY-MM-DD */
  date: string
  kcal: number
  activeSeconds: number
  /** 平均强度 0..1 */
  avgIntensity: number
  goal: FitnessGoal
  /** 记录时刻(ms),用于排序与去重 */
  ts: number
}

const KEY = 'latin-dance-game:fitness-checkins'

function dateKey(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function todayKey(): string {
  return dateKey(new Date())
}

/** 读取全部打卡(按时间升序) */
export function getCheckins(): FitnessCheckin[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const arr = JSON.parse(raw) as FitnessCheckin[]
    if (!Array.isArray(arr)) return []
    return arr.sort((a, b) => a.ts - b.ts)
  } catch {
    return []
  }
}

function save(list: FitnessCheckin[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(list))
  } catch {
    // 忽略存储异常
  }
}

/**
 * 记录一次训练。同一天多次训练会覆盖当天记录(以最后一次为准)。
 * 返回写入后的完整列表,便于调用方即时取 streak。
 */
export function recordFitnessCheckin(entry: {
  kcal: number
  activeSeconds: number
  avgIntensity: number
  goal: FitnessGoal
}): FitnessCheckin[] {
  const list = getCheckins()
  const date = todayKey()
  const next: FitnessCheckin = { date, ts: Date.now(), ...entry }
  const idx = list.findIndex((c) => c.date === date)
  if (idx >= 0) list[idx] = next
  else list.push(next)
  save(list)
  return list
}

export function getTodayCheckin(): FitnessCheckin | null {
  const t = todayKey()
  return getCheckins().find((c) => c.date === t) ?? null
}

/**
 * 连续打卡天数:从今天往回数连续有记录的天数;
 * 今天还没练则视为「待续」,从昨天起算(连续不断即不归零)。
 */
export function getStreak(): number {
  const dates = new Set(getCheckins().map((c) => c.date))
  if (dates.size === 0) return 0
  const d = new Date()
  if (!dates.has(dateKey(d))) d.setDate(d.getDate() - 1)
  let streak = 0
  while (dates.has(dateKey(d))) {
    streak++
    d.setDate(d.getDate() - 1)
  }
  return streak
}

/** 上一次训练(不含今天的会话),用于结算屏「比上次」趋势 */
export function getPrevSession(): FitnessCheckin | null {
  const list = getCheckins()
  if (list.length === 0) return null
  const t = todayKey()
  // 今天之前的最后一条
  const beforeToday = list.filter((c) => c.date !== t)
  if (beforeToday.length > 0) return beforeToday[beforeToday.length - 1]
  // 若只有今天一条,退化为「今天上一条」
  return list.length >= 2 ? list[list.length - 2] : null
}
