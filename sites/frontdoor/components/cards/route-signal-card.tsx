import type { RouteSignalData } from "@/data/types";

export function RouteSignalCard({
  item,
  compact = false,
  hideNote = false,
}: {
  item: RouteSignalData;
  compact?: boolean;
  hideNote?: boolean;
}) {
  const proof = compact ? item.compactProof ?? item.proof : item.proof;
  const risk = compact ? item.compactRisk ?? item.risk : item.risk;
  const gate = compact ? item.compactGate ?? item.gate : item.gate;
  const note = compact ? item.compactNote ?? item.note : item.note;

  return (
    <div className="route-card">
      <div className="route-head">
        <span className="route-path mono">{item.route}</span>
        <h3>{item.title}</h3>
      </div>
      <div className="route-rows">
        <div className="route-row">
          <span>proof</span>
          <b>{proof}</b>
        </div>
        <div className="route-row">
          <span>risk</span>
          <b>{risk}</b>
        </div>
        <div className="route-row">
          <span>gate</span>
          <b>{gate}</b>
        </div>
      </div>
      {hideNote ? null : <div className="route-note">{note}</div>}
    </div>
  );
}
