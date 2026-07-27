import type { ReferenceSequence } from './reference'

/** 关键动作帧:动作方向转换 / 定格处(运动能量局部极小点) */
export interface KeyPose {
  /** 秒,相对序列起点 */
  t: number
  /** 在 samples 中的下标 */
  index: number
  /** 平滑后的运动能量 */
  energy: number
}

/**
 * 关键姿态提取:
 * 1. 每帧能量 = 相邻帧 22 个身体点(归一化坐标)的平均位移速度
 * 2. 5 帧滑动平均平滑能量曲线
 * 3. 取局部极小点(比左右邻居都低)作为候选
 * 4. 贪心加最小间隔约束(minInterval,默认 0.5s):窗口内取能量最低者
 * 5. 始终包含起始姿态
 */
export function extractKeyPoses(seq: ReferenceSequence, minInterval = 0.5): KeyPose[] {
  const samples = seq.samples
  const n = samples.length
  if (n < 3) return []

  // 1. 能量
  const energy = new Array<number>(n).fill(Infinity)
  for (let i = 1; i < n; i++) {
    const a = samples[i - 1]
    const b = samples[i]
    if (!a.ok || !b.ok) continue
    const dt = b.t - a.t
    if (dt <= 0) continue
    let sum = 0
    let cnt = 0
    for (let k = 0; k < 22; k++) {
      const pa = a.body[k]
      const pb = b.body[k]
      if (pa.v < 0.3 || pb.v < 0.3) continue
      sum += Math.hypot(pb.x - pa.x, pb.y - pa.y)
      cnt += 1
    }
    if (cnt > 0) energy[i] = sum / cnt / dt
  }

  // 2. 滑动平均
  const sm = energy.map((_, i) => {
    let s = 0
    let c = 0
    for (let j = Math.max(0, i - 2); j <= Math.min(n - 1, i + 2); j++) {
      if (Number.isFinite(energy[j])) {
        s += energy[j]
        c += 1
      }
    }
    return c > 0 ? s / c : Infinity
  })

  // 3. 局部极小候选(按时间有序)
  const candidates: number[] = []
  for (let i = 1; i < n - 1; i++) {
    if (Number.isFinite(sm[i]) && sm[i] <= sm[i - 1] && sm[i] < sm[i + 1]) {
      candidates.push(i)
    }
  }

  // 4 + 5. 贪心最小间隔 + 起始姿态
  const keys: KeyPose[] = [{ t: samples[0].t, index: 0, energy: Number.isFinite(sm[0]) ? sm[0] : 0 }]
  const end = samples[n - 1].t
  let windowStart = samples[0].t + minInterval
  while (windowStart < end - 0.2 && keys.length < 100) {
    let best = -1
    for (const i of candidates) {
      const t = samples[i].t
      if (t < windowStart) continue
      if (t > windowStart + minInterval) break
      if (best === -1 || sm[i] < sm[best]) best = i
    }
    if (best !== -1) {
      keys.push({ t: samples[best].t, index: best, energy: sm[best] })
      windowStart = samples[best].t + minInterval
    } else {
      windowStart += minInterval
    }
  }
  return keys
}
