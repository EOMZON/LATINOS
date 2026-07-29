import { useEffect, useRef, useState } from 'react'
import { usePoseEngine } from '../game/engine'
import { loadVideoReference, type LoadedReference } from '../game/referenceLoader'
import { loadChapterProgress } from '../game/progress'
import {
  KIND_LABELS,
  MODES,
  referenceUrl,
  splitChapters,
  type ChapterDef,
  type ModeDef,
} from '../modes/registry'
import { SMOOTH_LABELS, SMOOTH_LEVELS } from '../lib/oneEuroFilter'
import { buildLessonPlan } from '../game/lessonPlan'
import { getWeightKg, setWeightKg, GOALS, GOAL_META, type FitnessGoal } from '../game/fitness'
import StatusBadge from '../components/StatusBadge'
import SkinSwitcher from '../components/SkinSwitcher'

/** 舞种标签:克制的低饱和圆点(信息色,不抢主紫色) */
const DANCE_DOTS: Record<string, string> = {
  伦巴: '#c084fc',
  恰恰: '#fb923c',
  桑巴: '#2dffc4',
  牛仔: '#f5c542',
}

function DanceTag({ dance }: { dance: string }) {
  return (
    <span className="sk-chip flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold">
      <span className="inline-block h-2 w-2 rounded-full" style={{ background: DANCE_DOTS[dance] }} />
      {dance}
    </span>
  )
}

function DifficultyStars({ n }: { n: number }) {
  return (
    <span className="sk-star">
      {'★'.repeat(n)}
      <span className="sk-star-off">{'★'.repeat(3 - n)}</span>
    </span>
  )
}

export default function ModeSelectScreen({
  onPlay,
  onReOnboard,
  onBack,
}: {
  onPlay: (mode: ModeDef, chapter?: ChapterDef, goal?: FitnessGoal) => void
  onReOnboard: () => void
  onBack: () => void
}) {
  const engine = usePoseEngine()
  const [selected, setSelected] = useState<ModeDef | null>(null)
  const [placeholderInfo, setPlaceholderInfo] = useState<ModeDef | null>(null)
  const [ref, setRef] = useState<LoadedReference | null>(null)
  const [loadPct, setLoadPct] = useState(0)
  const [loadError, setLoadError] = useState<string | null>(null)
  const loadTokenRef = useRef(0)

  // 拉丁健身:训练目标(持久化) + 体重
  const GOAL_KEY = 'latin-dance-game:last-goal'
  const [selectedGoal, setSelectedGoal] = useState<FitnessGoal>(() => {
    try { const v = localStorage.getItem(GOAL_KEY); if (GOALS.includes(v as FitnessGoal)) return v as FitnessGoal } catch {}
    return 'burn'
  })
  const [weightKg, setWeightKgState] = useState(getWeightKg)

  const changeGoal = (g: FitnessGoal) => {
    setSelectedGoal(g)
    try { localStorage.setItem(GOAL_KEY, g) } catch {}
  }
  const changeWeight = (delta: number) => {
    const next = Math.min(300, Math.max(30, Math.round(weightKg + delta)))
    setWeightKgState(next)
    setWeightKg(next)
  }

  // 选中模式后预载参考(预计算/缓存秒级),顺便拿到曲目信息
  useEffect(() => {
    if (!selected || selected.placeholder || !selected.referenceId) {
      setRef(null)
      setLoadError(null)
      return
    }
    const landmarker = engine.getLandmarker()
    if (!landmarker) {
      setLoadError('姿态模型还没加载好,请稍等再试。')
      return
    }
    const token = ++loadTokenRef.current
    setRef(null)
    setLoadError(null)
    setLoadPct(0)
    loadVideoReference({
      url: referenceUrl(selected.referenceId),
      sourceId: selected.referenceId,
      label: selected.name,
      landmarker,
      smoothLevel: engine.smoothLevel,
      modelType: engine.modelType,
      onProgress: (p) => {
        if (loadTokenRef.current === token) setLoadPct(p)
      },
    })
      .then((r) => {
        if (loadTokenRef.current === token) setRef(r)
      })
      .catch((e) => {
        if (loadTokenRef.current === token) {
          setLoadError(e instanceof Error ? e.message : '参考加载失败')
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  const chapters = ref && selected?.kind === 'chapters' ? splitChapters(ref.seq.duration) : []
  const progress =
    selected?.kind === 'chapters' && ref
      ? loadChapterProgress(selected.id, chapters.length)
      : null

  return (
    <div className="sk-scene fixed inset-0 overflow-y-auto">
      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-16 pt-5 sm:px-8">
        {/* 顶栏 */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="sk-title text-2xl font-black italic sm:text-3xl">选择你的舞</h1>
            <p className="sk-faint mt-1 text-xs">Latin Fever · 拉丁舞动</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <SkinSwitcher variant="compact" />
            <StatusBadge />
            <button onClick={onReOnboard} className="sk-ghost rounded-full px-3 py-1.5 text-xs">
              重新引导
            </button>
            <button onClick={onBack} className="sk-ghost rounded-full px-3 py-1.5 text-xs">
              返回标题
            </button>
          </div>
        </div>

        {/* 引擎设置 */}
        <div className="sk-card2 sk-dim mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl px-4 py-3 text-xs">
          <span className="flex items-center gap-2">
            平滑(治抖动):
            {SMOOTH_LEVELS.map((l) => (
              <button
                key={l}
                onClick={() => engine.setSmoothLevel(l)}
                className={`rounded-full px-2.5 py-1 ${
                  engine.smoothLevel === l ? 'sk-chip-active font-bold' : 'sk-chip'
                }`}
              >
                {SMOOTH_LABELS[l]}
              </button>
            ))}
          </span>
          <span className="flex items-center gap-2">
            模型:
            {(['lite', 'full'] as const).map((m) => (
              <button
                key={m}
                onClick={() => engine.setModelType(m)}
                className={`rounded-full px-2.5 py-1 ${
                  engine.modelType === m ? 'sk-chip-active font-bold' : 'sk-chip'
                }`}
              >
                {m === 'lite' ? 'lite(省性能)' : 'full(更准)'}
              </button>
            ))}
          </span>
          {engine.smoothLevel === 'medium' && (
            <span className="sk-faint">默认「中」档,抖动大了再往上调</span>
          )}
        </div>

        {/* 模式卡片 */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => (m.placeholder ? setPlaceholderInfo(m) : setSelected(m))}
              className={`group relative rounded-3xl p-5 text-left ${
                m.placeholder ? 'sk-card2 opacity-60' : 'sk-card sk-hover'
              }`}
            >
              <div className="flex items-center justify-between">
                {m.dance ? (
                  <DanceTag dance={m.dance} />
                ) : (
                  <span className="sk-chip rounded-full px-2.5 py-0.5 text-xs font-bold">
                    {KIND_LABELS[m.kind]}
                  </span>
                )}
                <DifficultyStars n={m.difficulty} />
              </div>
              <h3 className="mt-3 text-lg font-bold" style={{ color: 'var(--tx)' }}>
                {m.placeholder && '🔒 '}
                {m.name}
              </h3>
              <p className="sk-dim mt-1.5 line-clamp-2 text-xs leading-relaxed">{m.description}</p>
              {!m.placeholder && (
                <p className="sk-accent mt-3 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100">
                  点我查看曲目 →
                </p>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 占位卡说明 */}
      {placeholderInfo && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 px-6"
          onClick={() => setPlaceholderInfo(null)}
        >
          <div
            className="sk-card w-full max-w-sm rounded-3xl p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-3xl">🔒</p>
            <h3 className="mt-2 text-lg font-bold" style={{ color: 'var(--tx)' }}>
              {placeholderInfo.name}
            </h3>
            <p className="sk-dim mt-3 text-sm leading-relaxed">
              这个舞种还没有示范视频。把示范视频放进
              <code className="sk-chip sk-accent mx-1 rounded px-1">public/references/</code>
              并在
              <code className="sk-chip sk-accent mx-1 rounded px-1">src/modes/registry.ts</code>
              里加一条模式记录,跑一下 <code className="sk-chip sk-accent rounded px-1">npm run precompute</code>
              就能解锁。具体步骤见 README「如何新增一个模式」。
            </p>
            <button
              onClick={() => setPlaceholderInfo(null)}
              className="sk-ghost mt-5 rounded-full px-6 py-2 text-sm"
            >
              知道了
            </button>
          </div>
        </div>
      )}

      {/* 模式详情 / 章节选择 */}
      {selected && (
        <div
          className="fixed inset-0 z-20 flex items-end justify-center bg-black/70 sm:items-center"
          onClick={() => setSelected(null)}
        >
          <div
            className="sk-card max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-t-3xl p-6 sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  {selected.dance && <DanceTag dance={selected.dance} />}
                  <span className="sk-chip rounded-full px-2.5 py-0.5 text-xs">
                    {KIND_LABELS[selected.kind]}
                  </span>
                  <DifficultyStars n={selected.difficulty} />
                </div>
                <h2 className="mt-2 text-2xl font-black" style={{ color: 'var(--tx)' }}>
                  {selected.name}
                </h2>
              </div>
              <button onClick={() => setSelected(null)} className="sk-ghost rounded-full px-3 py-1 text-sm">
                ✕
              </button>
            </div>
            <p className="sk-dim mt-3 text-sm leading-relaxed">{selected.description}</p>

            {/* 曲目信息 */}
            {selected.referenceId && (
              <div className="sk-card2 mt-4 rounded-2xl p-4 text-sm">
                {loadError ? (
                  <p className="text-red-400">{loadError}</p>
                ) : ref ? (
                  <div className="sk-dim flex flex-wrap gap-x-6 gap-y-1">
                    <span>
                      预计时长 <strong className="sk-accent">{ref.seq.duration.toFixed(0)}s</strong>
                    </span>
                    <span>
                      关键动作 <strong className="sk-accent">{ref.keyPoses.length} 个</strong>
                    </span>
                    {selected.kind === 'teach' && (
                      <span>
                        教学分段{' '}
                        <strong className="sk-accent">
                          {buildLessonPlan(ref.seq, ref.keyPoses).length} 段
                        </strong>
                      </span>
                    )}
                    <span className="sk-faint">
                      {ref.source === 'precomputed'
                        ? '参考已就位(预计算)'
                        : ref.source === 'cache'
                          ? '已从本地缓存载入'
                          : '提取完成,已缓存'}
                    </span>
                  </div>
                ) : (
                  <div>
                    <p className="sk-dim mb-2">
                      教练备课中(提取示范动作)… {Math.round(loadPct * 100)}%
                    </p>
                    <div className="sk-track h-1.5 overflow-hidden rounded-full">
                      <div
                        className="sk-fill h-full rounded-full transition-all"
                        style={{ width: `${loadPct * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 拉丁健身:训练目标 + 体重 */}
            <div className="mt-4 rounded-2xl bg-white/5 p-4">
              <p className="mb-2 text-sm font-bold" style={{ color: 'var(--tx)' }}>
                这次想练什么
              </p>
              <div className="grid grid-cols-3 gap-2">
                {GOALS.map((g) => {
                  const meta = GOAL_META[g]
                  const active = selectedGoal === g
                  return (
                    <button
                      key={g}
                      onClick={() => changeGoal(g)}
                      className={`rounded-xl px-2 py-2.5 text-center transition ${
                        active ? 'sk-chip-active font-bold' : 'sk-chip'
                      }`}
                    >
                      <p className="text-sm font-bold">{meta.label}</p>
                      <p className="sk-faint mt-0.5 text-[10px] leading-tight">{meta.desc}</p>
                    </button>
                  )
                })}
              </div>
              <p className="sk-faint mt-2 text-[11px]">
                建议 ≥ {GOAL_META[selectedGoal].suggestedMin} 分钟 · 强度约 {GOAL_META[selectedGoal].met} MET ·{' '}
                {GOAL_META[selectedGoal].desc}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: 'var(--tx)' }}>
                  体重
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => changeWeight(-1)}
                    className="sk-ghost h-8 w-8 rounded-full text-lg font-black"
                    aria-label="减重"
                  >
                    −
                  </button>
                  <span className="w-16 text-center text-lg font-black tabular-nums" style={{ color: 'var(--tx)' }}>
                    {weightKg}
                    <span className="sk-faint ml-0.5 text-xs font-normal">kg</span>
                  </span>
                  <button
                    onClick={() => changeWeight(1)}
                    className="sk-ghost h-8 w-8 rounded-full text-lg font-black"
                    aria-label="增重"
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="sk-faint mt-1 text-[11px]">
                用于估算燃脂量,仅本地保存,可随时调整。
              </p>
            </div>

            {/* 章节选择 */}
            {selected.kind === 'chapters' && ref && progress && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {chapters.map((c) => {
                  const locked = c.index > progress.unlocked
                  const stars = progress.stars[c.index]
                  return (
                    <button
                      key={c.index}
                      disabled={locked}
                      onClick={() => onPlay(selected, c, selectedGoal)}
                      className={`rounded-2xl p-3 text-center ${
                        locked ? 'sk-card2 opacity-50' : 'sk-card sk-hover'
                      }`}
                    >
                      <p className="text-sm font-bold" style={{ color: 'var(--tx)' }}>
                        {locked ? '🔒' : `第 ${c.index + 1} 章`}
                      </p>
                      <p className="sk-faint mt-0.5 text-[10px]">
                        {c.start.toFixed(0)}s – {c.end.toFixed(0)}s
                      </p>
                      <p className="sk-star mt-1 text-xs">
                        {'★'.repeat(stars)}
                        <span className="sk-star-off">{'★'.repeat(3 - stars)}</span>
                      </p>
                    </button>
                  )
                })}
              </div>
            )}

            {/* 开始按钮(章节模式从上面选章进入) */}
            {selected.kind !== 'chapters' && (
              <button
                disabled={!!selected.referenceId && !ref}
                onClick={() => onPlay(selected, undefined, selectedGoal)}
                className="sk-btn mt-6 w-full rounded-full py-3.5 text-lg font-black"
              >
                {selected.referenceId && !ref
                  ? '备课中,稍等…'
                  : selected.kind === 'teach'
                    ? '开始上课'
                    : '开始跳舞'}
              </button>
            )}
            {/* 打分模式的「先学习」入口:同一参考有教学模式时显示 */}
            {(selected.kind === 'follow' || selected.kind === 'challenge') &&
              (() => {
                const teach = MODES.find(
                  (m) => m.kind === 'teach' && m.referenceId === selected.referenceId && !m.placeholder,
                )
                return teach ? (
                  <button
                    onClick={() => setSelected(teach)}
                    className="sk-ghost mt-2 w-full rounded-full py-2.5 text-sm"
                  >
                    还不熟?先上教学模式(分段演示 + 慢速跟跳)→
                  </button>
                ) : null
              })()}
            {selected.kind === 'chapters' && (
              <p className="sk-faint mt-4 text-center text-xs">
                拿到至少 1 星解锁下一章;
                {progress ? `已解锁 ${progress.unlocked + 1} / ${chapters.length} 章` : ''}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
