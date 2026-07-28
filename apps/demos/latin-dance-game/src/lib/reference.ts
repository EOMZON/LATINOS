import type { NormalizedLandmark } from '@mediapipe/tasks-vision'
import type { BodyPose } from './bodyPose'

/** 参考动作序列:按时间轴排列的身体姿态帧(v0 同步跟练用) */
export interface ReferenceSample {
  /** 秒,相对序列起点 */
  t: number
  /** 该帧是否识别到完整身体 */
  ok: boolean
  body: BodyPose
}

export interface ReferenceSequence {
  version: 1
  createdAt: string
  /** 来源描述,如 'camera' / 视频文件名 / 'import' */
  source: string
  /** 秒 */
  duration: number
  samples: ReferenceSample[]
}

/**
 * 每帧 3D world 采样(米制、髋原点),与 seqJson.samples 平行,无识别帧为 null。
 * 10 个值:[髋Lx, 髋Lz, 髋Rx, 髋Rz, 踝Lx, 踝Ly, 踝Lz, 踝Rx, 踝Ry, 踝Rz]
 * (landmark 23/24/27/28 的 world 坐标;x/y/z 米,z 朝摄像机为负方向)
 */
export type WorldSample = number[] | null

export const WORLD_SAMPLE_LEN = 10

const roundW = (n: number) => Math.round(n * 1000) / 1000

/** 从 world landmarks(33 点,米制)提取 10 值采样;髋/踝不可见时返回 null */
export function worldSampleFrom(wl: NormalizedLandmark[] | null | undefined): WorldSample {
  if (!wl) return null
  const hl = wl[23]
  const hr = wl[24]
  const al = wl[27]
  const ar = wl[28]
  if (!hl || !hr || !al || !ar) return null
  if ((hl.visibility ?? 1) < 0.3 || (hr.visibility ?? 1) < 0.3) return null
  return [
    roundW(hl.x), roundW(hl.z),
    roundW(hr.x), roundW(hr.z),
    roundW(al.x), roundW(al.y), roundW(al.z),
    roundW(ar.x), roundW(ar.y), roundW(ar.z),
  ]
}

/** 校验并解析 world 平行数组;不合法返回 undefined(指示器只显示实时侧) */
export function parseWorldSamples(raw: unknown, expectedLen: number): WorldSample[] | undefined {
  if (!Array.isArray(raw) || raw.length !== expectedLen) return undefined
  const out: WorldSample[] = []
  for (const item of raw) {
    if (item === null) {
      out.push(null)
      continue
    }
    if (!Array.isArray(item) || item.length !== WORLD_SAMPLE_LEN || !item.every((v) => typeof v === 'number')) {
      return undefined
    }
    out.push(item as number[])
  }
  return out
}

const round3 = (n: number) => Math.round(n * 1000) / 1000

export function sequenceToJson(seq: ReferenceSequence): string {
  return JSON.stringify({
    app: 'skeleton-live',
    version: 1,
    createdAt: seq.createdAt,
    source: seq.source,
    duration: round3(seq.duration),
    samples: seq.samples.map((s) => ({
      t: round3(s.t),
      ok: s.ok ? 1 : 0,
      body: s.body.map((p) => [round3(p.x), round3(p.y), round3(p.v)]),
    })),
  })
}

/** 解析导入的参考 JSON,不合法时抛出中文错误信息 */
export function parseSequence(text: string): ReferenceSequence {
  let raw: unknown
  try {
    raw = JSON.parse(text)
  } catch {
    throw new Error('文件不是有效的 JSON')
  }
  const o = raw as Record<string, unknown>
  if (!o || o.version !== 1 || !Array.isArray(o.samples)) {
    throw new Error('不是有效的参考动作文件(版本或格式不符)')
  }
  const samplesRaw = o.samples as unknown[]
  if (typeof o.duration !== 'number' || samplesRaw.length < 5) {
    throw new Error('参考序列数据不完整')
  }
  const samples: ReferenceSample[] = samplesRaw.map((s) => {
    const sample = s as { t?: unknown; ok?: unknown; body?: unknown }
    if (typeof sample.t !== 'number' || !Array.isArray(sample.body) || sample.body.length !== 22) {
      throw new Error('参考帧数据格式不正确')
    }
    const body = (sample.body as unknown[]).map((p) => {
      if (Array.isArray(p)) {
        return { x: Number(p[0]) || 0, y: Number(p[1]) || 0, v: Number(p[2]) || 0 }
      }
      const q = p as { x?: unknown; y?: unknown; v?: unknown }
      return { x: Number(q.x) || 0, y: Number(q.y) || 0, v: Number(q.v ?? 1) || 0 }
    }) as BodyPose
    return { t: sample.t as number, ok: !!sample.ok, body }
  })
  samples.sort((a, b) => a.t - b.t)
  return {
    version: 1,
    createdAt: String(o.createdAt ?? ''),
    source: String(o.source ?? 'import'),
    duration: o.duration,
    samples,
  }
}
