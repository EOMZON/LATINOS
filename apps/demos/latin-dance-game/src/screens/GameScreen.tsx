import { useEffect, useRef, useState } from 'react'
import {
  bodyVisible,
  featuresFromBody,
  featuresFromLandmarks,
  scoreFrame,
  type BodyPart,
} from '../lib/bodyPose'
import { extractKeyPoses, type KeyPose } from '../lib/keyPoses'
import type { ReferenceSequence } from '../lib/reference'
import { usePoseEngine } from '../game/engine'
import { loadVideoReference } from '../game/referenceLoader'
import {
  JUDGMENT_META,
  chapterStarsFor,
  countsCombo,
  judgmentFor,
  type Judgment,
} from '../game/judgments'
import { sfx } from '../game/audio'
import {
  drawCameraFrame,
  drawGhost,
  drawLiveSkeleton,
  neutralPartColors,
  partColorsFromErr,
} from '../game/drawing'
import { referenceUrl, splitChapters, type ChapterDef, type ModeDef } from '../modes/registry'
import { recordChapterResult } from '../game/progress'
import { cssVar } from '../game/skin'
import type { GameResult, KeyResult } from '../game/types'
import SkeletonFigure from '../components/SkeletonFigure'
import StatusBadge from '../components/StatusBadge'

const KEY_RADIUS = 0.3 // 判定窗口 ±0.3s
const SCORE_WINDOW_SEC = 0.5
const COUNTDOWN_SEC = 3
const CHALLENGE_MAX_MISS = 3

type Phase = 'loading' | 'countdown' | 'running' | 'paused'

interface ScoreSample {
  t: number
  score: number
  partErr: Record<BodyPart, number>
}

interface RunState {
  startPerf: number
  pausedAccum: number
  pauseStart: number | null
  duration: number
  sampleIdx: number
  sum: number
  count: number
  frame: number | null
  lowVis: boolean
  window: ScoreSample[]
  keyScores: Array<{ sum: number; count: number }>
  judged: boolean[]
  combo: number
  maxCombo: number
  judgments: Record<Judgment, number>
  misses: number
  keyResults: KeyResult[]
}

/** 章节模式:把参考切成 [start, end] 的子序列并重定时 */
function sliceSequence(
  seq: ReferenceSequence,
  chapter: ChapterDef,
): { seq: ReferenceSequence; keyPoses: KeyPose[] } {
  const samples = seq.samples
    .filter((s) => s.t >= chapter.start && s.t <= chapter.end)
    .map((s) => ({ ...s, t: s.t - chapter.start }))
  const sub: ReferenceSequence = {
    ...seq,
    duration: chapter.end - chapter.start,
    samples,
  }
  return { seq: sub, keyPoses: extractKeyPoses(sub) }
}

export default function GameScreen({
  mode,
  chapter,
  onFinish,
  onExit,
}: {
  mode: ModeDef
  chapter?: ChapterDef
  onFinish: (r: GameResult) => void
  onExit: () => void
}) {
  const engine = usePoseEngine()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [phase, setPhase] = useState<Phase>('loading')
  const [loadPct, setLoadPct] = useState(0)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [popup, setPopup] = useState<{ id: number; judgment: Judgment } | null>(null)
  const [refSource, setRefSource] = useState<'precomputed' | 'cache' | 'extracted' | null>(null)
  const [hud, setHud] = useState({
    frame: null as number | null,
    combo: 0,
    progress: 0,
    misses: 0,
    lowVis: false,
    nextIdx: 0,
    remain: 0,
  })

  const phaseRef = useRef<Phase>('loading')
  const seqRef = useRef<ReferenceSequence | null>(null)
  const keysRef = useRef<KeyPose[]>([])
  const runRef = useRef<RunState | null>(null)
  const countdownEndRef = useRef(0)
  const lastBeepRef = useRef(9)
  const popupIdRef = useRef(0)
  const finishedRef = useRef(false)
  const partColorsRef = useRef(neutralPartColors())
  const chapterCountRef = useRef(0)
  const fullDurationRef = useRef(0)

  phaseRef.current = phase

  const isChallenge = mode.kind === 'challenge'

  // 加载参考 + 开摄像头
  useEffect(() => {
    let cancelled = false
    finishedRef.current = false
    const landmarker = engine.getLandmarker()
    if (!landmarker || !mode.referenceId) {
      setLoadError('姿态模型还没加载好,请稍等再进。')
      return
    }
    engine.startCamera().catch(() => {})
    loadVideoReference({
      url: referenceUrl(mode.referenceId),
      sourceId: mode.referenceId,
      label: mode.name,
      landmarker,
      smoothLevel: engine.smoothLevel,
      modelType: engine.modelType,
      onProgress: (p) => !cancelled && setLoadPct(p),
    })
      .then((r) => {
        if (cancelled) return
        setRefSource(r.source)
        chapterCountRef.current = splitChapters(r.seq.duration).length
        fullDurationRef.current = r.seq.duration
        const sliced = chapter ? sliceSequence(r.seq, chapter) : r
        seqRef.current = sliced.seq
        keysRef.current = sliced.keyPoses
        countdownEndRef.current = performance.now() + COUNTDOWN_SEC * 1000
        lastBeepRef.current = 9
        setPhase('countdown')
      })
      .catch((e) => {
        if (!cancelled) setLoadError(e instanceof Error ? e.message : '参考加载失败')
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const finishRun = (failed: boolean) => {
    if (finishedRef.current) return
    finishedRef.current = true
    const run = runRef.current
    runRef.current = null
    if (!run) return
    const avg = run.count > 0 ? run.sum / run.count : 0
    if (failed) sfx.fail()
    let chapterStars: number | undefined
    let nextChapter: ChapterDef | undefined
    if (chapter) {
      chapterStars = chapterStarsFor(avg)
      recordChapterResult(mode.id, chapterCountRef.current || 1, chapter.index, chapterStars)
      nextChapter = splitChapters(fullDurationRef.current)[chapter.index + 1]
    }
    onFinish({
      avg,
      judgments: run.judgments,
      maxCombo: run.maxCombo,
      keyResults: run.keyResults,
      failed,
      clearedCount: run.keyResults.filter((k) => k.judgment !== 'miss').length,
      totalCount: keysRef.current.length,
      chapterStars,
      chapterCount: chapter ? chapterCountRef.current : undefined,
      nextChapter,
    })
  }

  // 主循环:绘制 + 打分 + 判定
  useEffect(() => {
    let raf = 0
    let lastHudSync = 0

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
      const ph = phaseRef.current
      const seq = seqRef.current

      drawCameraFrame(ctx, video, w, h, 0.5)

      if (!seq) return

      // 倒计时
      if (ph === 'countdown') {
        const remain = countdownEndRef.current - now
        const n = Math.ceil(remain / 1000)
        if (n !== lastBeepRef.current) {
          lastBeepRef.current = n
          sfx.countdown(n)
        }
        // 幽灵预告起始姿态
        const first = seq.samples[0]
        if (first?.ok) drawGhost(ctx, first.body, lm, w, h)
        if (lm) drawLiveSkeleton(ctx, lm, w, h, neutralPartColors())
        if (remain <= 0) {
          const keys = keysRef.current
          runRef.current = {
            startPerf: now,
            pausedAccum: 0,
            pauseStart: null,
            duration: seq.duration,
            sampleIdx: 0,
            sum: 0,
            count: 0,
            frame: null,
            lowVis: false,
            window: [],
            keyScores: keys.map(() => ({ sum: 0, count: 0 })),
            judged: keys.map(() => false),
            combo: 0,
            maxCombo: 0,
            judgments: { perfect: 0, great: 0, good: 0, miss: 0 },
            misses: 0,
            keyResults: [],
          }
          partColorsRef.current = neutralPartColors()
          setPhase('running')
        } else {
          ctx.fillStyle = 'rgba(0,0,0,0.35)'
          ctx.fillRect(0, 0, w, h)
          ctx.fillStyle = '#ffd94d'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.font = `bold ${Math.round(h / 4)}px sans-serif`
          ctx.fillText(String(Math.max(1, n)), w / 2, h / 2)
          ctx.font = `${Math.round(h / 26)}px sans-serif`
          ctx.fillStyle = '#ffffff'
          ctx.fillText(mode.name, w / 2, h / 2 + h / 5)
        }
        return
      }

      const run = runRef.current
      if (!run) {
        if (lm) drawLiveSkeleton(ctx, lm, w, h, neutralPartColors())
        return
      }

      if (ph === 'paused') {
        if (lm) drawLiveSkeleton(ctx, lm, w, h, partColorsRef.current)
        return
      }

      // running
      const t = (now - run.startPerf - run.pausedAccum) / 1000
      const progress = Math.min(1, t / run.duration)
      if (t >= run.duration) {
        finishRun(false)
        return
      }

      while (run.sampleIdx + 1 < seq.samples.length && seq.samples[run.sampleIdx + 1].t <= t) {
        run.sampleIdx += 1
      }
      const sample = seq.samples[run.sampleIdx]

      // 打分
      const visible = !!lm && bodyVisible(lm)
      if (visible && sample.ok) {
        const fs = scoreFrame(featuresFromLandmarks(lm!), featuresFromBody(sample.body))
        run.sum += fs.score
        run.count += 1
        run.lowVis = false
        run.window.push({ t, score: fs.score, partErr: fs.partErrDeg })
        const cutoff = t - SCORE_WINDOW_SEC
        while (run.window.length > 0 && run.window[0].t < cutoff) run.window.shift()
        const nWin = run.window.length
        run.frame = run.window.reduce((s, x) => s + x.score, 0) / nWin
        const avgErr = {} as Record<BodyPart, number>
        for (const part of ['leftArm', 'rightArm', 'leftLeg', 'rightLeg', 'torso'] as BodyPart[]) {
          avgErr[part] = run.window.reduce((s, x) => s + x.partErr[part], 0) / nWin
        }
        partColorsRef.current = partColorsFromErr(avgErr)
        const keys = keysRef.current
        for (let ki = 0; ki < keys.length; ki++) {
          if (Math.abs(keys[ki].t - t) <= KEY_RADIUS) {
            run.keyScores[ki].sum += fs.score
            run.keyScores[ki].count += 1
          }
        }
      } else {
        run.frame = null
        run.lowVis = !visible
        partColorsRef.current = neutralPartColors()
      }

      // 关键动作判定落锤
      const keys = keysRef.current
      for (let ki = 0; ki < keys.length; ki++) {
        if (run.judged[ki] || t <= keys[ki].t + KEY_RADIUS) continue
        run.judged[ki] = true
        const ks = run.keyScores[ki]
        const avg = ks.count > 0 ? ks.sum / ks.count : null
        const j = judgmentFor(avg)
        run.judgments[j] += 1
        run.keyResults.push({ t: keys[ki].t, avg, judgment: j })
        if (countsCombo(j)) {
          run.combo += 1
          run.maxCombo = Math.max(run.maxCombo, run.combo)
        } else {
          run.combo = 0
          run.misses += 1
        }
        sfx.judgment(j)
        popupIdRef.current += 1
        setPopup({ id: popupIdRef.current, judgment: j })
        if (isChallenge && run.misses >= CHALLENGE_MAX_MISS) {
          finishRun(true)
          return
        }
      }

      // 绘制:幽灵 + 实时骨骼
      if (sample.ok) drawGhost(ctx, sample.body, lm, w, h)
      if (lm) drawLiveSkeleton(ctx, lm, w, h, partColorsRef.current)

      // HUD 节流同步
      if (now - lastHudSync > 100) {
        lastHudSync = now
        let nextIdx = keys.length
        for (let ki = 0; ki < keys.length; ki++) {
          if (!run.judged[ki]) {
            nextIdx = ki
            break
          }
        }
        setHud({
          frame: run.frame,
          combo: run.combo,
          progress,
          misses: run.misses,
          lowVis: run.lowVis,
          nextIdx,
          remain: nextIdx < keys.length ? Math.max(0, keys[nextIdx].t - t) : 0,
        })
      }
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 暂停 / 恢复
  const togglePause = () => {
    const run = runRef.current
    if (phaseRef.current === 'running' && run) {
      run.pauseStart = performance.now()
      setPhase('paused')
    } else if (phaseRef.current === 'paused' && run && run.pauseStart !== null) {
      run.pausedAccum += performance.now() - run.pauseStart
      run.pauseStart = null
      setPhase('running')
    }
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') togglePause()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 判定弹字自动消失
  useEffect(() => {
    if (!popup) return
    const timer = setTimeout(() => setPopup(null), 900)
    return () => clearTimeout(timer)
  }, [popup])

  const keys = keysRef.current
  const seq = seqRef.current
  const laneKeys = keys.slice(hud.nextIdx, hud.nextIdx + 5)
  const meta = popup ? JUDGMENT_META[popup.judgment] : null
  // 泳道当前卡骨架用主题强调色(画布场景,读 CSS 变量)
  const laneAccent = cssVar('--accent', '#c084fc')

  return (
    <div className="fixed inset-0 overflow-hidden select-none" style={{ background: 'var(--bg)' }}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-contain" />

      {/* 顶栏:状态 + 分数 + 暂停 */}
      <div className="absolute inset-x-0 top-3 flex items-start justify-between px-3 sm:top-5 sm:px-5">
        <div className="flex items-center gap-2">
          <StatusBadge />
          {refSource === 'precomputed' && phase !== 'loading' && (
            <span className="rounded-full bg-emerald-500/20 px-3 py-1.5 text-[10px] text-emerald-300 backdrop-blur sm:text-xs">
              参考已就位 ✓
            </span>
          )}
        </div>
        {phase === 'running' || phase === 'paused' ? (
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-black/60 px-4 py-1.5 text-center backdrop-blur">
              <span className="text-xs text-white/50">分数 </span>
              <span className="sk-accent text-lg font-black tabular-nums">
                {hud.frame !== null ? Math.round(hud.frame) : '--'}
              </span>
            </div>
            <button
              onClick={togglePause}
              className="rounded-full bg-black/60 px-4 py-2 text-sm text-white/80 backdrop-blur hover:bg-black/80"
            >
              {phase === 'paused' ? '▶ 继续' : '⏸ 暂停'}
            </button>
          </div>
        ) : (
          <div className="w-10" />
        )}
      </div>

      {/* 判定弹字(功能色,三套 skin 一致)+ 连击(主题色) */}
      {phase === 'running' && (
        <div className="pointer-events-none absolute inset-x-0 top-[18%] flex flex-col items-center">
          {popup && meta && (
            <div
              key={popup.id}
              className="judgment-pop text-5xl font-black italic sm:text-6xl"
              style={{ color: meta.color, textShadow: `0 0 30px ${meta.glow}, 0 4px 12px rgba(0,0,0,0.6)` }}
            >
              {meta.label}
            </div>
          )}
          {hud.combo >= 2 && (
            <div className="sk-combo mt-2 rounded-full px-4 py-1 text-lg font-black">
              {hud.combo} COMBO
            </div>
          )}
          {hud.lowVis && (
            <div className="mt-2 rounded-full bg-amber-500/25 px-3 py-1 text-xs text-amber-200">
              未识别到完整身体,退后一点
            </div>
          )}
        </div>
      )}

      {/* 闯关模式:剩余机会 */}
      {isChallenge && (phase === 'running' || phase === 'paused') && (
        <div className="absolute left-3 top-16 sm:left-5 sm:top-20">
          <div className="rounded-full bg-black/60 px-3 py-1.5 text-sm backdrop-blur">
            {'❤️'.repeat(Math.max(0, CHALLENGE_MAX_MISS - hud.misses))}
            {'🖤'.repeat(Math.min(CHALLENGE_MAX_MISS, hud.misses))}
          </div>
        </div>
      )}

      {/* 预告泳道:接下来的关键动作从右滑入 */}
      {(phase === 'running' || phase === 'paused') && seq && laneKeys.length > 0 && (
        <div className="absolute inset-x-0 bottom-14 flex items-end justify-center gap-2 px-4 sm:gap-3">
          {laneKeys.map((k, i) => {
            const sample = seq.samples[k.index]
            const active = i === 0
            return (
              <div
                key={`${k.t}`}
                className={`lane-card flex flex-col items-center rounded-2xl backdrop-blur transition-all ${
                  active ? 'sk-lane-active p-2.5' : 'sk-lane p-2 opacity-80'
                }`}
                style={{ transform: active ? 'scale(1.12)' : `scale(${1 - i * 0.06})` }}
              >
                {sample?.ok && (
                  <SkeletonFigure
                    body={sample.body}
                    width={active ? 66 : 52}
                    height={active ? 88 : 70}
                    color={active ? laneAccent : 'rgba(255,255,255,0.75)'}
                  />
                )}
                <span className={`mt-1 text-[10px] tabular-nums ${active ? 'sk-accent font-bold' : 'text-white/45'}`}>
                  {active ? `${hud.remain.toFixed(1)}s` : `+${(k.t - keys[hud.nextIdx].t).toFixed(0)}s`}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* 底部进度条 */}
      {(phase === 'running' || phase === 'paused') && (
        <div className="absolute inset-x-6 bottom-5 sm:inset-x-16">
          <div className="sk-track relative h-2 overflow-visible rounded-full">
            <div
              className="sk-fill absolute inset-y-0 left-0 rounded-full"
              style={{ width: `${hud.progress * 100}%` }}
            />
            {seq &&
              keys.map((k, i) => (
                <div
                  key={i}
                  className={`absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[1px] ${
                    i < hud.nextIdx ? 'bg-emerald-300' : 'bg-white/70'
                  }`}
                  style={{ left: `${(k.t / seq.duration) * 100}%` }}
                />
              ))}
          </div>
        </div>
      )}

      {/* 加载中 */}
      {phase === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70">
          <div className="sk-card w-80 rounded-3xl p-6 text-center">
            {loadError ? (
              <>
                <p className="text-sm text-red-400">{loadError}</p>
                <button onClick={onExit} className="sk-ghost mt-4 rounded-full px-6 py-2 text-sm">
                  返回
                </button>
              </>
            ) : (
              <>
                <p className="sk-dim text-sm">
                  {loadPct > 0
                    ? `教练备课中(提取示范动作)… ${Math.round(loadPct * 100)}%`
                    : '参考加载中…'}
                </p>
                <div className="sk-track mt-3 h-1.5 overflow-hidden rounded-full">
                  <div
                    className="sk-fill h-full rounded-full transition-all"
                    style={{ width: `${Math.max(loadPct, 0.05) * 100}%` }}
                  />
                </div>
                <p className="sk-faint mt-2 text-xs">
                  预计算参考秒级载入;首次未预计算时提取约 10–20 秒,之后缓存秒载
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* 暂停遮罩 */}
      {phase === 'paused' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <div className="sk-card w-72 rounded-3xl p-6 text-center">
            <p className="text-xl font-black" style={{ color: 'var(--tx)' }}>
              暂停中
            </p>
            <p className="sk-faint mt-1 text-xs">{mode.name}</p>
            <div className="mt-5 flex flex-col gap-2">
              <button onClick={togglePause} className="sk-btn rounded-full py-2.5 font-bold">
                继续跳
              </button>
              <button onClick={onExit} className="sk-ghost rounded-full py-2.5 text-sm">
                退出本局
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 摄像头错误 */}
      {engine.status.cameraError && phase !== 'loading' && (
        <div className="absolute inset-x-4 top-20 mx-auto max-w-md rounded-2xl border border-red-500/40 bg-red-950/85 px-4 py-3 text-sm text-red-200">
          {engine.status.cameraError}
          <button
            onClick={() => engine.startCamera().catch(() => {})}
            className="ml-3 rounded-full bg-red-500/30 px-3 py-1 text-xs hover:bg-red-500/50"
          >
            重新打开摄像头
          </button>
        </div>
      )}
    </div>
  )
}
