# 2026-07-29 latin-dance-game 收尾方案（best-minds 拆解 + 4 skill 审计）

## 背景
kimi 程序做到一半停了，已补完 4 项（教学模式 / 剪影预告 / 3D 特征+部位播报 / 肌肉发力地图）并推送 `EOMZON/LATINOS`。
本次用 best-minds + ux-service-audit + design-director + apple-design 收尾「其他内容」。

## 问题本质
4 个核心功能已建完，但**内容层与体验层仍留占位**：
1. 教学模式口令是「第 N 个动作，定格住」通用占位（lessonPlan.ts:12 / TeachScreen.tsx:307）——Break It Down 的教学价值落空。
2. 判定阈值只能靠真机标定——本环境无摄像头，无法实标（站位/胯转误差多少算 Good）。
3. 动效/反馈按 apple-design 标准仍有打磨空间（按钮无即时按压反馈、缺 reduced-motion、面板过渡可更克制）。

## 关键约束
- **本环境无真机摄像头** → 阈值标定权必须交还用户（游戏内可调灵敏度），不当场硬猜。
- 用户整体审美「低调奢华 / 低饱和克制」；游戏当前是三套紫色 skin（esports/light/stage）。**不擅自推翻 kimi 已确认的紫色 skin 体系**（用户未要求改配色），打磨聚焦在与配色无关的即时反馈 / 过渡 / 可访问性。
- 用户架构观：数据/内容/信息/表现层清晰分离 → 口令词汇表独立成 `danceVocab.ts`，灵敏度阈值映射独立可配。

## best minds（谁最懂，给什么）
- **教学口令**：拉丁舞运动科学 + STEEZY/Dance Central 课程范式。自动切段的关键动作无语义标签，硬编舞步名会伪造。正确做法：按**动作形态**（单脚支撑/旋转/侧向移步/胯部动作）生成专业身体引导口令（如「右侧重心，胯向左转」「定点转，留头甩头」），准确且不伪造。
- **阈值标定**：姿态估计工程。环境无摄像头 → 把灵敏度做成三档预设（严格/标准/宽松）映射到评分阈值，持久化 localStorage，用户本机跑摄像头自己标定。
- **动效/反馈**：Apple HIG（apple-design §1 即时响应、§14 reduced-motion）。按钮 `:active` 即时缩放、面板弹簧进入、尊重 `prefers-reduced-motion`。

## 推荐路径（其余内容 = 真正该补的）
- **P0 内容层**：舞步口令词汇表 `danceVocab.ts`——按关键动作形态生成专业口令，替换占位文案。
- **P1 架构层**：判定灵敏度游戏内可调——GameScreen 设置项三档，映射到评分阈值，持久化。
- **P1 表现层**：apple-design 即时反馈 + reduced-motion + 过渡打磨（不依赖摄像头，纯前端可验证）。
- **P2 服务层**：ux-service-audit 旅程复核——确认每状态有出路（教学模式逃生门/结算返回/自由模式退出/low-vis 信号），上一轮已确认无死胡同，本次顺带加固。

## 对抗性测试（反方）
- 口令会不会错标动作？→ 风险：自动切段无语义。对策：按形态生成运动科学语言，不伪造舞步名。
- 灵敏度可调是否让阈值失意义？→ 否，三档预设 + 默认标准档。
- 动效打磨是否引入回归？→ tsc + build + headless 冒烟逐块验证。

## 不推荐 / stop doing
- 不擅自改紫色 skin 体系配色（破坏 kimi 已确认视觉，用户未要求）。
- 不新增舞种（chacha/jive 占位保持）。
- 不做后端/排行榜（超出 demo 范围）。

## 提交计划（每块独立 commit + push）
1. `feat: 教学模式接入舞步口令词汇表(形态驱动,非伪造舞步名)`
2. `feat: 判定灵敏度游戏内可调(严格/标准/宽松 + localStorage)`
3. `style: apple-design 即时反馈 + reduced-motion + 过渡打磨`

## 验证
- 每块：tsc --noEmit + npm run build + headless 冒烟（进游戏/教学，0 JS 错误）。
- 灵敏度：headless 验证设置面板渲染、切换后 localStorage 持久化。
