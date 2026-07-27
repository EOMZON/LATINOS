# Daily Library Second Card Min-Height Pass

## 背景

在 `Dashboard Witness Archive Panel Shell Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1776`
- `/dashboard = 1775`
- `/dance-os = 1760`

这意味着 broad mobile Top1 仍然是：

- `/daily-latin = 1776`

继续拆 `/daily-latin` 后，当前更厚的 section 是：

- `#today-loop-demo = 252.47`
- `#live-return-bridge = 153.14`
- `#daily-library = 147.53`

这一轮先尝试过：

- `today-loop-demo` 的 `ledger-output padding: 5px -> 4px`

但 fresh `390px` 复测确认：

- `/daily-latin` 没降
- `#today-loop-demo` 没降

因此那条改动已回退，不记成果。

随后继续回到已被证明有效的控制杆：

- `#daily-library`

运行时确认：

- `#daily-library = 147.53`
- `card = 44`
- 当前最终生效的 `390px` 命中是：
  - `.daily-latin-page .compact-move-card { min-height: 44px; padding: 4px 4px 2px }`

说明这块当前仍然被 `min-height` 锁住，适合继续做第二轮 very small pass。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在最终生效的 `@media (min-width:390px) and (max-width:430px)` 覆盖层，对：

- `.daily-latin-page .compact-move-card`

继续做第二轮 very small pass：

- `min-height: 44px -> 42px`

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
- `/daily-latin = 1772`
- `/dashboard = 1775`
- `/dance-os = 1760`

对应量化收益：

- `/daily-latin 390`
  - `1776 -> 1772`
- `#daily-library`
  - `147.53 -> 143.53`

其余关键 section 保持：

- `#today-loop-demo = 252.47`
- `#live-return-bridge = 153.14`
- `#daily-overview = 131.06`
- `#daily-sources = 147.06`

## 这轮成立的结论

- `daily-library` 这块当前最稳定、最有效的控制杆仍然是卡片 `min-height`
- 在卡片高度继续被 `min-height` 锁住的情况下，第二轮 very small pass 仍然能带来明确的 route-level 收益
- 这轮收益足够让 `/daily-latin` 再次拉开与 `/dashboard` 的差距

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 仍然是：

- `/daily-latin = 1772`
- `/dashboard = 1775`
- `/dance-os = 1760`

下一轮应继续基于 fresh 数据，重新判断是回到 `today-loop-demo`，还是再切回 `/dashboard`。
