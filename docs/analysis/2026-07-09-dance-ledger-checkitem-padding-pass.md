# Dance Ledger Checkitem Padding Pass

## 背景

在 latest fully verified `390px` broad mobile baseline 下：

- `/ = 1513`
- `/daily-latin = 1728`
- `/dashboard = 1726`
- `/dance-os = 1735`

这意味着当轮 broad mobile Top1 是：

- `/dance-os = 1735`

继续 fresh 拆 `/dance-os` 后，当前 section 高度主要是：

- `#correction-ledger-demo = 342.08`
- `#dance-assets = 307.56`
- `#body-map-practice-queue = 292.55`
- `#dance-sources = 138.89`

运行时 preflight 后确认：

- `bodymap cue` font-size 只有微弱收益
  - route `1735 -> 1734`
  - target `292.55 -> 292.14`
- `bodymap latest card` / `bodymap meta` / `assets` / `ledger output` 都没有稳定收益
- 只有 `#correction-ledger-demo .compact-ledger-shell .ledger-check-item`
  - `padding: 3px -> 2px`
  - 能稳定带来 route 与目标 section 同降

因此这轮继续收 `correction-ledger-demo` 的 checklist item 壳体。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

在文件末尾追加更具体的 `390px` 覆盖：

- `.dance-os-page #correction-ledger-demo .compact-ledger-shell .ledger-check-item`

做 very small pass：

- `padding: 3px -> 2px`

这样做的原因是：

- 运行时确认当前真正命中的最终值是 `3px`
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
- `/daily-latin = 1728`
- `/dashboard = 1726`
- `/dance-os = 1731`

对应量化收益：

- `/dance-os 390`
  - `1735 -> 1731`
- `#correction-ledger-demo`
  - `342.08 -> 338.08`

运行时再次确认：

- `#correction-ledger-demo .compact-ledger-shell .ledger-check-item`
  - `padding = 2px`

## 这轮成立的结论

- `correction-ledger-demo` 在 `390px` 下还有一档稳定成立的 checklist item 壳体收口空间
- 这轮收益明显高于同批的 `bodymap cue` 等弱收益候选
- 这轮后 fresh broad mobile Top1 切回：
  - `/daily-latin = 1728`

下一轮应回到 fresh broad baseline 后，继续拆 `/daily-latin` 与 `/dashboard` 这组新的接近 Top1 候选，再挑下一刀最小且稳定的 pass。
