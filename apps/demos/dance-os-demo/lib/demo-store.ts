import { demoFocuses, demoProfiles, demoStates } from "@/data/demo";

export type StoredWitness = {
  id: string;
  stateId: string;
  profileId: string;
  focusId: string;
  stateLabel: string;
  profileLabel: string;
  focusLabel: string;
  nextStep: string;
  lens: string;
  focusProof: string;
  exitRule: string;
  note: string;
  createdAt: string;
};

export const STORAGE_KEY = "latinos:dance-os-demo:witness-archive";

export type DemoStore = {
  savedWitnesses: StoredWitness[];
  practiceQueue: StoredWitness[];
  returnTrigger: StoredWitness | null;
};

export function normalizeWitnesses(raw: unknown): StoredWitness[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.filter((item): item is StoredWitness => Boolean(item) && typeof item === "object").map((item) => {
    const matchState = demoStates.find((state) => state.label === item.stateLabel || state.id === item.stateId);
    const matchProfile = demoProfiles.find((profile) => profile.label === item.profileLabel || profile.id === item.profileId);
    const matchFocus = demoFocuses.find((focus) => focus.label === item.focusLabel || focus.id === item.focusId);

    return {
      ...item,
      stateId: item.stateId || matchState?.id || demoStates[0]?.id || "restart",
      profileId: item.profileId || matchProfile?.id || demoProfiles[0]?.id || "rumba",
      focusId: item.focusId || matchFocus?.id || demoFocuses[0]?.id || "weight",
      focusProof: item.focusProof || matchFocus?.proof || "先确认这一条能不能从回看里被直接看见。",
      exitRule: item.exitRule || matchState?.nextStep || "如果还说不出下一轮先改哪里，这轮就还没闭环。",
    };
  });
}

export function loadStore(): DemoStore {
  if (typeof window === "undefined") {
    return { savedWitnesses: [], practiceQueue: [], returnTrigger: null };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { savedWitnesses: [], practiceQueue: [], returnTrigger: null };
    }

    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      const normalizedQueue = normalizeWitnesses(parsed.slice(0, 3));
      return {
        savedWitnesses: normalizeWitnesses(parsed),
        practiceQueue: normalizedQueue,
        returnTrigger: normalizedQueue[0] ?? null,
      };
    }

    if (!parsed || typeof parsed !== "object") {
      return { savedWitnesses: [], practiceQueue: [], returnTrigger: null };
    }

    const parsedStore = parsed as DemoStore & { returnTrigger?: unknown };
    const normalizedQueue = normalizeWitnesses(parsedStore.practiceQueue);
    const normalizedReturnTrigger = normalizeWitnesses(parsedStore.returnTrigger ? [parsedStore.returnTrigger] : [])[0] ?? null;

    return {
      savedWitnesses: normalizeWitnesses(parsedStore.savedWitnesses),
      practiceQueue: normalizedQueue,
      returnTrigger: normalizedReturnTrigger ?? normalizedQueue[0] ?? null,
    };
  } catch {
    return { savedWitnesses: [], practiceQueue: [], returnTrigger: null };
  }
}
