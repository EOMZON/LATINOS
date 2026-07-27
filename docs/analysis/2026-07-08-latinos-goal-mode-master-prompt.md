# LATINOS Goal Mode Master Prompt

## 唯一使用方式

这份文档现在就是：

- 唯一推荐发给 `goal mode` agent 的版本
- 当前主线的对外执行合同

除非是为了追溯历史判断，否则：

- 不要优先发 `v6 / v7 / v8 / v9 / v10`
- 不要优先发 `launch prompt`
- 不要优先发 `execution prompt`

那些文档保留为历史分析痕迹。

## 用途

这不是一次性问答 prompt。

这是给长期 `goal mode` agent 使用的执行母提示词，目的是让后续 agent 不再反复讨论技术路线，而是沿着已经成立的主线持续推进 `LATINOS frontdoor`。

适合下面这种场景：

- 需要连续运行数小时到数天
- 需要反复改页面、看效果、补验证、写 memory
- 需要多个 AI 在同一主线下接力
- 需要同时兼顾：
  - 参考稿视觉逼近
  - 长期可维护架构
  - 真实内容回填
  - 持续验证与文档沉淀

## 问题本质

真正要解决的不是“把某一页改得更像参考”。

真正要解决的是：

**把 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 持续推进成一个视觉上尽量逼近参考稿、内容上尽量使用真实本地拉丁资料、结构上长期可维护、未来可继续抽取共享组件与模式的前台母体。**

它服务的不是单页展示，而是这条长期主线：

`Latin Dance OS = Daily Latin IP + 拉丁成长网站 + Dance Tools / Demos`

## 当前唯一推荐结论

不要再重开：

- `Astro`
- `单文件 HTML`
- `hash tab 大壳`

当前唯一推荐主线继续锁定为：

- `Next.js App Router`
- `React`
- `TypeScript`
- `真实路由`
- `组件化`
- `数据与组件分离`
- `token 化样式`
- `持续验证`

## 四个必须同时成立的目标

### 1. 样式目标

让网站的：

- 视觉语言
- 布局结构
- 导航壳体
- hero 比例
- section 节奏
- 卡片密度
- 深色工作台气质
- 桌面端与手机端观感

尽量逼近：

- `/Users/zon/Downloads/latin-workbench (2).html`

这里不是“大致像”，而是要持续逼近到“近似同款完成度”。

### 2. 架构目标

让项目保持长期 AI 可维护，尽量做到：

- 真实路由
- 组件化
- 数据与组件分离
- 样式 token 化
- 内容 schema 化
- 共享 pattern 沉淀
- 稳定验证链

### 3. 内容目标

尽量使用：

- `LATINOS` 本地真实资料
- `Feishu` 来源结构
- 旧站真实表达
- 仓库内 `analysis / memory / standards`

来填充页面，而不是长期停在模板文案。

### 4. 资产目标

让当前 frontdoor 能继续沉淀：

- 共享 section
- 共享 card
- 共享 workbench pattern
- 共享 content schema
- 共享样式 tokens
- 后续跨站复用能力
- 后续 App 演进边界

## 已锁定规则

### Source of Truth

内容源以 `Feishu` 为准。

如果历史材料提到 `Notion`：

- 视为旧提法
- 翻译回飞书对应文档或飞书结构
- 不要继续扩写新的 Notion 工作流

至少围绕这些飞书文档做内容映射：

- `LATIN`
- `直播计划`
- `拉丁dance os构思`
- `DANCE OS DEMO v1.0`

索引文件：

- `/Users/zon/Desktop/LATINOS/data/feishu/latinos-sources.json`

### 旧站策略

旧站不是垃圾，是公开 proof。

已知旧站：

- live:
  - `https://latindance.zondev.top/`
- source:
  - `/Users/zon/Desktop/MINE/9_latin/apps/latinDance`

默认策略：

- `保留`
- `映射`
- `并行`

没有明确要求时：

- 不直接改生产域名指向
- 不直接推倒旧站
- 不直接做大迁移

### 当前稳定基线

当前活跃项目：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor`

当前稳定路由：

- `/`
- `/legacy`
- `/daily-latin`
- `/dance-os`
- `/tools`
- `/roadmap`
- `/dashboard`
- `/about`

当前已存在关键交互模块：

- `DailyLoopDemo`
- `CorrectionLedgerDemo`
- `NextSessionQueue`
- `WitnessArchiveBoard`
- `BodyMapPracticeQueue`
- `DailyReturnBoard`

当前已存在验证链：

- `pnpm typecheck`
- `pnpm build`
- `pnpm verify`
- `scripts/route-smoke.mjs`
- `scripts/structure-smoke.mjs`
- `scripts/prod-smoke.mjs`
- `scripts/browser-smoke.py`

因此不要再做下面这些事：

- 重新讨论是否继续用 `Next / React / TypeScript`
- 回退成单文件 HTML
- 回退成 hash tab 单页壳
- 无视现有验证链另起一套随意结构

### 当前起跑快照

以下是这轮最新 handoff 后可直接继承的起跑状态。

但要注意：

- 这些数值只是当前起跑快照
- 任何新一轮视觉判断前都必须重新 `build/start`
- 不要信任旧测量截图或旧 `localStorage`

当前最新可靠移动端 sweep：

- `/`: `390=1730 / 375=1724 / 360=1717`
- `/daily-latin`: `390=2884 / 375=2496 / 360=2778`
- `/dance-os`: `390=2775 / 375=2851 / 360=2153`
- `/dashboard`: `390=2783 / 375=2563 / 360=2571`

当前 broad mobile Top1：

- `/daily-latin 390 = 2884`

如果下一轮继续纯追 mobile ROI，优先回看：

- `today-loop-demo`
- `live-return-bridge`
- `daily-sources`
- `daily-overview` 上半壳体

如果下一轮从“收数值”切回“收完成感”，优先回看：

- 首页 `hero`
- 首页 `heatmap / today status`
- 首页下半段 `workbench` 开放式入口完成感

已知执行事实：

- `pnpm start` 不会热更新
- 任何测量前先重新 `pnpm build` 再 fresh `start`
- 不要一边 rebuild 一边做 sweep
- 测量前尽量清空 `localStorage`，使用干净上下文

## 推荐作为唯一投喂版本的主提示词

```text
请把 /Users/zon/Desktop/LATINOS/sites/frontdoor 作为一个长期 Goal 模式项目持续推进，而不是一次性改版任务。

你的任务不是“做一个页面”，而是把 LATINOS frontdoor 持续推进成一个长期可维护、可验证、可复用的拉丁主题前台母体，并让这套做法成为未来 Zon 各类网站都可以复用的模板级实现。

你必须同时满足下面四个目标，四个目标缺一都不算完成：

1. 样式目标
让网站的视觉语言、布局结构、导航壳体、hero 比例、section 节奏、卡片密度、深色工作台气质，以及桌面端和手机端观感，尽量逼近 /Users/zon/Downloads/latin-workbench (2).html。
这里不是“大致像”，而是要持续逼近，直到首页和关键二级页达到近似同款完成度。

2. 架构目标
保持 Next.js App Router + React + TypeScript、真实路由、组件化、数据与组件分离、token 化样式、长期 AI 可维护。
不要回退到单文件 HTML、hash tab 大壳、Astro 主线，或把内容、样式、交互重新混写。

3. 内容目标
尽量使用 LATINOS 本地真实资料、飞书映射、旧站真实表达来填充内容，而不是长期停留在模板文案。
Feishu 是唯一 source of truth；如果历史材料提到 Notion，一律视为旧提法，翻译回飞书对应文档或飞书结构。

4. 资产目标
让当前 frontdoor 形成未来可继续抽取的共享资产，包括共享 section、共享 card、共享 workbench pattern、共享 content schema、共享样式 tokens，以及后续跨站复用和 App 演进所需的清晰边界。

进入任务后，必须先按顺序读取并理解这些文件：
1. /Users/zon/Desktop/LATINOS/AGENTS.md
2. /Users/zon/Desktop/LATINOS/README.md
3. /Users/zon/Desktop/LATINOS/MEMORY.md
4. /Users/zon/Desktop/LATINOS/memory/ 里今天最新的日志
5. /Users/zon/Desktop/LATINOS/docs/standards/source-of-truth.md
6. /Users/zon/Desktop/LATINOS/docs/standards/repo-structure.md
7. /Users/zon/Desktop/LATINOS/docs/standards/website-strategy.md
8. /Users/zon/Desktop/LATINOS/data/feishu/latinos-sources.json
9. /Users/zon/Desktop/LATINOS/docs/legacy/latindance-map.md
10. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-06-latinos-goal-mode-prompt.md
11. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-08-latinos-goal-mode-master-prompt.md
12. 当前最新的首页、daily-latin、dance-os、dashboard、mobile sweep 相关 analysis 文档

不要再把 v6-v10、launch prompt、execution prompt 当成主输入。
如果需要追溯历史，只把它们当背景材料，而不是新的路线来源。

同时把 /Users/zon/Downloads/latin-workbench (2).html 视为 style lock。
你的任务不是“参考一下”，而是持续逼近，直到首页和关键二级页都达到近似同款完成度。

当前已锁定基线如下，不要重新讨论：
- 技术主线：Next.js App Router + React + TypeScript
- 结构主线：真实路由、组件化、数据与组件分离、token 化样式
- 内容主线：Feishu 为准，Notion 视为遗留说法
- 旧站策略：保留 / 映射 / 并行
- 生产 guardrail：没有明确要求时，不直接改 https://latindance.zondev.top/ 的生产指向

当前稳定路由包括：
- /
- /legacy
- /daily-latin
- /dance-os
- /tools
- /roadmap
- /dashboard
- /about

当前起跑快照如下，但每轮开始前必须重新验证，不要盲信旧数值：
- `/`: `390=1730 / 375=1724 / 360=1717`
- `/daily-latin`: `390=2884 / 375=2496 / 360=2778`
- `/dance-os`: `390=2775 / 375=2851 / 360=2153`
- `/dashboard`: `390=2783 / 375=2563 / 360=2571`

当前 broad mobile Top1 是：
- `/daily-latin 390`

因此默认下一轮优先顺序是：
1. 如果继续追 mobile ROI，先看 `/daily-latin 390`
2. 如果切回视觉完成感，先看首页 hero / heatmap / lower workbench

当前 `/daily-latin 390` 最值得优先看的块：
- `today-loop-demo`
- `live-return-bridge`
- `daily-sources`
- `daily-overview`

组件边界继续朝下面推进：
- app/ 只做 route composition
- components/sections/ 做共享 section 结构
- components/feature/ 做业务交互模块
- components/cards/ 做可复用信息单元
- data/ 或 content/ 放内容与配置
- lib/ 和 hooks/ 放逻辑与共享行为
- styles/ 沉淀 tokens、shell、compact workbench 语言

不要为了“以后可能做组件库”而过早抽象万能组件。
只有在一个模式稳定复用至少 3 次后，才进一步上提抽象。
优先抽稳：
- section shell
- route stage panel
- metric strip
- source matrix
- compact workbench shell
- module entry card

每轮必须按下面的循环执行：
1. 先做整站 audit，判断当前最大差距、最掉队 route、最值得动的共享层
2. 每轮只抓 1 到 2 个最高 ROI 问题
3. 优先改共享层，不要同时大改很多页
4. 每轮同时检查：是否更像参考稿了、是否更利于长期维护了
5. 能用真实内容替换模板时就替换
6. 不要信任旧 dev server；任何视觉判断前先 fresh build/start
7. 重要改动后至少运行 pnpm verify
8. 涉及整站视觉、关键交互、首页完成感时，再运行：
   - FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes
   - FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser
9. 有本地预览条件时，实际打开看桌面端和手机端效果，不要只靠想象
10. 每轮把关键决策写入 docs/analysis/ 和 memory/YYYY-MM-DD.md
11. 只要还能继续推进，就不要停在“状态汇报”，而要继续完成下一轮最值得做的改动

完成标准必须同时满足：
1. 首页和关键二级页在桌面端与手机端都高度逼近参考稿
2. 主要内容不再大面积依赖模板文案，而是明显更接近真实本地资料
3. 真实路由稳定，没有回退成假切页结构
4. 组件、样式、内容边界更稳，而不是更散
5. verify 与 smoke 持续通过
6. analysis 与 memory 记录足够清楚，后续 AI 可以无缝接手

没有同时满足这些条件时，不要提前宣布完成。

除非用户明确要求重新评估，否则不要再重开 Astro / 单文件 HTML / hash tab 主线讨论。

请直接进入长期循环推进状态，并在每轮都输出：
- 本轮 Top1 问题
- 本轮改动
- 验证结果
- 与参考稿相比缩小了哪些差距
- 剩余最大差距
- 下一轮最值得做什么
```

## 最短投喂版

如果你只想最快启动另一个 agent，可以直接发这段：

```text
请严格按照 /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-08-latinos-goal-mode-master-prompt.md 执行。

不要重新讨论技术选型，不要回退到单文件 HTML、hash tab 或 Astro 主线。

你要把 /Users/zon/Desktop/LATINOS/sites/frontdoor 作为长期 Goal 模式项目持续推进：
- 样式上持续逼近 /Users/zon/Downloads/latin-workbench (2).html，直到首页和关键二级页达到近似同款完成度
- 架构上持续强化 Next.js App Router + React + TypeScript、真实路由、组件化、数据与组件分离、token 化样式
- 内容上持续用 LATINOS 本地真实资料、飞书映射和旧站真实表达替换模板文案
- 验证上每轮都运行 verify，必要时补 route smoke 与 browser smoke，并实际复核桌面端与手机端
- 文档上每轮都同步更新 docs/analysis/ 和 memory

除非参考稿完成度、结构稳定度、真实内容回填和验证结果都同时过关，否则不要把任务判定为完成。
```

## 为什么这版更适合长期 Goal 模式

- 它把“像参考稿”与“可维护”绑定在一起，避免只顾外观不顾结构
- 它把“真实内容回填”设成硬目标，避免项目长期停在模板假数据
- 它把“共享层优先”和“验证循环”写成执行机制，适合 AI 连续接力
- 它避免每一轮又回到框架争论，把精力集中到真正影响终局的地方
