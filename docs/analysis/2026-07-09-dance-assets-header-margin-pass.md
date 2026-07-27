# Dance Assets Header Margin Pass

## 背景

在 `dashboard guardrails` row padding pass 之后，fresh `390px` broad mobile baseline 变成：

- `/ = 1513`
- `/daily-latin = 1752`
- `/dashboard = 1750`
- `/dance-os = 1754`

这意味着当前 broad mobile Top1 是：

- `/dance-os = 1754`

继续拆 `/dance-os` 后，当前 section 高度主要是：

- `#correction-ledger-demo = 346.08`
- `#dance-assets = 312.56`
- `#body-map-practice-queue = 298.55`
- `#dance-sources = 142.89`

这轮先做了 fresh 运行时注入预演。

预演里，收益最大且同时让 route 与 target section 一起下降的一刀是：

- `#dance-assets`

运行时继续确认：

- `#dance-assets = 312.56`
- 当前最终命中的：
  - `#dance-assets .compact-sec-head { margin-bottom: 7px }`
- 同时 `.more` 已经隐藏：
  - `display: none`

说明这块还保留了一档可直接收的 header shell 间距。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在真正最终生效的 `390px` dance 覆盖层，对：

- `.dance-os-page #dance-assets .compact-sec-head`

做 very small pass：

- `margin-bottom: 7px -> 2px`

这轮没有去碰：

- asset gallery 数据
- asset card 布局
- correction ledger / body map 逻辑

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
- `/dashboard = 1750`
- `/dance-os = 1749`

对应量化收益：

- `/dance-os 390`
  - `1754 -> 1749`
- `#dance-assets`
  - `312.56 -> 307.56`

运行时再次确认：

- `.dance-os-page #dance-assets .compact-sec-head`
  - `margin-bottom = 2px`

## 这轮成立的结论

- `dance-assets` 在当前这版 worktree 的 `390px` 下，仍然存在一档稳定成立的 header margin 收口空间
- 这轮收益来自先确认最终命中的 margin-bottom，再只收这一层，不去碰 asset grid 本体
- 这轮后 fresh broad mobile Top1 已切回：
  - `/daily-latin = 1752`

下一轮应回到 `/daily-latin`，优先重新判断：

- `#today-loop-demo = 252.47`
- `#live-return-bridge = 149.14`
- `#daily-library = 137.53`
- `#daily-sources = 137.06`
