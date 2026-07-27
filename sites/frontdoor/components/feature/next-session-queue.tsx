"use client";

import Link from "next/link";
import { useMemo } from "react";
import { homeQueueFallbacks } from "@/data/home";
import { useArchiveWitnesses } from "@/hooks/use-witness-archive";

function queueSnippet(text: string, max = 40) {
  if (!text) {
    return "";
  }

  const compact = text.replace(/\s+/g, " ").trim();
  if (compact.length <= max) {
    return compact;
  }

  return `${compact.slice(0, max).trim()}...`;
}

export function NextSessionQueue({
  className,
  variant = "panel",
}: {
  className?: string;
  variant?: "panel" | "rail";
}) {
  const isRail = variant === "rail";
  const items = useArchiveWitnesses(5);

  const summary = useMemo(() => {
    const fallbackLatest = homeQueueFallbacks.find((item) => item.slot === "latest");
    const fallbackDaily = homeQueueFallbacks.find((item) => item.slot === "daily");
    const fallbackDance = homeQueueFallbacks.find((item) => item.slot === "dance");

    const latest = items[0] ?? fallbackLatest ?? null;
    const daily = items.find((item) => item.source == "daily") ?? fallbackDaily ?? null;
    const dance = items.find((item) => item.source == "dance") ?? fallbackDance ?? null;

    return { latest, daily, dance };
  }, [items]);

  const stripItems = items.length ? items : homeQueueFallbacks;

  return (
    <div className={className ? `queue-board ${className}` : "queue-board"}>
      <div className="queue-panel">
        {isRail ? (
          <div className="queue-head queue-head-rail">
            <div className="queue-rail-title">刚做完的一轮 → 下一轮</div>
            <div className="queue-links queue-links-compact queue-links-home">
              <Link className="queue-route-link" href="/daily-latin">
                Daily
              </Link>
              <Link className="queue-route-link" href="/dance-os">
                Dance OS
              </Link>
            </div>
          </div>
        ) : (
          <div className="queue-head">
            <div className="queue-heading">
              <div className="archive-label mono">NEXT SESSION QUEUE</div>
              <h3>最近 witness → 下一轮</h3>
              <p className="queue-copy">首页先给回流入口，再回到对应页面把这一轮继续做完。</p>
            </div>
            <div className="queue-links queue-links-compact queue-links-home">
              <Link className="queue-route-link" href="/daily-latin">
                Daily
              </Link>
              <Link className="queue-route-link" href="/dance-os">
                Dance OS
              </Link>
            </div>
          </div>
        )}

        <div className="queue-rail-list">
          <div className="queue-rail-item latest">
            <div className="queue-rail-head">
              <span className="archive-label mono">LATEST</span>
              <span className="queue-card-source">刚完成</span>
            </div>
            {summary.latest ? (
              <>
                <strong>{summary.latest.title}</strong>
                <div className="queue-meta">{summary.latest.context}</div>
                {isRail ? null : <p>{queueSnippet(summary.latest.nextStep, 38)}</p>}
                <div className="queue-actions compact">
                  <Link data-testid="queue-resume-latest" className="queue-inline-link" href={summary.latest.href}>
                    继续这一轮
                  </Link>
                </div>
              </>
            ) : (
              <>
                <strong>先生成第一条 witness</strong>
                {isRail ? null : <p>从 Daily 或 Dance OS 起一轮，这里就会变成真实回流入口。</p>}
              </>
            )}
          </div>

          <div className="queue-rail-item daily">
            <div className="queue-rail-head">
              <span className="archive-label mono">DAILY</span>
              <span className="queue-card-source">回流</span>
            </div>
            {summary.daily ? (
              <>
                <strong>{summary.daily.title}</strong>
                <div className="queue-meta">{summary.daily.context}</div>
                {isRail ? null : <p>{queueSnippet(summary.daily.nextStep, 34)}</p>}
                <div className="queue-actions compact">
                  <Link data-testid="queue-resume-daily" className="queue-inline-link" href={summary.daily.href}>
                    回到 Daily
                  </Link>
                </div>
              </>
            ) : (
              <>
                <strong>Daily witness 还没生成</strong>
                {isRail ? null : <p>先去 Daily 做完一轮，把今天的入口判断留成一句话。</p>}
              </>
            )}
          </div>

          <div className="queue-rail-item dance">
            <div className="queue-rail-head">
              <span className="archive-label mono">DANCE</span>
              <span className="queue-card-source">回流</span>
            </div>
            {summary.dance ? (
              <>
                <strong>{summary.dance.title}</strong>
                <div className="queue-meta">{summary.dance.context}</div>
                {isRail ? null : <p>{queueSnippet(summary.dance.nextStep, 34)}</p>}
                <div className="queue-actions compact">
                  <Link data-testid="queue-resume-dance" className="queue-inline-link" href={summary.dance.href}>
                    回到 Dance OS
                  </Link>
                </div>
              </>
            ) : (
              <>
                <strong>Dance witness 还没生成</strong>
                {isRail ? null : <p>先去 Dance OS 留下一条 ledger，把卡点压成 next step。</p>}
              </>
            )}
          </div>
        </div>
        {stripItems.length ? (
          <div className="queue-strip">
            {stripItems.slice(0, 3).map((item) => (
              <div key={`${item.source}-${item.title}-${item.href}`} className={`queue-chip ${item.source}`}>
                <span className="mono">{item.source === "daily" ? "DAILY" : "DANCE"}</span>
                <b>{queueSnippet(item.title, 14)}</b>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
