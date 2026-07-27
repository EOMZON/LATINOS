# 2026-07-10 `Live Return Bridge` head negative margin pass

## 背景

今天继续沿用 `390px` mobile compaction loop：

- single-point only
- 只有当 route 总高和目标 section 高度同时下降时才算成立

当前 broad mobile baseline：

- `/ = 1513`
- `/daily-latin = 1600`
- `/dashboard = 1609`
- `/dance-os = 1618`

因此这轮继续优先压 `daily-latin`。

## 本轮目标

验证 `/daily-latin` 的 `#live-return-bridge` section header 是否还能继续安全下收。

目标 selector：

- `.daily-latin-page #live-return-bridge .compact-sec-head`

baseline 值：

- `margin-bottom: -1px`

## 预检

在 `390px` 视口下先做 injected A/B：

- `baseline_m1`
  - `/daily-latin = 1600`
  - `#live-return-bridge = 132.14`
- `candidate_m3`
  - `/daily-latin = 1598`
  - `#live-return-bridge = 130.14`

说明：

- route 总高下降 `2px`
- 目标 section 高度下降 `2px`

因此量化上成立。

## 截图复核

局部截图复核后：

- `-3px` 仍然保持标题可读
- 没有出现 section title 被顶掉或卡片内容明显挤坏的情况

因此可以作为正式候选写回源文件。

## 正式改动

修改文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

正式值：

- `.daily-latin-page #live-return-bridge .compact-sec-head { margin-bottom: -3px }`

## 完整验证

本轮按正式链路验证：

- `pnpm typecheck`: pass
- `pnpm build`: pass
- fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`: pass
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`: pass
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`: pass
- fresh `390px` broad remeasure: pass
- injected A/B compare: pass

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
- `/dance-os = 1618`
  - `#dance-assets = 263.56`
  - `#body-map-practice-queue = 261.55`
  - `#dance-sources = 111.34`

## 结论

这轮 pass 正式成立。

当前 broad mobile Top1：

- `/daily-latin = 1598`

## 下一步

下一轮继续保持：

- single-point only
- 必须先 injected preflight
- 必须 route 总高和目标 section 同降
- 必须截图复核后再落库

更适合继续看的点：

- `/dashboard` 的更保守 compact 候选
- `/dance-os` 的安全 section spacing 候选
