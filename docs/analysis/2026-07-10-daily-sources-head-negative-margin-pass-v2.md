# 2026-07-10 `Daily Sources` head negative margin pass v2

## 背景

在上一轮把 `/dance-os` 压到 `1577` 之后，latest verified fresh-prod `390px` broad mobile baseline 是：

- `/ = 1513`
- `/daily-latin = 1577`
- `/dance-os = 1577`
- `/dashboard = 1575`

这意味着：

- 当前 broad mobile 最大值变成 `/daily-latin` 和 `/dance-os` 并列
- 这轮更适合先回到 `/daily-latin`
- 继续遵守：
  - `390px mobile compaction loop`
  - `single-point only`
  - 只有当 `route 总高度` 和 `目标 section 高度` 同时下降时才算通过

## 本轮目标

只验证 `/daily-latin` 的 `#daily-sources` section header 是否还能继续安全下收。

目标 selector：

- `.daily-latin-page #daily-sources .compact-sec-head`

baseline 值：

- `margin-bottom: -1px`

## fresh 基线

fresh runtime 下重量：

- `/daily-latin = 1577`
- `#today-loop-demo = 219.5`
- `#live-return-bridge = 128.14`
- `#daily-sources = 121.06`
- `#legacy-daily-principles = 119.02`
- `#daily-overview = 116.06`
- `#entry-states = 110.19`
- `#daily-loop-overview = 100.95`
- `#daily-library = 67.53`

## 预检

在 `390px` 视口下先做 injected preflight：

- `daily_sources_head_-2`
  - `/daily-latin: 1577 -> 1576`
  - `#daily-sources: 121.06 -> 120.06`
- `today_loop_margin_-16`
  - `/daily-latin: 1577 -> 1576`
  - `#today-loop-demo: 219.5 -> 218.5`
- `live_return_head_-6`
  - `/daily-latin: 1577 -> 1576`
  - `#live-return-bridge: 128.14 -> 127.14`

这轮最终选择：

- `daily_sources_head_-2`

原因：

1. 三个候选 route 收益相同，都是 `1577 -> 1576`
2. `daily-sources` 是这轮里最保守的 header 级切口
3. 相比继续挤 `today-loop-demo` 交互壳或 `live-return-bridge`，它更不容易带来节奏破坏
4. `390px` full-page 截图复核后，没有出现新的贴边或信息挤压风险

## 正式改动

修改文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

正式值：

- `.daily-latin-page #daily-sources .compact-sec-head{margin-bottom:-2px}`

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

- `baseline_mneg1`
  - `/daily-latin = 1577`
  - `#daily-sources = 121.06`
- `candidate_mneg2`
  - `/daily-latin = 1576`
  - `#daily-sources = 120.06`

这证明这轮收益来自这条规则本身。

## fresh-prod `390px` broad remeasure

- `/ = 1513`
- `/daily-latin = 1576`
  - `#today-loop-demo = 219.5`
  - `#live-return-bridge = 128.14`
  - `#daily-sources = 120.06`
  - `#legacy-daily-principles = 119.02`
  - `#daily-overview = 116.06`
  - `#entry-states = 110.19`
  - `#daily-loop-overview = 100.95`
  - `#daily-library = 67.53`
- `/dance-os = 1577`
- `/dashboard = 1575`

当前 broad mobile 排名：

1. `/dance-os = 1577`
2. `/daily-latin = 1576`
3. `/dashboard = 1575`

## 结论

这轮 pass 成立。

它说明：

- `/daily-latin` 还能继续压
- 但当前更稳的路径仍然是 header 级 very small pass
- 在 `daily` 和 `dance` 并列之后，`dance-os` 现在重新成为 broad mobile 最厚 route

## 下一步

下一轮最适合重新回到：

- `/dance-os`

建议顺序：

1. 先 fresh 量当前 `/dance-os` section 高度
2. 继续在 `body-map-practice-queue` 与 `dance-summary` 等保守切口里做 injected preflight
3. 继续保持 `single-point only`
