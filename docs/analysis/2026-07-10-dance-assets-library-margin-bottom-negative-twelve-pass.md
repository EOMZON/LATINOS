# 2026-07-10 `Dance Assets` library margin-bottom negative twelve pass

## 背景

在上一轮 `Dashboard Guardrails` pass 之后，latest verified fresh-prod `390px` broad mobile baseline 是：

- `/ = 1513`
- `/daily-latin = 1577`
- `/dance-os = 1581`
- `/dashboard = 1575`

这意味着：

- 当前 broad mobile 最厚 route 已回到 `/dance-os`
- 这轮应该继续严格遵守：
  - `390px mobile compaction loop`
  - `single-point only`
  - 只有当 `route 总高度` 和 `目标 section 高度` 同时下降时才算通过

## 本轮目标

只验证 `/dance-os` 的 `#dance-assets` library panel 是否还能继续安全下收。

目标 selector：

- `.dance-os-page #dance-assets .compact-library-panel`

baseline 值：

- `margin-bottom: -10px`

## fresh 基线

在 fresh runtime 下重量：

- `/dance-os = 1581`
- `#dance-summary = 132.75`
- `#dance-assets = 253.56`
- `#correction-ledger-demo = 314.94`
- `#body-map-practice-queue = 255.55`
- `#dance-sources = 106.34`

这说明当前仍然最值得优先看的，还是：

- `#dance-assets`
- `#correction-ledger-demo`
- `#body-map-practice-queue`

## 预检

在 `390px` 视口下先做 injected preflight：

- `assets_lib_mb_-12`
  - `/dance-os: 1581 -> 1579`
  - `#dance-assets: 253.56 -> 251.56`
- `corr_head_-8`
  - `/dance-os: 1581 -> 1579`
  - `#correction-ledger-demo: 314.94 -> 312.94`
- `body_head_-14`
  - `/dance-os: 1581 -> 1579`
  - `#body-map-practice-queue: 255.55 -> 253.55`

这轮对比了 full-page `390px` 截图之后，最终接受：

- `assets_lib_mb_-12`

原因：

- 它给出了和其他候选同等级的 route 收益
- 视觉上更像 library shell 的局部收紧，而不是继续把正文或大标题压得更紧
- 截图里没有出现新的标题贴边、文本顶边或卡片拥挤问题

## 正式改动

修改文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

正式值：

- `.dance-os-page #dance-assets .compact-library-panel{margin-bottom:-12px}`

## 完整验证

按正式串行链路验证：

1. `pnpm typecheck`
2. `CI=1 pnpm build`
3. kill 旧 `next start`
4. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
6. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
7. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

结果：

- 全部通过

## A/B 对照

- `baseline_mneg10`
  - `/dance-os = 1581`
  - `#dance-assets = 253.56`
- `candidate_mneg12`
  - `/dance-os = 1579`
  - `#dance-assets = 251.56`

这证明这轮收益来自这条规则本身，而不是偶发重排。

## fresh-prod `390px` broad remeasure

- `/ = 1513`
- `/daily-latin = 1577`
- `/dance-os = 1579`
  - `#dance-summary = 132.75`
  - `#dance-assets = 251.56`
  - `#correction-ledger-demo = 314.94`
  - `#body-map-practice-queue = 255.55`
  - `#dance-sources = 106.34`
- `/dashboard = 1575`

当前 broad mobile 排名：

1. `/dance-os = 1579`
2. `/daily-latin = 1577`
3. `/dashboard = 1575`

## 下一轮预备事实

在当前新基线 `1579` 上再做 injected preflight：

- `corr_head_-8`
  - `/dance-os: 1579 -> 1577`
  - `#correction-ledger-demo: 314.94 -> 312.94`
- `body_head_-14`
  - `/dance-os: 1579 -> 1577`
  - `#body-map-practice-queue: 255.55 -> 253.55`

这意味着下一轮仍然不需要发散：

- 继续留在 `/dance-os`
- 继续在 `correction-ledger-demo` 和 `body-map-practice-queue` 两个保守候选之间做单点选择

## 结论

这轮 pass 成立。

它进一步说明：

- `/dance-os` 仍然是最厚 route，但已经从 `1581` 被继续压到 `1579`
- 继续做 library / header / shell 级别的 very small pass 仍然有效
- 当前最稳的推进方式仍然是：
  - 先 fresh 实测
  - 再 injected preflight
  - 再截图复核
  - 最后才写回源码与落盘
