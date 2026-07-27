import type {
  DailyDemoDanceData,
  DailyDemoStateData,
  DailyDemoTaskData,
  DailyReturnModeSeedData,
  InfoCardData,
  KeyValue,
  MoveCardData,
  MoveGroupData,
  SourceRowData,
  StagePanelMetricData,
  StagePanelSignalData,
} from "./types";

export const dailyRows: KeyValue[] = [
  { label: "定位", value: "Daily 入口，不是资料目录。" },
  { label: "对应飞书", value: "直播计划 / 拉丁dance os构思" },
  { label: "今日动作", value: "先选状态，再做完一轮。" },
  { label: "做完后", value: "继续 / 留 witness / 桥接 OS" },
];

export const dailyLead =
  "这页不负责讲完整拉丁体系，只负责把今天这一轮收成一个能开始、能做完、能回来的入口。";

export const dailyEntryRail = {
  title: "今天从哪里开始 / 这一轮怎么做完",
  more: "先按状态进去，再把这一轮压成可回来的 witness",
  entry: {
    kicker: "ENTRY STATES",
    title: "入口状态",
    description: "先分清今天属于哪种开始状态，不先把自己扔进资料库。",
  },
  loop: {
    kicker: "DAILY LOOP",
    title: "Daily Loop",
    description: "先做完一个最小闭环，再决定是继续、归档，还是桥接到 Dance OS。",
  },
};

export const dailyMoves: MoveCardData[] = [
  { category: "通用", title: "状态分流", subtitle: "Entry States", leftMeta: "先判断", rightMeta: "低门槛" },
  { category: "通用", title: "4 步起步", subtitle: "Start Loop", leftMeta: "10-15 分钟", rightMeta: "1 个点" },
  { category: "路径", title: "Why Latin", subtitle: "Fit Check", leftMeta: "判断入口", rightMeta: "旧站映射" },
  { category: "路径", title: "Body System", subtitle: "Fix One Point", leftMeta: "卡点修复", rightMeta: "回流路径" },
  { category: "伦巴", title: "Weight Transfer", subtitle: "重心转移", leftMeta: "旧站 proof", rightMeta: "起步动作" },
  { category: "通用", title: "Cuban Motion", subtitle: "古巴律动", leftMeta: "节奏感", rightMeta: "高频主题" },
  { category: "恰恰", title: "Hip Action", subtitle: "胯部发力", leftMeta: "内容拆解", rightMeta: "切片友好" },
  { category: "路径", title: "直播回流", subtitle: "Return To Daily", leftMeta: "witness", rightMeta: "下一轮继续" },
  { category: "路径", title: "切片归档", subtitle: "Clip Archive", leftMeta: "内容资产", rightMeta: "副产品" },
  { category: "路径", title: "直播排期页", subtitle: "Day 2", leftMeta: "—", rightMeta: "—", locked: true },
];

export const dailyMoveGroups: MoveGroupData[] = [
  {
    id: "paths",
    label: "路径",
    description: "这些模块决定用户从哪里进、做完后回到哪里，以及下一轮如何继续。",
    shortDescription: "决定从哪里进、回哪里，以及下一轮怎么继续。",
    categories: ["路径"],
  },
  {
    id: "all",
    label: "全部",
    description: "先看全貌：Daily Latin 不是一堆内容页，而是一条从状态判断到下一轮回流的最小入口链。",
    shortDescription: "先看全貌：不是内容目录，而是从状态判断到下一轮回流的最小入口链。",
  },
  {
    id: "common",
    label: "通用",
    description: "这些模块不区分具体舞种，负责先把人送进今天能做完的一轮。",
    shortDescription: "不区分舞种，先把人送进今天能做完的一轮。",
    categories: ["通用"],
  },
  {
    id: "rumba",
    label: "伦巴",
    description: "这里放最适合拿来验证 Daily 入口的基础舞种样本，先证明起步链路成立。",
    shortDescription: "用基础舞种验证 Daily 入口链路是否成立。",
    categories: ["伦巴"],
  },
  {
    id: "cha",
    label: "恰恰",
    description: "这类内容更适合切片、回看和纠错，也更容易和后续 Dance OS 回流打通。",
    shortDescription: "更适合切片、回看和纠错，也更容易桥接到 Dance OS。",
    categories: ["恰恰"],
  },
];

export const dailyEntryCards: InfoCardData[] = [
  {
    day: "ENTRY 01",
    title: "完全没开始过",
    rows: [
      { label: "先做什么", value: "Why Latin / 适配判断" },
      { label: "目标", value: "先开始第一轮" },
    ],
    note: "先判断适不适合，不急着证明自己会不会跳。",
  },
  {
    day: "ENTRY 02",
    title: "断练后重启",
    rows: [
      { label: "先做什么", value: "4 步起步" },
      { label: "目标", value: "做完今天这一轮" },
    ],
    note: "别先补旧课，先把今天这一轮接回来。",
  },
  {
    day: "ENTRY 03",
    title: "已经有具体卡点",
    rows: [
      { label: "先做什么", value: "Body System / Fix One Point" },
      { label: "目标", value: "只修 1 个问题" },
    ],
    note: "别再泛泛复盘，先说清这次到底卡哪。",
  },
];

export const dailyFlowCards: InfoCardData[] = [
  {
    day: "LOOP 01",
    title: "先选状态",
    rows: [
      { label: "输入", value: "今天在哪种状态" },
      { label: "输出", value: "进入对应入口" },
    ],
    note: "先从今天怎么开始，不从资料库开始。",
  },
  {
    day: "LOOP 02",
    title: "做完这一轮",
    rows: [
      { label: "时长", value: "10-15 分钟" },
      { label: "约束", value: "只做最小闭环" },
    ],
    note: "先做完一轮，再决定要不要拉长计划。",
  },
  {
    day: "LOOP 03",
    title: "只留 1 个点",
    rows: [
      { label: "记录", value: "下一次只改哪里" },
      { label: "回流", value: "形成 witness" },
    ],
    note: "说不出下次先改哪，就还没形成 witness。",
  },
];

export const dailyLegacyPrinciples: InfoCardData[] = [
  {
    day: "PROOF 01",
    title: "先判断",
    rows: [
      { label: "旧站来源", value: "Why Latin" },
      { label: "现在作用", value: "先判断适不适合" },
    ],
    note: "旧站已经证明：起步前先判断。",
  },
  {
    day: "PROOF 02",
    title: "再开始",
    rows: [
      { label: "旧站来源", value: "Learning Path" },
      { label: "现在作用", value: "做完今天这一轮" },
    ],
    note: "有效的不是大计划，而是一轮可完成的开始。",
  },
  {
    day: "PROOF 03",
    title: "只修一个点",
    rows: [
      { label: "旧站来源", value: "Body System" },
      { label: "现在作用", value: "定位这次只改哪里" },
    ],
    note: "Daily 后续自然要回到 Body Map / Correction Ledger。",
  },
];

export const dailyBridgeCards: InfoCardData[] = [
  {
    day: "NEXT 01",
    title: "继续 Daily 这一轮",
    href: "/daily-latin?state=restart&dance=cha#today-loop-demo",
    rows: [
      { label: "适合现在", value: "断练后重启 / 还没做完今天这轮" },
      { label: "下一步", value: "先把同一轮做完，再留一句 witness" },
    ],
    note: "还没说清下次先改哪时，不要急着桥接 OS。",
  },
  {
    day: "NEXT 02",
    title: "直播 / 切片 回到 Daily",
    href: "/daily-latin?state=after-live&dance=rumba#live-return-bridge",
    rows: [
      { label: "适合现在", value: "刚看完直播 / 已经有一句想带回脚下" },
      { label: "下一步", value: "先把那一句带回这一轮，再判断要不要归档" },
    ],
    note: "内容不是结束，先让那一句重新回到练习里。",
  },
  {
    day: "NEXT 03",
    title: "已经能说清卡点，桥接 Dance OS",
    href: "/dance-os?state=body&profile=cha&focus=feet#correction-ledger-demo",
    rows: [
      { label: "适合现在", value: "已经知道是重心 / 髋 / 脚下 / 上身哪一层" },
      { label: "下一步", value: "把卡点压成 correction 和下一轮动作句" },
    ],
    note: "说清卡点后，就别继续停在 Daily 入口层。",
  },
];

export const dailySourceLeft = [
  { title: "直播计划", mini: "content-and-ip", value: "Daily 回流逻辑" },
  { title: "拉丁dance os构思", mini: "system-architecture", value: "入口骨架" },
  { title: "旧站 tagline", mini: "legacy proof", value: "起步 promise" },
  { title: "旧站 learning path", mini: "legacy proof", value: "4 步起步" },
] satisfies SourceRowData[];

export const dailySourceRight = [
  { title: "先判断", mini: "Why Latin", value: "不是所有人都先开练" },
  { title: "再开始", mini: "Start Loop", value: "10-15 分钟一轮" },
  { title: "只留 1 个点", mini: "next step", value: "把下次继续点留下" },
  { title: "回到 Body System", mini: "Dance OS bridge", value: "卡点要落回修正" },
] satisfies SourceRowData[];

export const dailyDemoStates = [
  {
    id: "first-time",
    label: "完全没开始过",
    compactLabel: "完全新手",
    note: "先收住“我会不会跳”的焦虑。",
    compactNote: "先收住“我会不会跳”的焦虑。",
    entry: "先判断为什么想学，不急着证明自己。",
    compactEntry: "先判断为什么想学。",
    goal: "先把身体带进第一轮。",
    compactGoal: "先把身体带进第一轮。",
    nextStep: "下次先重复同一入口。",
    compactNextStep: "下次先重复同一入口。",
  },
  {
    id: "restart",
    label: "断练后重启",
    compactLabel: "断练重启",
    note: "不是补旧课，是把身体和拍子接回来。",
    compactNote: "不是补旧课，是把身体和拍子接回来。",
    entry: "直接进这一轮，不先整理历史进度。",
    compactEntry: "直接进这一轮。",
    goal: "先把继续感接回来。",
    compactGoal: "先把继续感接回来。",
    nextStep: "下次先重复同一轮，再只加一个点。",
    compactNextStep: "下次先重复同一轮。",
  },
  {
    id: "stuck",
    label: "已经有具体卡点",
    compactLabel: "已有卡点",
    note: "别说“感觉不对”，先说清卡点。",
    compactNote: "别说“感觉不对”，先说清卡点。",
    entry: "先把问题说成一句动作句。",
    compactEntry: "先把问题说成一句动作句。",
    goal: "只修一个具体问题。",
    compactGoal: "只修一个具体问题。",
    nextStep: "下次先验证这个点，再决定是否桥接 OS。",
    compactNextStep: "下次先验证这个点。",
  },
  {
    id: "after-live",
    label: "刚看完直播 / 切片",
    compactLabel: "刚看直播",
    note: "直播看完不是结束，要把那一句带回脚下。",
    compactNote: "别继续围观，把那一句带回脚下。",
    entry: "把直播里最清楚的一句带回这一轮。",
    compactEntry: "把最清楚的一句带回这一轮。",
    goal: "让内容回到练习。",
    compactGoal: "让内容回到练习。",
    nextStep: "下次先复述今天那一句。",
    compactNextStep: "下次先复述今天那一句。",
  },
] satisfies DailyDemoStateData[];

export const dailyDemoDances = [
  {
    id: "rumba",
    label: "伦巴",
    cue: "先慢下来，让重心真的过脚。",
    focus: "最适合验证慢一点、清一点的起步。",
    compactFocus: "先慢一点，把重心真的过脚。",
    witness: "下次先确认重心有没有真的过脚。",
    compactWitness: "先确认重心有没有过脚。",
  },
  {
    id: "cha",
    label: "恰恰",
    cue: "让脚下边界和轻重更清楚。",
    focus: "最适合把拍子和脚下压成一轮可完成任务。",
    compactFocus: "先把脚下边界压清楚。",
    witness: "下次先守住 2-3-4&1 的边界。",
    compactWitness: "先守住 2-3-4&1 边界。",
  },
  {
    id: "samba",
    label: "桑巴",
    cue: "先让 bounce 小而稳。",
    focus: "先找连续节奏，而不是追大动作。",
    compactFocus: "先找连续节奏。",
    witness: "下次先把 bounce 做小做稳。",
    compactWitness: "先把 bounce 做小做稳。",
  },
] satisfies DailyDemoDanceData[];

export const dailyDemoTasks = [
  {
    id: "state",
    label: "先判断今天状态",
    compactLabel: "先定状态",
    hint: "先知道今天属于哪种开始状态。",
    compactHint: "先定今天属于哪种开始状态。",
  },
  {
    id: "round",
    label: "做完 10-15 分钟这一轮",
    compactLabel: "做完一轮",
    hint: "先完成最小闭环，不先做长计划。",
    compactHint: "先完成最小闭环。",
  },
  {
    id: "point",
    label: "只留 1 个点",
    compactLabel: "留1点",
    hint: "先留一个下次最值得继续的点。",
    compactHint: "只留一个下次继续点。",
  },
  {
    id: "witness",
    label: "写下回流 witness",
    compactLabel: "写回流",
    hint: "如果说不出下次先改哪里，这轮还没真正成立。",
    compactHint: "说不出下次先改哪，这轮还没成立。",
  },
] satisfies DailyDemoTaskData[];

export const dailyReturnModeSeeds = [
  {
    id: "live",
    label: "LIVE RETURN",
    compactLabel: "LIVE",
    title: "直播里的那一句，先带回今天这一轮",
    compactTitle: "直播句回这一轮",
    description: "别停在“看过了”，先把那一句带回脚下和身体。",
    compactDescription: "先把直播里的一句动作句带回这一轮。",
    cta: "回到 Daily Loop",
    variant: "brick",
    testId: "daily-return-live",
  },
  {
    id: "clip",
    label: "CLIP BRIDGE",
    compactLabel: "CLIP",
    title: "把这轮最清楚的点，留成下次可回看的 clip",
    compactTitle: "压成 clip 证据",
    description: "不是每一轮都要发内容，但至少要留下一条能接上的证据。",
    compactDescription: "不是每轮都要发内容，但至少留一条能接上的证据。",
    cta: "查看 Witness Archive",
    variant: "ghost",
    testId: "daily-return-archive",
  },
  {
    id: "bridge",
    label: "DANCE BRIDGE",
    compactLabel: "BRIDGE",
    title: "当你已经能说清卡点，就别继续停在入口层",
    compactTitle: "卡点桥接到 OS",
    description: "能说清是重心、髋、脚下还是上身时，就该桥到更具体的身体修正。",
    compactDescription: "能说清卡点时，就桥到更具体的身体修正。",
    cta: "桥接到 Dance OS",
    variant: "ghost",
    testId: "daily-bridge-dance-latest",
  },
] satisfies DailyReturnModeSeedData[];

export const dailyStageMetrics: StagePanelMetricData[] = [
  { label: "入口状态", value: "4" },
  { label: "主线舞", value: "3" },
  { label: "起步动作", value: "4" },
  { label: "回流方向", value: "3" },
];

export const dailyStageSignals: StagePanelSignalData[] = [
  { title: "先判断", detail: "先判断属于哪种开始状态，不把所有人推到同一入口。" },
  { title: "再开始", detail: "先把今天这轮做完，不先讲完整体系。" },
  { title: "再回流", detail: "直播、clip 和 Dance OS 都要回到下一轮。" },
];
