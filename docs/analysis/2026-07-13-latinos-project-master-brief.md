# LATINOS / Latin Dance OS 项目总档案

> 更新时间：2026-07-13  
> 作用：让未来的自己、AI 或协作者快速理解这个项目为什么存在、已经做到哪里、接下来应该做什么。  
> 当前内容真相来源：Feishu。历史材料中的 Notion 表述均视为旧说法，不再扩展。

## 一句话说明

LATINOS 不是“再做一个拉丁网站”，而是一个长期母项目：把 Daily Latin 内容 IP、拉丁成长网站和 Dance Tools / Demos 组织成可以持续积累、复用和产品化的 Latin Dance OS。

## 1. 项目背景

过去已经围绕拉丁做过网站、内容和多个版本尝试，也有已经上线的旧站：

- 线上旧站：https://latindance.zondev.top/
- 旧站源码：`/Users/zon/Desktop/MINE/9_latin/apps/latinDance`
- 新长期母仓：`/Users/zon/Desktop/LATINOS`

旧站是已经公开上线的 proof，不是废稿；但旧目录、多个版本和临时尝试逐渐变得难以管理。新母仓的目的，是在不丢历史资产的前提下，建立一套长期可维护、适合 AI 持续协作的结构。

## 2. 真正目标

整体公式：

`Latin Dance OS = Daily Latin IP + 拉丁成长网站 + Dance Tools / Demos`

三层分别承担：

1. **内容与 IP**：直播、练习记录、成长过程和可持续输出。
2. **网站与资产承接**：把内容、旧站 proof、练习轨迹和工具入口沉淀成长期数字资产。
3. **工具与产品化**：把练习中的真实问题做成状态分流、纠错记录、Body Map、练习队列和回流机制。

长期希望形成的不只是一个站，而是一套个人可复用的前端资产和组件体系，以后其他网站也能复用数据层、主题层、组件层、测试与部署方式。

## 3. 核心用户与使用场景

主要服务：

- 成人拉丁爱好者
- 断练后想重新开始的人
- 不需要完整课程，只想先完成今天一轮的人
- 练了但说不清具体卡点、需要下一步提示的人

核心路径：

`选择今天状态 -> 完成最小一轮 -> 留下一句 witness -> 判断继续 Daily、回到直播，或进入 Dance OS 纠错 -> 下一轮回来继续`

## 4. 已建立的长期规则

### 内容来源

- Feishu 是唯一 source of truth。
- 不再扩展 Notion 工作流。
- 不确定内容时，回到 LATIN、直播计划、拉丁 dance os 构思、DANCE OS DEMO v1.0 等飞书材料核对。

### 旧站策略

- 保留旧站。
- 记录和映射旧资产。
- 新 frontdoor、新 demo 与旧站并行生长。
- 未经明确决定，不直接修改旧站生产源码或切换 `latindance.zondev.top` 首页。

### 工程策略

- 使用 Next.js App Router + React + TypeScript。
- 页面组件化，数据与组件分离。
- 正式入口放在 `sites/frontdoor/`。
- 独立 demo 放在 `apps/demos/<demo-name>/`。
- 规则、分析、旧站映射、每日记忆分别进入固定目录。
- 不回退到单文件 HTML 和 hash-tab 壳。

## 5. 已经完成的部分

### A. 长期母仓基础

已经建立：

- `AGENTS.md`：AI 进入项目后的执行规则
- `README.md`：项目身份与目录说明
- `MEMORY.md` 与 `memory/`：长期记忆和每日上下文
- `docs/standards/`：来源、目录、网站策略等规范
- `docs/analysis/`：决策、审计和每轮 pass 的证据
- `docs/legacy/`：旧站映射
- `data/feishu/`：飞书来源索引

这部分是当前做得最稳的一层：项目已经不再是随意堆文件的临时目录。

### B. 新 frontdoor

当前已经实现并能构建访问：

- 首页 `/`
- `/daily-latin`
- `/dance-os`
- `/legacy`
- `/tools`
- `/roadmap`
- `/dashboard`
- `/about`

核心三页已经通过 typecheck、production build、route smoke、browser smoke 和 structure smoke。已有桌面与部分移动端适配证据。

### C. Daily Latin

已经形成：

- 状态入口
- 最小练习闭环
- Today Loop Demo
- witness 保存
- 直播回流与 Dance OS bridge
- 动作库与来源依据

它已经不是静态模板，而是能让用户完成一轮并留下下一步的交互入口。

### D. Dance OS

frontdoor route 与独立 Demo 都已经存在。已经形成：

- Correction Ledger
- Body Map / Practice Queue
- witness archive
- queue
- return trigger
- archive -> queue -> return 的生命周期
- localStorage 兼容与共享数据
- grounded proof / exit rule

独立 Demo 已经过多轮真实交互验证，并开始与 frontdoor 共用舞种、状态、身体焦点和 checklist 数据。

### E. 视觉迁移

当前站已经采用参考稿 `/Users/zon/Downloads/latin-workbench (2).html` 的核心视觉语言：

- 深色工作台
- 固定侧边栏
- 黑灰面板和细描边
- 紫色稀疏强调
- Bebas Neue / Space Mono / Noto Sans SC
- hero、progress ring、heatmap、tabs、card grid

准确说法是“已进入同一视觉家族”，还不能说已经逐页 1:1 复刻。

## 6. 当前做得好的地方

1. **项目边界清楚**：旧站、frontdoor、demo、规则和记忆没有再混写。
2. **架构可长期维护**：React/Next/TypeScript、组件化、数据分离已经成立。
3. **没有丢旧资产**：旧站保持线上 proof，新体系并行生长。
4. **Demo 有真实闭环**：不是页面概念图，witness 可以保存、进入队列、恢复和完成。
5. **开始使用真实材料**：Feishu 规则、旧站起步逻辑和拉丁动作数据已经进入页面。
6. **验证意识较完整**：关键 pass 有 typecheck、build、浏览器 smoke、桌面/移动截图和分析记录。

## 7. 当前做到哪里，还差什么

### 总体判断

- 架构层：完成度高，方向正确。
- 功能层：核心链路已经成立，但仍处于本地/preview 型产品阶段。
- 内容层：已从模板进入真实化，尚未被真实直播、练习和内容资产完全填满。
- 视觉层：同一风格家族已经成立，页面节奏尚未达到参考稿。
- 生产层：旧站仍在线，新 frontdoor 尚未完成正式域名并行承接。

### 视觉审计结果

- 首页：视觉骨架约 75% 接近参考稿。
- `/daily-latin`：视觉语言约 60%，页面构图约 35%。
- `/dance-os`：视觉语言约 60%，页面构图约 25%。

这些是审计判断，不是像素 diff 分数。

最大差距不是色值，而是信息层级：参考稿每页只有一个主任务；当前二级页同时展开太多解释、bridge、来源和卡片，像内部产品说明页。

## 8. 已有的好材料

### 飞书内容源

- LATIN 主 wiki
- 直播计划
- 拉丁 dance os 构思
- DANCE OS DEMO v1.0

### 视觉参考

- `/Users/zon/Downloads/latin-workbench (2).html`

### 旧资产

- 旧站：https://latindance.zondev.top/
- 旧站源码与历史版本

### 当前代码资产

- `sites/frontdoor/`：正式入口架构
- `apps/demos/dance-os-demo/`：独立产品 demo
- 共享 witness store、共享拉丁数据、route bridge、响应式 shell

### 关键分析材料

- 当前 canonical goal contract
- frontdoor completion audit
- current-state style and scope audit
- 三页逐模块参考稿差距清单
- Dance OS 各轮 archive / queue / return / shared assets / grounded data pass 记录

## 9. 正确的工作方法

每一轮只选一个 Top 1，并遵循：

1. 先读规则、memory、最新分析和飞书来源。
2. 先确认当前事实，避免按过时 goal 重复劳动。
3. 优先用户可见收益，再抽最小共享资产。
4. 数据、主题、组件分层，不把页面内容硬编码成难维护的大文件。
5. 每轮改动都做 typecheck、build 和与风险相匹配的浏览器验证。
6. 视觉改动必须桌面和移动端截图对照。
7. 完成后更新 analysis 与 memory，留下下一位 AI 可恢复的证据。

## 10. 接下来要做的事情

### 当前唯一 Top 1：三页信息层级收敛

1. **首页**：恢复参考稿简单清晰的入口网格；保留队列功能，但压缩成一条 rail；让 Day / 连续成长重新成为主要视觉锚点。
2. **`/daily-latin`**：把 Today Loop Demo 提到首个主面板之后；合并重复的 bridge / return 说明；来源依据默认折叠。
3. **`/dance-os`**：把 Correction Ledger 提升为页面主模块；合并独立 Demo 入口和去向 bridge；移除 localhost、shell、bridge 等面向开发者的公开文案。

### 完成 Top 1 后

1. 为三个页面补齐 1440、390、430、768 四档视觉与交互验收。
2. 给 Dance OS 的 Body Map 与资产库加入真实动作截图、视频帧或身体区域视觉。
3. 继续用真实直播记录、练习 witness 和内容资产替换说明型占位内容。
4. 做 preview 部署并验证可访问性。
5. preview 稳定后再决定新旧站在正式域名下的并行入口，不直接覆盖旧站。
6. 从已证明稳定的组件中抽取个人公共组件资产，而不是提前建空组件库。

## 11. 验收标准

### 用户体验

- 每页一眼能知道“现在做什么”。
- 首屏只突出一个主要动作。
- 不需要理解内部架构术语。
- 手机和电脑都无横向溢出、按钮截断或内容重叠。

### 视觉

- shell、topline、card rhythm、type scale、spacing 与参考稿逐项对照。
- 允许真实内容不同，但不允许页面层级和密度继续漂移。

### 工程

- 页面保持 thin route。
- 数据与组件分离。
- 不复制相同数据与 UI 壳。
- typecheck、production build、route/browser smoke 全部通过。

### 产品

- Daily 能完成一轮并留下 witness。
- Dance OS 能从 witness 进入 queue、恢复、完成并形成下一轮。
- 旧站仍可访问，新入口不会破坏旧 proof。

## 12. 风险与对抗性检查

1. **只追求 1:1 外观**可能牺牲已经成立的交互功能。应复刻参考稿的层级与节奏，不回退架构。
2. **继续加说明卡片**会让页面越来越像内部文档。新增内容优先折叠、渐进披露或进入独立页面。
3. **过早抽公共组件库**会得到没有真实复用证据的空抽象。至少两个稳定消费者后再抽。
4. **过早切生产域名**可能损坏旧站 proof。先 preview，再决定路由与域名。
5. **内容双源**会重新制造混乱。只维护 Feishu，不恢复 Notion。

## 13. Stop Doing

- 不再新增解释性卡片来代替清晰主任务。
- 不再连续堆叠同构 detail panel。
- 不把 localhost、local shell、bridge 等开发语言暴露给正式用户。
- 不把相同色值误判为已经 1:1 复刻。
- 不回退到单文件 HTML。
- 不推倒旧站、不擅自切生产域名。
- 不同时平均推进首页、两个 demo、部署和组件库。
- 不继续扩展 Notion 工作流。

## 14. 当前决策摘要

当前最优路径是：保留旧站 proof，以 LATINOS 作为长期母仓；保留现有 Next/React 组件化架构和 Daily/Dance OS 功能资产；先把三个核心页面的主次与参考稿节奏收敛，再补真实内容、全尺寸验收和 preview 部署。

这条线最终要形成的是可持续增长的个人拉丁内容与产品系统，而不是做完一个页面就结束。
