# Daily Sources Row Padding Pass

## 背景

在 latest fully verified `390px` broad mobile baseline 下：

- `/ = 1513`
- `/daily-latin = 1740`
- `/dashboard = 1738`
- `/dance-os = 1743`

这意味着当轮 broad mobile Top1 是：

- `/dance-os = 1743`

但继续 fresh 拆 `/daily-latin` 后，当前 section 高度主要是：

- `#today-loop-demo = 246.5`
- `#live-return-bridge = 147.14`
- `#daily-sources = 137.06`
- `#daily-library = 133.53`
- `#daily-overview = 131.06`

运行时 preflight 后确认，`/daily-latin` 里有几条候选都能下降，但收益排序是：

- `#daily-sources .source-row padding`
  - route `1740 -> 1732`
  - target `137.06 -> 129.06`
- `#daily-library .compact-move-card min-height`
  - route `1740 -> 1738`
  - target `133.53 -> 131.53`
- `#live-return-bridge .daily-return-panel padding`
  - route `1740 -> 1738`
  - target `147.14 -> 145.14`

因此这轮优先收 `daily-sources`，因为它在当前 fresh 基线上 ROI 明显最高。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

在文件末尾追加更具体的 `390px` 覆盖：

- `.daily-latin-page #daily-sources .compact-source-matrix-daily-side-panel .source-row`

做 very small pass：

- `padding: 1px 2px -> 0 2px`

这样做的原因是：

- 当前文件里存在多层 `source-row` 的历史 `390px` 覆盖
- 运行时确认真正命中的最终值已经是 `1px 2px`
- 这轮只需继续收最小一档纵向 padding，不动文案、不动结构、不动其他 section

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
- `/daily-latin = 1732`
- `/dashboard = 1738`
- `/dance-os = 1743`

对应量化收益：

- `/daily-latin 390`
  - `1740 -> 1732`
- `#daily-sources`
  - `137.06 -> 129.06`

运行时再次确认：

- `#daily-sources .compact-source-matrix-daily-side-panel .source-row`
  - `padding = 0px 2px`

## 这轮成立的结论

- `daily-sources` 在 `390px` 下仍有一档非常明确的 source-row 纵向收口空间
- 这轮收益显著高于同批的 `library min-height` 与 `live-return panel padding`
- 这轮后 fresh broad mobile Top1 变成：
  - `/dance-os = 1743`

下一轮应回到 fresh broad baseline 后，优先重新拆 `/dance-os`，继续在 `dance-assets / body-map-practice-queue / correction-ledger-demo` 之间挑最小且稳定的下一刀。
