import {
  sharedDanceDemoChecklist,
  sharedDanceDemoFocuses,
  sharedDanceDemoProfiles,
  sharedDanceDemoStates,
  type SharedDanceDemoChecklistItem,
  type SharedDanceDemoFocus,
  type SharedDanceDemoProfile,
  type SharedDanceDemoState,
} from "@latinos-data/dance-os-demo-shared";

export type DemoState = SharedDanceDemoState;
export type DemoProfile = SharedDanceDemoProfile;
export type DemoFocus = SharedDanceDemoFocus;
export type DemoChecklistItem = SharedDanceDemoChecklistItem;

export const demoStates: DemoState[] = sharedDanceDemoStates;

export const demoProfiles: DemoProfile[] = sharedDanceDemoProfiles;

export const demoFocuses: DemoFocus[] = sharedDanceDemoFocuses;

export const demoChecklist: DemoChecklistItem[] = sharedDanceDemoChecklist;

export const demoFlowStagePrompts = {
  title: "archive -> queue -> return 现在走到哪",
  summary: "不要每次都从头读整页。先看这一轮当前停在哪一步，再决定是保存、继续，还是武装回来入口。",
  archive: {
    label: "Stage 1 · Archive",
    ctaLabel: "看 Archive",
    emptySummary: "还没有 witness",
    emptyDetail: "先保存第一条 witness，让这条链真正开始留下回看证据。",
  },
  queue: {
    label: "Stage 2 · Queue",
    ctaLabel: "看 Queue",
    emptySummary: "还没有待继续队列",
    emptyDetail: "保存后的 witness 还没进入真实下一轮。先让它变成队列，再判断先做哪条。",
  },
  return: {
    label: "Stage 3 · Return",
    ctaLabel: "看 Return Trigger",
    emptySummary: "还没武装回来入口",
    emptyDetail: "队列已经能长出来，但还没选出那条“下次回来就先做”的真正入口。",
  },
};

export const demoArchivePrompts = {
  title: "Witness Archive",
  empty: "先保存第一条 witness。这里应该开始出现“这轮怎么练、下轮先改哪里”的真实证据。",
  saveLabel: "保存这一轮 witness",
  noteLabel: "补一句这轮备注",
  notePlaceholder: "例如：下次先守住 2-3 的重心，不急着把髋做大。",
};

export const demoQueuePrompts = {
  title: "Practice Queue",
  empty: "还没有进入队列的下一轮。先保存一条 witness，让它变成真的下一轮动作。",
  summary: "保存后的 witness 不只留在 archive，还要变成下一轮真的要继续做的队列。",
  resumeLabel: "继续这条",
  completeLabel: "标记完成",
};

export const demoReturnPrompts = {
  title: "Return Trigger",
  empty: "队列里已经有候选动作，但还没选出真正让你下次回来先做的那一条。先从 queue 里点一次“继续这条”。",
  summary: "queue 是候选列表，return trigger 只保留一条真正让你下次回来就能直接开练的入口。",
  armedLabel: "当前回来入口",
  windowLabel: "建议回来窗口",
  resumeLabel: "带回输入区",
  clearLabel: "清除回来入口",
};
