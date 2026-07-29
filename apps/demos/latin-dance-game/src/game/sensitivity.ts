import { SENSITIVITY_PRESETS, type Sensitivity } from './judgments'

/**
 * 判定灵敏度偏好：严格 / 标准 / 宽松。
 * 持久化 localStorage,跨页面（游戏 / 直播）一致;通过自定义事件多实例同步。
 */
const STORAGE_KEY = 'latin-dance-game:sensitivity'

export function getSensitivity(): Sensitivity {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    if (s === 'strict' || s === 'standard' || s === 'relaxed') return s
  } catch {
    // 忽略
  }
  return 'standard'
}

export function setSensitivity(s: Sensitivity): void {
  try {
    localStorage.setItem(STORAGE_KEY, s)
  } catch {
    // 忽略
  }
  window.dispatchEvent(new CustomEvent('latin-sensitivity-change', { detail: s }))
}

/** 取某灵敏度的判定阈值(直接喂 judgmentFor) */
export function sensitivityThresholds(s: Sensitivity) {
  return SENSITIVITY_PRESETS[s].thresholds
}
