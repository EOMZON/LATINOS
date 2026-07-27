# LATINOS Goal Mode Master Loop Prompt

## 这份文档的定位

这份文档是当前最适合直接发给 `goal mode` agent 的唯一主合同。

它保留我们最初的全部诉求，但不再让所有目标同权重推进，而是改成：

- 按阶段推进
- 按优先级推进
- 每轮只做当前阶段的 `Top 1`
- 每轮都必须补验证和证据

它的目标不是“继续做很多工作”，而是让 agent 逐步做出用户能直接看到的前台完成态，并最终收口到长期可维护、可复用、可发布的版本。

## 当前结论

唯一主线保持为：

- `Next.js App Router`
- `React`
- `TypeScript`
- 真实路由
- 组件化
- 数据与组件分离
- 类型约束
- token 化样式管理

不要重新讨论：

- `Astro`
- 单文件 `HTML`
- `hash-tab` 单页壳
- 另起一套新技术栈

内容源唯一保持为：

- `Feishu`

旧站策略唯一保持为：

- `保留`
- `映射`
- `并行`

## 可直接复制给 Goal Mode 的最终提示词

```text
你现在在 /Users/zon/Desktop/LATINOS。

这是一个长期主题母仓，不是临时实验目录。

旧目标已停用。从现在开始，严格以这份“优先级重排后的 Goal Mode Master Loop 合同”作为唯一执行目标。

你的角色不是一次性改页面的执行器，而是 LATINOS frontdoor 这条长期产品线的技术负责人、实现者、验收者和沉淀者。

你的任务不是平均推进所有页面，也不是继续分散地做很多微优化。你的任务是把 LATINOS frontdoor 按优先级分阶段推进到最终前台完成态，并且保留我们最初的全部诉求。

## 总目标

你必须同时保留以下全部目标，但不能再同权重推进：

1. 样式目标
让网站尽量逼近 /Users/zon/Downloads/latin-workbench (2).html 的视觉语言、布局结构、模块节奏、卡片密度、导航壳体、色系与材质感，并把它视为 style lock，而不是一般参考。

2. 架构目标
保持 /Users/zon/Desktop/LATINOS/sites/frontdoor 继续沿着 Next.js App Router + React + TypeScript、真实路由、组件化、数据与组件分离、类型约束、styles tokens / layout / route override 分层去推进。

3. 内容目标
尽量使用 LATINOS 本地真实拉丁资料、旧站 proof、仓库 standards / legacy / analysis 文档，以及 Feishu source of truth 回填页面，而不是继续停留在模板文案和假数据。

4. 响应式目标
所有核心页面必须同时满足桌面端和移动端可读、可用、无明显破碎区，不能再出现窄屏下看不到完整内容或交互为空壳的情况。

5. 验证目标
每一轮 accepted change 都必须通过完整串行验证链，而不是只看 dev 页面能打开。

6. 资产目标
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
- 不要让 /dashboard /tools /about /roadmap 这些辅助页在核心前台未达标前抢主线
- 不要把大量时间继续消耗在只有 1px / 2px 收益的微优化上

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
13. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-latinos-goal-mode-master-loop-prompt.md

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

当前核心结论：

- 这不是空白项目，不要推倒重来
- 这也不是最终完成态，不要误判为已经收口
- 当前用户最在意的是“能直接看到的前台完成态”
- 当前核心页是：/、/daily-latin、/dance-os
- 当前已知可见收口状态是：
  - 首页 `/` 已有第二轮 visible pass
  - `/dance-os` 已有第二轮 visible pass
  - `/daily-latin` 仍只有第一轮 visible pass
- 所以当前默认 Top 1 页面不是首页，而是：`/daily-latin`

## 分阶段执行

### Phase 0：事实校准

先确认：

- docs / standards / memory / dashboard 工程事实是否一致
- 当前 frontdoor 是否仍可运行
- 参考样式锁定是否仍然是 /Users/zon/Downloads/latin-workbench (2).html
- 当前核心页和辅助页边界是否清晰

退出条件：

- 文档和工程事实一致
- 当前验证链可跑通
- 没有“文档说一套、代码是另一套”的状态

### Phase 1：核心前台完成态

这一阶段只允许优先处理：

1. /
2. /daily-latin
3. /dance-os

核心范围保持不变，但当前轮转顺序不是固定按路由顺序平均推进，而是按“谁还没收口”来排：

1. `/daily-latin`
2. `/`
3. `/dance-os`

原因是：

- 首页 `/` 已有两轮可见收口
- `/dance-os` 已有两轮可见收口
- `/daily-latin` 仍是三页里最明显还需要第二轮 visible pass 的核心页

如果后续有明确证据显示另一个核心页的用户可见差距重新变成最大，可以临时调整顺序，但必须先在 analysis 中写明为什么换 Top 1。

这一阶段每页都必须同时推进：

- 样式更贴近参考稿
- 结构更像 frontdoor 成品
- 真实内容继续回填
- 桌面端和移动端都更完整
- 组件边界不退化
- 页面不再出现“点击了没有内容”的空壳区

退出条件：

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
- 风格和结构对齐核心前台
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
- 可复用资产边界清晰
- 后续跨站组件复用有明确抓手

### Phase 4：preview / deploy / 域名决策

只在前面几阶段成立后再做：

- preview 链接
- 发布策略
- 旧域名入口策略讨论

退出条件：

- preview 可访问
- 用户认可前台完成态
- 再进入生产映射讨论

## 每轮循环的固定顺序

每一轮都必须按下面顺序推进：

1. 读取当前状态和最近的 analysis / memory
2. 判断当前处于哪个 Phase
3. 只选择当前阶段的 Top 1 页面或 Top 1 切片
4. 优先修正“用户可见差距最大”的问题，而不是难以感知的工程微调
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

## 当前建议起手式

默认先完成一次真正服务 Phase 1 的 `/daily-latin` 第二轮 visible pass：

- 对照参考稿检查 `/daily-latin` 的首屏、入口状态、Daily Loop、回流区、动作库与整体节奏
- 优先减少系统说明感和模板感，增强“今天就能进入”的 frontdoor 感
- 保持真实内容承接，而不是只做表层样式靠拢
- 做完后立刻补桌面端和移动端截图，再跑完整验证链

只有 `/daily-latin` 已经明显更接近参考稿并可直接展示给用户评判后，再回到 `/` 和 `/dance-os` 做并排复核，判断谁还需要下一轮 visible pass。

在满足我们最初的全部诉求前，不要把任务判定为完成。
```
