# 2026-07-10 `Dance Correction Ledger` head negative margin pass v2

## 背景

在上一轮 `Dance Assets` library margin-bottom negative twelve pass 之后，latest verified fresh-prod `390px` broad mobile baseline 是：

- `/ = 1513`
- `/daily-latin = 1577`
- `/dance-os = 1579`
- `/dashboard = 1575`

这意味着：

- 当前 broad mobile 最厚 route 仍然是 `/dance-os`
- 但它只比 `/daily-latin` 多 `2px`
- 这轮继续留在 `/dance-os` 做单点 very small pass 仍然成立

## 本轮目标

只验证 `/dance-os` 的 `#correction-ledger-demo` section header 是否还能继续安全下收。

目标 selector：

- `.dance-os-page #correction-ledger-demo .compact-sec-head`

baseline 值：

- `margin-bottom: -6px`

## fresh 基线

fresh runtime 下重量：

- `/dance-os = 1579`
- `#dance-summary = 132.75`
- `#dance-assets = 251.56`
- `#correction-ledger-demo = 314.94`
- `#body-map-practice-queue = 255.55`
- `#dance-sources = 106.34`

这里最厚的 section 仍然是：

- `#correction-ledger-demo`

## 预检

在 `390px` 视口下先做 injected preflight：

- `corr_head_-8`
  - `/dance-os: 1579 -> 1577`
  - `#correction-ledger-demo: 314.94 -> 312.94`
- `body_head_-14`
  - `/dance-os: 1579 -> 1577`
  - `#body-map-practice-queue: 255.55 -> 253.55`

这轮最终选择：

- `corr_head_-8`

原因：

1. 它和 `body_head_-14` 给出了同等级的 route 收益
2. 但目标 section 是当前 `/dance-os` 最厚 section
3. 视觉上更像标题节奏继续收紧，而不是继续压 body map 内部内容
4. full-page `390px` 截图复核后，没有出现新的标题贴边或 shell 顶边拥挤问题

## 正式改动

修改文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

正式值：

- `.dance-os-page #correction-ledger-demo .compact-sec-head{margin-bottom:-8px}`

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

- `baseline_mneg6`
  - `/dance-os = 1579`
  - `#correction-ledger-demo = 314.94`
- `candidate_mneg8`
  - `/dance-os = 1577`
  - `#correction-ledger-demo = 312.94`

这证明这轮收益来自这条规则本身。

## fresh-prod `390px` broad remeasure

- `/ = 1513`
- `/daily-latin = 1577`
- `/dance-os = 1577`
  - `#dance-summary = 132.75`
  - `#dance-assets = 251.56`
  - `#correction-ledger-demo = 312.94`
  - `#body-map-practice-queue = 255.55`
  - `#dance-sources = 106.34`
- `/dashboard = 1575`

当前 broad mobile 排名：

1. `/daily-latin = 1577`
2. `/dance-os = 1577`
3. `/dashboard = 1575`

更准确地说：

- 当前 broad mobile 最大值已经变成 `/daily-latin` 和 `/dance-os` 并列

## 结论

这轮 pass 成立。

它说明：

- `/dance-os` 又被继续压下去 `2px`
- 现在已经和 `/daily-latin` 并列 broad mobile Top
- 继续对 `/dance-os` 做 more aggressive 压缩不再是唯一最优路径

## 下一步

下一轮更适合优先回到：

- `/daily-latin`

原因：

- 当前 broad mobile 最大值已经 shared-top
- `/dance-os` 刚完成连续两轮有效 pass
- 下一轮更值的是重新量 `/daily-latin` 的关键 section，再决定新的单点候选
