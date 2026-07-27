# 2026-07-10 `Dashboard Proof / Risk / Gate` head negative margin pass

## 背景

今天继续沿用已经锁定的 `390px mobile compaction loop`：

- `single-point only`
- 只有当 `route 总高度` 和 `目标 section 高度` 同时下降，才算 pass
- 失败候选不能写回源码

重新量当前真实 `390px` fresh-prod 状态后，`/dashboard` 又回到了：

- `/dashboard = 1609`

当前主要 section 高度：

- `#dashboard-metrics = 135.03`
- `#dashboard-structure-bar = 105.19`
- `#dashboard-next-actions = 111.53`
- `#dashboard-verification = 123.56`
- `#dashboard-guardrails = 125.56`
- `#dashboard-proof-risk-gate = 117.86`
- `#dashboard-route-map = 114.59`
- `#dashboard-witness-archive = 130.84`
- `#dashboard-ops = 123.56`

这说明前几轮已经压过：

- `structure-bar`
- `next-actions`
- `route-map`
- `witness-archive`

但还有几块 header 仍然只停在通用 compact baseline，没有做过单点收缩。

## 本轮目标

验证 `/dashboard` 里剩余未专门收缩的 section header，看看哪一块还能在 `390px` 下继续安全下收。

预选：

- `#dashboard-verification .compact-sec-head`
- `#dashboard-guardrails .compact-sec-head`
- `#dashboard-proof-risk-gate .compact-sec-head`
- `#dashboard-ops .compact-sec-head`

## 预检

先在 `390px` 视口下做 injected preflight。

### `margin-bottom: 0px`

- `verification_m0`
  - `/dashboard = 1604`
  - `#dashboard-verification = 118.56`
- `guardrails_m0`
  - `/dashboard = 1604`
  - `#dashboard-guardrails = 120.56`
- `proof_m0`
  - `/dashboard = 1604`
  - `#dashboard-proof-risk-gate = 112.86`
- `ops_m0`
  - `/dashboard = 1604`
  - `#dashboard-ops = 118.56`

### `margin-bottom: -2px`

- `verification_mn2`
  - `/dashboard = 1602`
  - `#dashboard-verification = 116.56`
- `guardrails_mn2`
  - `/dashboard = 1602`
  - `#dashboard-guardrails = 118.56`
- `proof_mn2`
  - `/dashboard = 1602`
  - `#dashboard-proof-risk-gate = 110.86`
- `ops_mn2`
  - `/dashboard = 1602`
  - `#dashboard-ops = 116.56`

### `margin-bottom: -4px`

- `verification_mn4`
  - `/dashboard = 1600`
  - `#dashboard-verification = 114.56`
- `guardrails_mn4`
  - `/dashboard = 1600`
  - `#dashboard-guardrails = 116.56`
- `proof_mn4`
  - `/dashboard = 1600`
  - `#dashboard-proof-risk-gate = 108.86`
- `ops_mn4`
  - `/dashboard = 1600`
  - `#dashboard-ops = 114.56`

## 为什么选 `proof_mn4`

从纯数值看，上面四个 `-4px` 候选都能把 `/dashboard` 压到 `1600`。

但这轮最终选：

- `.dashboard-page #dashboard-proof-risk-gate .compact-sec-head { margin-bottom: -4px }`

原因是：

1. 目标 section 下降幅度最清楚
   - `117.86 -> 108.86`
2. 它所在区域是三张 `DecisionCard` 的上沿，不像 `verification / guardrails / ops` 那样更容易贴近说明文本
3. viewport screenshot 复核后，标题和卡片上缘仍有余量，没有出现挤压感

## 视觉复核

这轮额外做了 `390px` mobile screenshot：

- `/tmp/dashboard-proof-gate-final-mobile.png`
- `/tmp/dashboard-proof-gate-section-final-mobile.png`

复核结论：

- `PROOF / RISK / GATE` 标题仍然清楚
- 标题与三张 card 的上缘没有出现肉眼拥挤
- 页面整体节奏保持稳定

## 正式改动

修改文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

正式值：

- `.dashboard-page #dashboard-proof-risk-gate .compact-sec-head { margin-bottom: -4px }`

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

- `baseline_m5`
  - `/dashboard = 1609`
  - `#dashboard-proof-risk-gate = 117.86`
- `candidate_mn4`
  - `/dashboard = 1600`
  - `#dashboard-proof-risk-gate = 108.86`

这证明这轮收益来自这条规则本身。

## fresh `390px` broad remeasure

- `/ = 1513`
- `/daily-latin = 1591`
  - `#today-loop-demo = 219.5`
  - `#daily-library = 67.53`
  - `#live-return-bridge = 128.14`
- `/dashboard = 1600`
  - `#dashboard-witness-archive = 130.84`
  - `#dashboard-route-map = 114.59`
  - `#dashboard-structure-bar = 105.19`
  - `#dashboard-next-actions = 111.53`
  - `#dashboard-proof-risk-gate = 108.86`
- `/dance-os = 1597`
  - `#dance-assets = 253.56`
  - `#body-map-practice-queue = 255.55`
  - `#dance-sources = 106.34`

## 结论

这轮 pass 正式成立。

当前 broad mobile 排名：

- `/daily-latin = 1591`
- `/dance-os = 1597`
- `/dashboard = 1600`

## 下一步

下一轮继续保持：

- `single-point only`
- 先 injected preflight
- 再 screenshot 复核
- 再 fresh-prod 验证

更适合继续看的点：

1. `/dashboard` 剩余未单点压过的：
   - `verification`
   - `guardrails`
   - `ops`
2. `/dance-os` 的更保守 compact 候选
