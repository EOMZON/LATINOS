"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type {
  DailyDemoDanceData,
  DailyDemoStateData,
  DailyDemoTaskData,
} from "@/data/types";
import {
  announceWitnessArchiveUpdate,
  type DailyStoredWitness,
} from "@/lib/witness-archive";

type DailyLoopStore = {
  stateId: string;
  danceId: string;
  completedTaskIds: string[];
  savedWitnesses: DailyStoredWitness[];
};

function loadStore(storageKey: string): DailyLoopStore | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    return {
      stateId: typeof parsed.stateId === "string" ? parsed.stateId : "",
      danceId: typeof parsed.danceId === "string" ? parsed.danceId : "",
      completedTaskIds: Array.isArray(parsed.completedTaskIds)
        ? parsed.completedTaskIds.filter((item: unknown): item is string => typeof item === "string")
        : [],
      savedWitnesses: Array.isArray(parsed.savedWitnesses)
        ? parsed.savedWitnesses.filter(
            (item: unknown): item is DailyStoredWitness => Boolean(item) && typeof item === "object"
          )
        : [],
    };
  } catch {
    return null;
  }
}

export function DailyLoopDemo({
  states,
  dances,
  tasks,
  storageKey,
  compact = false,
}: {
  states: DailyDemoStateData[];
  dances: DailyDemoDanceData[];
  tasks: DailyDemoTaskData[];
  storageKey: string;
  compact?: boolean;
}) {
  const searchParams = useSearchParams();
  const [stateId, setStateId] = useState(states[0]?.id ?? "");
  const [danceId, setDanceId] = useState(dances[0]?.id ?? "");
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [savedWitnesses, setSavedWitnesses] = useState<DailyStoredWitness[]>([]);
  const [note, setNote] = useState("");
  const [readyToPersist, setReadyToPersist] = useState(false);

  useEffect(() => {
    const stored = loadStore(storageKey);
    if (stored) {
      if (stored.stateId) {
        setStateId(stored.stateId);
      }
      if (stored.danceId) {
        setDanceId(stored.danceId);
      }
      setCompletedTaskIds(stored.completedTaskIds);
      setSavedWitnesses(stored.savedWitnesses);
    }
    setReadyToPersist(true);
  }, [storageKey]);

  useEffect(() => {
    const nextStateId = searchParams.get("state");
    const nextDanceId = searchParams.get("dance");
    const matchedState = states.find((item) => item.id === nextStateId);
    const matchedDance = dances.find((item) => item.id === nextDanceId);

    if (!matchedState && !matchedDance) {
      return;
    }

    if (matchedState) {
      setStateId(matchedState.id);
    }

    if (matchedDance) {
      setDanceId(matchedDance.id);
    }

    setCompletedTaskIds([]);
    setNote("");
  }, [dances, searchParams, states]);

  useEffect(() => {
    if (!readyToPersist) {
      return;
    }

    const payload: DailyLoopStore = {
      stateId,
      danceId,
      completedTaskIds,
      savedWitnesses,
    };
    window.localStorage.setItem(storageKey, JSON.stringify(payload));
  }, [completedTaskIds, danceId, readyToPersist, savedWitnesses, stateId, storageKey]);

  const activeState = states.find((item) => item.id === stateId) ?? states[0];
  const activeDance = dances.find((item) => item.id === danceId) ?? dances[0];
  const completedCount = completedTaskIds.length;
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;
  const visibleWitnesses = compact ? savedWitnesses.slice(0, 1) : savedWitnesses;
  const showCompactScoreMeta = !compact || progress > 0;

  const generatedPlan = useMemo(() => {
    const entryGate = compact ? activeState?.compactEntry ?? activeState?.entry ?? "" : activeState?.entry ?? "";
    const roundGoal = compact ? activeState?.compactGoal ?? activeState?.goal ?? "" : activeState?.goal ?? "";
    const nextStepPrefix = compact ? activeState?.compactNextStep ?? activeState?.nextStep ?? "" : activeState?.nextStep ?? "";
    const danceWitness = compact ? activeDance?.compactWitness ?? activeDance?.witness ?? "" : activeDance?.witness ?? "";

    return {
      entryGate,
      thisRound: `${activeDance?.label ?? ""} · ${activeDance?.cue ?? ""}`,
      roundGoal,
      nextStep: `${nextStepPrefix} ${danceWitness}`.trim(),
    };
  }, [activeDance, activeState, compact]);

  const toggleTask = (taskId: string) => {
    setCompletedTaskIds((current) =>
      current.includes(taskId)
        ? current.filter((item) => item !== taskId)
        : [...current, taskId]
    );
  };

  const handleReset = () => {
    setCompletedTaskIds([]);
    setNote("");
  };

  const stepOneTitle = compact ? "先定今天状态" : "先定今天属于哪种开始状态";
  const stepOneCopy = compact ? "先判断今天从哪开始。" : "先判断今天属于哪种开始状态。";
  const stepTwoTitle = compact ? "选今天主线舞" : "选今天这一轮的主线舞";
  const stepTwoCopy = compact ? "只选一支今天先做的舞。" : "只选一支最适合今天状态的舞。";
  const stepThreeTitle = compact ? "把这一轮做完" : "把这一轮做成最小闭环";
  const plannerTitle = compact ? "先做完，再留 witness" : "先做完这一轮，再留一句 witness";
  const plannerCopy = compact
    ? "重点不是解释，而是把这轮接上。"
    : "重点不是解释理念，而是把这一轮真的接上。";
  const scoreCopy = compact
    ? `已完成 ${completedCount}/${tasks.length} 个动作。`
    : `已完成 ${completedCount}/${tasks.length} 个关键动作。先把这轮接上，不求一次做满。`;
  const noteLabel = compact ? "补一句提示" : "补一句你自己的回流提示";
  const notePlaceholder = compact ? "例如：先把脚下边界做清楚。" : "例如：下次先把恰恰脚下边界做清楚。";
  const saveLabel = compact ? "保存 witness" : "保存今日 witness";
  const resetLabel = compact ? "重置" : "重置这一轮";
  const emptyRecentCopy = compact ? "保存后会在这里显示最近一条 witness。" : "保存后会在这里显示最近一条 daily witness。";

  const handleSaveWitness = () => {
    const savedItem: DailyStoredWitness = {
      id: `${Date.now()}`,
      stateId,
      danceId,
      state: activeState?.label ?? "",
      dance: activeDance?.label ?? "",
      progress,
      nextStep: generatedPlan.nextStep,
      note: note.trim(),
      createdAt: new Date().toLocaleString("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const next = [savedItem, ...savedWitnesses].slice(0, 3);
    setSavedWitnesses(next);
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        stateId,
        danceId,
        completedTaskIds,
        savedWitnesses: next,
      } satisfies DailyLoopStore)
    );
    announceWitnessArchiveUpdate();
    setNote("");
  };

  return (
    <div className={compact ? "ledger-shell compact-ledger-shell" : "ledger-shell"}>
      <div className="ledger-grid">
        <div className="ledger-stack">
          <div className="ledger-card">
            <div className="ledger-kicker mono">STEP 1 · ENTRY STATE</div>
            <h3>{stepOneTitle}</h3>
            {compact ? null : (
              <p className="ledger-copy">
                {stepOneCopy}
              </p>
            )}
            <div className="choice-grid">
              {states.map((item) => {
                const active = item.id === activeState?.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    data-testid={`daily-state-${item.id}`}
                    className={`choice-btn${active ? " active" : ""}`}
                    onClick={() => setStateId(item.id)}
                  >
                    <span className="choice-label">{compact ? item.compactLabel ?? item.label : item.label}</span>
                    <span className="choice-note">{compact ? item.compactNote ?? item.note : item.note}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="ledger-card">
            <div className="ledger-kicker mono">STEP 2 · TODAY DANCE</div>
            <h3>{stepTwoTitle}</h3>
            {compact ? null : (
              <p className="ledger-copy">
                {stepTwoCopy}
              </p>
            )}
            <div className="choice-grid compact">
              {dances.map((item) => {
                const active = item.id === activeDance?.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    data-testid={`daily-dance-${item.id}`}
                    className={`choice-btn compact${active ? " active" : ""}`}
                    onClick={() => setDanceId(item.id)}
                  >
                    <span className="choice-label">{item.label}</span>
                    <span className="choice-note">{compact ? item.compactFocus ?? item.focus : item.focus}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="ledger-card">
            <div className="ledger-kicker mono">STEP 3 · START LOOP</div>
            <h3>{stepThreeTitle}</h3>
            <div className="daily-task-list">
              {tasks.map((task) => {
                const done = completedTaskIds.includes(task.id);
                return (
                  <button
                    key={task.id}
                    type="button"
                    data-testid={`daily-task-${task.id}`}
                    className={`daily-task-toggle${done ? " done" : ""}`}
                    onClick={() => toggleTask(task.id)}
                  >
                    <span className="daily-task-copy">
                      <strong>{compact ? task.compactLabel ?? task.label : task.label}</strong>
                      {compact ? null : <span>{task.hint}</span>}
                    </span>
                    <span className="daily-task-badge mono">{done ? "DONE" : "OPEN"}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

          <div className="ledger-output">
            <div className="ledger-kicker mono">DAILY LOOP PLANNER</div>
            <h3>{plannerTitle}</h3>
            {compact ? null : (
              <p className="ledger-copy">
                {plannerCopy}
              </p>
            )}

          <div className="ledger-result-grid">
            <div className="ledger-result-card">
              <span className="ledger-result-label mono">ENTRY GATE</span>
              <strong>{activeState?.label}</strong>
              <p>{generatedPlan.entryGate}</p>
            </div>
            <div className="ledger-result-card">
              <span className="ledger-result-label mono">THIS ROUND</span>
              <strong>{activeDance?.label}</strong>
              <p>{generatedPlan.thisRound}</p>
            </div>
            <div className="ledger-result-card">
              <span className="ledger-result-label mono">ROUND GOAL</span>
              <strong>做完最小闭环</strong>
              <p>{generatedPlan.roundGoal}</p>
            </div>
            <div className={`ledger-result-card${compact ? " compact-score-card" : ""}`}>
              <span className="ledger-result-label mono">TODAY SCORE</span>
              <strong>{progress}%</strong>
              {showCompactScoreMeta ? <p>{scoreCopy}</p> : null}
              {showCompactScoreMeta ? (
                <div className="daily-progress-bar compact-progress-bar">
                  <div className="daily-progress-fill" style={{ width: `${progress}%` }} />
                </div>
              ) : null}
            </div>
          </div>

          <div className="ledger-next-step">
            <div className="ledger-result-label mono">RETURN WITNESS</div>
            <p data-testid="daily-return-witness-text">{generatedPlan.nextStep}</p>
          </div>

          <label className="ledger-note-block">
            {compact ? null : <span className="ledger-result-label mono">{noteLabel}</span>}
            {compact ? (
              <input
                type="text"
                data-testid="daily-witness-note"
                className="ledger-note-field"
                aria-label={noteLabel}
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder={notePlaceholder}
              />
            ) : (
              <textarea
                data-testid="daily-witness-note"
                className="ledger-note-field"
                aria-label={noteLabel}
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder={notePlaceholder}
              />
            )}
          </label>

          <div className="link-row">
            <button
              type="button"
              data-testid="daily-save-witness"
              className="btn brick"
              onClick={handleSaveWitness}
            >
              {saveLabel}
            </button>
            <button type="button" className="btn ghost" onClick={handleReset}>
              {resetLabel}
            </button>
          </div>

          {visibleWitnesses.length ? (
            <div className="ledger-recent">
              <div className="ledger-result-label mono">RECENT DAILY WITNESS</div>
              <div className="witness-list">
                {visibleWitnesses.map((item) => (
                  <div key={item.id} className="witness-item">
                    <div className="witness-head">
                      <strong>{item.state} · {item.dance}</strong>
                      <span className="mono">{item.createdAt}</span>
                    </div>
                    <p>{item.nextStep}</p>
                    {item.note ? <div className="witness-note">补充：{item.note}</div> : null}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="ledger-empty compact-recent-empty">{emptyRecentCopy}</p>
          )}
        </div>
      </div>
    </div>
  );
}
