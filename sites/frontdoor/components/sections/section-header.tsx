export function SectionHeader({
  title,
  more,
  className,
}: {
  title: string;
  more?: string;
  className?: string;
}) {
  return (
    <div className={className ? `sec-head ${className}` : "sec-head"}>
      <h2>{title}</h2>
      {more ? <span className="more">{more}</span> : null}
    </div>
  );
}
