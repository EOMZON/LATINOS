import type { ReactNode } from "react";

export function WorkbenchCluster({
  children,
  columns = "two",
  className,
}: {
  children: ReactNode;
  columns?: "two" | "wide-left" | "wide-right";
  className?: string;
}) {
  return <div className={`workbench-cluster workbench-cluster-${columns}${className ? ` ${className}` : ""}`}>{children}</div>;
}
