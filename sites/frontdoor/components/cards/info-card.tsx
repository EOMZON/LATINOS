import type { InfoCardData } from "@/data/types";

export function InfoCard({
  card,
  className = "",
}: {
  card: InfoCardData;
  className?: string;
}) {
  return (
    <div className={`log-card${className ? ` ${className}` : ""}`}>
      <div className="day mono">{card.day}</div>
      <h3>{card.title}</h3>
      {card.rows.map((row) => (
        <div key={row.label} className="log-row">
          <span>{row.label}</span>
          <b>{row.value}</b>
        </div>
      ))}
      <div className="log-note">{card.note}</div>
    </div>
  );
}
