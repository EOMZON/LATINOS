import { extractKeyPoses, type KeyPose } from './keyPoses'
import { parseSequence, sequenceToJson, type ReferenceSequence } from './reference'

/** 提取步长(每 2 帧采一次,按 30fps 估算) */
export const EXTRACT_STEP_FRAMES = 2
export const ASSUMED_FPS = 30

const CACHE_PREFIX = 'skeleton-live:ref:v1'

/**
 * 缓存 key:包含所有影响提取结果的参数——
 * 视频来源(URL 或文件指纹)+ 平滑档位 + 姿态模型 + 采样步长。
 */
export function refCacheKey(
  sourceId: string,
  smoothLevel: string,
  modelType: string,
  stepFrames: number = EXTRACT_STEP_FRAMES,
): string {
  return `${CACHE_PREFIX}:${sourceId}:${smoothLevel}:${modelType}:step${stepFrames}`
}

export interface CachedReference {
  seq: ReferenceSequence
  keyPoses: KeyPose[]
}

/** 命中返回序列 + 关键姿态;未命中或数据损坏返回 null */
export function loadCachedReference(key: string): CachedReference | null {
  try {
    const text = localStorage.getItem(key)
    if (!text) return null
    const raw = JSON.parse(text) as { cacheVersion?: unknown; seqJson?: unknown; keyPoses?: unknown }
    if (raw.cacheVersion !== 1 || !raw.seqJson) return null
    // 复用导出格式的校验逻辑
    const seq = parseSequence(JSON.stringify(raw.seqJson))
    let keyPoses: KeyPose[] | null = null
    if (Array.isArray(raw.keyPoses)) {
      const ks = raw.keyPoses as Array<{ t?: unknown; index?: unknown; energy?: unknown }>
      if (ks.every((k) => typeof k.t === 'number' && typeof k.index === 'number')) {
        keyPoses = ks.map((k) => ({ t: k.t as number, index: k.index as number, energy: Number(k.energy) || 0 }))
      }
    }
    return { seq, keyPoses: keyPoses ?? extractKeyPoses(seq) }
  } catch {
    return null
  }
}

/** 写入缓存;配额不足等失败返回 false(调用方降级为仅内存) */
export function saveCachedReference(key: string, seq: ReferenceSequence, keyPoses: KeyPose[]): boolean {
  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        cacheVersion: 1,
        seqJson: JSON.parse(sequenceToJson(seq)),
        keyPoses,
      }),
    )
    return true
  } catch {
    return false
  }
}

export function clearCachedReference(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // 忽略
  }
}
