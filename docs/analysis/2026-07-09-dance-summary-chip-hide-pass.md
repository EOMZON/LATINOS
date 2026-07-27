# Dance Summary Chip Hide Pass

## 背景

在 `Daily Overview Chip Hide Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1780`
- `/dashboard = 1797`
- `/dance-os = 1798`

这意味着新的 broad mobile Top1 变成：

- `/dance-os = 1798`

继续拆 `/dance-os` 后，当前 section heights 是：

- `#correction-ledger-demo = 352.08`
- `#dance-assets = 312.56`
- `#body-map-practice-queue = 298.55`
- `#dance-summary = 174.44`
- `#dance-sources = 142.89`

这轮没有回去重写已经比较稳定的大模块，而是先追：

- `#dance-summary`

运行时继续拆这块后确认：

- `section = 174.44`
- `panel = 174.44`
- `stage = 105.63`
- `kv = 86.78`
- `chips = 38.69`

说明这块顶部 detail panel 在 `390px` 下，`chips` 层仍然占有一段很真实的高度，而且与 `daily-overview` 的情况类似，更多是在重复同一层摘要信息。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在最终生效的 `@media (min-width:390px) and (max-width:430px)` 覆盖层，对：

- `.dance-os-page .compact-detail-dance-top .chips`

做 very small pass：

- `display:flex -> display:none`

这轮没有去碰：

- `dance-summary` 的数据结构
- `DetailPanel` 组件逻辑
- 其他 route
- 其他 section

也没有改动桌面端与更宽视口，只收 `390px` 下的重复 chips 层。

## 验证结果

这轮按既定串行链完整通过：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh `390px` remeasure

## 量化结果

fresh `390px` broad sweep：

- `/ = 1513`
- `/daily-latin = 1780`
- `/dashboard = 1797`
- `/dance-os = 1760`

对应量化收益：

- `/dance-os 390`
  - `1798 -> 1760`
- `#dance-summary`
  - `174.44 -> 135.75`

其余关键 section 保持：

- `#correction-ledger-demo = 352.08`
- `#dance-assets = 312.56`
- `#body-map-practice-queue = 298.55`
- `#dance-sources = 142.89`

## 这轮成立的结论

- `dance-summary` 在 `390px` 下仍有一层真实但低收益的重复摘要可收
- 这轮收益来自 detail panel 内的 chips，而不是 stage 或 kv 本体
- 与 `daily-overview` 一样，这种“只收窄屏重复 chips”的做法能够在不破坏组件结构的前提下带来明确 route-level 收益
- 这类 pass 仍然符合当前“共享样式层 very small pass、不过度改结构”的主线

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 切到：

- `/dashboard = 1797`
- `/daily-latin = 1780`
- `/dance-os = 1760`

下一轮应回到 `/dashboard`，继续按 fresh 数据追当前最高 ROI section。
