import type { SourceRowData } from "@/data/types";
import { SourcePanel } from "@/components/sections/source-panel";

export function SourceMatrix({
  leftTitle,
  leftRows,
  rightTitle,
  rightRows,
  className = "",
  hideMini = false,
}: {
  leftTitle: string;
  leftRows: SourceRowData[];
  rightTitle: string;
  rightRows: SourceRowData[];
  className?: string;
  hideMini?: boolean;
}) {
  return (
    <div className={`detail source-matrix${className ? ` ${className}` : ""}`}>
      <SourcePanel
        title={leftTitle}
        rows={leftRows}
        className={className ? `${className}-panel` : ""}
        hideMini={hideMini}
      />
      <SourcePanel
        title={rightTitle}
        rows={rightRows}
        className={className ? `${className}-panel` : ""}
        hideMini={hideMini}
      />
    </div>
  );
}
