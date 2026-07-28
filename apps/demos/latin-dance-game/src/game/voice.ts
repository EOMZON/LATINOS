import { useEffect, useState } from 'react'

/**
 * TTS 语音引导(Web Speech API speechSynthesis):
 * - 优先选 zh-CN 中文语音,语速适中;
 * - 状态变化才播报(调用方去重)+ 同一内容 2 秒内不重复;
 * - important 级(「站好了」/倒计时数字)会打断普通播报;
 *   普通播报不打断进行中的 important 播报(直接丢弃);
 * - speechSynthesis 不存在 / 无语音时静默降级为纯视觉,不报错;
 * - 开关持久化 localStorage,默认开。
 */

const STORAGE_KEY = 'latin-dance-game:voice'
const REPEAT_MS = 2000

type Priority = 'normal' | 'important'

function readEnabled(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== '0'
  } catch {
    return true
  }
}

class VoiceGuide {
  supported = typeof window !== 'undefined' && 'speechSynthesis' in window
  private enabled = readEnabled()
  private zhVoice: SpeechSynthesisVoice | null = null
  private lastText = ''
  private lastAt = 0
  private importantSpeaking = false

  constructor() {
    if (!this.supported) return
    const pick = () => {
      const voices = speechSynthesis.getVoices()
      this.zhVoice =
        voices.find((v) => /^zh([-_]CN)?/i.test(v.lang) && /xiaoxiao|ting|mei|sinji|google/i.test(v.name)) ??
        voices.find((v) => /^zh([-_]CN)?/i.test(v.lang)) ??
        voices.find((v) => /^zh/i.test(v.lang)) ??
        null
    }
    pick()
    // 部分浏览器语音列表异步加载
    speechSynthesis.addEventListener?.('voiceschanged', pick)
  }

  isEnabled(): boolean {
    return this.enabled && this.supported
  }

  setEnabled(on: boolean) {
    this.enabled = on
    try {
      localStorage.setItem(STORAGE_KEY, on ? '1' : '0')
    } catch {
      // 忽略
    }
    if (!on) this.stop()
    window.dispatchEvent(new CustomEvent('latin-voice-change', { detail: on }))
  }

  /**
   * 播报一句话。normal:同一内容 2s 内不重复、不打断 important;
   * important:立即打断一切播报(用于「站好了」/倒计时)。
   */
  say(text: string, priority: Priority = 'normal') {
    if (!this.enabled || !this.supported) return
    const now = performance.now()
    if (priority === 'normal') {
      if (text === this.lastText && now - this.lastAt < REPEAT_MS) return
      if (this.importantSpeaking && speechSynthesis.speaking) return
    }
    this.lastText = text
    this.lastAt = now
    try {
      if (priority === 'important') speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'zh-CN'
      u.rate = 1.05
      u.volume = 1
      if (this.zhVoice) u.voice = this.zhVoice
      if (priority === 'important') {
        this.importantSpeaking = true
        u.onend = () => {
          this.importantSpeaking = false
        }
        u.onerror = () => {
          this.importantSpeaking = false
        }
      }
      speechSynthesis.speak(u)
    } catch {
      // 语音失败静默降级
    }
  }

  stop() {
    if (!this.supported) return
    try {
      speechSynthesis.cancel()
    } catch {
      // 忽略
    }
    this.importantSpeaking = false
  }
}

export const voice = new VoiceGuide()

/** React hook:语音开关状态(多实例经自定义事件同步) */
export function useVoiceEnabled(): [boolean, (on: boolean) => void] {
  const [on, setOn] = useState(voice.isEnabled())
  useEffect(() => {
    const handler = () => setOn(voice.isEnabled())
    window.addEventListener('latin-voice-change', handler)
    return () => window.removeEventListener('latin-voice-change', handler)
  }, [])
  return [on, (v: boolean) => voice.setEnabled(v)]
}
