import { useEffect, useRef, useState } from 'react'
import {
  bodyVisible,
  featuresFromBody,
  featuresFromLandmarks,
  scoreFrame,
} from '../lib/bodyPose'
import type { KeyPose } from '../lib/keyPoses'
import type { ReferenceSequence } from '../lib/reference'
import { usePoseEngine } from '../game/engine'
import { loadVideoReference } from '../game/referenceLoader'
import { sfx } from '../game/audio'
import {
  drawCameraFrame,
  drawGhost,
  drawLiveSkeleton,
  neutralPartColors,
  partColorsFromErr,
} from '../game/drawing'
import { referenceUrl, type ModeDef } from '../modes/registry'
import { voice, useVoiceEnabled } from '../game/voice'
import { findSilhouette, type SilhouetteEntry } from '../lib/silhouette'
import { buildLessonPlan, segTimeLabel, type LessonSegment } from '../game/lessonPlan'
import SilhouetteFigure from '../components/SilhouetteFigure'
import StatusBadge from '../components/StatusBadge'

/**
 * 教学模式「先学后考」(Dance Central Break It Down + STEEZY 范式):
 *   分段(plan)→ 每段:真人演示(原速一遍 + 慢速一遍)→ 慢速跟跳(默认 65%,
 *   幽灵 + 部位染色,不打分,语音口令)→ 原速跟跳(100%,不打分)→ 下一段
 *   → 全部学完:recap 完整原速连跳一遍(不打分)→ 完成页「去考试」。
 * 任何界面都有「跳过教学,直接开始打分」逃生门(熟手不被拖时间)。
 */

type Phase = 'loading' | 'plan' | 'demo' | 'follow' | 'recap' | 'done'
type FollowStage = 'slow' | 'full'

const DEMO_SLOW_RATE = 0.6
const DEFAULT_SLOW_SPEED = 0.65
const MIN_SPEED = 0.5
const MAX_SPEED = 1.0
const SPEED_STEP = 0.1

interface RunClock {
  /** 本次跟跳的段落(绝对时间) */
  start: number
  end: number
  /** 时钟锚点:anchorT + (now - startPerf)/1000 * speed = 当前 t */
  anchorT: number
  startPerf: number
  speed: number
  spoken: Set<number>
  sampleIdx: number
}

export default function TeachScreen({
  mode,
  onExit,
  onExam,
}: {
  mode: ModeDef
  onExit: () => void
  /** 逃生门 / 完成页「去考试」:kind 为 'follow' | 'challenge' */
  onExam: (kind: 'follow' | 'challenge') => void
}) {
  const engine = usePoseEngine()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const demoVideoRef = useRef<HTMLVideoElement>(null)
  const [voiceOn, setVoiceOn] = useVoiceEnabled()

  const [phase, setPhase] = useState<Phase>('loading')
  const [loadPct, setLoadPct] = useState(0)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [refSource, setRefSource] = useState<string | null>(null)
  const [plan, setPlan] = useState<LessonSegment[]>([])
  const [silhouettes, setSilhouettes] = useState<SilhouetteEntry[] | null>(null)
  const [segIdx, setSegIdx] = useState(0)
  const [stage, setStage] = useState<FollowStage>('slow')
  const [speed, setSpeed] = useState(DEFAULT_SLOW_SPEED)
  const [demoPass, setDemoPass] = useState(0)
  const [hud, setHud] = useState({ progress: 0, lowVis: false })

  const phaseRef = useRef<Phase>('loading')
  const planRef = useRef<LessonSegment[]>([])
  const segIdxRef = useRef(0)
  const stageRef = useRef<FollowStage>('slow')
  const seqRef = useRef<ReferenceSequence | null>(null)
  const keysRef = useRef<KeyPose[]>([])
  const runRef = useRef<RunClock | null>(null)
  const partColorsRef = useRef(neutralPartColors())

  phaseRef.current = phase
  planRef.current = plan
  segIdxRef.current = segIdx
  stageRef.current = stage

  // ---------- 流程推进(用 ref 供 rAF 循环调用,避免闭包过期) ----------

  const enterDemo = (i: number) => {
    const seg = planRef.current[i]
    if (!seg) return
    runRef.current = null
    setSegIdx(i)
    setDemoPass(0)
    setPhase('demo')
    voice.say(seg.intro, 'important')
  }

  const startFollow = (st: FollowStage) => {
    const seg = planRef.current[segIdxRef.current]
    const seq = seqRef.current
    if (!seg || !seq) return
    const sp = st === 'slow' ? DEFAULT_SLOW_SPEED : 1.0
    runRef.current = {
      start: seg.start,
      end: seg.end,
      anchorT: seg.start,
      startPerf: performance.now(),
      speed: sp,
      spoken: new Set(),
      sampleIdx: 0,
    }
    partColorsRef.current = neutralPartColors()
    setStage(st)
    setSpeed(sp)
    setPhase('follow')
    voice.say(st === 'slow' ? '慢速跟跳,看着幽灵骨架做' : '原速,跟上!', 'important')
  }

  const startRecap = () => {
    const seq = seqRef.current
    if (!seq) return
    runRef.current = {
      start: 0,
      end: seq.duration,
      anchorT: 0,
      startPerf: performance.now(),
      speed: 1,
      spoken: new Set(),
      sampleIdx: 0,
    }
    partColorsRef.current = neutralPartColors()
    setPhase('recap')
    voice.say('全部学完了,现在完整连跳一遍', 'important')
  }

  const finishAll = () => {
    runRef.current = null
    setPhase('done')
    sfx.pass()
    voice.say('教学完成,去考试吧', 'important')
  }

  /** 跟跳到段尾后的推进:慢速→原速→(下一段演示 | recap) */
  const advanceAfterFollow = () => {
    if (stageRef.current === 'slow') {
      startFollow('full')
      return
    }
    const next = segIdxRef.current + 1
    if (next < planRef.current.length) {
      sfx.pass()
      voice.say('这一段学会了', 'important')
      enterDemo(next)
    } else {
      sfx.pass()
      startRecap()
    }
  }

  const advanceRef = useRef(advanceAfterFollow)
  advanceRef.current = advanceAfterFollow

  // ---------- 加载参考 + 开摄像头 ----------
  useEffect(() => {
    let cancelled = false
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
      onSilhouettes: (s) => !cancelled && setSilhouettes(s),
    })
      .then((r) => {
        if (cancelled) return
        setRefSource(r.source)
        if (r.silhouettes) setSilhouettes(r.silhouettes)
        seqRef.current = r.seq
        keysRef.current = r.keyPoses
        const p = buildLessonPlan(r.seq.duration, r.keyPoses)
        setPlan(p)
        setPhase('plan')
      })
      .catch((e) => {
        if (!cancelled) setLoadError(e instanceof Error ? e.message : '参考加载失败')
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 卸载:停语音(demo 视频随组件卸载自动停)
  useEffect(() => () => voice.stop(), [])

  // ---------- 演示阶段:真人视频片段,原速一遍 + 慢速一遍 ----------
  useEffect(() => {
    if (phase !== 'demo') return
    const v = demoVideoRef.current
    const seg = planRef.current[segIdxRef.current]
    if (!v || !seg) return
    let pass = 0
    let finished = false
    v.playbackRate = 1
    v.currentTime = seg.start
    // 有声音自动播放可能被拒,降级静音
    v.muted = false
    v.play().catch(() => {
      v.muted = true
      v.play().catch(() => {})
    })
    const onTime = () => {
      if (finished || v.currentTime < seg.end - 0.04) return
      if (pass === 0) {
        pass = 1
        setDemoPass(1)
        v.playbackRate = DEMO_SLOW_RATE
        v.currentTime = seg.start
        v.play().catch(() => {})
        voice.say('慢速,再看一遍')
      } else {
        finished = true
        startFollow('slow')
      }
    }
    v.addEventListener('timeupdate', onTime)
    return () => {
      v.removeEventListener('timeupdate', onTime)
      v.pause()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, segIdx])

  // ---------- 跟跳 / recap 主循环:幽灵 + 实时骨骼 + 部位染色(不打分) ----------
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
      const run = runRef.current
      if ((ph !== 'follow' && ph !== 'recap') || !run) {
        if (lm) drawLiveSkeleton(ctx, lm, w, h, neutralPartColors())
        return
      }

      const t = run.anchorT + ((now - run.startPerf) / 1000) * run.speed
      const progress = Math.min(1, (t - run.start) / Math.max(0.01, run.end - run.start))
      if (t >= run.end) {
        if (ph === 'recap') finishAll()
        else advanceRef.current()
        return
      }

      while (run.sampleIdx + 1 < seq.samples.length && seq.samples[run.sampleIdx + 1].t <= t) {
        run.sampleIdx += 1
      }
      const sample = seq.samples[run.sampleIdx]

      // 部位染色(复用打分特征算误差,但不累计分数、不判定)
      const visible = !!lm && bodyVisible(lm)
      if (visible && sample.ok) {
        const fs = scoreFrame(featuresFromLandmarks(lm!), featuresFromBody(sample.body))
        partColorsRef.current = partColorsFromErr(fs.partErrDeg)
      } else {
        partColorsRef.current = neutralPartColors()
      }

      // 慢速跟跳的语音口令:经过关键动作时报一次(占位口令)
      if (ph === 'follow' && stageRef.current === 'slow') {
        const seg = planRef.current[segIdxRef.current]
        if (seg) {
          for (const cue of seg.cues) {
            if (cue.t <= t && !run.spoken.has(cue.t)) {
              run.spoken.add(cue.t)
              voice.say(cue.text)
            }
          }
        }
      }

      if (sample.ok) drawGhost(ctx, sample.body, lm, w, h)
      if (lm) drawLiveSkeleton(ctx, lm, w, h, partColorsRef.current)

      if (now - lastHudSync > 120) {
        lastHudSync = now
        setHud({ progress, lowVis: !visible })
      }
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ---------- 调速(50%–100%,跟跳进行中即时生效) ----------
  const adjustSpeed = (delta: number) => {
    const run = runRef.current
    const next = Math.round(Math.min(MAX_SPEED, Math.max(MIN_SPEED, speed + delta)) * 100) / 100
    setSpeed(next)
    if (run && phaseRef.current === 'follow') {
      const now = performance.now()
      const t = run.anchorT + ((now - run.startPerf) / 1000) * run.speed
      run.anchorT = t
      run.startPerf = now
      run.speed = next
    }
    voice.say(`${Math.round(next * 100)}% 速度`)
  }

  const seg = plan[segIdx]
  const inRun = phase === 'follow' || phase === 'recap'

  // 大字提示文案(10-foot 规范:一句话主提示 + 一行小字)
  const bigMain =
    phase === 'demo'
      ? '先看老师做'
      : phase === 'recap'
        ? '完整连跳一遍'
        : stage === 'slow'
          ? '跟我慢慢跳'
          : '原速,跟上!'
  const bigDetail =
    phase === 'demo'
      ? `${seg?.title ?? ''} · 第 ${demoPass + 1} 遍(${demoPass === 0 ? '原速' : '慢速'})`
      : phase === 'recap'
        ? '不学新动作,跟着感觉跳'
        : `${seg?.title ?? ''} / 共 ${plan.length} 段 · ${Math.round(speed * 100)}% 速度`

  return (
    <div className="fixed inset-0 overflow-hidden select-none" style={{ background: 'var(--bg)' }}>
      {/* 摄像头画布(跟跳 / recap / plan 背景) */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-contain" />

      {/* 演示阶段:真人参考视频片段(镜面,与主画面一致) */}
      {phase === 'demo' && (
        <video
          ref={demoVideoRef}
          src={mode.referenceId ? referenceUrl(mode.referenceId) : undefined}
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-contain"
          style={{ transform: 'scaleX(-1)' }}
        />
      )}

      {/* 顶栏:状态 + 语音开关 + 逃生门 */}
      <div className="absolute inset-x-0 top-3 flex items-start justify-between px-3 sm:top-5 sm:px-5">
        <div className="flex items-center gap-2">
          <StatusBadge />
          {refSource === 'precomputed' && phase !== 'loading' && (
            <span className="rounded-full bg-emerald-500/20 px-3 py-1.5 text-[10px] text-emerald-300 backdrop-blur sm:text-xs">
              参考已就位 ✓
            </span>
          )}
        </div>
        {phase !== 'loading' && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setVoiceOn(!voiceOn)}
              className="rounded-full bg-black/60 px-4 py-2 text-sm text-white/85 backdrop-blur hover:bg-black/80"
            >
              {voiceOn ? '🔊 语音开' : '🔇 语音关'}
            </button>
            <button
              onClick={() => onExam('follow')}
              className="rounded-full bg-black/60 px-4 py-2 text-sm font-bold text-white/85 backdrop-blur hover:bg-black/80"
            >
              跳过教学,直接开始打分 →
            </button>
          </div>
        )}
      </div>

      {/* 大字提示(demo / follow / recap 常驻顶部,2–3 米可读) */}
      {(phase === 'demo' || inRun) && (
        <div className="pointer-events-none absolute inset-x-0 top-16 flex flex-col items-center sm:top-20">
          <div className="rounded-3xl bg-black/55 px-8 py-4 text-center backdrop-blur">
            <p
              className="font-black text-white"
              style={{
                fontSize: 'clamp(40px, 6vw, 64px)',
                lineHeight: 1.15,
                textShadow: '0 2px 16px rgba(0,0,0,0.7)',
              }}
            >
              {bigMain}
            </p>
            <p className="mt-1 text-sm text-white/60">{bigDetail}</p>
          </div>
          {hud.lowVis && inRun && (
            <p className="mt-2 rounded-full bg-amber-500/25 px-3 py-1 text-xs text-amber-200">
              未识别到完整身体,退后一点
            </p>
          )}
        </div>
      )}

      {/* 演示阶段底部控制 */}
      {phase === 'demo' && (
        <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-3 px-4">
          <button
            onClick={() => {
              const v = demoVideoRef.current
              if (v && seg) {
                v.playbackRate = 1
                v.currentTime = seg.start
                v.play().catch(() => {})
                setDemoPass(0)
              }
            }}
            className="rounded-full bg-black/60 px-5 py-3 text-base font-bold text-white/85 backdrop-blur hover:bg-black/80"
          >
            🔁 再看一遍
          </button>
          <button
            onClick={() => startFollow('slow')}
            className="sk-btn rounded-full px-8 py-3 text-lg font-black"
          >
            我学会了,开始跟跳 →
          </button>
        </div>
      )}

      {/* 跟跳阶段底部控制:调速 + 推进 + 回看 */}
      {phase === 'follow' && (
        <div className="absolute inset-x-0 bottom-6 flex flex-wrap items-center justify-center gap-2 px-4 sm:gap-3">
          <button
            onClick={() => enterDemo(segIdxRef.current)}
            className="rounded-full bg-black/60 px-4 py-3 text-sm font-bold text-white/85 backdrop-blur hover:bg-black/80"
          >
            🔁 再看演示
          </button>
          <div className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-1.5 backdrop-blur">
            <button
              onClick={() => adjustSpeed(-SPEED_STEP)}
              disabled={speed <= MIN_SPEED + 0.001}
              className="rounded-full px-3 py-1.5 text-sm font-bold text-white/85 hover:bg-white/10 disabled:opacity-30"
            >
              🐢 再慢点
            </button>
            <span className="sk-accent min-w-12 text-center text-sm font-black tabular-nums">
              {Math.round(speed * 100)}%
            </span>
            <button
              onClick={() => adjustSpeed(SPEED_STEP)}
              disabled={speed >= MAX_SPEED - 0.001}
              className="rounded-full px-3 py-1.5 text-sm font-bold text-white/85 hover:bg-white/10 disabled:opacity-30"
            >
              再快点 🐇
            </button>
          </div>
          <button
            onClick={() => advanceRef.current()}
            className="sk-btn rounded-full px-6 py-3 text-base font-black"
          >
            {stage === 'slow' ? '练好了,原速 →' : segIdx < plan.length - 1 ? '下一段 →' : '去连跳 →'}
          </button>
        </div>
      )}

      {/* 底部进度条(跟跳 / recap) */}
      {inRun && (
        <div className="absolute inset-x-6 bottom-20 sm:inset-x-16">
          <div className="sk-track relative h-2 overflow-hidden rounded-full">
            <div
              className="sk-fill absolute inset-y-0 left-0 rounded-full transition-[width] duration-150"
              style={{ width: `${hud.progress * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* 分段列表(plan):教学目录 */}
      {phase === 'plan' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 px-4">
          <div className="sk-card max-h-[86vh] w-full max-w-lg overflow-y-auto rounded-3xl p-6">
            <p className="sk-faint text-xs font-medium tracking-[0.3em]">BREAK IT DOWN</p>
            <h2 className="mt-1 text-2xl font-black" style={{ color: 'var(--tx)' }}>
              {mode.name}
            </h2>
            <p className="sk-dim mt-2 text-sm leading-relaxed">
              已把整支舞切成 <strong className="sk-accent">{plan.length} 段</strong>:
              每段先看老师演示两遍,再慢速跟跳、原速跟跳,全部学完连跳一遍就去考试。
            </p>
            <div className="mt-4 flex flex-col gap-2">
              {plan.map((s) => {
                const firstKey = s.keyPoses[0]
                const silPts = firstKey ? findSilhouette(silhouettes, firstKey.t) : null
                const firstBody =
                  !silPts && firstKey ? seqRef.current?.samples[firstKey.index]?.body : undefined
                return (
                  <button
                    key={s.index}
                    onClick={() => enterDemo(s.index)}
                    className="sk-card2 sk-hover flex items-center justify-between rounded-2xl px-4 py-3 text-left"
                  >
                    <span className="flex items-center gap-3">
                      {(silPts || firstBody) && (
                        <SilhouetteFigure
                          pts={silPts}
                          body={firstBody}
                          width={30}
                          height={40}
                          color="rgba(255,255,255,0.75)"
                        />
                      )}
                      <span className="font-bold" style={{ color: 'var(--tx)' }}>
                        {s.title}
                        <span className="sk-faint ml-2 text-xs font-normal">{segTimeLabel(s)}</span>
                      </span>
                    </span>
                    <span className="sk-dim text-xs">
                      {s.keyPoses.length > 0 ? `${s.keyPoses.length} 个关键动作` : '过渡段'}
                    </span>
                  </button>
                )
              })}
            </div>
            <button
              onClick={() => enterDemo(0)}
              className="sk-btn mt-5 w-full rounded-full py-3.5 text-lg font-black"
            >
              从第 1 段开始上课
            </button>
            <button
              onClick={() => onExam('follow')}
              className="sk-ghost mt-2 w-full rounded-full py-2.5 text-sm"
            >
              我已经会了,跳过教学直接打分 →
            </button>
          </div>
        </div>
      )}

      {/* 完成页:去考试 */}
      {phase === 'done' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 px-4">
          <div className="sk-card w-full max-w-md rounded-3xl p-8 text-center">
            <p className="text-5xl">🎓</p>
            <h2 className="mt-3 text-3xl font-black" style={{ color: 'var(--tx)' }}>
              教学完成!
            </h2>
            <p className="sk-dim mt-2 text-sm leading-relaxed">
              {plan.length} 段全部学完,连跳也过了一遍。现在去考试,看你能拿多少 PERFECT。
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={() => onExam('follow')}
                className="sk-btn rounded-full py-3.5 text-lg font-black"
              >
                去考试 · 全程跟练 →
              </button>
              <button
                onClick={() => onExam('challenge')}
                className="sk-card2 sk-hover rounded-full py-3 text-base font-bold"
                style={{ color: 'var(--tx)' }}
              >
                去考试 · 闯关模式
              </button>
              <button
                onClick={() => setPhase('plan')}
                className="sk-ghost rounded-full py-2.5 text-sm"
              >
                再学一遍
              </button>
              <button onClick={onExit} className="sk-ghost rounded-full py-2.5 text-sm">
                返回选舞
              </button>
            </div>
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
                    : '课程准备中…'}
                </p>
                <div className="sk-track mt-3 h-1.5 overflow-hidden rounded-full">
                  <div
                    className="sk-fill h-full rounded-full transition-all"
                    style={{ width: `${Math.max(loadPct, 0.05) * 100}%` }}
                  />
                </div>
              </>
            )}
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
