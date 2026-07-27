# LATINOS Goal Mode Priority Reorder Contract

## 这份文档解决什么

这份文档用于替代之前已经暂停的 goal 目标。

它不是再补一份泛泛 prompt，而是把：

- 最终总目标
- 当前真实阶段
- 优先级顺序
- 每轮必须验证什么
- 什么情况下允许切换战场

全部收成一份新的单一执行合同。

## 问题本质

当前真正要解决的不是“再改几个页面”，而是：

**把 `LATINOS` 推进成一条长期可维护的拉丁主题母仓，让 `Daily Latin IP + 拉丁成长网站 + Dance Tools / Demos` 三条线在同一套清晰结构里长期共存，并且优先把当前最值得继续长出来的 `Dance OS Demo` 做到真实、可看、可验证、可复用。**

## 当前锁定事实

### 仓库身份

- 当前目录：
  - `/Users/zon/Desktop/LATINOS`
- 这是长期主题母仓，不是临时实验目录

### 技术主线

不要再重开技术选型。

唯一主线保持：

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

### 当前已完成事实

当前已经成立：

- `Dance OS Demo` 独立壳已可运行
- `witness archive` 已完成
- `queue` 已完成
- `return trigger` 已完成
- 第一刀 shared assets 已完成
- `/dance-os` 对独立 demo 的入口映射第一刀已完成

当前已经存在的最小产品链：

- `archive -> queue -> return trigger`

## 终局目标

goal mode 最终不是“做完一个页面”。

最终要逐步达成的是：

1. 样式层面：
   - 新站主要界面的气质、排版、信息密度、结构节奏尽量贴近参考稿
2. 内容层面：
   - 尽量用本地已有真实拉丁材料和飞书内容填充，而不是假数据模板
3. 架构层面：
   - 组件化
   - 数据与组件分离
   - 共享资产可以持续抽取
4. 资产层面：
   - 新 frontdoor
   - 独立 demo
   - 旧站 proof
   能并行存在且边界清楚
5. 维护层面：
   - 后续 AI 可以持续改动，不会一处改动牵一片失控
6. 交付层面：
   - 每轮都有可见结果
   - 每轮都有验证证据
   - 每轮都有 memory / analysis 同步

## Best Minds 收口

如果从产品负责人、前端架构负责人、设计系统负责人和长期 AI 维护协作者一起收口，当前最优顺序不是平均推进，而是：

1. 先承认当前已从“补基础页面”进入“孵化真实 demo”
2. 把唯一主线收在 `Dance OS Demo`
3. 只在 demo 推进时按需回切 frontdoor
4. 只在边界稳定后继续沉 shared assets
5. 最后才讨论 preview / deploy / domain

反过来说，当前最容易失败的方式是：

- 又回到 frontdoor 平均推进
- 又只做状态汇报
- 又同时推多个主线
- 又提前跳去生产部署

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
18. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-11-frontdoor-dance-os-independent-demo-entry-pass.md`
19. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-core-routes-current-complete-audit.md`
20. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-latinos-goal-mode-priority-reset-prompt.md`
21. `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-11-latinos-goal-mode-priority-reorder-contract.md`

退出条件：

- 当前阶段判断与文档一致
- 当前事实与 memory 一致
- 当前 `Top 1` 判断有唯一结论

### Priority 1：先维护事实同步

只要新一轮变更被 accepted，先同步：

- `docs/analysis/YYYY-MM-DD-<topic>.md`
- `memory/YYYY-MM-DD.md`
- 当前主合同里的阶段事实

不要让代码领先、文档落后。

### Priority 2：继续只服务 `Dance OS Demo`

当前默认唯一主线仍然是：

- `/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo`

不要重新回到：

- 多页面平均推进
- 多 demo 并行推进
- 提前做 deploy / domain

### Priority 3：当前默认 Top 1 先看首页承接

基于现在的真实状态，当前最合理的新 `Top 1` 默认先选：

- 首页是否需要增加一个更直接、更明确的 `Dance OS Demo` 独立 demo 承接入口

原因：

- `/dance-os` 已经有独立 demo 入口块
- 但首页仍可能缺少更直接的承接桥
- 这能让用户更早看到真实成果，而不是只能二跳理解

这轮默认通过条件：

- 首页出现更明确的独立 demo 承接
- 不破坏现有首页样式节奏
- 仍保持桌面与移动端可用
- frontdoor 全验证链通过
- 有桌面与移动端截图

### Priority 4：若首页不该回切，再做第二刀 shared assets

如果检查后发现首页当前不应回切，则第二优先默认改成：

- 在 `archive / queue / return trigger` 三块之间继续抽第二刀最小 shared assets

仍然要求：

- 一次只抽一个边界
- 抽完后要有用户可见收益
- 不做纯抽象

### Priority 5：frontdoor 只按需回切

只有以下情况之一成立，才允许把 `sites/frontdoor` 作为当轮主战场：

- demo 推进暴露出真实入口缺口
- 首页或 `/dance-os` 口径落后于当前 demo 事实
- 样式或响应式出现明显回归

### Priority 6：preview / deploy / 域名最后处理

只有在以下条件更清楚后再考虑：

- demo 的价值闭环更实
- frontdoor 和 demo 的边界更清楚
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

说明：

- 如果第一次 `typecheck` 因 `.next/types` 缺失失败，先生成后复跑
- 最终接受事实以成功复跑结果为准

#### 如果改的是 `apps/demos/dance-os-demo`

在 `/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo` 严格串行执行：

1. 如首次依赖安装卡住，先运行：
   - `pnpm approve-builds --all`
2. `pnpm typecheck`
3. `pnpm build`
4. kill 旧服务
5. `pnpm exec next start --hostname 127.0.0.1 --port 3301`
6. 做一次真实交互 smoke，至少验证：
   - 状态切换
   - profile / focus 切换
   - 右侧输出句变化
   - 保存 witness
   - queue / return 相关动作
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

## 对抗性测试

这份合同最容易失败的地方有 5 个：

1. 又回到 frontdoor 平均推进
2. 又只做状态汇报，没有用户可见进展
3. 代码改了，但 analysis / memory 没跟上
4. 主线还没实，就提前跳去 deploy / domain
5. 又冒出第二份、第三份并列主 prompt

因此这份合同的额外强规则是：

- 新 prompt 只允许有一个主合同
- 旧 prompt 全部降级为历史参考
- 如果某轮发现 `Top 1` 不清楚，先停在判断，不要平均推进

## 可直接复制给 Goal Mode 的新版提示词

```text
你现在在 /Users/zon/Desktop/LATINOS。

这是一个长期主题母仓，不是临时实验目录。

之前的 goal 目标已经暂停。现在开始，你只以这份新合同作为唯一目标执行，不再混用任何旧 prompt。

你的最终目标不是只做一个页面，而是逐步把 LATINOS 推进到这个状态：

1. 样式尽量贴近 /Users/zon/Downloads/latin-workbench (2).html 的参考气质和结构节奏
2. 内容尽量 grounded 到飞书和本地真实拉丁材料
3. 架构保持长期可维护：
   - Next.js App Router
   - React
   - TypeScript
   - 组件化
   - 数据与组件分离
4. 新 frontdoor、独立 demo、旧站 proof 可以清晰并行
5. 每轮都必须有用户可见结果、真实验证、截图证据、analysis / memory 同步

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
18. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-11-frontdoor-dance-os-independent-demo-entry-pass.md
19. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-core-routes-current-complete-audit.md
20. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-11-latinos-goal-mode-priority-reorder-contract.md

## 当前真实阶段

- Phase 1 已完成
- Phase 2 已完成
- Phase 3 进行中

当前不要再把任务理解成“继续补基础 frontdoor 页面”。

当前主线已经进入：

- Dance OS Demo 已有独立可运行壳
- witness archive / queue / return trigger 第一版都已完成
- 第一刀 shared assets 已完成
- /dance-os 对独立 demo 的入口映射第一刀已完成
- 当前最小产品链已经成立：
  - archive -> queue -> return trigger

## 当前默认主线

- /Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo

## 当前优先级

### Priority 0

先校准文档、memory、代码现状和当前阶段事实。

### Priority 1

如果前一轮已有 accepted change 但 analysis / memory / 主合同未同步，先补同步。

### Priority 2

继续只服务 Dance OS Demo 主线，不要平均推进所有页面。

### Priority 3

当前默认新的 Top 1 先判断：首页是否需要增加一个更直接、更明确的独立 Dance OS Demo 承接入口。

通过条件：

- 首页出现更明确的 demo 承接
- 不破坏样式节奏
- 保持桌面和移动端可用
- frontdoor 验证链通过
- 有桌面和移动端截图

### Priority 4

如果检查后发现首页当前不该回切，再把新的 Top 1 改成：继续在 archive / queue / return trigger 之间抽第二刀最小 shared assets。

### Priority 5

只有 demo 推进暴露出入口问题、口径落后或响应式回归时，才回切 frontdoor。

### Priority 6

preview / deploy / 域名最后处理，不要提前跳过去。

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
6. 做真实交互 smoke，至少验证：
   - 状态切换
   - profile / focus 切换
   - 输出句变化
   - 保存 witness
   - queue / return 动作
7. 补桌面截图
8. 补移动截图

## Stop Doing

- 不要再重开技术选型
- 不要平均推进 frontdoor 所有页面
- 不要同时推进两个 demo
- 不要只做状态汇报
- 不要提前做生产部署或域名切换
- 不要新增第二份并列主合同

## 本轮执行方式

现在先完成以下动作，再进入实现：

1. 完成启动必读
2. 用一句话写出当前唯一 Top 1
3. 写清本轮目标、通过条件、不做什么
4. 只推进这一个 Top 1
5. 完成真实验证、截图、analysis、memory 同步
6. 再决定下一轮 Top 1
```

## 当前推荐

如果你现在就要把 prompt 发给 goal mode，优先发上面这份，不要再发旧的 [2026-07-10-latinos-goal-mode-priority-reset-prompt.md](/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-latinos-goal-mode-priority-reset-prompt.md)。

旧文档现在应视为：

- 历史阶段合同
- 仍可参考
- 不再作为唯一最新主合同
