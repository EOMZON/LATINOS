import type {
  CourseCardData,
  InfoCardData,
  PhaseData,
  SourceRowData,
  StagePanelMetricData,
  StagePanelSignalData,
} from "./types";

export const roadmapLead =
  "这页不是旧计划归档，而是这条线当前已经完成了辅助承接层，接下来只该先定义两个 demo，再决定共享资产、preview 与域名门槛。";

export const roadmapStageMetrics: StagePanelMetricData[] = [
  { label: "核心页", value: "3 条" },
  { label: "辅助页", value: "5 条" },
  { label: "已收口", value: "5 条" },
  { label: "当前阶段", value: "Phase 3" },
];

export const roadmapStageSignals: StagePanelSignalData[] = [
  {
    title: "Phase 1 已完成",
    detail: "首页、Daily Latin 和 Dance OS 已进入用户可直接评判的核心前台完成态。",
  },
  {
    title: "Phase 2 已完成",
    detail: "legacy、tools、roadmap、dashboard、about 都已经完成 visible pass，辅助承接层已经收齐。",
  },
  {
    title: "Phase 3 现在开始",
    detail: "当前真正该推进的是两个 demo 的边界、目录、入口与验证方式，而不是继续补辅助页或提前碰域名。",
  },
];

export const roadmapBridgeCards: InfoCardData[] = [
  {
    day: "BRIDGE 01",
    title: "继续看来源与规则",
    href: "/tools",
    rows: [
      { label: "适合现在", value: "先看 source 和 guardrails" },
      { label: "下一步", value: "Feishu / legacy / preview" },
    ],
    note: "如果你还在判断这条线按什么真相和护栏推进，先回去看 tools。",
  },
  {
    day: "BRIDGE 02",
    title: "继续看状态看板",
    href: "/dashboard",
    rows: [
      { label: "适合现在", value: "先看 proof / risk / gate" },
      { label: "下一步", value: "验证状态与 archive 证据" },
    ],
    note: "如果你要看哪些判断已经被脚本、浏览器和 witness archive 证明，这一页最直接。",
  },
  {
    day: "BRIDGE 03",
    title: "继续看这条线身份",
    href: "/about",
    rows: [
      { label: "适合现在", value: "先看这条线到底服务什么" },
      { label: "下一步", value: "IP / Asset / Product 同时成立" },
    ],
    note: "如果你担心路线图只剩计划语言，就去 about 看这条线当前身份有没有真正讲清。",
  },
];

export const roadmapPhases: PhaseData[] = [
  {
    label: "Phase 1 · 已完成",
    title: "核心前台先站住",
    description: "首页、Daily Latin 和 Dance OS 先完成用户可直接评判的前台完成态，不再停在工程实验页。",
    done: true,
  },
  {
    label: "Phase 2 · 当前",
    title: "辅助承接页对齐",
    description: "把 legacy、tools、roadmap、dashboard、about 收成和核心页同一语言、同一完成态的承接层，不再像后台或说明页。",
    done: true,
  },
  {
    label: "Phase 3 · 下一步",
    title: "把两个 demo 独立长出来",
    description: "回到飞书定义两个 demo 的真实边界，并在 apps/demos 下做成可单独访问、可单独维护的资产。",
  },
  {
    label: "Phase 4 · 再决定",
    title: "评估 preview / 域名映射",
    description: "只有当辅助页、demo 和 preview 都足够稳、能接住用户后，才重新评估 latindance.zondev.top 首页是否要映到新入口。",
  },
];

export const roadmapDeliverables: CourseCardData[] = [
  {
    status: "soon",
    title: "先定义两个 demo 的真实边界",
    compactTitle: "定义 2 个 demo",
    description: "回到 Feishu 把两个 demo 的名称、问题定义、用户入口、数据来源和目录位置先定义清楚，再决定哪个先孵化。",
    compactDescription: "先定义两个 demo 的名称、边界、入口和目录。",
  },
  {
    status: "soon",
    title: "选一个 demo 做第一批独立孵化",
    compactTitle: "孵化 Top 1 demo",
    description: "两个 demo 边界清楚后，只选一个 Top 1 demo 先做成独立资产，避免重新回到平均推进。",
    compactDescription: "只选一个 Top 1 demo 先独立孵化。",
  },
  {
    status: "locked",
    title: "共享资产 / preview / 旧域名映射评估",
    compactTitle: "assets / preview / 域名",
    description: "只有当 demo 已经长成真实资产后，才继续抽共享组件与 schema，并评估 preview、deploy 与旧域名首页映射。",
    compactDescription: "只有 demo 成立后才评估 assets、preview 和域名。",
  },
];

export const roadmapGateLeft = [
  { title: "Frontdoor preview", mini: "入口必须成立", value: "不是只剩说明文档" },
  { title: "Daily Latin", mini: "入口闭环", value: "先判断 / 再开始 / 留 1 点" },
  { title: "Dance OS", mini: "工具闭环", value: "next step 要能送回下一轮" },
  { title: "验证链", mini: "type / build / smoke", value: "不是只靠肉眼点一次" },
] satisfies SourceRowData[];

export const roadmapGateRight = [
  { title: "直接切生产入口", mini: "当前不做", value: "新前台未到近似同款完成度" },
  { title: "推倒旧站", mini: "当前不做", value: "旧站仍是最强公开 proof" },
  { title: "回到单文件方案", mini: "禁止回退", value: "主线已锁定 Next / React / TS" },
  { title: "继续扩 Notion", mini: "禁止回退", value: "内容源只认 Feishu" },
] satisfies SourceRowData[];

export const roadmapGuardCards: InfoCardData[] = [
  {
    day: "GUARD 01",
    title: "先立结构",
    rows: [
      { label: "动作", value: "母仓 / 规则 / memory" },
      { label: "原因", value: "别再长回混乱目录" },
    ],
    note: "建新目录规范、source-of-truth 和长期 memory，本来就不该和生产切换绑成同一次动作。",
  },
  {
    day: "GUARD 02",
    title: "再做新入口",
    rows: [
      { label: "动作", value: "frontdoor / Daily / Dance OS" },
      { label: "原因", value: "先把新承接做稳" },
    ],
    note: "新 frontdoor 和两个 demo 的职责，是先把入口、状态和下一轮收紧，而不是一边重构一边切首页。",
  },
  {
    day: "GUARD 03",
    title: "最后评估域名",
    rows: [
      { label: "动作", value: "是否切 latindance 首页" },
      { label: "原因", value: "必须等 evidence 足够强" },
    ],
    note: "改生产入口只能放在最后判断。把目录规范、前台重构和生产替换绑死，是最容易同时把结构和线上站搞乱的做法。",
  },
];
