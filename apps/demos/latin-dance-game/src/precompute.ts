/**
 * 离线预提取页(仅被 scripts/precompute-references.mjs 通过 headless Chrome 驱动)。
 * 提取逻辑与浏览器内 referenceLoader 完全一致:
 * lite 模型 + One Euro Filter 中档 + 每 2 帧采样(按 30fps)。
 * 不需要摄像头,视频通过 blob URL 逐帧 seek。
 */
import { loadPoseLandmarker } from './lib/pose'
import { PoseSmoother, SMOOTH_PRESETS } from './lib/oneEuroFilter'
import { bodyVisible, emptyBodyPose, toBodyPose } from './lib/bodyPose'
import { extractKeyPoses } from './lib/keyPoses'
import { sequenceToJson, type ReferenceSample, type ReferenceSequence } from './lib/reference'
import { ASSUMED_FPS, EXTRACT_STEP_FRAMES } from './lib/refCache'

declare global {
  interface Window {
    __precomputeReady?: boolean
    __runExtraction?: (videoUrl: string, videoId: string) => Promise<unknown>
  }
}

const EXTRACT_DT = EXTRACT_STEP_FRAMES / ASSUMED_FPS

async function sha256Hex(buf: ArrayBuffer): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', buf)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

async function runExtraction(videoUrl: string, videoId: string): Promise<unknown> {
  // 拉取视频字节:既算指纹,也走 blob 播放(避免 range 请求差异)
  const buf = await (await fetch(videoUrl)).arrayBuffer()
  const videoSha256 = await sha256Hex(buf)
  const videoSize = buf.byteLength
  const blobUrl = URL.createObjectURL(new Blob([buf], { type: 'video/mp4' }))

  const { landmarker, delegate } = await loadPoseLandmarker('lite')
  const smoother = new PoseSmoother(SMOOTH_PRESETS.medium)

  const v = document.createElement('video')
  v.muted = true
  v.playsInline = true
  v.preload = 'auto'
  v.src = blobUrl

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
      v.onerror = () => reject(new Error('视频无法解码'))
    })
    const duration = v.duration
    if (!Number.isFinite(duration) || duration <= 0) throw new Error('无法读取视频时长')

    const samples: ReferenceSample[] = []
    for (let t = 0; t < duration; t += EXTRACT_DT) {
      await seekTo(Math.min(t, duration - 0.05))
      const res = landmarker.detectForVideo(v, performance.now())
      const lm = res.landmarks?.[0]
      const ok = !!lm && bodyVisible(lm)
      if (ok && lm) smoother.filterLandmarks(lm, t)
      samples.push({ t, ok, body: ok && lm ? toBodyPose(lm) : emptyBodyPose() })
    }
    if (samples.filter((s) => s.ok).length < 5) {
      throw new Error('视频里没识别到完整身体')
    }
    const seq: ReferenceSequence = {
      version: 1,
      createdAt: new Date().toISOString(),
      source: videoId,
      duration: samples[samples.length - 1].t,
      samples,
    }
    const keyPoses = extractKeyPoses(seq)

    return {
      format: 1,
      fingerprint: {
        videoId,
        videoSha256,
        videoSize,
        smoothLevel: 'medium',
        modelType: 'lite',
        delegate,
        stepFrames: EXTRACT_STEP_FRAMES,
        assumedFps: ASSUMED_FPS,
      },
      meta: {
        duration: seq.duration,
        frames: samples.length,
        okFrames: samples.filter((s) => s.ok).length,
        keyPoseCount: keyPoses.length,
        extractedAt: seq.createdAt,
      },
      seqJson: JSON.parse(sequenceToJson(seq)),
      keyPoses,
    }
  } finally {
    v.pause()
    v.removeAttribute('src')
    v.load()
    URL.revokeObjectURL(blobUrl)
    landmarker.close()
  }
}

window.__runExtraction = runExtraction
window.__precomputeReady = true
