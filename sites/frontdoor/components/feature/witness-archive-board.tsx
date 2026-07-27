"use client";

import { useMemo } from "react";
import Link from "next/link";
import { homeQueueFallbacks } from "@/data/home";
import {
  useArchiveWitnesses,
  useDailyWitnesses,
  useDanceWitnesses,
} from "@/hooks/use-witness-archive";

export function WitnessArchiveBoard({ compact = false }: { compact?: boolean }) {
  const daily = useDailyWitnesses();
  const dance = useDanceWitnesses();
  const archive = useArchiveWitnesses(6);
  const fallbackArchive = useMemo(
    () =>
      homeQueueFallbacks.map((item, index) => ({
        id: `fallback-${item.slot}-${index}`,
        source: item.source,
        title: item.title,
        context: item.context,
        nextStep: item.nextStep,
        note: "",
        createdAt: "source-backed",
        meta: "reference witness",
        href: item.href,
      })),
    []
  );

  const summary = useMemo(() => {
    const total = daily.length + dance.length;
    return {
      total,
      daily: daily.length,
      dance: dance.length,
      hasLiveWitness: total > 0,
      latest: archive[0] ?? fallbackArchive[0] ?? null,
    };
  }, [archive, daily, dance, fallbackArchive]);

  const visibleArchive = archive.length ? archive : fallbackArchive;
  const archiveIntro = summary.hasLiveWitness
    ? compact
      ? "这里开始验证 Daily 和 Dance 是否真的共用同一条回流线。"
      : "这里的重点不是“再多一个列表”，而是开始验证 Daily Latin 和 Dance OS 是否真的在形成同一条回流系统，而不是两个互相看不见的孤立 demo。"
    : compact
      ? "当前先用 source-backed return lines 保持这条回流线可见。"
      : "当前还没有 fresh preview 里真实写入的 live witness，这里先展示 source-backed return lines，保证 frontdoor 第一次打开时也能看见这条线想形成的回流形状。";
  const latestLabel = summary.hasLiveWitness ? "LATEST WITNESS" : "STARTER RETURN LINE";
  const showLatestCard = summary.latest && (!compact || summary.hasLiveWitness);
  const showCompactArchiveLinks = !compact || summary.hasLiveWitness;

  return (
    <div className="archive-board">
      <div className="archive-summary-grid">
        <div className="archive-summary-card">
          <span className="archive-label mono">ARCHIVE TOTAL</span>
          <strong>{summary.total}</strong>
          <p>当前 frontdoor 已经收住的 witness 数量。它们不是静态说明，而是两条 demo 真正留下来的下一轮证据。</p>
        </div>
        <div className="archive-summary-card">
          <span className="archive-label mono">DAILY LOOP</span>
          <strong>{summary.daily}</strong>
          <p>这些 entry witness 证明 Daily Latin 不只是在讲入口逻辑，而是在把人送进今天这一轮。</p>
        </div>
        <div className="archive-summary-card">
          <span className="archive-label mono">DANCE OS</span>
          <strong>{summary.dance}</strong>
          <p>这些 correction witness 证明 Dance OS 已经开始把“问题”写成下一轮真的能执行的动作句。</p>
        </div>
      </div>

      <div className="archive-panel">
        <div className="archive-panel-head">
          <div>
            <div className="archive-label mono">WITNESS ARCHIVE</div>
            <h3>把 Daily 和 Dance 的返回证据收成一个共享层</h3>
          </div>
          {showCompactArchiveLinks ? (
            <div className="archive-links">
              <Link className="btn ghost" href="/daily-latin">
                看 Daily Witness
              </Link>
              <Link className="btn brick" href="/dance-os">
                看 Dance Witness
              </Link>
            </div>
          ) : null}
        </div>
        <p className="archive-copy">{archiveIntro}</p>
        {showLatestCard ? (
          <div className="archive-latest">
            <span className="archive-label mono">{latestLabel}</span>
            <strong>{summary.latest.title}</strong>
            <p>{summary.latest.nextStep}</p>
            {compact ? null : (
              <div className="archive-actions">
                <Link data-testid="archive-latest-resume" className="btn ghost" href={summary.latest.href}>
                  继续这一轮
                </Link>
              </div>
            )}
          </div>
        ) : null}
        {visibleArchive.length ? (
          <div className="archive-list">
            {visibleArchive.map((item) => (
              <div key={item.id} className={`archive-item ${item.source}`}>
                <div className="archive-item-head">
                  <span className="archive-pill mono">{item.source === "daily" ? "DAILY" : "DANCE"}</span>
                  <span className="archive-date mono">{item.createdAt}</span>
                </div>
                <h4>{item.title}</h4>
                <div className="archive-item-context">{item.context}</div>
                <p>{item.nextStep}</p>
                {item.note ? <div className="archive-item-note">补充：{item.note}</div> : null}
                <div className="archive-actions">
                  <Link
                    data-testid={`archive-resume-${item.source}`}
                    className="btn ghost"
                    href={item.href}
                  >
                    继续这一轮
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="archive-empty">
            还没有共享 witness。先去 `Daily Latin` 或 `Dance OS` 做完一轮，再回来这里看 frontdoor 里有没有真的长出回流证据。
          </div>
        )}
      </div>
    </div>
  );
}
