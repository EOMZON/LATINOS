# Dance Ledger Checkitem Second Padding Pass

## 背景

在 latest fully verified `390px` broad mobile baseline 下：

- `/ = 1513`
- `/daily-latin = 1724`
- `/dashboard = 1722`
- `/dance-os = 1731`

这意味着当轮 broad mobile Top1 是：

- `/dance-os = 1731`

继续 fresh 拆 `/dance-os` 后，当前 section 高度主要是：

- `#correction-ledger-demo = 338.08`
- `#dance-assets = 307.56`
- `#body-map-practice-queue = 292.55`
- `#dance-sources = 138.89`

运行时 preflight 后确认：

- `#correction-ledger-demo .compact-ledger-shell .ledger-check-item`
  - route `1731 -> 1728`
  - target `338.08 -> 335.94`
- `#body-map-practice-queue .bodymap-focus-cue`
  - route `1731 -> 1730`
  - target `292.55 -> 292.14`
- 其他 `bodymap / assets / ledger output` 候选没有更高收益

因此这轮继续优先收 `correction-ledger-demo` 的 checklist item 壳体。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

在文件末尾追加更具体的 `390px` 覆盖：

- `.dance-os-page #correction-ledger-demo .compact-ledger-shell .ledger-check-item`

做 very small pass：

- `padding: 2px -> 1px`

这样做的原因是：

- 运行时确认当前真正命中的最终值是 `2px`
- 当前文件里已经存在多层 `ledger-check-item` 的历史 `390px` 定义
- 这轮只继续收最小一档 checklist 壳体，不改结构、不改文案、不动其他 section

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
- `/daily-latin = 1724`
- `/dashboard = 1722`
- `/dance-os = 1728`

对应量化收益：

- `/dance-os 390`
  - `1731 -> 1728`
- `#correction-ledger-demo`
  - `338.08 -> 335.94`

运行时再次确认：

- `#correction-ledger-demo .compact-ledger-shell .ledger-check-item`
  - `padding = 1px`

## 这轮成立的结论

- `correction-ledger-demo` 在 `390px` 下还有一档稳定成立的 checklist item 壳体收口空间
- 这轮收益继续高于同批的 `bodymap cue` 弱收益候选，因此优先级更高
- 这轮后 fresh broad mobile Top1 切回：
  - `/daily-latin = 1724`

下一轮应回到 fresh broad baseline 后，继续拆 `/daily-latin` 与 `/dashboard` 这组新的接近 Top1 候选，再挑下一刀最小且稳定的 pass。
