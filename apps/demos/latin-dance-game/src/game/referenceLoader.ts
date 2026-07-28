import type { PoseLandmarker } from '@mediapipe/tasks-vision'
import { bodyVisible, emptyBodyPose, toBodyPose } from '../lib/bodyPose'
import { extractKeyPoses, type KeyPose } from '../lib/keyPoses'
import { PoseSmoother, SMOOTH_PRESETS, type SmoothLevel } from '../lib/oneEuroFilter'
import type { ModelType } from '../lib/pose'
import {
  ASSUMED_FPS,
  EXTRACT_STEP_FRAMES,
  loadCachedReference,
  refCacheKey,
  saveCachedReference,
} from '../lib/refCache'
import { parseSequence, type ReferenceSample, type ReferenceSequence } from '../lib/reference'
import type { SilhouetteEntry, SilhouettePts } from '../lib/silhouette'

const EXTRACT_DT = EXTRACT_STEP_FRAMES / ASSUMED_FPS

export interface LoadRefOptions {
  /** 视频地址(public 下用 BASE_URL 拼接) */
  url: string
  /** 缓存来源指纹,如 'references/58_raw.mp4' */
  sourceId: string
  label: string
  landmarker: PoseLandmarker
  smoothLevel: SmoothLevel
  modelType: ModelType
  onProgress?: (progress: number) => void
  /**
   * 剪影后台补载回调:命中旧缓存/旧 format 1 预计算(无轮廓数据)时,
   * 先回退骨架渲染,后台尝试从 format 2 预计算 JSON 补剪影,成功时回调一次。
   */
  onSilhouettes?: (silhouettes: SilhouetteEntry[]) => void
}

export type ReferenceSource = 'precomputed' | 'cache' | 'extracted'

export interface LoadedReference {
  seq: ReferenceSequence
  keyPoses: KeyPose[]
  /** 来源:预计算 JSON / localStorage 缓存 / 浏览器内实时提取 */
  source: ReferenceSource
  /** 关键姿态剪影(format 2 预计算才有;缺省时渲染回退骨架卡) */
  silhouettes?: SilhouetteEntry[]
}

/** 参考视频对应的预计算文件地址:references/58_raw.mp4 → references/58_raw.poses.json */
export function precomputedUrl(sourceId: string): string {
  return `${import.meta.env.BASE_URL}${sourceId.replace(/\.[^.]+$/, '.poses.json')}`
}

interface PrecomputedFile {
  format?: unknown
  fingerprint?: {
    videoId?: unknown
    videoSize?: unknown
    smoothLevel?: unknown
    modelType?: unknown
    stepFrames?: unknown
  }
  seqJson?: unknown
  keyPoses?: unknown
  silhouettes?: unknown
}

/** 校验并解析剪影数组(format 2);不合法返回 undefined(回退骨架渲染) */
function parseSilhouettes(raw: unknown): SilhouetteEntry[] | undefined {
  if (!Array.isArray(raw)) return undefined
  const out: SilhouetteEntry[] = []
  for (const item of raw) {
    if (item === null) continue
    const e = item as { t?: unknown; pts?: unknown }
    if (typeof e.t !== 'number' || !Array.isArray(e.pts) || e.pts.length < 6) return undefined
    const pts: SilhouettePts = []
    let valid = true
    for (const p of e.pts as unknown[]) {
      if (!Array.isArray(p) || p.length !== 2 || typeof p[0] !== 'number' || typeof p[1] !== 'number') {
        valid = false
        break
      }
      pts.push([p[0] as number, p[1] as number])
    }
    if (!valid) return undefined
    out.push({ t: e.t as number, pts })
  }
  return out.length > 0 ? out : undefined
}

/** 轻量剪影补载:只取预计算 JSON 的 silhouettes 字段(结算页 / 后台补载用) */
export async function loadSilhouettesOnly(sourceId: string): Promise<SilhouetteEntry[] | null> {
  try {
    const res = await fetch(precomputedUrl(sourceId))
    if (!res.ok) return null
    const raw = (await res.json()) as PrecomputedFile
    if (raw.format !== 2) return null
    return parseSilhouettes(raw.silhouettes) ?? null
  } catch {
    return null
  }
}

/**
 * 加载链优先级:
 * ① 预计算 JSON(npm run precompute 产出,秒载;校验参数指纹,不一致才往下走)
 * ② localStorage 缓存(此前浏览器内提取的结果)
 * ③ 浏览器内实时提取(兜底,10–20s,完成后写 localStorage)
 * 无剪影时(旧缓存 / format 1)先返回、后台补载剪影并经 onSilhouettes 回调。
 */
export async function loadVideoReference(opts: LoadRefOptions): Promise<LoadedReference> {
  const withBackfill = (r: LoadedReference): LoadedReference => {
    if (!r.silhouettes && opts.onSilhouettes) {
      const cb = opts.onSilhouettes
      void loadSilhouettesOnly(opts.sourceId).then((s) => {
        if (s) cb(s)
      })
    }
    return r
  }

  const pre = await tryLoadPrecomputed(opts)
  if (pre) return withBackfill(pre)

  const cacheKey = refCacheKey(opts.sourceId, opts.smoothLevel, opts.modelType)
  const cached = loadCachedReference(cacheKey)
  if (cached) return withBackfill({ ...cached, source: 'cache' })

  const running = inflight.get(cacheKey)
  if (running) return running.then(withBackfill)
  const p = doExtract(opts, cacheKey).finally(() => {
    inflight.delete(cacheKey)
  })
  inflight.set(cacheKey, p)
  return p.then(withBackfill)
}

/** ① 预计算 JSON:文件存在 + 指纹(平滑档/模型/采样步长/视频大小)与当前设置一致才命中 */
async function tryLoadPrecomputed(opts: LoadRefOptions): Promise<LoadedReference | null> {
  try {
    const res = await fetch(precomputedUrl(opts.sourceId))
    if (!res.ok) return null
    const raw = (await res.json()) as PrecomputedFile
    if ((raw.format !== 1 && raw.format !== 2) || !raw.seqJson || !raw.fingerprint) return null
    const fp = raw.fingerprint
    // 参数指纹:提取参数必须与当前设置一致,否则结果不适用
    if (
      fp.smoothLevel !== opts.smoothLevel ||
      fp.modelType !== opts.modelType ||
      fp.stepFrames !== EXTRACT_STEP_FRAMES
    ) {
      return null
    }
    // 视频指纹:HEAD 对比文件大小,防止视频被替换后误用旧姿态
    if (typeof fp.videoSize === 'number') {
      try {
        const head = await fetch(opts.url, { method: 'HEAD' })
        const size = Number(head.headers.get('content-length'))
        if (Number.isFinite(size) && size > 0 && size !== fp.videoSize) return null
      } catch {
        // HEAD 不可用时跳过大小校验
      }
    }
    const seq = parseSequence(JSON.stringify(raw.seqJson))
    let keyPoses: KeyPose[] | null = null
    if (Array.isArray(raw.keyPoses)) {
      const ks = raw.keyPoses as Array<{ t?: unknown; index?: unknown; energy?: unknown }>
      if (ks.length > 0 && ks.every((k) => typeof k.t === 'number' && typeof k.index === 'number')) {
        keyPoses = ks.map((k) => ({
          t: k.t as number,
          index: k.index as number,
          energy: Number(k.energy) || 0,
        }))
      }
    }
    return {
      seq,
      keyPoses: keyPoses ?? extractKeyPoses(seq),
      source: 'precomputed',
      silhouettes: parseSilhouettes(raw.silhouettes),
    }
  } catch {
    return null
  }
}

/** 并发去重:同一缓存 key 的提取只跑一次(StrictMode 双挂载 / 详情页与游戏页同时加载时复用) */
const inflight = new Map<string, Promise<LoadedReference>>()

/** ③ 浏览器内实时提取(兜底):创建隐藏 video 逐帧 seek,完成后写 localStorage */
async function doExtract(opts: LoadRefOptions, cacheKey: string): Promise<LoadedReference> {
  const v = document.createElement('video')
  v.muted = true
  v.playsInline = true
  v.preload = 'auto'
  v.src = opts.url

  const smoother =
    opts.smoothLevel === 'off' ? null : new PoseSmoother(SMOOTH_PRESETS[opts.smoothLevel])

  const seekTo = (target: number) =>
    new Promise<void>((resolve) => {
      let done = false
      const finish = () => {
        if (!done) {
          done = true
          resolve()
        }
      }
      v.addEventListener('seeked', finish, { once: true })
      setTimeout(finish, 400)
      v.currentTime = target
    })

  try {
    await new Promise<void>((resolve, reject) => {
      v.onloadedmetadata = () => resolve()
      v.onerror = () => reject(new Error('示范视频无法解码,请检查 public/references/ 下的文件'))
    })
    const duration = v.duration
    if (!Number.isFinite(duration) || duration <= 0) throw new Error('无法读取示范视频时长')

    const samples: ReferenceSample[] = []
    let errStreak = 0
    for (let t = 0; t < duration; t += EXTRACT_DT) {
      await seekTo(Math.min(t, duration - 0.05))
      try {
        const res = opts.landmarker.detectForVideo(v, performance.now())
        const lm = res.landmarks?.[0]
        const ok = !!lm && bodyVisible(lm)
        if (ok && smoother) smoother.filterLandmarks(lm, t)
        samples.push({ t, ok, body: ok ? toBodyPose(lm) : emptyBodyPose() })
        errStreak = 0
      } catch {
        errStreak += 1
        if (errStreak > 20) throw new Error('提取被中断,请重试')
      }
      opts.onProgress?.(Math.min(1, t / duration))
    }
    if (samples.filter((s) => s.ok).length < 5) {
      throw new Error('示范视频里没识别到完整身体,换一段全身出镜的视频试试。')
    }
    const seq: ReferenceSequence = {
      version: 1,
      createdAt: new Date().toISOString(),
      source: opts.label,
      duration: samples[samples.length - 1].t,
      samples,
    }
    const keyPoses = extractKeyPoses(seq)
    saveCachedReference(cacheKey, seq, keyPoses) // 配额不足仅本次不缓存,不报错
    return { seq, keyPoses, source: 'extracted' }
  } finally {
    v.pause()
    v.removeAttribute('src')
    v.load()
  }
}
