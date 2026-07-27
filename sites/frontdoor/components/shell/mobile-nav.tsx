"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navGroups, siteMeta } from "@/data/site";

function normalizePath(path: string) {
  if (path === "/") {
    return path;
  }
  return path.replace(/\/+$/, "");
}

export function MobileNav() {
  const pathname = usePathname();
  const currentPath = normalizePath(pathname || "/");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const activeLabel = useMemo(() => {
    for (const group of navGroups) {
      const matched = group.items.find((item) => normalizePath(item.href) === currentPath);
      if (matched) {
        return matched.label;
      }
    }
    return "今日总览";
  }, [currentPath]);

  return (
    <div className={`mobile-nav-shell${open ? " open" : ""}`}>
      <div className="mobile-nav-topbar">
        <div className="mobile-brand brand">
          <div className="mark">{siteMeta.mark}</div>
          <div>
            <div className="name">{siteMeta.name}</div>
            <div className="sub">{siteMeta.sub}</div>
          </div>
        </div>
        <button
          type="button"
          className="mobile-nav-toggle"
          aria-expanded={open}
          aria-label={open ? "收起导航" : "展开导航"}
          onClick={() => setOpen((current) => !current)}
        >
          <span className="mobile-nav-toggle-label">{open ? "收起" : "导航"}</span>
          <span className="mobile-nav-toggle-icon">{open ? "−" : "+"}</span>
        </button>
      </div>

      <div className="mobile-nav-summary">
        <div className="live-badge">
          <span className="p" />
          {siteMeta.liveBadge}
        </div>
        <div className="mobile-nav-route">
          <span className="mobile-nav-route-label">当前</span>
          <strong>{activeLabel}</strong>
        </div>
      </div>

      <div className="mobile-nav-panel" hidden={!open}>
        <nav className="mobile-nav-groups nav">
          {navGroups.map((group) => (
            <div key={group.label}>
              <div className="nav-label">{group.label}</div>
              {group.items.map((item) => {
                const active = currentPath === normalizePath(item.href);
                return (
                  <Link key={item.href} href={item.href} className={`nav-link mobile-nav-link${active ? " active" : ""}`}>
                    <span className="dot" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
        <div className="mobile-nav-foot sidebar-foot">{siteMeta.footer}</div>
      </div>
    </div>
  );
}
