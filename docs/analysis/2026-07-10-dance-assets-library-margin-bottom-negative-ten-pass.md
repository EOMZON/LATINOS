# 2026-07-10 `Dance Assets` library margin-bottom negative ten pass

## 背景

今天继续沿用 `390px` mobile compaction loop：

- single-point only
- 只有当 route 总高和目标 section 高度同时下降时才算成立

上一轮 broad mobile baseline：

- `/ = 1513`
- `/daily-latin = 1596`
- `/dance-os = 1599`
- `/dashboard = 1600`

因此这轮继续在 `dance-os` 和 `dashboard` 之间筛选更稳的收缩点。

## 本轮目标

验证 `/dance-os` 的 `#dance-assets` library panel 是否还能继续安全下收。

目标 selector：

- `.dance-os-page #dance-assets .compact-library-panel`

baseline 值：

- `margin-bottom: -8px`

## 预检

在 `390px` 视口下先做 injected preflight：

- `assets_mneg10`
  - `/dance-os = 1597`
  - `#dance-assets = 253.56`
- `assets_mneg12`
  - `/dance-os = 1595`
  - `#dance-assets = 251.56`

同时也对比了：

- `body_head_m15`
  - `/dance-os = 1596`
  - `#body-map-practice-queue = 252.55`
- `sources_m17`
  - `/dance-os = 1596`
  - `#dance-sources = 103.34`

局部与整屏截图复核后：

- `assets_mneg12` 已开始更接近风险边界
- `body_head_m15`、`sources_m17` 的标题与正文间距更紧
- `assets_mneg10` 是收益与安全性最平衡的点

因此选择正式收：

- `.compact-library-panel { margin-bottom: -10px }`

## 正式改动

修改文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

正式值：

- `.dance-os-page #dance-assets .compact-library-panel { margin-bottom: -10px }`

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

- `baseline_mneg8`
  - `/dance-os = 1599`
  - `#dance-assets = 255.56`
- `candidate_mneg10`
  - `/dance-os = 1597`
  - `#dance-assets = 253.56`

这证明这轮收益来自这条规则本身。

## fresh `390px` broad remeasure

- `/ = 1513`
- `/daily-latin = 1596`
  - `#today-loop-demo = 224.5`
  - `#daily-library = 67.53`
  - `#live-return-bridge = 128.14`
- `/dashboard = 1600`
  - `#dashboard-witness-archive = 130.84`
  - `#dashboard-route-map = 114.59`
  - `#dashboard-structure-bar = 105.19`
  - `#dashboard-next-actions = 111.53`
- `/dance-os = 1597`
  - `#dance-assets = 253.56`
  - `#body-map-practice-queue = 255.55`
  - `#dance-sources = 106.34`

## 结论

这轮 pass 正式成立。

当前 broad mobile 排名：

- `/daily-latin = 1596`
- `/dance-os = 1597`
- `/dashboard = 1600`

## 下一步

下一轮继续保持：

- single-point only
- injected preflight 先行
- route 总高和目标 section 同降
- 截图复核后再落库

更适合继续看的点：

- `/dashboard` 的剩余安全 compact 候选
- `/dance-os` 的剩余保守 spacing 候选
