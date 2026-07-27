# 2026-07-10 `Body Map Practice Queue` head negative margin pass

## 背景

今天继续沿用 `390px` mobile compaction loop：

- single-point only
- 只有当 route 总高和目标 section 高度同时下降时才算成立

上一轮 broad mobile baseline：

- `/ = 1513`
- `/daily-latin = 1598`
- `/dashboard = 1609`
- `/dance-os = 1609`

这一轮继续优先看与 `/dashboard` 并列的 `/dance-os`。

## 本轮目标

验证 `/dance-os` 的 `#body-map-practice-queue` section header 是否还能安全下收。

目标 selector：

- `.dance-os-page #body-map-practice-queue .compact-sec-head`

baseline 值：

- `margin-bottom: -6px`

## 预检

在 `390px` 视口下先做 injected preflight：

- `body_head_m11`
  - `/dance-os = 1604`
  - `#body-map-practice-queue = 256.55`
- `body_head_m12`
  - `/dance-os = 1603`
  - `#body-map-practice-queue = 255.55`

同时也试了：

- `body_panel_m12`
  - `/dance-os = 1603`
  - `#body-map-practice-queue = 255.55`

随后补了局部 section 截图和带上下文的 viewport 截图复核。

复核结论：

- `-12px` 的 section 头部仍然安全
- 上一块与当前块之间没有出现重叠、节奏断裂或标题可读性问题

因此选择直接收：

- `.compact-sec-head { margin-bottom: -12px }`

## 正式改动

修改文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

正式值：

- `.dance-os-page #body-map-practice-queue .compact-sec-head { margin-bottom: -12px }`

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

- `baseline_m6`
  - `/dance-os = 1609`
  - `#body-map-practice-queue = 261.55`
- `candidate_m12`
  - `/dance-os = 1603`
  - `#body-map-practice-queue = 255.55`

这证明这轮收益来自这条规则本身。

## fresh `390px` broad remeasure

- `/ = 1513`
- `/daily-latin = 1598`
  - `#today-loop-demo = 224.5`
  - `#daily-library = 67.53`
  - `#live-return-bridge = 130.14`
- `/dashboard = 1609`
  - `#dashboard-witness-archive = 130.84`
  - `#dashboard-route-map = 114.59`
  - `#dashboard-structure-bar = 111.19`
  - `#dashboard-next-actions = 114.53`
- `/dance-os = 1603`
  - `#dance-assets = 259.56`
  - `#body-map-practice-queue = 255.55`
  - `#dance-sources = 106.34`

## 结论

这轮 pass 正式成立。

当前 broad mobile 排名：

- `/daily-latin = 1598`
- `/dance-os = 1603`
- `/dashboard = 1609`

## 下一步

下一轮继续保持：

- single-point only
- injected preflight 先行
- route 总高和目标 section 同降
- 截图复核后再落库

更适合继续看的点：

- `/dashboard` 的保守 compact 候选
- `/dance-os` 的剩余安全 spacing 候选
