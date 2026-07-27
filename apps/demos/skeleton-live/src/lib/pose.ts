import { FilesetResolver, PoseLandmarker } from '@mediapipe/tasks-vision'

export type ModelType = 'lite' | 'full'
export type Delegate = 'GPU' | 'CPU'

const MODEL_FILES: Record<ModelType, string> = {
  lite: 'pose_landmarker_lite.task',
  full: 'pose_landmarker_full.task',
}

const MODEL_CDN: Record<ModelType, string> = {
  lite: 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task',
  full: 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/latest/pose_landmarker_full.task',
}

export interface LoadedLandmarker {
  landmarker: PoseLandmarker
  delegate: Delegate
  /** 'local' 表示使用 public/models 下的本地文件,'cdn' 表示回退到官方 CDN */
  modelSource: 'local' | 'cdn'
}

/** 优先使用本地模型文件,fetch 失败时回退到 MediaPipe 官方 CDN */
async function resolveModelUrl(model: ModelType): Promise<{ url: string; source: 'local' | 'cdn' }> {
  const local = `${import.meta.env.BASE_URL}models/${MODEL_FILES[model]}`
  try {
    const res = await fetch(local, { method: 'HEAD' })
    if (res.ok) return { url: local, source: 'local' }
  } catch {
    // 本地不可达,继续走 CDN
  }
  return { url: MODEL_CDN[model], source: 'cdn' }
}

/** 加载 PoseLandmarker:优先 GPU delegate,失败自动回退 CPU */
export async function loadPoseLandmarker(model: ModelType): Promise<LoadedLandmarker> {
  const vision = await FilesetResolver.forVisionTasks(`${import.meta.env.BASE_URL}wasm`)
  const { url: modelAssetPath, source } = await resolveModelUrl(model)

  let lastError: unknown = null
  for (const delegate of ['GPU', 'CPU'] as const) {
    try {
      const landmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath, delegate },
        runningMode: 'VIDEO',
        numPoses: 1,
      })
      return { landmarker, delegate, modelSource: source }
    } catch (e) {
      lastError = e
    }
  }
  throw lastError instanceof Error ? lastError : new Error(String(lastError))
}
