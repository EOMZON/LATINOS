import type {
  AssetCardData,
  AssetGroupData,
  DanceDemoFocusData,
  DanceDemoProfileData,
  DanceDemoStateData,
  DemoChecklistItemData,
  InfoCardData,
  KeyValue,
  SourceRowData,
  StagePanelMetricData,
  StagePanelSignalData,
} from "./types";
import {
  sharedDanceDemoChecklist,
  sharedDanceDemoFocuses,
  sharedDanceDemoProfiles,
  sharedDanceDemoStates,
} from "./dance-os-demo-shared";

export const danceRows: KeyValue[] = [
  { label: "定位", value: "先把练完后怎么继续做成入口。" },
  { label: "最小动作", value: "录 15 秒 / 只修 1 点 / 留下下一轮。" },
  { label: "当前验证", value: "correction / body map / queue 先跑成闭环。" },
  { label: "最大风险", value: "模块越来越多，但做完仍不知道先改哪。" },
];

export const danceIndependentDemoRows: KeyValue[] = [
  { label: "当前承接", value: "frontdoor 先解释边界，独立 demo 继续长产品链。" },
  { label: "已成立链路", value: "archive -> queue -> return trigger" },
  { label: "当前入口", value: "本机 3301 独立壳 + 本页 correction / queue 对照入口" },
  { label: "当前约束", value: "先本地 / preview，不直接切旧域名首页。" },
];

export const danceBridgeCards: InfoCardData[] = [
  {
    day: "NEXT 01",
    title: "继续本页 route demo",
    href: "/dance-os#correction-ledger-demo",
    rows: [
      { label: "适合现在", value: "已经知道这轮要修哪一层，但还没把 next step 压出来" },
      { label: "下一步", value: "继续 correction ledger，再把问题写成下轮动作句" },
    ],
    note: "先把这轮压成一句可执行 next step，不急着跳到别的壳。",
  },
  {
    day: "NEXT 02",
    title: "进入独立 Dance OS Demo",
    href: "/dance-os#independent-demo-entry",
    rows: [
      { label: "适合现在", value: "想直接看当前独立壳和 return 链怎么单独成立" },
      { label: "下一步", value: "先看入口关系，再决定是否打开本机 3301 独立壳" },
    ],
    note: "独立 demo 已经存在，但仍先由 frontdoor 把边界和入口讲清楚。",
  },
  {
    day: "NEXT 03",
    title: "还没说清卡点，先回 Daily",
    href: "/daily-latin?state=restart&dance=cha#today-loop-demo",
    rows: [
      { label: "适合现在", value: "其实还停在重启 / 直播回流，还没到身体纠错层" },
      { label: "下一步", value: "先回 Daily 把这一轮接上，再决定是否桥接到 Dance OS" },
    ],
    note: "如果还不能说清是重心、髋、脚下还是上身，就别勉强留在 OS 层。",
  },
];

export const danceLead =
  "这页先不追求工具名，只先把录一轮、回看、只修一个点、下次还能回来继续这条链收成真的练习入口。";

export const danceProducts: AssetCardData[] = [
  { platform: "demo", title: "Session Lens", note: "15 秒回看，只决定这轮先改哪。", state: "feedback lens", meta: "先看见问题" },
  { platform: "demo", title: "Correction Ledger", note: "把问题写成下轮还会执行的动作句。", state: "next-action log", meta: "问题写成动作" },
  { platform: "demo", title: "Body Map", note: "把卡点落到重心、髋、上身或脚下。", state: "issue location", meta: "问题别悬空" },
  { platform: "demo", title: "Practice Queue", note: "今天只留 1 个下次回来继续改的点。", state: "one next step", meta: "下一轮继续改" },
  { platform: "demo", title: "Witness Archive", note: "把练习过程沉成可回看的证据。", state: "content witness", meta: "练习变资产" },
  { platform: "demo", title: "Return Trigger", note: "判断人会不会真的回来下一轮。", state: "retention test", meta: "判断产品成立" },
];

export const danceSources: AssetCardData[] = [
  { platform: "feishu", title: "LATIN", note: "总 wiki / 当前母文档入口", state: "root wiki", meta: "母入口" },
  { platform: "feishu", title: "DANCE OS DEMO v1.0", note: "产品与品牌方向的原始来源", state: "brand brief", meta: "产品语言" },
  { platform: "feishu", title: "拉丁dance os构思", note: "Daily IP + 网站 + 工具的系统骨架", state: "system map", meta: "系统结构" },
  { platform: "feishu", title: "直播计划", note: "内容节奏 / witness / 回流逻辑", state: "content loop", meta: "回流逻辑" },
  { platform: "repo", title: "source-of-truth", note: "Feishu first / Notion deprecated", state: "guardrail", meta: "内容约束" },
  { platform: "repo", title: "website-strategy", note: "旧站保留 / 新前台并行 / 不急切首页", state: "deploy rule", meta: "入口边界" },
];

export const danceCurrent: AssetCardData[] = [
  { platform: "live", title: "旧站首页", note: "成人初学 / 断练重启的公开入口", state: "public proof", meta: "现有 live" },
  { platform: "demo", title: "Frontdoor Preview", note: "Next 工作台壳 / 统一新入口", state: "front shell", meta: "承接入口" },
  { platform: "demo", title: "Daily Latin Demo", note: "状态分流 / 4 步起步 / 回流 witness", state: "entry branch", meta: "daily 入口" },
  { platform: "demo", title: "Dance OS Demo", note: "Correction Ledger / 模块命名 / 结构验证", state: "tool shell", meta: "当前验证" },
  { platform: "repo", title: "Legacy Map", note: "旧站内容与新入口的映射说明", state: "mapping doc", meta: "承接说明" },
  { platform: "repo", title: "Memory Layer", note: "把结构决策和推进事实持续沉淀", state: "memory log", meta: "长期上下文" },
];

export const danceFuture: AssetCardData[] = [
  { platform: "demo", title: "Clip Review Queue", note: "切片看完后怎么回到训练，而不是停在发布完成", state: "review loop", meta: "看完要回练" },
  { platform: "demo", title: "Body Issue Map", note: "把重心 / 髋 / 脚下 / 上身这些高频问题逐步聚清楚", state: "issue atlas", meta: "问题聚类" },
  { platform: "demo", title: "Entry State Selector", note: "按今天状态决定先重启、先守拍子，还是先修卡点", state: "state intake", meta: "入口分流" },
  { platform: "demo", title: "Practice Notes", note: "每轮只留一句“下次先改哪里”", state: "note ritual", meta: "下一轮提示" },
  { platform: "demo", title: "Session Archive", note: "不是素材仓，而是“我怎么一步步变清楚”的 witness 轨迹", state: "archive rail", meta: "归档资产" },
  { platform: "demo", title: "Return Dashboard", note: "判断用户有没有真的回来下一轮，而不是只看浏览和停留", state: "return signal", meta: "留存判断" },
];

export const danceAssetGroups: AssetGroupData[] = [
  {
    id: "products",
    label: "产品模块",
    description: "不是空卡片，而是后续要持续长出的真实工具壳。",
    more: "不是空卡片，而是后续持续长出的真实工具壳",
    items: danceProducts,
  },
  {
    id: "sources",
    label: "来源文档",
    description: "全部要回到 Feishu source of truth，不再凭空继续造另一套内容真相。",
    more: "全部要回到 Feishu source of truth",
    items: danceSources,
  },
  {
    id: "current",
    label: "现有页面",
    description: "旧站与当前 demo 的并行承接，先把现在已有的证据和入口收拢清楚。",
    more: "旧站与当前 demo 的并行承接",
    items: danceCurrent,
  },
  {
    id: "future",
    label: "未来工具",
    description: "这些不是远景词，而是后续应该继续长成可复盘、可迭代的产品体验。",
    more: "应继续长成可复盘、可迭代的产品体验",
    items: danceFuture,
  },
];

export const danceSourceLeft = [
  { title: "DANCE OS DEMO v1.0", mini: "product-and-brand-demo", value: "产品语言" },
  { title: "拉丁dance os构思", mini: "system-architecture", value: "系统母结构" },
  { title: "直播计划", mini: "content-and-ip", value: "witness / return" },
  { title: "Body System", mini: "legacy proof", value: "问题落点" },
] satisfies SourceRowData[];

export const danceSourceRight = [
  { title: "录 15 秒", mini: "session lens", value: "先看见问题" },
  { title: "定位 1 个点", mini: "body map", value: "问题别悬空" },
  { title: "写下下一步", mini: "ledger / queue", value: "下一轮继续改" },
  { title: "判断会不会回来", mini: "return trigger", value: "产品是否成立" },
] satisfies SourceRowData[];

export const danceDemoProfiles = sharedDanceDemoProfiles satisfies DanceDemoProfileData[];

export const danceDemoStates = sharedDanceDemoStates satisfies DanceDemoStateData[];

export const danceDemoFocuses = sharedDanceDemoFocuses satisfies DanceDemoFocusData[];

export const danceDemoChecklist = sharedDanceDemoChecklist satisfies DemoChecklistItemData[];

export const danceStageMetrics: StagePanelMetricData[] = [
  { label: "状态", value: "4" },
  { label: "身体落点", value: "4" },
  { label: "最小 witness", value: "15s" },
  { label: "下一轮队列", value: "1" },
];

export const danceIndependentDemoMetrics: StagePanelMetricData[] = [
  { label: "入口", value: "2" },
  { label: "形态", value: "local" },
  { label: "已验证", value: "3" },
  { label: "主链", value: "return" },
];

export const danceIndependentDemoSignals: StagePanelSignalData[] = [
  { title: "先从 frontdoor 看边界", detail: "本页先告诉你这个工具在整个系统里负责什么，不把入口和产品壳混在一起。" },
  { title: "再进独立壳", detail: "独立 demo 现在已经不只是解释壳，而是能真实跑通 archive / queue / return trigger。" },
  { title: "最后再决定是否回来 route", detail: "需要继续看 correction / body map 时，再回到这页的对照结构，不直接绑生产域名。" },
];

export const danceStageSignals: StagePanelSignalData[] = [
  { title: "先看见", detail: "先录 15 秒，看见问题。" },
  { title: "再压成一句", detail: "把问题写成下轮先改哪的一句动作句。" },
  { title: "再看会不会回来", detail: "做完后还说不出下次先改哪，这层就还没成立。" },
];
