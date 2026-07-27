# Roadmap Phase 2 Visible Pass

## 背景

在 `/legacy` 与 `/tools` 都完成一轮 `Phase 2` visible pass 之后，剩余的辅助承接页主要是：

- `/roadmap`
- `/dashboard`
- `/about`

这轮重新做并排复核后，`/roadmap` 成为新的 `Top 1`，原因不是它最空，而是：

1. 它最容易把用户带回过期判断
2. 页面上仍然写着：
   - `Phase 1.5+`
   - “接下来做 demo”
3. 但当前真实工程状态已经进入：
   - `Phase 2：辅助承接页对齐`
4. 所以它会在“路线”这件事上直接给用户错误时间点

## 这轮真正要解决的问题

这轮不是继续补路线图内容，而是：

**把 `/roadmap` 从“旧计划口径页”推进成“当前真实阶段、下一阶段和域名门槛都被说清”的前台路线入口。**

## 关键约束

- 不平均推进剩余辅助页
- 当前只服务 `/roadmap` 这一页
- 不回退到旧的阶段判断
- 不改旧站生产入口
- 继续保持：
  - `Next.js App Router`
  - `React`
  - `TypeScript`
  - route-scoped data
  - 组件与数据分离

## 这轮改动

### 1. 把阶段判断改成当前真实状态

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/roadmap.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/roadmap.ts)

主改动：

- 新增 `roadmapLead`
- 新增 `roadmapStageMetrics`
- 新增 `roadmapStageSignals`
- 重写 `roadmapPhases`
- 把阶段改成：
  - `Phase 1 · 已完成`
  - `Phase 2 · 当前`
  - `Phase 3 · 下一步`
  - `Phase 4 · 再决定`
- 重写 `roadmapDeliverables`

结果：

- `/roadmap` 不再讲过期的 `Phase 1.5+`
- 用户能直接看到：
  - 核心三页已完成
  - 当前主线是辅助承接页对齐
  - 下一阶段才是两个 demo 独立长出来
  - 域名映射仍然是最后判断

### 2. 给 `/roadmap` 补首屏判断层

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/app/roadmap/page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/roadmap/page.tsx)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

主改动：

- 新增：
  - `DetailPanel`
  - `RouteStagePanel`
- 首屏改成：
  - 当前阶段
  - 当前规则
  - 域名策略
  的统一判断层
- 新增 proof chip：
  - `Phase 2 · aux routes`
  - `one Top 1 at a time`
  - `preview before production`

结果：

- 这页不再从时间线直接开始
- 先让用户知道现在真正执行到哪、为什么不能跳阶段

### 3. 把“按路线继续今天”做成入口层

主改动：

- 新增 `roadmapBridgeCards`
- 新增“按路线继续今天”区块
- 复用 `HomeModuleCard`
- 把承接入口前置到：
  - `/tools`
  - `/dashboard`
  - `/about`

结果：

- `/roadmap` 不再停在“看完计划”
- 它开始承担真正的 route-to-route 承接职责

### 4. 补验证合同里的标题断言

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/route-smoke.mjs](/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/route-smoke.mjs)

主改动：

- 把 `/roadmap` 的预期标题从旧标题更新到当前真实标题

结果：

- 验证脚本重新和页面事实一致
- 避免出现“页面正确但 smoke 仍盯旧文案”的假失败

## 当前证据

### 新截图

目录：

- `/tmp/latinos-phase2-roadmap-visible-pass-2026-07-10`

文件：

- `roadmap-desktop.png`
- `roadmap-mobile.png`

### 视觉判断

桌面端：

- 首屏已经先成立为阶段判断层
- “按路线继续今天”让这页更像承接页，而不是静态计划页
- phases / deliverables / gate 的顺序更符合当前真实推进顺序

移动端：

- 首屏先把当前阶段讲清楚
- `Phase 2` 的位置和“one Top 1 at a time”规则更直接
- 后面的时间线和交付卡不再和当前状态冲突

## 验证

本轮在 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 已串行通过：

- `pnpm typecheck`
- `CI=1 pnpm build`
- fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

补充事实：

- 本轮 `route-smoke` 初次失败不是页面崩了
- 原因是脚本仍断言旧 `/roadmap` 标题
- 同步脚本后，完整验证链已通过

## 结论

这一轮后，`/roadmap` 已从：

- “旧路线口径页”

推进到：

- “当前真实阶段与下一阶段的前台路线入口”

它现在更符合 `Phase 2` 承接页职责，也更能支撑后续 demo 和域名判断顺序。

## 下一步

当前更合理的顺序是：

1. 把 `/legacy`、`/tools`、`/roadmap` 作为当前 `Phase 2` 已收口样板
2. 再只在：
   - `/dashboard`
   - `/about`
   之间选一个新的 `Top 1`
3. 继续保持：
   - 每轮只推进一页
   - 每轮都补串行验证和截图证据
