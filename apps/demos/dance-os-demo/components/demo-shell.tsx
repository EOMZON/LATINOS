"use client";

import { useEffect, useMemo, useState } from "react";
import { WitnessFlowStageCard } from "@/components/witness-flow-stage-card";
import { WitnessRecordCard } from "@/components/witness-record-card";
import {
  demoArchivePrompts,
  demoChecklist,
  demoFlowStagePrompts,
  demoFocuses,
  demoProfiles,
  demoQueuePrompts,
  demoReturnPrompts,
  demoStates,
} from "@/data/demo";
import { loadStore, STORAGE_KEY, type DemoStore, type StoredWitness } from "@/lib/demo-store";

export function DemoShell() {
  const [stateId, setStateId] = useState(demoStates[1]?.id ?? "beat");
  const [profileId, setProfileId] = useState(demoProfiles[1]?.id ?? "cha");
  const [focusId, setFocusId] = useState(demoFocuses[2]?.id ?? "feet");
  const [note, setNote] = useState("");
  const [savedWitnesses, setSavedWitnesses] = useState<StoredWitness[]>([]);
  const [practiceQueue, setPracticeQueue] = useState<StoredWitness[]>([]);
  const [returnTrigger, setReturnTrigger] = useState<StoredWitness | null>(null);

  useEffect(() => {
    const store = loadStore();
    setSavedWitnesses(store.savedWitnesses);
    setPracticeQueue(store.practiceQueue);
    setReturnTrigger(store.returnTrigger);
  }, []);

  const state = useMemo(() => demoStates.find((item) => item.id === stateId) ?? demoStates[0], [stateId]);
  const profile = useMemo(() => demoProfiles.find((item) => item.id === profileId) ?? demoProfiles[0], [profileId]);
  const focus = useMemo(() => demoFocuses.find((item) => item.id === focusId) ?? demoFocuses[0], [focusId]);

  const nextStep = `${profile.label} · ${profile.corrections[focus.id] ?? focus.nextStep}`;
  const latestWitness = savedWitnesses[0] ?? null;
  const latestCount = savedWitnesses.length;
  const queueCount = practiceQueue.length;
  const queueHead = practiceQueue[0] ?? null;

  const flowStages = useMemo(
    () => [
      {
        id: "archive",
        label: demoFlowStagePrompts.archive.label,
        title: latestCount ? `${latestCount} 条 witness` : demoFlowStagePrompts.archive.emptySummary,
        summary: latestWitness ? `${latestWitness.profileLabel} · ${latestWitness.focusLabel}` : "等待第一条 witness",
        detail: latestWitness ? latestWitness.nextStep : demoFlowStagePrompts.archive.emptyDetail,
        href: "#archive-section",
        ctaLabel: demoFlowStagePrompts.archive.ctaLabel,
        tone: "archive" as const,
      },
      {
        id: "queue",
        label: demoFlowStagePrompts.queue.label,
        title: queueCount ? `${queueCount} 条待继续` : demoFlowStagePrompts.queue.emptySummary,
        summary: queueHead ? `${queueHead.profileLabel} · ${queueHead.focusLabel}` : "等待队列生成",
        detail: queueHead ? queueHead.nextStep : demoFlowStagePrompts.queue.emptyDetail,
        href: "#queue-section",
        ctaLabel: demoFlowStagePrompts.queue.ctaLabel,
        tone: "queue" as const,
      },
      {
        id: "return",
        label: demoFlowStagePrompts.return.label,
        title: returnTrigger ? "已武装回来入口" : demoFlowStagePrompts.return.emptySummary,
        summary: returnTrigger ? `${returnTrigger.profileLabel} · ${returnTrigger.focusLabel}` : "先从 queue 里选一条继续",
        detail: returnTrigger ? returnTrigger.nextStep : demoFlowStagePrompts.return.emptyDetail,
        href: "#return-trigger-section",
        ctaLabel: demoFlowStagePrompts.return.ctaLabel,
        tone: "return" as const,
      },
    ],
    [latestCount, latestWitness, queueCount, queueHead, returnTrigger]
  );

  const persistStore = (
    nextSavedWitnesses: StoredWitness[],
    nextPracticeQueue: StoredWitness[],
    nextReturnTrigger: StoredWitness | null
  ) => {
    if (typeof window === "undefined") {
      return;
    }

    const payload: DemoStore = {
      savedWitnesses: nextSavedWitnesses,
      practiceQueue: nextPracticeQueue,
      returnTrigger: nextReturnTrigger,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  };

  const handleSaveWitness = () => {
    const nextWitness: StoredWitness = {
      id: `${Date.now()}`,
      stateId,
      profileId,
      focusId,
      stateLabel: state.label,
      profileLabel: profile.label,
      focusLabel: focus.label,
      nextStep,
      lens: state.lens,
      focusProof: focus.proof,
      exitRule: state.nextStep,
      note: note.trim(),
      createdAt: new Date().toLocaleString("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const nextSavedWitnesses = [nextWitness, ...savedWitnesses].slice(0, 4);
    const nextPracticeQueue = [
      nextWitness,
      ...practiceQueue.filter(
        (item) =>
          !(
            item.stateId === nextWitness.stateId &&
            item.profileId === nextWitness.profileId &&
            item.focusId === nextWitness.focusId
          )
      ),
    ].slice(0, 4);
    const nextReturnTrigger = returnTrigger ?? nextWitness;

    setSavedWitnesses(nextSavedWitnesses);
    setPracticeQueue(nextPracticeQueue);
    setReturnTrigger(nextReturnTrigger);
    setNote("");

    persistStore(nextSavedWitnesses, nextPracticeQueue, nextReturnTrigger);
  };

  const handleResumeQueue = (item: StoredWitness) => {
    setStateId(item.stateId);
    setProfileId(item.profileId);
    setFocusId(item.focusId);
    setNote(item.note);
    setReturnTrigger(item);
    persistStore(savedWitnesses, practiceQueue, item);
  };

  const handleCompleteQueue = (queueId: string) => {
    const nextPracticeQueue = practiceQueue.filter((item) => item.id !== queueId);
    const nextReturnTrigger = returnTrigger?.id === queueId ? nextPracticeQueue[0] ?? null : returnTrigger;
    setPracticeQueue(nextPracticeQueue);
    setReturnTrigger(nextReturnTrigger);
    persistStore(savedWitnesses, nextPracticeQueue, nextReturnTrigger);
  };

  const handleResumeReturnTrigger = () => {
    if (!returnTrigger) {
      return;
    }

    setStateId(returnTrigger.stateId);
    setProfileId(returnTrigger.profileId);
    setFocusId(returnTrigger.focusId);
    setNote(returnTrigger.note);
  };

  const handleClearReturnTrigger = () => {
    setReturnTrigger(null);
    persistStore(savedWitnesses, practiceQueue, null);
  };

  return (
    <main className="page-shell">
      <header className="hero">
        <div className="hero-topline">
          <span className="mono">Dance OS Demo · Top 1 Incubation</span>
          <span className="pill">Phase 3 · define first, incubate second</span>
        </div>
        <h1>先把录一轮、回看、只修一个点做成真正独立的工具壳</h1>
        <p>
          这一版不是完整产品，而是 `Dance OS Demo` 的第一版独立孵化壳。目标是把状态、舞种、身体落点和下一轮动作句先收成可运行结构。
        </p>
      </header>

      <section className="overview-grid">
        <article className="panel">
          <div className="panel-label mono">Current Goal</div>
          <h2>当前这版要证明什么</h2>
          <ul className="bullet-list">
            <li>用户能不能说清这轮只修哪里。</li>
            <li>用户能不能留下下一轮动作句。</li>
            <li>Dance OS 是否值得先脱离 frontdoor 独立孵化。</li>
          </ul>
        </article>
        <article className="panel">
          <div className="panel-label mono">Boundary</div>
          <h2>当前不做什么</h2>
          <ul className="bullet-list">
            <li>不做低门槛内容入口页。</li>
            <li>不做 Why Latin / 直播排期这类 frontdoor 逻辑。</li>
            <li>不把 Daily Latin 的起步壳混进这里。</li>
          </ul>
        </article>
      </section>

      <section className="workbench">
        <article className="panel">
          <div className="panel-label mono">Input</div>
          <h2>选择当前这一轮</h2>

          <div className="control-group">
            <div className="control-label">当前状态</div>
            <div className="chip-row">
              {demoStates.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={item.id === stateId ? "chip active" : "chip"}
                  onClick={() => setStateId(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <div className="control-label">舞种</div>
            <div className="chip-row">
              {demoProfiles.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={item.id === profileId ? "chip active" : "chip"}
                  onClick={() => setProfileId(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <div className="control-label">身体落点</div>
            <div className="chip-row">
              {demoFocuses.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={item.id === focusId ? "chip active" : "chip"}
                  onClick={() => setFocusId(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </article>

        <article className="panel result-panel">
          <div className="panel-label mono">Output</div>
          <h2>这一轮的最小输出</h2>
          <div className="result-block">
            <span className="result-label">状态判断</span>
            <strong>{state.label}</strong>
            <p>{state.note}</p>
          </div>
          <div className="result-block">
            <span className="result-label">回看 lens</span>
            <strong>{profile.label} · {profile.count}</strong>
            <p>{state.lens}</p>
          </div>
          <div className="result-block">
            <span className="result-label">当前只修 1 个点</span>
            <strong>{focus.label}</strong>
            <p>{focus.cue}</p>
          </div>
          <div className="result-block">
            <span className="result-label">为什么先修这里</span>
            <strong>{focus.label} · 当前证据</strong>
            <p>{focus.proof}</p>
          </div>
          <div className="result-block emphasis">
            <span className="result-label">下一轮动作句</span>
            <strong>{nextStep}</strong>
            <p>{profile.target}</p>
          </div>
          <div className="result-block">
            <span className="result-label">如果这轮还没闭环</span>
            <strong>{state.label} · 退出条件</strong>
            <p>{state.nextStep}</p>
          </div>
          <div className="archive-compose">
            <label className="control-label" htmlFor="witness-note">
              {demoArchivePrompts.noteLabel}
            </label>
            <textarea
              id="witness-note"
              className="note-field"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder={demoArchivePrompts.notePlaceholder}
            />
            <button type="button" className="save-btn" onClick={handleSaveWitness}>
              {demoArchivePrompts.saveLabel}
            </button>
          </div>
        </article>
      </section>

      <section className="flow-stage-section">
        <article className="panel">
          <div className="panel-label mono">Lifecycle Snapshot</div>
          <h2>{demoFlowStagePrompts.title}</h2>
          <p className="queue-copy">{demoFlowStagePrompts.summary}</p>
          <div className="flow-stage-grid">
            {flowStages.map((stage) => (
              <WitnessFlowStageCard
                key={stage.id}
                label={stage.label}
                title={stage.title}
                summary={stage.summary}
                detail={stage.detail}
                href={stage.href}
                ctaLabel={stage.ctaLabel}
                tone={stage.tone}
              />
            ))}
          </div>
        </article>
      </section>

      <section className="lower-grid" id="archive-section">
        <article className="panel">
          <div className="panel-label mono">Verification</div>
          <h2>当前验证方式</h2>
          <ul className="check-list check-list-detailed">
            {demoChecklist.map((item) => (
              <li key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.detail}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="panel">
          <div className="panel-label mono">Witness Archive</div>
          <h2>{demoArchivePrompts.title}</h2>
          <div className="archive-summary">
            <div className="result-block">
              <span className="result-label">已保存 witness</span>
              <strong>{latestCount}</strong>
              <p>先证明这一轮能留下回看证据，再继续长 queue 和 return trigger。</p>
            </div>
            <div className="result-block">
              <span className="result-label">最近一条</span>
              <strong>{latestWitness ? `${latestWitness.profileLabel} · ${latestWitness.focusLabel}` : "还没有"}</strong>
              <p>{latestWitness ? latestWitness.nextStep : demoArchivePrompts.empty}</p>
            </div>
          </div>
          {savedWitnesses.length ? (
            <div className="archive-list">
              {savedWitnesses.map((item) => (
                <WitnessRecordCard
                  key={item.id}
                  witness={item}
                  title={`${item.stateLabel} · ${item.profileLabel}`}
                  metaLeft={`身体落点：${item.focusLabel}`}
                  metaRight={`下一轮入口：${item.stateLabel}`}
                  variant="archive"
                />
              ))}
            </div>
          ) : (
            <p className="archive-empty">{demoArchivePrompts.empty}</p>
          )}
        </article>
      </section>

      <section className="queue-section" id="queue-section">
        <article className="panel">
          <div className="panel-label mono">Practice Queue</div>
          <h2>{demoQueuePrompts.title}</h2>
          <p className="queue-copy">{demoQueuePrompts.summary}</p>
          <div className="archive-summary queue-summary">
            <div className="result-block">
              <span className="result-label">待继续队列</span>
              <strong>{queueCount}</strong>
              <p>先证明保存后的 witness 能真的带出下一轮，而不是停在 archive。</p>
            </div>
            <div className="result-block">
              <span className="result-label">当前队首</span>
              <strong>{practiceQueue[0] ? `${practiceQueue[0].profileLabel} · ${practiceQueue[0].focusLabel}` : "还没有"}</strong>
              <p>{practiceQueue[0] ? practiceQueue[0].nextStep : demoQueuePrompts.empty}</p>
            </div>
          </div>

          {practiceQueue.length ? (
            <div className="queue-list">
              {practiceQueue.map((item, index) => (
                <WitnessRecordCard
                  key={item.id}
                  eyebrow={`Queue ${index + 1}`}
                  witness={item}
                  title={`${item.stateLabel} · ${item.profileLabel}`}
                  metaLeft={`身体落点：${item.focusLabel}`}
                  metaRight={`下一轮入口：${item.stateLabel}`}
                  variant="queue"
                  actions={
                    <>
                      <button type="button" className="queue-btn queue-btn-primary" onClick={() => handleResumeQueue(item)}>
                        {demoQueuePrompts.resumeLabel}
                      </button>
                      <button type="button" className="queue-btn" onClick={() => handleCompleteQueue(item.id)}>
                        {demoQueuePrompts.completeLabel}
                      </button>
                    </>
                  }
                />
              ))}
            </div>
          ) : (
            <p className="archive-empty">{demoQueuePrompts.empty}</p>
          )}
        </article>
      </section>

      <section className="return-trigger-section" id="return-trigger-section">
        <article className="panel">
          <div className="panel-label mono">Return Trigger</div>
          <h2>{demoReturnPrompts.title}</h2>
          <p className="queue-copy">{demoReturnPrompts.summary}</p>

          {returnTrigger ? (
            <WitnessRecordCard
              eyebrow={demoReturnPrompts.armedLabel}
              witness={returnTrigger}
              title={`${returnTrigger.profileLabel} · ${returnTrigger.focusLabel}`}
              metaLeft={`下一轮入口：${returnTrigger.stateLabel}`}
              metaRight={`${demoReturnPrompts.windowLabel}：下次回来先做 15 秒`}
              variant="return"
              actions={
                <>
                  <button type="button" className="queue-btn queue-btn-primary" onClick={handleResumeReturnTrigger}>
                    {demoReturnPrompts.resumeLabel}
                  </button>
                  <button type="button" className="queue-btn" onClick={handleClearReturnTrigger}>
                    {demoReturnPrompts.clearLabel}
                  </button>
                </>
              }
            />
          ) : (
            <p className="archive-empty">{demoReturnPrompts.empty}</p>
          )}
        </article>
      </section>
    </main>
  );
}
