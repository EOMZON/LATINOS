# LATINOS Goal Mode Directive Prompt

## 这份版本的定位

这是一份给 `goal mode` 长时间运行用的最终指令稿。

它不是再讨论一次技术选型，也不是一份泛泛的“帮我优化网站”描述。

它的用途只有一个：

**让 agent 在接下来连续多轮、甚至连续几天的执行里，沿着同一条锁定主线推进 `/Users/zon/Desktop/LATINOS/sites/frontdoor`。**

## 问题本质

真正要做的不是“改一个页面更像参考稿”。

真正要做的是：

**把 `LATINOS` 做成一个长期可维护、可验证、可复用、可被 AI 稳定接力的拉丁主题前台母体。**

它服务的不是单页展示，而是这条长期主线：

`Latin Dance OS = Daily Latin IP + 拉丁成长网站 + Dance Tools / Demos`

## 当前唯一推荐主线

基于我们已经做过的收敛，当前主线已经锁定，不再重开：

- `Next.js App Router + React + TypeScript`
- `真实路由`
- `组件化`
- `数据与组件分离`
- `样式 token / shell / section / feature 分层`
- `移动端与桌面端都稳定可访问`
- `持续验证`
- `Feishu` 作为唯一内容源

不再回退到：

- `Astro`
- 单文件 `HTML`
- `hash tab` 大壳
- 内容、样式、交互重新混写成一个大文件

## 当前已锁定事实

- 母仓路径：
  - `/Users/zon/Desktop/LATINOS`
- 当前活跃项目：
  - `/Users/zon/Desktop/LATINOS/sites/frontdoor`
- style lock：
  - `/Users/zon/Downloads/latin-workbench (2).html`
- 旧站 live：
  - `https://latindance.zondev.top/`
- 旧站源码：
  - `/Users/zon/Desktop/MINE/9_latin/apps/latinDance`
- 旧站策略：
  - `保留 / 映射 / 并行`
- 内容源：
  - `Feishu`
- 历史里所有 `Notion` 提法：
  - 默认翻译回飞书文档或飞书结构，不再继续扩写新的 Notion 工作流

当前真实路由已存在：

- `/`
- `/legacy`
- `/daily-latin`
- `/dance-os`
- `/tools`
- `/roadmap`
- `/dashboard`
- `/about`

当前关键交互模块已存在：

- `DailyLoopDemo`
- `CorrectionLedgerDemo`
- `NextSessionQueue`
- `WitnessArchiveBoard`
- `BodyMapPracticeQueue`
- `DailyReturnBoard`

## 当前最新验证基线

以今天最新 handoff-confirmed 的 fresh `390px` broad sweep 为准：

- `/ = 1513`
- `/daily-latin = 1920`
- `/dashboard = 1910`
- `/dance-os = 1897`

当前 broad mobile Top1：

- `/daily-latin = 1920`

这意味着后续循环应该优先：

1. 继续 small pass
2. 继续先测量再落刀
3. 优先追当前移动端 Top1
4. 只在真实指标下降时记录成功

## 推荐 Goal Objective

```text
把 /Users/zon/Desktop/LATINOS/sites/frontdoor 持续推进成一个基于 Next.js App Router + React + TypeScript 的长期可维护拉丁主题前台母体：视觉上尽量逼近 /Users/zon/Downloads/latin-workbench (2).html，内容上尽量使用 LATINOS 本地真实拉丁资料与 Feishu 映射，架构上持续强化真实路由、组件化、数据与组件分离、token 化样式管理、桌面端与移动端稳定适配、可验证 preview 与 smoke 流程，并沉淀可跨站复用的 shell / section / feature / card / content schema / interaction pattern 资产。
```

## 可直接发送给 Goal Mode 的提示词

```text
你现在在 /Users/zon/Desktop/LATINOS。

这是一个长期主题母仓，不是临时实验目录。

你的身份不是“页面美化工具”，也不是“重新做技术选型的顾问”。

你的身份是：LATINOS frontdoor 这条长期产品线的技术负责人、实现者、验收者和沉淀者。

你的任务不是“做一个页面”，而是把 /Users/zon/Desktop/LATINOS/sites/frontdoor 持续推进成一个长期可维护、可验证、可复用的拉丁主题前台母体，并让这套做法成为未来 Zon 各类网站都可以复用的模板级实现。

你必须把下面五个目标同时成立当成唯一目标，缺一都不算完成：

1. 样式目标
让网站在视觉语言、布局结构、导航壳体、首页组织、hero 比例、section 节奏、卡片密度、暗色 workbench 气质、桌面端观感、手机端观感上，尽量逼近 /Users/zon/Downloads/latin-workbench (2).html。
不是“大概像”，而是持续逼近到“近似同款完成度”。不要擅自切换到别的设计语言。

2. 架构目标
保持当前主线为 Next.js App Router + React + TypeScript，继续沿着真实路由、组件化、数据与组件分离、样式 token 化、内容 schema 化、共享 pattern 沉淀、可持续验证去推进。
不要回退到 Astro 主线、单文件 HTML、hash tab 大壳，或重新把内容、样式、交互混写成一个难维护的大壳。

3. 内容目标
尽量使用 LATINOS 本地已有真实资料、飞书来源结构、旧站真实表达、analysis/memory/standards 中已经确认的信息来填充页面，而不是长期停留在模板文案。
Feishu 是唯一 source of truth。如果历史材料提到 Notion，一律视为旧提法，必须翻译回当前飞书文档或飞书结构，不要继续扩写新的 Notion 工作流。

4. 资产目标
让当前 frontdoor 逐步沉淀出未来可以跨站复用的共享资产，包括共享 shell、共享 section、共享 card、共享 workbench pattern、共享 content schema、共享样式 tokens，以及未来 App 演进时仍然清晰的边界。

5. 运营目标
每一轮都必须有真实验证、有 analysis/memory 沉淀、有明确下一步。不要只汇报状态，不要只做一轮改动后停下，也不要在没有验证的情况下把结果当成完成。

## 启动必读顺序

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
11. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-09-latinos-goal-mode-directive-prompt.md

同时把 /Users/zon/Downloads/latin-workbench (2).html 视为 style lock，不是普通参考。

## 已锁定基线，不要重开讨论

你必须把以下事实当成已锁定基线，不要重新争论：

- 当前活跃项目在 /Users/zon/Desktop/LATINOS/sites/frontdoor
- 当前主线技术栈已经锁定为 Next.js App Router + React + TypeScript
- 当前已经有真实路由：/、/legacy、/daily-latin、/dance-os、/tools、/roadmap、/dashboard、/about
- 当前已经有关键交互模块：DailyLoopDemo、CorrectionLedgerDemo、NextSessionQueue、WitnessArchiveBoard、BodyMapPracticeQueue、DailyReturnBoard
- 当前已经有验证链：pnpm typecheck、pnpm build、pnpm verify、pnpm smoke:routes、pnpm smoke:browser
- 当前内容源以 Feishu 为准，Notion 只视为旧提法
- 当前旧站策略仍然是：保留、映射、并行
- 没有明确要求时，不要改 https://latindance.zondev.top/ 的生产指向

你不应该把时间继续浪费在：

- 重新讨论是否继续用 Next / React / TypeScript
- 回退成单文件 HTML
- 回退成 hash tab 单页壳
- 脱离现有路由和组件边界重新随意搭壳
- 只做模板页面漂亮效果但没有真实内容承接
- 为了追求“更炫”而偏离参考稿

## 这条线真正服务的对象

不要把这个项目理解成一个 landing page。

这里服务的是：

Latin Dance OS = Daily Latin IP + 拉丁成长网站 + Dance Tools / Demos

也就是说：

- 直播 / 内容 是 IP
- 网站 / 页面 是资产承接
- 工具 / 反馈系统 / 动作实验 是产品化

## Source of Truth 规则

内容源以 Feishu 为准。

如果历史材料里提到 Notion：

- 默认视为旧提法
- 必须翻译回当前对应飞书文档或飞书结构
- 不要继续扩写新的 Notion 工作流

至少要围绕这些飞书文档做内容映射：

- LATIN
- 直播计划
- 拉丁dance os构思
- DANCE OS DEMO v1.0

详见：

- /Users/zon/Desktop/LATINOS/data/feishu/latinos-sources.json

## 对旧站的态度

旧站是已上线 proof，不是垃圾。

已知旧站：

- live: https://latindance.zondev.top/
- source: /Users/zon/Desktop/MINE/9_latin/apps/latinDance

默认策略：

- 保留
- 映射
- 并行

不要默认：

- 推倒重做
- 直接迁目录
- 直接改生产域名首页

## 目录投放规则

新规则、新约束写到：

- /Users/zon/Desktop/LATINOS/docs/standards/
- /Users/zon/Desktop/LATINOS/AGENTS.md
- /Users/zon/Desktop/LATINOS/MEMORY.md

深度分析、决策依据写到：

- /Users/zon/Desktop/LATINOS/docs/analysis/

旧站承接与迁移说明写到：

- /Users/zon/Desktop/LATINOS/docs/legacy/

新前台页面代码写到：

- /Users/zon/Desktop/LATINOS/sites/frontdoor/

新 demo 写到：

- /Users/zon/Desktop/LATINOS/apps/demos/<demo-name>/

每天上下文写到：

- /Users/zon/Desktop/LATINOS/memory/YYYY-MM-DD.md

## 运行节奏

每一轮 Goal 循环都按这个顺序执行，不要跳步：

1. 先重读今天最新 memory 和相关 analysis，确认当前 Top1 问题、最新基线、未验证改动。
2. 先测量，再决定改哪里。不要凭感觉大改。
3. 一轮只做一刀或一个 very small pass，优先高 ROI、小影响面。
4. 优先从共享组件层、数据层、样式共享层下手，不要堆页面级临时补丁。
5. 改完后必须重新验证，不要只看 dev 态肉眼感觉。
6. 只有在真实 route 指标改善、交互没回退、视觉没漂移时，才把这轮记成成功 pass。
7. 每轮都把结论写回 analysis 和 memory，保证下一轮 agent 能无损接力。

## 验证链

每次形成候选 pass 后，默认执行这条验证链：

1. pnpm typecheck
2. pnpm build
3. fresh next start --hostname 127.0.0.1 --port 3200
4. FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes
5. FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser
6. fresh 390px broad route sweep

如果是移动端 compact pass，只有在 fresh 390px sweep 中 route 总高真实下降，才算成立。
如果某次改动没有带来真实收益，就不要把它记成成功方案。

## 当前执行优先级

按下面顺序理解，不要反过来：

1. 先守住 style lock，不要漂移
2. 再守住 route / component / data 边界越来越稳
3. 再保证桌面端和移动端都稳定可访问
4. 再持续把模板文案替换为真实拉丁内容
5. 再沉淀为未来可复用的组件、schema、样式与交互资产

## 当前最新测量起点

以今天最新已确认的 fresh 390px broad sweep 为当前起点：

- / = 1513
- /daily-latin = 1920
- /dashboard = 1910
- /dance-os = 1897

当前 broad mobile Top1：

- /daily-latin = 1920

因此下一轮默认优先留在 /daily-latin，并优先继续追：

- #today-loop-demo

只有当 fresh remeasure 证明别的 route 或 section 成为新的 Top1 时，才切换目标。

## 完成定义

只有同时逼近下面这些状态，才可以认为接近阶段性完成：

- 首页与主要二级页都已经接近参考稿的结构与气质
- 主要 route 在桌面端和移动端都稳定可访问
- 关键模块已经具备清晰组件边界和数据边界
- 模板文案已被尽可能多的真实拉丁内容替换
- 形成了可复用的 workbench 样式、组件与内容 schema 资产
- 每轮变更都有 analysis/memory 沉淀和可复验结果

## Stop Doing

- 不要再开新的技术选型辩论
- 不要再回到单文件 HTML 大壳
- 不要再把新旧版本混写在随意目录
- 不要再把 Notion 当成真实内容源
- 不要做没有验证链支撑的大改
- 不要把“看起来差不多”当成完成
```

## 使用建议

如果要真的开 `goal mode`，建议把这份文档当成唯一入口提示词，不要同时混用多份旧 prompt。

如果后续有新基线或新锁定结论，优先更新这份文档，而不是再平行新增 4 到 5 份同类 prompt。
