export type SystemModule = {
  id: string; index: string; title: string; short: string; description: string;
  examples: string[]; href: string; state: "building" | "next" | "planned";
};

export const systemModules: SystemModule[] = [
  { id: "path", index: "01", title: "学习路径", short: "今天先练什么", description: "从起步路线、单次 session 到阶段路径，让初学者知道下一步。", examples: ["起步路线", "阶段路径"], href: "/daily-latin", state: "next" },
  { id: "knowledge", index: "02", title: "拉丁知识库", short: "五支舞怎么理解", description: "五支舞的节奏、风格、共性差异与文化脉络。", examples: ["节奏风格", "共性差异"], href: "/tools", state: "next" },
  { id: "body", index: "03", title: "身体系统", short: "力量如何经过身体", description: "骨盆、脊柱、核心、脚踝、动作链与常见代偿。", examples: ["发力链", "身体地图"], href: "/force", state: "building" },
  { id: "lab", index: "04", title: "动作实验室", short: "把动作拆开验证", description: "动作卡、慢速讲解、并排对照、节奏与非真人参考。", examples: ["动作对照", "节奏演示"], href: "/dance-os", state: "next" },
  { id: "library", index: "05", title: "资料库", short: "知道去哪里继续找", description: "音乐、比赛、公开课程、文章与检索词的可搜索索引。", examples: ["音乐比赛", "公开资料"], href: "/tools", state: "planned" },
  { id: "archive", index: "06", title: "成长档案", short: "把练习留下来", description: "真实练习、复盘、session 归档与下一次回流。", examples: ["练习记录", "阶段复盘"], href: "/dashboard", state: "planned" },
];

export const prioritySignals = [
  { rank: "01", title: "身体系统 · 发力链", signal: "最高", state: "正在开发", detail: "先把“从哪里发力、为什么代偿”做成可观察、可练的专题。", href: "/force" },
  { rank: "02", title: "节拍、数拍与音乐", signal: "高", state: "下一批", detail: "把听懂节拍与动作时机接入知识库和动作实验。", href: "/dance-os" },
  { rank: "03", title: "基本步系统与学习路线", signal: "高", state: "下一批", detail: "为成人初学与重新起步提供明确顺序。", href: "/daily-latin" },
  { rank: "04", title: "居家短练与碎片练习", signal: "中高", state: "排队中", detail: "把知识压成能在家完成的短 session。", href: "/daily-latin" },
  { rank: "05", title: "资料、社区与成长档案", signal: "持续", state: "基础建设", detail: "保持完整架构，随内容和共创逐步补齐。", href: "/roadmap" },
];

export const sourceFlow = ["小红书反馈 / 需求信号", "飞书内容源 / 课堂转录", "结构化与复核", "公开知识与练习"];
