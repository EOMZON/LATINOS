import type { BodyPart } from '../lib/bodyPose'
import { PART_NAMES } from '../lib/bodyPose'
import type { DanceFeatures } from '../lib/danceFeatures'
import { voice } from './voice'

/**
 * 游戏中教练播报:把 3D 特征(胯部旋转/重心脚)和 2D 部位偏差
 * 变成一句一句的口头提示。规则:
 * - 问题要持续 sustainMs 才播(防单帧误报);
 * - 全局最短间隔 globalGapMs,同一类提示 perTipGapMs 内不重复;
 * - 一次只报最重要的一条(重心 > 胯 > 部位);
 * - 语音关掉时自动静默(voice.say 内部处理)。
 */

const SUSTAIN_MS = 1000
const GLOBAL_GAP_MS = 4000
const PER_TIP_GAP_MS = 9000

/** 胯部旋转幅度偏差阈值(度) */
export const HIP_YAW_TOL_DEG = 25
/** 部位角度偏差播报阈值(度,略高于染红阈值 30°) */
const PART_TIP_DEG = 35

type TipKind = 'foot' | 'hip' | `part:${BodyPart}`

interface Candidate {
  kind: TipKind
  text: string
  /** 数值越大越优先 */
  priority: number
}

export interface CoachInput {
  /** 实时特征(平滑后);无识别为 null */
  live: DanceFeatures | null
  /** 参考侧特征(当前帧对应);预计算没有 world 时为 null */
  refHipYawDeg: number | null
  refWeightFoot: 'left' | 'right' | 'both' | null
  /** 2D 各部位平均角度偏差(度);无有效打分窗口时为 null */
  partErrDeg: Record<BodyPart, number> | null
}

const FOOT_NAMES = { left: '左脚', right: '右脚' } as const

export class GameCoach {
  private since = new Map<TipKind, number>()
  private lastSaid = new Map<TipKind, number>()
  private lastGlobal = 0

  reset() {
    this.since.clear()
    this.lastSaid.clear()
    this.lastGlobal = 0
  }

  /** 每帧调用;内部自己节流 */
  tick(input: CoachInput, now: number = performance.now()) {
    const candidates = this.collect(input)
    const active = new Set(candidates.map((c) => c.kind))
    // 问题消失就清计时,下次出现重新累计
    for (const k of [...this.since.keys()]) {
      if (!active.has(k)) this.since.delete(k)
    }
    for (const c of candidates) {
      if (!this.since.has(c.kind)) this.since.set(c.kind, now)
    }
    if (now - this.lastGlobal < GLOBAL_GAP_MS) return
    // 按优先级挑一条已持续足够久、且没在冷却期的
    const ready = candidates
      .filter((c) => now - (this.since.get(c.kind) ?? now) >= SUSTAIN_MS)
      .filter((c) => now - (this.lastSaid.get(c.kind) ?? -Infinity) >= PER_TIP_GAP_MS)
      .sort((a, b) => b.priority - a.priority)
    const pick = ready[0]
    if (!pick) return
    this.lastGlobal = now
    this.lastSaid.set(pick.kind, now)
    voice.say(pick.text)
  }

  private collect(input: CoachInput): Candidate[] {
    const out: Candidate[] = []
    const { live, refHipYawDeg, refWeightFoot, partErrDeg } = input
    if (live) {
      // 重心脚不对(参考明确单脚承重、实时在另一只脚上)
      if (
        refWeightFoot &&
        refWeightFoot !== 'both' &&
        live.weightFoot !== 'both' &&
        live.weightFoot !== refWeightFoot
      ) {
        out.push({ kind: 'foot', text: `重心换到${FOOT_NAMES[refWeightFoot]}`, priority: 30 })
      }
      // 胯部旋转幅度不够 / 过头
      if (refHipYawDeg !== null) {
        const err = live.hipYawDeg - refHipYawDeg
        if (Math.abs(err) > HIP_YAW_TOL_DEG) {
          const text =
            Math.abs(live.hipYawDeg) < Math.abs(refHipYawDeg)
              ? '转胯幅度再大一点'
              : '胯转过了,收一点'
          out.push({ kind: 'hip', text, priority: 20 })
        }
      }
    }
    if (partErrDeg) {
      // 只报最差的一个部位,避免连环轰炸
      let worst: BodyPart | null = null
      let worstErr = PART_TIP_DEG
      for (const [part, err] of Object.entries(partErrDeg) as Array<[BodyPart, number]>) {
        if (err > worstErr) {
          worst = part
          worstErr = err
        }
      }
      if (worst) {
        out.push({ kind: `part:${worst}`, text: `注意${PART_NAMES[worst]}的动作`, priority: 10 })
      }
    }
    return out
  }
}
