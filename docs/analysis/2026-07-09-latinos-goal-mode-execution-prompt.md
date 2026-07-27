# LATINOS Goal Mode Execution Prompt

## 背景

这不是一次性问答提示词。

这是给一个会持续运行几天、持续改代码、持续验证、持续沉淀文档的 Goal 模式 agent 的执行提示词。

它要解决的不是“把某个页面改像一点”，而是把 `LATINOS` 前台主线推进成：

- 视觉上尽量贴近参考稿
- 结构上长期可维护
- 内容上尽量使用本地真实拉丁资料
- 资产上可继续抽组件、抽样式、抽内容 schema、抽 demo 模块

## 当前唯一推荐主线

当前这条线已经不再讨论技术选型。

唯一推荐主线已经锁定为：

- `Next.js App Router`
- `React`
- `TypeScript`
- `真实路由`
- `组件化`
- `数据与组件分离`
- `tokens 化样式管理`
- `持续验证`

不要回退到：

- `Astro`
- `单文件 HTML 大壳`
- `hash tab 单页壳`
- `样式 / 内容 / 交互混写`

## 这次 Goal 的真正目标

把 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 持续推进成一个长期可维护的拉丁主题前台系统，同时满足下面四个目标：

1. `样式目标`
让首页与二级页的视觉语言、布局结构、卡片密度、导航壳体、节奏与色系，尽量逼近参考稿 `/Users/zon/Downloads/latin-workbench (2).html`。

2. `架构目标`
让项目持续符合适合 AI 长期维护的结构：真实路由、稳定组件边界、数据与组件分离、样式 tokens 分层、验证链完整。

3. `内容目标`
尽量使用 `LATINOS` 本地文档、飞书来源结构、旧站真实内容、memory 与 analysis 中的真实材料填充页面，而不是长期停留在模板文案。

4. `资产目标`
为未来抽共享组件、共享样式、共享内容 schema、跨站复用、以及后续 App 化保留清晰边界。

## 必须遵守的仓库规则

- 根目录：`/Users/zon/Desktop/LATINOS`
- 这是长期主题母仓，不是临时实验目录
- `Feishu` 是唯一 source of truth
- 历史里的 `Notion` 提法全部视为旧提法，必须翻译回当前飞书结构
- 旧站策略继续保持：
  - `保留`
  - `映射`
  - `并行`
- 没有明确要求时，不要直接修改生产域名：
  - `https://latindance.zondev.top/`
- 没有明确要求时，不要直接改旧站生产源码：
  - `/Users/zon/Desktop/MINE/9_latin/apps/latinDance`

## 启动必读顺序

进入任务后，必须按下面顺序读取：

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

如果当前任务与网页、demo、域名、旧站承接有关，不允许跳过这些读取。

## 视觉锁定参考

你必须把下面这个文件当成视觉锁定参考：

- `/Users/zon/Downloads/latin-workbench (2).html`

要求不是“大致像”，而是持续逼近，直到：

- 首页结构明显一致
- 二级页延续同一套工作台语言
- 导航、hero、section 节奏、卡片比例、字级层次、移动端壳体都不再漂移

不要擅自换风格。
不要做成另一套审美。
不要因为加了真实内容就破坏参考稿原本的密度和节奏。

## 当前已锁定的项目基线

当前活跃项目在：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor`

当前真实路由包括：

- `/`
- `/legacy`
- `/daily-latin`
- `/dance-os`
- `/tools`
- `/roadmap`
- `/dashboard`
- `/about`

当前已经存在的真实模块包括：

- `DailyLoopDemo`
- `CorrectionLedgerDemo`
- `NextSessionQueue`
- `WitnessArchiveBoard`
- `BodyMapPracticeQueue`
- `DailyReturnBoard`

当前共享基础设施包括：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/lib/witness-archive.ts`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/hooks/use-witness-archive.ts`

因此不要再讨论：

- 要不要改回单文件 HTML
- 要不要改回 hash tab
- 要不要换 Astro
- 要不要重新做框架选型

## 内容源与回填规则

内容必须尽量来自真实材料。

优先级如下：

1. `LATINOS` 仓库内已有文档
2. `Feishu` 来源结构与已有导出信息
3. 旧站源码中的真实内容与表达
4. `memory/` 与 `docs/analysis/` 中已沉淀的真实判断

至少围绕这些飞书文档做映射：

- `LATIN`
- `直播计划`
- `拉丁dance os构思`
- `DANCE OS DEMO v1.0`

如果某处写着 `Notion`，默认翻译为飞书对应文档、飞书 wiki、飞书表格或飞书结构，不要继续发展 Notion 工作流。

## 推荐架构要求

你必须优先维护这类结构边界：

- `app/`
- `components/`
- `data/` 或 `content/`
- `hooks/`
- `lib/`
- `styles/`
- `public/`
- `scripts/`

组件边界优先按下面方式继续稳定：

- `shell`
- `navigation`
- `sections`
- `cards`
- `feature modules`
- `data adapters / content schema`

样式边界优先按下面方式继续稳定：

- `tokens`
- `globals`
- `layout / shell`
- `section`
- `component`
- `route-specific exceptions`

内容边界优先按下面方式继续稳定：

- `site meta`
- `route content`
- `module content`
- `reusable card data`
- `legacy mapping`
- `source mapping`

目标不是“拆文件”，而是拆出未来可复用、可迁移、可被 AI 安全修改的边界。

## Goal 模式下的工作方式

你必须长期循环推进，不要停在一次性汇报。

每一轮都遵循下面的工作循环：

1. 先读上下文与最新 memory
2. 写出当轮最小计划
3. 只选择当前最大的 1 个阻塞优先解决
4. 做最小高收益改动，不要同时改很多层
5. 改完立即验证
6. 验证成立后写回 `docs/analysis/` 或 `memory/`
7. 如果不成立，回退你自己的未证明改动
8. 再进入下一轮

## 每轮优先级判断规则

如果当前在做视觉与响应式收口，默认优先顺序是：

1. 先找当前最厚、最影响移动端的 route
2. 再拆该 route 内最高的 section
3. 再找该 section 内最小但最高收益的真实控制杆
4. 优先做共享层改动，不优先做页面级临时补丁

不要靠“感觉”乱改。
先测量，再改，再复测。

## 当前阶段的主要目标

当前阶段不是继续争论方向，而是把已有 Next.js frontdoor 打磨到下面状态：

1. 首页与主要二级页视觉上继续逼近参考稿
2. 手机与窄屏可稳定访问，不出现横向溢出、内容看不全、tab 内容缺失
3. 组件边界继续抽稳，避免改一处牵一大片
4. 页面中的模板内容逐步替换为真实拉丁资料
5. demo 模块保持存在，但不破坏整体样式一致性

## 验证强约束

每次重要改动后，必须串行执行验证，不要并行跑：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh `390px` 窄屏复测

注意：

- 不要把 `pnpm typecheck` 和 `pnpm build` 并行执行
- 如果 `next build` 看起来卡住，先确认是否真的卡住，再安全 fresh rerun
- 做 CSS 收口时，不要假设“文件里后写的 media block 就一定生效”
- 有多个重叠 media query 时，必须用运行时实际匹配结果确认

## 当前视觉 / 响应式执行原则

如果目标是继续把移动端收短并逼近参考稿，遵守这些原则：

- 每轮只做一个最小 pass
- 先改最高 ROI section
- 只在验证证明 route 总高和目标 section 高度都下降时，才算 pass 成立
- 如果没有下降，不算成立，不写进 memory，当轮改动回退

## 文档沉淀规则

发生以下情况时，必须写文档：

- 架构边界变化
- 组件重构
- 数据结构调整
- 验证方式变化
- 旧站承接策略变化
- 成立的视觉收口 pass
- 新 demo 模块的成立条件变化

写入位置：

- 深度分析：`/Users/zon/Desktop/LATINOS/docs/analysis/`
- 每日推进：`/Users/zon/Desktop/LATINOS/memory/YYYY-MM-DD.md`

## 冲突时的优先级

如果多个目标冲突，按这个顺序取舍：

1. `Source of truth 正确性`
2. `长期可维护性`
3. `与参考稿的视觉一致性`
4. `真实内容回填`
5. `demo 交互丰富度`
6. `纯速度`

不要为了短期视觉效果破坏长期结构。
也不要为了结构洁癖长期不回填真实内容。

## 可直接复制给 Goal 模式 agent 的主提示词

```text
你现在在 /Users/zon/Desktop/LATINOS。

这是一个长期主题母仓，不是临时实验目录。

你的任务不是“做一个页面”，而是把 LATINOS frontdoor 持续推进成一个长期可维护、可验证、可复用的拉丁主题前台，并让这套做法成为未来 Zon 各类网站都可以复用的模板级实现。

你必须同时满足四个目标：

1. 样式目标
让新站在视觉语言、布局结构、页面节奏、色系、导航壳体、卡片密度、模块比例上，尽量逼近参考稿 /Users/zon/Downloads/latin-workbench (2).html。

2. 架构目标
让项目保持长期 AI 可维护的结构：真实路由、组件化、数据与组件分离、样式 token 化、内容 schema 化、验证链可持续。

3. 内容目标
尽量使用 LATINOS 本地已有真实资料、飞书来源结构、旧站 proof 和仓库内文档来填充页面，而不是长期停留在模板文案。

4. 资产目标
为未来抽取共享组件、共享样式、共享内容结构、跨站复用，甚至未来 App 方向保留清晰边界。

先按以下顺序读上下文：
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

必须把 /Users/zon/Downloads/latin-workbench (2).html 当成视觉锁定参考。

技术主线已经锁定，不要重复选型：
- Next.js App Router
- React
- TypeScript
- 真实路由
- 组件化
- 数据与组件分离
- tokens 化样式管理
- 持续验证

不要回退到：
- Astro
- 单文件 HTML
- hash tab 大壳

当前项目路径：
- /Users/zon/Desktop/LATINOS/sites/frontdoor

当前真实路由：
- /
- /legacy
- /daily-latin
- /dance-os
- /tools
- /roadmap
- /dashboard
- /about

当前真实模块：
- DailyLoopDemo
- CorrectionLedgerDemo
- NextSessionQueue
- WitnessArchiveBoard
- BodyMapPracticeQueue
- DailyReturnBoard

Source of truth 规则：
- Feishu 是唯一内容源
- 历史里的 Notion 全部视为旧提法，必须翻译回飞书结构
- 重点文档包括 LATIN、直播计划、拉丁dance os构思、DANCE OS DEMO v1.0

旧站策略：
- 保留
- 映射
- 并行

没有明确要求时，不要改生产域名 https://latindance.zondev.top/ 的生产指向，也不要直接改旧站生产源码。

工作方式：
- 长期 Goal 模式循环推进
- 每轮只解决 1 个当前最大阻塞
- 做最小高收益改动
- 改完立刻验证
- 成立才写文档，不成立就回退你自己的未证明改动

视觉与响应式阶段的默认重点：
1. 首页 hero 与上半屏继续逼近参考稿
2. Daily Latin、Dashboard、Dance OS 继续收短，减少窄屏过长感
3. 全站移动端与窄屏适配稳定，不出现横向溢出、内容看不全、tab 无内容
4. 优先走共享组件和共享样式层，不要堆页面级补丁
5. 持续用真实内容替换模板文案

验证强约束：
每次重要改动后必须串行执行：
1. pnpm typecheck
2. pnpm build
3. fresh pnpm exec next start --hostname 127.0.0.1 --port 3200
4. FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes
5. FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser
6. fresh 390px 窄屏复测

不要把 typecheck 和 build 并行跑。
如果 build 疑似卡住，先确认再安全 fresh rerun。
如果 CSS 有多个重叠 media query，必须用运行时实际匹配结果确认，不要凭文件位置猜。

文档沉淀规则：
- 成立的架构决策写到 docs/analysis/
- 每日推进写到 memory/YYYY-MM-DD.md
- 没有被验证证明成立的改动不要记成成果

如果多个目标冲突，按这个优先级取舍：
1. source of truth 正确性
2. 长期可维护性
3. 与参考稿的视觉一致性
4. 真实内容回填
5. demo 交互丰富度
6. 纯速度

你的终局不是“做完一个页面”，而是把 LATINOS frontdoor 打磨成一个：
- 长期可维护
- 样式稳定
- 数据与组件分离
- 响应式可靠
- 可持续验证
- 可继续抽组件和跨站复用
的模板级实现。
```
