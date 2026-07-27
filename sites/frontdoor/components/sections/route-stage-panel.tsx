import type { StagePanelMetricData, StagePanelSignalData } from "@/data/types";

export function RouteStagePanel({
  label,
  title,
  metrics,
  signals,
  className,
}: {
  label: string;
  title: string;
  metrics: StagePanelMetricData[];
  signals: StagePanelSignalData[];
  className?: string;
}) {
  return (
    <div className={className ? `route-stage-panel ${className}` : "route-stage-panel"}>
      <div className="route-stage-top">
        <div className="route-stage-label mono">{label}</div>
        <h4>{title}</h4>
      </div>

      <div className="route-stage-metrics">
        {metrics.map((metric) => (
          <div key={metric.label} className="route-stage-metric">
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </div>
        ))}
      </div>

      <div className="route-stage-signals">
        {signals.map((signal) => (
          <div key={signal.title} className="route-stage-signal">
            <strong>{signal.title}</strong>
            <p>{signal.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
