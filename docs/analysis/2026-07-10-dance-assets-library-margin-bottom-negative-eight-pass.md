# 2026-07-10 `Dance Assets` library margin-bottom negative eight pass

## 背景

今天继续沿用 `390px` mobile compaction loop：

- single-point only
- 只有当 route 总高和目标 section 高度同时下降时才算成立

上一轮 broad mobile baseline：

- `/ = 1513`
- `/daily-latin = 1598`
- `/dashboard = 1603`
- `/dance-os = 1603`

因此这轮继续在两条并列 `1603` 的页面里寻找安全收缩点。

## 本轮目标

验证 `/dance-os` 的 `#dance-assets` library panel 是否还能继续安全下收。

目标 selector：

- `.dance-os-page #dance-assets .compact-library-panel`

baseline 值：

- `margin-bottom: -4px`

## 预检

在 `390px` 视口下先做 injected preflight：

- `assets_mneg6`
  - `/dance-os = 1601`
  - `#dance-assets = 257.56`
- `assets_mneg8`
  - `/dance-os = 1599`
  - `#dance-assets = 255.56`

随后补了局部截图复核。

复核结论：

- `-8px` 下卡片阵列仍然稳定
- section 标题与壳体节奏没有被压坏
- 没有出现内容重叠或阅读顺序混乱

因此 `-8px` 可以作为正式候选。

## 正式改动

修改文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

正式值：

- `.dance-os-page #dance-assets .compact-library-panel { margin-bottom: -8px }`

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

- `baseline_mneg4`
  - `/dance-os = 1603`
  - `#dance-assets = 259.56`
- `candidate_mneg8`
  - `/dance-os = 1599`
  - `#dance-assets = 255.56`

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
- `/dance-os = 1599`
  - `#dance-assets = 255.56`
  - `#body-map-practice-queue = 255.55`
  - `#dance-sources = 106.34`

## 结论

这轮 pass 正式成立。

当前 broad mobile 排名：

- `/daily-latin = 1598`
- `/dance-os = 1599`
- `/dashboard = 1603`

## 下一步

下一轮继续保持：

- single-point only
- injected preflight 先行
- route 总高和目标 section 同降
- 截图复核后再落库

更适合继续看的点：

- `/dashboard` 的剩余安全 compact 候选
- `/dance-os` 的剩余保守 spacing 候选
