# LATINOS Goal Mode Single Contract

## 这份文档现在是什么

这份文档是当前唯一推荐发给 `goal mode` agent 的主合同。

旧 prompt 先全部退到“历史参考”位置，不再混用。

这次重排的目标不是再写一份更长的 prompt，而是把所有目标按真实优先级排好，让 agent 能连续循环执行很多轮，同时每轮都有：

- 唯一 `Top 1`
- 用户可见结果
- 串行验证
- 截图证据
- analysis / memory 同步

## 问题本质

真正要解决的不是“继续改一点页面”，而是：

**把 `LATINOS` 推进成一个长期可维护的拉丁主题母体，让 `Daily Latin IP + 拉丁成长网站 + Dance Tools / Demos` 这三条线能在同一套清晰结构里长期共存，并且先把当前最关键、最该继续长出来的产品切片做实。**

## 当前真实事实

截至 `2026-07-10`，这几个事实应锁定：

### 仓库身份

- 当前目录：
  - `/Users/zon/Desktop/LATINOS`
- 这是长期主题母仓，不是临时实验目录

### 技术主线

不要再重开技术选型。

当前唯一主线：

- `Next.js App Router`
- `React`
- `TypeScript`
- 真实路由
- 组件化
- 数据与组件分离

### Source of Truth

- `Feishu` 是唯一 source of truth
- `Notion` 一律视为旧提法
- 历史里的 `Notion` 必须翻译回飞书 wiki / 飞书文档 / 飞书表格 / 飞书结构

### 旧站策略

旧站：

- live:
  - `https://latindance.zondev.top/`
- source:
  - `/Users/zon/Desktop/MINE/9_latin/apps/latinDance`

默认策略仍然是：

- `保留`
- `映射`
- `并行`

没有明确要求时：

- 不直接改旧站生产代码
- 不直接切旧域名生产入口
- 不直接做粗暴迁移

### 样式锚点

当前 style lock：

- `/Users/zon/Downloads/latin-workbench (2).html`

### 阶段判断

- `Phase 1`：
  - 已完成
  - 核心 frontdoor 页 `/`、`/daily-latin`、`/dance-os` 当前没有明显必须继续当默认 `Top 1` 的掉队页
- `Phase 2`：
  - 已完成
  - `legacy / tools / roadmap / dashboard / about` 已有当前批次可接受完成态
- `Phase 3`：
  - 进行中
  - 主线已切到独立 demo 孵化

### 当前默认主线

当前默认 `Top 1` 不是 frontdoor，不是 deploy，也不是组件抽象，而是：

- `/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo`

当前合理切片顺序：

1. `witness archive`
2. `queue`
3. `return trigger`

已知当前状态：

- `witness archive` 已完成
- `queue` 已完成，并已补齐 code / smoke / screenshots / analysis / memory
- `return trigger` 第一版已完成，并已补齐 code / smoke / screenshots / analysis / memory
- 当前已经成立的最小产品链是：
  - `archive -> queue -> return trigger`
- `shared assets` 第一刀已完成：
  - `demo-store`
  - `witness-record-card`
- `frontdoor` 对独立 demo 的真实入口映射第一刀已完成：
  - `/dance-os` 已有独立 demo 入口块
- 下一顺位默认应重新在以下候选里二选一：
  - 首页是否也需要更直接地承接独立 demo
  - `Dance OS Demo` 的第二刀 shared assets

## Best Minds 收口

如果把产品负责人、前端架构负责人、设计系统负责人、内容负责人和 AI 长期维护协作者放到一起收口，当前最优路径是：

1. 不再重开技术选型
2. 不再平均推进 frontdoor 所有页面
3. 承认当前阶段已从“做入口页”切到“做真实 demo 切片”
4. 继续只服务 `Dance OS Demo`
5. 每轮都必须拿出可见结果和验证证据
6. 只有当 demo 的用户价值闭环更实后，才推进 shared assets / preview / deploy / 域名策略

也就是说：

**现在不缺更多方向，而是缺一份让 agent 长期不跑偏的执行秩序。**

## 优先级重排

### Priority 0：启动校准

每次进入任务，先按顺序读取：

1. `/Users/zon/Desktop/LATINOS/AGENTS.md`
2. `/Users/zon/Desktop/LATINOS/README.md`
3. `/Users/zon/Desktop/LATINOS/MEMORY.md`
4. `/Users/zon/Desktop/LATINOS/memory/` 里今天最新的日志
5. `/Users/zon/Desktop/LATINOS/docs/standards/source-of-truth.md`
6. `/Users/zon/Desktop/LATINOS/docs/standards/repo-structure.md`
7. `/Users/zon/Desktop/LATINOS/docs/standards/website-strategy.md`
8. `/Users/zon/Desktop/LATINOS/data/feishu/latinos-sources.json`
9. `/Users/zon/Desktop/LATINOS/docs/legacy/latindance-map.md`
10. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-phase1-complete-decision.md`
11. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-phase2-complete-decision.md`
12. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-phase3-demo-definition-initial.md`
13. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-dance-os-demo-first-shell.md`
14. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-dance-os-demo-witness-archive-pass.md`
15. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-dance-os-demo-queue-pass.md`
16. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-dance-os-demo-return-trigger-pass.md`
17. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-11-dance-os-demo-shared-assets-first-pass.md`
18. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-11-frontdoor-dance-os-independent-demo-entry-pass.md`
19. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-core-routes-current-complete-audit.md`
20. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-latinos-goal-mode-priority-reset-prompt.md`

退出条件：

- 当前阶段判断与文档一致
- 当前 `Top 1` 判断与文档一致
- 不再引用旧口径

### Priority 1：先维持事实同步

当前 `queue` 与 `return trigger` 已经闭环。

这一优先级现在的含义是：

- 不要再按旧事实重复做 queue 闭环
- 新一轮 accepted change 之后，继续同步：
  - `analysis`
  - `memory`
  - 主合同

### Priority 2：进入第一轮 shared assets 判断

当前唯一默认主线：

- `/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo`

目标不是回到“独立壳”阶段，而是基于已经成立的：

- `archive -> queue -> return trigger`

继续判断哪些边界值得先沉成 shared assets。

当前默认优先候选：

1. 首页是否也需要更直接地承接独立 demo
2. archive / queue / return trigger 之间下一刀最小共享边界
3. frontdoor 与 demo 将来可能共用的回流模式

规则：

- 每一轮只做一个最小可验收切片或一个最小可复用边界
- 每一轮都要尽量让用户看到真实变化，而不是只看到结构整理

### Priority 3：frontdoor 只按需回切

默认不要回到 `sites/frontdoor` 平均推进。

只有以下情况之一成立，才允许回切：

- `Dance OS Demo` 推进时暴露 frontdoor 真实回归
- frontdoor 缺少对新 demo 的真实入口映射
- frontdoor 页面口径落后于当前阶段事实

### Priority 4：preview / deploy / 域名最后处理

只在以下条件成立后考虑：

- `Dance OS Demo` 的 shared assets 边界已比现在更清楚
- frontdoor 与 demo 的边界更清晰
- 用户认可当前结果方向

在此之前，不要提前跳去：

- 生产部署
- 域名切换
- 旧站首页替换

## 每一轮必须遵守的循环规则

### 1. 每轮只允许一个 Top 1

不要平均推进：

- frontdoor 页面
- 两个 demo
- shared assets
- deploy

每一轮只允许服务当前阶段的：

- 一个 `Top 1 页面`
- 或一个 `Top 1 demo`
- 或一个 `Top 1 切片`

### 2. 每轮都必须先写清验收假设

开始实现前，先明确：

- 这轮唯一要推进的是什么
- 这轮用户能看到什么变化
- 什么证据算通过

推荐格式：

- `Top 1`
- `本轮目标`
- `通过条件`
- `不做什么`

### 3. 必须产出可见结果

不要只做：

- prompt 改写
- 架构讨论
- 抽象准备
- 隐形整理

每一轮都必须尽量拿出至少一个用户可见结果：

- 页面结构变化
- 交互变化
- 数据状态变化
- 更真实的内容 grounding

### 4. 必须做真实验证

不要把“dev 页面能打开”当证据。

#### 如果改的是 `sites/frontdoor`

在 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 严格串行执行：

1. `pnpm typecheck`
2. `CI=1 pnpm build`
3. kill 旧服务
4. `pnpm exec next start --hostname 127.0.0.1 --port 3200`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
6. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
7. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

#### 如果改的是 `apps/demos/dance-os-demo`

在 `/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo` 严格串行执行：

1. 如首次依赖安装受阻，先运行：
   - `pnpm approve-builds --all`
2. `pnpm typecheck`
3. `pnpm build`
4. kill 旧服务
5. `pnpm exec next start --hostname 127.0.0.1 --port 3301`
6. 做一次真实交互 smoke，至少验证：
   - 选择状态
   - 选择 profile / focus
   - 右侧输出句真实变化
   - witness 保存
   - queue / return 相关动作
7. 补桌面端截图
8. 补移动端截图

### 5. accepted change 必须补文档

只要一轮变更被接受，必须同步：

- `docs/analysis/YYYY-MM-DD-<topic>.md`
- `memory/YYYY-MM-DD.md`

不要让页面事实和 analysis / memory 脱节。

### 6. 必须 grounded 到真实材料

每一轮都尽量回到：

- Feishu 来源索引
- 当前本地 standards / legacy / analysis
- 旧站 proof

不要继续堆：

- 假数据
- 空泛口号
- 与真实拉丁材料脱节的模板文案

## 这份合同最容易失败的地方

### 1. 又回到 frontdoor 平均推进

失败表现：

- 又改首页一点
- 又改 `/daily-latin` 一点
- 又改 `/tools` 一点
- 最后 demo 没有真实长出来

### 2. 又只做“状态汇报”

失败表现：

- 文档很多
- 用户看不到可见变化
- 真正的产品切片没有前进

### 3. 代码领先，文档落后

失败表现：

- 已完成的切片没有 analysis / memory
- 下一轮 agent 又重复判断旧事实

### 4. 提前进入 shared assets / deploy / 域名

失败表现：

- 主线被打散
- 最关键的 demo 闭环没有先成立

### 5. 又新增一堆并列“主 prompt”

失败表现：

- 后续 agent 继续拿错版本
- 状态再次漂移

## Stop Doing

从现在开始，默认停止：

- 重新讨论 `Astro`
- 回退到单文件 `HTML`
- 回退到 hash-tab 壳
- 把首页 `/` 当当前默认 `Top 1`
- 把 frontdoor 当当前唯一主战场
- 同时推进两个 demo
- 提前推进 deploy / domain
- 新增更多并列 prompt 文档作为“唯一主合同”

## 可直接复制给 Goal Mode 的最终提示词

```text
你现在在 /Users/zon/Desktop/LATINOS。

这是一个长期主题母仓，不是临时实验目录。

之前的目标先停用。现在开始，你只以以下合同作为唯一目标执行，不再混用任何旧 prompt。

你的任务不是平均推进所有页面，也不是继续做分散优化。你的任务是按当前真实阶段，把 LATINOS 逐步推进到最终效果：样式尽量贴近参考稿、内容尽量 grounded 到真实拉丁材料、结构长期可维护、旧站/新入口/demo 能清晰共存，并且每轮都要有可见结果和验证证据。

## 不可变前提

- 技术主线锁定为：Next.js App Router + React + TypeScript
- 不要重新讨论 Astro / 单文件 HTML / hash-tab 壳
- Feishu 是唯一 source of truth
- 历史里的 Notion 一律视为旧提法，必须翻译回飞书结构
- 旧站默认策略仍然是：保留 / 映射 / 并行
- 没有明确要求时，不要直接改 latindance.zondev.top 生产入口
- /Users/zon/Downloads/latin-workbench (2).html 是当前 style lock

## 启动必读

先按顺序读取：

1. /Users/zon/Desktop/LATINOS/AGENTS.md
2. /Users/zon/Desktop/LATINOS/README.md
3. /Users/zon/Desktop/LATINOS/MEMORY.md
4. /Users/zon/Desktop/LATINOS/memory/ 里今天最新的日志
5. /Users/zon/Desktop/LATINOS/docs/standards/source-of-truth.md
6. /Users/zon/Desktop/LATINOS/docs/standards/repo-structure.md
7. /Users/zon/Desktop/LATINOS/docs/standards/website-strategy.md
8. /Users/zon/Desktop/LATINOS/data/feishu/latinos-sources.json
9. /Users/zon/Desktop/LATINOS/docs/legacy/latindance-map.md
10. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-phase1-complete-decision.md
11. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-phase2-complete-decision.md
12. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-phase3-demo-definition-initial.md
13. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-dance-os-demo-first-shell.md
14. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-dance-os-demo-witness-archive-pass.md
15. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-core-routes-current-complete-audit.md
16. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-latinos-goal-mode-priority-reset-prompt.md

## 当前真实阶段

- Phase 1 已完成
- Phase 2 已完成
- Phase 3 进行中

当前不能再把任务理解成“还在补 frontdoor 基础页”。

当前主线已经进入：

- frontdoor 当前批次已足够支撑入口职责
- 两个 demo 的边界已定义
- Dance OS Demo 已有独立可运行壳
- witness archive / queue / return trigger 第一版都已完成
- 当前已形成第一版最小产品链：
  - archive -> queue -> return trigger
- shared assets 第一刀已完成
- `/dance-os` 的独立 demo 入口第一刀已完成
- 当前默认下一步更适合重新在：
  - 首页 demo 承接
  - 或第二刀 shared assets
  之间选一个新的 `Top 1`

## 当前唯一默认 Top 1

- /Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo

## 优先级

### Priority 0

先校准文档、memory、代码现状和当前阶段事实是否一致。

### Priority 1

如果新一轮变更已经 accepted，先补齐 analysis / memory / 主合同，同步真实事实。

### Priority 2

继续只推进 Dance OS Demo。

当前默认下一步不再是回到 queue 闭环或 return trigger 定义，而是：

1. 先判断首页是否也需要补一个更直接的独立 demo 承接入口
2. 如果首页当前不该回切，再继续在 archive / queue / return trigger 之间挑下一刀 shared assets
3. 一次只做一个最小可验收切片或一个最小可复用边界

一次只做一个最小可验收切片，不要一轮做很多。

### Priority 3

当前 Dance OS Demo 已形成第一版更真实产品闭环，因此现在允许进入共享资产沉淀：

- shared components
- content schema
- style tokens
- verification contracts

### Priority 4

只有当 demo 推进暴露 frontdoor 回归或需要入口映射时，才回切 frontdoor。

### Priority 5

最后才评估 preview / deploy / 域名。

## 每一轮强规则

- 每一轮只允许一个 Top 1 页面、Top 1 demo 或 Top 1 切片
- 开始前先写清楚本轮目标、通过条件、不做什么
- 不要只做不可见整理
- 每一轮都尽量拿出用户可见结果
- 每一轮都要尽量 grounded 到真实拉丁材料，而不是模板文案

## 验证规则

如果改动的是 sites/frontdoor：

1. 进入 /Users/zon/Desktop/LATINOS/sites/frontdoor
2. 串行执行 pnpm typecheck
3. 串行执行 CI=1 pnpm build
4. fresh 启动 pnpm exec next start --hostname 127.0.0.1 --port 3200
5. FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes
6. FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser
7. FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs

如果改动的是 apps/demos/dance-os-demo：

1. 进入 /Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo
2. 如依赖首次安装卡在 approval，先运行 pnpm approve-builds --all
3. 串行执行 pnpm typecheck
4. 串行执行 pnpm build
5. fresh 启动 pnpm exec next start --hostname 127.0.0.1 --port 3301
6. 做真实交互 smoke，至少验证状态切换、focus/profile 切换、输出句变化、保存 witness、queue/return 动作
7. 补桌面端截图
8. 补移动端截图

不要把 dev 页面能打开当作最终证据。

## 文档要求

只要 accepted change 成立，必须同步：

- docs/analysis/YYYY-MM-DD-<topic>.md
- memory/YYYY-MM-DD.md

## 循环执行方式

每完成一轮后，必须明确回答：

1. 本轮唯一 Top 1 是什么
2. 做成了什么用户可见结果
3. 跑了哪些验证
4. 哪些截图或证据已补齐
5. 是否继续围绕当前 Top 1 单点推进
6. 如果切换 Top 1，为什么现在可以切

## 完成判定

只有在以下条件大体成立时，才允许把总任务判定为完成：

- 样式持续贴近参考稿
- 内容尽量 grounded 到真实拉丁材料
- Dance OS Demo 已形成比当前更完整的最小产品闭环
- shared assets 的边界比现在清晰
- frontdoor 与 demo 的共存关系比现在更明确
- preview / deploy / 域名策略具备真实讨论价值

在这些条件未成立前，不要把任务判定为完成。
```
