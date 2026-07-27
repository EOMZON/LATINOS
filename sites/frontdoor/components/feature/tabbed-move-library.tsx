"use client";

import { useEffect, useState } from "react";
import { MoveCard } from "@/components/cards/move-card";
import type { MoveCardData, MoveGroupData } from "@/data/types";

function matchesGroup(item: MoveCardData, group: MoveGroupData) {
  if (!group.categories?.length) {
    return true;
  }

  return group.categories.includes(item.category);
}

export function TabbedMoveLibrary({
  titlePrefix,
  groups,
  items,
  compact = false,
  defaultGroupId,
  hidePanelInCompact = false,
}: {
  titlePrefix: string;
  groups: MoveGroupData[];
  items: MoveCardData[];
  compact?: boolean;
  defaultGroupId?: string;
  hidePanelInCompact?: boolean;
}) {
  const initialId = groups.find((group) => group.id === defaultGroupId)?.id ?? groups[0]?.id ?? "";
  const [activeId, setActiveId] = useState(initialId);
  useEffect(() => {
    const nextId = groups.find((group) => group.id === defaultGroupId)?.id;
    if (nextId && nextId !== activeId) {
      setActiveId(nextId);
    }
  }, [activeId, defaultGroupId, groups]);
  const activeGroup = groups.find((group) => group.id === activeId) ?? groups[0];
  const visibleItems = items.filter((item) => matchesGroup(item, activeGroup));
  const note = compact && activeGroup.shortDescription ? activeGroup.shortDescription : activeGroup.description;
  const showPanel = !(compact && hidePanelInCompact);

  return (
    <>
      <div className={`tabs${compact ? " compact-tabs" : ""}`} role="tablist" aria-label={`${titlePrefix} tabs`}>
        {groups.map((group) => {
          const active = group.id === activeGroup.id;
          return (
            <button
              key={group.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={`tab${active ? " active" : ""}`}
              onClick={() => setActiveId(group.id)}
            >
              {group.label}
            </button>
          );
        })}
      </div>

      {showPanel ? (
        <div className={`panel library-panel${compact ? " compact-library-panel" : ""}`}>
          <div className="library-head">
            <div>
              <div className="library-label mono">{titlePrefix}</div>
              <h3>{activeGroup.label}</h3>
            </div>
            <div className="library-count mono">{visibleItems.length.toString().padStart(2, "0")} ITEMS</div>
          </div>
          <p className="library-note">{note}</p>
        </div>
      ) : null}

      <div className={`move-grid${compact ? " compact-move-grid" : ""}`}>
        {visibleItems.map((item) => (
          <MoveCard key={`${activeGroup.id}-${item.title}`} item={item} className={compact ? "compact-move-card" : undefined} />
        ))}
      </div>
    </>
  );
}
