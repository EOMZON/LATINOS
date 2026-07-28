import type { Judgment } from './judgments'

/**
 * WebAudio 简单合成音效:判定、倒计时、过关。
 * AudioContext 在首次用户手势后创建,失败时静默降级。
 */

let ctx: AudioContext | null = null

function ac(): AudioContext | null {
  try {
    if (!ctx) ctx = new AudioContext()
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
  } catch {
    return null
  }
}

function tone(freq: number, dur: number, type: OscillatorType = 'sine', gain = 0.12, delay = 0) {
  const c = ac()
  if (!c) return
  try {
    const t0 = c.currentTime + delay
    const osc = c.createOscillator()
    const g = c.createGain()
    osc.type = type
    osc.frequency.value = freq
    g.gain.setValueAtTime(0, t0)
    g.gain.linearRampToValueAtTime(gain, t0 + 0.01)
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur)
    osc.connect(g)
    g.connect(c.destination)
    osc.start(t0)
    osc.stop(t0 + dur + 0.05)
  } catch {
    // 忽略音频失败
  }
}

export const sfx = {
  judgment(j: Judgment) {
    if (j === 'perfect') {
      tone(880, 0.12, 'triangle', 0.14)
      tone(1318, 0.18, 'triangle', 0.12, 0.08)
    } else if (j === 'great') {
      tone(988, 0.14, 'triangle', 0.12)
    } else if (j === 'good') {
      tone(659, 0.12, 'sine', 0.1)
    } else {
      tone(160, 0.22, 'sawtooth', 0.07)
    }
  },
  countdown(n: number) {
    if (n <= 0) tone(1046, 0.25, 'triangle', 0.16)
    else tone(523, 0.1, 'sine', 0.1)
  },
  /** 站好了的确认音(Kinect 式专属成功音) */
  confirm() {
    tone(784, 0.1, 'sine', 0.13)
    tone(1175, 0.22, 'sine', 0.13, 0.09)
  },
  pass() {
    tone(784, 0.1, 'triangle', 0.12)
    tone(1046, 0.12, 'triangle', 0.12, 0.09)
    tone(1318, 0.2, 'triangle', 0.12, 0.18)
  },
  fail() {
    tone(392, 0.15, 'sawtooth', 0.08)
    tone(262, 0.3, 'sawtooth', 0.08, 0.12)
  },
}
