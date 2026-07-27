# LATINOS Goal Mode Prompt v8

## 背景

这不是一次性问答提示词，也不是一次性改版提示词。

它是给一个会连续运行数小时到数天、反复修改、反复验证、反复落盘的 Goal 模式 agent 用的执行母提示词。

这条线真正要做的不是“做一个拉丁页面”，而是把下面三件事收敛成一个长期可维护的前台系统：

- `Daily Latin IP`
- `拉丁成长网站`
- `Dance Tools / Demos`

也就是：

- 内容是 `IP`
- 网站是 `资产承接`
- demo / 工具是 `产品化`

## 问题本质

真正要解决的不是“某一屏再调像一点”。

真正要解决的是：

**把 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 持续推进成一个样式近似参考稿、内容尽量来自真实本地资料、结构长期可维护、未来可抽取共享组件与共享模式的前台母体。**

因此，这个 Goal 必须同时满足四个目标：

1. `样式目标`
2. `架构目标`
3. `内容目标`
4. `资产目标`

缺一都不算完成。

## 关键约束

- 样式参考锁定为：
  - `/Users/zon/Downloads/latin-workbench (2).html`
- 当前技术主线已经锁定：
  - `Next.js App Router + React + TypeScript`
- 内容源以 `Feishu` 为准
- 历史 `Notion` 提法一律视为遗留说法，必须翻译回飞书结构
- 旧站默认策略仍然是：
  - `保留 / 映射 / 并行`
- 没有明确要求时，不要直接改生产域名：
  - `https://latindance.zondev.top/`
- 目标不是“能看”，而是“AI 后续持续接手也不容易改崩”

## Best Minds 收口

如果按最懂长期前端系统、设计系统、React 边界、平台化演进的人来收口，结论会非常一致：

### Brad Frost 视角

长期资产不是很多散页面，而是：

- tokens
- patterns
- modules
- templates

### Dan Abramov 视角

组件化不是组件越多越好，而是：

- 边界清楚
- 状态最小
- 只在稳定重复处抽象

### Lee Robinson / 平台路线视角

未来要承接：

- frontdoor
- demo
- 工具页
- preview
- 生产部署

因此稳定平台化路线比“看起来更轻”的临时方案更重要。

### 当前唯一推荐结论

不要再重开技术选型。

继续在当前基线上推进：

- `Next.js App Router`
- `React`
- `TypeScript`
- `真实路由`
- `组件化`
- `数据与组件分离`
- `token 化样式`
- `持续验证`

## 当前已锁定基线

下面这些已经成立，不要重新推翻：

### 项目位置

- 当前活跃项目：
  - `/Users/zon/Desktop/LATINOS/sites/frontdoor`

### 真实路由

- `/`
- `/legacy`
- `/daily-latin`
- `/dance-os`
- `/tools`
- `/roadmap`
- `/dashboard`
- `/about`

### 已存在关键交互模块

- `DailyLoopDemo`
- `CorrectionLedgerDemo`
- `NextSessionQueue`
- `WitnessArchiveBoard`
- `BodyMapPracticeQueue`
- `DailyReturnBoard`

### 当前验证链

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

### 明确不要回退到

- 单文件 HTML 大壳
- hash tab 单页壳
- 重新讨论 Astro 作为当前主线
- 内容、样式、交互混写回页面文件
- 无验证地连续做改动

## Source Of Truth

`Feishu` 是唯一 source of truth。

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

## 旧站策略

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

## 长期最优组件化边界

继续朝下面这套边界推进：

### `app/`

只负责：

- route 入口
- route composition
- metadata
- page-level assembly

### `components/sections/`

放：

- 可跨 route 复用的 section 级结构
- route shell
- shared layout block

### `components/feature/`

放：

- 单个业务交互模块
- queue / witness / correction / archive / planner 这类具备行为的工作台模块

### `components/cards/`

放：

- 轻量信息单元
- summary card
- module entry
- route-supporting card

### `data/`

放：

- route 文案
- 内容配置
- source-backed rows
- metrics
- module config

不要把真实内容长期写死在 JSX 里。

### `lib/` 与 `hooks/`

放：

- 共享逻辑
- 数据转换
- 状态行为
- witness 基础设施

### `styles/`

继续沉淀：

- theme tokens
- spacing scale
- shell
- section shell
- compact workbench patterns
- route-level visual language

## 组件抽象原则

不要为了“以后可能有组件库”就过早抽象万能组件。

当前最优做法是：

1. 先把 frontdoor 内部重复模式抽稳
2. 只有同一模式稳定复用至少 `3` 次时，再进一步上提
3. 优先抽稳：
   - `section shell`
   - `route stage panel`
   - `metric strip`
   - `source matrix`
   - `compact workbench shell`
   - `module entry card`
4. 不要把组件做成过度参数化的“伪通用组件”

## 当前优先级判断

基于最新分析，当前不要平均用力。

除非新一轮整站 audit 证明别的 route 更掉队，否则优先级默认是：

1. 首页整体完成感
   - 尤其 `hero -> heatmap -> workbench` 的整体节奏与完成感
2. 真实内容继续回填
   - 把模板感最强的地方替换成真实本地资料与飞书映射内容
3. 共享层继续抽稳
   - 优先 shared pattern，不要页级临时补丁
4. 窄屏与手机端复核
   - 保证无横向溢出、无内容消失、无 tab/布局失效

## 长期循环协议

你必须按下面的 Goal 循环持续推进：

### 1. 启动先读上下文

先读并理解：

1. `/Users/zon/Desktop/LATINOS/AGENTS.md`
2. `/Users/zon/Desktop/LATINOS/README.md`
3. `/Users/zon/Desktop/LATINOS/MEMORY.md`
4. `/Users/zon/Desktop/LATINOS/memory/` 里今天最新日志
5. `/Users/zon/Desktop/LATINOS/docs/standards/source-of-truth.md`
6. `/Users/zon/Desktop/LATINOS/docs/standards/repo-structure.md`
7. `/Users/zon/Desktop/LATINOS/docs/standards/website-strategy.md`
8. `/Users/zon/Desktop/LATINOS/data/feishu/latinos-sources.json`
9. `/Users/zon/Desktop/LATINOS/docs/legacy/latindance-map.md`
10. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-06-latinos-goal-mode-prompt.md`
11. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-08-latinos-goal-mode-prompt-v7.md`
12. 当前最新的首页 / 路由相关 analysis 文档

### 2. 每轮先做整站 audit

不要默认继续改上一次改过的地方。

每轮先判断：

- 当前最大差距在哪
- 哪个 route 最掉队
- 哪个共享层最值得动
- 当前 Top1 ROI 是什么

### 3. 每轮只抓 1 到 2 个最高 ROI 问题

不要平均用力，不要同时大改很多页。

优先处理：

- 能明显提升整站完成感的问题
- 能减少回归风险的共享层问题
- 能把模板内容变成真实内容的关键区域

### 4. 优先改共享层

优先从这些层收口：

- tokens
- spacing
- shell
- section shell
- shared component
- route pattern
- content schema

除非确有必要，不要优先做页级特例补丁。

### 5. 每轮同时检查两件事

每一轮都要同时问：

- 这轮是否更像参考稿了？
- 这轮是否让长期维护更稳了？

只满足一个，不算过关。

### 6. 持续把内容变真

能用真实资料替换模板文案时，就不要继续保留模板内容。

优先使用：

- `Feishu` 文档结构
- `LATINOS` 的 `memory`
- `docs/analysis`
- 旧站已存在的真实表达

### 7. 每轮改完必须验证

至少运行：

- `pnpm verify`

涉及整站、首页完成感、视觉收口、关键交互时，再运行：

- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

如有本地预览与截图条件，应实际打开检查桌面端和手机端结果，不要只靠想象判断。

### 8. 每轮必须落盘

重要动作必须同步写入：

- `/Users/zon/Desktop/LATINOS/docs/analysis/`
- `/Users/zon/Desktop/LATINOS/memory/YYYY-MM-DD.md`

每轮至少记录：

- 为什么做这一轮
- 改了什么
- 验证结果
- 和参考稿相比缩小了什么差距
- 还差什么
- 下一轮最值得做什么

## 完成标准

只有当下面这些条件同时成立时，才可以把主目标视为接近完成：

1. 首页和关键二级页在桌面端与手机端都高度逼近参考稿
2. 主要内容不再大面积依赖模板文案，而是明显更接近真实本地资料
3. 真实路由持续稳定，没有回退成假切页结构
4. 组件、样式、内容边界比当前更稳，而不是更散
5. `pnpm verify`、route smoke、browser smoke 持续通过
6. analysis 与 memory 足够清楚，后续 AI 可以无缝接手

如果这些条件没有同时成立，不要因为“看起来已经不错了”就提前宣布完成。

## Stop Doing

- 不要再重开 `Astro vs Next` 的主线讨论
- 不要回退到单文件 HTML
- 不要回退到 hash tab 大壳
- 不要把内容、样式、交互重新混成一团
- 不要继续沿用 Notion 作为真实内容源
- 不要只顾视觉不顾验证
- 不要只顾架构不顾参考稿完成感
- 不要为了组件化而过度抽象
- 不要为了短期省事破坏长期边界

## 推荐 Goal Objective

```text
把 /Users/zon/Desktop/LATINOS/sites/frontdoor 持续推进成一个基于 Next.js App Router + React + TypeScript 的长期可维护前台系统：在保留真实本地内容填充的前提下，视觉上尽量逼近 /Users/zon/Downloads/latin-workbench (2).html，架构上实现真实路由、组件化、数据与组件分离、token 化样式、桌面端与移动端稳定适配、持续验证，并沉淀可复用的 section / card / workbench / route / content 资产，为未来共享组件库、跨站复用和后续 demo / product / app 演进打基础。
```

## 可直接复制给 Goal 模式 agent 的主提示词

```text
请把 /Users/zon/Desktop/LATINOS/sites/frontdoor 当成一个长期 Goal 模式项目持续推进，而不是一次性改版任务。

你的唯一目标不是做一个页面，而是让这个前台系统同时满足四件事：
1. 样式上尽量达到和 /Users/zon/Downloads/latin-workbench (2).html 同一作品体系的完成感
2. 架构上保持 Next.js App Router + React + TypeScript、真实路由、组件化、数据与组件分离、token 化样式、长期 AI 可维护
3. 内容上尽量使用 LATINOS 本地真实资料、飞书映射、旧站真实表达，而不是长期停留在模板文案
4. 资产上为未来共享组件、共享样式、共享内容结构、跨站复用与后续 App 演进保留清晰边界

进入任务后先读：
1. /Users/zon/Desktop/LATINOS/AGENTS.md
2. /Users/zon/Desktop/LATINOS/README.md
3. /Users/zon/Desktop/LATINOS/MEMORY.md
4. /Users/zon/Desktop/LATINOS/memory/ 里今天最新日志
5. /Users/zon/Desktop/LATINOS/docs/standards/source-of-truth.md
6. /Users/zon/Desktop/LATINOS/docs/standards/repo-structure.md
7. /Users/zon/Desktop/LATINOS/docs/standards/website-strategy.md
8. /Users/zon/Desktop/LATINOS/data/feishu/latinos-sources.json
9. /Users/zon/Desktop/LATINOS/docs/legacy/latindance-map.md
10. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-06-latinos-goal-mode-prompt.md
11. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-08-latinos-goal-mode-prompt-v7.md
12. 当前最新的首页 / route 相关 analysis 文档

当前基线已经锁定，不要重新讨论：
- Next.js App Router
- React
- TypeScript
- 真实路由
- 组件化
- 数据与组件分离
- token 化样式
- 持续验证

不要回退到：
- 单文件 HTML
- hash tab 大壳
- Astro 主线
- 内容 / 样式 / 交互混写

Feishu 是唯一 source of truth。
如果历史内容提到 Notion，一律视为旧提法，翻译回飞书对应文档或飞书结构，不要继续扩写新的 Notion 工作流。

至少围绕这些飞书文档做内容映射：
- LATIN
- 直播计划
- 拉丁dance os构思
- DANCE OS DEMO v1.0

旧站不是垃圾，是已上线 proof：
- live: https://latindance.zondev.top/
- source: /Users/zon/Desktop/MINE/9_latin/apps/latinDance

默认策略是：
- 保留
- 映射
- 并行

没有明确要求时，不要直接改生产域名指向，不要直接推倒旧站，不要直接做大迁移。

当前 frontdoor 的组件边界应继续朝下面推进：
- app/ 只做 route composition
- components/sections/ 做共享 section 结构
- components/feature/ 做业务交互模块
- components/cards/ 做可复用信息单元
- data/ 放内容与配置
- lib/ 和 hooks/ 放逻辑与共享行为
- styles/ 沉淀 tokens、shell、compact workbench 语言

不要为了未来组件库而过早做万能组件。
只有在一个模式稳定复用至少 3 次后，才进一步上提抽象。
优先抽稳：
- section shell
- route stage panel
- metric strip
- source matrix
- compact workbench shell
- module entry card

当前默认优先级是：
1. 首页整体完成感，尤其 hero -> heatmap -> workbench 的节奏
2. 把模板感最强的区域替换为真实本地内容
3. 共享层继续抽稳
4. 窄屏与手机端复核

每轮必须按这个循环执行：
1. 先做整站 audit，判断当前最大差距、最掉队 route、最值得动的共享层
2. 每轮只抓 1 到 2 个最高 ROI 问题
3. 优先改共享层，不要大量做页级补丁
4. 每轮同时检查：是否更像参考稿了、是否更利于长期维护
5. 能用真实内容替换模板时就替换
6. 改完至少运行 pnpm verify
7. 涉及整站或视觉完成感时，再运行：
   - FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes
   - FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser
8. 每轮把关键决策写入 docs/analysis/ 和 memory/YYYY-MM-DD.md

完成标准必须同时满足：
1. 首页和关键二级页在桌面端与手机端都高度逼近参考稿
2. 主要内容不再大面积依赖模板文案
3. 真实路由稳定
4. 组件、样式、内容边界更稳
5. verify 与 smoke 持续通过
6. analysis 与 memory 记录清楚

没有同时满足这些条件时，不要提前宣布完成。

除非用户明确要求重新评估，否则不要再重开 Astro / 单文件 HTML / hash tab 主线讨论。
请直接进入长期循环推进状态，并在每轮都给出：本轮 Top1 问题、改动、验证结果、剩余差距、下一轮建议。
```

## 最短投喂版

如果只想快速开跑，可以直接发送下面这段：

```text
请严格按照 /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-08-latinos-goal-mode-prompt-v8.md 执行，不要重新讨论技术选型，不要回退到单文件 HTML、hash tab 或 Astro 主线。

你要把 /Users/zon/Desktop/LATINOS/sites/frontdoor 作为长期 Goal 模式项目持续推进：
- 样式上持续逼近 /Users/zon/Downloads/latin-workbench (2).html
- 架构上持续强化 Next.js App Router + React + TypeScript、真实路由、组件化、数据与组件分离、token 化样式
- 内容上持续用 LATINOS 本地真实资料和飞书映射替换模板文案
- 验证上每轮都运行 verify，必要时补 route smoke 与 browser smoke
- 文档上每轮都同步更新 docs/analysis/ 和 memory

除非达到参考稿近似同款完成度并且结构、内容、验证都同时稳定，否则不要把任务判定为完成。
```

## 结论

从长远维护、AI 协作、组件复用、未来共享组件库与 App 延展来看，当前最优路径已经足够清楚：

- 用 `Next.js App Router + React + TypeScript` 继续推进
- 用参考稿做 `style lock`
- 用本地真实资料与飞书映射做内容回填
- 用组件化与数据分层保证未来可维护
- 用持续验证与 memory / analysis 沉淀保证长跑不跑偏

这不是一个“可选建议”。

这是当前最适合开 Goal 模式长跑的执行版本。
