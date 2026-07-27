# 2026-07-10 `Dashboard Structure Bar` head negative margin pass

## 背景

今天继续沿用 `390px` mobile compaction loop：

- single-point only
- 只有当 route 总高和目标 section 高度同时下降时才算成立

上一轮 broad mobile baseline：

- `/ = 1513`
- `/daily-latin = 1598`
- `/dance-os = 1603`
- `/dashboard = 1609`

因此这轮直接追 `dashboard`。

## 本轮目标

验证 `/dashboard` 的 `#dashboard-structure-bar` section header 是否还能安全下收。

目标 selector：

- `.dashboard-page #dashboard-structure-bar .compact-sec-head`

baseline 值：

- `margin-bottom: -8px`

## 预检

在 `390px` 视口下先做 injected preflight：

- `structure_m14`
  - `/dashboard = 1603`
  - `#dashboard-structure-bar = 105.19`
- `structure_m15`
  - `/dashboard = 1602`
  - `#dashboard-structure-bar = 104.19`

同时也对比了：

- `route_m11`
  - `/dashboard = 1603`
  - `#dashboard-route-map = 108.59`
- `next_m11`
  - `/dashboard = 1603`
  - `#dashboard-next-actions = 108.53`

截图复核后：

- `route_m11` 与 `next_m11` 都开始顶到标题上缘
- `structure_m15` 过于激进
- `structure_m14` 是收益和安全性最平衡的点

随后又补了带上下文的 viewport 截图，确认 `structure_m14` 在真实页面节奏里仍然稳定。

## 正式改动

修改文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

正式值：

- `.dashboard-page #dashboard-structure-bar .compact-sec-head { margin-bottom: -14px }`

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

- `baseline_m8`
  - `/dashboard = 1609`
  - `#dashboard-structure-bar = 111.19`
- `candidate_m14`
  - `/dashboard = 1603`
  - `#dashboard-structure-bar = 105.19`

这证明这轮收益来自这条规则本身。

## fresh `390px` broad remeasure

- `/ = 1513`
- `/daily-latin = 1598`
  - `#today-loop-demo = 224.5`
  - `#daily-library = 67.53`
  - `#live-return-bridge = 130.14`
- `/dashboard = 1603`
  - `#dashboard-witness-archive = 130.84`
  - `#dashboard-route-map = 114.59`
  - `#dashboard-structure-bar = 105.19`
  - `#dashboard-next-actions = 114.53`
- `/dance-os = 1603`
  - `#dance-assets = 259.56`
  - `#body-map-practice-queue = 255.55`
  - `#dance-sources = 106.34`

## 结论

这轮 pass 正式成立。

当前 broad mobile 排名：

- `/daily-latin = 1598`
- `/dashboard = 1603`
- `/dance-os = 1603`

## 下一步

下一轮继续保持：

- single-point only
- injected preflight 先行
- route 总高和目标 section 同降
- 截图复核后再落库

更适合继续看的点：

- `/dashboard` 的剩余安全 compact 候选
- `/dance-os` 的剩余安全 spacing 候选
