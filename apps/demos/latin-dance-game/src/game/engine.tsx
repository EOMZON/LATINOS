import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'
import type { NormalizedLandmark, PoseLandmarker } from '@mediapipe/tasks-vision'
import { loadPoseLandmarker, type Delegate, type ModelType } from '../lib/pose'
import { PoseSmoother, SMOOTH_PRESETS, type SmoothLevel } from '../lib/oneEuroFilter'

/**
 * 姿态引擎:全局唯一的摄像头 + MediaPipe 推理循环。
 * 各游戏屏幕通过 usePoseEngine() 订阅,自己负责画布绘制。
 * 只保留身体 11–32 号关键点,不做任何面部识别/渲染。
 */

export interface EngineStatus {
  fps: number
  modelStatus: 'loading' | 'ready' | 'error'
  modelError: string | null
  delegate: Delegate | null
  modelSource: 'local' | 'cdn' | null
  cameraActive: boolean
  cameraError: string | null
}

export interface PoseEngine {
  videoRef: RefObject<HTMLVideoElement | null>
  /** 当前帧(已 One Euro 平滑)的身体关键点,未识别时为 null */
  landmarksRef: RefObject<NormalizedLandmark[] | null>
  status: EngineStatus
  smoothLevel: SmoothLevel
  setSmoothLevel: (l: SmoothLevel) => void
  modelType: ModelType
  setModelType: (m: ModelType) => void
  getLandmarker: () => PoseLandmarker | null
  /** 申请并开启摄像头(用户手势中调用) */
  startCamera: () => Promise<void>
  stopCamera: () => void
  reloadModel: () => void
}

const Ctx = createContext<PoseEngine | null>(null)

export function usePoseEngine(): PoseEngine {
  const e = useContext(Ctx)
  if (!e) throw new Error('usePoseEngine 必须在 PoseEngineProvider 内使用')
  return e
}

function cameraErrorMessage(err: unknown): string {
  const name = err instanceof DOMException ? err.name : ''
  if (name === 'NotAllowedError' || name === 'SecurityError') {
    return '摄像头权限被拒绝。请在浏览器地址栏的权限设置里允许摄像头,然后点「重新打开摄像头」。'
  }
  if (name === 'NotFoundError' || name === 'OverconstrainedError') {
    return '未检测到可用的摄像头。请确认摄像头已连接且没有被其他应用占用。'
  }
  if (name === 'NotReadableError') {
    return '摄像头被其他应用占用了。关掉占用它的应用后再试。'
  }
  return '摄像头启动失败。摄像头功能需要 localhost 或 https 环境。'
}

export function PoseEngineProvider({ children }: { children: ReactNode }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const landmarksRef = useRef<NormalizedLandmark[] | null>(null)
  const landmarkerRef = useRef<PoseLandmarker | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const smootherRef = useRef(new PoseSmoother(SMOOTH_PRESETS.medium))
  const smoothLevelRef = useRef<SmoothLevel>('medium')
  const lastVideoTimeRef = useRef(-1)
  const inferCountRef = useRef(0)

  const [smoothLevel, setSmoothLevelState] = useState<SmoothLevel>('medium')
  const [modelType, setModelType] = useState<ModelType>('lite')
  const [reloadTick, setReloadTick] = useState(0)
  const [status, setStatus] = useState<EngineStatus>({
    fps: 0,
    modelStatus: 'loading',
    modelError: null,
    delegate: null,
    modelSource: null,
    cameraActive: false,
    cameraError: null,
  })

  const patchStatus = useCallback((p: Partial<EngineStatus>) => {
    setStatus((s) => ({ ...s, ...p }))
  }, [])

  const setSmoothLevel = useCallback((l: SmoothLevel) => {
    smoothLevelRef.current = l
    if (l === 'off') smootherRef.current.reset()
    else smootherRef.current.setParams(SMOOTH_PRESETS[l])
    setSmoothLevelState(l)
  }, [])

  // 加载 / 切换姿态模型(默认 lite,GPU 优先,失败回退 CPU)
  useEffect(() => {
    let cancelled = false
    patchStatus({ modelStatus: 'loading', modelError: null })
    smootherRef.current.reset()
    loadPoseLandmarker(modelType)
      .then(({ landmarker, delegate, modelSource }) => {
        if (cancelled) {
          landmarker.close()
          return
        }
        landmarkerRef.current?.close()
        landmarkerRef.current = landmarker
        landmarksRef.current = null
        lastVideoTimeRef.current = -1
        patchStatus({ modelStatus: 'ready', delegate, modelSource })
      })
      .catch((e) => {
        if (cancelled) return
        patchStatus({
          modelStatus: 'error',
          modelError: e instanceof Error ? e.message : String(e),
        })
      })
    return () => {
      cancelled = true
    }
  }, [modelType, reloadTick, patchStatus])

  const startCamera = useCallback(async () => {
    const video = videoRef.current
    if (!video) throw new Error('视频元素未就绪')
    if (!navigator.mediaDevices?.getUserMedia) {
      const msg = '当前环境不支持摄像头。摄像头功能需要 localhost 或 https 环境。'
      patchStatus({ cameraError: msg })
      throw new Error(msg)
    }
    // 已在运行就直接返回
    if (streamRef.current) {
      patchStatus({ cameraActive: true, cameraError: null })
      return
    }
    patchStatus({ cameraError: null })
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 960 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: false,
      })
      streamRef.current = stream
      video.srcObject = stream
      await video.play().catch(() => {})
      smootherRef.current.reset()
      lastVideoTimeRef.current = -1
      patchStatus({ cameraActive: true, cameraError: null })
    } catch (err) {
      const msg = cameraErrorMessage(err)
      patchStatus({ cameraError: msg, cameraActive: false })
      throw new Error(msg)
    }
  }, [patchStatus])

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    const video = videoRef.current
    if (video) video.srcObject = null
    landmarksRef.current = null
    patchStatus({ cameraActive: false })
  }, [patchStatus])

  // 推理主循环:每个新视频帧推理一次,立即做 One Euro 平滑
  useEffect(() => {
    let raf = 0
    const loop = () => {
      raf = requestAnimationFrame(loop)
      const video = videoRef.current
      const landmarker = landmarkerRef.current
      if (!video || !landmarker) return
      if (video.readyState < 2 || video.videoWidth === 0) return
      if (video.currentTime === lastVideoTimeRef.current) return
      lastVideoTimeRef.current = video.currentTime
      try {
        const res = landmarker.detectForVideo(video, performance.now())
        const lm = res.landmarks?.[0] ?? null
        if (lm && smoothLevelRef.current !== 'off') {
          smootherRef.current.filterLandmarks(lm, performance.now() / 1000)
        }
        landmarksRef.current = lm
        inferCountRef.current += 1
      } catch {
        // 单帧推理失败沿用上一帧
      }
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  // FPS 统计
  useEffect(() => {
    const timer = setInterval(() => {
      patchStatus({ fps: inferCountRef.current })
      inferCountRef.current = 0
    }, 1000)
    return () => clearInterval(timer)
  }, [patchStatus])

  const engine: PoseEngine = {
    videoRef,
    landmarksRef,
    status,
    smoothLevel,
    setSmoothLevel,
    modelType,
    setModelType,
    getLandmarker: () => landmarkerRef.current,
    startCamera,
    stopCamera,
    reloadModel: () => setReloadTick((t) => t + 1),
  }

  return (
    <Ctx.Provider value={engine}>
      {/* 全局唯一的隐藏摄像头视频元素 */}
      <video ref={videoRef} playsInline muted className="hidden" />
      {children}
    </Ctx.Provider>
  )
}
