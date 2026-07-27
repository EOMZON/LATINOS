import type { SourceRowData } from "@/data/types";

export function SourcePanel({
  title,
  rows,
  className = "",
  hideMini = false,
}: {
  title: string;
  rows: SourceRowData[];
  className?: string;
  hideMini?: boolean;
}) {
  return (
    <div className={className}>
      <h3 className="source-panel-title">{title}</h3>
      <div className="source-list">
        {rows.map((row) => (
          <div key={`${title}-${row.title}`} className="source-row">
            <div>
              <strong>{row.title}</strong>
              {!hideMini ? <div className="mini">{row.mini}</div> : null}
            </div>
            <span>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
