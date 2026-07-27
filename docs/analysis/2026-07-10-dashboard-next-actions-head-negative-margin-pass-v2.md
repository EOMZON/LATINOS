# 2026-07-10 `Dashboard Next Actions` head negative margin pass v2

## 背景

今天继续沿用 `390px` mobile compaction loop：

- single-point only
- 只有当 route 总高和目标 section 高度同时下降时才算成立

上一轮 broad mobile baseline：

- `/ = 1513`
- `/daily-latin = 1598`
- `/dance-os = 1599`
- `/dashboard = 1603`

因此这轮继续直接追 `dashboard`。

## 本轮目标

验证 `/dashboard` 的 `#dashboard-next-actions` section header 是否还能在当前基线下继续安全下收。

目标 selector：

- `.dashboard-page #dashboard-next-actions .compact-sec-head`

baseline 值：

- `margin-bottom: -5px`

## 预检

在 `390px` 视口下先做 injected preflight：

- `next_m7`
  - `/dashboard = 1601`
  - `#dashboard-next-actions = 112.53`
- `next_m8`
  - `/dashboard = 1600`
  - `#dashboard-next-actions = 111.53`

同时也比较了：

- `route_m8`
  - `/dashboard = 1600`
  - `#dashboard-route-map = 111.59`
- `witness_m9`
  - `/dashboard = 1599`
  - `#dashboard-witness-archive = 126.84`

截图复核后：

- `witness_m9` 继续存在内容挤压风险，排除
- `route_m8` 的 section title 上缘更紧
- `next_m8` 在当前节奏下更稳

随后补了带上下文的 viewport 截图，确认 `next_m8` 没有破坏页面节奏。

## 正式改动

修改文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

正式值：

- `.dashboard-page #dashboard-next-actions .compact-sec-head { margin-bottom: -8px }`

## 完整验证

本轮按正式链路验证：

- `pnpm typecheck`: pass
- `pnpm build`: pass
- fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`: pass
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`: pass
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`: pass
- fresh `390px` broad remeasure: pass
- injected A/B compare: pass

## A/B 对照

- `baseline_m5`
  - `/dashboard = 1603`
  - `#dashboard-next-actions = 114.53`
- `candidate_m8`
  - `/dashboard = 1600`
  - `#dashboard-next-actions = 111.53`

这证明这轮收益来自这条规则本身。

## fresh `390px` broad remeasure

- `/ = 1513`
- `/daily-latin = 1598`
  - `#today-loop-demo = 224.5`
  - `#daily-library = 67.53`
  - `#live-return-bridge = 130.14`
- `/dashboard = 1600`
  - `#dashboard-witness-archive = 130.84`
  - `#dashboard-route-map = 114.59`
  - `#dashboard-structure-bar = 105.19`
  - `#dashboard-next-actions = 111.53`
- `/dance-os = 1599`
  - `#dance-assets = 255.56`
  - `#body-map-practice-queue = 255.55`
  - `#dance-sources = 106.34`

## 结论

这轮 pass 正式成立。

当前 broad mobile 排名：

- `/daily-latin = 1598`
- `/dance-os = 1599`
- `/dashboard = 1600`

## 下一步

下一轮继续保持：

- single-point only
- injected preflight 先行
- route 总高和目标 section 同降
- 截图复核后再落库

更适合继续看的点：

- `/dashboard` 的 route / witness 保守候选
- `/daily-latin` 的极小安全收缩点
