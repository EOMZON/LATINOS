import type { NormalizedLandmark } from '@mediapipe/tasks-vision'

/**
 * One Euro Filter(低通 + 速度自适应):
 * 慢速运动时强平滑(压抖动),快速运动时降低截止频率跟随动作(不拖影)。
 * 参考:Casiez et al. "1€ Filter"(CHI 2012)。
 */
export interface OneEuroParams {
  /** 基础截止频率,越小越平滑 */
  minCutoff: number
  /** 速度系数,越大越跟手 */
  beta: number
  /** 速度信号的截止频率 */
  dcutoff: number
}

export type SmoothLevel = 'off' | 'light' | 'medium' | 'strong'

export const SMOOTH_LEVELS: SmoothLevel[] = ['off', 'light', 'medium', 'strong']

export const SMOOTH_LABELS: Record<SmoothLevel, string> = {
  off: '关',
  light: '轻',
  medium: '中',
  strong: '强',
}

export const SMOOTH_PRESETS: Record<Exclude<SmoothLevel, 'off'>, OneEuroParams> = {
  light: { minCutoff: 1.7, beta: 0.02, dcutoff: 1.0 },
  medium: { minCutoff: 1.0, beta: 0.007, dcutoff: 1.0 },
  strong: { minCutoff: 0.5, beta: 0.003, dcutoff: 1.0 },
}

function alpha(cutoff: number, dt: number): number {
  const tau = 1 / (2 * Math.PI * cutoff)
  return 1 / (1 + tau / dt)
}

class LowPassFilter {
  private y: number | null = null
  filter(x: number, a: number): number {
    if (this.y === null) {
      this.y = x
      return x
    }
    this.y = a * x + (1 - a) * this.y
    return this.y
  }
  reset() {
    this.y = null
  }
}

export class OneEuroFilter {
  private xFilt = new LowPassFilter()
  private dxFilt = new LowPassFilter()
  private lastT: number | null = null
  private xPrev = 0
  private params: OneEuroParams

  constructor(params: OneEuroParams) {
    this.params = params
  }

  reset() {
    this.xFilt.reset()
    this.dxFilt.reset()
    this.lastT = null
  }

  /** t 单位:秒,必须单调递增 */
  filter(x: number, t: number): number {
    if (this.lastT === null) {
      this.lastT = t
      this.xPrev = x
      this.xFilt.filter(x, 1)
      this.dxFilt.filter(0, 1)
      return x
    }
    let dt = t - this.lastT
    this.lastT = t
    if (dt <= 0) dt = 1 / 60
    const dx = (x - this.xPrev) / dt
    this.xPrev = x
    const edx = this.dxFilt.filter(dx, alpha(this.params.dcutoff, dt))
    const cutoff = this.params.minCutoff + this.params.beta * Math.abs(edx)
    return this.xFilt.filter(x, alpha(cutoff, dt))
  }
}

const BODY_COUNT = 22
/** 连续丢失这么多帧后,重现时重置该点滤波器,防止飞线 */
const RESET_AFTER_MISS = 12

/**
 * 对 22 个身体关键点(11–32 号)的 x/y 各维护一个 One Euro Filter。
 * visibility < 0.5 的点该帧跳过更新,避免把噪声吸进滤波器。
 */
export class PoseSmoother {
  private params: OneEuroParams
  private xs: Array<OneEuroFilter | null> = new Array(BODY_COUNT).fill(null)
  private ys: Array<OneEuroFilter | null> = new Array(BODY_COUNT).fill(null)
  private miss: number[] = new Array(BODY_COUNT).fill(0)

  constructor(params: OneEuroParams) {
    this.params = { ...params }
  }

  setParams(p: OneEuroParams) {
    Object.assign(this.params, p)
  }

  reset() {
    this.xs.fill(null)
    this.ys.fill(null)
    this.miss.fill(0)
  }

  /** 原地滤波 landmarks 数组中的身体点,tSec 单位:秒 */
  filterLandmarks(landmarks: NormalizedLandmark[], tSec: number): void {
    for (let i = 0; i < BODY_COUNT; i++) {
      const idx = i + 11
      const lm = landmarks[idx]
      if (!lm) continue
      const v = lm.visibility ?? 0
      if (v < 0.5) {
        this.miss[i] += 1
        if (this.miss[i] >= RESET_AFTER_MISS) {
          this.xs[i] = null
          this.ys[i] = null
        }
        continue
      }
      this.miss[i] = 0
      let fx = this.xs[i]
      let fy = this.ys[i]
      if (!fx || !fy) {
        fx = new OneEuroFilter(this.params)
        fy = new OneEuroFilter(this.params)
        this.xs[i] = fx
        this.ys[i] = fy
      }
      const nx = fx.filter(lm.x, tSec)
      const ny = fy.filter(lm.y, tSec)
      landmarks[idx] = { ...lm, x: nx, y: ny }
    }
  }
}
