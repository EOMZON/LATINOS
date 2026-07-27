export function PageHeader({
  eyebrow,
  title,
  pill,
  className,
}: {
  eyebrow: string;
  title: string;
  pill: string;
  className?: string;
}) {
  return (
    <div className={className ? `topline ${className}` : "topline"}>
      <div className="topline-copy">
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="topline-title">{title}</h1>
      </div>
      <div className="today-pill">{pill}</div>
    </div>
  );
}
