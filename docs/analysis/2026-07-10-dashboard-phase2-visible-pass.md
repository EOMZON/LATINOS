# Dashboard Phase 2 Visible Pass

## 背景

在 `/legacy`、`/tools`、`/roadmap` 都完成一轮 `Phase 2` visible pass 之后，`/dashboard` 的职责不该继续停留在旧的压缩实验记录，而应该变成：

- 当前阶段说清楚
- 已有 proof 说清楚
- 下一道 gate 说清楚

这页的价值不是“再多一个状态页”，而是把：

- core pages 已完成
- auxiliary alignment 正在收尾
- two demos 还在后面

压成一个用户能直接看懂的前台判断层。

## 这轮真正要解决的问题

这轮真正的问题不是再补一块 metric，而是：

**让 `/dashboard` 从“旧 compact status page”推进成“当前真实阶段、proof / risk / gate 与 route-level map 都说清楚的前台承接页”。**

## 关键约束

- 不回到平均推进
- 不重新讨论技术栈
- 继续保持：
  - `Next.js App Router`
  - `React`
  - `TypeScript`
  - route-scoped data
  - 组件与数据分离
- 不提前跳到 deploy / 域名切换

## 已应用改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dashboard/page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dashboard/page.tsx)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/dashboard.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/dashboard.ts)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/route-smoke.mjs](/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/route-smoke.mjs)

主改动：

### 1. 把页头口径改成当前真实阶段

- title 改为：
  - `先看当前阶段，不急着看流量`
- 首屏新增：
  - `dashboardLead`
  - `DetailPanel + RouteStagePanel`
  - proof strip

结果：

- 这页一进来不再像旧工程状态页
- 用户先看到：
  - 当前进行到哪
  - 当前为什么还不能跳到 demo / deploy
  - 现在哪些事情已经被证明

### 2. 把旧的 stale state 改成当前真实内容

- `dashboardRows`
- `dashboardStageMetrics`
- `dashboardStageSignals`
- `dashboardDecisionSignals`
- `dashboardRouteSignals`
- `dashboardOpsCards`

都已回到当前 `Phase 2` 真实状态。

结果：

- 不再沿用旧的 compaction-era 语境
- 页面开始成立为：
  - proof
  - risk
  - gate
  - route map
  四层同步存在的承接页

### 3. 用 route-scoped 样式把首屏与 mobile 收口

新增：

- `.dashboard-intro-lead`
- `.compact-detail-dashboard-top`
- `.dashboard-proof-stage`
- `.dashboard-proof-strip`
- `.compact-route-stage-dashboard`

结果：

- 桌面端首屏成立为判断层，而不是零散数据块
- 手机端 proof strip 与 stage panel 都能改回单列可读

### 4. 同步验证合同

- `/dashboard` 的 route-smoke 标题断言已同步到当前真实标题

结果：

- 页面事实与验证脚本不再脱节

## 当前证据

### 页面状态证据

当前文件状态已显示：

- 页头为 `先看当前阶段，不急着看流量`
- proof strip 已存在
- `Proof / Risk / Gate`
- `Route Map`
- `Witness Archive`
- `当前运维判断`

都已经组成当前承接层。

### 截图证据

目录：

- `/tmp/latinos-phase2-dashboard-visible-pass-2026-07-10`

文件：

- `dashboard-desktop.png`
- `dashboard-mobile.png`

### 当前验证证据

当前批次在 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 已再次通过：

- `pnpm typecheck`
- `CI=1 pnpm build`
- fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

补充事实：

- 当前这次验证不是为了再次改 `/dashboard` 代码
- 而是为了确认 `/about` 推进后，`/dashboard` 这一页仍然和整站真实状态、脚本与 frontdoor 主线一致

## 结论

`/dashboard` 这一轮已经从：

- “旧状态页 / 压缩页”

推进到：

- “当前阶段、proof / risk / gate 与 route-level map 的前台承接页”

它已经可以作为当前 `Phase 2` 样板页之一成立。

## 下一步

更合理的下一步是：

1. 完成 `/about` visible pass 的落盘
2. 再判断 `dashboard` 与 `/about` 的事实口径是否需要同步到 `Phase 2 complete`
3. 只有在辅助承接层整体成立后，才进入两个 demo 的定义与孵化
