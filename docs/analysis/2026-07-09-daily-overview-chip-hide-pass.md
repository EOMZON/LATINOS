# Daily Overview Chip Hide Pass

## 背景

在上一轮 fresh `390px` broad mobile 复测里，当前 route heights 是：

- `/ = 1513`
- `/daily-latin = 1799`
- `/dashboard = 1797`
- `/dance-os = 1798`

这意味着 broad mobile Top1 仍然是：

- `/daily-latin = 1799`

继续拆 `/daily-latin` 后，当前更厚的 section 是：

- `#today-loop-demo = 252.47`
- `#live-return-bridge = 153.14`
- `#daily-library = 151.53`
- `#daily-overview = 150.20`

这轮没有回去重试已经多次证伪的 `today-loop-demo` / `live-return-bridge` 显性壳体微调，而是转去追：

- `#daily-overview`

运行时继续拆这块后确认：

- `section = 150.20`
- `panel = 150.20`
- `stage = 105.63`
- `kv = 82.84`
- `chips = 18.14`

说明当前这块顶部 detail panel 里，`chips` 仍然占有一段真实高度，而且这组 chips 对当前 `390px` 视图更多是在重复同一层信息。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在最终生效的 `@media (min-width:390px) and (max-width:430px)` 覆盖层，对：

- `.daily-latin-page .compact-detail-daily-top .chips`

做 very small pass：

- `display:flex -> display:none`

这轮没有去碰：

- `daily-overview` 的数据结构
- `DetailPanel` 组件逻辑
- 其他 route
- 其他 section

也没有改动桌面端与更宽视口，只收 `390px` 下的重复信息层。

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
- `/dance-os = 1798`

对应量化收益：

- `/daily-latin 390`
  - `1799 -> 1780`
- `#daily-overview`
  - `150.20 -> 131.06`

其余关键 section 保持：

- `#today-loop-demo = 252.47`
- `#live-return-bridge = 153.14`
- `#daily-library = 151.53`
- `#daily-sources = 147.06`

## 这轮成立的结论

- `daily-overview` 在 `390px` 下仍有一层真实但低收益的重复信息可收
- 这轮收益来自 detail panel 内的重复 chips，而不是 stage 或 kv 本体
- 只收移动端这一层重复信息，就能给 `/daily-latin` 带来 `19px` 的 route-level 收益
- 这类 pass 仍然符合当前“共享样式层小改动、不过度改结构”的主线

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 切到：

- `/dance-os = 1798`
- `/dashboard = 1797`
- `/daily-latin = 1780`

由于 `/dance-os` 只高出 `/dashboard` `1px`，而且其当前最高 section 仍然明显更厚，下一轮需要重新按 fresh 数据确认是继续追 `/dance-os` 还是先追 `/dashboard`。
