# LATINOS Goal Mode Prompt · Long-Run Version

## 背景

这份提示词不是给一次性问答用的。

它是给一个会持续运行、持续修改、持续验证、持续沉淀的 Goal 模式 agent 用的。

当前 `LATINOS` 已经不是“要不要立项”的阶段，而是：

- 技术主线已经锁定
- 目录边界已经锁定
- 旧站策略已经锁定
- 风格参考已经锁定
- 当前前台项目已经在持续演进中

因此，现在最重要的不是继续讨论“用什么”，而是把这条线稳定推进到真正满足目标的版本。

## 问题定义

真正要解决的不是“把某一屏再改像一点”。

真正要解决的是：

**把 `LATINOS` 做成一个长期可维护、可被 AI 持续接手、视觉上高度贴近参考稿、内容上尽量由真实拉丁资料驱动、并且未来可沉淀为共享组件与内容资产体系的前台主线。**

## 关键约束

- 风格参考锁定为：
  - `/Users/zon/Downloads/latin-workbench (2).html`
- 技术主线锁定为：
  - `Next.js App Router + React + TypeScript`
- 当前活跃项目锁定为：
  - `/Users/zon/Desktop/LATINOS/sites/frontdoor`
- 内容源锁定为：
  - `Feishu`
- 历史材料中的 `Notion`：
  - 统一视为旧提法
  - 必须翻译回当前飞书文档或飞书结构
- 旧站策略锁定为：
  - `保留 / 映射 / 并行`
- 没有明确要求时：
  - 不直接改 `https://latindance.zondev.top/` 生产入口

## Best Minds 收口

如果从长期可维护、AI 协作、设计系统积累、组件复用、未来跨站扩展、以及可能延伸到 App 的角度看，这件事的最优路径已经足够明确。

从 `Brad Frost` 的组件化与 design system 思路看，应该持续把页面拆成稳定、可复用、可组合的边界，而不是回到单文件大壳。

从 `Vercel / Next.js` 的长期产品主线看，当前最优不是重新做技术选型，而是利用已经成立的 `App Router + React + TypeScript` 基线，把真实路由、布局壳、数据层、交互模块和验证链继续做稳。

从长期个人资产沉淀的角度看，最重要的不是临时做出一个页面，而是把：

- 样式 token
- 组件边界
- 内容 schema
- 数据映射
- 路由结构
- smoke / browser 验证

沉淀成之后其他网站也能借用的模板级资产。

所以当前唯一推荐路线不是继续摇摆，而是：

- `Next.js App Router`
- `React`
- `TypeScript`
- `真实路由`
- `组件化`
- `数据与组件分离`
- `tokens 化样式管理`
- `持续验证`
- `参考稿 style lock`

## 当前已成立基线

这些不是开放讨论题，而是当前 Goal 模式必须继承的事实：

- 当前活跃项目：
  - `/Users/zon/Desktop/LATINOS/sites/frontdoor`
- 当前路由主线：
  - `/`
  - `/legacy`
  - `/daily-latin`
  - `/dance-os`
  - `/tools`
  - `/roadmap`
  - `/dashboard`
  - `/about`
- 当前已经存在的 feature / workbench 模块：
  - `DailyLoopDemo`
  - `CorrectionLedgerDemo`
  - `NextSessionQueue`
  - `WitnessArchiveBoard`
  - `BodyMapPracticeQueue`
  - `DailyReturnBoard`
- 当前已经成立的 shared infrastructure：
  - `witness archive`
  - route/content/data 分层
  - browser / smoke / build 验证链
- 当前不再重新讨论：
  - `Astro`
  - 单文件 HTML
  - hash tab 大壳
  - “先不管验证，后面再补”

## 当前最优执行策略

这条线接下来不应该再做“大方向摇摆”。

应该采用：

1. `架构不重开`
2. `风格不漂移`
3. `内容逐步回填`
4. `移动端与桌面端同时收口`
5. `验证与文档同步`
6. `发现可复用资产就持续抽象`

其中，当前阶段最关键的判断是：

**先把 frontdoor 做到“参考稿近似同款 + 全端稳定 + 结构稳定可维护”，再去追求更多新功能。**

## 可直接用于 Goal Mode 的主提示词

```text
你现在在 /Users/zon/Desktop/LATINOS。

这是一个长期主题母仓，不是临时实验目录。

你的任务不是做一个页面，而是持续推进 LATINOS frontdoor，使它同时满足下面四个目标，并且把这套做法沉淀成未来 Zon 其他网站也能复用的模板级模式。

四个目标必须同时成立：

1. 样式目标
让站点在视觉语言、布局结构、导航壳体、模块比例、卡片密度、节奏和色系上，尽量逼近参考稿：
/Users/zon/Downloads/latin-workbench (2).html

要求不是“大致像”，而是持续逼近，直到首页与关键二级页都达到近似同款的完成度。

2. 架构目标
让项目保持长期 AI 可维护。
必须坚持：
- Next.js App Router
- React
- TypeScript
- 真实路由
- 组件化
- 数据与组件分离
- tokens 化样式管理
- 可持续 smoke / browser 验证

不要回退到：
- 单文件 HTML
- hash tab 大壳
- 一个页面隐藏所有模块
- 样式、内容、交互高度耦合

3. 内容目标
尽量用 LATINOS 本地真实资料、飞书来源、旧站 proof、memory、analysis、legacy 文档去回填页面内容，而不是长期保留模板文案。

内容源以 Feishu 为准。
如果历史材料出现 Notion，默认视为旧提法，必须翻译回当前飞书文档或飞书结构，不要继续扩展 Notion 工作流。

4. 资产目标
在推进站点的同时，持续沉淀未来可复用的：
- shell
- navigation
- section patterns
- cards
- feature modules
- content schema
- data adapters
- style tokens
- verification patterns

你的身份不是一次性页面美化工具，而是这条产品线的长期技术负责人和实现者。

## 启动必读

进入任务后，先读并理解：

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

如果当前任务与网站结构、旧站承接、demo、域名、视觉改版有关，必须把上面的文档当成硬约束，而不是参考意见。

## 当前已锁定基线

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

当前已经存在的 feature 模块包括：
- DailyLoopDemo
- CorrectionLedgerDemo
- NextSessionQueue
- WitnessArchiveBoard
- BodyMapPracticeQueue
- DailyReturnBoard

当前已经存在验证链。
不要重新花时间争论技术选型，不要回退成单文件 HTML，也不要推翻现有 route / component / verification 基线。

## 这条线真正服务的对象

不要把 LATINOS 理解成一个 landing page。

它真正服务的是：

Latin Dance OS = Daily Latin IP + 拉丁成长网站 + Dance Tools / Demos

也就是说：
- 直播 / 内容 是 IP
- 网站 / 页面 是资产承接
- 工具 / 反馈系统 / 动作实验 是产品化

## 旧站策略

旧站不是垃圾，而是已上线 proof：
- live: https://latindance.zondev.top/
- source: /Users/zon/Desktop/MINE/9_latin/apps/latinDance

默认策略：
- 保留
- 映射
- 并行

不要默认：
- 推倒重做
- 直接迁目录
- 直接改生产首页

没有明确要求时，不要改生产域名指向。
可以先做：
- 本地 frontdoor
- preview 部署
- 并行 demo

## 当前阶段的优先级

在没有更高优先级 bug 或用户明确改方向之前，按下面顺序推进：

Phase 1. 结构稳定
- 保持 app / components / data(or content) / lib / hooks / styles / public / scripts 的清晰边界
- 清理会影响 AI 可维护性的坏结构

Phase 2. 视觉逼近
- 逐页对齐参考稿，不只改首页
- 重点对齐导航壳体、hero 比例、模块布局、卡片密度、字级层次、深色 workbench 气质

Phase 3. 全端适配
- 保证桌面端、窄屏、手机端都能稳定访问
- 不允许横向溢出
- 不允许 tab / section 被截断
- 不允许某些 route 在窄屏下内容缺失

Phase 4. 内容回填
- 尽量用本地真实内容替换模板文案
- 优先从 Feishu、LATINOS 文档、旧站源码、memory、analysis、legacy 中抽真实表达与真实结构

Phase 5. demo 深化
- 在现有 feature 模块上继续做最小但真实的交互完善
- 优先做可以复用、可以验证、未来能抽离的模块

Phase 6. 资产沉淀
- 识别可抽成共享组件、共享 tokens、共享 schema 的部分
- 为未来 styles.zondev.top 或其他个人资产站点复用做准备

## 每轮运行方式

每一轮都必须遵循下面的循环：

1. 先读当前上下文与最新 memory
2. 写出这一轮最小计划
3. 只抓当前阻塞最大的 1 个问题优先解决
4. 改动后立刻验证
5. 把关键决策写回 analysis 或 memory
6. 如果页面可预览，就实际打开检查
7. 只要还能继续推进，就不要停在状态汇报

## 强验证规则

每次重要改动后，至少尽量完成：

1. 类型或语法验证
2. 本地 build / 运行验证
3. 关键页面可打开验证
4. 窄屏或手机端验证
5. 顶层导航与关键交互验证

如果仓库已有既定验证顺序，就严格沿用，不要擅自跳步。

如果加入了新的交互，就把最关键的一条用户路径补进 smoke 或 browser 验证，而不是只靠肉眼点一次。

## 文档沉淀规则

发生下面这些情况时，必须写文档：
- 架构决策变化
- 组件边界调整
- 数据结构调整
- 旧站映射策略变化
- 预览 / 部署 / 验证方式变化
- 新 demo 模块成立条件变化

写入位置：
- 深度分析：/Users/zon/Desktop/LATINOS/docs/analysis/
- 每日推进：/Users/zon/Desktop/LATINOS/memory/YYYY-MM-DD.md

## 冲突时的优先级

如果多个目标冲突，按下面顺序取舍：

1. Source of truth 正确性
2. 长期可维护性
3. 与参考稿的视觉一致性
4. 全端访问稳定性
5. 真实内容回填
6. demo 丰富度
7. 纯速度

不要为了赶进度破坏结构。
不要为了追求结构纯洁长期拖延视觉收口和真实内容回填。

## 完成标准

只有当下面大部分成立时，才可以认为主任务接近完成：

- 整站稳定运行在 Next.js App Router + React + TypeScript 主线
- 顶层页面都使用真实路由
- 首页与关键二级页都高度逼近参考稿，而不是只局部相似
- 桌面端、窄屏、手机端都可正常访问
- 页面内容尽量由真实拉丁资料填充，而不只是模板
- 至少有一批稳定、真实、可验证的交互 demo 模块
- build / smoke / browser 验证链稳定
- 关键决策已沉淀到 analysis / memory
- components / tokens / content / routes 具备未来可抽取价值

但只有当下面这条也成立时，才可以把最终目标视为真正完成：

- 整站已经达到“参考稿近似同款 + 长期可维护 + 全端稳定 + 真实内容驱动”的综合状态

## Stop Doing

严格避免：
- 重新争论当前技术主线
- 回退到单文件 HTML
- 为了局部修样式破坏整体结构边界
- 长期保留模板文案不回填
- 只改首页不检查二级页
- 改了交互却不补验证
- 没记录 decision 就改基础结构
- 把旧 Notion 表述继续原样沿用
- 在没有明确要求时直接动生产域名入口

如果没有达到最终目标，就继续推进，不要因为“看起来差不多”而提前停止。
```

## 最短投喂版本

如果你只是想快速开 Goal 模式，可以直接发送这段：

```text
请严格按照 /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-09-latinos-goal-mode-prompt-long-run.md 作为唯一主提示词执行。

不要重新讨论技术选型，不要回退到单文件 HTML，不要推翻当前 Next.js App Router + React + TypeScript 主线。

你要长期循环推进 /Users/zon/Desktop/LATINOS/sites/frontdoor，并同时满足四个目标：
- 视觉上持续逼近 /Users/zon/Downloads/latin-workbench (2).html，直到接近同款
- 架构上持续强化真实路由、组件化、数据与组件分离、tokens 化样式管理
- 内容上持续用本地真实拉丁资料与飞书结构替换模板文案
- 体验上持续保证桌面端、窄屏、手机端都稳定可访问

同时严格遵守：
- Feishu 是唯一 source of truth
- Notion 统一视为旧提法并翻译回飞书
- 旧站策略是 保留 / 映射 / 并行
- 没有明确要求时不要直接动 latindance.zondev.top 生产入口

每轮都要：
- 先读规范和最新 memory
- 只抓当前最大的 1 个阻塞点
- 改动后立刻做验证
- 更新 analysis 或 memory
- 只要还能推进就不要停

除非整站达到“参考稿近似同款 + 长期可维护 + 全端稳定 + 真实内容驱动”的综合状态，否则不要把任务判定为完成。
```

## 对抗性测试

这份 prompt 最可能失效的地方不是“写得不够多”，而是执行时再次漂移回老问题：

- 只追样式像，不管结构是否可维护
- 只补结构，不回填真实内容
- 只修首页，不管二级页是否掉队
- 只看桌面端，不复核手机端
- 新增交互，却不补验证
- 做了很多，但不写 memory，导致下轮又重复判断

所以这份 prompt 的价值不在于华丽，而在于把方向、边界、验证和退出条件一次钉住。

## 当前结论

从长远维护、AI 协作、组件积累、跨站复用和未来产品化的角度看，当前最优路径已经足够清楚：

- 不重开技术选型
- 不丢掉参考稿 style lock
- 不放弃真实内容回填
- 不牺牲移动端与窄屏稳定性
- 不放弃文档与验证闭环

这就是当前最适合开 Goal 模式长跑的版本。
