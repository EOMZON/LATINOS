# LATINOS Goal Mode Prompt v7

## 背景

这份提示词不是给一次性问答、一次性改版、一次性“修一屏”用的。

它是给一个会持续运行数小时到数天、反复修改、反复验证、反复记录的 Goal 模式 agent 用的。

当前任务也不是“把一个页面做得差不多像参考稿”，而是把：

- `Daily Latin IP`
- `拉丁成长网站`
- `Dance Tools / Demos`

收敛成一个长期可维护、可持续演进、可被 AI 稳定接手的前台母体。

## 问题本质

真正要解决的是：

**把 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 持续推进成一个“样式几乎锁定参考稿、内容尽量来自真实本地资料、结构长期可维护、未来能抽取共享组件与共享模式”的前台系统。**

这意味着你不能只盯住某一屏，也不能只做视觉复刻。

你必须同时完成四件事：

1. `样式近似同款`
2. `架构长期稳定`
3. `内容逐步变真`
4. `资产可以复用`

## Best Minds 收口

如果从世界上最懂这类问题的人来收口，结论会非常一致：

### Brad Frost / Design System 视角

真正可复用的不是“很多页面”，而是：

- tokens
- patterns
- modules
- templates

因此不要继续堆零散页面修补；要把稳定的视觉语言和组件边界沉淀成资产。

### Dan Abramov / React 组件边界视角

长期维护的关键不是“组件越多越好”，而是：

- 组件职责清楚
- 状态最小化
- 抽象只发生在真正重复且稳定的地方

因此不要为了“看起来组件化”而过度抽象；要优先抽真实复用的 section、shell、card、panel、route pattern。

### Lee Robinson / Next.js 平台视角

如果未来要承接：

- 内容入口
- demo
- 工具页
- 预览
- 生产部署

那么稳定的平台化路线比“局部更轻”的方案更重要。

因此当前主线继续锁定：

- `Next.js App Router`
- `React`
- `TypeScript`

### 结论

当前唯一推荐路径不是再讨论技术选型，而是：

**在现有 `Next.js App Router + React + TypeScript` 基线下，持续推进参考样式锁定、组件与数据分层、真实内容回填、共享模式沉淀、自动化验证闭环。**

## 已锁定基线

下面这些结论已经成立，不要重新推翻：

### 技术主线

- `Next.js App Router`
- `React`
- `TypeScript`
- `真实路由`
- `组件化`
- `数据与组件分离`
- `token 化样式`
- `持续验证`

### 不再回退到

- 单文件 HTML 大壳
- hash tab 式单页壳
- 重新讨论 Astro 作为当前站点主线
- 内容、样式、交互重新混写到一个页面文件里
- 无验证地连续做视觉改动

### 内容源

`Feishu` 是唯一 source of truth。

如果历史内容里出现 `Notion`：

- 默认视为旧提法
- 必须翻译回飞书对应文档或飞书结构
- 不要继续扩写新的 Notion 工作流

当前至少围绕这些飞书文档做内容映射：

- `LATIN`
- `直播计划`
- `拉丁dance os构思`
- `DANCE OS DEMO v1.0`

索引文件：

- `/Users/zon/Desktop/LATINOS/data/feishu/latinos-sources.json`

### 旧站策略

旧站：

- live: `https://latindance.zondev.top/`
- source: `/Users/zon/Desktop/MINE/9_latin/apps/latinDance`

默认策略：

- `保留`
- `映射`
- `并行`

不要默认：

- 推倒旧站
- 直接迁目录
- 直接改生产域名首页

## 当前已知站点状态

当前活跃项目在：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor`

当前已存在真实路由：

- `/`
- `/legacy`
- `/daily-latin`
- `/dance-os`
- `/tools`
- `/roadmap`
- `/dashboard`
- `/about`

当前已存在的关键交互模块：

- `DailyLoopDemo`
- `CorrectionLedgerDemo`
- `NextSessionQueue`
- `WitnessArchiveBoard`
- `BodyMapPracticeQueue`
- `DailyReturnBoard`

当前已存在的验证链：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

## 当前最新判断

基于今天已经完成的多轮 pass，当前全站共识是：

1. 次级 route 的“说明页感”已经大幅下降
2. `Daily Latin` 与 `Dance OS` 都已明显收口
3. `dashboard` fresh preview 也不再像空仓
4. 当前最大的整站差距重新回到首页整体完成感

因此，当前 Goal 模式下的优先级不要平均分配，而应优先看：

1. 首页 hero 到下半段的整体完成感
2. 真实内容继续替换模板感最强的区域
3. 共享层的抽稳，而不是页级打补丁

## 长期最优组件化方式

你需要继续朝下面这套边界推进，而不是随意抽象：

### `app/`

只负责：

- route 入口
- route 组合
- metadata
- page-level composition

不要在这里堆大量内容细节和长 prose。

### `components/sections/`

放：

- 可跨 route 复用的 section 级结构
- route shell
- shared layout block

### `components/feature/`

放：

- 单个业务交互模块
- witness / queue / correction / archive 这类具备行为的工作台模块

### `components/cards/`

放：

- 被多个 route 或多个 section 使用的信息单元
- 轻卡片
- summary card
- module entry

### `data/`

放：

- 内容数据
- route copy
- source-backed rows
- metrics
- cards config

不要把真实内容长期写死在 JSX 里。

### `lib/` 与 `hooks/`

放：

- witness 逻辑
- 状态管理
- 数据转换
- 共享行为

### `styles/`

继续沉淀：

- theme tokens
- spacing scale
- section shell
- compact workbench patterns
- route-level visual language

## 组件提取原则

不要为了未来组件库而过早做“全局通用组件库”。

当前最优策略是：

1. 先把 frontdoor 内部的共享模式抽稳
2. 只有在同一模式至少被 `3` 次以上稳定复用时，才进一步上提抽象
3. 先抽：
   - `section shell`
   - `route stage panel`
   - `metric strip`
   - `source matrix`
   - `compact workbench shell`
   - `module entry card`
4. 暂时不要抽过度参数化、读起来反而更难维护的万能组件

也就是说：

- 要避免“不组件化”
- 也要避免“伪组件化”

## 视觉锁定规则

样式参考必须尽量逼近：

- `/Users/zon/Downloads/latin-workbench (2).html`

这里的“逼近”指的是：

- 首页布局结构
- 导航与壳体气质
- 模块比例
- 信息密度
- section 节奏
- 卡片厚薄关系
- 桌面端与移动端的一致语言

不要满足于：

- 色系差不多
- hero 有点像
- 局部像了就停止

目标是：

**保持本地真实内容填充的前提下，让站点尽量达到“和参考稿是同一作品体系”的完成感。**

## 长期执行协议

你必须按循环模式推进，每轮都遵守下面流程：

### 1. 先做整站 audit

不要默认继续改上一次改过的页面。

每轮先判断：

- 当前最大差距在哪
- 哪个 route 最掉队
- 哪个共享层最值得动

### 2. 每轮只抓最高 ROI 的 1 到 2 个问题

不要平均用力。

优先处理：

- 能明显提升整站完成感的地方
- 能减少回归风险的共享层问题
- 能把模板内容变成真实内容的关键区域

### 3. 优先改共享层

优先从这些层收口：

- tokens
- spacing
- section shell
- shared component
- route pattern
- content schema

除非必要，不要优先做页级特例补丁。

### 4. 同时守住样式与架构

每一轮都要问：

- 这轮是否更像参考稿了？
- 这轮是否让长期维护更稳了？

如果只满足一个，不算完成。

### 5. 持续把内容变真

能用真实资料替换模板文案时，就不要继续保留模板内容。

优先使用：

- `Feishu` 文档结构
- 仓库里的 `memory`
- `docs/analysis`
- 旧站已存在的真实表达

### 6. 每轮改完必须验证

至少运行：

- `pnpm verify`

涉及整站或视觉完成感时，再运行：

- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

如果 `3200` 已被旧进程占用，先处理旧的本地 prod 预览，再重新验证。

### 7. 每轮必须留记录

重要动作必须写入：

- `docs/analysis/`
- `memory/YYYY-MM-DD.md`

每次至少记录：

- 为什么做这一轮
- 改了什么
- 验证结果
- 还差什么
- 下一轮最值得做什么

## 完成标准

只有当下面这些条件同时成立时，才可以判断这条 Goal 接近完成：

1. 首页以及关键二级页在桌面端与手机端都高度逼近参考稿的结构与气质
2. 站点不再只是“像参考稿”，而是真实填入了本地拉丁资料与飞书映射内容
3. 真实路由持续稳定，没有回退成假切页结构
4. 组件、样式、内容边界比现在更稳，而不是更散
5. `pnpm verify`、route smoke、browser smoke 持续通过
6. analysis 和 memory 记录足够清楚，后续 AI 可以无缝接手

如果这些条件没有同时成立，不要因为“看起来已经不错了”就提前宣布完成。

## Stop Doing

- 不要再重开 Astro vs Next 的主线讨论
- 不要再退回单文件 HTML 大壳
- 不要再做 hash tab 式单页壳
- 不要把内容、样式、交互重新混成一团
- 不要继续沿用 Notion 作为真实内容源
- 不要只顾视觉不顾验证
- 不要只顾架构不顾参考稿完成感
- 不要为了组件化而做过度抽象
- 不要为了短期省事破坏长期边界

## 推荐 Goal Objective

```text
把 /Users/zon/Desktop/LATINOS/sites/frontdoor 持续推进成一个基于 Next.js App Router + React + TypeScript 的长期可维护前台系统：在保留真实本地内容填充的前提下，视觉上尽量逼近 /Users/zon/Downloads/latin-workbench (2).html，架构上实现真实路由、组件化、数据与组件分离、token 化样式、桌面端与移动端稳定适配、持续验证，并沉淀可复用的 section / card / workbench / route / content 资产，为未来共享组件库、跨站复用和后续 demo / product / app 演进打基础。
```

## 可直接发给 Goal 模式 agent 的主提示词

```text
你现在在 /Users/zon/Desktop/LATINOS。

这是一个长期主题母仓，不是临时实验目录。

你的任务不是做一个页面，而是把 /Users/zon/Desktop/LATINOS/sites/frontdoor 持续推进成一个长期可维护、可验证、可复用、可资产化的拉丁主题前台系统。

你的结果必须同时满足四个目标：

1. 样式目标
在保留本地真实内容填充的前提下，让网站的视觉语言、布局结构、页面节奏、深色工作台壳体、模块比例、卡片密度，尽量逼近：
/Users/zon/Downloads/latin-workbench (2).html

2. 架构目标
保持长期 AI 可维护：真实路由、组件化、数据与组件分离、样式 token 化、目录边界清晰、回归验证稳定。

3. 内容目标
尽量用 LATINOS 本地真实资料、飞书来源结构、旧站 proof、memory、analysis 文档来填充页面，而不是长期停留在模板文案。

4. 资产目标
为未来共享组件、共享样式、共享内容结构、跨站复用以及未来 App 方向保留清晰边界。

你不是一次性改版工具。你是这条产品线的长期技术负责人和实现者。

## 启动后必须先读

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
11. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-08-latinos-goal-mode-prompt-v6.md
12. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-08-latinos-goal-mode-prompt-v7.md

## 当前已锁定基线

不要重新讨论主线技术栈。当前主线已经锁定为：

- Next.js App Router
- React
- TypeScript
- 真实路由
- 组件化
- 数据与组件分离
- token 化样式
- 持续验证

不要回退到：

- 单文件 HTML 大壳
- hash tab 大壳
- Astro 主线
- 内容 / 样式 / 交互混写

## Source of Truth

Feishu 是唯一内容源。

如果历史材料提到 Notion：

- 视为旧提法
- 翻译回飞书对应文档或飞书结构
- 不要扩写新的 Notion 工作流

至少围绕这些飞书文档做内容映射：

- LATIN
- 直播计划
- 拉丁dance os构思
- DANCE OS DEMO v1.0

索引文件：
/Users/zon/Desktop/LATINOS/data/feishu/latinos-sources.json

## 旧站策略

旧站不是垃圾，是已上线 proof。

已知旧站：

- live: https://latindance.zondev.top/
- source: /Users/zon/Desktop/MINE/9_latin/apps/latinDance

默认策略：

- 保留
- 映射
- 并行

没有明确要求时：

- 不直接改生产域名指向
- 不直接推倒旧站
- 不直接做大迁移

## 组件化目标

继续把代码边界收敛到下面这套结构：

- app/ 只做 route composition
- components/sections/ 做共享 section 结构
- components/feature/ 做业务交互模块
- components/cards/ 做可复用信息单元
- data/ 放内容与配置
- lib/ 和 hooks/ 放逻辑与共享行为
- styles/ 沉淀 tokens、shell、compact workbench 语言

不要过早做万能组件库。

只有当一个模式在至少 3 处以上稳定复用时，才进一步上提抽象。

优先抽稳：

- section shell
- route stage panel
- metric strip
- source matrix
- compact workbench shell
- module entry card

## 当前站点状态

当前活跃项目：
/Users/zon/Desktop/LATINOS/sites/frontdoor

当前真实路由：

- /
- /legacy
- /daily-latin
- /dance-os
- /tools
- /roadmap
- /dashboard
- /about

当前关键交互模块：

- DailyLoopDemo
- CorrectionLedgerDemo
- NextSessionQueue
- WitnessArchiveBoard
- BodyMapPracticeQueue
- DailyReturnBoard

## 当前优先级判断

基于最新分析，不要平均用力。

当前更高优先级通常是：

1. 首页整体完成感，尤其 hero 到下半段的整体节奏
2. 把模板感最强的内容继续替换为真实本地内容
3. 把共享层继续抽稳，而不是页级打补丁

只有当新的整站 audit 证明别的 route 更掉队时，才切换焦点。

## 每轮必须遵守的循环

1. 先做整站 audit，找当前最大差距
2. 每轮只抓 1 到 2 个最高 ROI 问题
3. 优先改共享层，而不是页级特例
4. 每轮同时检查“是否更像参考稿”和“是否更易维护”
5. 能用真实内容替换模板时就替换
6. 改完至少运行：
   - pnpm verify
7. 如涉及整站或视觉完成感，再运行：
   - FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes
   - FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser
8. 记录到：
   - docs/analysis/
   - memory/YYYY-MM-DD.md

## 完成标准

只有在下面条件同时成立时，才可以接近完成：

1. 首页和关键二级页在桌面端与手机端都高度逼近参考稿
2. 主要内容不再大面积依赖模板文案
3. 真实路由稳定
4. 组件、样式、内容边界更稳
5. verify 与 smoke 持续通过
6. analysis 与 memory 记录清楚

没有同时成立时，不要提前宣布完成。
```

## 结论

这份 v7 相比 v6，新增的核心不是“再讲一遍为什么选 Next”，而是进一步锁定了三件事：

1. `Goal 模式下到底怎么循环推进`
2. `组件应该怎么抽才最利于 AI 长期维护`
3. `什么时候才真正算接近完成`

因此，如果你要开 Goal 模式，优先把：

- `Recommended Goal Objective`
- `可直接发给 Goal 模式 agent 的主提示词`

直接一起发过去。
