import type { MetricData } from "@/data/types";

export function MetricCard({
  metric,
  compact = false,
}: {
  metric: MetricData;
  compact?: boolean;
}) {
  return (
    <div className="dash-card">
      <div className="l">{metric.label}</div>
      <div className="v">{metric.value}</div>
      {compact ? null : <div className="d">{metric.detail}</div>}
    </div>
  );
}
