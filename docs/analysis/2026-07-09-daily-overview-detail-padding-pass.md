# Daily Overview Detail Padding Pass

## 背景

在上一轮 fresh `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1711`
- `/dashboard = 1706`
- `/dance-os = 1702`

因此当前 broad mobile Top1 仍然是：

- `/daily-latin = 1711`

fresh 拆 `/daily-latin` 后，当前主要 section 是：

- `#today-loop-demo = 246.50`
- `#live-return-bridge = 140.14`
- `#daily-overview = 131.06`
- `#daily-sources = 127.06`
- `#legacy-daily-principles = 125.02`
- `#daily-library = 121.53`

这意味着虽然 `today-loop-demo` 仍然最高，但从既往收益看，最强候选不一定来自最大 section，而更可能来自结构更稳定、压缩空间更明确的小外壳。

因此这一轮先不直接改文件，而是先做 very small runtime preflight。

## preflight

基线：

- route:
  - `/daily-latin = 1711`
- sections:
  - `#today-loop-demo = 246.50`
  - `#live-return-bridge = 140.14`
  - `#daily-overview = 131.06`
  - `#daily-sources = 127.06`
  - `#daily-library = 121.53`

候选结果：

- `daily-sources-panel-mb3`
  - `/daily-latin: 1711 -> 1709`
  - `#daily-sources: 127.06 -> 125.06`
- `daily-library-min30`
  - `/daily-latin: 1711 -> 1709`
  - `#daily-library: 121.53 -> 119.53`
- `daily-live-btn-pad1x5`
  - `/daily-latin: 1711 -> 1709`
  - `#live-return-bridge: 140.14 -> 138.14`
- `daily-overview-detail-pad7`
  - `/daily-latin: 1711 -> 1709`
  - `#daily-overview: 131.06 -> 129.06`

其余候选：

- `daily-library-grid-gap1`
  - 只有 `-1px`
- `daily-live-actions-gap2`
  - 只有 `-1px`
- `today-loop-sechead-mb2`
  - 只有 `-1px`
- `daily-sources-panel-gap1`
  - 无收益
- `daily-overview-stage-pad5`
  - 无收益
- `today-loop-output-pad1`
  - 无收益

这一轮最终选择：

- `.daily-latin-page #daily-overview .compact-detail-daily-top`
- `padding: 7px 7px 6px`

原因：

- route 与目标 section 同时下降
- 只动单一壳体，不碰交互区、不碰按钮、不碰组件结构
- 相比继续压 `live-return` 的按钮 padding，这刀对长期可维护性更稳

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.daily-latin-page #daily-overview .compact-detail-daily-top`
- 收成：
  - `padding: 7px 7px 6px`

## 验证链

按既定串行顺序完成：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh `390px` remeasure

结果：

- `typecheck`: pass
- `build`: pass
- `route smoke`: pass
- `browser smoke`: pass
- mobile overflow:
  - `home`: no overflow
  - `daily-latin`: no overflow

## 量化结果

fresh `390px` remeasure：

- `/daily-latin`
  - `1711 -> 1709`
- `#daily-overview`
  - `131.06 -> 129.06`
- `#today-loop-demo`
  - `246.50 -> 246.50`
- `#live-return-bridge`
  - `140.14 -> 140.14`
- `#daily-sources`
  - `127.06 -> 127.06`
- `#daily-library`
  - `121.53 -> 121.53`
- `#legacy-daily-principles`
  - `125.02 -> 125.02`

fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1709`
- `/dashboard = 1706`
- `/dance-os = 1702`

## 结论

这是一轮成立的 `/daily-latin` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

这轮后 broad mobile Top1 仍然是：

- `/daily-latin = 1709`

但与下一名的差距继续缩小到：

- `/daily-latin = 1709`
- `/dashboard = 1706`

因此下一轮如果继续沿着同一主线推进，仍应先 fresh 拆 `/daily-latin`，优先重看：

- `#today-loop-demo`
- `#live-return-bridge`
- `#daily-sources`
