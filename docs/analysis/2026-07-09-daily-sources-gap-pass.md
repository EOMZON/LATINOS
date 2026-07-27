# Daily Sources Gap Pass

## 背景

在 latest fresh `390px` broad mobile baseline 下：

- `/ = 1513`
- `/daily-latin = 1772`
- `/dashboard = 1772`
- `/dance-os = 1760`

这意味着当前 broad mobile Top1 是并列状态：

- `/daily-latin = 1772`
- `/dashboard = 1772`

继续拆 `/daily-latin` 后，当前 section 高度主要是：

- `#today-loop-demo = 252.47`
- `#live-return-bridge = 153.14`
- `#daily-sources = 147.06`
- `#daily-library = 143.53`

其中：

- `today-loop-demo`
  - 多次 very small shell tweak 已被证伪
- `live-return-bridge`
  - 多个看似直观的 gap / padding 微调此前也无 route 级收益

所以这轮不回到高噪声区域，而是先追：

- `#daily-sources`

运行时拆解确认：

- `#daily-sources = 147.06`
- `matrix = 124.88`
- `row = 14.05`
- 当前最终命中的：
  - `.daily-latin-page #daily-sources .compact-source-matrix-daily-side-panel .source-list { gap: 3px }`

这说明这里还留着一档很直接的 2 列 grid 壳体收口空间。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在最终生效的 `@media (min-width:390px) and (max-width:430px)` 覆盖层，对：

- `.daily-latin-page #daily-sources .compact-source-matrix-daily-side-panel .source-list`

做 very small pass：

- `gap: 3px -> 2px`

这轮没有去碰：

- `daily-sources` 数据内容
- `SourcePanel` 组件逻辑
- `today-loop-demo` / `live-return-bridge`

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
- `/daily-latin = 1770`
- `/dashboard = 1772`
- `/dance-os = 1760`

对应量化收益：

- `/daily-latin 390`
  - `1772 -> 1770`
- `#daily-sources`
  - `147.06 -> 145.06`

运行时再次确认：

- `#daily-sources .source-list`
  - `gap = 2px`
- `matrix`
  - `124.88 -> 122.88`

## 这轮成立的结论

- `daily-sources` 在 `390px` 下还有一档稳定成立的 source grid gap 收口空间
- 这轮收益来自命中真正最终生效的 `daily-sources` media block，而不是继续回去赌已多次证伪的 `today-loop-demo` / `live-return-bridge`
- 这轮后 broad mobile Top1 已重新切回：
  - `/dashboard = 1772`

下一轮应继续 fresh 基线后，在 `/dashboard` 内重新判断是继续追 `guardrails / witness-archive / route-map / next-actions`，还是回到 `metrics` 做更小一级的收口。
