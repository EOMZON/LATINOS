# LATINOS Goal Mode Active Loop Contract

## 这份文档的定位

这是一份给 `goal mode` 长循环执行的**当前唯一主合同**。

它替代之前那些已经出现时间错位的 prompt，但不抹掉之前的分析价值。

它保留我们最初的全部目标，同时把它们重新压成：

- 有优先级
- 有阶段边界
- 有当前 Top 1
- 有循环验证顺序
- 有明确的完成判定

## 为什么要重排

之前几版 prompt 的核心问题不是方向完全错，而是：

- 有些文档还停留在“首页是默认 Top 1”
- 有些文档还停留在“`/daily-latin` 是默认 Top 1”
- 但按今天更晚的 visible pass 进度，当前真实状态已经变成：
  - 首页 `/` 已完成 `visible pass v3`
  - `/daily-latin` 已完成 `visible pass v2`
  - `/dance-os` 已完成 `visible pass v2`
  - `Phase 1` 仍未结束
  - 当前最需要继续收口并重新验证的核心页，优先应回到 `/dance-os`

所以现在不能再继续沿用旧的“默认 Top 1 固定写死”版本，而要改成：

**阶段固定，Top 1 动态，但当前轮起手优先级明确。**

## 当前真实结论

### 不再讨论的事

- 不换框架
- 不切到 `Astro`
- 不回退到单文件 `HTML`
- 不回退到 `hash-tab` 单页壳
- 不推翻 `Next.js App Router + React + TypeScript`

### 不再模糊的事

- `Feishu` 是唯一 source of truth
- 历史里的 `Notion` 一律视为旧提法
- 旧站策略仍然是：
  - `保留`
  - `映射`
  - `并行`
- 没有明确要求时，不直接改 `https://latindance.zondev.top/` 生产入口

### 当前仍在进行的阶段

当前仍然在：

- `Phase 1: 核心前台完成态`

当前只允许优先处理：

1. `/`
2. `/daily-latin`
3. `/dance-os`

### 当前优先级顺序

基于今天最新状态，当前推荐顺序是：

1. `先完成 /dance-os 的下一轮可见收口与完整验证`
2. `再并排复核 / 、 /daily-latin 、 /dance-os`
3. `如果三页都已足够像最终版，结束 Phase 1`
4. `如果仍有明显掉队页，再只选 1 个 Top 1 继续下一轮`

## 推荐 Goal Objective

```text
把 /Users/zon/Desktop/LATINOS/sites/frontdoor 按优先级分阶段推进成最终前台结果：先继续完成首页 /、/daily-latin、/dance-os 三个核心页面的参考稿贴近度、真实内容回填、桌面与移动端完成态，并优先收口当前仍最容易显得未完成的核心页；只有当这三页都达到用户可直接评判的近最终版状态后，才继续处理 legacy/tools/roadmap/dashboard/about 等辅助承接页，再沉淀共享组件、内容 schema、样式 tokens、验证合同与发布策略。保持主线为 Next.js App Router + React + TypeScript，不回退到 Astro、单文件 HTML 或 hash-tab 单页壳；保持 Feishu 为唯一 source of truth；保持旧站策略为保留/映射/并行；每一轮 accepted change 都必须通过 typecheck、build、fresh-prod start、route smoke、browser smoke、structure smoke，并同步更新 analysis 与 memory。未达到参考稿近似同款完成度、真实内容落地、核心三页桌面与移动端都稳定可展示之前，不要把任务判定为完成。
```

## 可直接复制给 Goal Mode 的最终提示词

```text
你现在在 /Users/zon/Desktop/LATINOS。

这是一个长期主题母仓，不是临时实验目录。

之前的目标先全部停用。从现在开始，严格以这份“LATINOS Goal Mode Active Loop Contract”作为唯一执行合同。

你的身份不是一次性改页面的执行器，而是 LATINOS frontdoor 这条长期产品线的技术负责人、实现者、验收者和沉淀者。

你的任务不是平均推进所有页面，也不是继续做很多局部微调。你的任务是把 LATINOS frontdoor 按优先级分阶段推进到最终前台完成态，并保留我们最初关于样式、内容、架构、旧站承接、长期维护和未来资产复用的全部诉求。

## 总目标

你必须同时保留以下全部目标，但绝不能再同权重推进：

1. 样式目标
让网站尽量逼近 /Users/zon/Downloads/latin-workbench (2).html 的视觉语言、布局结构、模块节奏、卡片密度、导航壳体、色系与材质感，并把它视为 style lock，而不是一般参考。

2. 架构目标
保持 /Users/zon/Desktop/LATINOS/sites/frontdoor 继续沿着 Next.js App Router + React + TypeScript、真实路由、组件化、数据与组件分离、类型约束、styles tokens / layout / route override 分层去推进。

3. 内容目标
尽量使用 LATINOS 本地真实拉丁资料、仓库内 standards / legacy / analysis / memory 文档、旧站 proof，以及 Feishu source of truth 回填页面，而不是继续停留在模板文案和假数据。

4. 响应式目标
所有核心页面必须同时满足桌面端和移动端可读、可用、无明显破碎区，不能再出现窄屏下内容丢失、布局断裂或“点击了但没有实质内容”的空壳区域。

5. 验证目标
每一轮 accepted change 都必须通过完整串行验证链，而不是只看 dev 页面能打开。

6. 资产目标
在核心前台完成态稳定后，再继续沉淀可复用的组件、schema、tokens、verification contracts，为未来共享组件库、跨站复用和后续 App 演进保留边界。

7. 旧站承接目标
保留旧站 https://latindance.zondev.top/ 作为已上线 proof，不默认推倒、不粗暴迁目录、不直接改生产入口；只有在新 frontdoor 足够稳之后，才进入 preview / deploy / 域名映射决策。

## 强约束

- 不要重新讨论技术选型
- 不要切到 Astro
- 不要回退到单文件 HTML
- 不要回退到 hash-tab 单页壳
- 不要推翻 Next.js App Router + React + TypeScript 主线
- Feishu 是唯一 source of truth
- 历史里的 Notion 一律视为旧提法，必须翻译回飞书结构
- 旧站默认策略仍然是：保留 / 映射 / 并行
- 没有明确要求时，不要直接改 latindance.zondev.top 生产入口
- 在 Phase 1 未完成前，不要让 /legacy /tools /roadmap /dashboard /about 抢主线
- 不要把大量时间继续消耗在只有 1px / 2px 收益的微优化上
- 不要把“过程很多”误判成“前台结果已经完成”

## 启动必读

进入任务后，先按顺序读取：

1. /Users/zon/Desktop/LATINOS/AGENTS.md
2. /Users/zon/Desktop/LATINOS/README.md
3. /Users/zon/Desktop/LATINOS/MEMORY.md
4. /Users/zon/Desktop/LATINOS/memory/ 里今天最新的日志
5. /Users/zon/Desktop/LATINOS/docs/standards/source-of-truth.md
6. /Users/zon/Desktop/LATINOS/docs/standards/repo-structure.md
7. /Users/zon/Desktop/LATINOS/docs/standards/website-strategy.md
8. /Users/zon/Desktop/LATINOS/data/feishu/latinos-sources.json
9. /Users/zon/Desktop/LATINOS/docs/legacy/latindance-map.md
10. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-latinos-goal-mode-priority-reset-prompt.md
11. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-latinos-goal-mode-priority-ordered-loop-prompt.md
12. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-latinos-goal-mode-master-loop-prompt.md
13. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-latinos-goal-mode-active-loop-contract.md

## 当前真实工程基线

当前活跃项目：

- /Users/zon/Desktop/LATINOS/sites/frontdoor

当前稳定路由：

- /
- /legacy
- /daily-latin
- /dance-os
- /tools
- /roadmap
- /dashboard
- /about

当前唯一技术主线：

- Next.js App Router
- React
- TypeScript
- 真实路由
- 组件化
- 数据与组件分离
- route-scoped data
- 类型约束

当前已知核心进度：

- 首页 / 已完成 visible pass v3
- /daily-latin 已完成 visible pass v2
- /dance-os 已完成 visible pass v2
- Phase 1 仍未结束

当前默认起手 Top 1：

- /dance-os

原因：

- 现阶段首页和 /daily-latin 已经明显更接近 frontdoor 完成态
- /dance-os 仍最容易被感知为还没完全收口
- 当前它更可能在“模块库空感、移动端密度、source/bodymap/correction 节奏”上继续暴露未完成感

## 分阶段推进规则

### Phase 0：事实校准

先确认：

- docs / standards / memory / analysis 的工程事实是否一致
- 当前 frontdoor 是否仍可运行
- 当前 style lock 仍然是 /Users/zon/Downloads/latin-workbench (2).html
- 当前核心页与辅助页边界是否清晰

退出条件：

- 文档与工程事实一致
- 当前验证链可跑通
- 没有“文档说一套、代码是另一套”的状态

### Phase 1：核心前台完成态

这一阶段只允许优先处理：

1. /
2. /daily-latin
3. /dance-os

当前优先级不是固定按路由顺序平均推进，而是按“谁还最像未完成页”来动态排序。

当前默认顺序：

1. /dance-os
2. / 再并排复核
3. /daily-latin 再并排复核

只有在新的截图证据、fresh-prod 验证结果、或并排审美判断明确显示别的核心页重新成为最大差距项时，才允许切换 Top 1；切换前必须先在 analysis 里写明为什么换。

这一阶段每个核心页都必须同时推进：

- 样式更贴近参考稿
- 信息结构更像 frontdoor 成品
- 真实内容继续回填
- 桌面端和移动端都完整可展示
- 组件边界不退化
- 页面不再出现“点击了但没有实质内容”的空壳区

Phase 1 退出条件：

- /、/daily-latin、/dance-os 三页都能被直接评价为“明显接近最终版”
- 三页主要内容块已大幅脱离模板感
- 三页桌面端和移动端都没有明显破碎区
- 三页在 fresh-prod 下通过完整验证链
- 用户可以直接看页面或截图评判，而不是只能听工程说明

### Phase 2：辅助承接页对齐

只在 Phase 1 明显达标后处理：

- /legacy
- /tools
- /roadmap
- /dashboard
- /about

目标：

- 这些页不再像工程中间态
- 风格、节奏、信息架构对齐核心前台
- 辅助页承担承接职责，而不是像后台页

退出条件：

- 辅助页不再明显掉队
- 核心页与辅助页之间没有强烈割裂感

### Phase 3：共享资产沉淀

只在前台完成态更稳定后集中推进：

- shared components
- content schema
- style tokens
- verification contracts
- 更深的 section / shell / card 抽离
- 未来公共组件库可提取边界

退出条件：

- 未来 AI 修改不容易牵一发动全身
- 可复用资产边界清晰
- 后续跨站复用有明确抓手

### Phase 4：preview / deploy / 域名决策

只在前面阶段成立后再做：

- preview 链接
- 发布策略
- 旧域名入口策略讨论
- 新旧版本并行入口方案

退出条件：

- preview 可访问
- 用户认可前台完成态
- 再进入生产映射讨论

## 每轮循环的固定顺序

每一轮都必须按下面顺序推进：

1. 读取当前状态、最新 analysis 和最新 memory
2. 判断当前处于哪个 Phase
3. 只选择当前阶段的 Top 1 页面或 Top 1 切片
4. 优先修正“用户可见差距最大”的问题，而不是难以感知的工程微调
5. 修改后先做局部复核
6. 如果改动触达用户可见前台，必须补桌面端和移动端截图证据
7. 再执行完整串行验证链
8. 通过后更新 docs/analysis/YYYY-MM-DD-<topic>.md
9. 通过后更新 memory/YYYY-MM-DD.md
10. 再决定是继续当前页面，还是切到下一个 Top 1

不要一轮同时推进很多页面。

不要在没有完成证据的情况下切换主线。

不要在 Phase 1 未完成前把主要时间重新投到辅助页。

## 当前这轮起手要求

第一优先动作：

1. 检查 /Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css 中与 /dance-os 最近 visible-pass v3 相关的新增覆盖规则是否有语法或括号问题
2. 如果有问题，先修正
3. 然后完整执行：
   - pnpm typecheck
   - CI=1 pnpm build
   - kill 旧 next start
   - fresh pnpm exec next start --hostname 127.0.0.1 --port 3200
   - FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes
   - FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser
   - FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs
4. 重新产出 /dance-os 的桌面端与移动端截图
5. 判断这轮是否足以把 /dance-os 升到 visible pass v3
6. 如果成立，写 analysis 和记忆；再回到 /、/daily-latin、/dance-os 三页并排验收，决定是否结束 Phase 1

## Top 1 选择规则

如果仍在 Phase 1，每一轮按下面顺序选 Top 1：

1. 用户可见差距最大的核心页
2. 最不像参考稿完成态的核心页
3. 响应式破碎最明显的核心页
4. 模板感最强的核心页
5. 在移动端或桌面端仍明显“工程味过重”的核心页

当前默认 Top 1 仍然是：

- /dance-os

## 验证顺序

每一轮 accepted change 必须按下面顺序做完整验证：

1. pnpm typecheck
2. CI=1 pnpm build
3. kill 旧的 next start
4. fresh pnpm exec next start --hostname 127.0.0.1 --port 3200
5. FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes
6. FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser
7. FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs

不要把 dev 可打开当作最终证据。

不要跳过 fresh prod。

不要只凭“改了很多”就判定通过。

## 记录要求

每轮通过后，必须同步：

- docs/analysis/YYYY-MM-DD-<topic>.md
- memory/YYYY-MM-DD.md

如果更新了 dashboard 里的工程事实，也必须重新验证并保证和实际一致。

## Stop Doing

从现在开始，停止这些行为：

1. 核心前三页没收完之前，让低优先级 route 抢主线
2. 在用户还看不到明显前台完成态时，持续沉迷 1px / 2px 微优化
3. 在前台未收口前，优先讨论 preview / deploy / 域名切换
4. 把内容重新揉回单页大壳或大 content 池
5. 继续沿用 Notion 语言
6. 一轮同时改很多页面，导致没有任何一个页面真正收口
7. 没有截图证据就声称核心前台已经明显完成
8. 没有 analysis / memory 落盘就进入下一轮
9. 因为做了很多过程工作，就误判为已经满足了最初诉求

## 完成判定

只有当下面几件事同时成立时，才允许把这个长期目标判定为完成：

1. /、/daily-latin、/dance-os 三页已经明显接近参考稿完成态
2. 核心三页都已经用真实内容而不是模板内容支撑
3. 桌面端与移动端都稳定可访问且无明显破碎区
4. 辅助页不再明显掉队
5. 共享资产边界已有清晰沉淀
6. preview / deploy / 旧域名策略已有明确决策或明确延后说明
7. analysis 与 memory 能说明“做成了什么、保留了什么、下一步怎么接”

在这些条件全部成立前，不要把任务判定为完成。
```

## 当前建议

如果只保留一句话作为新的目标合同，最关键的是：

**先把 `Phase 1` 真正做完，而且当前先把 `/dance-os` 收成能直接拿给用户评判的状态；只有核心三页都达到近最终版，才允许切到辅助页、共享资产和部署决策。**
