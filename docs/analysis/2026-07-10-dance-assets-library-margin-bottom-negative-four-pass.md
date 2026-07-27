# 2026-07-10 `Dance Assets` library margin-bottom negative four pass

## 背景

今天继续沿用 `390px` mobile compaction loop：

- single-point only
- 只有当 route 总高和目标 section 高度同时下降时才算成立

上一轮 broad mobile baseline：

- `/ = 1513`
- `/daily-latin = 1598`
- `/dashboard = 1609`
- `/dance-os = 1618`

因此这轮继续优先看 `dance-os`。

## 本轮目标

验证 `/dance-os` 的 `#dance-assets` library panel 是否还能安全下收。

目标 selector：

- `.dance-os-page #dance-assets .compact-library-panel`

baseline 值：

- `margin-bottom: 0`

## 预检

在 `390px` 视口下先做 injected preflight，重点比较：

- `assets_library_mneg2`
  - `/dance-os = 1616`
  - `#dance-assets = 261.56`
- `assets_library_mneg4`
  - `/dance-os = 1614`
  - `#dance-assets = 259.56`

局部截图复核后：

- `-4px` 仍然保持 section 壳体和卡片阵列稳定
- 没有出现标题被顶坏或模块层级混乱

因此 `-4px` 可以作为正式候选。

## 正式改动

修改文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

正式值：

- `.dance-os-page #dance-assets .compact-library-panel { margin-bottom: -4px }`

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

- `baseline_mb0`
  - `/dance-os = 1618`
  - `#dance-assets = 263.56`
- `candidate_mbneg4`
  - `/dance-os = 1614`
  - `#dance-assets = 259.56`

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
- `/dance-os = 1614`
  - `#dance-assets = 259.56`
  - `#body-map-practice-queue = 261.55`
  - `#dance-sources = 111.34`

## 结论

这轮 pass 正式成立。

当前 broad mobile 排名：

- `/daily-latin = 1598`
- `/dashboard = 1609`
- `/dance-os = 1614`

## 下一步

下一轮继续保持：

- single-point only
- injected preflight 先行
- route 总高和目标 section 同降
- 截图复核后再落库

更适合继续看的点：

- `/dashboard` 的更保守 compact 候选
- `/dance-os` 的 bodymap / sources 安全压缩候选
