import { emptyActivation, type MuscleActivation, type MuscleId } from './muscleMap'

/**
 * 拉丁健身 · 能量与训练负荷模型(L1)
 *
 * 设计原则(诚实 + 克制):
 * - 卡路里是「估算值」,由运动强度(MET)× 体重 × 时长推导,非医学精度;
 *   UI 必须带「估算 · 非医学精度」标注。
 * - 运动强度由逐帧身体关节位移幅度估算(摄像头能稳定给出的信号),
 *   映射到 MET(代谢当量),再换算卡路里。
 * - 肌肉负荷取「本节每帧目标发力」的时间均值(来自肌肉发力地图的编排标注),
 *   回答「这节练到了哪里」,而非声称实测肌电。
 */

export type FitnessGoal = 'burn' | 'tone' | 'flow'

export const GOALS: FitnessGoal[] = ['burn', 'tone', 'flow']

export const GOAL_META: Record<
  FitnessGoal,
  { label: string; desc: string; /** 该目标下的基准 MET(用于目标文案,非逐帧) */ met: number; suggestedMin: number }
> = {
  burn: { label: '燃脂', desc: '中高强度持续律动,把心率顶上去', met: 7.2, suggestedMin: 12 },
  tone: { label: '塑形', desc: '控制发力,雕琢臀腿核心线条', met: 5.4, suggestedMin: 10 },
  flow: { label: '律动放松', desc: '低强度跟随,活络筋骨舒展身体', met: 3.8, suggestedMin: 8 },
}

/** 体重(localStorage,默认 60kg;用于卡路里精度) */
const WEIGHT_KEY = 'latin-dance-game:weight-kg'

export function getWeightKg(): number {
  try {
    const v = Number(localStorage.getItem(WEIGHT_KEY))
    return v > 0 && v < 300 ? v : 60
  } catch {
    return 60
  }
}

export function setWeightKg(kg: number) {
  try {
    localStorage.setItem(WEIGHT_KEY, String(Math.max(30, Math.min(200, Math.round(kg)))))
  } catch {
    // 忽略
  }
}

/** 逐帧运动强度 0..1:身体关节归一化坐标的平均位移 / 参考幅度(0.035 ≈ 剧烈律动) */
export function motionIntensity(
  cur: ReadonlyArray<{ x: number; y: number }>,
  prev: ReadonlyArray<{ x: number; y: number }> | null,
): number {
  if (!prev || prev.length === 0 || cur.length === 0) return 0
  const n = Math.min(cur.length, prev.length)
  let sum = 0
  for (let i = 0; i < n; i++) {
    const a = cur[i]
    const b = prev[i]
    if (!a || !b) continue
    sum += Math.hypot(a.x - b.x, a.y - b.y)
  }
  const mean = sum / n
  return Math.max(0, Math.min(1, mean / 0.035))
}

/** MET 曲线:静息 ~3,满强度 ~10(幂 0.8 让中等律动也有明显强度) */
export function metFromIntensity(it: number): number {
  const x = Math.max(0, Math.min(1, it))
  return 3 + 7 * Math.pow(x, 0.8)
}

export interface FitnessSummary {
  /** 估算卡路里 */
  kcal: number
  /** 有效运动秒数(强度 > 阈值的累计时间) */
  activeSeconds: number
  /** 完成的关键动作数(判定非未入镜) */
  moveCount: number
  /** 平均强度 0..1 */
  avgIntensity: number
  /** 本节肌肉负荷(时间均值,编排标注) */
  muscleLoad: MuscleActivation
  /** 估算所用体重(kg) */
  weightKg: number
}

/**
 * 训练过程累加器。每帧 tick(dt, 身体坐标, 本节目标发力);
 * 每完成一个关键动作 addMove()。结算时 summary()。
 */
export class FitnessTracker {
  private kcal = 0
  private activeSeconds = 0
  private moveCount = 0
  private itSum = 0
  private itN = 0
  private muscleSum: MuscleActivation = emptyActivation()
  private muscleN = 0
  private last: ReadonlyArray<{ x: number; y: number }> | null = null
  private curIntensity = 0
  private weightKg: number

  constructor(weightKg = 60) {
    this.weightKg = weightKg
  }

  tick(dt: number, body: ReadonlyArray<{ x: number; y: number }> | null, muscle?: MuscleActivation) {
    if (!body) {
      this.last = null
      this.curIntensity = 0
      return
    }
    const it = motionIntensity(body, this.last)
    this.last = body
    this.curIntensity = it
    const met = metFromIntensity(it)
    // 卡路里 = MET × 体重(kg) × 时长(h)
    this.kcal += met * this.weightKg * (dt / 3600)
    this.itSum += it
    this.itN += 1
    if (it > 0.06) this.activeSeconds += dt
    if (muscle) {
      for (const k of Object.keys(muscle) as MuscleId[]) {
        this.muscleSum[k] += muscle[k]
      }
      this.muscleN += 1
    }
  }

  /** 实时强度(当前帧),用于 HUD 强度条 */
  get liveIntensity(): number {
    return this.curIntensity
  }

  /** HUD 节流同步用的轻量快照(不产生 MuscleActivation 对象) */
  snapshotKcal(): number {
    return this.kcal
  }

  snapshotIntensity(): number {
    return this.curIntensity
  }

  addMove() {
    this.moveCount += 1
  }

  summary(): FitnessSummary {
    const muscleLoad = emptyActivation()
    if (this.muscleN > 0) {
      for (const k of Object.keys(muscleLoad) as MuscleId[]) {
        muscleLoad[k] = this.muscleSum[k] / this.muscleN
      }
    }
    return {
      kcal: this.kcal,
      activeSeconds: this.activeSeconds,
      moveCount: this.moveCount,
      avgIntensity: this.itN > 0 ? this.itSum / this.itN : 0,
      muscleLoad,
      weightKg: this.weightKg,
    }
  }
}
