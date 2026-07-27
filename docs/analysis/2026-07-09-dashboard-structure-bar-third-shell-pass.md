# Dashboard Structure Bar Third Shell Pass

## 背景

在上一轮 `Dance Correction Stack Fourth Shell Pass` 成立之后，fresh `390px` broad mobile heights 是：

- `/ = 1513`
- `/daily-latin = 1799`
- `/dashboard = 1806`
- `/dance-os = 1798`

这意味着当轮 broad mobile Top1 是：

- `/dashboard = 1806`

继续拆 `/dashboard` 当前 section 后确认：

- `#dashboard-route-map = 156.59`
- `#dashboard-structure-bar = 156.19`
- `#dashboard-witness-archive = 154.84`
- `#dashboard-guardrails = 154.56`
- `#dashboard-metrics = 154.03`

进一步细拆 `#dashboard-structure-bar` 后确认：

- `section = 156.19`
- `head = 19.19`
- `heatmap = 132`
- `barsWrap = 96`

同时确认当前 `390px` 最终命中层里：

- `.heatmap-card { padding: 12px 12px 14px }`
- `.bars { height: 96px; margin-top: 8px; gap: 3px }`
- `.bar span { bottom: -13px; font-size: 7.2px }`

这说明当前更高 ROI 的是 `Structure Bar` 的 shell，而不是先去动 `Route Map`。

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

只在最终命中的 `390px` 覆盖层里，对 `#dashboard-structure-bar` 做 very small shell pass：

- `.dashboard-page #dashboard-structure-bar .heatmap-card`
  - `padding: 12px 12px 14px -> 11px 11px 12px`
- `.dashboard-page #dashboard-structure-bar .bars`
  - `height: 96px -> 92px`
  - `margin-top: 8px -> 6px`
- `.dashboard-page #dashboard-structure-bar .bar span`
  - `bottom: -13px -> -12px`
  - `font-size: 7.2px -> 7px`

没有改：

- route 结构
- 组件逻辑
- 数据文案
- 其他 section

## 验证动作

按既定串行链验证：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh `390px` remeasure

## 量化结果

fresh `390px` broad mobile heights：

- `/ = 1513`
- `/daily-latin = 1799`
- `/dashboard = 1797`
- `/dance-os = 1798`

对应量化收益：

- `/dashboard 390`
  - `1806 -> 1797`
- `#dashboard-structure-bar`
  - `156.19 -> 147.19`

其他主要 section 保持：

- `#dashboard-route-map = 156.59`
- `#dashboard-witness-archive = 154.84`
- `#dashboard-guardrails = 154.56`
- `#dashboard-metrics = 154.03`

## 为什么这轮成立

这轮成立，因为：

1. `typecheck` 通过
2. `build` 通过
3. fresh `next start` 成功
4. `route smoke` 通过
5. `browser smoke` 通过
6. fresh `390px` route 总高真实下降
7. `Structure Bar` section 高度也同步下降

## 结果意义

- `/dashboard` 当前已不再是 broad mobile Top1
- `Structure Bar` 当前仍然存在稳定的 shell 级收口空间
- 当前 broad mobile Top1 切到：
  - `/daily-latin = 1799`

## 下一步

这轮后 fresh broad mobile heights 是：

- `/daily-latin = 1799`
- `/dashboard = 1797`
- `/dance-os = 1798`

下一轮优先建议：

1. 切到 `/daily-latin`
2. 优先回看：
   - `#live-return-bridge = 153.14`
   - `#daily-library = 151.53`
   - `#daily-overview = 150.20`
3. 仍然先做 `390px` very small shell pass
