# Dashboard Proof Risk Gate Header Pass

## 背景

在 `Daily Latin` 的 compact label pass 成立之后，fresh `390px` broad mobile Top1 变成：

- `/dashboard = 2145`

因此这轮继续按 route-level ROI 收口，不扩散到别的 route，先重新拆 `/dashboard` 当前最厚 section。

## fresh 拆解

在 fresh `3200` 上重新测 `/dashboard` `390px` section 高度：

- `结构推进条 = 182.19`
- `下一批交付 = 185.03`
- `验证状态 = 124.97`
- `决策护栏 = 209.31`
- `Proof / Risk / Gate = 214.78`
- `Route Map = 207.44`
- `Witness Archive = 186.03`
- `当前运维判断 = 115.84`

这说明当前最厚 section 已经变成：

- `Proof / Risk / Gate = 214.78`

## 这轮做法

继续坚持最小 blast radius，不动 `DecisionCard` 内容本身，也不重排 grid，只做 very small route-level shell pass：

在：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

新增：

- `.dashboard-page section:has(.decision-grid) .compact-sec-head .more{display:none}`

作用：

- 只在 `390px` 档位隐藏 `Proof / Risk / Gate` section head 的重复说明行
- 保留 section title
- 保留全部 decision card 内容

## fresh 验证

在 fresh `3200` 上重新执行：

- `pnpm build`
- `pnpm typecheck`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- desktop 关键路径正常
- mobile shell 正常
- `home` 无横向 overflow
- `daily-latin` 无横向 overflow

## 量化结果

fresh `390px` sweep：

- `/ = 1513`
- `/daily-latin = 2141`
- `/dashboard = 2107`
- `/dance-os = 2101`

`/dashboard` section 变化：

- `Proof / Risk / Gate`
  - `214.78 -> 176.78`

## 这轮成立的结论

这轮 very small route-level pass 已被 fresh 数据证明有效：

- `/dashboard 390`
  - `2145 -> 2107`
- `Proof / Risk / Gate`
  - `214.78 -> 176.78`

这说明：

- 当前 `dashboard` 的瓶颈确实不是 card 内容本体
- 而是 compact 场景下 section head 的重复说明层

## broad mobile Top1 状态

这轮后 fresh `390px` sweep 变成：

- `/ = 1513`
- `/daily-latin = 2141`
- `/dashboard = 2107`
- `/dance-os = 2101`

当前新的 broad mobile Top1 切回：

- `/daily-latin = 2141`

## 为什么这轮符合长期方向

这轮继续保持：

- 先 fresh 测量
- 只抓当前 Top1
- 优先 very small route-level pass
- 不为了追数值去重写 card 结构
- 改完立即 build / smoke / remeasure

## 下一步

下一轮更值得继续看的方向：

1. 重新回到 `/daily-latin = 2141`
2. fresh 拆它当前最厚 section
3. 只做一刀新的最小 ROI 收口

如果三条核心 route 继续靠近，则逐步切回：

- 整站与参考稿“近似同款完成度”的 completion 视角
