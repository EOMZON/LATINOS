# Phase 1 Core Routes Side-by-Side Audit

## 这份文档的目的

当前核心三页都已经推进到了：

- 首页 `/`：`visible pass v3`
- `/daily-latin`：`visible pass v3`
- `/dance-os`：`visible pass v3`

所以现在最重要的不是再盲目继续单页推进，而是做一次基于证据的并排验收，判断：

1. `Phase 1` 是否已经具备退出条件
2. 还是仍有一个明确 `Top 1` 需要继续收口

## 本轮使用的证据

### 参考锁定

- `/tmp/latinos-home-reference.png`

### 当前 fresh-prod 核心截图

- `/tmp/latinos-phase1-2026-07-10-daily-v4/home-desktop.png`
- `/tmp/latinos-phase1-2026-07-10-daily-v3/home-mobile.png`
- `/tmp/latinos-phase1-2026-07-10-daily-v4/daily-desktop.png`
- `/tmp/latinos-phase1-2026-07-10-daily-v4/daily-mobile.png`
- `/tmp/latinos-phase1-2026-07-10-daily-v3/dance-desktop.png`
- `/tmp/latinos-phase1-2026-07-10-v2/dance-mobile.png`

### 当前 fresh-prod 验证链

当前 `/Users/zon/Desktop/LATINOS/sites/frontdoor` fresh-prod 已通过：

- `pnpm typecheck`
- `CI=1 pnpm build`
- fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

## 当前定量证据

### 核心页移动端总高度

在 `390 x 844` 下当前测得：

- `/ = 2182`
- `/daily-latin = 4069`
- `/dance-os = 3898`

### `/daily-latin` 这一轮前后变化

`/daily-latin` 本轮移动端总高：

- 之前：`4616`
- 现在：`4069`

下降了：

- `547px`

这说明这轮不是纯文档记录，而是实际把移动端前台厚度明显压下来了。

### `/daily-latin` 当前主要 section 高度

`390 x 844` 下：

- `daily-overview = 480`
- `entry-states = 247`
- `daily-loop-overview = 236`
- `today-loop-demo = 1044`
- `live-return-bridge = 523`
- `legacy-daily-principles = 236`
- `daily-sources = 372`
- `daily-library = 317`

这也说明：

- 当前 `/daily-latin` 最大块已经不是说明区
- 反而是 `today-loop-demo` 这个真实交互区本身最厚

这比“说明块太厚”要更合理，因为这页本来就应该允许 demo 区承担主要体积。

## 并排判断

### 首页 `/`

当前判断：

- 最接近 frontdoor 首页职责
- hero / progress / workbench 入口层级已经清楚
- 与参考稿的“强 hero + 强入口层”关系已经比较成立

保留意见：

- 下半区 support modules 在手机端仍然偏细碎
- 但目前不构成一个必须继续作为 `Top 1` 的明显掉队问题

### `/daily-latin`

当前判断：

- 经过把 `本页依据` 后移、把状态卡与 loop 卡在手机端收成更紧凑 grid 之后
- 这页已经不再明显像“先读说明，再进入页面”
- 更像“先进入今天这一轮，再看依据”

保留意见：

- 仍然是核心三页里总高度最大的一页
- 但当前最厚部分是 `Today Loop Demo` 这种真实交互区，而不是说明性废厚度

这让它从“明显掉队页”变成了“内容本来就更完整的页”。

### `/dance-os`

当前判断：

- 桌面端当前最稳
- 页面主题聚焦，结构清楚
- 顶部 summary、模块库、correction、body map、来源链已经不再明显像未完成实验页

保留意见：

- 手机端模块库仍然相对小而密
- 但已经不像上一轮那样明显掉队

## 结论

### 当前是否还有一个明确 `Top 1`

基于这轮并排证据，当前结论是：

**没有一个仍然特别明显的“坏页”或“掉队页”。**

这和前几轮不同。

前几轮都还能相对清楚地说：

- 这轮首页最弱
- 这轮 `/daily-latin` 最弱
- 这轮 `/dance-os` 最弱

但现在更接近的状态是：

- 首页 `/` 已像前台首页
- `/daily-latin` 已像真实入口页
- `/dance-os` 已像聚焦 demo 页

### 这是否自动等于 `Phase 1 done`

还**不能自动**等于 `Phase 1 done`。

原因不是因为当前还有一个坏页，而是因为：

1. `Phase 1` 的退出条件是三页都达到“用户可直接评判的完成态”
2. 当前三页已经接近这个状态
3. 但“接近最终版 / 参考稿近似同款 / 用户可直接评判满意”这件事，本质上仍然带用户审美验收属性

也就是说：

- 从工程和当前视觉证据看，`Phase 1` 已经进入**退出候选状态**
- 但还没有拿到足够强的用户验收证据来把它写死成“已退出”

## 当前更合理的下一步

当前不建议：

- 继续盲目挑一个核心页做下一轮
- 也不建议直接平均推进辅助页

更合理的顺序是：

1. 把当前状态记为：
   - `Phase 1 exit candidate`
2. 保持核心三页 fresh-prod 可演示状态
3. 在用户实际看过这三页当前结果后，再决定：
   - 如果用户仍明确指出某一页差距最大，就继续单点回到 `Phase 1`
   - 如果用户认可这三页已经进入可直接评判的完成态，再进入 `Phase 2`

## 当前推荐判断

如果必须给一个当前最稳妥的系统判断：

- `Phase 1` 已经不再是“明显未完成”
- 但也还**不应在没有用户验收的情况下直接宣布退出**

所以最准确的状态是：

- `Phase 1 exit candidate, pending user-visible acceptance`
