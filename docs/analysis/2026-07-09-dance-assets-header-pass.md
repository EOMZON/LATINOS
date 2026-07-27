# Dance Assets Header Pass

## 背景

在 `2026-07-09-dashboard-guardrails-second-compact-pass` 之后，fresh `390px` broad mobile Top1 是：

- `/dance-os = 1897`

当时 `/dance-os` 的主要 section 高度是：

- `#correction-ledger-demo = 394.08`
- `#dance-assets = 358.91`
- `#body-map-practice-queue = 309.14`

上一轮已经确认：

- 不继续蛮力压 `Correction Ledger` 同一组 shell
- 先找更小、更干净、更高 ROI 的一刀

## 问题定义

要解决的不是继续大改 `Dance OS`。

要解决的是：

**先用最小一刀把 `/dance-os` 从 `1897` 往下拉，同时不破坏当前已成立的交互与移动端壳体。**

## 拆解

fresh 重新拆 `#dance-assets` 后：

- `section = 358.91`
- `head = 41.19`
- `tabs = 28.72`
- `panel = 66.16`
- `grid = 197.84`

进一步确认：

- `#dance-assets .compact-sec-head .more` 单独占用了一行说明高度
- 这是 `390px` 下最低风险、最小范围的一刀

## 本轮改动

文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

动作：

- 只在 `@media (min-width:390px) and (max-width:430px)` 下隐藏：
  - `.dance-os-page #dance-assets .compact-sec-head .more`

没有改：

- `HashedAssetGallery` 组件结构
- data/content
- asset card shell
- tabs / panel / grid 排布

## 验证

这轮通过了：

- `pnpm typecheck`
- `pnpm build`
- fresh `next start --hostname 127.0.0.1 --port 3200`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
- fresh `390px` remeasure

## 量化结果

- `/dance-os 390`
  - `1897 -> 1875`
- `#dance-assets`
  - `358.91 -> 336.91`

当前 `#dance-assets` 复测：

- `head = 19.19`
- `more = None`
- `tabs = 28.72`
- `panel = 66.16`
- `grid = 197.84`

## fresh broad mobile heights

- `/ = 1513`
- `/daily-latin = 1892`
- `/dashboard = 1880`
- `/dance-os = 1875`

新的 broad mobile Top1 切回：

- `/daily-latin = 1892`

## 额外说明

本轮中途曾出现一次 `.next` 样式链异常：

- 运行中的 HTML 一度引用了错误 CSS chunk
- 导致 `mobile shell` 误回归、页面高度虚高

这不是本轮 pass 本身的问题。

处理方式是：

- `rm -rf .next`
- fresh `pnpm build`
- fresh `pnpm start`

在 clean rebuild 后，CSS 引用链恢复正常，这轮量化结果才重新可信。

## 结论

这轮成立。

它证明：

- `/dance-os` 目前仍然适合继续走 `最小 header / low-yield copy` 收口路线
- 不需要每次都动重组件或交互 shell

## 下一步

优先重新回到当前 broad mobile Top1：

- `/daily-latin = 1892`

如果随后再回到 `/dance-os`，当前更值得继续看的顺序仍然是：

1. `#correction-ledger-demo`
2. `#body-map-practice-queue`
3. `#dance-assets` 内部 tabs/panel/grid 的更细一刀
