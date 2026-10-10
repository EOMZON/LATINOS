# 拉丁独立域内容站与 AdSense 重构参考

> 日期：2026-08-19
> 状态：重构决策稿，不代表已部署、已申请或已通过 Google 审核
> 适用范围：LATINOS 公开学习站、内容生产、专业复核、分析事件与未来 AdSense 申请
> 不包含：Vercel 数据拉取实现、生产域名切换、广告代码上线

## 0. 先给结论

只新增并经营 **一个独立注册主域名**，把它做成“成人初学与重新拾起拉丁舞的居家短练习站”。不要把当前 LATINOS 工作台原样绑定到新域，也不要同时为 Prompt、UX、Webdesign 等方向继续买域名。

这个选择成立，不是因为“拉丁”天然更容易过审，而是因为它在现有资产中最容易同时形成四项能力：

1. 第一方经历：真实重学、练习和复盘，而不是通用知识改写；
2. 可持续素材：课堂记录可以经过匿名化、重写和复核后形成练习单元；
3. 已知受众：自媒体反馈已经出现成人居家、数拍、基本步、重拾与陪练需求；
4. 可验证行为：用户能否开始、完成、复练，比单纯阅读量更容易证明真实价值。

这里讨论的是 **Google AdSense（网站挂广告获得收入）**，不是 Google Ads（花钱投放广告）。

新域名只解决品牌与整站边界，不会自动提高审核通过率，也不会继承 `zondev.top` 的历史信号。真正决定申请质量的是：站点目的是否单一、内容是否原创完整、技术与版权是否干净、导航是否清楚，以及是否已经有真实用户使用。

## 1. 申请域名到底是什么意思

### 1.1 首次填写的是标准主域，不是子域名或路径

Google 当前官方说明要求输入不含路径、参数、片段或端口号的标准域名，并把 `subdomain.example.com` 列为无效示例；普通子域名仅对 Blogger 等托管合作伙伴例外。因此首次申请应提交类似 `brand.com` 的注册主域，而不是 `latin.zondev.top`，也不是 `brand.com/blog`。见 [创建 AdSense 账号时如何输入网站网址](https://support.google.com/adsense/answer/2784438?hl=zh-Hans)。

这正好支持本项目的选择：若明确排除 `zondev.top` 个人实践总域，就为拉丁公开站购买一个真正独立的主域，而不是继续增加 `*.zondev.top`。

### 1.2 一个发布商账号可以管理多个站，但每个新站都要审核

Google 规定每个发布商通常只能有一个 AdSense 账号；增加网站应使用现有账号，而不是为每个域名新开账号。见 [如果您需要多个 AdSense 账号](https://support.google.com/adsense/answer/9729?hl=zh-Hans)。

每个新站仍需在 AdSense 的“网站”列表中添加、验证所有权并申请审核，审核通过、状态变成“就绪”后才可展示广告。官方说该检查通常需几天，个别情况可能需 2–4 周。见 [向 AdSense 网站列表中添加新网站](https://support.google.com/adsense/answer/12169212?hl=zh-Hans)。

### 1.3 本项目的域名策略

- 只买一个主域，90 天内不再开第二个内容变现域；
- 公共品牌可以与内部工程名 `LATINOS` 不同；“Latinos”容易被理解成拉丁美洲人群，不应未经品牌验证就直接作为消费者域名；
- 名称应能表达“拉丁舞、成人练习、重新开始”中的至少一个核心含义；
- 避免具体教师体系、赛事组织、音乐平台或他人商标；
- 域名确定后，先建立 canonical 和 Search Console，再发布稳定内容；不要为了测试多个名字来回迁移；
- 买域不等于立即申请。先完成本文的内容、复核与需求验证门槛。

## 2. 当前重构现场：什么能保留，什么不能直接公开

截至 2026-08-19，仓库主线为 `main`，当前可见重构节点包括：

- `e004408`：恢复完整 Latin Dance OS 首页；这是当前 Next runtime 的主要形态；
- `d533f28`：新增首页视觉方向实验室；它目前还是独立静态实验，没有接入 `sites/frontdoor` runtime；
- 当前 `sites/frontdoor` 有 9 个 route，而不是状态页写的 8 个。

### 2.1 当前公开面还像内部工作台

现有 route 包括：

```text
/
/force
/daily-latin
/dance-os
/dashboard
/legacy
/tools
/roadmap
/about
```

主要问题：

- 全站被 `WorkbenchShell` 包住，站点 metadata 仍是 `LATINOS · 工作台`；
- 首页重点是系统地图、模块状态、来源管线和 GitHub，而不是用户今天要解决的问题；
- `/tools`、`/roadmap`、`/dashboard`、`/legacy` 混入公众可部署面；
- `/dance-os` 还存在 `127.0.0.1` 本机 demo 入口；
- `/dashboard` 是静态项目状态，不是线上用户分析看板；
- 尚缺完整的 sitemap、robots、canonical、404、Privacy、Terms、Editorial、Safety 等公开站基础；
- `/force` 的 5 个单元全部仍标记“待专业复核”。

因此：**当前 frontdoor 不能原样作为新主域的 AdSense 申请站。**

### 2.2 值得保护的已有成果

重构不是推倒重做，以下资产应保留：

- Daily 的“选择状态 → 做完一轮 → 留一个点”交互闭环；
- query deep link、localStorage witness、Daily → Dance bridge；
- Force 的动作链、cue、代偿、练习和来源层级；
- “待专业复核”状态及不同教学体系并列原则；
- 旧站并行、preview-first 和迁移 gate；
- route、structure、browser smoke，尤其移动端溢出、deep link 和 witness bridge 断言；
- `d533f28` 视觉实验室的 A/B/C/D 方向和截图；
- 当前系统地图作为项目架构证据，但应留在内部 workbench/preview。

## 3. 新公开站的产品定义

### 3.1 核心受众

优先只服务以下三类人：

1. 成年后第一次学拉丁舞、无法长期上课的人；
2. 小时候或此前学过，停练后想重新拾起的人；
3. 已经上课，但在数拍、重心、发力或基本步细节上反复卡住的人。

首发阶段不同时服务教师、少儿竞赛选手、专业舞者、赛事观众、音乐收藏者和健身泛人群。

### 3.2 用户任务

> 在 5–10 分钟内，看懂一个具体问题，完成一轮不依赖器械的安全练习，并知道下一步练什么。

页面应该围绕“今天修一个点”，而不是证明系统有多庞大。

### 3.3 首发承诺

建议首页直接使用接近以下语义的文案：

```text
成人初学与重新拾起拉丁舞的短练习

今天只解决一个问题。
在 5–10 分钟内，看懂一个动作，完成一轮练习。

[开始今天的 5 分钟练习]
```

首页随后只给三个高频问题入口：

- 我不知道力量从哪里来；
- 我听得到音乐，但数不清拍；
- 我学过基本步，回家就忘。

### 3.4 明确不做什么

- 不做“54 个动作卡 + 82 首歌 + 若干工具”的大目录；
- 不把私人课堂转录包装成公开文章；
- 不声称摄像头能测量肌肉发力、诊断体态或治疗伤病；
- 不用 AI 批量扩写动作百科；
- 不以工具、播放器、计时器或骨骼 demo 作为首申主体；
- 不把内部 roadmap、构建状态和 GitHub 当作公众首页价值。

## 4. 公开站与内部工作台的架构边界

### 4.1 推荐结构

产品上只有一个公开品牌站；代码上允许在同一仓库内隔离“公开投影”和“内部工作台”：

```text
私有来源
Feishu / 课堂记录 / legacy proof
        ↓ 去身份、重写、事实核查、专业/安全/版权复核
内容契约
reviewed public content + rights ledger + correction log
        ↓
公开学习站（唯一新域）
首页 / 内容解释 / 无广告练习 / 信任页
        ↓ 仅发送去敏事件
分析层
Vercel Analytics + Search Console + UTM

内部工作台（preview 或受保护）
OS map / roadmap / dashboard / tools / legacy / source links
```

### 4.2 两种实现选择

**A．推荐：同仓库新增公开投影 app，当前 frontdoor 继续做 preview/workbench。**

优点是新域整站边界最干净，不需要为了公众首页覆盖已有 OS 工作台，也不容易把 Feishu、本机链接、状态页或待复核内容误发到生产域。

注意：当前仓库标准把 `sites/frontdoor` 定为前台入口。若采用新 app（例如 `sites/publisher`），应先写一条架构决策记录并同步 repo 标准，不能悄悄改变 canonical path。

**B．可接受：同一个 Next app 使用 public/ops route groups 与独立 layout。**

条件是生产域在构建或 host 层根本无法访问 ops route。只加 `noindex` 不够，因为 AdSense 审核和用户仍可能访问这些页面。

无论选 A 或 B，都不应删除现有工作台，也不应在没有 preview 验证时切换旧生产域。

## 5. 公开信息架构

### 5.1 首发 P0

页头最多保留四个一级入口：

```text
今天练习 | 发力 | 学习 | 关于
```

完整路由建议：

```text
/
├── /start
├── /force
│   └── /force/[topic-slug]
├── /practice/[drill-slug]
├── /rhythm/[slug]
├── /rumba/[slug]
├── /why-latin/[slug]
├── /about
├── /method
├── /editorial-and-review
├── /sources-and-rights
├── /safety
├── /corrections
├── /contact
├── /privacy
└── /terms
```

“学习”页内再进入节拍、伦巴、为什么拉丁和练习记录，避免页头一次放六个同权栏目。

### 5.2 P1：有真实行为后再做

- `/practice/today`：复用 Daily 的状态分流；
- `/progress`：仅当它变成学习者自己的本地进度，而不是项目状态；
- 更完整的 Rhythm 与 Basics cluster；
- 原创自拍或原创图解的难度切换；
- 公开纠错提交与版本记录。

### 5.3 P2：需求验证后再做

- 节拍器、计时器、音乐 finder；
- 动作库与可筛选 library；
- 账号、跨设备同步与社区；
- 摄像头、pose、Skeleton、game；
- 课程、活动或教练协作。

## 6. 首发 12 个实质页，8 周扩到 16 个

以下数字是为了让项目避免“六篇薄内容就申请”而设的 **内部准备门槛**，不是 Google 公布的文章数要求。

### 6.1 W1–W6：12 个必须完成的实质页

| # | 路由 | 用户问题与内容 | 现有来源 | 发布门槛 |
|---|---|---|---|---|
| 1 | `/start` | 新手、断练重启、已有卡点、刚看直播四种入口 | `daily.ts`、旧 learning path | 练习部分完成专业与安全复核 |
| 2 | `/practice/restart-10-minutes` | 成年人断练后的 10 分钟重启 | Daily Loop、旧入门文章 | 重写并给出停止条件与简化版 |
| 3 | `/force/rumba-pelvis-core` | 伦巴骨盆、脚下支撑与中段连接 | 2026-06-29 私有课堂摘要 | 专业、安全、版权三关通过 |
| 4 | `/force/cha-weight-axis` | 恰恰重心落稳与旋转轴 | 2026-07-02 私有课堂摘要 | 专业、安全、版权三关通过 |
| 5 | `/force/supporting-leg-to-free-leg` | 主力腿到动力腿的行进链 | 两节课堂交叉摘要 | 专业、安全、版权三关通过 |
| 6 | `/force/samba-floor-force` | Samba Bounce 与地板回弹 | 两节课堂交叉摘要 | 膝踝风险专项复核 |
| 7 | `/force/torso-opposition` | 骨盆、胸廓、肩胛之间的对抗 | 三节课堂交叉摘要 | 不作肌肉激活或绝对生物力学结论 |
| 8 | `/practice/home-small-space` | 小空间、低设备的居家练习 | 小红书需求、已审校 drill | 只组合已通过复核的动作 |
| 9 | `/rhythm/counting-latin` | 初学者如何听拍、数拍和落脚 | 小红书需求、旧恰恰文章 | 按舞种区分并专业复核 |
| 10 | `/rhythm/bpm-vs-mpm` | BPM、MPM 和练习速度的区别 | Latin Music 指南 | 不声称已有逐首实测 BPM |
| 11 | `/practice/after-class-one-correction` | 下课后只保留一个 correction 的复练法 | Daily/Dance OS、匿名摘要 | 无身份、无私人记录链接 |
| 12 | `/rhythm/choose-practice-music` | 不依赖歌单也能选择练习音乐 | 现有 practice pack 方法 | 迁方法，不迁播放器和曲库目录 |

### 6.2 W7–W8：扩展 4 页

| # | 路由 | 用户问题与内容 | 现有来源 | 发布门槛 |
|---|---|---|---|---|
| 13 | `/rumba/first-lesson` | 第一次练伦巴先看什么 | Rumba Beginner Guide | 去第三方视频依赖与私人链接 |
| 14 | `/rumba/walk-weight-transfer` | Rumba Walk 的重心经过过程 | Force、Rumba Guide、课堂摘要 | 专业/安全复核，优先自拍示范 |
| 15 | `/why-latin/body-training-not-labels` | 拉丁首先是一种身体训练 | 旧站 2026 原创文章 | 补第一方经历与来源核查 |
| 16 | `/why-latin/rules-boundaries-safeguarding` | 规则、身体边界与保护制度 | 旧站文章、公开治理资料 | 复核资料时效与表述边界 |

### 6.3 不计入 12–16 页，但上线前必须存在的信任页

- About：作者是谁、为何做、能力边界；
- Method / Editorial & Review：如何从记录变成公开内容；
- Sources & Rights：来源层级、许可、第三方内容原则；
- Safety：居家练习边界与停止条件；
- Corrections：如何报告错误、版本如何修订；
- Contact、Privacy、Terms；
- 自定义 404，不出现空栏目、coming soon 或登录死路。

作者身份应诚实写成“学习者、实践者和内容整理者”。若没有相应资质，不自称专业教师；专业结论由明确角色的复核者承担。

## 7. 每个实质页的内容契约

建议把以下字段固化为 schema，而不是依靠每篇作者记忆：

```yaml
identity:
  id:
  slug:
  title:
  description:
  author:
  audience:
  search_intent:
  dance:
  movement:
  level:
  duration:
  equipment:
  space:

content:
  question:
  outcome:
  prerequisites:
  observable_actions: []
  teaching_cues: []
  subjective_sensations: []
  force_chain: []
  common_compensations: []
  drill:
    duration:
    steps: []
    success_checks: []
    stop_conditions: []
    easier_version:
    harder_version:
  first_party_note:
  next_pages: []

evidence:
  source_type:
  public_references: []
  private_source_ids: []
  teaching_system:
  claim_limits:

review:
  editorial: { status:, reviewer:, date: }
  dance_professional: { status:, reviewer:, date: }
  safety: { status:, reviewer:, date: }
  fact_check: { status:, date: }

rights:
  text_license:
  media_owner:
  media_license:
  commercial_use:
  attribution:
  rights_status:

privacy:
  deidentified:
  private_links_removed:
  identifiable_people_removed:

publication:
  status:
  canonical:
  indexable:
  ads_eligible:
  published_at:
  updated_at:
  correction_log: []
```

### 7.1 不要只用一个 `reviewed` 布尔值

至少分开：

1. `draft`；
2. `editorial-approved`；
3. `professional-reviewed`；
4. `safety-reviewed`；
5. `rights-cleared`；
6. `published`。

发布规则：

- 动作、发力和练习页必须专业、安全、版权三项全部通过，才进入 sitemap；
- 待复核内容可留在 preview，但不得进入 canonical 生产内容和广告 allowlist；
- 文化、个人经历文章不一定要求动作专业复核，但必须做事实与来源核查；
- 页面向用户显示来源类型、复核角色、最后复核日期与纠错入口；
- 私有来源只保留内部 ID，不把本地路径、Feishu 或 Minutes URL 写入公开构建；
- 不同教学体系可并列，不包装成“唯一正确答案”。

## 8. 页面体验规格

### 8.1 首页

首页只完成四件事：

1. 说明给谁；
2. 让用户选择今天的状态或问题；
3. 展示已经通过复核的练习；
4. 说明内容如何产生、为什么可信。

主 CTA 只有一个：“开始今天的 5 分钟练习”。

不要展示 `BUILDING / PLANNED / NEXT`、六张同权系统卡、source pipeline 或路线图。GitHub 可以放页脚，不承担主要转化。

### 8.2 解释型内容页

固定阅读顺序：

1. 问题标题；
2. 适合谁、阅读/练习时长、复核状态；
3. 一句话结论；
4. 动作或发力链图；
5. 3–5 个可观察节点；
6. 教学 cue 与主观体感分栏；
7. 常见代偿；
8. 安全边界；
9. 进入练习 CTA；
10. 来源、体系边界、复核日期、纠错记录和关联内容。

### 8.3 练习页

只做三段：准备、跟练、确认。

完成后的反馈不只允许“成功”，而应提供：

- 已完成；
- 没理解；
- 太难；
- 不舒服。

系统只给一个下一步：继续、降级、回看解释或停止。自由文本应可选并默认只存本地，不进入分析事件。

### 8.4 移动端与无障碍

- 主要按 390–430 px 手机宽度设计，同时验证 320、768、1440；
- 点击目标至少约 44 px；
- 不自动播放音乐或视频；
- 手机锁屏/切后台后能暂停和恢复；
- 支持 `prefers-reduced-motion`；
- 图解必须有文字等价说明，不能只靠颜色或肌肉高亮；
- localStorage 不可用时仍能完成一次练习，只是无法保存本地记录。

## 9. 视觉方向：把 d533 实验变成公开产品，而不是系统海报

现有视觉实验已经给出可用组合：

- A：动作教练式首屏，用真实动作与明确 CTA 建立任务；
- B：身体触点/动作链，服务 Force 内容的理解；
- C：零基础、重拾、在家练三类入口；
- D：胶片/动作序列，只用于动作或节拍详情页。

建议采用浅米白或纸张感背景、黑色正文和一个克制的强调色。首页应先看到人、动作和问题，不能让抽象圆环、大标题或玻璃装饰挤掉核心内容。

上线前还需为视觉实验里的每张人物图、身体图和 AI 生成素材建立权利记录。未经复核的英文解剖标签、肌肉图和生物力学描述不能直接作为公开事实。

## 10. 现有资产迁移表

| 现有资产 | 处理方式 | 原因 |
|---|---|---|
| 当前 `/` 六模块系统地图 | 保留在 preview/workbench，可映射为内部 `/os-map` | 是架构证据，不是公众任务首页 |
| `/force` 五个锚点 | 拆成 5 个独立 canonical 页面 | 形成可阅读、可索引、可复核的完整单元 |
| `/daily-latin` | P1 复用为 `/practice/today` | 有真实状态分流和练习闭环 |
| `/dance-os` | 先留内部/preview | 当前是状态纠正 demo，不是动作识别产品，且有本机链接 |
| `/dashboard` | 内部保留；只有变成用户进度才做 `/progress` | 当前不是线上分析，也不是学习者价值 |
| `/tools`、`/roadmap`、`/legacy` | 移出公开导航和生产域 | 内部语言、历史迁移和构建状态会稀释整站目的 |
| 当前 `/about` | 重写 | 从 IP/项目边界改为作者、受众、方法与责任边界 |
| 旧站 3 篇 2026 反污名/边界文 | 合并重写为 2 篇 Why Latin | 原创性强，但需补经历与来源更新 |
| 旧站 3 篇 2025 入门/恰恰/伦巴文 | 只取问题，不原样迁移 | 当前偏薄，需加入第一方过程、练习和复核 |
| 54 张动作卡 | 首申不迁 | 已发现 Rumba Basic Step 出现 `2-3-4&1` 等待核问题 |
| Latin Music 82 条目录 | 首申不迁 | 第三方播放器/聚合风险；Samba、Paso 数据也不完整 |
| Latin Music BPM/MPM 方法 | 重写为 Rhythm 内容 | 搜索意图明确，且可做原创解释 |
| Rumba Beginner Guide | 压缩重写为 2 个核心页 | 删除 25 个第三方视频依赖和私人 Capture 链 |
| Source Policy | 迁为 Sources & Rights / Editorial | 能增强版权、来源和纠错可信度 |
| 节拍器、计时器、Skeleton、pose、game | 作为 P2 支持工具 | 不让工具薄页承担首申内容价值 |

迁移原则是“提炼并重写”，不是批量复制旧页面。

## 11. 来源、隐私、版权与安全边界

### 11.1 可以公开

- 重新写作后的第一方学习经历和练习复盘；
- 自制图解、自拍且具有商业使用权的演示；
- 去身份化、无法还原个人的课堂观察；
- 经过复核的短练习；
- 对公开资料的有限引用、链接与原创分析；
- 公开内容的纠错记录和版本变化。

### 11.2 不能公开

- 原始课堂转录、老师或同学身份、声音、肖像；
- 私人 Capture、Minutes、Feishu 链接和本地路径；
- 付费课程内容或可还原教师独特材料的复制；
- 未经许可的音乐、教学视频、截图和平台素材；
- 摄像头帧、姿态点位、自由文本练习笔记；
- 把教学 cue 写成医疗诊断、治疗结论或唯一生物力学事实。

仓库现有 [CONTENT-LICENSE.md](../../CONTENT-LICENSE.md) 已明确排除私有 Minutes、身份信息和第三方音乐/媒体，重构必须延续这一边界。

### 11.3 每个 drill 内置安全说明

不能只在页脚放一句免责声明。练习本身应说明：

- 清空并确认防滑空间；
- 当前疼痛或受伤时不跟练；
- 出现疼痛、眩晕、麻木或失稳立即停止；
- 提供更容易版本，不鼓励为了完成计时强撑；
- cue 是教学线索，不等于肌肉测量、诊断或治疗；
- 需要个体纠正时应向合格教师或医疗专业人士求助。

## 12. 从自媒体到练习完成的服务链

```text
小红书/公众号/短视频/Google 搜索
        ↓ 带具体问题与唯一 UTM 的落地页
解释页：这是不是我的问题？
        ↓
练习页：我能否安全完成？
        ↓
完成 / 不理解 / 太难 / 不舒服
        ↓
一个下一步：复练、降级、回看或停止
        ↓
7 日内回访 / 咨询 / 内容纠错
```

### 12.1 关键失败恢复

| 失败 | 用户界面处理 | 后台/内容处理 |
|---|---|---|
| 自媒体 App 丢失 referrer | 每条内容使用独立落地 URL/二维码 | 用 UTM，不把 direct 猜成自然搜索 |
| 视频或音频加载失败 | 文字步骤和静态图仍可完成 | 媒体是增强，不是内容唯一载体 |
| localStorage 不可用 | 允许无记录完成 | 不阻塞主任务 |
| 练习太难 | 一键切换更容易版本 | 记录枚举原因，不收敏感自由文本 |
| 用户不舒服 | 立即停止，不推荐继续 | 不作健康推断，不上传疼痛描述 |
| 专业复核否定内容 | 页面撤出公开面或回到 preview | 从 sitemap、canonical、广告 allowlist 一并移除 |
| 内容无下一步 | 回到问题选择器 | 修正内部链接和内容 cluster |

## 13. 分析事件与归因合同

Vercel 数据采集与定期拉取由另一条工作流处理；本项目只定义哪些公开行为值得记录。

### 13.1 UTM

每条自媒体内容使用唯一 `utm_content`：

```text
?utm_source=xiaohongshu
&utm_medium=organic_social
&utm_campaign=latin_8week
&utm_content=<post-or-topic-slug>
```

公众号、抖音、Bilibili、二维码分别使用 `wechat`、`douyin`、`bilibili`、`qr`。不要把 Vercel 的 direct/空 referrer 自动称为 Google organic；只有 Google referrer 或 Search Console clicks/queries 才能支持“Google 自然搜索”判断。

### 13.2 P0 事件

| 事件 | 最小参数 | 用途 |
|---|---|---|
| `content_view` | `content_id`, `pillar`, `review_status` | 哪类完整内容被看见 |
| `problem_select` | `problem_id`, `entry_point` | 用户真正选择的问题 |
| `drill_start` | `drill_id`, `difficulty` | 阅读是否转成行动 |
| `drill_complete` | `drill_id`, `difficulty` | 核心价值指标 |
| `drill_abort` | `drill_id`, `reason_enum` | 找到过难、不清楚或不适 |
| `next_action_select` | `from_id`, `action_type` | 内容闭环是否成立 |
| `practice_resume` | `drill_id`, `days_since_last` | 是否形成复练 |
| `source_open` | `content_id`, `source_type` | 用户是否关心依据 |

P1 再增加：`share_link_copy`、`safety_open`、`difficulty_downgrade`、`correction_submit`、`social_outbound`。

### 13.3 严禁进入分析的数据

- 原始 witness 或自由文本；
- 课堂转录、老师/同学身份；
- Feishu、Minutes、本地路径或内部 source ID；
- 摄像头帧、pose 点位、音频；
- 疼痛描述、健康信息和个人身份；
- raw prompt、token 或任何私密 URL；
- 自定义“广告点击”事件。广告点击由 AdSense 自身统计，不能自行诱导或重复测量。

### 13.4 指标优先级

```text
练习完成率
> 合格落地访问 → 开始练习率
> 下一步选择率
> 7 日回访 / practice resume
> 真实咨询、加入、纠错
> Search Console 非品牌 impressions/clicks
> 阅读深度
> PV
```

## 14. AdSense 设计边界

Google 公开要求强调高质量原创内容、受众价值、清晰导航与政策合规，并提醒谨慎使用外部文章或嵌入视频；当前帮助页没有公布最低文章数、最低流量、固定字数或明确域龄门槛。见 [AdSense 资格要求](https://support.google.com/adsense/answer/9724?hl=zh-Hans) 与 [确保网页符合使用要求](https://support.google.com/adsense/answer/7299563?hl=zh-Hans)。

Google 发布商政策也不允许在没有发布商内容、低价值、施工中、纯导航或行为用途的屏幕上投放广告。见 [无发布商内容的屏幕政策](https://support.google.com/publisherpolicies/answer/11112688?hl=en)。

### 14.1 可投放页面：显式 allowlist

首期只允许：

- 已完整复核的 `/force/[slug]` 长文解释页；
- 后续成熟的 `/rhythm/[slug]`、`/rumba/[slug]`、`/why-latin/[slug]`；
- 页面已达到完整阅读价值，广告仅在一段完整内容之后、文末或桌面侧栏。

建议 schema 使用：

```text
monetization: content
ads_eligible: true
```

只有同时满足 `published + indexable + rights-cleared + required reviews` 才能进入 allowlist。

### 14.2 明确不投放

- 首页 hero、问题卡与主 CTA 周围；
- `/start`、所有 `/practice/*`、`/progress`；
- 节拍器、计时器、播放器、camera、pose、Skeleton、game；
- 导航、表单、视频控制、完成按钮和下一步按钮附近；
- Safety、Sources、Corrections、Privacy、Terms、Contact；
- 404、错误页、空状态、登录页、内部页、待复核页；
- 主要内容只是图片、视频、嵌入或外链目录的页面。

最稳妥的链路是：

```text
可投放的原创解释长文 → 明确 CTA → 完全无广告的练习流程
```

首期不用 Auto Ads。等人工位置稳定、确认不会打断练习后，再按页面排除规则小范围实验。

## 15. 申请前两层门槛

### 15.1 Google 官方层

- 你拥有并能修改标准主域的 HTML；
- 内容原创、完整、有明确受众价值；
- 导航清晰，用户能找到主要内容；
- 全站遵守 AdSense 与 Publisher Policies；
- 新站在 AdSense Sites 中完成验证和整站审核；
- 申请时提供真实 publisher ID，根目录 `ads.txt` 正确；
- 按实际访问地区配置适当的 consent/CMP。

### 15.2 本项目为了提高首次准备度设置的内部层

这些不是 Google 的保证或硬数字：

- 12–16 个完整实质页，而非卡片、标签页或工具空壳；
- 至少 8 个第一方技术/练习单元完成必要的专业与安全复核；
- 每页有作者、更新时间、来源/权利状态、复核状态、纠错入口；
- About、Contact、Privacy、Terms、Editorial、Sources、Safety、Corrections 齐全；
- sitemap 无待复核、coming soon、重复页、私人链接、登录墙或断链；
- 全站 title、description、canonical、Open Graph、robots、sitemap、404 完成；
- Search Console 已验证，至少已看到真实抓取和 impressions；
- 先运行 8 周的自媒体 → 内容 → 练习行为验证；
- 再做桌面、移动、版权、隐私和广告位置终审。

## 16. 8 周执行计划

| 周 | 内容交付 | 产品/运营交付 | 验证 |
|---|---|---|---|
| W1 | `/start`、10 分钟重启 | 定 schema、公开/内部边界、信任页骨架、唯一 UTM 规则 | 5 人看首页，4 人无需解释能开始 |
| W2 | Force：伦巴骨盆、恰恰轴心 | 第一轮专业复核；公共 app/route boundary | 检查复核状态不会误进 sitemap |
| W3 | Force：主力腿、Samba Bounce | 安全复核、原创图解、rights ledger | 320/390/430/768/1440 视口 |
| W4 | Force：胸胯对抗、居家小空间 | 接 P0 事件；5 位目标用户跟练 | 至少 3 人完成，3 人能复述动作链 |
| W5 | 如何数拍、BPM vs MPM | 自媒体每周 2 条，各自独立 UTM | 比较落地 → drill start |
| W6 | 课后只修一点、如何选音乐 | 达到 12 页；版权、隐私、死链审计 | `pnpm verify` + preview 人工验收 |
| W7 | 伦巴第一课、Walk 重心 | 优先自拍示范；清第三方依赖 | 复盘回访、降级和 abort 原因 |
| W8 | 身体训练、规则与边界 | 达到 16 页；Search Console 与整站审核 | 运行 GO / ITERATE / STOP 决策 |

每周从已上线网站内容派生两条自媒体内容：一条问题/教学，一条本人练习/复盘；每条都导向对应详情页，不要全部导首页。

## 17. 最小需求验证包

### 17.1 核心假设

> 有一群成人初学者和重拾者，不只愿意收藏拉丁内容，也愿意从具体问题页进入 5–10 分钟练习，并在一周内回来复练。

最大不确定性不是“能不能做出网站”，而是“内容阅读能否转成练习完成与复练”。

### 17.2 最便宜的测试

先上线 4 个 cornerstone：

1. `/start`；
2. 一个经过完整复核的 Force 页；
3. 对应的无广告练习页；
4. 一篇节拍或成人重启内容。

从自媒体发布 3 条问题明确、链接唯一的内容：

- “学过基本步，为什么一回家就不会了？” → 10 分钟重启；
- “不是把胯扭大：伦巴的力量先从哪里经过？” → 已复核 Force；
- “听得到音乐却总踩不准：先分清拍子和动作时值。” → 数拍页。

不要先把 16 页全部做完才第一次观察用户行为。

### 17.3 记录表最小字段

```text
date
content_id
utm_source / campaign / content
qualified_sessions
drill_starts
drill_completes
abort_reason_counts
next_action_count
7d_returns
inquiries_or_valid_feedback
gsc_impressions / clicks / queries
content_or_product_change
```

“合格访问”应排除本人、开发 preview、机器人、自动测试和明显误访。

### 17.4 预先约定的判断线

**GO：**

- 至少 12 个完整实质页；
- 至少 8 个原创技术/练习单元通过专业和安全复核；
- 媒体权利清晰、公开面无私人链接；
- 排除测试后达到 100 个合格 session，或小受众场景下 30 个高意图访问；
- 至少 15 次 `drill_start`、8 次 `drill_complete`；
- 至少 10 个 7 日回访，或 5 个真实咨询/加入/有效回复；
- 至少 3 页出现 Google impressions，并开始出现非品牌信号；或自媒体多次稳定带来练习完成。

达到 GO 只表示可以进入申请准备，不表示 Google 必然批准。

**ITERATE：**

- 有阅读无开始：重写承诺、示例和 CTA；
- 有开始无完成：降低难度、缩短步骤、加强安全感；
- 有完成无回访：只修下一步和回流，不扩动作库；
- 自媒体有效、Google 尚未索引：继续稳定发布，不急着申请；
- 专业复核反复指出同类错误：先修内容模型，再继续产出。

**STOP：**

- 无法持续获得专业复核；
- 核心内容必须依赖无权使用的音乐、视频或课堂原文；
- 有可信导流后连续 8 周仍无练习完成、回访或咨询；
- 100 个合格访问后少于 5 次开始且无完成；
- 无法维持每周至少一个经复核内容单元；
- 专业审核否定核心动作链或认为有明显安全风险。

STOP 不等于删除 LATINOS。它可以继续作为个人练习、开源共创或服务入口，只是不再为了展示广告批量扩页。

## 18. 前端重构护栏与验证

### 18.1 建议分层

```text
content data/schema
  ↓ 纯数据校验、review/rights/publication gates
server-rendered content pages
  ↓ 可索引的完整解释与 metadata
client practice features
  ↓ timer/state/witness/local persistence
sanitized analytics adapter
  ↓ 只发送枚举和内容 ID
Vercel Analytics / Search Console
```

- 内容真相不放进 React 组件常量；
- review、rights、indexable、ads eligibility 由构建 gate 决定；
- 练习 client component 不掌管 SEO 正文；
- localStorage schema 和 bridge 需要版本化，不因换皮而破坏；
- 公共站使用独立 tokens/styles，避免直接重写 6,000 多行 workbench CSS；
- public 与 ops layout 分离，生产域不依赖 UI 隐藏来保护内部路由。

### 18.2 保留并扩展现有验证

现有验证入口：

```bash
cd /Users/zon/Desktop/LATINOS/sites/frontdoor
pnpm install --frozen-lockfile
pnpm verify
```

`pnpm verify` 当前覆盖 typecheck、build、production server、route smoke、structure smoke 和 browser smoke。重构时应增加：

- 公开域无法访问 ops route；
- 待复核内容不进入 sitemap/canonical/广告 allowlist；
- 每个 Force topic 有独立 metadata 和 canonical；
- 390 px 无横向溢出；
- reduced-motion、媒体失败、localStorage 失败仍可完成主任务；
- Daily deep link、witness archive、Daily → Dance bridge 不回归；
- 所有外链、rights 状态和私人 URL 构建 gate。

运行构建会写 `.next` 或 `tsconfig.tsbuildinfo`；应在保留当前用户工作区改动的前提下单独核对生成文件，不要用 reset/checkout 清理。

## 19. 近期执行顺序

### 接下来 7 天

1. 决定一个公共品牌名和一个主域名，不立即申请 AdSense；
2. 写架构决策：公开 projection app，或同 app 的 public/ops 强隔离；
3. 把当前 OS 首页保存在 preview/workbench，不覆盖或删除；
4. 固化内容 schema、独立复核轴和发布 gate；
5. 选择 2 个 Force 单元送专业/安全复核；
6. 完成 `/start` 与 10 分钟重启的内容原型；
7. 用 5 位目标用户完成第一轮可用性测试；
8. 为每条自媒体内容建立唯一 UTM；
9. 只在 preview 验证，不切旧生产域、不放广告代码。

### 现在停止做

- 停止继续扩 54 张未经核验的动作卡；
- 停止补曲目数量或做 82 条播放器目录；
- 停止把内部 dashboard 当用户分析；
- 停止为多个潜力方向购买新域；
- 停止把 direct/空 referrer 解释成 Google 自然搜索；
- 停止在动作、播放器和计时器周围设计广告位；
- 停止用“先把功能都做出来”替代 4 页最小需求验证。

## 20. 证据与参考

### 本地项目事实

- [LATINOS README](../../README.md)
- [来源与隐私边界](../../CONTENT-LICENSE.md)
- [贡献与表达规范](../../CONTRIBUTING.md)
- [Force-first 重构分析](./2026-08-15-force-first-open-source-rebuild.md)
- [小红书评论需求结构](./2026-08-15-xhs-comment-feedback-structure.md)
- `sites/frontdoor/app/page.tsx`
- `sites/frontdoor/app/layout.tsx`
- `sites/frontdoor/data/force.ts`
- `sites/frontdoor/data/daily.ts`
- `sites/frontdoor/data/dance-os-demo-shared.ts`
- `sites/frontdoor/lib/witness-archive.ts`
- `html/latin-home-style-lab-20260818/`

### Google 官方参考（2026-08-19 复核）

- [创建 AdSense 账号时如何输入网站网址](https://support.google.com/adsense/answer/2784438?hl=zh-Hans)
- [AdSense 资格要求](https://support.google.com/adsense/answer/9724?hl=zh-Hans)
- [确保网站网页符合使用要求](https://support.google.com/adsense/answer/7299563?hl=zh-Hans)
- [添加新网站与逐站审核](https://support.google.com/adsense/answer/12169212?hl=zh-Hans)
- [一个发布商账号与增加网站](https://support.google.com/adsense/answer/9729?hl=zh-Hans)
- [无发布商内容或低价值屏幕政策](https://support.google.com/publisherpolicies/answer/11112688?hl=en)

## 21. 最终四项决策

- **推荐路径：**只为成人初学/重拾拉丁舞的公开学习站经营一个独立主域；用第一方经历、经复核的 Force、节拍和短练习构成内容闭环，当前工作台保留为内部 preview。
- **暂不推荐：**不原样发布当前 frontdoor，不迁 54 张动作卡、82 条播放器目录、原始课堂记录或内部 route，不在首期启用 Auto Ads，也不为其他候选项目继续买域。
- **最小验证：**先上线 4 个 cornerstone 做 5 人跟练，再用 8 周完成 12–16 个实质页和专业/安全/版权 gate；按练习开始、完成、复练、有效反馈和 Search Console 信号判断，而不是按 PV 判断。
- **停止条件：**若专业复核、版权或隐私边界无法成立，或在可信导流下 8 周仍没有练习完成、回访和真实反馈，就暂停 AdSense 扩建，保留 LATINOS 作为练习或服务项目。
