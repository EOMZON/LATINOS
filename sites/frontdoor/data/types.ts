export type KeyValue = { label: string; value: string };

export type InfoCardData = {
  day: string;
  title: string;
  rows: KeyValue[];
  note: string;
  href?: string;
};

export type HomeHeroData = {
  eyebrow: string;
  title: string;
  pill: string;
  phase: string;
  phaseNote: string;
  tag: string;
  description: string;
  stats: KeyValue[];
  progressValue: string;
  progressLabel: string;
  sessionLabel: string;
  sessionValue: string;
  ctaHref: string;
  ctaLabel: string;
};

export type HomeQueueFallbackData = {
  slot: "latest" | "daily" | "dance";
  source: "daily" | "dance";
  title: string;
  context: string;
  nextStep: string;
  href: string;
};

export type HomeHeatmapData = {
  title: string;
  more: string;
  rangeLabel: string;
  note: string;
};

export type HomeFooterData = {
  left: string;
  right: string;
};

export type MoveCardData = {
  category: string;
  title: string;
  subtitle: string;
  leftMeta: string;
  rightMeta: string;
  locked?: boolean;
};

export type MoveGroupData = {
  id: string;
  label: string;
  description: string;
  shortDescription?: string;
  categories?: string[];
};

export type AssetCardData = {
  platform: "demo" | "feishu" | "live" | "repo";
  title: string;
  note: string;
  state?: string;
  meta?: string;
};

export type AssetGroupData = {
  id: string;
  label: string;
  description: string;
  more?: string;
  items: AssetCardData[];
};

export type PhaseData = {
  label: string;
  title: string;
  description: string;
  done?: boolean;
};

export type MetricData = {
  label: string;
  value: string;
  detail: string;
};

export type StagePanelMetricData = {
  label: string;
  value: string;
};

export type StagePanelSignalData = {
  title: string;
  detail: string;
};

export type CourseCardData = {
  status: "soon" | "locked";
  title: string;
  compactTitle?: string;
  description: string;
  compactDescription?: string;
};

export type SourceRowData = {
  title: string;
  mini: string;
  value: string;
};

export type DecisionSignalData = {
  kind: "proof" | "risk" | "gate";
  title: string;
  summary: string;
  compactSummary?: string;
  rows: KeyValue[];
  compactRows?: KeyValue[];
  note: string;
  compactNote?: string;
};

export type RouteSignalData = {
  route: string;
  title: string;
  proof: string;
  compactProof?: string;
  risk: string;
  compactRisk?: string;
  gate: string;
  compactGate?: string;
  note: string;
  compactNote?: string;
};

export type DemoChecklistItemData = {
  label: string;
  detail: string;
};

export type DanceDemoProfileData = {
  id: string;
  label: string;
  count: string;
  target: string;
  corrections: Record<string, string>;
};

export type DanceDemoStateData = {
  id: string;
  label: string;
  note: string;
  lens: string;
  nextStep: string;
};

export type DanceDemoFocusData = {
  id: string;
  label: string;
  cue: string;
  proof: string;
};

export type DailyDemoStateData = {
  id: string;
  label: string;
  compactLabel?: string;
  note: string;
  compactNote?: string;
  entry: string;
  compactEntry?: string;
  goal: string;
  compactGoal?: string;
  nextStep: string;
  compactNextStep?: string;
};

export type DailyDemoDanceData = {
  id: string;
  label: string;
  cue: string;
  focus: string;
  compactFocus?: string;
  witness: string;
  compactWitness?: string;
};

export type DailyDemoTaskData = {
  id: string;
  label: string;
  compactLabel?: string;
  hint: string;
  compactHint?: string;
};

export type DailyReturnModeSeedData = {
  id: "live" | "clip" | "bridge";
  label: string;
  compactLabel?: string;
  title: string;
  compactTitle?: string;
  description: string;
  compactDescription?: string;
  cta: string;
  variant: "ghost" | "brick";
  testId: string;
};
