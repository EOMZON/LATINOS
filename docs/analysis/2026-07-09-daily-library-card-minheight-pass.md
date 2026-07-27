# Daily Library Card Min-Height Pass

## 背景

在 `Dashboard Route Map Second Shell Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1780`
- `/dashboard = 1777`
- `/dance-os = 1760`

这意味着 broad mobile Top1 切回：

- `/daily-latin = 1780`

继续拆 `/daily-latin` 后，当前更厚的 section 是：

- `#today-loop-demo = 252.47`
- `#live-return-bridge = 153.14`
- `#daily-library = 151.53`
- `#daily-overview = 131.06`

`today-loop-demo` 上一轮尝试过继续收 `compact-ledger-shell`，但 route 和 section 都没有下降，所以那条路当轮已回退，不计入成果。

这轮转去追：

- `#daily-library`

运行时继续确认：

- `#daily-library = 151.53`
- `grid = 94`
- `card = 46`
- 当前最终生效的 `390px` 命中是：
  - `.daily-latin-page .compact-move-card { min-height: 46px; padding: 4px 4px 2px }`

而且卡片高度正好被 `min-height` 锁住，说明这块当前最明确的控制杆是：

- `compact-move-card` 的 `min-height`

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在最终生效的 `@media (min-width:390px) and (max-width:430px)` 覆盖层，对：

- `.daily-latin-page .compact-move-card`

做 very small pass：

- `min-height: 46px -> 44px`

这轮没有去碰：

- `dailyMoves` 数据
- `MoveCard` 组件结构
- 其他 daily-latin section

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
- `/daily-latin = 1776`
- `/dashboard = 1777`
- `/dance-os = 1760`

对应量化收益：

- `/daily-latin 390`
  - `1780 -> 1776`
- `#daily-library`
  - `151.53 -> 147.53`

其余关键 section 保持：

- `#today-loop-demo = 252.47`
- `#live-return-bridge = 153.14`
- `#daily-overview = 131.06`
- `#daily-sources = 147.06`

## 这轮成立的结论

- `daily-library` 这块当前最有效的控制杆是卡片 `min-height`，不是继续压 tabs 或 grid gap
- 在卡片高度刚好被 `min-height` 锁住的情况下，very small pass 仍然能带来明确的 route-level 收益
- `/daily-latin` 与 `/dashboard` 现在已经压到只差 `1px`

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 变成：

- `/dashboard = 1777`
- `/daily-latin = 1776`
- `/dance-os = 1760`

下一轮应基于 fresh 数据重新确认是继续追 `/dashboard`，还是在 `/daily-latin` 里回到 `live-return-bridge` / `today-loop-demo` 做下一刀。
