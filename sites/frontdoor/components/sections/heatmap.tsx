export function Heatmap({
  values,
  className,
  rangeLabel = "Week 1 → Week 12",
  note = "灰格 = 未开始 · 紫格 = 当前周完成关键结构动作",
}: {
  values: number[];
  className?: string;
  rangeLabel?: string;
  note?: string;
}) {
  const colors = ["#222226", "#3A3A3F", "#6B5F78", "#9D6FE0"];

  return (
    <div className={className ? `heatmap-card ${className}` : "heatmap-card"}>
      <div className="heatmap-top">
        <div className="mono" style={{ fontSize: "12px", color: "var(--muted)" }}>
          {rangeLabel}
        </div>
        <div className="legend">
          少
          {colors.map((color) => (
            <span key={color} className="sq" style={{ background: color }} />
          ))}
          多
        </div>
      </div>
      <div className="heat-grid">
        {values.map((value, index) => (
          <div key={index} className="cell" style={{ background: colors[value] }} title={`Week slot ${index + 1}`} />
        ))}
      </div>
      <div className="heat-note">{note}</div>
    </div>
  );
}
