"use client";

import { useEffect, useState } from "react";
import { AssetCard } from "@/components/cards/asset-card";
import type { AssetGroupData } from "@/data/types";

function resolveInitialGroup(groups: AssetGroupData[]) {
  if (typeof window === "undefined") {
    return groups[0]?.id ?? "";
  }

  const hash = window.location.hash.replace("#", "");
  return groups.find((group) => group.id === hash)?.id ?? groups[0]?.id ?? "";
}

export function HashedAssetGallery({
  groups,
  compact = false,
}: {
  groups: AssetGroupData[];
  compact?: boolean;
}) {
  const [activeId, setActiveId] = useState(() => resolveInitialGroup(groups));

  useEffect(() => {
    const syncFromHash = () => {
      const nextId = resolveInitialGroup(groups);
      setActiveId(nextId);
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);

    return () => {
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [groups]);

  const activeGroup = groups.find((group) => group.id === activeId) ?? groups[0];

  return (
    <>
      {groups.map((group) => (
        <div key={group.id} id={group.id} className="hash-anchor" aria-hidden="true" />
      ))}

      <div className={`tabs${compact ? " compact-tabs" : ""}`} role="tablist" aria-label="Dance OS asset groups">
        {groups.map((group) => {
          const active = group.id === activeGroup.id;

          return (
            <a
              key={group.id}
              href={`#${group.id}`}
              role="tab"
              aria-selected={active}
              className={`tab-link${active ? " active" : ""}`}
              onClick={() => setActiveId(group.id)}
            >
              {group.label}
            </a>
          );
        })}
      </div>

      <div className={`panel library-panel${compact ? " compact-library-panel" : ""}`}>
        <div className="library-head">
          <div>
            <div className="library-label mono">DANCE OS ASSET LIBRARY</div>
            <h3>{activeGroup.label}</h3>
          </div>
          <div className="library-count mono">{activeGroup.items.length.toString().padStart(2, "0")} ITEMS</div>
        </div>
        <p className="library-note">{compact && activeGroup.more ? activeGroup.more : activeGroup.description}</p>
      </div>

      <div className={`asset-grid${compact ? " compact-asset-grid" : ""}`}>
        {activeGroup.items.map((item) => (
          <AssetCard key={`${activeGroup.id}-${item.title}`} item={item} className={compact ? "compact-asset-card" : undefined} />
        ))}
      </div>
    </>
  );
}
