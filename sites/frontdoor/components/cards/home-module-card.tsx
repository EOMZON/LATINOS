import Link from "next/link";
import type { InfoCardData } from "@/data/types";

export function HomeModuleCard({
  card,
  variant = "support",
}: {
  card: InfoCardData;
  variant?: "featured" | "support";
}) {
  const href = card.href ?? "/";
  const summary = card.rows[0]?.value ?? "";
  const detail = card.rows[1];
  const note = card.note;

  return (
    <Link href={href} className={`home-module-card ${variant}`}>
      <div className="home-module-topline">
        <div className="day mono">{card.day}</div>
        <span className="home-module-arrow">↗</span>
      </div>
      <h3>{card.title}</h3>
      <div className="home-module-summary">{summary}</div>
      {detail ? (
        <div className="home-module-detail">
          <span>{detail.label}</span>
          <b>{detail.value}</b>
        </div>
      ) : null}
      <div className="home-module-note">{note}</div>
    </Link>
  );
}
