"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { DanceDemoFocusData } from "@/data/types";
import { useDanceWitnesses } from "@/hooks/use-witness-archive";
import {
  buildDanceWitnessHref,
  type DanceStoredWitness,
} from "@/lib/witness-archive";

type FocusSnapshot = {
  id: string;
  label: string;
  cue: string;
  proof: string;
  count: number;
  profiles: string[];
  latest: DanceStoredWitness | null;
};

export function BodyMapPracticeQueue({
  focuses,
  compact = false,
}: {
  focuses: DanceDemoFocusData[];
  compact?: boolean;
}) {
  const items = useDanceWitnesses();

  const focusSnapshots = useMemo(() => {
    const mapped = focuses.map((focus) => {
      const matches = items.filter((item) => (item.focusId ? item.focusId === focus.id : item.focus === focus.label));

      return {
        id: focus.id,
        label: focus.label,
        cue: focus.cue,
        proof: focus.proof,
        count: matches.length,
        profiles: Array.from(new Set(matches.map((item) => item.profile))),
        latest: matches[0] ?? null,
      } satisfies FocusSnapshot;
    });

    return mapped.sort((left, right) => right.count - left.count || Number(Boolean(right.latest)) - Number(Boolean(left.latest)));
  }, [focuses, items]);

  const summary = useMemo(() => {
    const activeFocuses = focusSnapshots.filter((item) => item.count > 0);
    const latest = items[0] ?? null;
    const hottest = activeFocuses[0] ?? null;

    return {
      total: items.length,
      activeFocuses: activeFocuses.length,
      latest,
      hottest,
    };
  }, [focusSnapshots, items]);

  const queue = useMemo(() => items.slice(0, 4), [items]);
  const hottestCopy = summary.hottest
    ? `最近最高频热区：${summary.hottest.label}。先沿这一块连续修几轮。`
    : "先做一条 correction ledger，再让第一块热区长出来。";
  const mapCopy = "先看最近问题主要落到哪一块身体，不把反馈继续散掉。";
  const queueCopy = "如果这块成立，Dance OS 就开始真的拥有“下轮从哪里继续”的产品层。";
  const mapTitle = compact ? "把问题压成身体热区" : "把身体问题压成热区，而不是散掉的反馈句";
  const mapNote = compact ? "按 witness 聚合" : "按当前 witness 聚合热区";
  const queueTitle = compact ? "让下轮继续成为队列" : "让“下轮继续什么”成为真实可回来的队列";
  const queueNote = summary.latest
    ? `latest · ${summary.latest.profile} / ${summary.latest.focus}`
    : compact
      ? "等待 witness"
      : "等待第一个 witness";
  const emptyMapCopy = "这一块还没长出真实 witness。等问题落到这里，它才算成立。";
  const emptyQueueCopy = "还没有 practice queue。先做一条 correction ledger，让这一页开始拥有真正的下一轮结构。";
  const showSummary = !compact || summary.total > 0;
  const showQueueEmpty = !compact;

  return (
    <div className="bodymap-board compact-bodymap-board">
      {showSummary ? (
        <div className="archive-summary-grid bodymap-summary-grid">
          <div className="archive-summary-card compact-bodymap-summary-card">
            <span className="archive-label mono">BODY MAP</span>
            <strong>{summary.activeFocuses}</strong>
            <p>已经被真实 witness 命中的身体区域数量。它证明问题开始落到身体层，而不是继续停在笼统感受。</p>
          </div>
          <div className="archive-summary-card compact-bodymap-summary-card">
            <span className="archive-label mono">PRACTICE QUEUE</span>
            <strong>{summary.total}</strong>
            <p>当前 Dance OS 已收住的下一轮队列条目。每一条都应该能把人送回一个具体可继续的修正点。</p>
          </div>
          <div className="archive-summary-card compact-bodymap-summary-card">
            <span className="archive-label mono">HOTTEST FOCUS</span>
            <strong>{summary.hottest?.label ?? "待产生"}</strong>
            <p>{hottestCopy}</p>
          </div>
        </div>
      ) : null}

      <div className="bodymap-grid">
        <div className="bodymap-panel compact-bodymap-panel">
          <div className="bodymap-panel-head">
            <div>
              <div className="archive-label mono">BODY MAP SNAPSHOT</div>
              <h3>{mapTitle}</h3>
            </div>
            <div className="bodymap-panel-note">{mapNote}</div>
          </div>
          <p className="bodymap-copy">{mapCopy}</p>

          <div className="bodymap-focus-list">
            {focusSnapshots.map((focus) => {
              const latest = focus.latest;
              return (
                <div
                  key={focus.id}
                  className={`bodymap-focus-card compact-bodymap-focus-card${focus.count ? " live" : ""}`}
                  data-testid={`bodymap-focus-${focus.id}`}
                >
                  <div className="bodymap-focus-head">
                    <div>
                      <span className="archive-label mono">FOCUS AREA</span>
                      <h4>{focus.label}</h4>
                    </div>
                    <div className="bodymap-focus-count">
                      {focus.count ? `${focus.count} 次 witness` : compact ? "暂无" : "暂无 witness"}
                    </div>
                  </div>
                  <p className="bodymap-focus-proof">{focus.proof}</p>
                  <div className="bodymap-focus-cue">{focus.cue}</div>
                  {latest ? (
                    <>
                      <div className="bodymap-latest-card">
                        <strong>{latest.profile} · {latest.state}</strong>
                        <p>{latest.correction}</p>
                      </div>
                      <div className="bodymap-focus-meta">
                        <span>{focus.profiles.join(" / ")}</span>
                        <span>{latest.createdAt}</span>
                      </div>
                      <div className="bodymap-actions">
                        <Link className="btn ghost" href={buildDanceWitnessHref(latest)}>
                          继续修 {focus.label}
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="bodymap-empty">{emptyMapCopy}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bodymap-panel practice-panel compact-bodymap-panel compact-practice-panel" data-testid="practice-queue-panel">
          <div className="bodymap-panel-head">
            <div>
              <div className="archive-label mono">PRACTICE QUEUE</div>
              <h3>{queueTitle}</h3>
            </div>
            <div className="bodymap-panel-note">{queueNote}</div>
          </div>
          <p className="bodymap-copy">{queueCopy}</p>

          {queue.length ? (
            <div className="practice-queue-list">
              {queue.map((item, index) => (
                <div
                  key={item.id}
                  className="practice-queue-card compact-practice-queue-card"
                  data-testid={`practice-queue-item-${item.focusId ?? item.id}`}
                >
                  <div className="practice-queue-head">
                    <span className="archive-pill mono">QUEUE {index + 1}</span>
                    <span className="archive-date mono">{item.createdAt}</span>
                  </div>
                  <h4>{item.profile} · {item.state}</h4>
                  <div className="practice-queue-meta">{item.focus} / correction ledger</div>
                  <p>{item.nextStep}</p>
                  {item.note ? <div className="practice-queue-note">补充：{item.note}</div> : null}
                  <div className="bodymap-actions">
                    <Link className="btn brick" href={buildDanceWitnessHref(item)}>
                      回到这轮继续
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : showQueueEmpty ? (
            <div className="archive-empty compact-archive-empty">
              {emptyQueueCopy}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
