# 2026-07-10 `Dance Correction Ledger` head negative margin pass

## 背景

今天继续沿用已经锁定的 `390px mobile compaction loop`：

- `single-point only`
- 只有当 `route 总高度` 和 `目标 section 高度` 同时下降，才算 pass
- 失败候选不能写回源码

上一轮结束后，最新 fresh-prod broad mobile baseline 已经变成：

- `/dashboard = 1589`
- `/daily-latin = 1591`
- `/dance-os = 1597`

这意味着：

- `/dance-os` 重新成为当时最厚 route

## 本轮目标

回到 `/dance-os`，重新比较剩余安全 compact 候选。

当前主要 section 高度：

- `#dance-summary = 135.75`
- `#dance-assets = 253.56`
- `#correction-ledger-demo = 327.94`
- `#body-map-practice-queue = 255.55`
- `#dance-sources = 106.34`

这说明当前最厚的单个 section 是：

- `#correction-ledger-demo`

因此这轮优先看：

- `#correction-ledger-demo .compact-sec-head`

同时顺手对比了更激进一点的：

- `body-map-practice-queue`
- `dance-sources`

## 预检

先做 injected preflight。

### `correction-ledger-demo` header

- `correction_m0`
  - `/dance-os = 1590`
  - `#correction-ledger-demo = 320.94`
- `correction_mn2`
  - `/dance-os = 1588`
  - `#correction-ledger-demo = 318.94`
- `correction_mn4`
  - `/dance-os = 1586`
  - `#correction-ledger-demo = 316.94`
- `correction_mn6`
  - `/dance-os = 1584`
  - `#correction-ledger-demo = 314.94`
- `correction_mn8`
  - `/dance-os = 1582`
  - `#correction-ledger-demo = 312.94`

### 其余候选对比

- `bodymap_mn14`
  - `/dance-os = 1595`
  - `#body-map-practice-queue = 253.55`
- `bodymap_mn15`
  - `/dance-os = 1594`
  - `#body-map-practice-queue = 252.55`
- `sources_mn15`
  - `/dance-os = 1596`
  - `#dance-sources = 105.34`
- `sources_mn16`
  - `/dance-os = 1595`
  - `#dance-sources = 104.34`

## 为什么选 `correction_mn6`

这轮最终选：

- `.dance-os-page #correction-ledger-demo .compact-sec-head { margin-bottom: -6px }`

原因是：

1. 它的 ROI 明显高于同轮其它候选
   - `1597 -> 1584`
2. 目标 section 自身也同步明显下降
   - `327.94 -> 314.94`
3. 这块是目前 `/dance-os` 最厚 section，优先压它最符合 single-point 收益逻辑
4. screenshot 复核后，标题与 ledger shell 上缘仍有安全距离

没有继续直接采用 `-8px`，因为虽然 injected 数值更低，但这一轮没有必要为了再多 2px 收益而越过更保守的边界。

## 视觉复核

这轮额外做了 section screenshot 对比：

- `/tmp/baseline_correction.png`
- `/tmp/correction_mn4.png`
- `/tmp/correction_mn6.png`

最终 fresh-prod 截图：

- `/tmp/dance-correction-final-mobile.png`
- `/tmp/dance-correction-section-final-mobile.png`

复核结论：

- `CORRECTION LEDGER DEMO` 标题仍然清楚
- 标题与下方 ledger shell 上沿没有出现明显拥挤
- `-6px` 是这轮更稳的正式值

## 正式改动

修改文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

正式值：

- `.dance-os-page #correction-ledger-demo .compact-sec-head { margin-bottom: -6px }`

## 完整验证

本轮按正式串行链路验证：

1. `pnpm typecheck`
2. `CI=1 pnpm build`
3. kill 旧 `next start`
4. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
6. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
7. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

结果：

- `pnpm typecheck`: pass
- `CI=1 pnpm build`: pass
- fresh `next start`: pass
- `smoke:routes`: pass
- `smoke:browser`: pass
- `structure-smoke`: pass

## A/B 对照

- `baseline_m0`
  - `/dance-os = 1597`
  - `#correction-ledger-demo = 327.94`
- `candidate_mn6`
  - `/dance-os = 1584`
  - `#correction-ledger-demo = 314.94`

这证明这轮收益来自这条规则本身。

## fresh `390px` broad remeasure

- `/ = 1513`
- `/dance-os = 1584`
  - `#dance-assets = 253.56`
  - `#correction-ledger-demo = 314.94`
  - `#body-map-practice-queue = 255.55`
  - `#dance-sources = 106.34`
- `/dashboard = 1589`
  - `#dashboard-verification = 112.56`
  - `#dashboard-guardrails = 125.56`
  - `#dashboard-proof-risk-gate = 108.86`
  - `#dashboard-route-map = 114.59`
  - `#dashboard-witness-archive = 130.84`
  - `#dashboard-ops = 123.56`
- `/daily-latin = 1591`
  - `#today-loop-demo = 219.5`
  - `#daily-library = 67.53`
  - `#live-return-bridge = 128.14`

## 结论

这轮 pass 正式成立。

当前 broad mobile 排名：

- `/dance-os = 1584`
- `/dashboard = 1589`
- `/daily-latin = 1591`

这意味着：

- `/dance-os` 已经不再是最厚 route
- 当前最厚 route 切回 `/daily-latin`

## 下一步

下一轮继续保持：

- `single-point only`
- 先 injected preflight
- 再 screenshot 复核
- 再 fresh-prod 验证

更适合继续看的点：

1. `/daily-latin`
   - 因为它现在重新成为 broad mobile 最厚 route
2. `/dashboard`
   - `guardrails / ops` 仍可继续做保守 preflight
