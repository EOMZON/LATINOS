# Daily Live Return CTA Padding Pass

## 背景

在 latest fresh `390px` broad mobile baseline 下：

- `/ = 1513`
- `/daily-latin = 1768`
- `/dashboard = 1767`
- `/dance-os = 1760`

这意味着当前 broad mobile Top1 是：

- `/daily-latin = 1768`

继续拆 `/daily-latin` 后，当前 section 高度主要是：

- `#today-loop-demo = 252.47`
- `#live-return-bridge = 153.14`
- `#daily-sources = 145.06`
- `#daily-library = 141.53`

运行时进一步拆解 `#live-return-bridge` 后确认：

- `panel = 128.95`
- `mode card = 69.34`
- `modeCardScroll = 67`
- `actionBtn = 19.84`
- 当前真正命中的 `390px` block 内：
  - `.daily-latin-page .compact-daily-return-board .bodymap-actions .btn { padding: 4px 5px }`

之前这块已经证伪过：

- panel padding
- actions margin-top
- grid gap

所以这轮不回去碰已证伪点，而是追一个还没试过、且仍有余量的壳体点：

- CTA button 自身的纵向 padding

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在真正命中的 `@media (min-width:390px) and (max-width:430px)` `live-return` 覆盖层，对：

- `.daily-latin-page .compact-daily-return-board .bodymap-actions .btn`

做 very small pass：

- `padding: 4px 5px -> 3px 5px`

这轮没有去碰：

- `DailyReturnBoard` 组件逻辑
- `mode card` padding
- `panel` padding
- `grid gap`

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
- `/daily-latin = 1766`
- `/dashboard = 1767`
- `/dance-os = 1760`

对应量化收益：

- `/daily-latin 390`
  - `1768 -> 1766`
- `#live-return-bridge`
  - `153.14 -> 151.14`

运行时再次确认：

- `.daily-latin-page .compact-daily-return-board .bodymap-actions .btn`
  - `padding = 3px 5px`
  - `button height = 17.84`

## 这轮成立的结论

- `live-return-bridge` 在 `390px` 下还有一档稳定成立的 CTA button padding 收口空间
- 这轮收益来自命中真正最终生效的 `live-return` block，而不是回到已经多次证伪的 margin / gap / panel padding
- 这轮后 broad mobile Top1 已切回：
  - `/dashboard = 1767`

下一轮应继续 fresh 基线后，回到 `/dashboard` 或继续追 `/daily-latin` 里剩余最厚的 `today-loop-demo`，按真实 runtime 再选一刀。
