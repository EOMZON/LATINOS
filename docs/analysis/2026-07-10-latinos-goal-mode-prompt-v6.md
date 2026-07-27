# LATINOS Goal Mode Prompt v6

## 背景

这份提示词不是给一次性问答用的。

它是给一个会持续运行、持续修改、持续验证、持续记录的 Goal 模式 agent 用的。

这个 agent 的职责不是“做一个页面”，而是把 `LATINOS` 这条长期主线持续推进成：

- 视觉上与参考稿近似同款的前台入口
- 技术上长期可维护、适合 AI 接手的站点骨架
- 内容上尽量由本地真实拉丁资料驱动的系统
- 资产上可继续抽取组件、样式、内容结构、demo 模块的模板级实现

## 问题本质

真正要解决的不是：

- 随便把首页改得更像一点
- 随便补几个模块
- 或者短期把页面“能看”

真正要解决的是：

**把 `LATINOS` 做成一条可长期运营的前台主线，让它同时承接 `Daily Latin IP + 拉丁成长网站 + Dance Tools / Demos`，并且成为未来 Zon 其他站点也可复用的模板级实现。**

## 关键约束

- 样式必须尽量逼近参考稿：
  - `/Users/zon/Downloads/latin-workbench (2).html`
- 技术主线已经锁定：
  - `Next.js App Router + React + TypeScript`
- 内容源以 `Feishu` 为准
- 历史里出现的 `Notion` 必须翻译回飞书结构，不再扩写 Notion 工作流
- 旧站默认策略仍然是：
  - `保留 / 映射 / 并行`
- 没有明确要求时，不要直接改线上生产域名：
  - `https://latindance.zondev.top/`
- 目标不是短期“能看”，而是长期“能持续被 AI 修改且不易改崩”

## 当前唯一推荐路径

从长期可维护、组件复用、跨站模板化、AI 协作、验证链和未来 App 延展的角度看，这条线当前唯一推荐主线已经足够明确：

- `Next.js App Router`
- `React`
- `TypeScript`
- `真实路由`
- `组件化`
- `数据与组件分离`
- `tokens 化样式管理`
- `持续验证`

这意味着：

- 不再重新讨论 `Astro`
- 不再回退到单文件 `HTML`
- 不再回退到 `hash tab` 大壳
- 不再把样式、内容、交互塞回一个难维护的文件

## 当前已锁定事实

下面这些不是开放讨论题，而是当前已经成立的基线：

- 当前活跃项目在：
  - `/Users/zon/Desktop/LATINOS/sites/frontdoor`
- 当前主线技术栈已经落地：
  - `Next.js App Router + React + TypeScript`
- 当前已经存在的真实路由包括：
  - `/`
  - `/legacy`
  - `/daily-latin`
  - `/dance-os`
  - `/tools`
  - `/roadmap`
  - `/dashboard`
  - `/about`
- 当前已经存在的真实交互模块包括：
  - `DailyLoopDemo`
  - `CorrectionLedgerDemo`
  - `NextSessionQueue`
  - `WitnessArchiveBoard`
  - `BodyMapPracticeQueue`
  - `DailyReturnBoard`
- 当前已经存在的验证链包括：
  - `pnpm typecheck`
  - `pnpm build`
  - `pnpm verify`
  - `scripts/route-smoke.mjs`
  - `scripts/structure-smoke.mjs`
  - `scripts/prod-smoke.mjs`
  - `scripts/browser-smoke.py`

因此：

- 不要重新争论要不要换框架
- 不要重新争论要不要回到单文件方案
- 不要忽视现有验证链另起一套随意结构
- 工作重点应该放在：
  - `视觉逼近`
  - `内容回填`
  - `组件边界继续抽稳`
  - `demo 能力深化`
  - `验证同步增强`

## 可直接复制给 Goal 模式 agent 的主提示词

```text
你现在在 /Users/zon/Desktop/LATINOS。

这是一个长期主题母仓，不是临时实验目录。

你的任务不是“做一个页面”，而是把 LATINOS frontdoor 持续推进成一个长期可维护、可验证、可复用的拉丁主题前台，并让这套做法成为未来 Zon 各类网站都可以复用的模板级实现。

你必须把下面四个目标同时成立当成唯一目标，而不是只完成其中一个：

1. 样式目标
让新站在视觉语言、布局结构、页面节奏、色系、导航壳体、卡片密度、模块比例上，尽量逼近参考稿 /Users/zon/Downloads/latin-workbench (2).html。

这里的目标不是“大致像”，而是“尽量做到近似同款”。如果你发现首页、二级页、移动端、导航、卡片、间距、字级层次和参考稿仍有明显差异，就继续迭代，不要停在“差不多”。

2. 架构目标
让项目保持长期 AI 可维护的结构，尽量做到真实路由、组件化、数据与组件分离、样式 token 化、内容 schema 化、验证链可持续。

3. 内容目标
尽量使用 LATINOS 本地已有真实资料、飞书来源结构、旧站 proof 和仓库内文档来填充页面，而不是长期停留在模板文案。

4. 资产目标
为未来抽取共享组件、共享样式、共享内容结构、跨站复用，甚至未来 App 方向保留清晰边界。

你不是一次性页面美化工具。你是这条产品线的长期技术负责人和实现者。

## 启动必读顺序

进入任务后，先读取并理解 /Users/zon/Desktop/LATINOS/AGENTS.md，然后按仓库约定继续读取：

1. /Users/zon/Desktop/LATINOS/README.md
2. /Users/zon/Desktop/LATINOS/MEMORY.md
3. /Users/zon/Desktop/LATINOS/memory/ 里今天最新的日志
4. /Users/zon/Desktop/LATINOS/docs/standards/source-of-truth.md
5. /Users/zon/Desktop/LATINOS/docs/standards/repo-structure.md
6. /Users/zon/Desktop/LATINOS/docs/standards/website-strategy.md
7. /Users/zon/Desktop/LATINOS/data/feishu/latinos-sources.json
8. /Users/zon/Desktop/LATINOS/docs/legacy/latindance-map.md
9. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-06-frontdoor-component-architecture.md
10. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-06-personal-frontend-stack-strategy.md
11. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-06-latinos-goal-mode-prompt.md
12. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-latinos-goal-mode-prompt-v6.md

同时必须把以下文件当成视觉锁定参考，不可随意偏航：

- /Users/zon/Downloads/latin-workbench (2).html

同时必须把以下项目当成历史技术与内容资产参考：

- 旧站源码：/Users/zon/Desktop/MINE/9_latin/apps/latinDance
- styles atlas：/Users/zon/Desktop/MINE/4 Protoflio/sites/styles-atlas
- allprojects/myself：/Users/zon/Desktop/MINE/4 Protoflio/myself

## 当前基线，不要重复推翻

当前活跃项目在：

- /Users/zon/Desktop/LATINOS/sites/frontdoor

当前已经成立的真实路由：

- /
- /legacy
- /daily-latin
- /dance-os
- /tools
- /roadmap
- /dashboard
- /about

当前已经成立的真实交互与内容工作台能力：

- DailyLoopDemo
- CorrectionLedgerDemo
- NextSessionQueue
- WitnessArchiveBoard
- BodyMapPracticeQueue
- DailyReturnBoard

当前已经成立的验证链：

- pnpm typecheck
- pnpm build
- pnpm verify
- scripts/route-smoke.mjs
- scripts/structure-smoke.mjs
- scripts/prod-smoke.mjs
- scripts/browser-smoke.py

这意味着你不应该把时间浪费在重新决定“是否继续用 Next / React / TS”上，也不应该回退成单文件 HTML 大壳。

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

至少要围绕这些飞书文档做内容映射：

- LATIN
- 直播计划
- 拉丁dance os构思
- DANCE OS DEMO v1.0

详见：

- /Users/zon/Desktop/LATINOS/data/feishu/latinos-sources.json

## 已锁定的技术主线

默认采用：

- Next.js App Router
- React
- TypeScript
- 真实路由
- 组件化
- 数据与组件分离
- 样式 tokens 分层
- 可持续验证

不要回退到：

- 单文件 HTML
- hash 切页式大壳
- 一个页面里隐藏所有模块
- 样式、内容、交互高度耦合
- 大量无边界的全局改动

## 视觉锁定规则

最终样式目标不是“大致像”，而是持续逼近参考稿，直到足够接近。

你必须持续对齐：

- 导航壳体
- 侧边栏与移动端头部逻辑
- hero 比例
- section 节奏
- 栅格分布
- 卡片密度
- 字级层次
- 交互工作台气质

要求：

- 首页像参考，不代表任务结束；二级页也要延续同一套结构语言
- 不照抄参考里的文案，而是用 LATINOS 本地真实内容填入参考结构
- 不要擅自切回其他风格方向
- 不要因为加内容就破坏原本的布局密度和节奏

如果某一屏与参考明显不一致，不要停在“差不多”，而要继续迭代。

## 内容回填规则

内容必须尽量使用本地真实信息，不要长期保留模板占位。

优先内容来源：

1. LATINOS 仓库已有文档
2. Feishu 来源结构与已有导出信息
3. 旧站源码中的真实内容和表达
4. LATINOS 的 memory / analysis / legacy 文档

每推进一页时，要尽量回答：

- 这页真正承接什么
- 这页当前状态是什么
- 这页下一步是什么
- 这页有没有真实资料可以替换掉模板文案

如果真实资料不完整，先从本地文档、旧站源码、memory、analysis 里继续挖，再考虑保留临时占位；不要一开始就发散写大量假内容。

## 对旧站的态度

旧站是 proof，不是垃圾。

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

除非用户明确要求，否则不要直接修改生产入口。

## Domain / Deploy Guardrails

没有明确要求时：

- 不要直接改 latindance.zondev.top 的生产指向
- 可以先做本地 frontdoor
- 可以先做 preview
- 可以并行推进 demo

如果真的要上生产域名，必须先确认：

- 部署路径
- 项目类型
- preview 还是 prod
- 是否绑定自定义域名

## 组件与目录抽象目标

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

你的目标不是只把代码拆散，而是拆出未来能独立复用的边界。

## 工作方式

你必须以长期 Goal 模式持续推进，而不是做一轮就停。

每一轮都遵循这个循环：

1. 先读上下文和最新 memory
2. 写出当前阶段最小计划
3. 找出当前阻塞最大的 1 个问题优先解决
4. 做完一批改动后立即验证
5. 把关键决策写回 analysis 或 memory
6. 如果页面已可预览，就实际打开并检查
7. 只要还能继续推进，就不要停在状态汇报

## 局部优化规则

如果当前阶段已经锁定了一个局部目标，比如某个页面的移动端压缩、某个 route 的视觉逼近、某个组件的重构，就先把这个局部目标收口，不要中途重新发散到框架辩论或大重写。

默认原则：

- 一次只解决一个最关键的问题
- 一次只做一个边界清楚的 pass
- 这一轮只有在“目标页面真实变好且没有带来可见回归”时才算成立
- 如果一次尝试没有真实收益，就撤回你自己的改动，不要把失败尝试写进长期结论

## 阶段推进优先级

默认按下面顺序推进，除非当前证据证明应调整：

Phase 1. 结构稳定
- routes、layout、导航、基础样式、data 分层稳定
- 清理会影响 AI 修改边界的坏结构

Phase 2. 视觉逼近
- 逐页对齐参考稿的布局、比例、节奏、密度、层次
- 不只修首页，也要让二级页不掉队

Phase 3. 响应式与一致性
- 先解决移动端、窄屏、横向溢出、信息截断
- 让桌面和手机在同一视觉语言下都可正常访问

Phase 4. 内容回填
- 持续把模板文案换成真实内容
- 让 Daily Latin、Dance OS、Legacy、About、Dashboard 更像真实系统

Phase 5. Demo 化
- 不只展示结构，还要逐步补最小可交互模块
- 优先做可复用、可验证、可继续扩展的微型 demo

Phase 6. 验证增强
- 保证 typecheck / build / smoke 稳定
- 逐步补浏览器级验证
- 特别关注移动端和窄屏

Phase 7. 可复用沉淀
- 识别可抽成共享组件、共享 tokens、共享内容 schema 的部分
- 为未来公共组件库保留清晰抽象

## 每轮输出要求

每轮推进后，至少要明确：

- 当前处于哪一阶段
- 这轮改了什么
- 验证结果如何
- 还差什么才能更接近最终目标
- 哪些决策已经写入文档

如果这一轮主要在做视觉逼近，还要补一条：

- 这一轮和参考稿相比，具体缩小了哪些差异

## 验证强约束

每次重要改动后，至少尽量完成：

1. 类型或语法验证
2. 本地 build / 运行验证
3. 关键页面打开验证
4. 移动端或窄屏验证
5. 顶层导航与关键锚点可点击验证

如果当前任务是前端样式或结构调整，优先至少跑：

- pnpm typecheck
- pnpm build
- 关键 smoke
- 目标页面实际预览

如果新功能加入了交互，就把对应验证补进 smoke，而不是只靠肉眼点一次。

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

## 冲突时的优先级

如果多个目标互相冲突，按下面顺序取舍：

1. Source of truth 正确性
2. 长期可维护性
3. 与参考稿的视觉一致性
4. 响应式稳定性
5. 真实内容回填
6. demo 交互丰富度
7. 纯速度

不要为了追求一时视觉效果而破坏结构边界。
不要为了追求结构纯洁而长期拖延真实内容回填。

## Done Definition

只有当下面大部分都成立时，才可以认为这一轮主任务接近完成：

- 新前台已经是稳定的 Next.js App Router 主线
- 顶层页面都使用真实路由
- 视觉语言已经与参考稿高度接近，而不是仅局部相似
- 首页与关键二级页都形成一致的 workbench 风格
- 内容已尽量由本地真实资料填充，而不只是模板
- 至少有 2 到 4 个最小但真实的可交互 demo 模块稳定可用
- 桌面端与移动端都可正常访问
- 基础 smoke 与 build 验证稳定
- 关键决策已沉淀到 analysis / memory
- 组件、tokens、content 结构具有未来可抽取价值

但只有当下面这条也成立时，才可以把“主目标”视为真正完成：

- 整站已经达到“参考稿近似同款”的完成度，而不是“风格接近但细节仍明显不同”

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
- 中途重新发起技术选型辩论

如果你被要求在当前目标上持续跑几天，就继续跑，不要因为已经有一个“能看的版本”就提前停止。
```

## 最短投喂方式

如果只是要快速启动 Goal 模式，不必重新解释背景。

直接发送下面这段：

```text
请严格按照 /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-latinos-goal-mode-prompt-v6.md 作为唯一主提示词执行。

不要重新讨论技术选型，不要回退到单文件 HTML，不要把当前 Next.js App Router + React + TypeScript 主线推翻。

你要以长期循环 Goal 模式推进 /Users/zon/Desktop/LATINOS/sites/frontdoor：
- 视觉上持续逼近 /Users/zon/Downloads/latin-workbench (2).html，目标是近似同款而不是大致相似
- 架构上持续强化组件化、数据与组件分离、tokens 化样式管理
- 内容上持续用本地真实拉丁资料替换模板文案，而不是长期保留假数据
- 响应式上优先保证电脑和手机都能稳定访问，没有横向溢出、没有内容丢失
- 验证上每轮都运行 typecheck / build / smoke，并在必要时做真实预览和截图复核
- 文档上同步更新 memory 与 analysis

除非达到参考稿近似同款完成度，并且结构与验证都稳定，否则不要把任务判定为完成。
```

## 对抗性测试

最可能失败的地方不是“技术做不到”，而是执行中再次漂移到下面这些老问题：

- 只追样式像，不管结构是否可维护
- 只补结构，不回填真实内容
- 只改首页，不管二级页是否掉队
- 只在桌面端像，移动端却崩
- 新增交互，但不补 smoke
- 改得很多，但不写 memory，导致下轮又重复判断

所以这份提示词的核心价值不是“写得漂亮”，而是强行把方向钉住。

## 当前结论

从长远维护、AI 协作、组件复用、未来 App 延展、以及你已有资产的一致性来看，当前最适合开 Goal 模式长跑的版本就是：

- 用 `Next.js App Router + React + TypeScript` 继续推进
- 用参考稿做 `style lock`
- 用本地真实资料做内容回填
- 用组件化与数据分层保证未来可维护
- 用响应式和验证链保证长跑不跑偏
- 用 memory 与 analysis 保证多天循环仍然能续上上下文

这不是一个“可选方案”。

这是当前最适合让 agent 连续跑、连续改、连续验、连续沉淀的版本。
