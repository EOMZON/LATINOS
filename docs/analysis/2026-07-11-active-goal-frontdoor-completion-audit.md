# Active Goal Frontdoor Completion Audit

## 背景

当前 active goal 仍引用：

- `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-latinos-goal-mode-priority-reset-prompt.md`

这份旧合同的用户目标不是“继续平均推进所有东西”，而是：

1. 以这份合同作为唯一目标执行
2. 先完成首页、`/daily-latin`、`/dance-os` 的用户可见完成态
3. 再处理辅助页、资产沉淀和部署
4. 不再平均推进所有目标

本次审计只判断一件事：

**截至 `2026-07-11` 当前工作区状态，旧 active goal 所要求的 frontdoor 核心页完成态是否已经被真实证明。**

## 需求拆解

从 active goal 与旧合同可提取出 4 个需要当前证据证明的点：

1. 核心页 `/`、`/daily-latin`、`/dance-os` 已有用户可见完成态
2. 这些页面不是只有代码存在，而是能在真实 build 后正常访问
3. 这些页面在真实浏览器 smoke 下能完成核心交互与移动端基本适配
4. 当前阶段已经不再需要把默认 `Top 1` 放回 frontdoor 核心页

## 当前代码证据

### 首页 `/`

文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/page.tsx`

当前已可见的核心承接包括：

1. `HomeHero`
2. `Heatmap`
3. `NextSessionQueue`
4. `independent dance demo bridge`
5. 主模块与支持模块双层 rail

### `/daily-latin`

文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/daily-latin/page.tsx`

当前已可见的核心承接包括：

1. 页面级 `AnchorTabs`
2. `DailyLoopDemo`
3. 页面级 `daily-next-bridge`
4. `DailyReturnBoard`
5. source-backed sections
6. 动作库

### `/dance-os`

文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dance-os/page.tsx`

当前已可见的核心承接包括：

1. 页面级 `AnchorTabs`
2. `independent-demo-entry`
3. 页面级 `dance-next-bridge`
4. `CorrectionLedgerDemo`
5. `BodyMapPracticeQueue`
6. source-backed sections

## 当前运行证据

工作目录：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor`

### 串行验证结果

1. `pnpm typecheck`
   - 通过
2. `CI=1 pnpm build`
   - 通过
3. `pnpm exec next start --hostname 127.0.0.1 --port 3200`
   - 成功启动
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
   - 通过
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
   - 通过
6. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`
   - 通过

### route smoke 关键结果

已确认以下路由返回 `200` 且标题正确：

1. `/`
   - `先选今天的状态，把这一轮做完。`
2. `/daily-latin`
   - `把今天这一轮压成最小入口`
3. `/dance-os`
   - `从练习过程里长出工具，不从空白产品名开始`

同时辅助页：

1. `/legacy`
2. `/tools`
3. `/roadmap`
4. `/dashboard`
5. `/about`

也都返回 `200`。

### browser smoke 关键结果

桌面端已确认：

1. `home hero visible`
2. `dance-os route renders`
3. `dance correction ledger interaction works`
4. `dance sources anchor works`
5. `daily loop demo interaction works`
6. `home next session queue updates from archive`

移动端已确认：

1. `mobile shell switches correctly`
2. 首页：
   - `scrollWidth = 390`
   - `innerWidth = 390`
3. `daily-latin`：
   - `scrollWidth = 390`
   - `innerWidth = 390`

这说明至少首页与 `daily-latin` 当前没有移动端横向溢出。

### structure smoke 关键结果

结构 smoke 已确认：

1. `dance anchors`
2. `dance correction ledger demo`
3. `dance body map practice queue`
4. `daily sections`
5. `daily loop demo`
6. `source-backed route sections`
7. `home phase hero`
8. `home core workbench`
9. `home next session queue`

## 对旧 active goal 的判断

### Requirement 1

核心页 `/`、`/daily-latin`、`/dance-os` 已有用户可见完成态。

结论：

- 已证明

原因：

- 三个页面都已有完整页面结构、真实内容承接和页面级 bridge / demo / source sections

### Requirement 2

这些页面在真实 build 后可访问，而不是只存在于本地未验证代码。

结论：

- 已证明

原因：

- `typecheck`、`build`、`next start`、`route smoke` 全部通过

### Requirement 3

这些页面的关键交互与移动端基础适配已被真实 smoke 证明。

结论：

- 已证明

原因：

- `browser smoke` 和 `structure smoke` 已覆盖：
  - home
  - daily loop
  - dance correction ledger
  - mobile shell
  - overflow guardrails

### Requirement 4

当前默认主线不应再回到 frontdoor 核心页平均推进。

结论：

- 已证明

原因：

- 旧合同自己已经把 `Phase 1` 标记为完成
- 本次运行证据没有发现首页、`/daily-latin`、`/dance-os` 存在必须重新回切的明显缺口
- 当前更合理的主线继续是 `Dance OS Demo`

## 结论

截至 `2026-07-11` 当前工作区状态，旧 active goal 中“先完成首页、`/daily-latin`、`/dance-os` 的用户可见完成态，再处理辅助页、资产沉淀和部署”的前半段要求已经被当前代码与真实验证充分证明。

更具体地说：

1. frontdoor 核心三页已经完成
2. 辅助页当前也已可访问
3. 当前继续把默认 `Top 1` 放回 frontdoor 核心页，已经不再符合现状
4. 从 evidence 看，旧 active goal 已可以收口

## 下一步

如果要继续推进，不应再沿旧 active goal 兜圈。

下一步更合理的是：

1. 将 active goal 正式切换到当前新合同
2. 继续只服务 `Dance OS Demo`
3. 先收 grounded witness chain pass 的完整验收
