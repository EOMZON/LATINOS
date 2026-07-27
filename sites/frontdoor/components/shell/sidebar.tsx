"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navGroups, siteMeta } from "@/data/site";

function normalizePath(path: string) {
  if (path === "/") {
    return path;
  }
  return path.replace(/\/+$/, "");
}

export function Sidebar() {
  const pathname = usePathname();
  const currentPath = normalizePath(pathname || "/");

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="mark">{siteMeta.mark}</div>
        <div className="name">{siteMeta.name}</div>
        <div className="sub">{siteMeta.sub}</div>
      </div>
      <nav className="nav">
        {navGroups.map((group) => (
          <div key={group.label}>
            <div className="nav-label">{group.label}</div>
            {group.items.map((item) => {
              const active = currentPath === normalizePath(item.href);
              return (
                <Link key={item.href} href={item.href} className={`nav-link${active ? " active" : ""}`}>
                  <span className="dot" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="sidebar-foot">
        <div className="live-badge">
          <span className="p" />
          {siteMeta.liveBadge}
        </div>
        {siteMeta.footer}
      </div>
    </aside>
  );
}
