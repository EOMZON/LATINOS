import type {
  HomeFooterData,
  HomeHeatmapData,
  HomeHeroData,
  HomeQueueFallbackData,
  InfoCardData,
} from "./types";

export const homeProgress = [
  0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 2, 0, 0, 0, 1, 2, 2, 2, 0, 0, 0, 1,
  1, 2, 3, 0, 0, 0, 0, 1, 2, 2, 0, 0, 0, 0, 1, 2, 3, 0, 0, 0, 0, 0, 1, 2, 0,
  0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
];

export const homeHeatmap: HomeHeatmapData = {
  title: "连续练习 · 12 周热力图",
  more: "深色 = 这一周留下了入口或回流点",
  rangeLabel: "Week 1 → Week 12",
  note: "灰格 = 还没开始 · 紫格 = 这一周已有可回来的入口",
};

export const homeWorkbench = {
  title: "工作台",
  more: "先回到刚做完的一轮，再进入今天真正要用的模块",
  intro:
    "先不要把所有东西一起打开。发力实验室是当前第一入口：看懂一个身体链，再进入 Daily Latin 或 Dance OS 把它练出来。",
  entryLabel: "TODAY ENTRY",
  entryTitle: "今天先进入",
  entryMore: "先从能立刻开始的一条真实入口进去。",
  supportLabel: "KEEP STRUCTURE",
  supportTitle: "保持结构",
  supportMore: "来源、路线、旧站和状态层继续给这个 frontdoor 托底。",
};

export const homeIndependentDemoBridge = {
  kicker: "INDEPENDENT DEMO",
  title: "独立 Dance OS Demo 已经可以单独进入",
  description:
    "首页先承接这个工具现在已经长到了哪里，再把人送去 `/dance-os` 看入口关系；如果本机独立壳已经启动，也可以直接打开继续验证。",
  rows: [
    { label: "已成立链路", value: "archive -> queue -> return trigger" },
    { label: "当前承接", value: "frontdoor 解释边界，独立 demo 继续长产品链" },
    { label: "为什么不直切域名", value: "先本地 / preview 验证，不把旧站入口和新壳混写" },
  ],
  primaryHref: "/dance-os#independent-demo-entry",
  primaryLabel: "先看独立 Demo 入口 →",
  secondaryHref: "http://127.0.0.1:3301",
  secondaryLabel: "本机打开独立壳（3301）",
};

export const homeHero: HomeHeroData = {
  eyebrow: "给想知道“到底从哪里发力”的拉丁学习者",
  title: "先看懂身体链，再把一个动作练对。",
  pill: "FORCE-FIRST · 5 个首发专题",
  phase: "FORCE",
  phaseNote: "先看\n1 条链",
  tag: "发力实验室 · 第一公开切片",
  description: "脚底、主力腿、骨盆、核心、肩胛。\n把抽象的“发力”变成能观察、能练的下一步。",
  stats: [
    { label: "发力专题", value: "5" },
    { label: "课堂来源", value: "7" },
    { label: "练习闭环", value: "5" },
  ],
  progressValue: "5题",
  progressLabel: "首发专题",
  sessionLabel: "这次先回答",
  sessionValue: "力量从哪里开始，又经过哪里？",
  ctaHref: "/force",
  ctaLabel: "进入发力实验室 →",
};

export const homeQueueFallbacks: HomeQueueFallbackData[] = [
  {
    slot: "latest",
    source: "daily",
    title: "恰恰 · 断练后重启",
    context: "Daily Loop · restart",
    nextStep: "先做同一轮，再把脚下边界压成一句 witness。",
    href: "/daily-latin?state=restart&dance=cha#today-loop-demo",
  },
  {
    slot: "daily",
    source: "daily",
    title: "伦巴 · 刚看完直播",
    context: "Daily Return · live",
    nextStep: "先把刚看到的点压成最小起步动作。",
    href: "/daily-latin?state=after-live&dance=rumba#today-loop-demo",
  },
  {
    slot: "dance",
    source: "dance",
    title: "伦巴 · 拍子卡点",
    context: "Dance OS · correction",
    nextStep: "先守住 2-3 的脚下边界和拍子。",
    href: "/dance-os?state=beat&profile=rumba&focus=feet#correction-ledger-demo",
  },
];

export const homeModules: InfoCardData[] = [
  {
    day: "PRIMARY",
    title: "发力实验室",
    href: "/force",
    rows: [
      { label: "入口", value: "从哪里发力 / 为什么总是代偿" },
      { label: "动作", value: "看身体链，再做 60 秒 drill" },
    ],
    note: "当前第一产品切片：5 个课堂问题，公开边界与复核状态透明。",
  },
  {
    day: "MODULE",
    title: "旧站起步页",
    href: "/legacy",
    rows: [
      { label: "入口", value: "先判断今天从哪里重启" },
      { label: "作用", value: "判断今天该从哪开始" },
    ],
    note: "已上线 proof，继续保留成当前起步入口。",
  },
  {
    day: "MODULE",
    title: "Daily Latin",
    href: "/daily-latin",
    rows: [
      { label: "入口", value: "断练后重启 / 刚看完直播" },
      { label: "动作", value: "把今天这一轮做完" },
    ],
    note: "先按状态进去，再把这一轮压成 witness。",
  },
  {
    day: "MODULE",
    title: "Dance OS",
    href: "/dance-os",
    rows: [
      { label: "入口", value: "拍子乱 / 脚下乱 / 重心乱" },
      { label: "动作", value: "把卡点压成下一步" },
    ],
    note: "route demo 已可看，独立 demo 入口也已在这一层明确承接。",
  },
  {
    day: "MODULE",
    title: "来源与规则",
    href: "/tools",
    rows: [
      { label: "来源", value: "LATIN / 直播计划 / DEMO" },
      { label: "规则", value: "飞书为准 / 旧站先保留" },
    ],
    note: "先看内容从哪里来，再看现在按什么规则推进。",
  },
  {
    day: "MODULE",
    title: "路线图",
    href: "/roadmap",
    rows: [
      { label: "当前", value: "入口先站稳 / demo 继续并行" },
      { label: "下一步", value: "旧域名先不急着切" },
    ],
    note: "先把新入口跑顺，再讨论旧域名承接。",
  },
  {
    day: "MODULE",
    title: "当前状态",
    href: "/dashboard",
    rows: [
      { label: "现在", value: "哪些页面已经跑顺" },
      { label: "回流", value: "Daily / Dance 回流状态" },
    ],
    note: "先看真实状态，不靠口头解释。",
  },
];

export const homeFooter: HomeFooterData = {
  left: "恰恰重启 / 直播回流 / 拍子卡点",
  right: "旧站 / Daily / Dance",
};

export const homePrimaryModules = homeModules.slice(0, 3);
export const homeSupportModules = homeModules.slice(3);
