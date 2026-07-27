export const DAILY_LOOP_STORAGE_KEY = "latinos.daily-loop-demo.v1";
export const DANCE_OS_STORAGE_KEY = "latinos.dance-os.correction-ledger.v1";
export const WITNESS_ARCHIVE_EVENT = "latinos:witness-archive-updated";

export type DailyStoredWitness = {
  id: string;
  stateId?: string;
  danceId?: string;
  state: string;
  dance: string;
  progress: number;
  nextStep: string;
  note: string;
  createdAt: string;
};

export type DanceStoredWitness = {
  id: string;
  profileId?: string;
  stateId?: string;
  focusId?: string;
  profile: string;
  state: string;
  focus: string;
  correction: string;
  nextStep: string;
  note: string;
  createdAt: string;
};

export type ArchiveWitnessItem = {
  id: string;
  source: "daily" | "dance";
  title: string;
  context: string;
  nextStep: string;
  note: string;
  createdAt: string;
  meta: string;
  href: string;
};

const dailyStateLabelToId: Record<string, string> = {
  "完全没开始过": "first-time",
  "断练后重启": "restart",
  "已经有具体卡点": "stuck",
  "刚看完直播 / 切片": "after-live",
};

const dailyDanceLabelToId: Record<string, string> = {
  "伦巴": "rumba",
  "恰恰": "cha",
  "桑巴": "samba",
};

const danceProfileLabelToId: Record<string, string> = {
  "伦巴": "rumba",
  "恰恰": "cha",
  "桑巴": "samba",
};

const danceStateLabelToId: Record<string, string> = {
  "断练后重启": "restart",
  "拍子总乱": "beat",
  "已经知道卡点": "body",
  "准备录切片": "record",
};

const danceFocusLabelToId: Record<string, string> = {
  "重心": "weight",
  "髋": "hip",
  "脚下": "feet",
  "上身": "frame",
};

const dailyStateIdToDanceStateId: Record<string, string> = {
  "first-time": "restart",
  "restart": "restart",
  "stuck": "body",
  "after-live": "record",
};

const dailyDanceIdToDanceFocusId: Record<string, string> = {
  "rumba": "weight",
  "cha": "feet",
  "samba": "hip",
};

function safeParse(raw: string | null) {
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function witnessOrderFromId(id: string) {
  const maybeTimestamp = Number(id.split("-").pop());
  return Number.isFinite(maybeTimestamp) ? maybeTimestamp : 0;
}

export function sortWitnessesByNewest<T extends { id: string }>(items: T[]) {
  return [...items].sort((left, right) => witnessOrderFromId(right.id) - witnessOrderFromId(left.id));
}

export function buildDailyWitnessHref(item: Pick<DailyStoredWitness, "state" | "stateId" | "dance" | "danceId">) {
  return `/daily-latin?state=${encodeURIComponent(item.stateId ?? dailyStateLabelToId[item.state] ?? "restart")}&dance=${encodeURIComponent(item.danceId ?? dailyDanceLabelToId[item.dance] ?? "rumba")}#today-loop-demo`;
}

export function buildDanceWitnessHref(
  item: Pick<DanceStoredWitness, "state" | "stateId" | "profile" | "profileId" | "focus" | "focusId">
) {
  return `/dance-os?state=${encodeURIComponent(item.stateId ?? danceStateLabelToId[item.state] ?? "beat")}&profile=${encodeURIComponent(item.profileId ?? danceProfileLabelToId[item.profile] ?? "rumba")}&focus=${encodeURIComponent(item.focusId ?? danceFocusLabelToId[item.focus] ?? "weight")}#correction-ledger-demo`;
}

export function buildDanceBridgeHrefFromDailyWitness(
  item: Pick<DailyStoredWitness, "stateId" | "danceId" | "dance" | "state">
) {
  const profileId = item.danceId ?? dailyDanceLabelToId[item.dance] ?? "rumba";
  const dailyStateId = item.stateId ?? dailyStateLabelToId[item.state] ?? "restart";
  const stateId = dailyStateIdToDanceStateId[dailyStateId] ?? "restart";
  const focusId = dailyDanceIdToDanceFocusId[profileId] ?? "weight";

  return `/dance-os?state=${encodeURIComponent(stateId)}&profile=${encodeURIComponent(profileId)}&focus=${encodeURIComponent(focusId)}#correction-ledger-demo`;
}

export function announceWitnessArchiveUpdate() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent(WITNESS_ARCHIVE_EVENT));
}

export function readDailyWitnesses(): DailyStoredWitness[] {
  if (typeof window === "undefined") {
    return [];
  }

  const parsed = safeParse(window.localStorage.getItem(DAILY_LOOP_STORAGE_KEY));
  if (!parsed || typeof parsed !== "object" || !Array.isArray((parsed as { savedWitnesses?: unknown }).savedWitnesses)) {
    return [];
  }

  return (parsed as { savedWitnesses: DailyStoredWitness[] }).savedWitnesses.filter(
    (item) => Boolean(item) && typeof item === "object" && typeof item.id === "string"
  );
}

export function readDanceWitnesses(): DanceStoredWitness[] {
  if (typeof window === "undefined") {
    return [];
  }

  const parsed = safeParse(window.localStorage.getItem(DANCE_OS_STORAGE_KEY));
  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed.filter((item) => Boolean(item) && typeof item === "object" && typeof item.id === "string") as DanceStoredWitness[];
}

export function readArchiveWitnesses(): ArchiveWitnessItem[] {
  const dailyItems = readDailyWitnesses().map((item) => ({
    id: `daily-${item.id}`,
    source: "daily" as const,
    title: `${item.state} · ${item.dance}`,
    context: `Daily Loop · ${item.progress}% completed`,
    nextStep: item.nextStep,
    note: item.note,
    createdAt: item.createdAt,
    meta: "daily witness",
    href: buildDailyWitnessHref(item),
  }));

  const danceItems = readDanceWitnesses().map((item) => ({
    id: `dance-${item.id}`,
    source: "dance" as const,
    title: `${item.profile} · ${item.state}`,
    context: `Dance OS · ${item.focus} / ${item.correction}`,
    nextStep: item.nextStep,
    note: item.note,
    createdAt: item.createdAt,
    meta: "correction witness",
    href: buildDanceWitnessHref(item),
  }));

  return sortWitnessesByNewest([...dailyItems, ...danceItems]);
}
