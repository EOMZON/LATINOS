# Dance Correction Ledger Card Padding Pass

## 背景

在 `daily-sources` row padding pass 之后，fresh `390px` broad mobile baseline 变成：

- `/ = 1513`
- `/daily-latin = 1752`
- `/dashboard = 1758`
- `/dance-os = 1760`

这意味着当前 broad mobile Top1 是：

- `/dance-os = 1760`

继续拆 `/dance-os` 后，当前 section 高度主要是：

- `#correction-ledger-demo = 352.08`
- `#dance-assets = 312.56`
- `#body-map-practice-queue = 298.55`
- `#dance-sources = 142.89`
- `#dance-summary = 135.75`

这轮先没有直接改文件，而是先对高 ROI 候选做了运行时注入预演。

预演里，最稳且收益最高的一刀是：

- `#correction-ledger-demo`

运行时继续确认：

- `#correction-ledger-demo = 352.08`
- 当前最终命中的：
  - `.dance-os-page .compact-ledger-shell .ledger-card,
     .dance-os-page .compact-ledger-shell .ledger-output { padding: 5px }`

预演再次证明：

- `padding: 5px -> 4px`

会同时带来：

- `/dance-os route -6`
- `#correction-ledger-demo section -6`

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在真正最终生效的 `390px` dance compact 覆盖层，对：

- `.dance-os-page .compact-ledger-shell .ledger-card`
- `.dance-os-page .compact-ledger-shell .ledger-output`

做 very small pass：

- `padding: 5px -> 4px`

这轮没有去碰：

- correction demo 数据文案
- 交互逻辑
- body map section
- assets section

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
- `/daily-latin = 1752`
- `/dashboard = 1758`
- `/dance-os = 1754`

对应量化收益：

- `/dance-os 390`
  - `1760 -> 1754`
- `#correction-ledger-demo`
  - `352.08 -> 346.08`

运行时再次确认：

- `.dance-os-page #correction-ledger-demo .ledger-card`
  - `padding = 4px`
- `.dance-os-page #correction-ledger-demo .ledger-output`
  - `padding = 4px`

## 这轮成立的结论

- `dance correction ledger` 在当前这版 worktree 的 `390px` 下，仍然存在一档稳定成立的 card/output padding 收口空间
- 这轮收益来自 fresh 预演后再正式落盘的 very small shell pass，而不是修改组件结构或数据层
- 这轮后 fresh broad mobile Top1 已切回：
  - `/dashboard = 1758`

下一轮应回到 `/dashboard`，优先重新判断：

- `#dashboard-guardrails`
- `#dashboard-witness-archive`
- `#dashboard-next-actions`
- `#dashboard-structure-bar`
- `#dashboard-metrics`
