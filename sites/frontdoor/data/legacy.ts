import type { InfoCardData, KeyValue, StagePanelMetricData, StagePanelSignalData } from "./types";

export const legacyLead =
  "这页不是归档说明，而是当前 live proof 怎样继续托住新 frontdoor、Daily Latin 和 Dance OS。先看它已经证明了什么，再决定今天从哪条入口继续。";

export const legacyStageMetrics: StagePanelMetricData[] = [
  { label: "公开状态", value: "1 个 live" },
  { label: "起步入口", value: "3 条" },
  { label: "语言资产", value: "4 句" },
  { label: "工具 proof", value: "1 条" },
];

export const legacyStageSignals: StagePanelSignalData[] = [
  {
    title: "先判断适不适合",
    detail: "旧站先用 Why Latin 托住起步焦虑，不让用户一上来就背完整体系。",
  },
  {
    title: "今天就开始练",
    detail: "Learning Path 已经证明 4 步起步最适合成人初学和断练后重启者。",
  },
  {
    title: "卡住时只修 1 个点",
    detail: "Body System 把问题压到重心、髋和脚下，为 Dance OS 工具化提供桥梁。",
  },
];

export const legacyRows: KeyValue[] = [
  { label: "线上站点", value: "latindance.zondev.top" },
  { label: "当前 promise", value: "想练拉丁舞，不知道从哪开始？" },
  { label: "当前受众", value: "成人爱好者、初学者、断练后想重启的人" },
  { label: "为什么保留", value: "它已经是公开 proof，不应该为了整理结构而被推倒。" },
  { label: "当前角色", value: "legacy proof / 旧版入口 / 最强公开证据" },
  { label: "未来位置", value: "可以保留为 legacy、v1，或新首页里的旧版入口。" },
];

export const legacyBridgeCards: InfoCardData[] = [
  {
    day: "BRIDGE 01",
    title: "回到新首页",
    href: "/",
    rows: [
      { label: "继续方式", value: "先看统一入口" },
      { label: "适合现在", value: "还在判断今天从哪重启" },
    ],
    note: "先回到 frontdoor，把旧站、Daily Latin、Dance OS 当成 3 条明确入口，而不是继续散着找。",
  },
  {
    day: "BRIDGE 02",
    title: "继续 Daily Latin",
    href: "/daily-latin",
    rows: [
      { label: "继续方式", value: "把今天这一轮做完" },
      { label: "适合现在", value: "刚看完内容 / 断练后重启" },
    ],
    note: "旧站里最有价值的“轻起步”逻辑，最适合在 Daily Latin 里继续长成真实 loop。",
  },
  {
    day: "BRIDGE 03",
    title: "继续 Dance OS",
    href: "/dance-os",
    rows: [
      { label: "继续方式", value: "从卡点进入工具" },
      { label: "适合现在", value: "脚下乱 / 拍子乱 / 重心乱" },
    ],
    note: "旧站已经证明“先修 1 个点”成立，所以更适合把它接到 correction ledger 和 body map。",
  },
];

export const legacyCards: InfoCardData[] = [
  {
    day: "MODULE 01",
    title: "Why Latin",
    rows: [
      { label: "作用", value: "先判断适不适合" },
      { label: "位置", value: "旧站主入口" },
    ],
    note: "给犹豫中的用户一个低门槛判断入口，而不是一上来就要求开始练。",
  },
  {
    day: "MODULE 02",
    title: "Learning Path",
    rows: [
      { label: "作用", value: "今天就开始练" },
      { label: "核心", value: "4 步起步任务" },
    ],
    note: "旧站最强的地方之一，就是把今天这一轮压得足够轻。",
  },
  {
    day: "MODULE 03",
    title: "Body System",
    rows: [
      { label: "作用", value: "修一个具体卡点" },
      { label: "方向", value: "重心 / 髋 / 脚下" },
    ],
    note: "不是泛泛而谈，而是把错误落到身体层。",
  },
  {
    day: "MODULE 04",
    title: "Tools",
    rows: [
      { label: "作用", value: "动作反馈练习台" },
      { label: "角色", value: "产品化 proof" },
    ],
    note: "它证明这条线不只有内容入口，也有工具化可能。",
  },
  {
    day: "MODULE 05",
    title: "Log",
    rows: [
      { label: "作用", value: "复盘样例" },
      { label: "价值", value: "witness" },
    ],
    note: "让用户看到一节练习怎样被拆成 correction 和记忆点。",
  },
  {
    day: "MODULE 06",
    title: "Join / About",
    rows: [
      { label: "作用", value: "联系与定位" },
      { label: "价值", value: "补足前台解释" },
    ],
    note: "旧站已经不只是 landing page，而是一个相对完整的前台雏形。",
  },
];

export const legacyStrategyCards: InfoCardData[] = [
  {
    day: "ACTION 01",
    title: "保留",
    rows: [
      { label: "为什么", value: "它已经是公开 proof" },
      { label: "当前动作", value: "不改生产入口" },
    ],
    note: "先把它当成已上线证据，而不是“旧东西应该清掉”。",
  },
  {
    day: "ACTION 02",
    title: "映射",
    rows: [
      { label: "对应", value: "Why Latin / Body / Tools" },
      { label: "去向", value: "Daily / Dance OS / frontdoor" },
    ],
    note: "旧站已经验证过哪些结构有效，要明确映射到新入口里，而不是重复发明命名。",
  },
  {
    day: "ACTION 03",
    title: "并行",
    rows: [
      { label: "短期", value: "legacy + new preview" },
      { label: "触发点", value: "新前台明显更强时再切" },
    ],
    note: "新 frontdoor 与 demo 够稳之前，不把换首页这件事和前台重构绑死。",
  },
];

export const legacyMappingCards: InfoCardData[] = [
  {
    day: "MAP 01",
    title: "Why Latin → Daily Latin",
    rows: [
      { label: "旧站作用", value: "判断适不适合" },
      { label: "新站位置", value: "/daily-latin" },
    ],
    note: "这部分最适合转成 Daily Latin 的状态分流与低门槛入口。",
  },
  {
    day: "MAP 02",
    title: "Learning Path → Start Loop",
    rows: [
      { label: "旧站作用", value: "今天就开始练" },
      { label: "新站位置", value: "4 步起步 / next step" },
    ],
    note: "旧站最有价值的不是信息量，而是把“今天这一轮”压得足够轻。",
  },
  {
    day: "MAP 03",
    title: "Body System → Dance OS",
    rows: [
      { label: "旧站作用", value: "修一个具体卡点" },
      { label: "新站位置", value: "Body Map / Ledger" },
    ],
    note: "这部分是从内容站长成工具体验的最明确桥梁。",
  },
];

export const legacyLanguageCards: InfoCardData[] = [
  {
    day: "VOICE 01",
    title: "Tagline",
    rows: [
      { label: "旧站表达", value: "想练拉丁舞，不知道从哪开始？" },
      { label: "价值", value: "先收住起步焦虑" },
    ],
    note: "这是旧站最清楚的一句 promise，直接点中成人初学和断练重启者的真实状态。",
  },
  {
    day: "VOICE 02",
    title: "Service Promise",
    rows: [
      { label: "旧站表达", value: "先选你今天的状态，把这一轮做完。" },
      { label: "价值", value: "把学习压力压小" },
    ],
    note: "这句话已经证明适合作为 Daily Latin 的核心入口逻辑。",
  },
  {
    day: "VOICE 03",
    title: "System Description",
    rows: [
      { label: "旧站表达", value: "不是资料库；先判断、再开始、再修一个具体问题。" },
      { label: "价值", value: "明确不是堆内容" },
    ],
    note: "它清楚界定了这条线为什么不能做成泛泛的舞蹈信息站。",
  },
  {
    day: "VOICE 04",
    title: "Signature Line",
    rows: [
      { label: "旧站表达", value: "你不用很会跳，才配开始跳。" },
      { label: "价值", value: "降低开始门槛" },
    ],
    note: "这句话很适合保留在新前台里，作为这条线对初学者最友好的态度表达。",
  },
];
