import { useEffect, useRef, useState } from 'react'
import { bodyVisible, featuresFromBody, featuresFromLandmarks, scoreFrame } from '../lib/bodyPose'
import { usePoseEngine } from '../game/engine'
import { drawLiveSkeleton, neutralPartColors } from '../game/drawing'
import { cssVar } from '../game/skin'
import { sfx } from '../game/audio'
import { setOnboardingDone } from '../game/types'
import { TUTORIAL_POSES, TUTORIAL_HOLD_SEC, TUTORIAL_PASS_SCORE } from '../game/tutorial'
import { voice, useVoiceEnabled } from '../game/voice'
import {
  ARROW_GLYPHS,
  STAND_PARTS,
  evaluateStand,
  type StandArrow,
  type StandStatus,
} from '../game/standGuide'
import SkeletonFigure from '../components/SkeletonFigure'
import StatusBadge from '../components/StatusBadge'

type Step = 'permission' | 'stand' | 'countdown' | 'tutorial'

/** 站稳判定时长(ms):保持 ok 这么久后进入倒计时 */
const STABLE_MS = 600

interface BigHint {
  main: string
  detail: string
  arrow: StandArrow
  ok: boolean
}

export default function OnboardingScreen({
  onDone,
  onBack,
}: {
  onDone: () => void
  onBack: () => void
}) {
  const engine = usePoseEngine()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [step, setStep] = useState<Step>('permission')
  const [bigHint, setBigHint] = useState<BigHint>({
    main: '站进画面里',
    detail: '让我看到你的全身',
    arrow: null,
    ok: false,
  })
  const [poseIdx, setPoseIdx] = useState(0)
  const [holdPct, setHoldPct] = useState(0)
  const [passFlash, setPassFlash] = useState(false)
  const [busy, setBusy] = useState(false)
  const [voiceOn, setVoiceOn] = useVoiceEnabled()

  const stepRef = useRef<Step>('permission')
  const stableSinceRef = useRef<number | null>(null)
  const countdownEndRef = useRef(0)
  const holdStartRef = useRef<number | null>(null)
  const passAtRef = useRef<number | null>(null)
  const poseIdxRef = useRef(0)
  const lastBeepRef = useRef(4)
  const lastSpeechRef = useRef('')
  const accentRef = useRef({ at: 0, color: '#c084fc' })

  stepRef.current = step
  poseIdxRef.current = poseIdx

  // 教学步:换动作时播报动作名
  useEffect(() => {
    if (step === 'tutorial') {
      const pose = TUTORIAL_POSES[poseIdx]
      voice.say(`跟我做,${pose.name}`, 'important')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, poseIdx])

  // 离开引导页时停止播报
  useEffect(() => {
    return () => voice.stop()
  }, [])

  // 摄像头画面 + 站位轮廓 / 教学渲染
  useEffect(() => {
    let raf = 0

    // 轻量节流:大字提示 150ms 同步一次
    let lastMain = ''
    let lastSyncAt = 0
    let lastPct = -1
    const syncBigHint = (s: StandStatus) => {
      const now = performance.now()
      if (s.main !== lastMain || now - lastSyncAt > 400) {
        lastMain = s.main
        lastSyncAt = now
        setBigHint({ main: s.main, detail: s.detail, arrow: s.arrow, ok: s.ok })
      }
    }
    const setHoldPctThrottled = (p: number) => {
      if (Math.abs(p - lastPct) > 0.05 || p === 0 || p === 1) {
        lastPct = p
        setHoldPct(p)
      }
    }
    const accentColor = (now: number) => {
      if (now - accentRef.current.at > 500) {
        accentRef.current = { at: now, color: cssVar('--accent', '#c084fc') }
      }
      return accentRef.current.color
    }

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

      // 镜像画面
      ctx.save()
      ctx.translate(w, 0)
      ctx.scale(-1, 1)
      ctx.drawImage(video, 0, 0, w, h)
      ctx.restore()
      ctx.fillStyle = 'rgba(10, 4, 8, 0.5)'
      ctx.fillRect(0, 0, w, h)

      // 实时骨骼(让用户看到自己)
      if (lm) drawLiveSkeleton(ctx, lm, w, h, neutralPartColors())

      const stepNow = stepRef.current

      if (stepNow === 'stand' || stepNow === 'countdown') {
        const status = evaluateStand(lm)
        const accent = accentColor(now)

        // ---- 站位轮廓区(加粗描边;站好时发光锁定) ----
        const rw = w * 0.34
        const rh = h * 0.86
        const rx = (w - rw) / 2
        const ry = h * 0.06
        const locked = status.ok
        ctx.save()
        if (locked) {
          ctx.shadowColor = accent
          ctx.shadowBlur = 22
        }
        ctx.setLineDash(locked ? [] : [12, 9])
        ctx.strokeStyle = locked ? accent : 'rgba(255, 255, 255, 0.65)'
        ctx.lineWidth = locked ? 5 : 4
        ctx.beginPath()
        ctx.roundRect(rx, ry, rw, rh, 40)
        ctx.stroke()
        ctx.setLineDash([])
        ctx.shadowBlur = 0
        // 简单人形引导线
        ctx.strokeStyle = locked ? accent : 'rgba(255, 255, 255, 0.25)'
        ctx.globalAlpha = locked ? 0.7 : 1
        ctx.lineWidth = 6
        ctx.lineCap = 'round'
        const cx = w / 2
        ctx.beginPath()
        ctx.arc(cx, ry + rh * 0.12, rh * 0.07, 0, Math.PI * 2) // 头部轮廓(仅站位引导)
        ctx.moveTo(cx, ry + rh * 0.19)
        ctx.lineTo(cx, ry + rh * 0.55) // 躯干
        ctx.moveTo(cx - rw * 0.28, ry + rh * 0.28)
        ctx.lineTo(cx + rw * 0.28, ry + rh * 0.28) // 肩线
        ctx.moveTo(cx, ry + rh * 0.55)
        ctx.lineTo(cx - rw * 0.16, ry + rh * 0.92)
        ctx.moveTo(cx, ry + rh * 0.55)
        ctx.lineTo(cx + rw * 0.16, ry + rh * 0.92) // 双腿
        ctx.stroke()
        ctx.globalAlpha = 1
        ctx.restore()

        // ---- 部位级状态点:入镜点亮(青)、未入镜红色闪烁 ----
        for (const part of STAND_PARTS) {
          const px = cx + part.spot.x * (rw / 2)
          const py = ry + part.spot.y * rh
          const isMissing = status.missing.includes(part.id)
          ctx.beginPath()
          if (isMissing) {
            ctx.fillStyle = `rgba(255, 77, 94, ${0.55 + 0.45 * Math.sin(now / 150)})`
            ctx.arc(px, py, 10, 0, Math.PI * 2)
          } else {
            ctx.fillStyle = '#2dffc4'
            ctx.arc(px, py, 7, 0, Math.PI * 2)
          }
          ctx.fill()
        }

        // 站稳进度弧(锁定中)
        if (locked && stableSinceRef.current !== null) {
          const pct = Math.min(1, (now - stableSinceRef.current) / STABLE_MS)
          ctx.beginPath()
          ctx.strokeStyle = accent
          ctx.lineWidth = 6
          ctx.arc(cx, ry + rh * 0.12, rh * 0.1, -Math.PI / 2, -Math.PI / 2 + pct * Math.PI * 2)
          ctx.stroke()
        }

        // ---- 状态机 ----
        if (stepNow === 'stand') {
          syncBigHint(status)
          // 语音:状态变化才播报(voice 内部再做 2s 同文去重)
          if (status.speech !== lastSpeechRef.current) {
            lastSpeechRef.current = status.speech
            if (status.ok) {
              sfx.confirm()
              voice.say(status.speech, 'important')
            } else {
              voice.say(status.speech)
            }
          }
          if (!status.ok) {
            stableSinceRef.current = null
          } else {
            if (stableSinceRef.current === null) stableSinceRef.current = now
            if (now - stableSinceRef.current > STABLE_MS) {
              stableSinceRef.current = null
              countdownEndRef.current = now + 3000
              lastBeepRef.current = 4
              setStep('countdown')
            }
          }
        } else {
          const remain = countdownEndRef.current - now
          const n = Math.ceil(remain / 1000)
          if (n !== lastBeepRef.current && n >= 0) {
            lastBeepRef.current = n
            sfx.countdown(n)
            voice.say(n > 0 ? String(n) : '开始', 'important')
          }
          if (remain <= 0) {
            setStep('tutorial')
          } else {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.35)'
            ctx.fillRect(0, 0, w, h)
            ctx.fillStyle = accent
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.font = `bold ${Math.round(h / 3.5)}px sans-serif`
            ctx.fillText(String(Math.ceil(remain / 1000)), w / 2, h / 2)
            ctx.font = `${Math.round(h / 24)}px sans-serif`
            ctx.fillStyle = '#ffffff'
            ctx.fillText('保持站位,准备开始动作教学', w / 2, h / 2 + h / 4.5)
          }
        }
      }

      if (stepNow === 'tutorial') {
        const pose = TUTORIAL_POSES[poseIdxRef.current]
        // 已通过,等切换
        if (passAtRef.current !== null) return
        const visible = !!lm && bodyVisible(lm)
        const score = visible
          ? scoreFrame(featuresFromLandmarks(lm!), featuresFromBody(pose.body)).score
          : 0
        if (score >= TUTORIAL_PASS_SCORE) {
          if (holdStartRef.current === null) holdStartRef.current = now
          const held = (now - holdStartRef.current) / 1000
          setHoldPctThrottled(Math.min(1, held / TUTORIAL_HOLD_SEC))
          if (held >= TUTORIAL_HOLD_SEC) {
            passAtRef.current = now
            sfx.pass()
            voice.say('做到了')
            setPassFlash(true)
            setTimeout(() => {
              setPassFlash(false)
              setHoldPctThrottled(0)
              holdStartRef.current = null
              passAtRef.current = null
              if (poseIdxRef.current + 1 < TUTORIAL_POSES.length) {
                setPoseIdx((i) => i + 1)
              } else {
                voice.say('教学完成,去选一支舞吧', 'important')
                finish()
              }
            }, 700)
          }
        } else {
          holdStartRef.current = null
          setHoldPctThrottled(0)
        }
      }
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const finish = () => {
    setOnboardingDone()
    onDone()
  }

  const enableCamera = async () => {
    setBusy(true)
    try {
      await engine.startCamera()
      // 首次语音在用户点击之后触发(浏览器自动播放策略)
      voice.say('很好,现在站进屏幕中间的框里', 'important')
      setStep('stand')
    } catch {
      // 错误已在 engine.status.cameraError
    } finally {
      setBusy(false)
    }
  }

  const pose = TUTORIAL_POSES[poseIdx]
  // 骨架教练用主题强调色(画布场景,读 CSS 变量)
  const coachColor = cssVar('--accent', '#c084fc')

  return (
    <div className="fixed inset-0 overflow-hidden select-none" style={{ background: 'var(--bg)' }}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-contain" />

      <div className="absolute left-3 top-3 sm:left-5 sm:top-5">
        <StatusBadge />
      </div>

      {/* 语音开关(站位/倒计时/教学步常驻右上角) */}
      {step !== 'permission' && (
        <button
          onClick={() => setVoiceOn(!voiceOn)}
          className="absolute right-3 top-3 rounded-full bg-black/60 px-4 py-2 text-sm text-white/85 backdrop-blur hover:bg-black/80 sm:right-5 sm:top-5"
        >
          {voiceOn ? '🔊 语音开' : '🔇 语音关'}
        </button>
      )}

      {/* 步骤 1:摄像头权限引导 */}
      {step === 'permission' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 px-6">
          <div className="sk-card w-full max-w-md rounded-3xl p-8 text-center" style={{ boxShadow: '0 0 60px var(--glow)' }}>
            <div className="sk-btn mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-3xl">
              📷
            </div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--tx)' }}>
              先认识一下你的摄像头
            </h2>
            <p className="sk-dim mt-3 text-sm leading-relaxed">
              教练需要用摄像头看你的<strong className="sk-accent">身体骨骼</strong>来打分。
              所有识别都在你的浏览器本地完成,
              <strong className="text-emerald-400">画面不会上传、不会存储</strong>;
              只识别身体,不做任何面部识别。
              接下来会有<strong className="sk-accent">语音提示</strong>帮你站位,离屏幕 2–3 米也没问题。
            </p>
            {engine.status.cameraError && (
              <p className="mt-3 rounded-lg bg-red-500/15 px-3 py-2 text-xs leading-relaxed text-red-300">
                {engine.status.cameraError}
              </p>
            )}
            <button
              onClick={enableCamera}
              disabled={busy || engine.status.modelStatus !== 'ready'}
              className="sk-btn mt-6 w-full rounded-full py-3 text-lg font-bold"
            >
              {engine.status.modelStatus !== 'ready'
                ? '姿态模型加载中…'
                : busy
                  ? '正在打开摄像头…'
                  : '允许使用摄像头'}
            </button>
            <button onClick={onBack} className="sk-faint mt-3 text-xs hover:opacity-80">
              返回标题
            </button>
          </div>
        </div>
      )}

      {/* 步骤 2:站位引导(超大字 + 方向图形,2–3 米可读) */}
      {(step === 'stand' || step === 'countdown') && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-14 flex flex-col items-center sm:top-16">
            <p className="rounded-full bg-black/60 px-4 py-1 text-sm font-medium text-white/80 backdrop-blur">
              第 1 步 · 站位
            </p>
            <div className="mt-3 flex items-center gap-4 rounded-3xl bg-black/55 px-8 py-4 backdrop-blur">
              {bigHint.arrow && (
                <span
                  className={`animate-pulse font-black ${bigHint.ok ? 'text-emerald-300' : 'text-white'}`}
                  style={{ fontSize: '72px', lineHeight: 1 }}
                >
                  {ARROW_GLYPHS[bigHint.arrow]}
                </span>
              )}
              <div className="text-center">
                <p
                  className={`font-black ${bigHint.ok ? 'text-emerald-300' : 'text-white'}`}
                  style={{ fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 1.15, textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}
                >
                  {bigHint.main}
                </p>
                <p className="mt-1 text-sm text-white/60">{bigHint.detail}</p>
              </div>
            </div>
          </div>
          {step === 'stand' && (
            <p className="pointer-events-none absolute inset-x-0 bottom-6 text-center text-xs text-white/50">
              听语音提示调整站位;绿点 = 已看到,红点闪烁 = 没看到
            </p>
          )}
        </>
      )}

      {/* 步骤 3:动作教学 */}
      {step === 'tutorial' && pose && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-14 flex flex-col items-center sm:top-16">
            <div className="rounded-full bg-black/60 px-5 py-2 text-center backdrop-blur">
              <p className="text-sm font-medium text-white">
                第 2 步 · 动作教学({poseIdx + 1} / {TUTORIAL_POSES.length})
              </p>
              <p className="sk-accent mt-0.5 text-2xl font-black">{pose.name}</p>
            </div>
          </div>

          {/* 骨架教练演示卡 */}
          <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl border p-4 backdrop-blur transition-colors ${
              passFlash ? 'border-emerald-400 bg-emerald-500/20' : 'sk-card bg-black/55'
            }`}
            style={passFlash ? undefined : { borderColor: 'var(--primary)' }}
          >
            <div className="animate-pulse">
              <SkeletonFigure body={pose.body} width={150} height={200} color={coachColor} />
            </div>
            {/* 达标保持进度(功能反馈色,不随 skin) */}
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all"
                style={{ width: `${holdPct * 100}%` }}
              />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-4 bottom-20 mx-auto max-w-lg rounded-2xl bg-black/60 px-5 py-3 text-center backdrop-blur">
            <p className="text-base leading-relaxed text-white/90">{pose.tip}</p>
            <p className="mt-1 text-xs text-white/45">
              {passFlash ? '做到了!✓' : '跟着教练摆出这个姿势,保持一下'}
            </p>
          </div>
        </>
      )}

      {/* 底部操作 */}
      <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-6">
        {step === 'tutorial' && (
          <button
            onClick={() => {
              holdStartRef.current = null
              passAtRef.current = null
              setHoldPct(0)
              if (poseIdx + 1 < TUTORIAL_POSES.length) setPoseIdx((i) => i + 1)
              else finish()
            }}
            className="sk-ghost rounded-full px-4 py-2 text-xs"
          >
            跳过这个动作
          </button>
        )}
        <button onClick={finish} className="sk-ghost rounded-full px-4 py-2 text-xs">
          跳过引导,直接选模式 →
        </button>
      </div>
    </div>
  )
}
