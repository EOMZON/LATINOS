import { useMemo, useEffect, useState } from 'react'
import { JUDGMENT_META, RATING_COLORS, ratingFor, starsFor } from '../game/judgments'
import type { ChapterDef, ModeDef } from '../modes/registry'
import type { GameResult } from '../game/types'
import { sfx } from '../game/audio'
import { loadSilhouettesOnly } from '../game/referenceLoader'
import { findSilhouette, type SilhouetteEntry } from '../lib/silhouette'
import SilhouetteFigure from '../components/SilhouetteFigure'
import { GOAL_META } from '../game/fitness'
import { MUSCLE_NAMES, type MuscleId } from '../game/muscleMap'
import { getPrevSession, recordFitnessCheckin, getStreak } from '../game/fitnessProgress'

function fmtTime(t: number): string {
  return `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`
}

function fmtDuration(sec: number): string {
  const s = Math.max(0, Math.round(sec))
  const m = Math.floor(s / 60)
  const r = s % 60
  return m > 0 ? `${m} 分 ${r} 秒` : `${r} 秒`
}

/** 结算屏:拉丁健身摘要——以🔥燃脂为主指标,动作完成度与肌肉负荷为辅 */
export default function ResultsScreen({
  result,
  mode,
  chapter,
  onRetry,
  onNextChapter,
  onExit,
}: {
  result: GameResult
  mode: ModeDef
  chapter?: ChapterDef
  onRetry: () => void
  onNextChapter?: () => void
  onExit: () => void
}) {
  const rating = ratingFor(result.avg)
  const stars = starsFor(result.avg)
  const [silhouettes, setSilhouettes] = useState<SilhouetteEntry[] | null>(null)

  // 健身数据是否可用(仅 GameScreen 跑出的结果带这些字段)
  const hasFit = result.kcal !== undefined && result.activeSeconds !== undefined

  // 上一次训练趋势:必须在写入今日打卡之前读取
  const prev = useMemo(() => (hasFit ? getPrevSession() : null), [hasFit])

  // 写入今日打卡并取连续天数(首屏一次性)
  const [streak] = useState(() => {
    if (!hasFit) return 0
    recordFitnessCheckin({
      kcal: result.kcal ?? 0,
      activeSeconds: result.activeSeconds ?? 0,
      avgIntensity: result.avgIntensity ?? 0,
      goal: result.goal ?? 'burn',
    })
    return getStreak()
  })

  const goalMeta = GOAL_META[result.goal ?? 'burn']

  // 最好/最差动作的剪影快照:轻量补载预计算轮廓,没有就保持纯文本(不报错)
  useEffect(() => {
    let cancelled = false
    if (mode.referenceId) {
      void loadSilhouettesOnly(mode.referenceId).then((s) => {
        if (!cancelled && s) setSilhouettes(s)
      })
    }
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 章节模式 keyResults 的时间是重定时的,查剪影要加回章节起点
  const tOffset = chapter?.start ?? 0

  useEffect(() => {
    if (!result.failed) sfx.pass()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 下一章:本章 ≥1 星且还有下一章
  const nextUnlocked =
    mode.kind === 'chapters' && (result.chapterStars ?? 0) >= 1 && !!result.nextChapter

  const best = useMemo(
    () => [...result.keyResults].filter((k) => k.avg !== null).sort((a, b) => (b.avg ?? 0) - (a.avg ?? 0)).slice(0, 3),
    [result],
  )
  const worst = useMemo(() => {
    const rest = result.keyResults.filter((k) => !best.includes(k))
    const sorted = rest.sort((a, b) => (a.avg ?? -1) - (b.avg ?? -1)).slice(0, 3)
    return sorted.length > 0 ? sorted : [...best].reverse()
  }, [result, best])

  // 本次肌肉负荷 Top-3(编排标注时间均值)
  const topMuscles = useMemo(() => {
    if (!result.muscleLoad) return [] as Array<{ id: MuscleId; v: number }>
    return (Object.entries(result.muscleLoad) as Array<[MuscleId, number]>)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .filter(([, v]) => v > 0)
      .map(([id, v]) => ({ id, v }))
  }, [result])

  const kcal = Math.round(result.kcal ?? 0)
  const prevKcal = prev ? Math.round(prev.kcal) : 0
  const deltaKcal = kcal - prevKcal
  const jm = JUDGMENT_META

  return (
    <div className="sk-scene fixed inset-0 overflow-y-auto">
      <div className="relative z-10 mx-auto flex min-h-full max-w-lg flex-col items-center justify-center px-6 py-10">
        {result.failed ? (
          <p className="text-sm font-medium tracking-widest text-red-400">闯关失败,差一点点!</p>
        ) : (
          <p className="sk-faint text-sm font-medium tracking-widest">
            {mode.kind === 'chapters' && chapter ? `第 ${chapter.index + 1} 章完成` : '本局完成'}
            {hasFit ? ` · ${goalMeta.label}` : ''}
          </p>
        )}

        {/* 主指标:🔥 燃脂估算 */}
        {hasFit && (
          <div className="mt-4 flex flex-col items-center">
            <div
              className="judgment-pop flex items-end gap-1"
              style={{ color: '#ff8a3d', textShadow: '0 0 40px rgba(255,138,61,0.45)' }}
            >
              <span className="text-4xl leading-none">🔥</span>
              <span className="text-7xl font-black italic tabular-nums leading-none">{kcal}</span>
              <span className="sk-faint mb-2 text-xl font-bold">kcal</span>
            </div>
            <p className="sk-faint mt-1 text-[11px]">估算值 · 非医学精度 · 体重 {result.weightKg ?? ''}kg 推算</p>

            {/* 本次小结:有效时长 / 动作数 / 平均强度 */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm">
              <span className="sk-dim">
                有效 <strong className="sk-accent tabular-nums">{fmtDuration(result.activeSeconds ?? 0)}</strong>
              </span>
              <span className="sk-dim">
                <strong className="sk-accent tabular-nums">{result.moveCount ?? 0}</strong> 个动作
              </span>
              <span className="sk-dim">
                强度{' '}
                <strong className="sk-accent tabular-nums">
                  {Math.round((result.avgIntensity ?? 0) * 100)}
                </strong>
                %
              </span>
            </div>

            {/* 比上次 */}
            {prev && (
              <p
                className={`mt-2 rounded-full px-3 py-1 text-xs font-bold ${
                  deltaKcal >= 0 ? 'sk-chip-active' : 'sk-chip'
                }`}
              >
                {deltaKcal >= 0 ? '↑' : '↓'} 比上次 {deltaKcal >= 0 ? '+' : ''}
                {deltaKcal} kcal
                <span className="sk-faint ml-1 font-normal">· 上次 {prevKcal}</span>
              </p>
            )}
          </div>
        )}

        {/* 今日打卡 */}
        {hasFit && (
          <p className="mt-4 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium" style={{ color: 'var(--tx)' }}>
            ✅ 今日已打卡 · 连续 <strong className="sk-accent">{streak}</strong> 天
          </p>
        )}

        {/* 次级:动作完成度(评级) */}
        <div className="mt-5 flex items-center gap-3">
          <div
            className="text-5xl font-black italic"
            style={{ color: result.failed ? '#ff4d5e' : RATING_COLORS[rating] }}
          >
            {result.failed ? '—' : rating}
          </div>
          <div className="text-left">
            <p className="text-xs font-bold" style={{ color: 'var(--tx)' }}>
              动作完成度
            </p>
            {!result.failed && (
              <p className="sk-star mt-0.5 text-lg">
                {'★'.repeat(stars)}
                <span className="sk-star-off">{'★'.repeat(5 - stars)}</span>
              </p>
            )}
            <p className="sk-dim mt-0.5 text-xs">
              均分 <strong className="tabular-nums">{Math.round(result.avg)}</strong> · 最大连击{' '}
              <strong className="sk-accent tabular-nums">{result.maxCombo}</strong>
            </p>
          </div>
        </div>

        {/* 肌肉负荷 Top-3 */}
        {topMuscles.length > 0 && (
          <div className="mt-4 w-full rounded-2xl bg-white/5 p-4">
            <p className="mb-2 text-sm font-bold" style={{ color: 'var(--tx)' }}>
              这次主要练到
            </p>
            <div className="flex flex-col gap-2">
              {topMuscles.map(({ id, v }) => (
                <div key={id} className="flex items-center gap-3">
                  <span className="w-16 shrink-0 text-xs font-medium" style={{ color: 'var(--tx)' }}>
                    {MUSCLE_NAMES[id]}
                  </span>
                  <div className="sk-track h-2 flex-1 overflow-hidden rounded-full">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.round(v * 100)}%`,
                        background: 'linear-gradient(90deg,#67e8f9,#2dffc4)',
                      }}
                    />
                  </div>
                  <span className="w-9 text-right text-xs tabular-nums sk-dim">{Math.round(v * 100)}%</span>
                </div>
              ))}
            </div>
            <p className="sk-faint mt-2 text-[11px]">依据动作编排标注推算,非肌电实测。</p>
          </div>
        )}

        {/* 判定统计(功能色标签,游戏语境) */}
        <div className="mt-4 grid w-full grid-cols-4 gap-2">
          {(['perfect', 'great', 'good', 'miss'] as const).map((j) => (
            <div key={j} className="sk-card2 rounded-2xl py-3 text-center">
              <p className="text-xs font-bold" style={{ color: jm[j].color }}>
                {jm[j].label}
              </p>
              <p className="mt-1 text-2xl font-black tabular-nums" style={{ color: 'var(--tx)' }}>
                {result.judgments[j]}
              </p>
            </div>
          ))}
        </div>

        {/* 最好 / 最需要练(动作反馈) */}
        {result.keyResults.length > 0 && (
          <div className="mt-4 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="sk-card2 rounded-2xl p-4">
              <p className="mb-2 text-sm font-bold" style={{ color: '#2dffc4' }}>
                做得最好的动作
              </p>
              {best.map((k) => {
                const pts = findSilhouette(silhouettes, k.t + tOffset)
                return (
                  <p key={`b${k.t}`} className="sk-dim flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      {pts && <SilhouetteFigure pts={pts} width={22} height={30} color="#2dffc4" />}
                      {fmtTime(k.t)}
                    </span>
                    <span className="tabular-nums">{k.avg !== null ? `${Math.round(k.avg)} 分` : '未入镜'}</span>
                  </p>
                )
              })}
            </div>
            <div className="sk-card2 rounded-2xl p-4">
              <p className="mb-2 text-sm font-bold" style={{ color: '#ff4d5e' }}>
                最需要练的动作
              </p>
              {worst.map((k) => {
                const pts = findSilhouette(silhouettes, k.t + tOffset)
                return (
                  <p key={`w${k.t}`} className="sk-dim flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      {pts && <SilhouetteFigure pts={pts} width={22} height={30} color="#ff4d5e" />}
                      {fmtTime(k.t)}
                    </span>
                    <span className="tabular-nums">{k.avg !== null ? `${Math.round(k.avg)} 分` : '未入镜'}</span>
                  </p>
                )
              })}
            </div>
          </div>
        )}

        {/* 操作 */}
        <div className="mt-7 flex w-full flex-col gap-2">
          {nextUnlocked && onNextChapter && (
            <button onClick={onNextChapter} className="sk-btn rounded-full py-3 text-lg font-black">
              继续下一章 →
            </button>
          )}
          <button onClick={onRetry} className="sk-btn rounded-full py-3 text-lg font-black">
            再来一次
          </button>
          <button onClick={onExit} className="sk-ghost rounded-full py-3 text-sm">
            返回模式选择
          </button>
        </div>
      </div>
    </div>
  )
}
