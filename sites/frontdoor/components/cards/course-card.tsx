import type { CourseCardData } from "@/data/types";

export function CourseCard({ item, compact = false }: { item: CourseCardData; compact?: boolean }) {
  const title = compact ? item.compactTitle ?? item.title : item.title;
  const description = compact ? item.compactDescription ?? item.description : item.description;
  const statusLabel = compact
    ? item.status === "soon"
      ? "优先推进"
      : "后评估"
    : item.status === "soon"
      ? "当前优先"
      : "条件达成后";

  return (
    <div className="course-card">
      <span className={`status ${item.status}`}>{statusLabel}</span>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
}
