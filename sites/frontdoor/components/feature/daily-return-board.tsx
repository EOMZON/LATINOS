"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useDailyWitnesses } from "@/hooks/use-witness-archive";
import {
  buildDailyWitnessHref,
  buildDanceBridgeHrefFromDailyWitness,
  type DailyStoredWitness,
} from "@/lib/witness-archive";
import { dailyReturnModeSeeds } from "@/data/daily";

type ReturnMode = {
  id: string;
  label: string;
  title: string;
  description: string;
  recommendation: string;
  href: string;
  cta: string;
  variant: "ghost" | "brick";
  testId: string;
};

function buildReturnModes(latest: DailyStoredWitness | null, compact: boolean): ReturnMode[] {
  const latestDailyHref = latest ? buildDailyWitnessHref(latest) : "/daily-latin#today-loop-demo";
  const latestDanceHref = latest ? buildDanceBridgeHrefFromDailyWitness(latest) : "/dance-os#correction-ledger-demo";

  return dailyReturnModeSeeds.map((seed) => {
    if (seed.id === "live") {
      return {
        id: seed.id,
        label: compact ? seed.compactLabel ?? seed.label : seed.label,
        title: seed.compactTitle ?? seed.title,
        description: seed.compactDescription ?? seed.description,
        recommendation:
          latest?.state === "刚看完直播 / 切片"
            ? compact
              ? "这条更适合先回 Daily。"
              : "最近这条 witness 更适合先做 live return。"
            : compact
              ? "看完直播，先回 Daily。"
              : "看完直播或切片时，先回 Daily Loop。",
        href: latestDailyHref,
        cta: compact ? "回 Daily" : seed.cta,
        variant: seed.variant,
        testId: seed.testId,
      };
    }

    if (seed.id === "clip") {
      return {
        id: seed.id,
        label: compact ? seed.compactLabel ?? seed.label : seed.label,
        title: seed.compactTitle ?? seed.title,
        description: seed.compactDescription ?? seed.description,
        recommendation:
          latest?.progress === 100
            ? compact
              ? "这轮已闭环，适合留 archive。"
              : "最近一轮已闭环，适合留下更清楚的 clip witness。"
            : compact
              ? "先做完，再决定要不要留 archive。"
              : "先把这轮做完，再决定要不要升成 clip witness。",
        href: "/dashboard",
        cta: compact ? "看归档" : seed.cta,
        variant: seed.variant,
        testId: seed.testId,
      };
    }

    return {
      id: seed.id,
      label: compact ? seed.compactLabel ?? seed.label : seed.label,
      title: seed.compactTitle ?? seed.title,
      description: seed.compactDescription ?? seed.description,
        recommendation:
          latest?.state === "已经有具体卡点"
          ? compact
            ? "这条已经能桥接。"
            : "最近这条 witness 已具备桥接条件。"
          : compact
            ? "能说清卡点，就桥接 Dance OS。"
            : "能说出脚下 / 重心 / 髋时，就该桥接到 Dance OS。",
      href: latestDanceHref,
      cta: compact ? "去 OS" : seed.cta,
      variant: seed.variant,
      testId: seed.testId,
    };
  });
}

export function DailyReturnBoard({ compact = false }: { compact?: boolean }) {
  const items = useDailyWitnesses();

  const summary = useMemo(() => {
    const latest = items[0] ?? null;
    const liveCount = items.filter((item) => item.stateId === "after-live" || item.state === "刚看完直播 / 切片").length;
    const bridgeReadyCount = items.filter((item) => item.stateId === "stuck" || item.state === "已经有具体卡点").length;

    return {
      latest,
      total: items.length,
      liveCount,
      bridgeReadyCount,
    };
  }, [items]);

  const returnModes = useMemo(() => buildReturnModes(summary.latest, compact), [compact, summary.latest]);
  const queue = useMemo(() => items.slice(0, compact ? 1 : 2), [compact, items]);
  const showCompactMetrics = compact && summary.total > 0;
  const boardTitle = compact ? "做完后，回哪" : "这一轮做完后，下一步回哪";
  const boardCopy = compact ? "先回练习，再判断继续 / 桥接。" : "先把内容拉回练习，再把这一轮带回下一轮。";
  const queueTitle = compact ? "继续还是桥接" : "哪些该继续，哪些该桥接";
  const queueCopy = compact ? "同一条 witness 只做这次判断。" : "同一条 witness 可能继续，也可能该桥接。";
  const queueCountLabel = queue.length ? `${queue.length} 条 witness` : "暂无 daily queue";
  const queueContinueLabel = compact ? "继续" : "继续这一轮";
  const queueBridgeLabel = compact ? "桥接" : "桥接到 Dance OS";
  const queueEmptyCopy = compact
    ? "先保存一条 witness，再回来判断是继续还是桥接。"
    : "还没有 Daily queue。先保存一条 witness，再回来判断它该继续、归档，还是桥接到 Dance OS。";

  return (
    <div className={compact ? "daily-return-board compact-daily-return-board" : "daily-return-board"} data-testid="daily-return-board">
      {showCompactMetrics ? (
        <div className="daily-return-metric-strip">
          <div className="daily-return-metric-pill">
            <span className="archive-label mono">DAILY RETURN</span>
            <strong>{summary.total}</strong>
          </div>
          <div className="daily-return-metric-pill">
            <span className="archive-label mono">LIVE RETURN</span>
            <strong>{summary.liveCount}</strong>
          </div>
          <div className="daily-return-metric-pill">
            <span className="archive-label mono">BRIDGE READY</span>
            <strong>{summary.bridgeReadyCount}</strong>
          </div>
        </div>
      ) : compact ? null : (
        <div className="archive-summary-grid daily-return-summary-grid">
          <div className="archive-summary-card">
            <span className="archive-label mono">DAILY RETURN</span>
            <strong>{summary.total}</strong>
            <p>被 Daily 收住的回流数</p>
          </div>
          <div className="archive-summary-card">
            <span className="archive-label mono">LIVE RETURN</span>
            <strong>{summary.liveCount}</strong>
            <p>来自直播 / 切片的回流数</p>
          </div>
          <div className="archive-summary-card">
            <span className="archive-label mono">BRIDGE READY</span>
            <strong>{summary.bridgeReadyCount}</strong>
            <p>已经具备桥接条件的 witness 数</p>
          </div>
        </div>
      )}

      <div className="daily-return-grid">
        <div className="daily-return-panel">
          <div className="daily-return-panel-head">
            <div>
              <div className="archive-label mono">LIVE RETURN / CLIP BRIDGE / ARCHIVE JUMP</div>
              <h3>{boardTitle}</h3>
            </div>
            {compact ? null : (
              <div className="daily-return-note">
                {summary.latest ? `latest · ${summary.latest.state} / ${summary.latest.dance}` : "等待第一条 witness"}
              </div>
            )}
          </div>
          {compact ? null : <p className="daily-return-copy">{boardCopy}</p>}

          <div className="daily-return-mode-list">
            {returnModes.map((mode) => (
              <div key={mode.id} className="daily-return-mode-card">
                <div className="archive-label mono">{mode.label}</div>
                <h4>{mode.title}</h4>
                <p>{mode.description}</p>
                <div className="daily-return-recommendation">{mode.recommendation}</div>
                <div className="bodymap-actions">
                  <Link data-testid={mode.testId} className={`btn ${mode.variant}`} href={mode.href}>
                    {mode.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="daily-return-panel" data-testid="daily-return-queue">
          <div className="daily-return-panel-head">
            <div>
              <div className="archive-label mono">NEXT DAILY QUEUE</div>
              <h3>{queueTitle}</h3>
            </div>
            {compact ? null : <div className="daily-return-note">{queueCountLabel}</div>}
          </div>
          {compact ? null : <p className="daily-return-copy">{queueCopy}</p>}

          {queue.length ? (
            <div className="practice-queue-list">
              {queue.map((item, index) => (
                <div key={item.id} className="practice-queue-card" data-testid={`daily-queue-item-${item.danceId ?? item.id}`}>
                  <div className="practice-queue-head">
                    <span className="archive-pill mono">DAILY {index + 1}</span>
                    <span className="archive-date mono">{item.createdAt}</span>
                  </div>
                  <h4>{item.state} · {item.dance}</h4>
                  <div className="practice-queue-meta">progress {item.progress}% / daily witness</div>
                  <p>{item.nextStep}</p>
                  {item.note ? <div className="practice-queue-note">补充：{item.note}</div> : null}
                  <div className="bodymap-actions">
                    <Link className="btn ghost" href={buildDailyWitnessHref(item)}>
                      {queueContinueLabel}
                    </Link>
                    <Link
                      data-testid={index === 0 ? "daily-queue-bridge-latest" : undefined}
                      className="btn brick"
                      href={buildDanceBridgeHrefFromDailyWitness(item)}
                    >
                      {queueBridgeLabel}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="archive-empty compact-archive-empty daily-queue-empty">
              {queueEmptyCopy}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
