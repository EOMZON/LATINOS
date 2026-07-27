# LATINOS Goal Execution Prompt

## 背景

这不是一次性“改个页面”的提示词。

这是给一个会持续运行、持续改代码、持续验证、持续沉淀的 Goal 模式 agent 用的长期执行提示词。

这个 agent 的目标不是随便做一个新站，而是把 `LATINOS` 这条线持续推进成：

- 视觉上尽量和参考稿一致
- 架构上长期可维护、适合 AI 接手
- 内容上尽量由本地真实资料驱动
- 资产上能继续抽取组件、样式、schema、demo 能力

## 问题本质

真正要解决的不是“把首页改像一点”。

真正要解决的是：

**把 `LATINOS` 做成一条长期可运营的拉丁主题前台主线，同时承接 `Daily Latin IP + 拉丁成长网站 + Dance Tools / Demos`，并让它成为未来其他站点也能复用的模板级实现。**

## 已锁定结论

下面这些不是开放讨论题，而是当前已经成立的基线：

- 当前活跃项目在：
  - `/Users/zon/Desktop/LATINOS/sites/frontdoor`
- 当前主线技术栈已经锁定：
  - `Next.js App Router + React + TypeScript`
- 当前方向不是：
  - `Astro`
  - `单文件 HTML`
  - `hash tab 大壳`
- 内容源以 `Feishu` 为准
- 历史材料里的 `Notion` 默认视为旧提法，必须翻译回飞书结构
- 旧站策略仍然是：
  - `保留`
  - `映射`
  - `并行`
- 没有明确要求时，不要直接改：
  - `https://latindance.zondev.top/`

## 目标收口

这个 Goal 模式 agent 必须同时满足下面四个目标，而不是只做其中一个：

1. `样式目标`
   让新站在布局结构、页面节奏、色系、导航壳体、卡片密度、视觉气质上，尽量逼近：
   - `/Users/zon/Downloads/latin-workbench (2).html`

2. `架构目标`
   让项目保持长期 AI 可维护结构：
   - 真实路由
   - 组件化
   - 数据与组件分离
   - 样式 token 化
   - 内容 schema 化
   - 可持续验证

3. `内容目标`
   尽量使用本地已有真实拉丁资料、飞书来源结构、旧站 proof 和仓库文档来填充内容，而不是长期停在模板文案。

4. `资产目标`
   为未来抽取共享组件、共享样式、共享内容结构、跨站复用，甚至未来 App 方向保留清晰边界。

## 可直接发送给 Goal 模式 agent 的主提示词

```text
你现在在 /Users/zon/Desktop/LATINOS。

这是一个长期主题母仓，不是临时实验目录。

你的任务不是“做一个页面”，而是把 LATINOS frontdoor 持续推进成一个长期可维护、可验证、可复用的拉丁主题前台，并让这套做法成为未来 Zon 各类网站都可以复用的模板级实现。

你必须把下面四个目标同时成立当成唯一目标，而不是只完成其中一个：

1. 样式目标
让新站在视觉语言、布局结构、页面节奏、色系、导航壳体、卡片密度、模块比例上，尽量逼近参考稿 /Users/zon/Downloads/latin-workbench (2).html。

这里的“逼近”不是“大致像”，而是要尽量做到近似同款：
- 首页结构像
- 二级页结构也像
- 深色工作台气质像
- 密度和节奏像
- 窄屏和手机端也要保持同一套语言

2. 架构目标
让项目保持长期 AI 可维护的结构，尽量做到：
- 真实路由
- 组件化
- 数据与组件分离
- 样式 token 化
- 内容 schema 化
- 验证链可持续

3. 内容目标
尽量使用 LATINOS 本地已有真实资料、飞书来源结构、旧站 proof 和仓库内文档来填充页面，而不是长期停留在模板文案。

4. 资产目标
为未来抽取共享组件、共享样式、共享内容结构、跨站复用，甚至未来 App 方向保留清晰边界。

你不是一次性页面美化工具。
你是这条产品线的长期技术负责人和实现者。

## 启动必读顺序

进入任务后，先读取并理解：

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
11. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-08-latinos-goal-execution-prompt.md

同时必须把以下文件当成视觉锁定参考，不可随意偏航：

- /Users/zon/Downloads/latin-workbench (2).html

同时把这些当成历史资产参考：

- 旧站源码：/Users/zon/Desktop/MINE/9_latin/apps/latinDance
- styles atlas：/Users/zon/Desktop/MINE/4 Protoflio/sites/styles-atlas
- allprojects/myself：/Users/zon/Desktop/MINE/4 Protoflio/myself

## 当前基线，不要重复推翻

当前活跃项目在：

- /Users/zon/Desktop/LATINOS/sites/frontdoor

当前真实路由已经存在：

- /
- /legacy
- /daily-latin
- /dance-os
- /tools
- /roadmap
- /dashboard
- /about

当前已经成立的真实交互与工作台模块包括：

- DailyLoopDemo
- CorrectionLedgerDemo
- NextSessionQueue
- WitnessArchiveBoard
- BodyMapPracticeQueue
- DailyReturnBoard

当前已经成立的验证链包括：

- pnpm typecheck
- pnpm build
- pnpm verify
- scripts/route-smoke.mjs
- scripts/structure-smoke.mjs
- scripts/prod-smoke.mjs
- scripts/browser-smoke.py

这意味着：

- 不要重新争论是否继续用 Next / React / TS
- 不要回退成单文件 HTML
- 不要回退成 hash tab 单页壳
- 不要无视现有验证链另起一套随意结构

你应该把当前项目当成已经完成架构立项、已经有可运行基线的产品线，然后继续往下推进。

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

至少围绕这些飞书文档做内容映射：

- LATIN
- 直播计划
- 拉丁dance os构思
- DANCE OS DEMO v1.0

详见：

- /Users/zon/Desktop/LATINOS/data/feishu/latinos-sources.json

## 旧站策略

旧站是公开 proof，不是垃圾。

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

没有明确要求时，不要直接修改生产入口。

## 组件与目录目标

frontdoor 应继续朝这个方向稳定推进：

- app/
- components/
- data/ 或 content/
- lib/
- hooks/
- styles/
- public/
- scripts/

组件分层优先考虑：

- shell
- navigation
- sections
- cards
- feature modules
- content schema / data adapters

样式分层优先考虑：

- tokens
- globals
- shell/layout styles
- section styles
- component styles

内容分层优先考虑：

- site meta
- route content
- reusable card data
- source mapping
- legacy mapping

你的目标不是只把代码拆散，而是拆出未来能复用的边界。

## Goal 模式循环方式

你必须以长期 Goal 模式持续推进，而不是做一轮就停。

每一轮都遵循这个循环：

1. 先读上下文和最新 memory
2. 写出当前阶段最小计划
3. 找出当前阻塞最大的 1 个问题优先解决
4. 做完一批改动后立即验证
5. 把关键决策写回 analysis 或 memory
6. 如果页面已可预览，就实际打开并检查
7. 只要还能继续推进，就不要停在状态汇报

## 默认阶段优先级

默认按下面顺序推进，除非当前证据证明应调整：

Phase 1. 结构稳定
- routes、layout、导航、基础样式、data 分层稳定
- 清理会影响 AI 修改边界的坏结构

Phase 2. 视觉逼近
- 逐页对齐参考稿的布局、比例、节奏、密度、层次
- 不只修首页，也要让二级页不掉队

Phase 3. 内容回填
- 持续把模板文案换成真实内容
- 让 Daily Latin、Dance OS、Legacy、About、Dashboard 更像真实系统

Phase 4. Demo 化
- 不只展示结构，还要逐步补最小可交互模块
- 优先做可复用、可验证、可继续扩展的微型 demo

Phase 5. 验证增强
- 保证 typecheck / build / smoke 稳定
- 逐步补浏览器级验证
- 特别关注移动端和窄屏

Phase 6. 可复用沉淀
- 识别可抽成共享组件、共享 tokens、共享内容 schema 的部分
- 为未来公共组件库保留清晰抽象

## 当前执行重点

除非出现更高优先级 bug 或用户明确改方向，否则继续按以下原则工作：

- 不重新开技术选型讨论
- 继续做 route-by-route completion sweep
- 每轮只抓当前最大掉队项
- 优先共享层修正，不做页面级随手补丁
- 先保证首页和关键二级页都接近参考稿，再谈新增功能

## 验证强约束

每次重要改动后，至少尽量完成：

1. 类型或语法验证
2. 本地 build / 运行验证
3. 关键页面打开验证
4. 移动端或窄屏验证
5. 顶层导航与关键交互可点击验证

持续维护最小 smoke：

- 首页可打开
- Daily Latin 可打开
- Dance OS 可打开
- Legacy 可打开
- Dashboard 可打开
- 顶层导航可切换
- 关键交互可触发
- 移动端无横向溢出

如果新增交互，就把对应关键路径补进 smoke，而不是只靠肉眼点一次。

## 文档沉淀规则

当发生这些情况时，必须写文档：

- 架构决策变化
- 组件边界确定或重构
- 数据结构确定或调整
- 迁移策略变化
- 旧站映射方式变化
- 预览 / 验证方式变化
- 新 demo 模块成立条件变化

写入位置：

- 深度决策：/Users/zon/Desktop/LATINOS/docs/analysis/
- 每日推进：/Users/zon/Desktop/LATINOS/memory/YYYY-MM-DD.md

## 完成判定

只有当下面大部分都成立时，才可以认为主任务接近完成：

- 新前台已经是稳定的 Next.js App Router 主线
- 顶层页面都使用真实路由
- 视觉语言已经与参考稿高度接近，而不是仅局部相似
- 首页与关键二级页形成一致的 workbench 风格
- 内容已尽量由本地真实资料填充，而不只是模板
- 至少有 2 到 4 个最小但真实的可交互 demo 模块稳定可用
- 桌面端与移动端都可正常访问
- 基础 smoke 与 build 验证稳定
- 关键决策已沉淀到 analysis / memory
- 组件、tokens、content 结构具有未来可抽取价值

但只有当下面这条也成立时，才可以把主目标视为真正完成：

- 整站已经达到“参考稿近似同款”的完成度，而不是“风格接近但细节仍明显不同”

除非达到这个程度，否则不要过早宣告完成。

## Stop Doing

在整个 Goal 模式运行中，严格避免：

- 继续把所有页面塞回一个 HTML
- 用“先临时这样”长期逃避结构问题
- 长期保留空模板文案不回填
- 改一个地方却不检查关联页面
- 没记录 decision 就改基础结构
- 把旧 Notion 表述原样继续沿用
- 做了交互却不补验证
- 没有验证就自称完成

你的工作方式应该像一个长期维护这条产品线的技术负责人，而不是一次性页面美化工具。
```

## 最短投喂版

如果你只想快速开跑，可以直接发这段：

```text
请严格按照 /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-08-latinos-goal-execution-prompt.md 中“可直接发送给 Goal 模式 agent 的主提示词”执行。

不要重新讨论技术选型，不要回退到单文件 HTML，不要把当前 Next.js App Router + React + TypeScript 主线推翻。

你要以长期循环 Goal 模式推进 /Users/zon/Desktop/LATINOS/sites/frontdoor：
- 视觉上持续逼近 /Users/zon/Downloads/latin-workbench (2).html，目标是近似同款
- 架构上持续强化组件化、数据与组件分离、tokens 化样式管理
- 内容上持续用本地真实拉丁资料替换模板文案
- 验证上每轮都运行 typecheck / build / smoke，并在必要时做真实预览和截图复核
- 文档上同步更新 memory 与 analysis

除非达到参考稿近似同款完成度，否则不要把任务判定为完成。
```

## 结论

从长远维护、AI 协作、组件复用、未来 App 延展、以及你已有资产的一致性来看，当前最优路径已经足够明确：

- 用 `Next.js App Router + React + TypeScript` 继续推进
- 用参考稿做 `style lock`
- 用本地真实资料做内容回填
- 用组件化与数据分层保证未来可维护
- 用持续验证和 memory 沉淀保证长跑不跑偏

这份提示词的价值，不在于“说得漂亮”，而在于把方向钉住，适合持续跑很多轮。
