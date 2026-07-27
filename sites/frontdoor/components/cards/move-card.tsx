import type { MoveCardData } from "@/data/types";

export function MoveCard({
  item,
  className,
}: {
  item: MoveCardData;
  className?: string;
}) {
  return (
    <div
      className={className ? `move-card ${className}` : "move-card"}
      style={item.locked ? { opacity: 0.4 } : undefined}
    >
      <div className="tag">{item.locked ? "未解锁" : item.category}</div>
      <div>
        <h4>{item.title}</h4>
        <div className="en">{item.subtitle}</div>
      </div>
      <div className="meta">
        <span>{item.leftMeta}</span>
        <span>{item.rightMeta}</span>
      </div>
    </div>
  );
}
