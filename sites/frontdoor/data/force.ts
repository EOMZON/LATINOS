export type ForceTopic = {
  id: string;
  number: string;
  dance: string;
  title: string;
  question: string;
  summary: string;
  chain: string[];
  cues: string[];
  compensations: string[];
  drill: { duration: string; title: string; steps: string[] };
  evidence: { label: string; status: "已整理" | "待专业复核"; sourceType: string };
};

export const forceTopics: ForceTopic[] = [
  {
    id: "rumba-pelvis-core",
    number: "01",
    dance: "伦巴 · 基础体态",
    title: "骨盆不是甩出去的：先把核心接上",
    question: "骨盆动作到底从哪里开始？",
    summary: "先建立脚下支撑和中段稳定，再允许骨盆在主力腿上发生变化。它不是孤立甩胯，也不是用塌腰换幅度。",
    chain: ["脚底压力", "主力腿", "骨盆前置", "中段收紧", "躯干延伸"],
    cues: ["耻骨轻轻上提，避免屁股向后撅", "肋骨和骨盆保持连接，不用顶肚子代替", "膝盖顺势让位，不抢着主动甩胯"],
    compensations: ["塌腰", "顶肚子", "夹臀过度", "只动胯不换重心"],
    drill: {
      duration: "60 秒",
      title: "墙前骨盆归位",
      steps: ["离墙一拳站立，双脚自然分开", "呼气时让肋骨回收、耻骨轻提", "左右换重心，保持腰背长度不变"],
    },
    evidence: { label: "2026-06-29 课堂转录归纳", status: "待专业复核", sourceType: "私有课堂 · 去身份化摘要" },
  },
  {
    id: "cha-weight-axis",
    number: "02",
    dance: "恰恰 · 重心与旋转",
    title: "先落重心，再决定旋转轴",
    question: "为什么一转身就飘，或者越跳越往后？",
    summary: "旋转轴不是上半身先拧出来的。先确认重量真正落在哪条腿，再让身体围绕那条主力腿完成方向变化。",
    chain: ["脚掌落地", "重量到位", "主力腿成轴", "骨盆转向", "躯干跟随"],
    cues: ["落地后先能抬起另一只脚，再开始转", "脚跟保持可控，不把重量死压向后", "行进方向向前延展，不用后退躲旋转"],
    compensations: ["上身抢转", "两脚平均承重", "脚跟压死", "后退换空间"],
    drill: {
      duration: "4 × 20 秒",
      title: "单脚轴心检查",
      steps: ["向前落一步并停住", "轻抬动力脚确认重心完整", "以主力腿为轴做四分之一转，再换边"],
    },
    evidence: { label: "2026-07-02 课堂转录归纳", status: "待专业复核", sourceType: "私有课堂 · 去身份化摘要" },
  },
  {
    id: "supporting-leg-to-free-leg",
    number: "03",
    dance: "伦巴 / 恰恰 · 行进",
    title: "主力腿扎根，动力腿才会自由",
    question: "腿要怎么动，才不是用小腿硬迈？",
    summary: "动力腿不是先冲出去。主力腿先完成承重和推送，骨盆形成张力后，动力腿才被带出；这个延迟让动作有来源。",
    chain: ["主力腿扎根", "脚底推地", "骨盆形成张力", "胯带动", "动力腿延迟移动"],
    cues: ["先确认站立腿稳定，再让另一条腿滑动", "移动趋势向上提拉，不做深蹲", "动力腿保持轻，落地前不提前承重"],
    compensations: ["动力腿抢步", "膝盖大幅下沉", "两腿同时发力", "小腿踢出去"],
    drill: {
      duration: "90 秒",
      title: "延迟半拍的 Walk",
      steps: ["单腿承重，另一脚尖点地", "数 1 完成主力腿推地与骨盆变化", "数 and 再让动力腿贴地滑出"],
    },
    evidence: { label: "2026-07-03 / 08-03 课堂转录归纳", status: "待专业复核", sourceType: "私有课堂 · 交叉归纳" },
  },
  {
    id: "samba-floor-force",
    number: "04",
    dance: "桑巴 · Bounce",
    title: "Bounce 来自地板，不来自上下蹲",
    question: "桑巴为什么越跳越沉，膝盖还累？",
    summary: "脚底先给地板压力，腿部回弹与骨盆变化接续发生。视觉上的上下不是主动蹲出来的，而是动力链的结果。",
    chain: ["前脚掌压力", "膝踝弹性", "主力腿推地", "骨盆回收", "核心保持长度"],
    cues: ["膝盖方向跟脚尖一致，不超过脚尖去压", "踩直是在蓄力，不是锁死关节", "上半身保持安静，核心像一根有弹性的柱子"],
    compensations: ["主动深蹲", "膝盖内扣", "上身跟着颠", "脚底没有压力"],
    drill: {
      duration: "3 × 30 秒",
      title: "无音乐脚底回弹",
      steps: ["双脚平行，先感受前脚掌压力", "小幅屈伸膝踝，不追求高度", "加入左右换重心，保持头顶高度变化最小"],
    },
    evidence: { label: "2026-07-24 / 07-31 课堂转录归纳", status: "待专业复核", sourceType: "私有课堂 · 交叉归纳" },
  },
  {
    id: "torso-opposition",
    number: "05",
    dance: "五舞种共性 · 身体对抗",
    title: "胯在走，胸廓不是被拖着走",
    question: "为什么动作有幅度，却看起来散？",
    summary: "核心不是把身体冻住，而是在骨盆与胸廓之间建立可控对抗。肩胛、胸廓和骨盆按顺序参与，动作才既有幅度又不散架。",
    chain: ["脚下支撑", "骨盆方向", "腹斜肌连接", "胸廓对抗", "肩胛延伸"],
    cues: ["想象胸、腰、胯是相连但可分层的转盘", "手臂先保持安静，确认旋转来自躯干", "肩膀向后延伸，不用耸肩制造幅度"],
    compensations: ["手臂带身体", "肩膀耸起", "胸胯同向整块转", "核心完全僵硬"],
    drill: {
      duration: "2 分钟",
      title: "手臂静止的对抗转",
      steps: ["双手轻放肋骨，左右换重心", "骨盆变化时让胸廓保持延伸", "最后加入肩胛和手臂，幅度不超过可控范围"],
    },
    evidence: { label: "2026-07-24 / 07-27 / 08-03 归纳", status: "待专业复核", sourceType: "私有课堂 · 多节交叉归纳" },
  },
];

export const forcePrinciples = [
  { label: "可观察动作", value: "能从视频或练习中看到的身体变化" },
  { label: "教学提示", value: "帮助找到动作的 cue，不冒充唯一生物力学结论" },
  { label: "主观体感", value: "明确标为体验，不把个人感觉写成医学事实" },
  { label: "专业复核", value: "首版内容均待拉丁专业教师复核后升级状态" },
];
