import type { InfoCardData, SourceRowData, StagePanelMetricData, StagePanelSignalData } from "./types";

export const toolLead =
  "这页不是文档目录，而是这条线当前如何从飞书真相、旧站 proof 和 repo 规则一路接到新 frontdoor 与 preview 的执行入口。";

export const toolStageMetrics: StagePanelMetricData[] = [
  { label: "主来源", value: "4 份" },
  { label: "关键入口", value: "4 条" },
  { label: "硬规则", value: "3 条" },
  { label: "停做项", value: "3 条" },
];

export const toolStageSignals: StagePanelSignalData[] = [
  {
    title: "先回到 Feishu",
    detail: "内容真相先从 LATIN / 直播计划 / Dance OS Demo 组里校准，不再让 Notion 双轨并行。",
  },
  {
    title: "旧站先保留",
    detail: "旧站是公开 proof，不该为了整理结构就覆盖生产首页或粗暴迁目录。",
  },
  {
    title: "先 preview 再决定生产",
    detail: "新入口和 demo 先在 frontdoor 验证，通过 smoke 和实机复核后再讨论域名切换。",
  },
];

export const toolBridgeCards: InfoCardData[] = [
  {
    day: "BRIDGE 01",
    title: "继续看 Legacy Proof",
    href: "/legacy",
    rows: [
      { label: "适合现在", value: "先看旧站已证明什么" },
      { label: "下一步", value: "保留 / 映射 / 并行" },
    ],
    note: "如果你要先判断旧站为什么不能直接推倒，这一页最直接。",
  },
  {
    day: "BRIDGE 02",
    title: "继续看路线图",
    href: "/roadmap",
    rows: [
      { label: "适合现在", value: "先看 gate 和顺序" },
      { label: "下一步", value: "preview before production" },
    ],
    note: "如果你要判断现在该不该碰生产域名，先去看 route-level gate 和阶段边界。",
  },
  {
    day: "BRIDGE 03",
    title: "继续看状态看板",
    href: "/dashboard",
    rows: [
      { label: "适合现在", value: "先看验证状态" },
      { label: "下一步", value: "proof / risk / gate" },
    ],
    note: "如果你要看哪些结论已经被脚本、浏览器和 witness archive 证明，这里最直接。",
  },
];

export const toolSourcesLeft = [
  { title: "LATIN", mini: "root wiki", value: "主入口" },
  { title: "直播计划", mini: "content-and-ip", value: "Daily Latin" },
  { title: "拉丁dance os构思", mini: "system-architecture", value: "系统骨架" },
  { title: "DANCE OS DEMO v1.0", mini: "product-and-brand-demo", value: "工具方向" },
] satisfies SourceRowData[];

export const toolSourcesRight = [
  { title: "旧站 live", mini: "latindance.zondev.top", value: "proof" },
  { title: "新 preview", mini: "frontdoor local / Next", value: "preview" },
  { title: "repo standards", mini: "AGENTS / MEMORY / source-of-truth", value: "rules" },
  { title: "旧站源码", mini: "MINE/9_latin/apps/latinDance", value: "source" },
] satisfies SourceRowData[];

export const ruleCards: InfoCardData[] = [
  {
    day: "RULE 01",
    title: "Feishu First",
    rows: [
      { label: "唯一来源", value: "LATIN wiki" },
      { label: "作用", value: "内容真相" },
    ],
    note: "这条线从现在开始不再用 Notion 双轨并行，所有旧提法都应映射回飞书结构。",
  },
  {
    day: "RULE 02",
    title: "Legacy 保留",
    rows: [
      { label: "线上", value: "latindance.zondev.top" },
      { label: "策略", value: "保留 / 映射 / 并行" },
    ],
    note: "旧站是公开 proof，不为了整理结构就直接覆盖生产首页。",
  },
  {
    day: "RULE 03",
    title: "Preview 先行",
    rows: [
      { label: "当前", value: "local / preview" },
      { label: "门槛", value: "先验证再切" },
    ],
    note: "先把新入口与 demo 做稳，再决定域名首页是否替换。",
  },
];

export const toolExecutionCards: InfoCardData[] = [
  {
    day: "FLOW 01",
    title: "Feishu → 内容真相",
    rows: [
      { label: "入口", value: "LATIN wiki" },
      { label: "作用", value: "不再双轨判断" },
    ],
    note: "这条线的真实内容从飞书开始，不再让旧 Notion 提法继续和飞书并行制造另一套判断。",
  },
  {
    day: "FLOW 02",
    title: "Standards → 结构护栏",
    rows: [
      { label: "文件", value: "AGENTS / MEMORY / standards" },
      { label: "作用", value: "先把目录和边界立住" },
    ],
    note: "规则层不是旁注，而是为了避免新旧版本、demo、历史材料重新混写回一个模糊目录。",
  },
  {
    day: "FLOW 03",
    title: "Frontdoor → 新入口",
    rows: [
      { label: "项目", value: "sites/frontdoor" },
      { label: "作用", value: "并行承接新入口" },
    ],
    note: "当前新线先在 frontdoor 下验证 Daily、Dance OS 和 route-level decision pages，不急着动生产首页。",
  },
  {
    day: "FLOW 04",
    title: "Preview → 再决定生产",
    rows: [
      { label: "门槛", value: "verify / smoke / 实机复核" },
      { label: "作用", value: "先证明，再切入口" },
    ],
    note: "域名切换不是本页的默认动作。先把 preview 做到足够稳，再决定是否值得动 latindance 首页。",
  },
];

export const toolStopDoingCards: InfoCardData[] = [
  {
    day: "STOP 01",
    title: "不再继续扩 Notion",
    rows: [
      { label: "旧说法", value: "历史遗留" },
      { label: "当前处理", value: "映射回 Feishu" },
    ],
    note: "如果旧材料提到 Notion、数据库写到 Notion，默认都解释为旧提法，不继续长新工作流。",
  },
  {
    day: "STOP 02",
    title: "不把新旧混写",
    rows: [
      { label: "旧站", value: "legacy proof" },
      { label: "新前台", value: "frontdoor 并行" },
    ],
    note: "旧站保留、新入口并行、demo 独立长出，这三层不该再被丢回同一个随意目录里一起维护。",
  },
  {
    day: "STOP 03",
    title: "不跳过 preview 直接切生产",
    rows: [
      { label: "当前默认", value: "preview first" },
      { label: "后续条件", value: "新前台明显更强" },
    ],
    note: "没有 preview 验证、没有 route 和 browser smoke、没有整站完成感复核前，不直接改 latindance.zondev.top 首页。",
  },
];
