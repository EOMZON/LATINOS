import { useEffect, useState } from 'react'

/** 视觉风格(皮肤)系统:一套 skin = index.css 里一组 [data-skin] CSS 变量 */

export type SkinId = 'esports' | 'light' | 'stage'

export interface SkinMeta {
  id: SkinId
  name: string
  desc: string
  /** 切换器缩略卡预览色:bg / 主紫 / 点缀 */
  swatch: { bg: string; primary: string; accent: string }
}

export const SKINS: SkinMeta[] = [
  {
    id: 'esports',
    name: '深紫电竞',
    desc: '深灰近黑底 + 霓虹紫,游戏感最强',
    swatch: { bg: '#0b0714', primary: '#a855f7', accent: '#c084fc' },
  },
  {
    id: 'light',
    name: '浅紫简约',
    desc: '近白淡紫底 + 大留白,最简约时尚',
    swatch: { bg: '#f7f5fc', primary: '#7c3aed', accent: '#8b5cf6' },
  },
  {
    id: 'stage',
    name: '紫金舞台',
    desc: '深底 + 紫主色 + 金色聚光,拉丁味最足',
    swatch: { bg: '#120a1c', primary: '#9333ea', accent: '#f5c542' },
  },
]

const STORAGE_KEY = 'latin-dance-game:skin'
export const DEFAULT_SKIN: SkinId = 'esports'

export function getSkin(): SkinId {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    if (s === 'esports' || s === 'light' || s === 'stage') return s
  } catch {
    // 忽略
  }
  return DEFAULT_SKIN
}

export function applySkin(id: SkinId) {
  document.documentElement.dataset.skin = id
  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
    // 忽略
  }
  window.dispatchEvent(new CustomEvent('latin-skin-change', { detail: id }))
}

/** React hook:当前 skin + 切换函数,多实例间通过自定义事件同步 */
export function useSkin(): [SkinId, (id: SkinId) => void] {
  const [skin, setSkin] = useState<SkinId>(getSkin)
  useEffect(() => {
    const onChange = (e: Event) => setSkin((e as CustomEvent<SkinId>).detail)
    window.addEventListener('latin-skin-change', onChange)
    return () => window.removeEventListener('latin-skin-change', onChange)
  }, [])
  return [skin, applySkin]
}

/** 读取当前 skin 的某个 CSS 变量(画布绘制等非 CSS 场景用) */
export function cssVar(name: string, fallback: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}
