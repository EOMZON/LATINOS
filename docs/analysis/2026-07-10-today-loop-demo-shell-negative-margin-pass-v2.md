# 2026-07-10 `Today Loop Demo` shell negative margin pass v2

## 背景

今天继续沿用 `390px` mobile compaction loop：

- single-point only
- 只有当 route 总高和目标 section 高度同时下降时才算成立

上一轮 broad mobile baseline：

- `/ = 1513`
- `/daily-latin = 1596`
- `/dance-os = 1597`
- `/dashboard = 1600`

因此这轮继续在当前 Top1 路由上寻找更安全但仍有收益的压缩点。

## 本轮目标

验证 `/daily-latin` 的 `#today-loop-demo` shell 是否还能继续安全上提。

目标 selector：

- `.daily-latin-page #today-loop-demo .compact-ledger-shell`

baseline 值：

- `margin-top: -10px`

## 预检

在 `390px` 视口下先做 injected preflight：

- `today_m15`
  - `/daily-latin = 1591`
  - `#today-loop-demo = 219.5`
- `today_m16`
  - `/daily-latin = 1590`
  - `#today-loop-demo = 218.5`

同时也对比了：

- `live_head_m5`
  - `/daily-latin = 1596`
  - `#live-return-bridge = 126.14`

截图复核后：

- `today_m16` 已更接近风险边界
- `today_m15` 在两列工作台和 section 标题关系上更稳

随后补了带上下文的 viewport 截图，确认 `today_m15` 没有破坏上方信息模块与当前 demo section 的节奏。

## 正式改动

修改文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

正式值：

- `.daily-latin-page #today-loop-demo .compact-ledger-shell { margin-top: -15px }`

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

- `baseline_m10`
  - `/daily-latin = 1596`
  - `#today-loop-demo = 224.5`
- `candidate_m15`
  - `/daily-latin = 1591`
  - `#today-loop-demo = 219.5`

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

- single-point only
- injected preflight 先行
- route 总高和目标 section 同降
- 截图复核后再落库

更适合继续看的点：

- `/dashboard` 的剩余安全 compact 候选
- `/dance-os` 的剩余保守 spacing 候选
