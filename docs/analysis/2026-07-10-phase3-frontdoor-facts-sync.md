# Phase 3 Frontdoor Facts Sync

## 背景

在 `/about` 完成一轮 `Phase 2` visible pass 之后，前台真正的剩余问题已经不是页面没收完，而是：

- `/dashboard`
- `/roadmap`
- `goal mode` 主 prompt

还停在“`/about` 待完成 / `Phase 2` 仍在进行中”的旧口径。

这会带来一个结构性风险：

- 页面已经进入下一阶段
- 但状态页、路线页和主合同仍在指向旧阶段
- 后续 agent 很容易再次被带回错误的 `Top 1`

## 这轮真正要解决的问题

这轮真正的问题不是继续补页面，而是：

**把 dashboard、roadmap 和主 prompt 的阶段事实同步到当前真实状态：Phase 2 已完成，Phase 3 现在开始。**

## 已改动文件

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dashboard/page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dashboard/page.tsx)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/dashboard.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/dashboard.ts)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/app/roadmap/page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/roadmap/page.tsx)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/roadmap.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/roadmap.ts)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/route-smoke.mjs](/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/route-smoke.mjs)
- [/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-latinos-goal-mode-priority-reset-prompt.md](/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-latinos-goal-mode-priority-reset-prompt.md)

## 这轮改动

### 1. `/dashboard` 切到 `Phase 3`

主改动：

- 页头标题改成：
  - `辅助承接层已收齐，接下来先定义两个 demo`
- pill 改成：
  - `当前阶段：Phase 3 · demo definition`
- `dashboardRows`
- `dashboardStageMetrics`
- `dashboardStageSignals`
- `dashboardMetrics`
- `dashboardOpsCards`
- `dashboardDecisionSignals`
- `dashboardRouteSignals`

都同步到：

- `Phase 2` 已完成
- `Phase 3` 当前开始
- 当前主线不再是补辅助页
- 当前主线是定义两个 demo 的边界、目录和入口

### 2. `/roadmap` 切到 `Phase 3`

主改动：

- 页头标题改成：
  - `先定义两个 demo，再决定 preview 与域名`
- pill 改成：
  - `当前阶段：Phase 3 · demo definition`
- `roadmapLead`
- `roadmapStageMetrics`
- `roadmapStageSignals`
- `roadmapDeliverables`

都同步到：

- 辅助承接层已收齐
- 当前不再是“继续收口”
- 当前是：
  - 先定义两个 demo
  - 再选一个 Top 1 demo
  - 再进入共享资产 / preview / 域名判断

### 3. 同步验证合同与主 prompt

主改动：

- `route-smoke` 里的 `/dashboard` 与 `/roadmap` 标题断言同步更新
- `goal mode` 主 prompt 改到：
  - `Phase 2 completed`
  - `Phase 3 in progress`

结果：

- 页面事实
- 验证脚本
- 主合同

三者重新一致。

## 当前证据

### 新截图

目录：

- `/tmp/latinos-phase3-dashboard-sync-2026-07-10`
- `/tmp/latinos-phase3-roadmap-sync-2026-07-10`

文件：

- `dashboard-desktop.png`
- `dashboard-mobile.png`
- `roadmap-desktop.png`
- `roadmap-mobile.png`

### 当前 fresh-prod 验证

本轮在 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 已串行通过：

- `pnpm typecheck`
- `CI=1 pnpm build`
- fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

## 结论

这轮后，frontdoor 的关键阶段事实已经同步为：

- `Phase 1 completed`
- `Phase 2 completed`
- `Phase 3 in progress`

当前真正的下一步不再是继续改辅助页，而是进入两个 demo 的定义与孵化。
