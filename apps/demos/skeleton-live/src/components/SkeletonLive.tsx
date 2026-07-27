import { useEffect, useRef, useState } from 'react'
import { PoseLandmarker } from '@mediapipe/tasks-vision'
import { loadPoseLandmarker, type Delegate, type ModelType } from '../lib/pose'

type SourceType = 'camera' | 'video'
type Resolution = '480p' | '720p'

const RESOLUTIONS: Record<Resolution, { width: number; height: number; label: string }> = {
  '480p': { width: 640, height: 480, label: '640 × 480(省性能)' },
  '720p': { width: 1280, height: 720, label: '1280 × 720(更清晰)' },
}

const LINE_COLOR = '#2dffc4'
const POINT_COLOR = '#ff5c8a'
const GREEN_SCREEN = '#00ff00'

function cameraErrorMessage(err: unknown): string {
  const name = err instanceof DOMException ? err.name : ''
  if (name === 'NotAllowedError' || name === 'SecurityError') {
    return '摄像头权限被拒绝。请在浏览器地址栏的权限设置里允许摄像头,然后刷新页面。'
  }
  if (name === 'NotFoundError' || name === 'OverconstrainedError') {
    return '未检测到可用的摄像头。可以改用「上传视频」模式测试骨骼效果。'
  }
  return '摄像头启动失败。请确认没有其他应用占用摄像头,或使用「上传视频」模式。'
}

export default function SkeletonLive() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const landmarkerRef = useRef<PoseLandmarker | null>(null)
  const lastVideoTimeRef = useRef(-1)
  const lastResultsRef = useRef<ReturnType<PoseLandmarker['detectForVideo']> | null>(null)
  const inferCountRef = useRef(0)
  const liveModeRef = useRef(false)

  const [modelType, setModelType] = useState<ModelType>('lite')
  const [resolution, setResolution] = useState<Resolution>('480p')
  const [source, setSource] = useState<SourceType>('camera')
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState('')
  const [liveMode, setLiveMode] = useState(false)
  const [panelOpen, setPanelOpen] = useState(true)

  const [fps, setFps] = useState(0)
  const [modelStatus, setModelStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [delegateInfo, setDelegateInfo] = useState<Delegate | null>(null)
  const [modelSource, setModelSource] = useState<'local' | 'cdn' | null>(null)
  const [modelError, setModelError] = useState<string | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [reloadTick, setReloadTick] = useState(0)

  // 同步 liveMode 到 ref,供渲染循环读取
  useEffect(() => {
    liveModeRef.current = liveMode
  }, [liveMode])

  // Esc 退出直播模式
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLiveMode(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // 加载 / 切换姿态模型(GPU 优先,失败回退 CPU)
  useEffect(() => {
    let cancelled = false
    setModelStatus('loading')
    setModelError(null)
    loadPoseLandmarker(modelType)
      .then(({ landmarker, delegate, modelSource: ms }) => {
        if (cancelled) {
          landmarker.close()
          return
        }
        landmarkerRef.current?.close()
        landmarkerRef.current = landmarker
        lastResultsRef.current = null
        lastVideoTimeRef.current = -1
        setDelegateInfo(delegate)
        setModelSource(ms)
        setModelStatus('ready')
      })
      .catch((e) => {
        if (cancelled) return
        setModelStatus('error')
        setModelError(e instanceof Error ? e.message : String(e))
      })
    return () => {
      cancelled = true
    }
  }, [modelType, reloadTick])

  // 输入源:摄像头 / 上传视频
  useEffect(() => {
    let cancelled = false
    let stream: MediaStream | null = null
    const video = videoRef.current
    if (!video) return

    if (source === 'camera') {
      setCameraError(null)
      const { width, height } = RESOLUTIONS[resolution]
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError('当前环境不支持摄像头。摄像头功能需要 localhost 或 https 环境。')
        return
      }
      navigator.mediaDevices
        .getUserMedia({
          video: { width: { ideal: width }, height: { ideal: height }, facingMode: 'user' },
          audio: false,
        })
        .then((s) => {
          if (cancelled) {
            s.getTracks().forEach((t) => t.stop())
            return
          }
          stream = s
          video.srcObject = s
          video.play().catch(() => {})
        })
        .catch((err) => {
          if (!cancelled) setCameraError(cameraErrorMessage(err))
        })
    } else {
      video.srcObject = null
      if (fileUrl) {
        video.src = fileUrl
        video.loop = true
        video.play().catch(() => {})
      }
    }

    return () => {
      cancelled = true
      stream?.getTracks().forEach((t) => t.stop())
      if (video) video.srcObject = null
    }
  }, [source, resolution, fileUrl])

  // 渲染 + 推理主循环
  useEffect(() => {
    let raf = 0

    const renderFrame = () => {
      const video = videoRef.current
      const canvas = canvasRef.current
      if (!video || !canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      if (video.readyState >= 2 && video.videoWidth > 0) {
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
        }
        const w = canvas.width
        const h = canvas.height
        const live = liveModeRef.current

        // 同一帧不重复推理
        const landmarker = landmarkerRef.current
        if (landmarker && video.currentTime !== lastVideoTimeRef.current) {
          lastVideoTimeRef.current = video.currentTime
          try {
            lastResultsRef.current = landmarker.detectForVideo(video, performance.now())
            inferCountRef.current += 1
          } catch {
            // 单帧推理失败时沿用上一帧结果
          }
        }

        if (live) {
          // 直播模式:纯绿底,只画骨骼
          ctx.fillStyle = GREEN_SCREEN
          ctx.fillRect(0, 0, w, h)
        } else {
          // 镜像视频 + 暗色蒙版
          ctx.save()
          ctx.translate(w, 0)
          ctx.scale(-1, 1)
          ctx.drawImage(video, 0, 0, w, h)
          ctx.restore()
          ctx.fillStyle = 'rgba(0, 0, 0, 0.45)'
          ctx.fillRect(0, 0, w, h)
        }

        const landmarks = lastResultsRef.current?.landmarks?.[0]
        if (landmarks) {
          ctx.save()
          ctx.translate(w, 0)
          ctx.scale(-1, 1) // 骨骼同样镜像,和舞者视角一致

          ctx.strokeStyle = LINE_COLOR
          ctx.lineWidth = Math.max(2, w / 240)
          ctx.lineCap = 'round'
          for (const conn of PoseLandmarker.POSE_CONNECTIONS) {
            const a = landmarks[conn.start]
            const b = landmarks[conn.end]
            if (!a || !b) continue
            if ((a.visibility ?? 1) < 0.3 || (b.visibility ?? 1) < 0.3) continue
            ctx.beginPath()
            ctx.moveTo(a.x * w, a.y * h)
            ctx.lineTo(b.x * w, b.y * h)
            ctx.stroke()
          }

          ctx.fillStyle = POINT_COLOR
          const r = Math.max(3, w / 320)
          for (const p of landmarks) {
            if ((p.visibility ?? 1) < 0.3) continue
            ctx.beginPath()
            ctx.arc(p.x * w, p.y * h, r, 0, Math.PI * 2)
            ctx.fill()
          }
          ctx.restore()
        }
      }
    }

    const loop = () => {
      renderFrame()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  // FPS 统计(每秒推理帧数)
  useEffect(() => {
    const timer = setInterval(() => {
      setFps(inferCountRef.current)
      inferCountRef.current = 0
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (fileUrl) URL.revokeObjectURL(fileUrl)
    setFileUrl(URL.createObjectURL(file))
    setFileName(file.name)
  }

  const statusText =
    modelStatus === 'loading'
      ? '模型加载中…'
      : modelStatus === 'error'
        ? '模型加载失败'
        : `${modelType === 'lite' ? 'lite(省性能)' : 'full(更准)'} · ${delegateInfo} · 推理中`

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={{ background: liveMode ? GREEN_SCREEN : '#0a0a0b' }}
    >
      <video ref={videoRef} playsInline muted className="hidden" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ objectFit: 'contain' }}
      />

      {/* 状态角标 */}
      {!liveMode && (
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-md bg-black/60 px-3 py-1.5 font-mono text-xs text-neutral-300 backdrop-blur">
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              modelStatus === 'ready' ? 'bg-emerald-400' : modelStatus === 'error' ? 'bg-red-500' : 'bg-amber-400 animate-pulse'
            }`}
          />
          <span>FPS {fps}</span>
          <span className="text-neutral-500">|</span>
          <span>{statusText}</span>
          {modelSource === 'cdn' && <span className="text-amber-400">(CDN 模型)</span>}
        </div>
      )}

      {/* 摄像头错误提示 */}
      {!liveMode && cameraError && source === 'camera' && (
        <div className="absolute inset-x-0 top-16 mx-auto w-fit max-w-md rounded-lg border border-red-500/40 bg-red-950/80 px-4 py-3 text-sm text-red-200">
          {cameraError}
        </div>
      )}

      {/* 模型加载失败 */}
      {!liveMode && modelStatus === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70">
          <div className="w-80 rounded-xl border border-neutral-800 bg-neutral-900 p-6 text-center">
            <p className="mb-2 text-sm font-medium text-red-400">姿态模型加载失败</p>
            <p className="mb-4 break-all text-xs text-neutral-500">{modelError}</p>
            <button
              onClick={() => setReloadTick((t) => t + 1)}
              className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400"
            >
              重试
            </button>
          </div>
        </div>
      )}

      {/* 控制面板 */}
      {!liveMode && (
        <div className="absolute right-4 top-4 w-72">
          <button
            onClick={() => setPanelOpen((v) => !v)}
            className="mb-2 ml-auto block rounded-md bg-black/60 px-3 py-1.5 text-xs text-neutral-300 backdrop-blur hover:text-white"
          >
            {panelOpen ? '收起面板 ▴' : '控制面板 ▾'}
          </button>

          {panelOpen && (
            <div className="space-y-4 rounded-xl border border-neutral-800 bg-neutral-950/90 p-4 text-sm text-neutral-200 backdrop-blur">
              <div>
                <p className="mb-1.5 text-xs text-neutral-500">姿态模型</p>
                <div className="flex gap-2">
                  {(['lite', 'full'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setModelType(m)}
                      className={`flex-1 rounded-md px-2 py-1.5 text-xs ${
                        modelType === m
                          ? 'bg-emerald-500 font-medium text-black'
                          : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                      }`}
                    >
                      {m === 'lite' ? 'lite(省性能)' : 'full(更准)'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-1.5 text-xs text-neutral-500">摄像头分辨率</p>
                <div className="flex gap-2">
                  {(Object.keys(RESOLUTIONS) as Resolution[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => setResolution(r)}
                      className={`flex-1 rounded-md px-2 py-1.5 text-xs ${
                        resolution === r
                          ? 'bg-emerald-500 font-medium text-black'
                          : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                      }`}
                    >
                      {RESOLUTIONS[r].label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-1.5 text-xs text-neutral-500">输入源</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSource('camera')}
                    className={`flex-1 rounded-md px-2 py-1.5 text-xs ${
                      source === 'camera'
                        ? 'bg-emerald-500 font-medium text-black'
                        : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                    }`}
                  >
                    摄像头
                  </button>
                  <button
                    onClick={() => setSource('video')}
                    className={`flex-1 rounded-md px-2 py-1.5 text-xs ${
                      source === 'video'
                        ? 'bg-emerald-500 font-medium text-black'
                        : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                    }`}
                  >
                    上传视频
                  </button>
                </div>
                {source === 'video' && (
                  <div className="mt-2">
                    <label className="block cursor-pointer rounded-md border border-dashed border-neutral-700 px-3 py-2 text-center text-xs text-neutral-400 hover:border-neutral-500 hover:text-neutral-200">
                      {fileName || '选择本地练舞视频(循环播放)'}
                      <input type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
                    </label>
                  </div>
                )}
              </div>

              <button
                onClick={() => setLiveMode(true)}
                className="w-full rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium text-black hover:bg-emerald-400"
              >
                进入直播模式(绿幕)
              </button>

              <details className="rounded-md border border-neutral-800 bg-neutral-900/60 p-3">
                <summary className="cursor-pointer text-xs font-medium text-neutral-300">
                  怎么用 OBS 直播?
                </summary>
                <ol className="mt-2 list-decimal space-y-1 pl-4 text-xs leading-relaxed text-neutral-400">
                  <li>打开 OBS,添加来源 → 浏览器(Browser Source)</li>
                  <li>URL 填本页地址,宽高设为画布分辨率</li>
                  <li>回到本页,点「进入直播模式」</li>
                  <li>OBS 里给浏览器源加「色度键」滤镜,抠掉绿色</li>
                  <li>骨骼就叠加在你自己的摄像头画面上了</li>
                </ol>
                <p className="mt-2 text-xs text-neutral-500">
                  提示:摄像头功能需要 localhost 或 https 环境。
                </p>
              </details>
            </div>
          )}
        </div>
      )}

      {/* 直播模式下的退出入口 */}
      {liveMode && (
        <button
          onClick={() => setLiveMode(false)}
          className="absolute bottom-4 right-4 rounded-md bg-black/70 px-3 py-1.5 text-xs text-white opacity-20 transition-opacity hover:opacity-100"
        >
          退出直播模式(Esc)
        </button>
      )}
    </div>
  )
}
