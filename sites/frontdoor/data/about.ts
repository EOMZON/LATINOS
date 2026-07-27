import type {
  InfoCardData,
  KeyValue,
  SourceRowData,
  StagePanelMetricData,
  StagePanelSignalData,
} from "./types";

export const aboutLead =
  "这页不是项目宣言，而是把这条线当前真正同时服务的三层说清楚：Daily Latin IP、拉丁成长 frontdoor、Dance OS / Tools。先把身份、proof 和下一步收进同一页，再决定从哪条入口继续。";

export const aboutIdentityRows: KeyValue[] = [
  { label: "当前阶段", value: "Phase 2 · /about 是最后一个待收齐的辅助承接页。" },
  { label: "真正服务", value: "Daily Latin IP + 拉丁成长网站 + Dance Tools / Dance OS。" },
  { label: "内容真相", value: "Feishu 是唯一 source of truth，不再让 Notion 双轨并行。" },
  { label: "旧站态度", value: "旧站是公开 proof，先保留、映射、并行。" },
  { label: "当前职责", value: "把 identity / proof / product boundary 收进同一套前台语言。" },
  { label: "下一道门槛", value: "收齐 /about 后再做 Phase 2 complete，再进入两个 demo 定义。" },
];

export const aboutStageMetrics: StagePanelMetricData[] = [
  { label: "主线", value: "3 条" },
  { label: "live proof", value: "1 个" },
  { label: "当前阶段", value: "Phase 2" },
  { label: "下一道 gate", value: "demo" },
];

export const aboutStageSignals: StagePanelSignalData[] = [
  {
    title: "不是项目宣言页",
    detail: "这页要讲清当前真实执行判断，而不是抽象地描述一个未来会变好的愿景。",
  },
  {
    title: "先保留旧证据",
    detail: "旧站先继续作为公开 proof 存在，告诉我们哪些入口语言已经被真实验证过。",
  },
  {
    title: "先收前台，再长 demo",
    detail: "只有 frontdoor 和辅助承接层真的站稳后，两个 demo 才值得独立长出来。",
  },
];

export const aboutBridgeCards: InfoCardData[] = [
  {
    day: "BRIDGE 01",
    title: "先看旧站 Proof",
    href: "/legacy",
    rows: [
      { label: "适合现在", value: "先看已经被证明的入口" },
      { label: "下一步", value: "保留 / 映射 / 并行" },
    ],
    note: "如果你想先确认为什么旧站不能直接推倒，先去 legacy 看现有公开 proof 到底证明了什么。",
  },
  {
    day: "BRIDGE 02",
    title: "继续 Daily Latin",
    href: "/daily-latin",
    rows: [
      { label: "适合现在", value: "先回到今天这一轮" },
      { label: "下一步", value: "把 witness 留下来" },
    ],
    note: "如果你想先从内容与练习回流去理解这条线，Daily Latin 是这页最自然的下一跳。",
  },
  {
    day: "BRIDGE 03",
    title: "继续 Dance OS",
    href: "/dance-os",
    rows: [
      { label: "适合现在", value: "先把卡点压成工具" },
      { label: "下一步", value: "把下一轮动作写回 archive" },
    ],
    note: "如果你想看这条线为什么不能只停在内容承接，先去 Dance OS 看产品化那一层怎么长出来。",
  },
];

export const aboutFocusCards: InfoCardData[] = [
  {
    day: "FOCUS 01",
    title: "保留 proof",
    rows: [
      { label: "对象", value: "旧站 live" },
      { label: "原因", value: "最强公开证据" },
    ],
    note: "当前最不该做的事，不是“旧站还在”，而是为了整理结构把已经成立的公开 proof 直接抹掉。",
  },
  {
    day: "FOCUS 02",
    title: "重建入口",
    rows: [
      { label: "对象", value: "frontdoor" },
      { label: "原因", value: "把入口重新收紧" },
    ],
    note: "新 frontdoor 的职责不是讲宇宙观，而是把旧站、新 demo、来源文档和下一步统一成一个清楚入口。",
  },
  {
    day: "FOCUS 03",
    title: "做深 demo",
    rows: [
      { label: "对象", value: "Daily / Dance OS" },
      { label: "原因", value: "把练习回流做真" },
    ],
    note: "这条线不只做内容承接，还要把“做完一轮后，下一轮怎么回来”长成真实产品层。",
  },
  {
    day: "FOCUS 04",
    title: "最后再评估生产",
    rows: [
      { label: "对象", value: "latindance 首页" },
      { label: "原因", value: "不把三件事绑死" },
    ],
    note: "域名切换只能作为后面 evidence 足够强之后的结果，而不是今天这条线的默认动作。",
  },
];

export const aboutRouteLeft = [
  { title: "Daily Latin IP", mini: "content / witness", value: "让内容真的回到练习与回流" },
  { title: "拉丁成长网站", mini: "frontdoor / legacy", value: "收住旧站 proof 与新入口结构" },
  { title: "Dance Tools / OS", mini: "demo / product", value: "把下一轮回流做成工具体验" },
  { title: "About 当前职责", mini: "identity route", value: "把这三层收进同一执行判断" },
] satisfies SourceRowData[];

export const aboutRouteRight = [
  { title: "不是单个 landing page", mini: "非目标", value: "不是只做一个页面或愿景页" },
  { title: "不是急着绑新域名", mini: "非当前动作", value: "先 preview，后 production" },
  { title: "不是清掉旧站", mini: "非当前动作", value: "旧站先保留为 proof" },
  { title: "不是继续扩 Notion", mini: "非当前动作", value: "所有旧提法映射回 Feishu" },
] satisfies SourceRowData[];

export const aboutPrinciples: InfoCardData[] = [
  {
    day: "PRINCIPLE 01",
    title: "IP",
    rows: [
      { label: "对应", value: "Daily Latin" },
      { label: "核心", value: "持续 witness" },
    ],
    note: "直播 / 日更内容不是终点，而是把成长过程留下来、让人愿意回来继续看的长期 IP 线。",
  },
  {
    day: "PRINCIPLE 02",
    title: "Asset",
    rows: [
      { label: "对应", value: "frontdoor / 网站" },
      { label: "核心", value: "资产承接" },
    ],
    note: "网站要负责收住旧站、新入口、规则、demo 与未来公开资产，而不是只做一次 landing page。",
  },
  {
    day: "PRINCIPLE 03",
    title: "Product",
    rows: [
      { label: "对应", value: "Dance OS / tools" },
      { label: "核心", value: "产品化" },
    ],
    note: "工具不是额外加分项，而是把“练习过程如何回流下一轮”变成产品体验的那一层。",
  },
];

export const aboutContactCards: InfoCardData[] = [
  {
    day: "CHANNEL 01",
    title: "邮箱",
    rows: [
      { label: "地址", value: "zonlily@outlook.com" },
      { label: "适合", value: "认真说明你的情况" },
    ],
    note: "如果用户已经知道自己卡在哪一轮、想先接哪一个问题，邮箱仍然是最完整的入口。",
  },
  {
    day: "CHANNEL 02",
    title: "小红书",
    rows: [
      { label: "账号", value: "@Roya爱跳舞" },
      { label: "适合", value: "先看练习碎片" },
    ],
    note: "这类渠道更适合先建立轻联系，再逐步回流到真正的练习与问题处理。",
  },
  {
    day: "CHANNEL 03",
    title: "抖音",
    rows: [
      { label: "账号", value: "@Roya爱跳舞" },
      { label: "适合", value: "看动作片段与即时痕迹" },
    ],
    note: "对 Daily Latin 这条线来说，抖音更像 witness 和即时练习反馈的公开外层。",
  },
];

export const aboutDecisionCard: InfoCardData = {
  day: "LINE 01",
  title: "Keep the proof. Grow the three lines.",
  rows: [
    { label: "旧站", value: "保留为公开 proof" },
    { label: "当前动作", value: "把 IP / Asset / Product 同时做真" },
  ],
  note: "这句不是 slogan，而是当前最真实的执行判断：先保留证据，再把 Daily Latin、frontdoor 和 Dance OS 三条线收成同一个系统。",
};
