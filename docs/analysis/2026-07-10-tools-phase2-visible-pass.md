# Tools Phase 2 Visible Pass

## 背景

在 `/legacy` 完成一轮 `Phase 2` visible pass 之后，当前辅助承接页候选还包括：

- `/tools`
- `/roadmap`
- `/dashboard`
- `/about`

这轮重新看了现有桌面端和移动端截图后，`/tools` 成为新的 `Top 1`，原因不是它最差，而是：

1. 它信息已经足够真实
2. 但当前更像规则清单页
3. 还不像一个“source of truth / guardrails / next path”的前台承接入口
4. 和已经收过的 `/legacy` 相比，它还缺少更强的首屏判断层与承接层

## 这轮真正要解决的问题

这轮不是补更多规则，也不是继续堆信息。

这轮真正的问题是：

**让 `/tools` 从“规则文档页”推进成“先说清内容真相、入口判断、部署护栏，再引导去下一页”的前台入口。**

## 关键约束

- 不回到平均推进
- 当前只服务一个 `Top 1`
- 不改核心三页主结构
- 不改旧站生产入口
- 继续保持：
  - `Next.js App Router`
  - `React`
  - `TypeScript`
  - route-scoped data
  - 组件与数据分离

## 这轮改动

### 1. 给 `/tools` 补真正的首屏判断层

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/app/tools/page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/tools/page.tsx)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/tools.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/tools.ts)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

主改动：

- 新增 `toolLead`
- 新增 `toolStageMetrics`
- 新增 `toolStageSignals`
- 新增 `DetailPanel + RouteStagePanel`
- 在首屏左侧加入：
  - source / rule / decision snapshot
- 在首屏下方加入：
  - `Feishu first`
  - `保留 / 映射 / 并行`
  - `preview before production`
  三条 proof chip

结果：

- 页面一进来不再只是“飞书来源列表”
- 用户先看到：
  - 真相从哪来
  - 规则为什么存在
  - 当前为什么不能直接切生产

### 2. 把“从规则继续今天”做成前置入口

主改动：

- 新增 `toolBridgeCards`
- 新增“从规则继续今天”区块
- 复用 `HomeModuleCard`
- 把承接入口前置到：
  - `/legacy`
  - `/roadmap`
  - `/dashboard`

结果：

- `/tools` 不再停在“看完规则就结束”
- 它开始承担真正的承接职责：
  - 先回旧 proof
  - 先看 gate
  - 先看验证状态

### 3. 用 route-scoped 样式把 `/tools` 收成独立前台页

主改动：

- 新增：
  - `.tools-intro-lead`
  - `.compact-detail-tools-top`
  - `.tools-proof-stage`
  - `.tools-proof-strip`
  - `.tools-bridge-grid`
- 新增 `@media (max-width:860px)` 下的 `/tools` 专属 mobile 样式

结果：

- 桌面端首屏更像 frontdoor 子页
- 手机端 proof strip 与 bridge 区都改成更清楚的单列阅读顺序
- 没有引入新的横向溢出

## 当前证据

### 新截图

目录：

- `/tmp/latinos-phase2-tools-visible-pass-2026-07-10`

文件：

- `tools-desktop.png`
- `tools-mobile.png`

### 视觉判断

桌面端：

- 首屏从“来源表”升级成“判断层 + 入口层”
- bridge 区使这页开始承担 route-to-route 承接职责
- 页面完成态明显比之前更像系统入口

移动端：

- 首屏先讲清楚规则为什么存在
- actions 与 bridge 都能直接读完
- 规则和 stop-doing 区没有出现新的碎裂

## 验证

本轮在 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 已串行通过：

- `pnpm typecheck`
- `CI=1 pnpm build`
- fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

## 结论

这一轮后，`/tools` 已从：

- “规则清单页”

推进到：

- “source / guardrail / next path 的前台承接页”

它还可以继续收，但已经明显更符合 `Phase 2` 的职责，而不是单纯工程说明页。

## 下一步

当前更合理的顺序是：

1. 把 `/tools` 和 `/legacy` 作为当前 `Phase 2` 已通过的样板页
2. 再对：
   - `/roadmap`
   - `/dashboard`
   - `/about`
   做并排复核
3. 选出新的单一 `Top 1`
4. 继续保持：
   - 每轮只做一页
   - 每轮都补串行验证与截图证据
