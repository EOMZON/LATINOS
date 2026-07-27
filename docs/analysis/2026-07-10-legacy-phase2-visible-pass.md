# Legacy Phase 2 Visible Pass

## 背景

到今天这一轮开始前，核心三页：

- `/`
- `/daily-latin`
- `/dance-os`

已经完成 `Phase 1` 可见收口。

因此当前主线不该继续平均回切核心页，而应该进入：

- `Phase 2：辅助承接页对齐`

结合现有辅助页截图，`/legacy` 是这一阶段最合适的 `Top 1`，因为：

1. 用户长期强调旧站 proof 不能丢
2. 旧站策略已经明确是：
   - `保留`
   - `映射`
   - `并行`
3. `/legacy` 当前战略位置比一般说明页更高
4. 它之前更像“整理说明页”，还不像“旧 proof 入口页”

## 这一轮真正要解决的问题

这轮不是补文档，也不是继续做细碎压缩。

这轮真正的问题是：

**让 `/legacy` 首屏更像一个可直接进入、可直接理解、可直接继续往下走的 legacy proof 入口，而不是一个左侧空占位、整体偏说明化的映射页。**

## 关键约束

- 不改核心三页主结构
- 不动旧站生产入口
- 不重新讨论技术栈
- 继续保持：
  - `Next.js App Router`
  - `React`
  - `TypeScript`
- 继续保持：
  - `Feishu` 为唯一 source of truth
  - `Notion` 仅视为旧提法

## 这轮改动

### 1. 把 legacy 首屏左侧从空块改成真实 proof 面板

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/app/legacy/page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/legacy/page.tsx)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/legacy.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/legacy.ts)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

主改动：

- 新增 `legacyLead`
- 新增 `legacyStageMetrics`
- 新增 `legacyStageSignals`
- 在 `DetailPanel` 左侧接入 `RouteStagePanel`
- 额外增加：
  - `旧站 promise`
  - `service promise`
  - `system description`
  三条 proof chip

结果：

- 首屏不再像空占位
- 用户进入这页时，能直接看到：
  - 旧站已经验证了什么
  - 为什么不推倒
  - 它和新体系怎么接

### 2. 把“继续往哪走”前置成真实入口层

主改动：

- `DetailPanel` 右侧 actions 从单一“打开旧站”扩成：
  - `打开旧站`
  - `继续 Daily Latin`
  - `继续 Dance OS`
- 新增 `legacyBridgeCards`
- 新增“从旧 proof 继续今天”区块
- 复用现有 `HomeModuleCard`，保持组件化和风格一致

结果：

- `/legacy` 不再停在“回顾旧站”
- 它开始承担真正的承接职责：
  - 回旧站
  - 回新首页
  - 继续 Daily
  - 继续 Dance

### 3. 补 route-scoped responsive 样式

主改动：

- 新增：
  - `.legacy-intro-lead`
  - `.compact-detail-legacy-top`
  - `.legacy-proof-stage`
  - `.legacy-proof-strip`
  - `.legacy-bridge-grid`
- 新增 `@media (max-width:860px)` 下的 legacy 专属首屏与 bridge 样式

结果：

- 桌面端首屏更饱满
- 手机端首屏改为单列后仍可读
- 新增 bridge 区在手机端不会横向溢出

## 当前证据

### 新截图

目录：

- `/tmp/latinos-phase2-legacy-visible-pass-2026-07-10`

文件：

- `legacy-desktop.png`
- `legacy-mobile.png`

### 视觉判断

桌面端：

- 首屏左侧已成立为 proof 面板，而不是空块
- actions 区从单入口变成实际承接入口
- 新的 bridge 区使整页更像 legacy frontdoor

移动端：

- proof 面板与承接按钮都能顺序读完
- bridge 卡片改成单列，入口关系更清楚
- 没有出现新的横向溢出

## 验证

本轮在 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 已串行通过：

- `pnpm typecheck`
- `CI=1 pnpm build`
- fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

补充环境事实：

- 验证时一度遇到 `3200` 端口被旧 `next-server` 占用
- 已先清理旧进程，再完成 fresh-prod 启动

## 结论

这一轮后，`/legacy` 已从：

- “能看懂但像说明页”

推进到：

- “能直接作为旧 proof 承接入口被评判”

它还不是整站最终完成态，但已经明显更符合 `Phase 2` 的职责。

## 下一步

当前更合理的顺序是：

1. 保持 `/legacy` 这轮结果作为 `Phase 2` 已验收样板
2. 再对：
   - `/tools`
   - `/roadmap`
   - `/dashboard`
   - `/about`
   做快速并排复核
3. 选出下一个 `Phase 2 Top 1`
4. 继续遵守：
   - 每轮只做一个 `Top 1`
   - 每轮都补 fresh-prod 验证和截图证据
