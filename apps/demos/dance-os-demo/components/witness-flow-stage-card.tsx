export function WitnessFlowStageCard({
  label,
  title,
  summary,
  detail,
  href,
  ctaLabel,
  tone = "archive",
}: {
  label: string;
  title: string;
  summary: string;
  detail: string;
  href: string;
  ctaLabel: string;
  tone?: "archive" | "queue" | "return";
}) {
  return (
    <article className={`witness-flow-stage-card witness-flow-stage-card-${tone}`}>
      <div className="witness-flow-stage-topline">
        <span className="panel-label mono">{label}</span>
      </div>
      <h3>{title}</h3>
      <strong>{summary}</strong>
      <p>{detail}</p>
      <a className="witness-flow-stage-link" href={href}>
        {ctaLabel}
      </a>
    </article>
  );
}
