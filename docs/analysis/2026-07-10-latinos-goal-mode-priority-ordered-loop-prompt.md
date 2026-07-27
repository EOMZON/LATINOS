# LATINOS Goal Mode Priority-Ordered Loop Prompt

## 背景

当前 `LATINOS/sites/frontdoor` 已经有可运行的 `Next.js App Router + React + TypeScript` 基线、8 条真实路由、route-scoped data layer，以及完整的 `typecheck / build / smoke` 验证链。

但用户当前最明确的不满不是“还没开始”，而是：

- 过程很多
- 微调很多
- 但用户能直接看到的核心前台完成态还不够
- 样式虽然接近参考稿，但还没达到“几乎同款”的锁定感

所以现在最重要的不是继续平均推进所有目标，而是：

**保留全部目标，但把它们按优先级重新组织成一个可循环执行、可阶段退出、可逐步验收的 Goal Mode 合同。**

## 问题本质

真正要解决的不是“再做一轮优化”，而是：

**让 Goal Mode agent 先把用户最在意、最可见、最能直接判断完成度的核心前台做出来，再逐步补齐辅助页、共享资产和发布决策，最终满足我们最初关于样式、内容、架构、旧站承接、长期可维护性的全部诉求。**

## 关键约束

### 1. 技术主线已锁定

不要重新讨论：

- `Astro`
- 单文件 `HTML`
- hash-tab 单页壳
- 再起一套新的技术栈

当前唯一主线：

- `Next.js App Router`
- `React`
- `TypeScript`
- 真实路由
- 组件化
- 数据与组件分离
- 类型约束
- token 化样式管理

### 2. 内容源已锁定

- `Feishu` 是唯一 source of truth
- 历史里的 `Notion` 一律视为旧提法
- 任何 `Notion` 表述都必须翻译回飞书文档、飞书 wiki、飞书表格或飞书结构

### 3. 旧站策略已锁定

旧站：

- live: `https://latindance.zondev.top/`
- source: `/Users/zon/Desktop/MINE/9_latin/apps/latinDance`

默认策略：

- `保留`
- `映射`
- `并行`

没有明确要求时：

- 不要直接改旧站生产代码
- 不要直接切生产首页
- 不要把旧站粗暴迁入当前仓库

### 4. 用户体验优先级已重排

当前最重要的不是继续做看不见的工程优雅，而是先让用户看到：

- 首页更像参考稿
- `/daily-latin` 和 `/dance-os` 更像完整成品
- 桌面端和移动端都能直接访问
- 不再点进去没内容、或因布局/响应式导致信息丢失

## Best Minds 收口

如果从产品负责人、前端架构负责人、设计系统负责人、内容负责人和 AI 长期协作角度一起收口，当前最优路径是：

1. 先做用户可见的前台完成态
2. 再做辅助页一致性
3. 再做共享资产沉淀
4. 最后才做 preview / deploy / 域名策略

这意味着：

- 所有原始目标保留
- 但绝对不能再平均推进
- 每轮只服务当前阶段的 Top 1 页面或 Top 1 切片

## 新的优先级结构

### Phase 0：启动与事实校准

目标：

- 读取仓库规则、memory、source of truth、旧站映射和当前 goal docs
- 校准当前真实工程状态
- 确认当前 active frontdoor 仍然可运行

退出条件：

- 当前文档、memory、route 基线、验证链事实一致
- 不存在“文档说一套、代码是另一套”的状态

### Phase 1：核心前台完成态

这一阶段只允许优先处理：

1. `/`
2. `/daily-latin`
3. `/dance-os`

并且默认顺序是：

1. `/`
2. `/daily-latin`
3. `/dance-os`

原因不是首页技术上最难，而是：

- 首页是第一视觉入口
- 用户最容易直接评判它是否接近参考稿
- 首页如果还没收口，后面所有说明都会显得像“过程很多，结果不够”

这一阶段每页都必须同时推进：

- 样式贴近参考稿
- 结构更清晰
- 响应式更完整
- 真实内容回填
- 组件边界不退化

退出条件：

- `/`、`/daily-latin`、`/dance-os` 三页都能被直接评价为“明显接近最终版”
- 三页都没有明显模板感主块
- 三页在桌面端和移动端都没有明显破碎区
- 三页在 fresh-prod 下通过完整验证链

### Phase 2：辅助承接页对齐

只在 Phase 1 达标后处理：

- `/legacy`
- `/tools`
- `/roadmap`
- `/dashboard`
- `/about`

目标：

- 不再像工程中间态
- 结构和风格对齐核心前台
- 信息架构更像承接页，而不是后台页

退出条件：

- 辅助页不再明显掉队
- 主前台与辅助页之间没有强烈割裂感

### Phase 3：共享资产沉淀

只在前台完成态更稳定后，集中推进：

- shared components
- content schema
- style tokens
- verification contracts
- 更深的 section / shell / card 抽离

退出条件：

- 未来 AI 修改不容易牵一发动全身
- 可复用资产边界更清晰

### Phase 4：preview / deploy / 域名决策

只在前面几阶段成立后再做：

- preview 链接
- 发布决策
- 是否讨论旧域名入口策略

退出条件：

- preview 可访问
- 用户认可前台完成态
- 再进入生产映射讨论

## 当前推荐 Top 1

在新的优先级体系下，当前默认 Top 1 不是继续做 `1px / 2px` compaction，而是：

**先把 `/daily-latin` 做完第二轮 visible pass，收成更接近参考稿、可直接展示给用户评判的 frontdoor 页面。**

只有 `/daily-latin` 收口到明显更强的可见结果后，再回到 `/` 与 `/dance-os` 做并排复核，判断谁还需要下一轮。

## 推荐 Goal Objective

```text
把 /Users/zon/Desktop/LATINOS/sites/frontdoor 按优先级分阶段推进成最终前台结果：先完成首页、/daily-latin、/dance-os 三个核心页面的参考稿贴近度、真实内容回填、桌面与移动端完成态，再处理 legacy/tools/roadmap/dashboard/about 等辅助承接页，最后沉淀共享组件、内容 schema、样式 tokens、验证合同与发布策略。保持主线为 Next.js App Router + React + TypeScript，不回退到 Astro、单文件 HTML 或 hash-tab 单页壳；保持 Feishu 为唯一 source of truth；保持旧站策略为保留/映射/并行；每一轮 accepted change 都必须通过 typecheck、build、fresh-prod start、route smoke、browser smoke、structure smoke，并同步更新 analysis 与 memory。未达到参考稿近似同款完成度和用户可直接评判的前台完成态前，不要把任务判定为完成。
```

## 可直接复制给 Goal Mode 的最终提示词

```text
你现在在 /Users/zon/Desktop/LATINOS。

这是一个长期主题母仓，不是临时实验目录。

旧目标先停用。现在开始，严格以这份“优先级重排后的 Goal Mode 循环执行合同”作为唯一目标执行。

你的身份不是一次性改页面的执行器，而是 LATINOS frontdoor 这条长期产品线的技术负责人、实现者、验收者和沉淀者。

你的任务不是平均推进所有页面，也不是继续做分散的小优化。你的任务是把 LATINOS frontdoor 按优先级分阶段推进到最终前台完成态，并且保留我们最初的全部诉求。

## 总目标

你必须同时保留以下全部目标，但不能再同权重推进：

1. 样式目标
让网站尽量逼近 /Users/zon/Downloads/latin-workbench (2).html 的视觉语言、布局结构、模块节奏、卡片密度、导航壳体、色系与材质感，并把它当成 style lock，而不是一般参考。

2. 架构目标
保持 /Users/zon/Desktop/LATINOS/sites/frontdoor 继续沿着 Next.js App Router + React + TypeScript、真实路由、组件化、数据与组件分离、类型约束、styles tokens / layout / route override 分层去推进。

3. 内容目标
尽量使用 LATINOS 本地真实拉丁资料、旧站 proof、仓库 standards / legacy / analysis 文档，以及 Feishu source of truth 回填页面，而不是继续停留在模板文案和假数据。

4. 验证目标
每一轮 accepted change 都必须通过完整串行验证链，而不是只看 dev 页面能打开。

5. 资产目标
在前台结果逐步完成后，再继续沉淀可复用的组件、schema、tokens、verification contracts，为未来共享组件库和后续 App 演进保留边界。

## 强约束

- 不要重新讨论技术选型
- 不要回退到 Astro
- 不要回退到单文件 HTML
- 不要回退到 hash-tab 单页壳
- 不要推翻当前 Next.js App Router + React + TypeScript 主线
- Feishu 是唯一 source of truth
- 历史里提到的 Notion 一律视为旧提法，必须翻译回飞书结构
- 旧站默认策略仍然是：保留 / 映射 / 并行
- 没有明确要求时，不要直接改 latindance.zondev.top 生产入口

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
11. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-latinos-goal-mode-single-recommended-prompt.md
12. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-latinos-goal-mode-priority-ordered-loop-prompt.md

## 当前真实基线

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

当前已存在的数据层：

- data/types.ts
- data/home.ts
- data/legacy.ts
- data/daily.ts
- data/dance.ts
- data/tools.ts
- data/roadmap.ts
- data/dashboard.ts
- data/about.ts
- data/content.ts

当前原则：

- 用户更在意“直接看得见的核心前台完成态”，而不是继续积累很多看不见的小优化
- 当前 Phase 1 的核心页是：/、/daily-latin、/dance-os
- 当前已知可见收口状态是：
  - 首页 `/` 已有第二轮 visible pass
  - `/dance-os` 已有第二轮 visible pass
  - `/daily-latin` 仍只有第一轮 visible pass
- 所以当前默认 Top 1 不是首页，而是：`/daily-latin`

## 分阶段推进规则

### Phase 0：事实校准

先确认：

- 当前 docs / memory / dashboard 工程事实是否一致
- 当前 typecheck / build / fresh-prod smoke 是否通过
- 当前 style lock 仍然是 /Users/zon/Downloads/latin-workbench (2).html

只有确认事实一致后，才能进入下一阶段。

### Phase 1：核心前台完成态优先

在这一阶段，只允许优先处理：

1. /
2. /daily-latin
3. /dance-os

核心范围不变，但当前默认轮转顺序要按最新收口状态排：

1. `/daily-latin`
2. `/`
3. `/dance-os`

原因是：

- 首页 `/` 已有两轮 visible pass
- `/dance-os` 已有两轮 visible pass
- `/daily-latin` 仍是剩余差距最大的核心页

如果有证据显示另一个核心页的用户可见差距重新变大，可以临时调整，但必须先在 analysis 里写明原因。

这一阶段每页都必须同时推进：

- 样式更贴近参考稿
- 真实内容继续回填
- 桌面端与移动端完成态
- 用户一眼能理解的结构
- 组件边界不退化

在这三页未达到明显完成态前：

- 不要把主要时间花在 /dashboard /tools /about /roadmap
- 不要优先做部署
- 不要优先做域名切换
- 不要把主精力放在只有 1px / 2px 收益的微优化上

### Phase 2：辅助承接页对齐

只有在 Phase 1 明显达标后，才处理：

- /legacy
- /tools
- /roadmap
- /dashboard
- /about

目标是让这些页不再像工程半成品，而是和主前台同风格、同完成度。

### Phase 3：共享资产沉淀

只有在 Phase 1 和 Phase 2 都更稳之后，才继续集中做：

- shared components
- content schema
- style tokens
- verification contracts
- 更深的结构抽离

### Phase 4：preview / deploy 决策

最后才评估：

- 是否给 preview
- 是否值得发布给用户直接访问
- 是否要进入旧域名入口策略讨论

## 每轮循环的执行合同

每一轮都必须按下面顺序推进：

1. 先读当前状态和最近的 analysis / memory
2. 判断当前处于哪个 Phase
3. 只选择当前阶段的 Top 1 页面或 Top 1 切片
4. 优先修正“用户可见差距最大”的问题，而不是先做难以感知的工程微调
5. 修改后先做局部复核
6. 如果改动触达用户可见前台，必须补桌面端和移动端截图证据
7. 再执行完整串行验证链
8. 通过后更新 docs/analysis/YYYY-MM-DD-<topic>.md
9. 通过后更新 memory/YYYY-MM-DD.md
10. 再决定下一轮是否继续当前页面，还是切到下一个核心页

不要一轮同时推进很多页面。

不要在没有完成证据的情况下切换主线。

## Top 1 选择规则

如果仍在 Phase 1，每一轮按下面顺序选 Top 1：

1. 用户可见差距最大的核心页
2. 响应式破碎最明显的核心页
3. 模板感最强的核心页
4. 当前 broad mobile 最厚的核心页

当前默认 Top 1 是：`/daily-latin`

## Phase 1 的完成定义

只有以下条件同时成立，才允许进入 Phase 2：

1. 首页、/daily-latin、/dance-os 三页都明显接近参考稿，不再需要大量解释
2. 三页的主要内容块已经大幅脱离模板感
3. 三页的桌面端和移动端都没有明显破碎区
4. 三页在 fresh-prod 下都能稳定通过完整验证链
5. 用户可以直接看页面或看截图评价样式与结构，而不是只能听工程说明

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

不要并行拼凑最终验证。

不要跳过 fresh prod。

## 文档要求

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

## 当前建议起手式

默认先做 `/daily-latin` 的一轮明显可见收口：

- 对照参考稿检查 `/daily-latin` 的首屏、入口状态、Daily Loop、回流区、动作库与整体节奏
- 优先减少“系统说明感”和“模板感”，增强“今天就能进入”的 frontdoor 入口感
- 保持真实内容承接，而不是只换皮
- 做完后立刻补桌面端和移动端截图，再跑完整验证链

只有 `/daily-latin` 已经明显更接近参考稿并可直接展示给用户评判后，再决定是继续 `/daily-latin` 微收口，还是切回 `/` 与 `/dance-os` 做并排复核。

在满足我们最初的全部诉求前，不要把任务判定为完成。
```
