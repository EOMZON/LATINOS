"use client";

import { useEffect, useState } from "react";
import {
  readArchiveWitnesses,
  readDanceWitnesses,
  readDailyWitnesses,
  sortWitnessesByNewest,
  WITNESS_ARCHIVE_EVENT,
  type ArchiveWitnessItem,
  type DailyStoredWitness,
  type DanceStoredWitness,
} from "@/lib/witness-archive";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(WITNESS_ARCHIVE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(WITNESS_ARCHIVE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function useDailyWitnesses(): DailyStoredWitness[] {
  const [items, setItems] = useState<DailyStoredWitness[]>([]);

  useEffect(() => {
    const sync = () => setItems(sortWitnessesByNewest(readDailyWitnesses()));

    sync();
    return subscribe(sync);
  }, []);

  return items;
}

export function useDanceWitnesses(): DanceStoredWitness[] {
  const [items, setItems] = useState<DanceStoredWitness[]>([]);

  useEffect(() => {
    const sync = () => setItems(sortWitnessesByNewest(readDanceWitnesses()));

    sync();
    return subscribe(sync);
  }, []);

  return items;
}

export function useArchiveWitnesses(limit?: number): ArchiveWitnessItem[] {
  const [items, setItems] = useState<ArchiveWitnessItem[]>([]);

  useEffect(() => {
    const sync = () => {
      const nextItems = readArchiveWitnesses();
      setItems(typeof limit === "number" ? nextItems.slice(0, limit) : nextItems);
    };

    sync();
    return subscribe(sync);
  }, [limit]);

  return items;
}
