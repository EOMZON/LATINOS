"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type {
  DanceDemoFocusData,
  DanceDemoProfileData,
  DanceDemoStateData,
  DemoChecklistItemData,
} from "@/data/types";
import {
  announceWitnessArchiveUpdate,
  type DanceStoredWitness,
} from "@/lib/witness-archive";

function loadWitnesses(storageKey: string) {
  if (typeof window === "undefined") {
    return [] as DanceStoredWitness[];
  }

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as DanceStoredWitness[]) : [];
  } catch {
    return [];
  }
}

export function CorrectionLedgerDemo({
  profiles,
  states,
  focuses,
  checklist,
  storageKey,
  compact = false,
}: {
  profiles: DanceDemoProfileData[];
  states: DanceDemoStateData[];
  focuses: DanceDemoFocusData[];
  checklist: DemoChecklistItemData[];
  storageKey: string;
  compact?: boolean;
}) {
  const searchParams = useSearchParams();
  const [profileId, setProfileId] = useState(profiles[0]?.id ?? "");
  const [stateId, setStateId] = useState(states[0]?.id ?? "");
  const [focusId, setFocusId] = useState(focuses[0]?.id ?? "");
  const [note, setNote] = useState("");
  const [savedWitnesses, setSavedWitnesses] = useState<DanceStoredWitness[]>([]);

  useEffect(() => {
    setSavedWitnesses(loadWitnesses(storageKey));
  }, [storageKey]);

  useEffect(() => {
    const nextStateId = searchParams.get("state");
    const nextProfileId = searchParams.get("profile");
    const nextFocusId = searchParams.get("focus");
    const matchedState = states.find((item) => item.id === nextStateId);
    const matchedProfile = profiles.find((item) => item.id === nextProfileId);
    const matchedFocus = focuses.find((item) => item.id === nextFocusId);

    if (!matchedState && !matchedProfile && !matchedFocus) {
      return;
    }

    if (matchedState) {
      setStateId(matchedState.id);
    }

    if (matchedProfile) {
      setProfileId(matchedProfile.id);
    }

    if (matchedFocus) {
      setFocusId(matchedFocus.id);
    }

    setNote("");
  }, [focuses, profiles, searchParams, states]);

  const activeProfile = profiles.find((item) => item.id === profileId) ?? profiles[0];
  const activeState = states.find((item) => item.id === stateId) ?? states[0];
  const activeFocus = focuses.find((item) => item.id === focusId) ?? focuses[0];

  const generatedPlan = useMemo(() => {
    const correction =
      activeProfile?.corrections[activeFocus?.id] ??
      Object.values(activeProfile?.corrections ?? {})[0] ??
      "";
    const nextStep = `${activeState?.nextStep ?? ""} 下轮继续先盯 ${activeFocus?.label ?? ""}：${correction}`;
    const witnessTitle = `${activeProfile?.label ?? ""} · ${activeState?.label ?? ""} · ${activeFocus?.label ?? ""}`;

    return {
      correction,
      nextStep,
      witnessTitle,
      returnGate: `做完这一轮后，如果你能复述“下轮先改 ${activeFocus?.label ?? ""}”，这轮就成立。`,
    };
  }, [activeFocus?.id, activeFocus?.label, activeProfile, activeState]);

  const visibleWitnesses = compact ? savedWitnesses.slice(0, 1) : savedWitnesses;
  const stepOneTitle = compact ? "先定这轮状态" : "先判断这轮处于什么状态";
  const stepOneCopy = compact
    ? "先判断现在是重启、拍子乱、已有卡点，还是准备录 witness。"
    : "Dance OS 不是先给评分，而是先判断你现在是在重启、拍子乱、已有卡点，还是准备录一个能回看的 witness。";
  const stepTwoTitle = compact ? "把问题压成落点" : "把问题压成一个具体落点";
  const stepTwoCopy = compact
    ? "先选主线舞，再只修一个身体落点。"
    : "先选主线舞，再决定这轮只修哪个身体部位。问题必须落到身体层，而不是停在抽象评价。";
  const stepThreeTitle = compact ? "这一轮成立条件" : "这一轮成立的最小条件";
  const outputTitle = compact ? "这一轮只改 1 个点，再留下一轮 witness" : "这一轮只改一个点，然后留下下一轮 witness";
  const outputCopy = compact
    ? "先生成一条可执行 next step，验证人会不会回来下一轮。"
    : "当前选择会直接生成一条可执行的 next step。这样才能验证 Dance OS 是不是在帮助人回来做下一轮，而不只是展示模块名。";
  const noteLabel = compact ? "补一句你自己的 witness" : "补一句你自己的 witness";
  const notePlaceholder = compact
    ? "例如：下次先守住 2-3 的重心。"
    : "例如：下次先守住 2-3 的重心，不追求把动作做大。";
  const saveLabel = compact ? "保存这一轮 witness" : "保存这一轮 witness";
  const emptyRecentCopy = compact
    ? "先跑完一轮，再留下一条最近 witness。"
    : "还没有保存 witness。先跑完一轮，再留下第一条“下次只改哪里”。";

  const handleSave = () => {
    const savedItem: DanceStoredWitness = {
      id: `${Date.now()}`,
      profileId,
      stateId,
      focusId,
      profile: activeProfile?.label ?? "",
      state: activeState?.label ?? "",
      focus: activeFocus?.label ?? "",
      correction: generatedPlan.correction,
      nextStep: generatedPlan.nextStep,
      note: note.trim(),
      createdAt: new Date().toLocaleString("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const next = [savedItem, ...savedWitnesses].slice(0, 4);
    setSavedWitnesses(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    announceWitnessArchiveUpdate();
    setNote("");
  };

  return (
    <div className={compact ? "ledger-shell compact-ledger-shell" : "ledger-shell"}>
      <div className="ledger-grid">
        <div className="ledger-stack">
          <div className="ledger-card">
            <div className="ledger-kicker mono">STEP 1 · SESSION</div>
            <h3>{stepOneTitle}</h3>
            {compact ? null : <p className="ledger-copy">{stepOneCopy}</p>}
            <div className="choice-grid">
              {states.map((item) => {
                const active = item.id === activeState?.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    data-testid={`dance-state-${item.id}`}
                    className={`choice-btn${active ? " active" : ""}`}
                    onClick={() => setStateId(item.id)}
                  >
                    <span className="choice-label">{item.label}</span>
                    <span className="choice-note">{item.note}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="ledger-card">
            <div className="ledger-kicker mono">STEP 2 · DANCE / FOCUS</div>
            <h3>{stepTwoTitle}</h3>
            {compact ? null : <p className="ledger-copy">{stepTwoCopy}</p>}
            <div className="choice-grid compact">
              {profiles.map((item) => {
                const active = item.id === activeProfile?.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    data-testid={`dance-profile-${item.id}`}
                    className={`choice-btn compact${active ? " active" : ""}`}
                    onClick={() => setProfileId(item.id)}
                  >
                    <span className="choice-label">{item.label}</span>
                    <span className="choice-note">{item.count}</span>
                  </button>
                );
              })}
            </div>
            <div className="choice-grid compact secondary">
              {focuses.map((item) => {
                const active = item.id === activeFocus?.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    data-testid={`dance-focus-${item.id}`}
                    className={`choice-btn compact${active ? " active" : ""}`}
                    onClick={() => setFocusId(item.id)}
                  >
                    <span className="choice-label">{item.label}</span>
                    <span className="choice-note">{item.cue}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="ledger-card">
            <div className="ledger-kicker mono">STEP 3 · CHECKLIST</div>
            <h3>{stepThreeTitle}</h3>
            <div className="ledger-checklist">
              {checklist.map((item) => (
                <div key={item.label} className="ledger-check-item">
                  <strong>{item.label}</strong>
                  {compact ? null : <span>{item.detail}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ledger-output">
          <div className="ledger-kicker mono">CORRECTION LEDGER DEMO</div>
          <h3>{outputTitle}</h3>
          {compact ? null : <p className="ledger-copy">{outputCopy}</p>}

          <div className="ledger-result-grid">
            <div className="ledger-result-card">
              <span className="ledger-result-label mono">SESSION LENS</span>
              <strong>{generatedPlan.witnessTitle}</strong>
              <p>{activeState?.lens}</p>
            </div>
            <div className="ledger-result-card">
              <span className="ledger-result-label mono">THIS ROUND</span>
              <strong>{activeFocus?.label}</strong>
              <p>{generatedPlan.correction}</p>
            </div>
            <div className="ledger-result-card">
              <span className="ledger-result-label mono">WHY THIS BODY PART</span>
              <strong>{activeProfile?.label}</strong>
              <p>{activeFocus?.proof}</p>
            </div>
            <div className="ledger-result-card">
              <span className="ledger-result-label mono">RETURN GATE</span>
              <strong>下一轮判断</strong>
              <p>{generatedPlan.returnGate}</p>
            </div>
          </div>

          <div className="ledger-next-step">
            <div className="ledger-result-label mono">NEXT STEP WITNESS</div>
            <p>{generatedPlan.nextStep}</p>
          </div>

          <label className="ledger-note-block">
            {compact ? null : <span className="ledger-result-label mono">{noteLabel}</span>}
            <textarea
              data-testid="dance-witness-note"
              className="ledger-note-field"
              aria-label={noteLabel}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder={notePlaceholder}
            />
          </label>

          <div className="link-row">
            <button type="button" className="btn brick" onClick={handleSave}>
              {saveLabel}
            </button>
          </div>

          {visibleWitnesses.length || !compact ? (
            <div className="ledger-recent">
              <div className="ledger-result-label mono">RECENT WITNESS</div>
              {visibleWitnesses.length ? (
                <div className="witness-list">
                  {visibleWitnesses.map((item) => (
                    <div key={item.id} className="witness-item">
                      <div className="witness-head">
                        <strong>{item.profile} · {item.state}</strong>
                        <span className="mono">{item.createdAt}</span>
                      </div>
                      <p>{item.nextStep}</p>
                      {item.note ? <div className="witness-note">补充：{item.note}</div> : null}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="ledger-empty">{emptyRecentCopy}</p>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
