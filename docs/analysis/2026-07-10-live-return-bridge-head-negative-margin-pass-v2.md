# 2026-07-10 `Live Return Bridge` head negative margin pass v2

## 背景

今天继续沿用 `390px` mobile compaction loop：

- single-point only
- 只有当 route 总高和目标 section 高度同时下降时才算成立

上一轮 broad mobile baseline：

- `/ = 1513`
- `/daily-latin = 1598`
- `/dance-os = 1599`
- `/dashboard = 1600`

这一轮继续在当前 Top1 路由上寻找极小但安全的收缩点。

## 本轮目标

验证 `/daily-latin` 的 `#live-return-bridge` section header 是否还能继续安全下收。

目标 selector：

- `.daily-latin-page #live-return-bridge .compact-sec-head`

baseline 值：

- `margin-bottom: -3px`

## 预检

在 `390px` 视口下先做 injected preflight：

- `live_head_m4`
  - `/daily-latin = 1597`
  - `#live-return-bridge = 129.14`
- `live_head_m5`
  - `/daily-latin = 1596`
  - `#live-return-bridge = 128.14`

同时也对比了更激进的 `today-loop` 候选，但局部截图显示其更容易压到标题上缘，因此本轮优先选择 `live-return-bridge`。

局部截图复核后：

- `-5px` 仍然保持 section 结构和标题可读性
- 没有出现卡片壳体或文本重叠

因此 `-5px` 可以作为正式候选。

## 正式改动

修改文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

正式值：

- `.daily-latin-page #live-return-bridge .compact-sec-head { margin-bottom: -5px }`

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

- `baseline_m3`
  - `/daily-latin = 1598`
  - `#live-return-bridge = 130.14`
- `candidate_m5`
  - `/daily-latin = 1596`
  - `#live-return-bridge = 128.14`

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
- `/dance-os = 1599`
  - `#dance-assets = 255.56`
  - `#body-map-practice-queue = 255.55`
  - `#dance-sources = 106.34`

## 结论

这轮 pass 正式成立。

当前 broad mobile 排名：

- `/daily-latin = 1596`
- `/dance-os = 1599`
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
