import { useEffect, useRef, useState } from 'react'
import {
  bodyVisible,
  featuresFromBody,
  featuresFromLandmarks,
  scoreFrame,
  type BodyPart,
} from '../lib/bodyPose'
import { usePoseEngine } from '../game/engine'
import { loadVideoReference } from '../game/referenceLoader'
import { JUDGMENT_META, judgmentFor, type Judgment } from '../game/judgments'
import { getSensitivity, sensitivityThresholds } from '../game/sensitivity'
import {
  drawGhost,
  drawLiveSkeleton,
  neutralPartColors,
  partColorsFromErr,
} from '../game/drawing'
import { referenceUrl, DEFAULT_REF_ID, type ModeDef } from '../modes/registry'

const GREEN_SCREEN = '#00ff00'
const KEY_RADIUS = 0.3
const SCORE_WINDOW_SEC = 0.5

/**
 * 直播模式:纯绿幕 + 骨骼(供 OBS 色度抠像),
 * 叠加实时判定特效(判定文字非绿色,抠像后保留在画面上)。
 * 参考用默认 58 号示范,循环播放。
 */
export default function LiveScreen({ mode, onExit }: { mode: ModeDef; onExit: () => void }) {
  const engine = usePoseEngine()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [popup, setPopup] = useState<{ id: number; judgment: Judgment } | null>(null)
  const [combo, setCombo] = useState(0)
  const [ready, setReady] = useState(false)

  const popupIdRef = useRef(0)

  useEffect(() => {
    let cancelled = false
    engine.startCamera().catch(() => {})
    const landmarker = engine.getLandmarker()
    if (!landmarker) return
    let seqSamples: import('../lib/reference').ReferenceSample[] = []
    let keys: import('../lib/keyPoses').KeyPose[] = []
    let duration = 0

    loadVideoReference({
      url: referenceUrl(mode.referenceId ?? DEFAULT_REF_ID),
      sourceId: mode.referenceId ?? DEFAULT_REF_ID,
      label: '直播判定参考',
      landmarker,
      smoothLevel: engine.smoothLevel,
      modelType: engine.modelType,
    }).then((r) => {
      if (cancelled) return
      seqSamples = r.seq.samples
      keys = r.keyPoses
      duration = r.seq.duration
      setReady(true)
    })

    // 运行状态(循环)
    let loopStart = performance.now()
    let sampleIdx = 0
    let keyScores: Array<{ sum: number; count: number }> = []
    let judged: boolean[] = []
    let win: Array<{ t: number; score: number; partErr: Record<BodyPart, number> }> = []
    let comboNow = 0
    let colors = neutralPartColors()

    const resetLoop = (now: number) => {
      loopStart = now
      sampleIdx = 0
      keyScores = keys.map(() => ({ sum: 0, count: 0 }))
      judged = keys.map(() => false)
      win = []
    }

    let raf = 0
    const loop = () => {
      raf = requestAnimationFrame(loop)
      const canvas = canvasRef.current
      const video = engine.videoRef.current
      const ctx = canvas?.getContext('2d')
      if (!canvas || !ctx || !video) return
      if (video.readyState < 2 || video.videoWidth === 0) return
      if (canvas.width !== video.videoWidth) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
      }
      const w = canvas.width
      const h = canvas.height
      const now = performance.now()
      const lm = engine.landmarksRef.current

      // 绿幕
      ctx.fillStyle = GREEN_SCREEN
      ctx.fillRect(0, 0, w, h)

      if (duration > 0 && judged.length === 0) resetLoop(now)
      const t = duration > 0 ? (now - loopStart) / 1000 : 0
      if (duration > 0 && t >= duration) resetLoop(now)

      let sample: import('../lib/reference').ReferenceSample | null = null
      if (duration > 0) {
        const tt = Math.min(t, duration - 0.001)
        while (sampleIdx + 1 < seqSamples.length && seqSamples[sampleIdx + 1].t <= tt) {
          sampleIdx += 1
        }
        sample = seqSamples[sampleIdx] ?? null

        const visible = !!lm && bodyVisible(lm)
        if (visible && sample?.ok) {
          const fs = scoreFrame(featuresFromLandmarks(lm!), featuresFromBody(sample.body))
          win.push({ t: tt, score: fs.score, partErr: fs.partErrDeg })
          const cutoff = tt - SCORE_WINDOW_SEC
          while (win.length > 0 && win[0].t < cutoff) win.shift()
          const nWin = win.length
          const avgErr = {} as Record<BodyPart, number>
          for (const part of ['leftArm', 'rightArm', 'leftLeg', 'rightLeg', 'torso'] as BodyPart[]) {
            avgErr[part] = win.reduce((s, x) => s + x.partErr[part], 0) / nWin
          }
          colors = partColorsFromErr(avgErr)
          for (let ki = 0; ki < keys.length; ki++) {
            if (Math.abs(keys[ki].t - tt) <= KEY_RADIUS) {
              keyScores[ki].sum += fs.score
              keyScores[ki].count += 1
            }
          }
        } else {
          colors = neutralPartColors()
        }

        for (let ki = 0; ki < keys.length; ki++) {
          if (judged[ki] || tt <= keys[ki].t + KEY_RADIUS) continue
          judged[ki] = true
          const ks = keyScores[ki]
          const j = judgmentFor(ks.count > 0 ? ks.sum / ks.count : null, sensitivityThresholds(getSensitivity()))
          if (j === 'miss') comboNow = 0
          else comboNow += 1
          setCombo(comboNow)
          popupIdRef.current += 1
          setPopup({ id: popupIdRef.current, judgment: j })
        }
      }

      // 幽灵 + 实时骨骼
      if (sample?.ok) drawGhost(ctx, sample.body, lm, w, h, 'rgba(255,255,255,0.35)')
      if (lm) drawLiveSkeleton(ctx, lm, w, h, colors)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!popup) return
    const timer = setTimeout(() => setPopup(null), 900)
    return () => clearTimeout(timer)
  }, [popup])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onExit()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onExit])

  const meta = popup ? JUDGMENT_META[popup.judgment] : null

  return (
    <div className="fixed inset-0 overflow-hidden select-none" style={{ background: GREEN_SCREEN }}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-contain" />

      {/* 判定特效(非绿色,色度抠像后可见) */}
      {popup && meta && (
        <div className="pointer-events-none absolute inset-x-0 top-[22%] flex flex-col items-center">
          <div
            key={popup.id}
            className="judgment-pop text-6xl font-black italic"
            style={{ color: meta.color, textShadow: `0 0 30px ${meta.glow}, 0 4px 10px rgba(0,0,0,0.7)` }}
          >
            {meta.label}
          </div>
          {combo >= 2 && (
            <div className="mt-2 rounded-full bg-fuchsia-600/85 px-4 py-1 text-lg font-black text-white">
              {combo} COMBO
            </div>
          )}
        </div>
      )}

      {!ready && (
        <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1.5 text-xs text-white/80">
          直播判定参考加载中…
        </div>
      )}

      <button
        onClick={onExit}
        className="absolute bottom-4 right-4 rounded-full bg-black/70 px-4 py-2 text-xs text-white opacity-20 transition-opacity hover:opacity-100"
      >
        退出直播模式(Esc)
      </button>
    </div>
  )
}
