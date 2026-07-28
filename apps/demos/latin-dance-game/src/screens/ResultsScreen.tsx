import { useMemo, useEffect, useState } from 'react'
import { JUDGMENT_META, RATING_COLORS, ratingFor, starsFor } from '../game/judgments'
import type { ChapterDef, ModeDef } from '../modes/registry'
import type { GameResult } from '../game/types'
import { sfx } from '../game/audio'
import { loadSilhouettesOnly } from '../game/referenceLoader'
import { findSilhouette, type SilhouetteEntry } from '../lib/silhouette'
import SilhouetteFigure from '../components/SilhouetteFigure'

function fmtTime(t: number): string {
  return `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`
}

/** 结算屏:总分 + 评级 + 星星 + 判定统计 + 最大连击 + 最好/最差动作 */
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

  const jm = JUDGMENT_META

  return (
    <div className="sk-scene fixed inset-0 overflow-y-auto">
      <div className="relative z-10 mx-auto flex min-h-full max-w-lg flex-col items-center justify-center px-6 py-10">
        {result.failed ? (
          <p className="text-sm font-medium tracking-widest text-red-400">闯关失败,差一点点!</p>
        ) : (
          <p className="sk-faint text-sm font-medium tracking-widest">
            {mode.kind === 'chapters' && chapter ? `第 ${chapter.index + 1} 章完成` : '本局完成'}
          </p>
        )}

        {/* 评级 + 星星(评级色为功能色,不随 skin 变) */}
        <div
          className="judgment-pop mt-3 text-8xl font-black italic"
          style={{
            color: result.failed ? '#ff4d5e' : RATING_COLORS[rating],
            textShadow: '0 0 50px var(--glow)',
          }}
        >
          {result.failed ? `${result.clearedCount}/${result.totalCount}` : rating}
        </div>
        {result.failed && <p className="sk-dim mt-1 text-sm">闯过的关数</p>}
        {!result.failed && (
          <p className="sk-star mt-2 text-2xl">
            {'★'.repeat(stars)}
            <span className="sk-star-off">{'★'.repeat(5 - stars)}</span>
          </p>
        )}
        {mode.kind === 'chapters' && result.chapterStars !== undefined && !result.failed && (
          <p className="sk-dim mt-1 text-sm">
            本章得星:{' '}
            <span className="sk-star">
              {'★'.repeat(result.chapterStars)}
              <span className="sk-star-off">{'★'.repeat(3 - result.chapterStars)}</span>
            </span>
            {result.chapterStars >= 1 ? ' · 下一章已解锁' : ' · 拿到 1 星才能解锁下一章'}
          </p>
        )}

        <p className="sk-dim mt-4 text-sm">
          全程平均分{' '}
          <strong className="text-xl tabular-nums" style={{ color: 'var(--tx)' }}>
            {Math.round(result.avg)}
          </strong>
          {' · '}最大连击{' '}
          <strong className="sk-accent text-xl tabular-nums">{result.maxCombo}</strong>
        </p>

        {/* 判定统计(功能色标签) */}
        <div className="mt-5 grid w-full grid-cols-4 gap-2">
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

        {/* 最好 / 最需要练 */}
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
