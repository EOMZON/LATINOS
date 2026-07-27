# Daily Library Third Card Min-Height Pass

## 背景

在 latest fresh `390px` broad mobile baseline 下：

- `/ = 1513`
- `/daily-latin = 1770`
- `/dashboard = 1770`
- `/dance-os = 1760`

这意味着当前 broad mobile Top1 是并列状态：

- `/daily-latin = 1770`
- `/dashboard = 1770`

继续拆 `/daily-latin` 后，当前 section 高度主要是：

- `#today-loop-demo = 252.47`
- `#live-return-bridge = 153.14`
- `#daily-sources = 145.06`
- `#daily-library = 143.53`

其中：

- `today-loop-demo`
  - 多次 very small shell tweak 已被证伪
- `live-return-bridge`
  - 多个直观的 gap / padding tweak 之前无 route 级收益

所以这轮继续选择：

- `#daily-library`

运行时拆解确认：

- `#daily-library = 143.53`
- `grid = 86`
- `card = 42`
- 首张 card `scrollHeight = 42`
- 当前最终命中的：
  - `.daily-latin-page .compact-move-card { min-height: 42px }`

说明这里还有一档 very small 但直接的 card shell 收口空间。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在最终生效的 `@media (min-width:390px) and (max-width:430px)` 覆盖层，对：

- `.daily-latin-page .compact-move-card`

做 very small pass：

- `min-height: 42px -> 41px`

这轮没有去碰：

- 动作库内容数据
- card padding
- tabs gap
- `today-loop-demo`

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
- `/daily-latin = 1768`
- `/dashboard = 1770`
- `/dance-os = 1760`

对应量化收益：

- `/daily-latin 390`
  - `1770 -> 1768`
- `#daily-library`
  - `143.53 -> 141.53`

运行时再次确认：

- `.daily-latin-page .compact-move-card`
  - `min-height = 41px`
  - `card height = 41`

## 这轮成立的结论

- `daily-library` 在 `390px` 下还有一档稳定成立的 card min-height 收口空间
- 这轮收益来自继续命中真正最终生效的 `daily-library` media block，而不是回到已多次证伪的高噪声 section
- 这轮后 broad mobile Top1 已切回：
  - `/dashboard = 1770`

下一轮应继续 fresh 基线后，在 `/dashboard` 内重新判断 `witness-archive / route-map / next-actions / metrics` 谁更适合继续追。
