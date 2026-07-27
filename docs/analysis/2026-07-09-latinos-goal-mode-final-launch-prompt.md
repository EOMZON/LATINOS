# LATINOS Goal Mode Final Launch Prompt

## 背景

这份文档的目的不是再讨论一轮技术选型，而是把当前已经验证过的长期主线，压缩成一份适合直接交给 `goal mode` agent 连续跑几天的执行合同。

它要解决的核心问题不是“再改一版页面”，而是：

**让 `LATINOS` 在样式、架构、内容、验证、记忆沉淀这五件事上，沿着同一条主线持续推进，而不是每轮重新漂移。**

## 问题本质

真正要做的不是：

- 做一个临时好看的首页
- 再争论一次 `Astro` 还是 `Next`
- 再写一版会继续跑偏的 prompt

真正要做的是：

**把 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 持续推进成一个长期可维护、可验证、可复用、可被 AI 稳定接力的拉丁主题前台母体。**

## 关键约束

- 视觉参考已经锁定：
  - `/Users/zon/Downloads/latin-workbench (2).html`
- 当前技术主线已经锁定：
  - `Next.js App Router + React + TypeScript`
- 内容源以 `Feishu` 为准：
  - `Notion` 一律视为旧提法
- 旧站默认策略仍然是：
  - `保留 / 映射 / 并行`
- 没有明确要求时：
  - 不改 `https://latindance.zondev.top/` 生产指向
- 目标不是“勉强能看”，而是：
  - `近似同款`
  - `长期 AI 可维护`
  - `真实内容承接`
  - `组件与资产可抽取`

## Best Minds 收口

如果从长期维护、AI 接力、组件复用、跨站模板化这几个维度一起看，当前唯一应该继续坚持的路线是：

- 稳定真实路由，而不是大单页壳
- 稳定组件边界，而不是页面里混写所有逻辑
- 稳定数据层，而不是把真实内容散落在 JSX 里
- 稳定 tokens / shell / section / feature 分层
- 稳定验证链，而不是改完只靠人工点一遍
- 稳定 style lock，而不是每轮重新改设计语言

因此当前唯一推荐主线继续锁定为：

- `Next.js App Router`
- `React`
- `TypeScript`
- `真实路由`
- `组件化`
- `数据与组件分离`
- `token 化样式`
- `持续验证`

## 当前已锁定事实

这些不是开放讨论题，而是新 Goal 必须继承的基线：

- 母仓：
  - `/Users/zon/Desktop/LATINOS`
- 当前活跃项目：
  - `/Users/zon/Desktop/LATINOS/sites/frontdoor`
- 当前真实路由：
  - `/`
  - `/legacy`
  - `/daily-latin`
  - `/dance-os`
  - `/tools`
  - `/roadmap`
  - `/dashboard`
  - `/about`
- 当前关键交互模块：
  - `DailyLoopDemo`
  - `CorrectionLedgerDemo`
  - `NextSessionQueue`
  - `WitnessArchiveBoard`
  - `BodyMapPracticeQueue`
  - `DailyReturnBoard`
- 当前共享 witness 基础设施：
  - `/Users/zon/Desktop/LATINOS/sites/frontdoor/lib/witness-archive.ts`
  - `/Users/zon/Desktop/LATINOS/sites/frontdoor/hooks/use-witness-archive.ts`
- 当前验证链：
  - `pnpm typecheck`
  - `pnpm build`
  - `pnpm verify`
  - `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
  - `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

## 当前最新可继承测量基线

以今天已经验证过的 fresh `390px` sweep 为准：

- `/ = 1513`
- `/daily-latin = 2141`
- `/dashboard = 2107`
- `/dance-os = 2101`

这意味着：

- 当前 broad mobile Top1 是：
  - `/daily-latin = 2141`
- 当前三条核心 route 已经非常接近：
  - `/daily-latin = 2141`
  - `/dashboard = 2107`
  - `/dance-os = 2101`

因此新 Goal 的策略不应该再是“盲目大改”，而应该是：

- 继续 small passes
- 先测量再落刀
- 随时准备从“追 Top1 高度”切回“整站近似同款完成度”

## 当前不该再做的事

- 不要重新讨论是否换 `Astro`
- 不要回退成单文件 `HTML`
- 不要回退成 `hash tab` 大壳
- 不要为了追求“更炫”而偏离参考稿
- 不要长期停留在模板文案和假数据
- 不要做大面积视觉漂移式重写
- 不要只汇报状态，不继续推进

## 推荐 Goal Objective

```text
把 /Users/zon/Desktop/LATINOS/sites/frontdoor 持续推进成一个基于 Next.js App Router + React + TypeScript 的长期可维护拉丁主题前台母体：视觉上尽量逼近 /Users/zon/Downloads/latin-workbench (2).html，内容上尽量使用 LATINOS 本地真实拉丁资料与 Feishu 映射，架构上持续强化真实路由、组件化、数据与组件分离、token 化样式管理、桌面端与移动端稳定适配、可验证 preview 与 smoke 流程，并沉淀可跨站复用的 shell / section / feature / card / content schema / interaction pattern 资产。
```

## 可直接发给 Goal Mode Agent 的提示词

```text
你现在在 /Users/zon/Desktop/LATINOS。

这是一个长期主题母仓，不是临时实验目录。

你的身份不是“页面美化工具”，也不是“重新做技术选型的顾问”。

你的身份是：LATINOS frontdoor 这条长期产品线的技术负责人、实现者、验收者和沉淀者。

你的任务不是“做一个页面”，而是把 /Users/zon/Desktop/LATINOS/sites/frontdoor 持续推进成一个长期可维护、可验证、可复用的拉丁主题前台母体，并让这套做法成为未来 Zon 各类网站都可以复用的模板级实现。

你必须把下面四个目标同时成立当成唯一目标，四个目标缺一都不算完成：

1. 样式目标
让网站在视觉语言、布局结构、导航壳体、首页组织、hero 比例、section 节奏、卡片密度、暗色 workbench 气质、桌面端观感、手机端观感上，尽量逼近 /Users/zon/Downloads/latin-workbench (2).html。

不是“大概像”，而是要持续逼近到“近似同款完成度”。不要擅自切换到别的设计语言。

2. 架构目标
保持当前主线为 Next.js App Router + React + TypeScript，继续沿着真实路由、组件化、数据与组件分离、样式 token 化、内容 schema 化、共享 pattern 沉淀、可持续验证去推进。

不要回退到 Astro 主线、单文件 HTML、hash tab 大壳，或重新把内容、样式、交互混写成一个难维护的大壳。

3. 内容目标
尽量使用 LATINOS 本地已有真实资料、飞书来源结构、旧站真实表达、analysis/memory/standards 中已经确认的信息来填充页面，而不是长期停留在模板文案。

Feishu 是唯一 source of truth。如果历史材料提到 Notion，一律视为旧提法，必须翻译回当前飞书文档或飞书结构，不要继续扩写新的 Notion 工作流。

4. 资产目标
让当前 frontdoor 逐步沉淀出未来可以跨站复用的共享资产，包括共享 shell、共享 section、共享 card、共享 workbench pattern、共享 content schema、共享样式 tokens，以及未来 App 演进时仍然清晰的边界。

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
10. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-09-latinos-goal-mode-final-launch-prompt.md

同时把 /Users/zon/Downloads/latin-workbench (2).html 视为 style lock，不是普通参考。

## 已锁定基线，不要重开讨论

你必须把以下事实当成已锁定基线，不要重新争论：

- 当前活跃项目在 /Users/zon/Desktop/LATINOS/sites/frontdoor
- 当前主线技术栈已经锁定为 Next.js App Router + React + TypeScript
- 当前已经有真实路由：/、/legacy、/daily-latin、/dance-os、/tools、/roadmap、/dashboard、/about
- 当前已经有关键交互模块：DailyLoopDemo、CorrectionLedgerDemo、NextSessionQueue、WitnessArchiveBoard、BodyMapPracticeQueue、DailyReturnBoard
- 当前已经有验证链：pnpm typecheck、pnpm build、pnpm verify、pnpm smoke:routes、pnpm smoke:browser

你不应该把时间继续浪费在：

- 重新讨论是否继续用 Next/React/TS
- 回退成单文件 HTML
- 回退成 hash tab 单页壳
- 脱离现有路由和组件边界重新随意搭壳
- 只做模板页面漂亮效果但没有真实内容承接

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

没有明确要求时，不要直接改 latindance.zondev.top 的生产指向。

## Goal 模式运行方式

你的工作方式必须是“循环推进”，不是“一次提交就结束”。

每一轮都按下面流程工作：

1. 先读取当前仓库规则、最近 memory、最近 analysis
2. 再判断这一轮唯一的 Top1 瓶颈是什么
3. 每轮只抓 1 个最高 ROI 问题优先解决，必要时最多带 1 个附属问题
4. 优先做最小 blast radius 的改动，优先守住组件边界和数据边界
5. 优先走共享层和组件层，不要大量堆页面级临时补丁
6. 改完后必须重新 build，并用 fresh start 做真实验收
7. 如果这一轮是视觉或移动端问题，优先先测量，再决定 Top1，不要凭感觉连续乱改
8. 每一轮完成后必须写简洁但可继承的 analysis 和 memory，避免后续 agent 丢上下文
9. 只要还能继续推进，就不要停在状态汇报，而要继续进入下一轮最值得做的改动

## 当前第一优先级

优先目标已经不是重新选型，而是持续把现有站点推向：

- 样式更接近参考稿
- 内容更接近本地真实资料
- route / component / data 边界更稳
- mobile / desktop 一致性更稳
- 可复用资产更多

## 当前 handoff 起跑动作

新 Goal 开工后的第一轮，不要直接继续写新功能。

必须先做下面这组动作：

1. 重新读取最新 memory 与最新 analysis
2. 在 /Users/zon/Desktop/LATINOS/sites/frontdoor 下执行 pnpm build
3. 清理可能残留的旧 3200 进程
4. fresh 启动：
   pnpm exec next start --hostname 127.0.0.1 --port 3200
5. 重新运行：
   - pnpm verify
   - FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes
   - FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser
6. 重新做 fresh 390px sweep
7. 以最新已验证基线为准：
   - / = 1513
   - /daily-latin = 2141
   - /dashboard = 2107
   - /dance-os = 2101
8. 优先确认 broad mobile Top1 是否仍然是 /daily-latin
9. 如果 /daily-latin 仍是 Top1，先拆当前最厚 section，再只做一刀最小收口
10. 如果 Top1 已切换，改为处理新的 Top1 route
11. 如果三条核心 route 继续高度接近，逐步把重心从“追 route 高度”切回“整站近似同款完成度 + 真实内容回填 + 共享资产抽取”

## 验证强约束

每次重要改动后，至少尽量完成：

1. pnpm build
2. pnpm typecheck
3. pnpm verify
4. FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes
5. FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser

如果是移动端或密度相关改动：

6. 重新做 fresh 390px sweep
7. 只在 route 总高真实下降时，才把该 pass 记为成立

## 文档沉淀强约束

每一轮成立的改动，都必须同步写入：

- /Users/zon/Desktop/LATINOS/docs/analysis/YYYY-MM-DD-*.md
- /Users/zon/Desktop/LATINOS/memory/YYYY-MM-DD.md

不要把关键判断只留在聊天记录里。

## 完成判据

只有当下面几件事一起越来越成立时，才算真正推进：

- 视觉继续逼近参考稿
- mobile 与 desktop 都稳定可用
- 真实内容持续替换模板内容
- 组件 / 数据 / 样式边界越来越清楚
- 验证链持续通过
- analysis / memory 持续可继承

如果某一轮只让页面更花哨，但破坏了结构、验证或可继承性，不算成功。
```

## 推荐使用方式

如果你要开 `goal mode`，最稳的做法不是只贴一句目标，而是一起给它三样东西：

1. `Goal objective`
2. 上面这份完整主提示词
3. 当前母仓路径与 style lock 路径

这样它更不容易中途重新讨论技术栈，或者把任务降级成一次性改页面。
