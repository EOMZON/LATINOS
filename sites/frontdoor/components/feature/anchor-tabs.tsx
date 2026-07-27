export type AnchorTab = {
  label: string;
  href: string;
  active?: boolean;
};

export function AnchorTabs({ tabs }: { tabs: AnchorTab[] }) {
  return (
    <div className="tabs anchor-tabs">
      {tabs.map((tab) => (
        <a key={tab.href} href={tab.href} className={`tab-link${tab.active ? " active" : ""}`}>
          {tab.label}
        </a>
      ))}
    </div>
  );
}
