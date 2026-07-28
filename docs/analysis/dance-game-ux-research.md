# 舞蹈跟练游戏 UX 调研：站位引导 / 教学流程 / 动作预告

> 日期:2026-07-28
> 触发:`apps/demos/latin-dance-game/` 实机反馈三个痛点
> A. 站位引导(离屏 2-3 米看不清提示,需要语音)
> B. 节奏太快,需要「先演示→再跟做」+ 动作预览
> C. 预告卡用骨骼线框图不可读,希望像 Just Dance 的人物剪影 pictogram

---

## 1. Just Dance 系列的 UX 机制

### 1.1 Pictogram 预告条
- 位置与形态:屏幕底部一条「pictogram bar」(圆角条,与歌词同色),预告图沿条从右向左滑动,滑到左侧三角标记(marker)的那一刻 = 动作发生的节拍点。
  [来源: Just Dance Wiki - Pictogram, https://justdance.fandom.com/wiki/Pictogram]
- 可见预告数量:条上始终同时显示接下来约 4-6 个 pictogram(取决于歌曲密度),给玩家约 2-4 拍的提前量。
- 表示法:Just Dance 2 起从手绘改为**基于 3D 模型渲染的纯色剪影**(内部昵称 "Pictoman"),之后历代沿用。纯平色、无细节、肢体轮廓夸张;配合辅助符号:方向箭头(移动方向)、圆形标记=戴手套的右手(防止交叉手混淆)、金色=Gold Move(高分动作)、跳跃时脚下投影。
  [来源: Just Dance Wiki - Pictogram / Trivia]
- 编排约束:编舞被要求「正面朝向、动作可读、大量重复、方正的乐句结构」,目的之一就是「让 pictogram 更清晰」。
  [来源: Dance Magazine《Real Dancers, Really Dancing: The Making of Just Dance 2024》]

### 1.2 Coach 形象
- **真人绿幕拍摄 + 后期描边/上色**,不是 3D 渲染也不是纯剪影:舞者穿全套服装化妆在绿幕前实拍,后期加描边和风格化处理。2024 版用了 38 名舞者、17 名编舞。
  [来源: Dance Magazine 2023-12;Sweden Herald 2024-12《From Song to Finished Dance》]
- 判定反馈词五档:PERFECT / SUPER(JD2018 加入,介于 GOOD 与 PERFECT 之间)/ GOOD / OK / X;Gold Move 命中为 YEAH。星级:5 星 → SUPERSTAR → MEGASTAR。
  [来源: Just Dance Wiki - Just Dance 2019 游戏文件;TV Tropes - Just Dance]
- 教学/练习模式:**主系列一直没有真正的练习模式**(只有 Kids Mode 简化编舞、JD2019 起选歌界面有视频预览)。这是 Just Dance 的公认短板,恰好是 Dance Central 的强项 → 见第 2 节。

### 1.3 Camera Controller(2023+ 相机评分)
- 2023-12 起 iPhone beta、2024-08 扩展 Android、2025 Edition 内置、2026 Edition 正式上线。手机相机 → 深度学习模型 → **3D 骨骼估计** → 与 coach 动作比对(距离、角度、朝向、运动轨迹)→ 全身评分。训练数据:9000 个动作录制,6000 训练 / 3000 测试,80% 自动通过率,其余 20% 由 Score Level Designer 人工调平衡。
  [来源: Ubisoft 官方博客《Revolutionising Motion Gaming: The Camera Controller Feature》2025-10;Xbox Wire 2025-10-14]
- 关键经验:官方强调「**能精确定位是哪个身体部位没跟上**」是相机评分相对手柄的核心价值;以及「玩家反复跳同一支舞时分数逐步上升」形成学习曲线。
- 对我们的意义:我们的 demo 用 MediaPipe/BlazePose 走的是同一条路(浏览器端 2D/3D 骨骼),官方验证了「骨骼比对→指出具体部位」这条反馈链是成立的。

## 2. Kinect 时代:Dance Central 系列

### 2.1 Break It Down 练习模式(痛点 B 的直接参考答案)
- 流程:整支舞**拆成若干 section** → 每个 move 单独教学:先演示,玩家跟跳;**失败可重复多次**;**可降速**(Dance Central Spotlight 支持降到 60% 速度);一个 section 全部通过后做一次 **recap**(把该段所有动作连起来跳一遍)。
  [来源: Dance Central Wiki;Game Informer 2010-11-03 评测;Harmonix 官方博客《Practice Makes Perfect in Dance Central Spotlight》2014-09-17]
- Flash cards:屏幕右侧出现**动作名 + 舞者剪影**的卡片,设计上做到「看一眼就能猜出动作」;同一动作在多首歌里复用,玩家逐渐认识这套「动作词汇表」。
  [来源: Game Informer 2010 评测]
- 即时纠错:做错的**对应肢体在 avatar 上变红**,一眼知道错在哪只手/脚。这正好对应痛点 A 里「哪只手/脚没被识别到」的诉求(视觉版)。
  [来源: Game Informer 2010 评测;Tap 'X' Rapidly DC2 评测]
- 语音:Dance Central 2 起支持**语音命令**控制练习(跳过/慢速/加速/重复);Spotlight 里随时喊 "Hey DJ, Practice That!" 立刻进入练习模式,练完自动回到歌曲断点。
  [来源: vgchartz Dance Central 2 评测 2011-10;Harmonix 博客 2014]

### 2.2 距离与 framing
- Kinect 360 官方要求 6-8 英尺(约 1.8-2.4 米),Xbox One Kinect 降到 1.4 米;传感器电动俯仰自动把人纳入画面。
  [来源: Engadget Kinect 评测 2010-11;Engadget 2013-10 Xbox One Kinect]
- 全身入镜引导:校准流程要求「站定、双臂侧平举(T-pose)、听确认音效」,逐步引导;失败则明确提示重来。
  [来源: Kinect 校准文档(ravbug Kinect Mocap / K2VR onboarding)]
- 反面教材:竞品 Dance Paradise 没有练习模式被评测点名批评——「没有 break it down 让你慢下来确认动作做对」是差评点。
  [来源: vgchartz Dance Paradise 评测 2011-04]

## 3. 舞蹈教学 App(STEEZY 等)的教学流程

STEEZY(1500+ 课程、100 万+ 下载)的播放器功能几乎是「线上舞蹈教学」的行业标准配置:
- **镜像开关(Mirror)**:一键切换镜像/非镜像,解决「教练的左手到底是我的哪只手」。
- **前/后双视角(Switch Views)**:正面学和背面学随时切换。
- **变速(Speed Control)**:快速脚步放慢到能跟上。
- **分段循环(Looping + Class Sections)**:课程预分段(带标签和时间戳),可选某一段无限循环死磕;媒体用户实测「把 16 秒编舞循环 11 分钟练到过」。
- **画中画自检(Camera Mode)**:摄像头画面与教练并排,实时对照自己。
  [来源: STEEZY 官方帮助中心《Taking a Class》2022-09;Billboard 2023-01;The Cut 2020-11;Women Love Tech 2021-07]
- 教学范式共识:「慢速分解 → 循环 → 原速」是线上舞蹈课的通用结构,评测普遍认为静态图示完全无法替代视频分解。

## 4. 远距离可用性(10-foot UI + 语音)

### 4.1 10-foot UI 字号/对比度规范
- 1080p 电视:正文 28px 是绝对下限(Amazon 规范),建议正文 28-36px、菜单 32-44px、标题 48-80px;Marvel 实践甚至标题 92px / 正文 24px,18px 只用于次要标签。
- 对比度:电视端要**远超 WCAG 4.5:1**——文本 ≥ 7:1,小元素 ≥ 10:1;避免细字重、浅色字;深底浅字;行高 150-170%。
  [来源: Alicia Design 2025-12;Marvel Blog《Designing for Television》2020;Android TV Design Guidelines;Smashing Magazine 2025-09]
- 换算到我们 demo:笔记本 13-16 寸屏在 2-3 米外的等效字号比电视更苛刻,所有「必须读」的信息按「隔一个房间能读」设计,做不到的就不该用文字传达 → 这正是语音引导的合理域。

### 4.2 体感游戏的语音/非视觉引导
- Ring Fit Adventure:动作到位时 Ring-Con **震动**,且**语音念出指令**(「hold」「release」用超大加粗字 + 语音);视障评测给「非视觉提示」打 10/10,特别指出「背对电视时语音格外有用」。
  [来源: Can I Play That 视障评测 2020-04]
- Dance Central 2/Spotlight:语音命令本身就是交互方式(见 2.1),说明 Harmonix 判断「玩家离屏远、手没空」时语音是自然通道。
- Kinect 校准则用**确认音效**(校准成功有专属 sound effect)代替文字反馈。

## 5. 动作预告表示法对比

| 表示法 | 制作成本 | 远距离可读性 | 说明 |
|---|---|---|---|
| 骨骼线框图 | 极低(直接从 pose 数据画) | **差**:线条细、无体块,2-3 米外只剩一团线 | 我们 demo 现状,用户反馈「看不出是什么动作」 |
| 剪影 pictogram | 低-中(可从参考视频帧做轮廓提取/预渲染) | **好**:实心体块、轮廓夸张、对比天然高 | Just Dance 与 Dance Central flash card 的共同选择 |
| 真人视频小窗 | 中(需要录参考视频) | 好,但小窗尺寸受限;与主画面竞争注意力 | STEEZY 的主方案(整屏就是视频) |
| 3D 角色 | 高(建模/绑定/动画) | 中-好 | Just Dance coach 实为实拍,非 3D;成本上无必要 |

**为什么两家都选剪影:**
1. 实心体块在余光/远距离下可辨识,线框不行(扫描的是「形状」不是「线条」);
2. 平色剪影去掉了服装、肤色等干扰,只剩「姿态」这个唯一信息;
3. 可以批量从 3D 模型/参考视频渲染,成本可控(Just Dance 内部直接叫 "Pictoman" 模型);
4. 可叠加辅助符号(方向箭头、Gold 高亮)而不破坏可读性。
  [来源: Just Dance Wiki;Game Informer DC 评测(flash card「simple-yet-clear」「看一眼就能猜出动作」)]

## 6. 结论:对三个痛点的建议

### 痛点 A(站位引导 / 语音)→ 两条
1. **校准式站位流程 + TTS 语音引导**:参考 Kinect 校准与 Ring Fit,进入游戏前做一个 3 步站位校准(「后退一点」「右手没入镜」),用 TTS 念出来,配超大字(按 10-foot 规范,标题级 ≥48px 等效、深底浅字、加粗)和确认音效;站位框匹配成功后给音效 + 「站位完成,准备开始」语音。依据:Kinect 6-8 英尺引导流程、Ring Fit 非视觉提示 10/10、10-foot UI 字号规范。
2. **游戏中实时部位级语音提示 + 肢体标红**:参考 Ubisoft Camera Controller「精确定位哪个部位没跟上」的官方经验与 Dance Central avatar 肢体变红——识别丢失/偏差时用一句话 TTS(「左手抬高一点」),同时画面上对应肢体高亮;判定词直接借用 PERFECT/SUPER/GOOD/OK/X 五档(用户已被 Just Dance 教育过,零学习成本)。

### 痛点 B(节奏太快 / 先学后跳)→ 两条
1. **加「教学段」前置:演示→慢速跟跳→原速**:完整复刻 Dance Central「Break It Down」:把 routine 按乐句分段,每段先完整演示一遍参考视频,再 60-70% 速度跟跳,失败允许重复,段落全过后 recap 连跳一次。依据:Break It Down 流程(DC Wiki/Harmonix 博客)、Dance Paradise 因缺练习模式被点名的反面教材、STEEZY「慢速+循环」标准配置。
2. **游戏内预告 = 提前 2-4 拍**:预告条至少显示接下来 4 个动作、在节拍点前约 2-4 拍进入视野,滑动到 marker 的瞬时 = 动作发生时刻(Just Dance pictogram bar 的成熟设计);教学模式下还可用「预告卡 + 动作名文字」(Dance Central flash card 的「动作词汇表」思路,拉丁动作名如「纽约步」「定点转」天然有名字)。

### 痛点 C(预告卡表示法)→ 两条
1. **预告卡从骨骼线框换成实心剪影 pictogram**:从参考视频帧批量提取人物轮廓(背景分割/绿幕/或 pose 驱动的剪影渲染),平色填充 + 轮廓夸张化,叠加方向箭头和高难度动作(对应 Gold Move)的金色高亮。依据:Just Dance "Pictoman"(JD2 起基于 3D 模型渲染)、Dance Central flash card 剪影「看一眼就能猜出动作」。
2. **演示用真人视频小窗/整屏,预告用剪影——分层使用**:教学环节的动作演示直接用参考视频(STEEZY 范式,信息最完整),游戏进行中的预告用剪影(余光可读、不抢主画面);不要指望一种表示法同时服务「学习」和「预告」两个场景。

---

### 来源清单
- Just Dance Wiki(Fandom): Pictogram / Just Dance 2019 / Just Dance Controller / Just Create
- Ubisoft 官方博客: Revolutionising Motion Gaming: The Camera Controller Feature (2025-10-28)
- Xbox Wire: Just Dance 2026 Edition: Go Hands-Free with the All-New Camera Controller (2025-10-14)
- Dance Magazine: Real Dancers, Really Dancing: The Making of Just Dance 2024 (2023-12-04)
- Sweden Herald: From Song to Finished Dance – This is How "Just Dance" is Made (2024-12-29)
- TV Tropes: Just Dance (Video Game)
- Dance Central Wiki(Fandom): Dance Central
- Game Informer: Dance Central Review (2010-11-03)
- Harmonix 官方博客: Practice Makes Perfect in Dance Central Spotlight (2014-09-17)
- vgchartz: Dance Central 2 评测 (2011-10) / Dance Paradise 评测 (2011-04)
- Tap 'X' Rapidly: Dance Central 2 Review
- Engadget: Kinect for Xbox 360 review (2010-11) / Xbox One Kinect shrinks minimum distance (2013-10)
- STEEZY 帮助中心: Taking a Class (2022-09)
- Billboard: Meet Steezy (2023-01);The Cut: The Dance App Steezy Taught Me to Dance in Heels (2020-11);Women Love Tech: Steezy Studio (2021-07)
- Can I Play That: Visually Impaired Review - Ring Fit Adventure (2020-04)
- Alicia Design: Solving small text and contrast issues for large-screen readability (2025-12)
- Marvel Blog: Designing for Television (2020-12);Android Developers: Style for TV;Smashing Magazine: Designing For TV Part 2 (2025-09)
