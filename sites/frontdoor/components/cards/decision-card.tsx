import type { DecisionSignalData } from "@/data/types";

export function DecisionCard({ item, compact = false }: { item: DecisionSignalData; compact?: boolean }) {
  const summary = compact ? item.compactSummary ?? item.summary : item.summary;
  const rows = compact ? item.compactRows ?? item.rows : item.rows;
  const note = compact ? item.compactNote ?? item.note : item.note;

  return (
    <div className={`decision-card ${item.kind}`}>
      <div className="decision-topline">
        <span className="decision-kind mono">{item.kind.toUpperCase()}</span>
      </div>
      <h3>{item.title}</h3>
      <p className="decision-summary">{summary}</p>
      <div className="decision-rows">
        {rows.map((row) => (
          <div key={`${item.title}-${row.label}`} className="decision-row">
            <span>{row.label}</span>
            <b>{row.value}</b>
          </div>
        ))}
      </div>
      <div className="decision-note">{note}</div>
    </div>
  );
}
