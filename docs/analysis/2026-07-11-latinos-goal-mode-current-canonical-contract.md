# LATINOS Goal Mode Current Canonical Contract

## 这份文档解决什么

这份文档用于替代当前已经过时的 active goal 口径。

旧 goal 还停留在：

- 先补首页
- 再补 `/daily-latin`
- 再补 `/dance-os`

但这三件事今天已经分别补过可见承接，因此如果继续沿用旧口径，agent 会继续在已经完成的 frontdoor 核心页上兜圈。

这份文档的作用是：

1. 锁定截至 `2026-07-11` 的最新事实
2. 把“全部目标”重新按长期最优顺序排好
3. 给出一份能直接交给 goal mode 循环执行的唯一提示词

## 当前锁定事实

### 仓库与技术主线

- 当前目录：
  - `/Users/zon/Desktop/LATINOS`
- 这是长期主题母仓，不是临时实验目录
- 唯一主线保持：
  - `Next.js App Router`
  - `React`
  - `TypeScript`
  - 真实路由
  - 组件化
  - 数据与组件分离

### 内容真相

- `Feishu` 是唯一 source of truth
- 历史里的 `Notion` 一律视为旧提法
- 旧提法必须翻译回飞书 wiki / 飞书文档 / 飞书表格 / 飞书结构

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

- `Phase 1` 已完成
- `Phase 2` 已完成
- `Phase 3` 进行中

### 已完成事实

frontdoor 核心承接已经补齐：

- 首页独立 `Dance OS Demo` bridge 已完成
- `/daily-latin` page-level next bridge 已完成
- `/dance-os` 独立 demo entry + page-level next bridge 已完成

因此当前不要再把默认 `Top 1` 放回：

- 首页 bridge
- `/daily-latin` bridge
- `/dance-os` bridge

### 当前 demo 主线事实

当前默认主线仍然是：

- `/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo`

已经成立的最小产品链：

- `archive -> queue -> return trigger`

当前已完成：

- `witness archive`
- `queue`
- `return trigger`
- shared assets 第一刀
- shared assets 第二刀：
  - lifecycle snapshot
  - `witness-flow-stage-card`
- grounded shared data pass

当前最新状态：

- `demo-store` 已新增：
  - `focusProof`
  - `exitRule`
- 老 localStorage witness 数据会通过 `normalizeWitnesses` 自动补全新字段
- `witness-record-card` 已新增 grounded 信息区：
  - 为什么值得留 / 继续 / 回来先做
  - 什么情况说明还没闭环
- `demo-shell` 保存 witness 时已写入：
  - `focus.proof`
  - `state.nextStep`
- 新响应式样式已落到：
  - `.witness-record-grounding`
- 但**这一刀还没完成最终真实验收、截图、analysis、memory 同步**

这意味着：

- 当前最合理的新 `Top 1` 不是重新找方向
- 而是先把这个已经落到代码层、但还没完整验收的 grounded witness chain pass 收口

## 最终总目标

goal mode 最终要逐步达成的是：

1. 样式层面：
   - 新站主要界面的气质、排版、信息密度、结构节奏尽量贴近参考稿
2. 内容层面：
   - 尽量使用飞书与本地已有真实拉丁材料，而不是模板假文案
3. 架构层面：
   - 组件化
   - 数据与组件分离
   - shared assets 可以持续抽取
4. 资产层面：
   - frontdoor
   - 独立 demo
   - 旧站 proof
   可以清晰并行
5. 维护层面：
   - 后续 AI 可以长期改动，不会一处改动牵一片失控
6. 交付层面：
   - 每轮有可见结果
   - 每轮有验证证据
   - 每轮有 analysis / memory 同步
7. 长线资产层面：
   - 后续能把稳定组件、主题 token、模块壳逐步沉成可跨站复用资产

## 重新排布后的优先级

### Priority 0：启动校准

每次进入任务先按顺序读取：

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
18. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-11-dance-os-demo-lifecycle-snapshot-second-shared-assets-pass.md`
19. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-11-dance-os-demo-grounded-shared-data-pass.md`
20. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-11-frontdoor-home-independent-demo-bridge-pass.md`
21. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-11-frontdoor-daily-next-bridge-pass.md`
22. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-11-frontdoor-dance-os-independent-demo-entry-pass.md`
23. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-11-frontdoor-dance-next-bridge-pass.md`
24. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-11-latinos-goal-mode-current-canonical-contract.md`

退出条件：

- 当前阶段判断与文档一致
- 当前事实与 memory 一致
- 当前 `Top 1` 只有一个结论

### Priority 1：先关闭当前已开工的 pass

当前默认唯一 `Top 1`：

- 完成 `Dance OS Demo` grounded witness chain pass 的完整验收

不要在这个 pass 还没验收完时跳去：

- 新 frontdoor 改动
- 新部署
- 新域名
- 第二个 demo
- 新一轮大抽象

这轮通过条件必须包括：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `next start`
4. 真实交互 smoke 完整走通
5. 桌面端截图
6. 移动端截图
7. 新 analysis 文档
8. 今天 memory 同步
9. 旧测试服务清理

建议 smoke 步骤最少验证：

1. 清空 localStorage
2. 选择：
   - `拍子总乱`
   - `恰恰`
   - `脚下`
3. 填写备注
4. 保存 witness
5. 验证 archive 卡出现：
   - `为什么值得留`
   - `这通常最容易从视频回看里直接看出差异。`
   - `如果这轮还没收住`
   - `如果还是乱，下一轮就只守住拍子，不追加别的要求。`
6. 验证 queue 卡使用 queue 语义标签
7. 点击 queue 的：
   - `继续这条`
8. 验证 return 卡使用 return 语义标签
9. 验证 lifecycle snapshot 仍连贯
10. 验证旧格式 localStorage 数据进入页面后会被自动补全：
    - `focusProof`
    - `exitRule`
11. 清除 return trigger
12. 标记 queue 完成
13. 验证 snapshot 回落到正确空态或下一条

### Priority 2：继续只服务 `Dance OS Demo`

当前不要再平均推进：

- frontdoor 所有页面
- 两个 demo
- shared assets
- deploy

当前主线只允许继续服务：

- `/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo`

### Priority 3：下一轮仍以“最小可见收益”推进 demo

一旦 Priority 1 验收完成，后续新一轮默认顺序是：

1. 优先做对用户可见的 demo 产品收益
2. 再做最小 shared assets 抽取
3. 只在 demo 暴露真实缺口时回切 frontdoor

这意味着下一轮候选的优先顺序应该是：

1. demo 内还没被真实拉丁材料填实的可见内容
2. demo 内下一刀最小可见 shared assets
3. demo 与 frontdoor 的真实映射修补

而不是：

- 重新做一轮大范围样式漂移
- 重新找框架
- 提前部署

### Priority 4：shared assets 为长期资产服务，但不能先于用户价值

抽 shared assets 的前提是：

- 这刀能减少重复
- 这刀不会把页面抽成看不见的纯结构整理
- 抽完后用户能看到结果更稳定、更清楚或更一致

长期希望沉淀的方向包括：

- reusable stage cards
- shared data config
- stable witness store shape
- frontdoor / demo 可共用的 bridge card shell
- 主题 token / CSS 变量 / layout shell

### Priority 5：frontdoor 只按需回切

只有以下情况之一成立，才允许把 `sites/frontdoor` 作为当轮主战场：

- demo 事实已经变化，frontdoor 口径落后
- 样式或响应式回归
- 独立 demo 的入口映射不再真实

如果没有这些事实，就不要再把首页、`/daily-latin`、`/dance-os` 当默认 `Top 1`。

### Priority 6：第二个 demo 与更大资产层最后处理

只有在 `Dance OS Demo` 主线更稳后，再考虑：

- `Daily Latin Demo` 的独立实验壳
- 跨站组件沉淀
- 更明确的个人组件库方向
- 与未来 app 共享的 design / data patterns

### Priority 7：preview / deploy / domain 最后处理

只有在以下条件都更清楚后再做：

- 当前 demo 的价值闭环更实
- frontdoor 与 demo 的边界稳定
- 用户认可方向

在此之前，不要提前跳去：

- 生产部署
- 旧域名切换
- 旧站首页替换

## Goal Mode 循环规则

### 1. 每轮只允许一个 Top 1

每轮只允许以下三种之一：

- 一个 `Top 1 页面`
- 一个 `Top 1 demo`
- 一个 `Top 1 切片`

不要平均推进。

### 2. 开始前必须先写清楚

每轮开始前先明确：

- `Top 1`
- `本轮目标`
- `通过条件`
- `不做什么`

### 3. 每轮必须有用户可见结果

不要只做：

- prompt 改写
- 架构讨论
- 隐形整理
- 无法被看到的抽象准备

每轮都尽量至少拿出一个用户可见变化：

- 页面结构变化
- 内容承接变化
- 交互变化
- 数据状态变化

### 4. 每轮必须做真实验证

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

1. 如首次依赖安装卡住，先运行：
   - `pnpm approve-builds --all`
2. `pnpm typecheck`
3. `pnpm build`
4. kill 旧服务
5. `pnpm exec next start --hostname 127.0.0.1 --port 3301`
6. 做一次真实交互 smoke
7. 补桌面端截图
8. 补移动端截图

### 5. accepted change 必须补文档

任何 accepted 变更都必须同步：

- `docs/analysis/YYYY-MM-DD-<topic>.md`
- `memory/YYYY-MM-DD.md`

### 6. 必须 grounded 到真实材料

尽量使用：

- `data/feishu/latinos-sources.json`
- 飞书文档定义
- 本地已有拉丁内容
- 旧站 proof 中已存在的真实表达

不要继续堆：

- 假数据
- 空泛 slogan
- 与真实材料脱节的模板文案

### 7. 每轮结束后必须按同一算法重新选 Top 1

如果出现以下任一情况，下一轮继续维持原 `Top 1`，不要换题：

- 代码已改但还没完整真实验证
- 验证没通过
- analysis / memory 没同步
- 截图还没补齐

只有当前轮完全收口后，才按这个顺序重新选择下一轮唯一 `Top 1`：

1. 还有没有已经落代码但未完成验收的 `Dance OS Demo` pass
2. 如果没有，优先选 `Dance OS Demo` 内用户可见收益最大的下一刀
3. 如果 demo 推进暴露 frontdoor 口径落后，再回切 frontdoor
4. 如果 frontdoor 没有真实缺口，不要回切
5. `Daily Latin Demo`、跨站组件库、preview / deploy / domain 一律后置

## 可直接复制给 Goal Mode 的新版提示词

```text
你现在在 /Users/zon/Desktop/LATINOS。

这是一个长期主题母仓，不是临时实验目录。

之前那个 active goal 已经过时。它还停留在“先补首页、再补 /daily-latin、再补 /dance-os”的口径，但这些 frontdoor 核心承接在 2026-07-11 已经分别补过，所以你现在不要继续按旧 goal 兜圈。

从现在开始，你只以这份新合同作为唯一目标执行，不再混用任何旧 prompt。

你的最终目标不是只做一个页面，而是逐步把 LATINOS 推进到这个状态：

1. 样式尽量贴近 /Users/zon/Downloads/latin-workbench (2).html 的参考气质和结构节奏
2. 内容尽量 grounded 到飞书和本地真实拉丁材料
3. 架构保持长期可维护：
   - Next.js App Router
   - React
   - TypeScript
   - 组件化
   - 数据与组件分离
4. new frontdoor、独立 demo、旧站 proof 可以清晰并行
5. 每轮都必须有用户可见结果、真实验证、截图证据、analysis / memory 同步
6. 后续能逐步沉淀成适合 AI 长期维护和跨站复用的组件 / 主题 / 数据资产

## 不可变前提

- 不要重新讨论 Astro
- 不要回退到单文件 HTML
- 不要回退到 hash-tab 壳
- Feishu 是唯一 source of truth
- 历史里的 Notion 一律视为旧提法，必须翻译回飞书结构
- 旧站默认策略仍然是：保留 / 映射 / 并行
- 没有明确要求时，不要直接改 latindance.zondev.top 的生产入口

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
15. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-dance-os-demo-queue-pass.md
16. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-dance-os-demo-return-trigger-pass.md
17. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-11-dance-os-demo-shared-assets-first-pass.md
18. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-11-dance-os-demo-lifecycle-snapshot-second-shared-assets-pass.md
19. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-11-dance-os-demo-grounded-shared-data-pass.md
20. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-11-frontdoor-home-independent-demo-bridge-pass.md
21. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-11-frontdoor-daily-next-bridge-pass.md
22. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-11-frontdoor-dance-os-independent-demo-entry-pass.md
23. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-11-frontdoor-dance-next-bridge-pass.md
24. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-11-latinos-goal-mode-current-canonical-contract.md

## 当前锁定事实

- Phase 1 已完成
- Phase 2 已完成
- Phase 3 进行中
- 首页独立 Dance OS Demo bridge 已完成
- /daily-latin page-level next bridge 已完成
- /dance-os 独立 demo entry + next bridge 已完成
- 当前默认主线不是 frontdoor，而是：
  - /Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo
- 当前最小产品链已经成立：
  - archive -> queue -> return trigger
- shared assets 第一刀已完成
- shared assets 第二刀已完成：
  - lifecycle snapshot
  - witness-flow-stage-card
- grounded shared data pass 已完成
- 当前最新 open pass 不是首页，不是 /daily-latin，不是 /dance-os，而是 grounded witness chain pass：
  - demo-store 新增 focusProof / exitRule
  - old localStorage witness 会自动补全新字段
  - archive / queue / return 三块新增 grounded 解释区
  - 响应式样式已落代码
  - 但还没有完整做完真实验收和文档同步

## 当前默认 Top 1

先完成 `Dance OS Demo` grounded witness chain pass 的完整验收，而不是重新找方向。

## 当前优先级

### Priority 0

先校准文档、memory、代码现状和当前阶段事实。

### Priority 1

只做一个 Top 1：

- 完成 `apps/demos/dance-os-demo` 当前 grounded witness chain pass 的完整收口

这轮必须做到：

1. 跑 `pnpm typecheck`
2. 跑 `pnpm build`
3. fresh 启动 `next start`
4. 跑真实交互 smoke
5. 补桌面截图
6. 补移动截图
7. 写 analysis 文档：
   - `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-11-dance-os-demo-grounded-witness-chain-pass.md`
8. 更新今天 memory
9. 清理旧服务

建议 smoke 至少验证：

1. 清空 localStorage
2. 选择 `拍子总乱`
3. 选择 `恰恰`
4. 选择 `脚下`
5. 输入备注
6. 保存 witness
7. 验证 archive 卡出现：
   - `为什么值得留`
   - `这通常最容易从视频回看里直接看出差异。`
   - `如果这轮还没收住`
   - `如果还是乱，下一轮就只守住拍子，不追加别的要求。`
8. 验证 queue 卡使用 queue 标签语义
9. 点击 queue 的 `继续这条`
10. 验证 return 卡使用 return 标签语义
11. 验证 lifecycle snapshot 的 archive / queue / return 三块状态仍连贯
12. 验证旧格式 localStorage witness 会被自动补全新字段
13. 清除 return trigger
14. 标记 queue 完成
15. 验证 snapshot 回到正确状态

### Priority 2

如果这轮被 accepted，先同步：

- docs/analysis/YYYY-MM-DD-<topic>.md
- memory/YYYY-MM-DD.md
- 当前主合同里的阶段事实

### Priority 3

收口后继续只服务 `Dance OS Demo` 主线，不要平均推进所有页面。

后续顺序默认是：

1. 先做 demo 内真实内容 grounded pass 或最小可见产品收益
2. 再做最小 shared assets 抽取
3. 只有 demo 暴露真实缺口时才回切 frontdoor

### Priority 4

frontdoor 只在以下情况允许回切：

- demo 事实变化导致首页、/daily-latin、/dance-os 口径落后
- 样式或响应式回归
- 独立 demo 的入口映射不再真实

### Priority 5

只有在 Dance OS Demo 更稳之后，再考虑：

- Daily Latin Demo 的独立实验壳
- 跨站组件沉淀
- 主题 token / bridge shell / shared patterns

### Priority 6

preview / deploy / domain 最后处理，不要提前跳过去。

## 每轮强规则

1. 每轮只允许一个 Top 1 页面、Top 1 demo 或 Top 1 切片
2. 开始前先写清楚：
   - Top 1
   - 本轮目标
   - 通过条件
   - 不做什么
3. 每轮必须拿出至少一个用户可见结果
4. 每轮必须做真实验证
5. 每轮 accepted change 必须补 analysis 和 memory
6. 每轮尽量 grounded 到真实飞书和本地拉丁材料
7. 如果当前轮还没完整验收，就禁止切换到新的 Top 1

## 验证规则

如果改的是 sites/frontdoor：

1. 进入 /Users/zon/Desktop/LATINOS/sites/frontdoor
2. 串行执行 pnpm typecheck
3. 串行执行 CI=1 pnpm build
4. fresh 启动 pnpm exec next start --hostname 127.0.0.1 --port 3200
5. FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes
6. FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser
7. FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs

如果改的是 apps/demos/dance-os-demo：

1. 进入 /Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo
2. 如首次依赖安装卡住，先运行 pnpm approve-builds --all
3. 串行执行 pnpm typecheck
4. 串行执行 pnpm build
5. fresh 启动 pnpm exec next start --hostname 127.0.0.1 --port 3301
6. 做真实交互 smoke
7. 补桌面截图
8. 补移动截图

## 下一轮 Top 1 选择算法

只有当前轮完全收口后，才允许选择下一轮。

按这个顺序判断：

1. 是否还有已经落代码但未完成验收的 `Dance OS Demo` pass
2. 如果没有，是否存在 demo 内用户可见收益最大的下一刀
3. 如果 demo 推进暴露 frontdoor 口径落后，才允许回切 frontdoor
4. 如果 frontdoor 没有真实缺口，不要回切
5. `Daily Latin Demo`、跨站组件库、preview / deploy / domain 一律后置

## 输出方式

不要只给计划。

每轮都要：

1. 真正改代码或完成真实验证
2. 给出可见结果
3. 给出测试证据
4. 同步 analysis / memory
5. 然后再决定下一轮唯一 Top 1
```
