# Frontdoor Daily Next Bridge Pass

## 这轮为什么选它

当前 active goal 明确要求：

- 先完成首页
- 再看 `/daily-latin`
- 再看 `/dance-os`
- 先把核心三页推进到用户可见完成态

在首页补完独立 `Dance OS Demo` 承接之后，下一页最合理的唯一 `Top 1` 是：

- `/daily-latin`

当前这页虽然已经有：

- overview
- entry states
- `Today Loop Demo`
- `Live Return / Clip Bridge / Archive Jump`
- sources
- move library

但页面级仍缺少一层**一眼就能看懂的“做完这一轮后从哪里继续”承接**。

也就是说：

- 页面内部已经有回流判断能力
- 但对用户来说，这个判断还主要埋在下方回流板里
- 还没有被抬升成页面级的下一步入口

因此，这轮的唯一 `Top 1` 是：

**给 `/daily-latin` 增加一个显式的 next bridge 区，把“继续留在 Daily / 回到直播回流 / 已说清卡点就桥接 Dance OS”做成可直接点击的页面级承接。**

## 本轮目标

让 `/daily-latin` 从“有功能块”推进到：

1. 页面级明确展示 3 个下一步去向
2. 顶部 anchor 能直接跳到这块
3. bridge 区保持和现有首页 / legacy / tools 的 card 语言一致
4. 不破坏已有 `Today Loop Demo`
5. 不破坏桌面与移动端可用性

## 实现

### 1. 新增 `dailyBridgeCards`

更新：

- [daily.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/daily.ts)

新增：

- `dailyBridgeCards`

包括 3 张真实去向卡：

1. `继续 Daily 这一轮`
2. `直播 / 切片 回到 Daily`
3. `已经能说清卡点，桥接 Dance OS`

每张卡都包含：

- 适合现在
- 下一步
- note
- 真实 href

### 2. 在页面主线里加入 next bridge 区

更新：

- [page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/daily-latin/page.tsx)

新增：

- `HomeModuleCard` 引入
- `dailyBridgeCards` 引入
- `#daily-next-bridge` section

位置：

- `Today Loop Demo` 之后
- `Live Return / Clip Bridge / Archive Jump` 之前

这样现在页面顺序变成：

1. 总览
2. 状态分流
3. `Today Loop Demo`
4. **做完这一轮后，从哪里继续**
5. 回流判断板
6. 旧站原则
7. 来源
8. 动作库

### 3. 顶部锚点导航补上“去向”

同样更新：

- [page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/daily-latin/page.tsx)

在顶部 `AnchorTabs` 中新增：

- `去向`

对应：

- `#daily-next-bridge`

这样新承接区不是“存在但没入口”。

### 4. 新增 bridge 样式

更新：

- [workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

新增：

- `daily-bridge-section`
- `daily-bridge-grid`

并补齐：

- 桌面端三列
- 移动端单列

## 用户可见结果

这轮后，`/daily-latin` 不再只是让用户看到：

- 入口状态
- demo
- 回流板

而是能更直接看到：

1. 如果还没做完今天这一轮，就继续留在 Daily
2. 如果是直播 / 切片带回来的，就回到 Daily 回流层
3. 如果已经能说清卡点，就桥接到 `Dance OS`

这使得页面从“内部逻辑成立”推进到了“页面级下一步已可见”。

## 验证

在 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 严格串行重新通过：

1. `pnpm typecheck`
2. `CI=1 pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

关键通过事实：

- `/`、`/daily-latin`、`/dance-os` 都仍然 `200`
- `daily loop demo interaction works`
- `dance correction ledger interaction works`
- `home next session queue updates from archive`
- mobile overflow 仍然通过：
  - `homeOverflow.scrollWidth = 390`
  - `homeOverflow.innerWidth = 390`
  - `dailyOverflow.scrollWidth = 390`
  - `dailyOverflow.innerWidth = 390`

## 截图证据

目录：

- `/tmp/latinos-frontdoor-daily-bridge-pass-2026-07-11`

关键截图：

- `/tmp/latinos-frontdoor-daily-bridge-pass-2026-07-11/daily-latin-desktop.png`
- `/tmp/latinos-frontdoor-daily-bridge-pass-2026-07-11/daily-latin-mobile.png`

补充说明：

- 第一次移动端截图抓得过快，停在 `Suspense` 恢复态
- 已改用等待：
  - `data-testid='daily-state-first-time'`
  再截图
- 最终证据以补拍后的移动端截图为准

## 对当前 goal 的意义

这轮仍然没有声称：

- 当前旧 goal 已全部完成

但它确实把核心三页里的第二页推进了一步：

- `/daily-latin`

而且推进方式符合当前 active goal 的顺序：

- 先首页
- 再 `/daily-latin`
- 再看 `/dance-os`

## 更合理的下一步

在当前 active goal 口径下，下一步更合理的是：

1. 审计 `/dance-os` 是否还存在类似“已经有内部逻辑，但页面级承接还不够直观”的缺口
2. 若存在，就只补那一刀

仍然不建议：

- 回到辅助页平均推进
- 提前做资产沉淀或部署
