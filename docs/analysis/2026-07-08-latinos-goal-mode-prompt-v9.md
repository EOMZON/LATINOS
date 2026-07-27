# LATINOS Goal Mode Prompt v9

## 背景

这不是一次性问答 prompt，也不是一次性页面美化 prompt。

它是给一个会连续运行数小时到数天、持续改代码、持续验证、持续落盘的 Goal 模式 agent 用的执行母提示词。

这条线真正要做的不是“做一个拉丁页面”。

真正要做的是把：

- `Daily Latin IP`
- `拉丁成长网站`
- `Dance Tools / Demos`

收敛成一个长期可维护、可验证、可复用、可继续运营的前台母体。

## 当前唯一推荐结论

不要再重开技术选型讨论。

这条线当前唯一推荐主线已经锁定为：

- `Next.js App Router`
- `React`
- `TypeScript`
- `真实路由`
- `组件化`
- `数据与组件分离`
- `token 化样式`
- `持续验证`

不要回退到：

- `单文件 HTML 大壳`
- `hash tab 单页壳`
- `Astro 作为当前主线`

## 你真正要解决的问题

真正要解决的不是“把某一屏调像一点”。

真正要解决的是：

**把 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 持续推进成一个样式近似参考稿、内容尽量来自真实本地资料、结构长期可维护、未来可抽取共享组件与共享模式的前台母体。**

因此，这个 Goal 必须同时满足四个目标：

1. `样式目标`
2. `架构目标`
3. `内容目标`
4. `资产目标`

缺一都不算完成。

## 四个硬目标

### 1. 样式目标

让网站的：

- 视觉语言
- 布局结构
- 导航壳体
- hero 比例
- section 节奏
- 卡片密度
- 深色工作台气质
- 窄屏与手机端观感

尽量逼近：

- `/Users/zon/Downloads/latin-workbench (2).html`

这里的“逼近”不是“大致像”，而是要尽量达到“近似同款完成度”。

### 2. 架构目标

让项目保持长期 AI 可维护的结构，尽量做到：

- 真实路由
- 组件化
- 数据与组件分离
- 样式 token 化
- 内容 schema 化
- 共享 pattern 沉淀
- 可持续验证

### 3. 内容目标

尽量使用：

- `LATINOS` 本地真实资料
- `Feishu` 来源结构
- 旧站真实表达
- 仓库内 analysis / memory / standards

来填充页面，而不是长期停留在模板文案。

### 4. 资产目标

让当前 frontdoor 能为未来继续沉淀：

- 共享 section
- 共享 card
- 共享 workbench pattern
- 共享 content schema
- 共享样式 tokens
- 后续跨站复用能力
- 后续 App 演进边界

## Source Of Truth

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

## 启动必读顺序

进入任务后，必须按这个顺序阅读并理解：

1. `/Users/zon/Desktop/LATINOS/AGENTS.md`
2. `/Users/zon/Desktop/LATINOS/README.md`
3. `/Users/zon/Desktop/LATINOS/MEMORY.md`
4. `/Users/zon/Desktop/LATINOS/memory/` 里今天最新的日志
5. `/Users/zon/Desktop/LATINOS/docs/standards/source-of-truth.md`
6. `/Users/zon/Desktop/LATINOS/docs/standards/repo-structure.md`
7. `/Users/zon/Desktop/LATINOS/docs/standards/website-strategy.md`
8. `/Users/zon/Desktop/LATINOS/data/feishu/latinos-sources.json`
9. `/Users/zon/Desktop/LATINOS/docs/legacy/latindance-map.md`
10. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-06-latinos-goal-mode-prompt.md`
11. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-08-latinos-goal-mode-prompt-v8.md`
12. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-08-mobile-shell-and-daily-compact-pass.md`
13. 当前最新的 route / home / mobile 相关 analysis 文档

同时必须把下面这个文件视为 `style lock`：

- `/Users/zon/Downloads/latin-workbench (2).html`

## 当前已锁定基线

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
- 做完一轮只汇报，不继续推进下一轮

## 当前已知最新状态

以下状态已经成立，后续 agent 必须基于它继续推进，而不是从零误判：

### 1. 共享移动端壳体已修正

- mobile nav 默认折叠
- 顶部只保留品牌、`TODAY READY`、当前 route 摘要、导航按钮
- 路径 active 判断已做归一化

量化结果：

- `mobile-nav-shell` 高度已从约 `694` 降到 `99`

### 2. `daily-latin` 已完成一轮高价值手机端压缩

当前量化结果：

- desktop total: `2456`
- mobile total: `5067`

当前较大 mobile blocks：

- `状态分流 / 4 步起步 / 回流判断`: `421`
- `本页依据`: `321`
- `入口状态`: `448`
- `Daily Loop`: `448`
- `Today Loop Demo`: `1115`
- `Live Return / Clip Bridge / Archive Jump`: `745`
- `旧站已验证的起步原则`: `468`
- `Daily Latin 动作库`: `468`

### 3. `dance-os` 当前是下一轮最高 ROI 目标

当前量化结果：

- desktop total: `2626`
- mobile total: `5008`

当前较大 mobile blocks：

- `录 / 看 / 记 / 下一轮`: `478`
- `Dance OS 模块库`: `917`
- `Correction Ledger Demo`: `1423`
- `Body Map / Practice Queue`: `1158`
- `本页依据`: `511`

### 4. `dashboard` 当前不是最高优先级

当前量化结果：

- desktop total: `3140`
- mobile total: `4501`

它仍可继续优化，但不是当前最值得先动的 route。

## 当前默认优先顺序

除非新证据推翻，否则当前默认优先顺序是：

1. `dance-os` 手机端继续收口
2. 优先处理：
   - `Correction Ledger Demo`
   - `Body Map / Practice Queue`
3. 再回看：
   - `daily-latin` 是否还能继续压 `Today Loop Demo`
4. 然后再统一回收：
   - 首页整体完成感
   - 各 route 桌面 / 手机“近似同款完成度”的一致性

## 长期最优组件边界

继续朝下面的边界推进：

### `app/`

只负责：

- route 入口
- route composition
- metadata
- page-level assembly

### `components/sections/`

放：

- 可跨 route 复用的 section 结构
- route shell
- shared layout block

### `components/feature/`

放：

- 单个业务交互模块
- correction / queue / witness / archive / planner 这类行为性工作台模块

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

不要把真实内容长期硬写死在 JSX 里。

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

不要为了“以后可能做组件库”就过早抽象万能组件。

只有在一个模式已经稳定复用至少 3 次后，才进一步上提抽象。

优先抽稳：

- `section shell`
- `route stage panel`
- `metric strip`
- `source matrix`
- `compact workbench shell`
- `module entry card`

## 每轮必须遵守的执行循环

每轮都按这个顺序执行：

1. 先做整站 audit
2. 判断当前最大差距、最掉队 route、最值得动的共享层
3. 每轮只抓 `1 到 2` 个最高 ROI 问题
4. 优先改共享层，不要同时大改很多页
5. 同时检查：
   - 是否更像参考稿了
   - 是否更利于长期维护了
6. 能用真实内容替换模板时就替换
7. 改动完成后至少运行：
   - `pnpm verify`
8. 如果涉及整站视觉、关键交互、首页完成感或手机端结构调整，再运行：
   - `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
   - `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
9. 有本地预览条件时，必须实际打开看桌面端和手机端，不要只靠想象
10. 每轮把关键决策写入：
   - `docs/analysis/`
   - `memory/YYYY-MM-DD.md`
11. 只要还能继续推进，就不要停在状态汇报，而要继续完成下一轮最值得做的改动

## 当前实现与验证注意事项

- 测试使用 `pnpm start`
- 代码改完后不要假设会热更新
- 如果视觉结果异常，要优先怀疑是旧的 `3200` 进程或过期构建

必要时按这个顺序处理：

1. `pnpm build`
2. `PORT=3200 pnpm start`
3. 再做页面检查与 smoke

如果你启动或重启了 `3200`，在阶段结束前要负责把自己开的进程停掉。

## 完成标准

只有当下面这些条件同时成立时，才接近完成：

1. 首页和关键二级页在桌面端与手机端都高度逼近参考稿
2. 主要内容不再大面积依赖模板文案，而是明显更接近真实本地资料
3. 真实路由稳定，没有回退成假切页结构
4. 组件、样式、内容边界更稳，而不是更散
5. `verify` 与 `smoke` 持续通过
6. `analysis` 与 `memory` 记录足够清楚，后续 AI 可以无缝接手

没有同时满足这些条件时，不要提前宣布完成。

## 可直接复制给 Goal 模式 agent 的主提示词

```text
请把 /Users/zon/Desktop/LATINOS/sites/frontdoor 作为一个长期 Goal 模式项目持续推进，而不是一次性改版任务。

你的唯一目标不是“做一个页面”，而是让这个前台系统同时满足下面四个目标，并且四个目标必须同时成立才算接近完成：

1. 样式目标
让网站的视觉语言、布局结构、导航壳体、hero 比例、section 节奏、卡片密度、深色工作台气质，尽量达到和 /Users/zon/Downloads/latin-workbench (2).html 同一作品体系的完成感。不要擅自漂移风格，不要改成另一套审美。

2. 架构目标
保持 Next.js App Router + React + TypeScript、真实路由、组件化、数据与组件分离、token 化样式、长期 AI 可维护。不要回退到单文件 HTML、hash tab 大壳、Astro 主线，或把内容/样式/交互重新混写。

3. 内容目标
尽量使用 LATINOS 本地真实资料、飞书映射、旧站真实表达来填充内容，而不是长期停留在模板文案。Feishu 是唯一 source of truth；如果历史材料提到 Notion，一律视为旧提法，翻译回飞书对应文档或飞书结构。

4. 资产目标
让当前 frontdoor 形成未来可继续抽取的共享资产，包括共享 section、共享 card、共享 workbench pattern、共享 content schema、共享样式 tokens，以及后续跨站复用和 App 演进所需的清晰边界。

进入任务后，必须先读并理解下面这些文件：
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
11. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-08-latinos-goal-mode-prompt-v8.md
12. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-08-mobile-shell-and-daily-compact-pass.md
13. 当前最新的首页 / route / mobile 相关 analysis 文档

把 /Users/zon/Downloads/latin-workbench (2).html 视为 style lock。
你的任务不是参考一下，而是持续逼近，直到首页和关键二级页都达到近似同款完成度。

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

当前默认优先顺序是：
1. 继续收 `dance-os` 手机端
2. 优先处理 `Correction Ledger Demo`
3. 再处理 `Body Map / Practice Queue`
4. 然后回看 `daily-latin` 是否还能继续压 `Today Loop Demo`
5. 最后再统一回收首页整体完成感与多 route 的一致性

当前已知量化状态：
- /daily-latin desktop: 2456
- /daily-latin mobile: 5067
- /dance-os desktop: 2626
- /dance-os mobile: 5008
- /dashboard desktop: 3140
- /dashboard mobile: 4501
- mobile nav shell: 99

组件边界继续朝下面推进：
- app/ 只做 route composition
- components/sections/ 做共享 section 结构
- components/feature/ 做业务交互模块
- components/cards/ 做可复用信息单元
- data/ 放内容与配置
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
6. 重要改动后至少运行 pnpm verify
7. 涉及整站视觉、关键交互、首页完成感或手机端结构时，再运行：
   - FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes
   - FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser
8. 有本地预览条件时，实际打开看桌面端和手机端效果，不要只靠想象
9. 每轮把关键决策写入 docs/analysis/ 和 memory/YYYY-MM-DD.md
10. 只要还能继续推进，就不要停在“状态汇报”，而要继续完成下一轮最值得做的改动

测试与预览注意事项：
- pnpm start 不会热更新
- 如果视觉结果异常，先怀疑旧的 3200 进程或过期构建
- 必要时先重新 pnpm build，再 PORT=3200 pnpm start，再做验证
- 如果你自己启动了 3200，请在阶段结束前停掉

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

如果只想最快开跑，可以直接发送下面这段：

```text
请严格按照 /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-08-latinos-goal-mode-prompt-v9.md 执行。

不要重新讨论技术选型，不要回退到单文件 HTML、hash tab 或 Astro 主线。

你要把 /Users/zon/Desktop/LATINOS/sites/frontdoor 作为长期 Goal 模式项目持续推进：
- 样式上持续逼近 /Users/zon/Downloads/latin-workbench (2).html，直到首页和关键二级页达到近似同款完成度
- 架构上持续强化 Next.js App Router + React + TypeScript、真实路由、组件化、数据与组件分离、token 化样式
- 内容上持续用 LATINOS 本地真实资料、飞书映射和旧站真实表达替换模板文案
- 当前先继续收 dance-os 手机端，优先处理 Correction Ledger Demo 和 Body Map / Practice Queue
- 验证上每轮都运行 verify，必要时补 route smoke 与 browser smoke，并实际复核桌面端与手机端
- 文档上每轮都同步更新 docs/analysis/ 和 memory

除非参考稿完成度、结构稳定度、真实内容回填和验证结果都同时过关，否则不要把任务判定为完成。
```

## 结论

从长远维护、AI 协作、组件复用、未来共享组件库与 App 延展来看，当前最优路径已经足够清楚：

- 用 `Next.js App Router + React + TypeScript` 继续推进
- 用参考稿做 `style lock`
- 用本地真实资料与飞书映射做内容回填
- 用组件化与数据分层保证未来可维护
- 用持续验证与 memory / analysis 沉淀保证长跑不跑偏

这不是一个开放讨论题。

这是当前最适合直接开 Goal 模式长跑的执行版本。
