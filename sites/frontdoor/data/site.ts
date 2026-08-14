export type NavItem = {
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    label: "Live",
    items: [
      { label: "今日总览", href: "/" },
      { label: "旧站 Proof", href: "/legacy" },
    ],
  },
  {
    label: "Library",
    items: [
      { label: "发力实验室", href: "/force" },
      { label: "Daily Latin", href: "/daily-latin" },
      { label: "Dance OS", href: "/dance-os" },
    ],
  },
  {
    label: "Tools",
    items: [{ label: "来源与规则", href: "/tools" }],
  },
  {
    label: "Plan",
    items: [
      { label: "路线图", href: "/roadmap" },
      { label: "状态看板", href: "/dashboard" },
    ],
  },
  {
    label: "About",
    items: [{ label: "关于这条线", href: "/about" }],
  },
];

export const siteMeta = {
  mark: "舞",
  name: "拉丁练习入口",
  sub: "PRACTICE LOG · SINCE 2026",
  liveBadge: "FORCE LAB · FIRST SLICE",
  footer: "先看发力 / 再练一轮 / 或去 Dance OS",
};
