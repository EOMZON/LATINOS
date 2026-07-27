# About Phase 2 Visible Pass

## 背景

在 `/legacy`、`/tools`、`/roadmap`、`/dashboard` 都已经完成一轮 `Phase 2` visible pass 之后，`/about` 成为当前最明显的剩余缺口。

原因不是它没内容，而是：

1. 它原来更像理念说明页
2. 首屏缺少当前阶段判断层
3. 缺少像其他 `Phase 2` 页面那样的 proof strip 与 bridge 入口
4. 还没有被收成“当前承接页”，更像“项目宣言页”

## 这轮真正要解决的问题

这轮不是再解释这条线的愿景，而是：

**把 `/about` 从“身份说明页”推进成和 `legacy / tools / roadmap / dashboard` 同一语言的前台承接页，让它讲清 identity、proof 和 product boundary，并直接把用户送回下一条真实入口。**

## 关键约束

- 不回到平均推进
- 当前只服务 `/about` 这个 `Top 1`
- 不改旧站生产入口
- 不重新讨论技术栈
- 继续保持：
  - `Next.js App Router`
  - `React`
  - `TypeScript`
  - route-scoped data
  - 组件与数据分离

## 这轮改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/app/about/page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/about/page.tsx)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/about.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/about.ts)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

### 1. 给 `/about` 补真正的首屏判断层

新增：

- `aboutLead`
- `compact-detail-about-top`
- `RouteStagePanel`
- `about-proof-strip`

首屏现在先讲清：

- 当前阶段
- 这条线真正同时服务什么
- 为什么旧站要保留
- 为什么 demo 还在下一阶段

结果：

- `/about` 不再一上来就是身份说明
- 而是先成立为当前 frontdoor 的身份判断层

### 2. 把“从身份继续今天”做成真实 bridge

新增：

- `aboutBridgeCards`
- “从这条线身份继续今天”区块

桥接到：

- `/legacy`
- `/daily-latin`
- `/dance-os`

结果：

- 这页不再停在理解愿景
- 它开始承担 route-to-route 承接职责

### 3. 把内容从“理念页”改成“执行判断页”

更新：

- `aboutIdentityRows`
- `aboutStageMetrics`
- `aboutStageSignals`
- `aboutRouteLeft`
- `aboutRouteRight`
- `aboutDecisionCard`

结果：

- 这页更明确地讲：
  - 现在是什么
  - 现在不是什么
  - 当前为什么还不能跳阶段
  - 这条线最后要同时成立哪三层

### 4. 补 route-scoped responsive 样式

新增：

- `.about-intro-lead`
- `.compact-detail-about-top`
- `.about-proof-stage`
- `.about-proof-strip`
- `.about-bridge-grid`

并补 `@media (max-width:860px)` 下的 about 专属 mobile 规则。

结果：

- 桌面端首屏成立为完整判断层
- 手机端 proof strip 和 bridge 区都改成单列可读
- 没有引入新的横向溢出

## 当前证据

### 新截图

目录：

- `/tmp/latinos-phase2-about-visible-pass-2026-07-10`

文件：

- `about-desktop.png`
- `about-mobile.png`

### 视觉判断

桌面端：

- 首屏已经先成立为 identity / proof / next gate 判断层
- bridge 区让这页可以直接把用户送回 legacy、Daily、Dance
- 后面的三条主线、公开渠道和最后判断都继续服务当前执行逻辑

移动端：

- 首屏改成单列后仍然可读
- actions、bridge 和 long-form cards 都没有断裂
- 页面虽然信息较多，但不再像说明文档页，而是更像完整承接页

## 验证

本轮在 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 已串行通过：

- `pnpm typecheck`
- `CI=1 pnpm build`
- fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

补充事实：

- `/about` 标题仍保持：
  - `这不是只做一个网站，而是在搭 Latin Dance OS`
- `structure-smoke` 继续确认：
  - `当前公开渠道`
  区块仍然存在

## 结论

这一轮后，`/about` 已从：

- “身份说明页 / 理念页”

推进到：

- “identity / proof / product boundary 的前台承接页”

它已经明显更符合当前 `Phase 2` 的职责，而不是孤立的项目介绍页。

## 下一步

当前更合理的顺序是：

1. 把 `/dashboard` 与 `/about` 的文档闭环补齐
2. 重新检查辅助承接层页面事实是否已经足够进入 `Phase 2 complete`
3. 只有当整层事实一致后，才进入两个 demo 的定义与孵化
