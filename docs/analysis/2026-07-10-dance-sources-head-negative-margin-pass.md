# 2026-07-10 `Dance Sources` head negative margin pass

## 背景

今天继续沿用 `390px` mobile compaction loop：

- single-point only
- 只有当 route 总高和目标 section 高度同时下降时才算成立

上一轮 broad mobile baseline：

- `/ = 1513`
- `/daily-latin = 1598`
- `/dashboard = 1609`
- `/dance-os = 1614`

因此这轮继续优先看 `dance-os`。

## 本轮目标

验证 `/dance-os` 的 `#dance-sources` section header 是否还能安全下收。

目标 selector：

- `.dance-os-page #dance-sources .compact-sec-head`

baseline 值：

- `margin-bottom: -9px`

## 预检

在 `390px` 视口下先做 injected preflight：

- `sources_m13`
  - `/dance-os = 1610`
  - `#dance-sources = 107.34`
- `sources_m14`
  - `/dance-os = 1609`
  - `#dance-sources = 106.34`

随后补了局部 section 截图和带上下文的 viewport 截图复核。

复核结论：

- `-14px` 的 section 节奏仍然稳定
- 没有出现标题壳体被挤坏、卡片重叠或阅读顺序失控

因此 `-14px` 可以作为正式候选。

## 正式改动

修改文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

正式值：

- `.dance-os-page #dance-sources .compact-sec-head { margin-bottom: -14px }`

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

- `baseline_m9`
  - `/dance-os = 1614`
  - `#dance-sources = 111.34`
- `candidate_m14`
  - `/dance-os = 1609`
  - `#dance-sources = 106.34`

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
- `/dance-os = 1609`
  - `#dance-assets = 259.56`
  - `#body-map-practice-queue = 261.55`
  - `#dance-sources = 106.34`

## 结论

这轮 pass 正式成立。

当前 broad mobile 排名：

- `/daily-latin = 1598`
- `/dashboard = 1609`
- `/dance-os = 1609`

## 下一步

下一轮继续保持：

- single-point only
- injected preflight 先行
- route 总高和目标 section 同降
- 截图复核后再落库

更适合继续看的点：

- `/dashboard` 的保守 compact 候选
- `/dance-os` 的 bodymap 安全压缩候选
