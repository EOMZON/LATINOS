# `/daily-latin` Phase 1 Visible Pass v3

## 背景

在首页 `/` 已有 `visible pass v3`、`/dance-os` 已完成 `visible pass v3` 之后，当前更合理的 `Top 1` 切回了：

- `/daily-latin`

原因不在于它坏掉，而在于它仍然最容易被感知为：

- 首屏先像说明页，再像入口页
- `本页依据` 太早出现，压住“今天先开始什么”
- 手机端虽然已经可读，但顶部仍然更像“结构很多的一页”

所以这一轮不是继续压缩一个卡片，而是做一轮更明确的**结构级前台收口**。

## 这轮改了什么

主改文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/app/daily-latin/page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/daily-latin/page.tsx)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

### 1. 顶部 anchor tab 重新对齐真实首屏

之前 `/daily-latin` 的顶部 anchor tab 默认高亮是：

- `依据`

但页面真正先出现的是：

- `daily overview`

这会让入口感和当前浏览位置不一致。

这轮把顶部 tab 改成：

- `总览`
- `状态`
- `Demo`
- `回流`
- `依据`
- `动作库`

并把默认 active 切到：

- `总览`

这轮的意义不是字面修改，而是让这页的入口顺序更像真实 frontdoor。

### 2. 把 `本页依据` 从首屏右侧拿下来

之前页面最顶部是：

- 左边 `Daily Latin Demo`
- 右边 `本页依据`

这会让 `/daily-latin` 一开始就更像：

- 一页带说明的系统板

而不是：

- 今天先进入这一轮的入口页

这轮改成：

1. 首屏只保留 `daily-overview`
2. `入口状态 / Daily Loop`
3. `Today Loop Demo`
4. `Live Return / Legacy Principles`
5. 再到 `本页依据`
6. 最后 `Daily Latin 动作库`

也就是说：

- 先让用户看懂今天怎么开始
- 再把依据放到承接位置

这一步让 `/daily-latin` 的信息架构更接近首页 `/` 和 `/dance-os` 的前台节奏。

### 3. `本页依据` 从 side-style 恢复成独立下段 evidence section

因为它不再位于顶部右侧，这轮把 `SourceMatrix` 从：

- `compact-source-matrix-daily-side`

切回：

- `compact-source-matrix-daily`

并在 route-specific CSS 里给它新的 lower-section 样式：

- 更完整的 panel padding
- 更清楚的 source rows
- 桌面 2 列、移动单列
- 不再像首屏边栏附注

这样它既继续保留：

- 飞书主线
- 旧站起步原则
- 当前入口原则

又不再抢首页入口职责。

## 这轮用户可见结果

这轮最明显的变化不是组件数量，而是阅读顺序。

### 桌面端

现在 `/daily-latin` 的桌面首屏更像：

1. 先看总览
2. 再看入口状态和 loop
3. 再进入 demo

而不是一开始就被“依据板”分掉注意力。

### 手机端

手机端的提升更明显：

- 首屏不再在最前面堆一个依据区
- 顶部一路变成：
  - 总览
  - 入口状态
  - Daily Loop
  - Demo

这让页面更像：

- 先进入今天这一轮

而不是：

- 先读一堆解释

## fresh-prod 验证

本轮最终串行通过：

- `pnpm typecheck`
- `CI=1 pnpm build`
- `pkill -f "next start --hostname 127.0.0.1 --port 3200" || true`
- fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

额外记录：

- 这轮一开始把 `typecheck` 和 `build` 并行跑时，出现过一次 `.next/types` 的瞬时文件缺失
- 这是并发碰 `.next` 的验证噪音，不是代码逻辑错误
- 改回串行后完全通过

## fresh 截图证据

本轮新证据目录：

- `/tmp/latinos-phase1-2026-07-10-daily-v3`

核心截图：

- `/tmp/latinos-phase1-2026-07-10-daily-v3/daily-desktop.png`
- `/tmp/latinos-phase1-2026-07-10-daily-v3/daily-mobile.png`
- `/tmp/latinos-phase1-2026-07-10-daily-v3/home-desktop.png`
- `/tmp/latinos-phase1-2026-07-10-daily-v3/dance-desktop.png`

## 当前判断

这轮之后，`/daily-latin` 可以成立为：

- `Phase 1 / visible pass v3`

原因是：

- 首屏职责更清晰
- 依据区不再抢入口职责
- 桌面端和手机端都更像前台入口页
- 页面信息结构更接近首页 `/` 与 `/dance-os`

## 当前更合理的下一步

这一轮之后，核心三页状态变成：

- 首页 `/`：`visible pass v3`
- `/daily-latin`：`visible pass v3`
- `/dance-os`：`visible pass v3`

所以当前更合理的下一步不再是立刻继续单页收口，而是：

1. 对 `/`、`/daily-latin`、`/dance-os` 做一次明确的并排验收
2. 判断 `Phase 1` 是否已经具备退出条件
3. 只有并排证据证明三页都已达到“用户可直接评判的完成态”后，才允许进入辅助页
