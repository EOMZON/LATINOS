import type { AssetCardData } from "@/data/types";

export function AssetCard({ item, className }: { item: AssetCardData; className?: string }) {
  return (
    <div className={className ? `asset ${className}` : "asset"}>
      <div className="asset-topline">
        <span className={`platform ${item.platform}`}>{item.platform.toUpperCase()}</span>
        {item.state ? <span className="asset-state mono">{item.state}</span> : null}
      </div>
      <div className="asset-copy">
        <span className="cap">{item.title}</span>
        <span className="cap-note">{item.note}</span>
        {item.meta ? <span className="asset-meta mono">{item.meta}</span> : null}
      </div>
    </div>
  );
}
