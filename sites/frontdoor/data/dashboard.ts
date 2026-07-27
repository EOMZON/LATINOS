import { roadmapDeliverables } from "./roadmap";
import type {
  DecisionSignalData,
  InfoCardData,
  KeyValue,
  MetricData,
  RouteSignalData,
  SourceRowData,
  StagePanelMetricData,
  StagePanelSignalData,
} from "./types";

export const dashboardLead =
  "这页不是旧压缩实验记录，而是当前 frontdoor 这条线已经完成了什么、为什么 Phase 2 可以退出，以及接下来两个 demo 应该怎样被定义成独立资产。";

export const dashboardRows: KeyValue[] = [
  { label: "当前阶段", value: "Phase 3 · 两个 demo 定义与孵化" },
  { label: "刚完成", value: "Phase 2 · 辅助承接层已收齐" },
  { label: "当前主线", value: "先把两个 demo 的边界、目录和入口说清楚" },
  { label: "后续阶段", value: "共享资产沉淀 → preview / deploy / 域名判断" },
];

export const dashboardStageMetrics: StagePanelMetricData[] = [
  { label: "稳定路由", value: "8" },
  { label: "已收辅助页", value: "5" },
  { label: "验证链", value: "6 步" },
  { label: "当前 Top 1", value: "define 2 demos" },
];

export const dashboardStageSignals: StagePanelSignalData[] = [
  {
    title: "核心三页已完成",
    detail: "首页、Daily Latin 和 Dance OS 已进入可直接评判的核心前台完成态。",
  },
  {
    title: "Phase 2 已收齐",
    detail: "legacy、tools、roadmap、dashboard、about 都已经完成 visible pass，辅助承接层不再有明显掉队页。",
  },
  {
    title: "Phase 3 现在开始",
    detail: "当前更合理的主线已经不是继续补辅助页，而是回到飞书把两个 demo 的真实边界、目录与入口定义清楚。",
  },
];

export const dashboardMetrics: MetricData[] = [
  { label: "Stable Routes", value: "8", detail: "home → about" },
  { label: "Core Pages", value: "3", detail: "home / daily / dance" },
  { label: "Phase 2 Passes", value: "5", detail: "legacy → about" },
  { label: "Next Top 1", value: "2 demos", detail: "define boundary / route / folder" },
];

export const dashboardBars = [
  { label: "核心", value: 5 },
  { label: "旧站", value: 5 },
  { label: "规则", value: 5 },
  { label: "路线", value: 4 },
  { label: "看板", value: 4 },
  { label: "demo", value: 2 },
  { label: "域名", value: 1 },
];

export const dashboardVerificationCards: InfoCardData[] = [
  {
    day: "VERIFY 01",
    title: "Route Smoke",
    rows: [
      { label: "覆盖", value: "8 routes" },
      { label: "当前", value: "HTTP 200 + 标题 + fresh prod" },
    ],
    note: "首页、Daily Latin、Dance OS、Tools、Roadmap、Dashboard、About 和 Legacy 都已在 fresh-prod 顺序下验证通过。",
  },
  {
    day: "VERIFY 02",
    title: "Browser Smoke",
    rows: [
      { label: "桌面", value: "queue / bridge / archive / anchors" },
      { label: "移动", value: "390px nav / overflow / route" },
    ],
    note: "当前会在真实浏览器里验证 Daily ↔ Dance bridge、共享 witness queue、Dance OS 双层锚点，以及 390px 无横向溢出。",
  },
  {
    day: "VERIFY 03",
    title: "Structure Guards",
    rows: [
      { label: "内容层", value: "10 files / route-scoped" },
      { label: "历史层", value: "static 已归档" },
    ],
    note: "旧静态 frontdoor 已移入 docs/legacy，当前内容层也已按 home / daily / dance / dashboard 等职责拆分，不再只靠单一 content 大文件。",
  },
];

export const dashboardOpsCards: InfoCardData[] = [
  {
    day: "OPS 01",
    title: "当前主线",
    rows: [
      { label: "阶段", value: "Phase 3" },
      { label: "目标", value: "定义两个 demo 边界" },
    ],
    note: "当前主线已经不是继续补核心三页，也不是继续找辅助页缺口，而是把两个 demo 先定义成有明确边界、目录和入口的下一阶段资产。",
  },
  {
    day: "OPS 02",
    title: "当前 Phase 2 样板",
    rows: [
      { label: "已通过", value: "legacy / tools / roadmap / dashboard / about" },
      { label: "当前判断", value: "辅助承接层已收齐" },
      { label: "下一页", value: "demo 定义文档 / 目录" },
    ],
    note: "这说明当前更合理的动作不是回去找旧的 mobile compaction 点，而是把注意力切到 demo definition、目录边界和复用资产上。",
  },
  {
    day: "OPS 03",
    title: "当前边界",
    rows: [
      { label: "生产", value: "旧站继续保留" },
      { label: "内容", value: "先定义 demo，再谈 preview 与部署" },
    ],
    note: "没有明确决策前，不直接改 latindance.zondev.top 首页指向，也不跳过 demo definition 直接做 deploy 与域名判断。",
  },
];

export const dashboardActionCards = roadmapDeliverables;

export const dashboardSourceLeft = [
  { title: "pnpm typecheck", mini: "syntax / routes", value: "类型守卫" },
  { title: "pnpm smoke:routes", mini: "HTTP 200 + 标题", value: "路由守卫" },
  { title: "pnpm smoke:prod", mini: "build + start + smoke", value: "生产链守卫" },
  { title: "browser-smoke.py", mini: "Playwright", value: "行为守卫" },
] satisfies SourceRowData[];

export const dashboardSourceRight = [
  { title: "旧站保留", mini: "website-strategy", value: "不切生产首页" },
  { title: "Feishu first", mini: "source-of-truth", value: "内容唯一来源" },
  { title: "Next 主线", mini: "frontdoor stack", value: "统一技术母线" },
  { title: "单一 Top 1", mini: "phase loop", value: "不平均推进" },
] satisfies SourceRowData[];

export const dashboardDecisionSignals: DecisionSignalData[] = [
  {
    kind: "proof",
    title: "当前 proof",
    summary: "这条线现在已经不只是核心三页成立，辅助承接层也已经完整收出 legacy、tools、roadmap、dashboard、about 五个样板页，证明系统不再只靠首页撑着。",
    compactSummary: "核心三页成立，辅助承接层 5 页也已收成样板页。",
    rows: [
      { label: "公开证据", value: "旧站 live 仍在" },
      { label: "新主线", value: "8 routes fresh-prod 已过" },
      { label: "Phase 2", value: "5 页已 visible pass" },
    ],
    compactRows: [
      { label: "公开", value: "live" },
      { label: "主线", value: "8 routes" },
      { label: "Phase 2", value: "5 passes" },
    ],
    note: "这说明当前真正要做的已经不是证明项目存在，也不是继续补辅助页，而是把两个 demo 长成下一批可信资产。",
    compactNote: "下一步不是再补辅助页，而是把两个 demo 长成下一批可信资产。",
  },
  {
    kind: "risk",
    title: "当前 risk",
    summary: "当前最大的失败方式不是项目跑不起来，而是辅助承接层已经收齐后，却直接把两个 demo 混着长、没有边界、没有目录和没有验证门槛，最后再次回到平均推进。",
    compactSummary: "最大风险不是跑不起来，而是 demo 没边界、没目录、又回到平均推进。",
    rows: [
      { label: "产品风险", value: "两个 demo 继续混着长" },
      { label: "结构风险", value: "目录边界没先定义" },
      { label: "执行风险", value: "又回到平均推进" },
    ],
    compactRows: [
      { label: "产品", value: "混着长" },
      { label: "结构", value: "没边界" },
      { label: "执行", value: "又平均推进" },
    ],
    note: "所以现在最该做的不是继续加页面，而是先把 demo 边界、目录位置、数据来源和验证方式定义清楚，再选一个 Top 1 孵化。",
    compactNote: "先定义 demo 边界、目录和验证方式，再选一个 Top 1 孵化。",
  },
  {
    kind: "gate",
    title: "下一道 gate",
    summary: "真正的下一道门槛不是上线域名，而是先把两个 demo 的真实边界、命名、目录与入口定义清楚，再决定哪个 demo 先被孵化成独立资产。",
    compactSummary: "下一道门槛不是上域名，而是先定义两个 demo 的边界、命名、目录与入口。",
    rows: [
      { label: "当前阶段", value: "Phase 3 · demo definition" },
      { label: "当前动作", value: "先定义 2 demos" },
      { label: "后续门槛", value: "再进入共享资产与 preview" },
    ],
    compactRows: [
      { label: "当前", value: "Phase 3" },
      { label: "动作", value: "2 demos" },
      { label: "后续", value: "assets / preview" },
    ],
    note: "只有 demo definition 先成立，后面的 shared assets、preview 体系和域名映射判断才不会重新失去边界。",
    compactNote: "只有先定义 demo，后面的 shared assets、preview 和域名判断才不会失去边界。",
  },
];

export const dashboardRouteSignals: RouteSignalData[] = [
  {
    route: "/legacy",
    title: "Legacy Proof",
    proof: "公开 live 已成立",
    compactProof: "live 已成立",
    risk: "如果急着替换，会丢掉现有证据",
    compactRisk: "急替会丢证据",
    gate: "只能保留 / 映射 / 并行，不能直接推倒",
    compactGate: "只准保留 / 映射 / 并行",
    note: "这条线的价值是作为最强公开 proof，告诉我们哪些语言和入口已经被真实验证过。",
    compactNote: "旧站先继续做公开 proof。",
  },
  {
    route: "/",
    title: "Frontdoor",
    proof: "新入口结构已跑通",
    compactProof: "新入口已跑通",
    risk: "如果继续扩散页面，入口会重新变散",
    compactRisk: "再扩散会重散",
    gate: "必须继续把状态、入口、下一步收紧成同一节奏",
    compactGate: "继续把状态 / 入口 / 下一步收紧",
    note: "首页不是解释宇宙观，而是把旧站、新 demo、规则与路线图收进同一个工作台壳。",
    compactNote: "首页先做统一入口壳。",
  },
  {
    route: "/tools",
    title: "Rules / Sources",
    proof: "已成立为 source 与 guardrail 入口",
    compactProof: "source / guardrail 入口已成立",
    risk: "如果只像规则表，会失去前台承接职责",
    compactRisk: "只像规则表会失去承接职责",
    gate: "必须继续服务 legacy / roadmap / dashboard 的决策跳转",
    compactGate: "继续服务 legacy / roadmap / dashboard 跳转",
    note: "这页现在的职责不是列文档，而是把 Feishu、legacy 和 preview 入口前置成真实判断层。",
    compactNote: "它的职责是把 Feishu、legacy 和 preview 前置成真实判断层。",
  },
  {
    route: "/roadmap",
    title: "Roadmap",
    proof: "已对齐到 Phase 2 完成后的真实顺序",
    compactProof: "已对齐到 Phase 2 完成后",
    risk: "如果不切到 Phase 3，会继续沿用旧的待收口口径",
    compactRisk: "不切到 Phase 3 会沿用旧口径",
    gate: "必须先定义两个 demo，再进入 preview / deploy 判断",
    compactGate: "先定义 demo，再进 preview / deploy",
    note: "这页现在真正服务的是 Phase 2 完成后的阶段顺序，确保主线先切到 demo definition，而不是停留在旧的待收口状态。",
    compactNote: "它的职责是把主线从待收口切到 demo definition。",
  },
  {
    route: "/daily-latin",
    title: "Daily Latin",
    proof: "起步入口、daily loop 和共享 witness 已成形",
    compactProof: "入口 / loop / witness 已成形",
    risk: "如果只停在单轮任务，就还没证明直播和内容回流真的接上",
    compactRisk: "只停单轮还没接上内容回流",
    gate: "下一步要继续验证 live return / clip return / archive 承接",
    compactGate: "继续验证 live / clip / archive 承接",
    note: "这条线当前最重要的是维持“先判断 / 再开始 / 留 1 个点”的最小入口闭环，并证明它能把围观、执行和回流证据连起来。",
    compactNote: "继续守住最小入口闭环，并证明它能接上回流。",
  },
  {
    route: "/dance-os",
    title: "Dance OS",
    proof: "模块库、correction ledger 与共享 archive 已成形",
    compactProof: "模块库 / ledger / archive 已成形",
    risk: "如果只停在单点 demo，就还不足以证明长期回流成立",
    compactRisk: "只停单点 demo 还不够",
    gate: "下一步要继续验证 next step witness 会不会真的促成下一轮",
    compactGate: "继续验证 witness 会不会促成下一轮",
    note: "这条线已经不只是空概念，而是开始拥有模块库、成立条件，以及一个会把下一轮动作写回共享 archive 的最小交互。",
    compactNote: "它已经有模块库和能写回 archive 的最小交互。",
  },
  {
    route: "/about",
    title: "About",
    proof: "identity / proof / product boundary 已成立",
    compactProof: "identity / proof / product boundary 已成立",
    risk: "如果之后 demo definition 不回看这里，会重新失去三条主线的统一语言",
    compactRisk: "不回看这里会失去统一语言",
    gate: "后续两个 demo 的命名和边界必须继续对齐 IP / Asset / Product 三层",
    compactGate: "demo 命名和边界必须继续对齐三层",
    note: "这页现在不再只是愿景页，而是后续定义两个 demo 时必须持续回看的身份与边界判断层。",
    compactNote: "它现在是后续定义两个 demo 时必须回看的边界判断层。",
  },
];
