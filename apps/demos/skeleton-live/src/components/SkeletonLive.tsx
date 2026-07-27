import { useEffect, useRef, useState } from 'react'
import { PoseLandmarker } from '@mediapipe/tasks-vision'
import { loadPoseLandmarker, type Delegate, type ModelType } from '../lib/pose'
import {
  BODY_CONNECTIONS,
  COLOR_GOOD,
  bodyVisible,
  connectionPart,
  emptyBodyPose,
  featuresFromBody,
  featuresFromLandmarks,
  partColor,
  scoreFrame,
  toBodyPose,
  type BodyPart,
} from '../lib/bodyPose'
import {
  PoseSmoother,
  SMOOTH_LABELS,
  SMOOTH_LEVELS,
  SMOOTH_PRESETS,
  type SmoothLevel,
} from '../lib/oneEuroFilter'
import { extractKeyPoses, type KeyPose } from '../lib/keyPoses'
import {
  parseSequence,
  sequenceToJson,
  type ReferenceSample,
  type ReferenceSequence,
} from '../lib/reference'
import KeyPoseCard from './KeyPoseCard'

type SourceType = 'camera' | 'video'
type Resolution = '480p' | '720p'
type FollowState = 'idle' | 'countdown' | 'running' | 'finished'
type RecordState = 'idle' | 'countdown' | 'recording'

const RESOLUTIONS: Record<Resolution, { width: number; height: number; label: string }> = {
  '480p': { width: 640, height: 480, label: '640 × 480(省性能)' },
  '720p': { width: 1280, height: 720, label: '1280 × 720(更清晰)' },
}

const RECORD_CHOICES = [10, 20, 30]

const POINT_COLOR = '#ff5c8a'
const GHOST_COLOR = 'rgba(255, 255, 255, 0.35)'
const GREEN_SCREEN = '#00ff00'
const COUNTDOWN_SECONDS = 3
/** 界面帧分滑动平均窗口(秒) */
const SCORE_WINDOW_SEC = 0.5
/** 关键动作得分的统计窗口(秒,围绕关键时刻) */
const KEY_SCORE_RADIUS = 0.3

const ALL_PARTS: BodyPart[] = ['leftArm', 'rightArm', 'leftLeg', 'rightLeg', 'torso']

function neutralPartColors(): Record<BodyPart, string> {
  return {
    leftArm: COLOR_GOOD,
    rightArm: COLOR_GOOD,
    leftLeg: COLOR_GOOD,
    rightLeg: COLOR_GOOD,
    torso: COLOR_GOOD,
  }
}

interface ScoreSample {
  t: number
  score: number
  partErr: Record<BodyPart, number>
}

interface FollowRun {
  startPerf: number
  duration: number
  sampleIdx: number
  sum: number
  count: number
  frame: number | null
  lowVis: boolean
  progress: number
  t: number
  window: ScoreSample[]
  keyScores: Array<{ sum: number; count: number }>
}

interface RecordRun {
  startPerf: number
  duration: number
  samples: ReferenceSample[]
}

interface Countdown {
  endPerf: number
  label: string
  action: () => void
}

interface HudState {
  frame: number | null
  avg: number
  progress: number
  lowVis: boolean
  nextKey: { idx: number; remain: number } | null
}

const HUD_IDLE: HudState = { frame: null, avg: 0, progress: 0, lowVis: false, nextKey: null }

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

function scoreColor(score: number): string {
  if (score >= 80) return '#2dffc4'
  if (score >= 50) return '#facc15'
  return '#ef4444'
}

function fmtTime(t: number): string {
  return `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`
}

export default function SkeletonLive() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const refVideoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const landmarkerRef = useRef<PoseLandmarker | null>(null)
  const lastVideoTimeRef = useRef(-1)
  const lastResultsRef = useRef<ReturnType<PoseLandmarker['detectForVideo']> | null>(null)
  const inferCountRef = useRef(0)
  const liveModeRef = useRef(false)
  const refSeqRef = useRef<ReferenceSequence | null>(null)
  const followRunRef = useRef<FollowRun | null>(null)
  const recordRunRef = useRef<RecordRun | null>(null)
  const countdownRef = useRef<Countdown | null>(null)
  const partColorsRef = useRef<Record<BodyPart, string>>(neutralPartColors())
  const lastHudRef = useRef(0)
  const cancelExtractRef = useRef(false)
  const smootherRef = useRef(new PoseSmoother(SMOOTH_PRESETS.medium))
  const smoothLevelRef = useRef<SmoothLevel>('medium')
  const keyPosesRef = useRef<KeyPose[]>([])

  const [modelType, setModelType] = useState<ModelType>('lite')
  const [resolution, setResolution] = useState<Resolution>('480p')
  const [source, setSource] = useState<SourceType>('camera')
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState('')
  const [liveMode, setLiveMode] = useState(false)
  const [panelOpen, setPanelOpen] = useState(true)
  const [smoothLevel, setSmoothLevel] = useState<SmoothLevel>('medium')

  const [fps, setFps] = useState(0)
  const [modelStatus, setModelStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [delegateInfo, setDelegateInfo] = useState<Delegate | null>(null)
  const [modelSource, setModelSource] = useState<'local' | 'cdn' | null>(null)
  const [modelError, setModelError] = useState<string | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [reloadTick, setReloadTick] = useState(0)

  const [refSeq, setRefSeq] = useState<ReferenceSequence | null>(null)
  const [refName, setRefName] = useState('')
  const [refError, setRefError] = useState<string | null>(null)
  const [extractProgress, setExtractProgress] = useState<number | null>(null)
  const [keyPoses, setKeyPoses] = useState<KeyPose[]>([])
  const [followState, setFollowState] = useState<FollowState>('idle')
  const [recordState, setRecordState] = useState<RecordState>('idle')
  const [finalScore, setFinalScore] = useState(0)
  const [keyResults, setKeyResults] = useState<Array<{ t: number; avg: number }> | null>(null)
  const [hud, setHud] = useState<HudState>(HUD_IDLE)

  useEffect(() => {
    liveModeRef.current = liveMode
  }, [liveMode])

  useEffect(() => {
    refSeqRef.current = refSeq
  }, [refSeq])

  useEffect(() => {
    keyPosesRef.current = keyPoses
  }, [keyPoses])

  // 平滑档位切换
  useEffect(() => {
    smoothLevelRef.current = smoothLevel
    if (smoothLevel === 'off') {
      smootherRef.current.reset()
    } else {
      smootherRef.current.setParams(SMOOTH_PRESETS[smoothLevel])
    }
  }, [smoothLevel])

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
    smootherRef.current.reset()
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
    smootherRef.current.reset()

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

  // ---------- 参考动作来源 ----------

  const applyNewReference = (seq: ReferenceSequence, name: string) => {
    followRunRef.current = null
    countdownRef.current = null
    partColorsRef.current = neutralPartColors()
    setFollowState('idle')
    setKeyResults(null)
    setRefSeq(seq)
    setRefName(name)
    setRefError(null)
    setKeyPoses(extractKeyPoses(seq))
  }

  const extractFromVideoFile = async (file: File) => {
    const landmarker = landmarkerRef.current
    const v = refVideoRef.current
    if (!landmarker || !v) {
      setRefError('模型还没加载好,请稍后再试。')
      return
    }
    cancelExtractRef.current = false
    setRefError(null)
    setExtractProgress(0)

    // 提取时就用当前档位的滤波器,存进序列的就是平滑后的数据
    const extractSmoother =
      smoothLevelRef.current === 'off' ? null : new PoseSmoother(SMOOTH_PRESETS[smoothLevelRef.current])

    const url = URL.createObjectURL(file)
    v.src = url
    v.muted = true
    v.loop = false
    try {
      await new Promise<void>((resolve, reject) => {
        v.onloadedmetadata = () => resolve()
        v.onerror = () => reject(new Error('视频文件无法解码'))
      })
      await v.play()
    } catch (e) {
      setExtractProgress(null)
      setRefError(e instanceof Error ? e.message : '视频加载失败')
      URL.revokeObjectURL(url)
      return
    }

    const samples: ReferenceSample[] = []
    let lastT = -1
    await new Promise<void>((resolve) => {
      const step = () => {
        if (cancelExtractRef.current || v.ended) {
          resolve()
          return
        }
        if (v.readyState >= 2 && v.currentTime !== lastT) {
          lastT = v.currentTime
          try {
            const res = landmarker.detectForVideo(v, performance.now())
            const lm = res.landmarks?.[0]
            const ok = !!lm && bodyVisible(lm)
            if (ok && extractSmoother) {
              extractSmoother.filterLandmarks(lm, v.currentTime)
            }
            samples.push({ t: v.currentTime, ok, body: ok ? toBodyPose(lm) : emptyBodyPose() })
          } catch {
            // 单帧失败跳过
          }
          setExtractProgress(v.duration ? Math.min(1, v.currentTime / v.duration) : 0)
        }
        requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    })

    v.pause()
    v.removeAttribute('src')
    v.load()
    URL.revokeObjectURL(url)
    setExtractProgress(null)

    if (cancelExtractRef.current) return
    if (samples.filter((s) => s.ok).length < 5) {
      setRefError('视频里没识别到完整身体,换一段全身出镜的示范视频试试。')
      return
    }
    applyNewReference(
      {
        version: 1,
        createdAt: new Date().toISOString(),
        source: file.name,
        duration: samples[samples.length - 1].t,
        samples,
      },
      file.name,
    )
  }

  const importRefJson = async (file: File) => {
    try {
      const seq = parseSequence(await file.text())
      applyNewReference(seq, file.name)
    } catch (e) {
      setRefError(e instanceof Error ? e.message : '导入失败')
    }
  }

  const exportRefJson = () => {
    if (!refSeq) return
    const blob = new Blob([sequenceToJson(refSeq)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `reference-${refSeq.duration.toFixed(0)}s.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const clearReference = () => {
    followRunRef.current = null
    countdownRef.current = null
    partColorsRef.current = neutralPartColors()
    setFollowState('idle')
    setRefSeq(null)
    setRefName('')
    setRefError(null)
    setKeyPoses([])
    setKeyResults(null)
  }

  // ---------- 录制 / 跟练 ----------

  const startRecording = (seconds: number) => {
    if (recordState !== 'idle' || followState === 'running' || followState === 'countdown') return
    countdownRef.current = {
      endPerf: performance.now() + COUNTDOWN_SECONDS * 1000,
      label: '准备录制参考动作',
      action: () => {
        recordRunRef.current = { startPerf: performance.now(), duration: seconds, samples: [] }
        setRecordState('recording')
      },
    }
    setRecordState('countdown')
  }

  const startFollow = () => {
    if (!refSeqRef.current || recordState !== 'idle') return
    followRunRef.current = null
    partColorsRef.current = neutralPartColors()
    setKeyResults(null)
    setPanelOpen(false)
    countdownRef.current = {
      endPerf: performance.now() + COUNTDOWN_SECONDS * 1000,
      label: '准备跟练',
      action: () => {
        const seq = refSeqRef.current
        if (!seq) return
        followRunRef.current = {
          startPerf: performance.now(),
          duration: seq.duration,
          sampleIdx: 0,
          sum: 0,
          count: 0,
          frame: null,
          lowVis: false,
          progress: 0,
          t: 0,
          window: [],
          keyScores: keyPosesRef.current.map(() => ({ sum: 0, count: 0 })),
        }
        setFollowState('running')
      },
    }
    setFollowState('countdown')
  }

  const stopFollow = () => {
    followRunRef.current = null
    countdownRef.current = null
    partColorsRef.current = neutralPartColors()
    setFollowState('idle')
    setKeyResults(null)
    setHud(HUD_IDLE)
  }

  // ---------- 渲染 + 推理主循环 ----------

  useEffect(() => {
    let raf = 0

    const renderFrame = () => {
      const now = performance.now()
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

        // 同一帧不重复推理;推理后立即做 One Euro 平滑
        let didInfer = false
        const landmarker = landmarkerRef.current
        if (landmarker && video.currentTime !== lastVideoTimeRef.current) {
          lastVideoTimeRef.current = video.currentTime
          try {
            lastResultsRef.current = landmarker.detectForVideo(video, now)
            inferCountRef.current += 1
            const lm0 = lastResultsRef.current.landmarks?.[0]
            if (lm0 && smoothLevelRef.current !== 'off') {
              smootherRef.current.filterLandmarks(lm0, now / 1000)
            }
            didInfer = true
          } catch {
            // 单帧推理失败时沿用上一帧结果
          }
        }
        const landmarks = lastResultsRef.current?.landmarks?.[0]

        // ---- 录制参考(摄像头,滤波后的坐标) ----
        const rec = recordRunRef.current
        if (rec && didInfer) {
          const t = (now - rec.startPerf) / 1000
          const ok = !!landmarks && bodyVisible(landmarks)
          rec.samples.push({
            t,
            ok,
            body: ok ? toBodyPose(landmarks) : emptyBodyPose(),
          })
          if (t >= rec.duration) {
            recordRunRef.current = null
            setRecordState('idle')
            const good = rec.samples.filter((s) => s.ok).length
            if (good >= 5) {
              applyNewReference(
                {
                  version: 1,
                  createdAt: new Date().toISOString(),
                  source: 'camera',
                  duration: rec.duration,
                  samples: rec.samples,
                },
                `摄像头录制 ${rec.duration}s`,
              )
            } else {
              setRefError('录制时没识别到完整身体,请退后让全身入镜再录一次。')
            }
          }
        }

        // ---- 跟练打分 ----
        const seq = refSeqRef.current
        const fr = followRunRef.current
        if (fr && seq) {
          const t = (now - fr.startPerf) / 1000
          fr.t = t
          fr.progress = Math.min(1, t / fr.duration)
          if (t >= fr.duration) {
            const finalAvg = fr.count > 0 ? fr.sum / fr.count : 0
            const keys = keyPosesRef.current
            const results: Array<{ t: number; avg: number }> = []
            for (let ki = 0; ki < keys.length; ki++) {
              const ks = fr.keyScores[ki]
              if (ks && ks.count > 0) results.push({ t: keys[ki].t, avg: ks.sum / ks.count })
            }
            followRunRef.current = null
            partColorsRef.current = neutralPartColors()
            setFinalScore(finalAvg)
            setKeyResults(results)
            setFollowState('finished')
          } else {
            while (fr.sampleIdx + 1 < seq.samples.length && seq.samples[fr.sampleIdx + 1].t <= t) {
              fr.sampleIdx += 1
            }
            const sample = seq.samples[fr.sampleIdx]
            if (landmarks && bodyVisible(landmarks) && sample.ok) {
              // 打分特征来自滤波后的坐标
              const fs = scoreFrame(featuresFromLandmarks(landmarks), featuresFromBody(sample.body))
              fr.sum += fs.score
              fr.count += 1
              fr.lowVis = false

              // 0.5s 滑动平均:显示分 + 部位染色都走窗口均值,避免狂跳
              fr.window.push({ t, score: fs.score, partErr: fs.partErrDeg })
              const cutoff = t - SCORE_WINDOW_SEC
              while (fr.window.length > 0 && fr.window[0].t < cutoff) fr.window.shift()
              const n = fr.window.length
              fr.frame = fr.window.reduce((s, x) => s + x.score, 0) / n
              const colors = neutralPartColors()
              for (const part of ALL_PARTS) {
                const avgErr = fr.window.reduce((s, x) => s + x.partErr[part], 0) / n
                colors[part] = partColor(avgErr)
              }
              partColorsRef.current = colors

              // 关键动作得分统计(关键时刻 ±0.3s)
              const keys = keyPosesRef.current
              for (let ki = 0; ki < keys.length; ki++) {
                if (Math.abs(keys[ki].t - t) <= KEY_SCORE_RADIUS) {
                  fr.keyScores[ki].sum += fs.score
                  fr.keyScores[ki].count += 1
                }
              }
            } else {
              fr.frame = null
              fr.lowVis = !landmarks || !bodyVisible(landmarks)
              partColorsRef.current = neutralPartColors()
            }
          }
        }

        // ---- 绘制 ----
        if (live) {
          ctx.fillStyle = GREEN_SCREEN
          ctx.fillRect(0, 0, w, h)
        } else {
          ctx.save()
          ctx.translate(w, 0)
          ctx.scale(-1, 1)
          ctx.drawImage(video, 0, 0, w, h)
          ctx.restore()
          ctx.fillStyle = 'rgba(0, 0, 0, 0.45)'
          ctx.fillRect(0, 0, w, h)
        }

        // 幽灵骨架(参考动作当前时刻)
        let ghostSample: ReferenceSample | null = null
        if (seq) {
          if (fr) ghostSample = seq.samples[fr.sampleIdx]
          else if (countdownRef.current?.label === '准备跟练') ghostSample = seq.samples[0]
        }
        if (ghostSample && ghostSample.ok) {
          let ox = w / 2
          let oy = h * 0.62
          let sc = h * 0.18
          if (landmarks) {
            const hl = landmarks[23]
            const hr = landmarks[24]
            const sl = landmarks[11]
            const sr = landmarks[12]
            if (hl && hr && sl && sr) {
              ox = ((hl.x + hr.x) / 2) * w
              oy = ((hl.y + hr.y) / 2) * h
              sc = Math.hypot((sl.x - sr.x) * w, (sl.y - sr.y) * h) || sc
            }
          }
          ctx.save()
          ctx.translate(w, 0)
          ctx.scale(-1, 1)
          ctx.strokeStyle = GHOST_COLOR
          ctx.lineWidth = Math.max(2, w / 300)
          ctx.lineCap = 'round'
          for (const c of BODY_CONNECTIONS) {
            const a = ghostSample.body[c.start - 11]
            const b = ghostSample.body[c.end - 11]
            if (!a || !b || a.v < 0.3 || b.v < 0.3) continue
            ctx.beginPath()
            ctx.moveTo(ox + a.x * sc, oy + a.y * sc)
            ctx.lineTo(ox + b.x * sc, oy + b.y * sc)
            ctx.stroke()
          }
          ctx.restore()
        }

        // 实时骨架(只画身体;跟练中按部位偏差染色)
        if (landmarks) {
          const colors = partColorsRef.current
          ctx.save()
          ctx.translate(w, 0)
          ctx.scale(-1, 1)

          ctx.lineWidth = Math.max(2, w / 240)
          ctx.lineCap = 'round'
          for (const conn of BODY_CONNECTIONS) {
            const a = landmarks[conn.start]
            const b = landmarks[conn.end]
            if (!a || !b) continue
            if ((a.visibility ?? 1) < 0.3 || (b.visibility ?? 1) < 0.3) continue
            ctx.strokeStyle = colors[connectionPart(conn.start, conn.end)]
            ctx.beginPath()
            ctx.moveTo(a.x * w, a.y * h)
            ctx.lineTo(b.x * w, b.y * h)
            ctx.stroke()
          }

          ctx.fillStyle = POINT_COLOR
          const r = Math.max(3, w / 320)
          for (let i = 11; i < landmarks.length; i++) {
            const p = landmarks[i]
            if ((p.visibility ?? 1) < 0.3) continue
            ctx.beginPath()
            ctx.arc(p.x * w, p.y * h, r, 0, Math.PI * 2)
            ctx.fill()
          }
          ctx.restore()
        }

        // ---- 画布上的倒计时 / 录制提示 ----
        const cd = countdownRef.current
        if (cd) {
          const remain = cd.endPerf - now
          if (remain <= 0) {
            countdownRef.current = null
            cd.action()
          } else {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.35)'
            ctx.fillRect(0, 0, w, h)
            ctx.fillStyle = '#ffffff'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.font = `bold ${Math.round(h / 4)}px sans-serif`
            ctx.fillText(String(Math.ceil(remain / 1000)), w / 2, h / 2)
            ctx.font = `${Math.round(h / 26)}px sans-serif`
            ctx.fillText(cd.label, w / 2, h / 2 + h / 5)
          }
        }
        const recNow = recordRunRef.current
        if (recNow) {
          const remain = Math.max(0, recNow.duration - (now - recNow.startPerf) / 1000)
          ctx.textAlign = 'center'
          ctx.textBaseline = 'top'
          ctx.font = `${Math.round(h / 22)}px sans-serif`
          ctx.fillStyle = '#ef4444'
          ctx.beginPath()
          ctx.arc(w / 2 - 90, h / 18 + h / 44, h / 60, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillText(`REC ${remain.toFixed(0)}s`, w / 2 + 10, h / 18)
        }

        // ---- HUD 节流同步到 React ----
        if (now - lastHudRef.current > 250) {
          lastHudRef.current = now
          const frNow = followRunRef.current
          if (frNow) {
            const keys = keyPosesRef.current
            let nextKey: { idx: number; remain: number } | null = null
            for (let ki = 0; ki < keys.length; ki++) {
              if (keys[ki].t > frNow.t + 0.05) {
                nextKey = { idx: ki, remain: keys[ki].t - frNow.t }
                break
              }
            }
            setHud({
              frame: frNow.frame,
              avg: frNow.count > 0 ? frNow.sum / frNow.count : 0,
              progress: frNow.progress,
              lowVis: frNow.lowVis,
              nextKey,
            })
          }
        }
      }
    }

    const loop = () => {
      renderFrame()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const followActive = followState === 'running' || followState === 'countdown'
  const panelBtn = 'flex-1 rounded-md bg-neutral-800 px-2 py-2 text-xs text-neutral-300 hover:bg-neutral-700 disabled:opacity-40'
  const panelBtnActive = 'flex-1 rounded-md bg-emerald-500 px-2 py-2 text-xs font-medium text-black'

  const nextKeySample =
    followState === 'running' && hud.nextKey && refSeq && keyPoses[hud.nextKey.idx]
      ? refSeq.samples[keyPoses[hud.nextKey.idx].index]
      : null

  const bestKeys = keyResults ? [...keyResults].sort((a, b) => b.avg - a.avg).slice(0, 3) : []
  const worstKeys = keyResults
    ? [...keyResults]
        .filter((r) => !bestKeys.includes(r))
        .sort((a, b) => a.avg - b.avg)
        .slice(0, 3)
    : []
  const worstShown = worstKeys.length > 0 ? worstKeys : [...bestKeys].reverse()

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={{ background: liveMode ? GREEN_SCREEN : '#0a0a0b' }}
    >
      <video ref={videoRef} playsInline muted className="hidden" />
      <video ref={refVideoRef} playsInline muted className="hidden" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ objectFit: 'contain' }}
      />

      {/* 状态角标 */}
      {!liveMode && (
        <div className="absolute left-2 top-2 flex items-center gap-2 rounded-md bg-black/60 px-2 py-1 font-mono text-[10px] text-neutral-300 backdrop-blur sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-xs">
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

      {/* 跟练分数 HUD */}
      {!liveMode && followActive && (
        <div className="pointer-events-none absolute inset-x-0 top-10 flex flex-col items-center sm:top-12">
          <div
            className="text-4xl font-bold tabular-nums sm:text-5xl"
            style={{ color: hud.frame !== null ? scoreColor(hud.frame) : '#737373' }}
          >
            {hud.frame !== null ? Math.round(hud.frame) : '--'}
          </div>
          <div className="mt-1 text-xs text-neutral-300">
            平均分 {Math.round(hud.avg)} · 进度 {Math.round(hud.progress * 100)}%
          </div>
          {hud.lowVis && (
            <div className="mt-1.5 rounded bg-amber-500/20 px-2 py-0.5 text-xs text-amber-300">
              未识别到完整身体,本帧不计分
            </div>
          )}
        </div>
      )}

      {/* 「下一个动作」预告卡(右侧中部,不挡人) */}
      {!liveMode && nextKeySample && nextKeySample.ok && hud.nextKey && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 sm:right-4">
          <KeyPoseCard body={nextKeySample.body} remain={hud.nextKey.remain} />
        </div>
      )}

      {/* 底部进度时间轴:关键动作标记 + 播放头 */}
      {!liveMode && followActive && refSeq && refSeq.duration > 0 && (
        <div className="pointer-events-none absolute inset-x-4 bottom-3 sm:inset-x-24">
          <div className="relative h-1.5 rounded-full bg-neutral-800/80">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-emerald-400/70"
              style={{ width: `${hud.progress * 100}%` }}
            />
            {keyPoses.map((k, i) => (
              <div
                key={i}
                className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[1px] bg-white/80"
                style={{ left: `${(k.t / refSeq.duration) * 100}%` }}
              />
            ))}
            <div
              className="absolute top-1/2 h-3.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded bg-emerald-300"
              style={{ left: `${hud.progress * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* 跟练结束结算 */}
      {!liveMode && followState === 'finished' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <div className="max-h-[85vh] w-80 overflow-y-auto rounded-xl border border-neutral-800 bg-neutral-900 p-6 text-center">
            <p className="text-xs text-neutral-500">跟练完成,全程平均分</p>
            <p className="my-2 text-5xl font-bold tabular-nums" style={{ color: scoreColor(finalScore) }}>
              {Math.round(finalScore)}
            </p>
            {keyResults && keyResults.length > 0 && (
              <div className="mt-3 space-y-2 text-left text-xs">
                <div className="rounded-md bg-neutral-800/60 p-2.5">
                  <p className="mb-1 font-medium text-emerald-300">做得最好的关键动作</p>
                  {bestKeys.map((r) => (
                    <p key={`b${r.t}`} className="flex justify-between text-neutral-300">
                      <span>{fmtTime(r.t)}</span>
                      <span className="tabular-nums">{Math.round(r.avg)} 分</span>
                    </p>
                  ))}
                </div>
                <div className="rounded-md bg-neutral-800/60 p-2.5">
                  <p className="mb-1 font-medium text-red-300">最需要练的关键动作</p>
                  {worstShown.map((r) => (
                    <p key={`w${r.t}`} className="flex justify-between text-neutral-300">
                      <span>{fmtTime(r.t)}</span>
                      <span className="tabular-nums">{Math.round(r.avg)} 分</span>
                    </p>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-4 flex gap-2">
              <button onClick={startFollow} className={panelBtnActive}>
                再来一次
              </button>
              <button onClick={stopFollow} className={panelBtn}>
                退出
              </button>
            </div>
          </div>
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

      {/* 控制面板(移动端底部抽屉,桌面右上角) */}
      {!liveMode && (
        <div className="absolute inset-x-2 bottom-2 sm:inset-x-auto sm:bottom-auto sm:right-4 sm:top-4 sm:w-72">
          <button
            onClick={() => setPanelOpen((v) => !v)}
            className="mb-2 ml-auto block rounded-md bg-black/60 px-3 py-1.5 text-xs text-neutral-300 backdrop-blur hover:text-white"
          >
            {panelOpen ? '收起面板 ▾' : '控制面板 ▴'}
          </button>

          {panelOpen && (
            <div className="max-h-[52vh] space-y-4 overflow-y-auto rounded-xl border border-neutral-800 bg-neutral-950/90 p-4 text-sm text-neutral-200 backdrop-blur sm:max-h-[82vh]">
              <div>
                <p className="mb-1.5 text-xs text-neutral-500">姿态模型</p>
                <div className="flex gap-2">
                  {(['lite', 'full'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setModelType(m)}
                      className={modelType === m ? panelBtnActive : panelBtn}
                    >
                      {m === 'lite' ? 'lite(省性能)' : 'full(更准)'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-1.5 text-xs text-neutral-500">平滑强度(治抖动)</p>
                <div className="flex gap-2">
                  {SMOOTH_LEVELS.map((l) => (
                    <button
                      key={l}
                      onClick={() => setSmoothLevel(l)}
                      className={smoothLevel === l ? panelBtnActive : panelBtn}
                    >
                      {SMOOTH_LABELS[l]}
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
                      className={resolution === r ? panelBtnActive : panelBtn}
                    >
                      {RESOLUTIONS[r].label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-1.5 text-xs text-neutral-500">输入源</p>
                <div className="flex gap-2">
                  <button onClick={() => setSource('camera')} className={source === 'camera' ? panelBtnActive : panelBtn}>
                    摄像头
                  </button>
                  <button onClick={() => setSource('video')} className={source === 'video' ? panelBtnActive : panelBtn}>
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

              {/* 参考动作 */}
              <div>
                <p className="mb-1.5 text-xs text-neutral-500">参考动作(跟练打分)</p>
                {extractProgress !== null ? (
                  <div className="mb-2 rounded-md bg-neutral-900 px-2 py-2 text-xs text-neutral-300">
                    <div className="mb-1 flex items-center justify-between">
                      <span>正在提取参考姿态… {Math.round(extractProgress * 100)}%</span>
                      <button
                        onClick={() => {
                          cancelExtractRef.current = true
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        取消
                      </button>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-neutral-800">
                      <div className="h-full bg-emerald-400" style={{ width: `${extractProgress * 100}%` }} />
                    </div>
                  </div>
                ) : refSeq ? (
                  <div className="mb-2 rounded-md bg-neutral-900 px-2 py-1.5 text-xs text-neutral-300">
                    {refName} · {refSeq.duration.toFixed(1)}s · {refSeq.samples.length} 帧 · 关键动作{' '}
                    {keyPoses.length} 个
                  </div>
                ) : (
                  <p className="mb-2 text-xs text-neutral-600">先录制 / 导入一个参考动作。</p>
                )}
                {refError && <p className="mb-2 text-xs text-red-400">{refError}</p>}

                <div className="flex gap-2">
                  <label className={`${panelBtn} cursor-pointer text-center`}>
                    上传参考视频
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0]
                        if (f) void extractFromVideoFile(f)
                        e.target.value = ''
                      }}
                    />
                  </label>
                  <label className={`${panelBtn} cursor-pointer text-center`}>
                    导入 JSON
                    <input
                      type="file"
                      accept="application/json,.json"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0]
                        if (f) void importRefJson(f)
                        e.target.value = ''
                      }}
                    />
                  </label>
                </div>

                <div className="mt-2 flex gap-2">
                  {RECORD_CHOICES.map((s) => (
                    <button
                      key={s}
                      onClick={() => startRecording(s)}
                      disabled={recordState !== 'idle' || followActive}
                      className={panelBtn}
                    >
                      录 {s}s
                    </button>
                  ))}
                </div>
                {recordState !== 'idle' && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {recordState === 'countdown' ? '倒计时准备中…' : '正在录制参考动作(看画面上的 REC)'}
                  </p>
                )}

                {refSeq && (
                  <div className="mt-2 flex gap-2">
                    <button onClick={exportRefJson} className={panelBtn}>
                      导出 JSON
                    </button>
                    <button onClick={clearReference} className={panelBtn}>
                      清除参考
                    </button>
                  </div>
                )}
              </div>

              {/* 跟练 */}
              <div>
                <p className="mb-1.5 text-xs text-neutral-500">跟练打分</p>
                {followActive ? (
                  <button
                    onClick={stopFollow}
                    className="w-full rounded-md bg-red-500/90 px-3 py-2 text-sm font-medium text-black hover:bg-red-400"
                  >
                    结束跟练
                  </button>
                ) : (
                  <button
                    onClick={startFollow}
                    disabled={!refSeq || recordState !== 'idle'}
                    className="w-full rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium text-black hover:bg-emerald-400 disabled:opacity-40"
                  >
                    开始跟练(3 秒倒计时)
                  </button>
                )}
                <p className="mt-1.5 text-[11px] leading-relaxed text-neutral-500">
                  骨架颜色 = 部位偏差:青绿 &lt;15°,黄 15–30°,红 &gt;30°;白色幽灵是参考动作,右侧卡片预告下一个关键动作。
                </p>
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
