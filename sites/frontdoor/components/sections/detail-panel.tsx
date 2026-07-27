import { Fragment, type ReactNode } from "react";
import type { KeyValue } from "@/data/types";

export function DetailPanel({
  stage,
  title,
  subtitle,
  rows,
  chips,
  actions,
  className,
}: {
  stage: ReactNode;
  title: string;
  subtitle: string;
  rows: KeyValue[];
  chips?: string[];
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className ? `detail ${className}` : "detail"}>
      <div className="stage">{stage}</div>
      <div>
        <h3>{title}</h3>
        <div className="en">{subtitle}</div>
          <div className="kv">
            {rows.map((row) => (
              <Fragment key={row.label}>
                <b>{row.label}</b>
                <span>{row.value}</span>
              </Fragment>
          ))}
        </div>
        {chips?.length ? (
          <div className="chips">
            {chips.map((chip) => (
              <span key={chip} className="chip">
                {chip}
              </span>
            ))}
          </div>
        ) : null}
        {actions ? <div className="link-row">{actions}</div> : null}
      </div>
    </div>
  );
}
