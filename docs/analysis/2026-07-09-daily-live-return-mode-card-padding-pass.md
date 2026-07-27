# Daily Live Return Mode Card Padding Pass

## 背景

在 latest fresh `390px` broad mobile baseline 下：

- `/ = 1513`
- `/daily-latin = 1766`
- `/dashboard = 1766`
- `/dance-os = 1760`

这意味着当前 broad mobile Top1 是并列状态：

- `/daily-latin = 1766`
- `/dashboard = 1766`

继续拆 `/daily-latin` 后，当前 section 高度主要是：

- `#today-loop-demo = 252.47`
- `#live-return-bridge = 151.14`
- `#daily-sources = 145.06`
- `#daily-library = 141.53`

进一步做运行时拆解后确认：

- `#live-return-bridge = 151.14`
- `panel = 126.95`
- `mode card = 67.34`
- `modeCardScroll = 65`
- 当前真正命中的最后一个 `390px` 覆盖层内：
  - `.daily-latin-page .compact-daily-return-board .daily-return-mode-card { padding: 4px }`

之前这块已经证伪或不再值得追的点包括：

- `grid gap`
- `panel padding`
- `actions margin-top`

因此这轮继续沿 compact 壳体 very small pass 前进，但只收 mode card 自身的 padding。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

在文件末尾追加一个更具体、确保最终生效的 `@media (min-width:390px) and (max-width:430px)` 规则：

- `.daily-latin-page #live-return-bridge .compact-daily-return-board .daily-return-mode-card`

做 very small pass：

- `padding: 4px -> 3px`

这样做的原因是：

- 之前文件里存在多个同名 `390px` block
- 直接改前面的同名 selector 容易被后面的 block 覆盖
- 这轮需要确保命中最终运行时样式，而不是“改了但没生效”

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
- `/daily-latin = 1764`
- `/dashboard = 1766`
- `/dance-os = 1760`

对应量化收益：

- `/daily-latin 390`
  - `1766 -> 1764`
- `#live-return-bridge`
  - `151.14 -> 149.14`

运行时再次确认：

- `.daily-latin-page #live-return-bridge .daily-return-mode-card`
  - `padding = 3px`
  - `card height = 65.34`
  - `card scrollHeight = 63`

## 这轮成立的结论

- `live-return-bridge` 在 `390px` 下还有一档稳定成立的 mode card padding 收口空间
- 这轮真正解决的是“同名规则太多导致误判命中层”的问题：通过更具体的末尾覆盖，确保改动确实作用在最终运行时
- 这轮后 broad mobile Top1 已重新切回：
  - `/dashboard = 1766`

下一轮应继续 fresh 基线后，回到 `/dashboard`，优先在 `route-map / witness-archive / metrics` 这些接近 section 里继续挑一刀。
