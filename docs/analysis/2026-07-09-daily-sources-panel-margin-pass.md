# Daily Sources Panel Margin Pass

## 背景

在上一轮 fresh `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1709`
- `/dashboard = 1706`
- `/dance-os = 1702`

因此当前 broad mobile Top1 仍然是：

- `/daily-latin = 1709`

fresh 拆 `/daily-latin` 后，当前主要 section 是：

- `#today-loop-demo = 246.50`
- `#live-return-bridge = 140.14`
- `#daily-overview = 129.06`
- `#daily-sources = 127.06`
- `#legacy-daily-principles = 125.02`
- `#daily-library = 121.53`

因此这一轮继续只在：

- `#today-loop-demo`
- `#live-return-bridge`
- `#daily-sources`
- `#daily-library`

里做 very small runtime preflight。

## preflight

基线：

- route:
  - `/daily-latin = 1709`
- sections:
  - `#today-loop-demo = 246.50`
  - `#live-return-bridge = 140.14`
  - `#daily-sources = 127.06`
  - `#daily-library = 121.53`
  - `#legacy-daily-principles = 125.02`

候选结果：

- `daily-sources-panel-mb3`
  - `/daily-latin: 1709 -> 1707`
  - `#daily-sources: 127.06 -> 125.06`
- `daily-library-min30`
  - `/daily-latin: 1709 -> 1707`
  - `#daily-library: 121.53 -> 119.53`
- `daily-live-btn-pad1x5`
  - `/daily-latin: 1709 -> 1707`
  - `#live-return-bridge: 140.14 -> 138.14`

其余候选：

- `daily-library-grid-gap1`
  - 只有 `-1px`
- `daily-legacy-head-mb4`
  - 只有 `-1px`
- `today-loop-sechead-mb2`
  - 只有 `-1px`
- `daily-sources-row-pad0x1`
  - 无收益
- `daily-live-panel-gap4`
  - 无收益

这一轮最终选择：

- `.daily-latin-page #daily-sources .compact-source-matrix-daily-side-panel`
- `margin-bottom: 3px`

原因：

- route 与目标 section 同时下降
- 只动外部间距，不碰内容密度和交互区
- 相比继续压按钮或 card 最小高度，这刀更稳、更不容易引入可读性副作用

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.daily-latin-page #daily-sources .compact-source-matrix-daily-side-panel`
- 收成：
  - `margin-bottom: 3px`

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
  - `1709 -> 1707`
- `#daily-sources`
  - `127.06 -> 125.06`
- `#today-loop-demo`
  - `246.50 -> 246.50`
- `#live-return-bridge`
  - `140.14 -> 140.14`
- `#daily-overview`
  - `129.06 -> 129.06`
- `#daily-library`
  - `121.53 -> 121.53`
- `#legacy-daily-principles`
  - `125.02 -> 125.02`

fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1707`
- `/dashboard = 1706`
- `/dance-os = 1702`

## 结论

这是一轮成立的 `/daily-latin` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

这轮后 broad mobile Top1 仍然是：

- `/daily-latin = 1707`

但与下一名的差距已经缩到：

- `/daily-latin = 1707`
- `/dashboard = 1706`

因此下一轮如果继续沿着同一主线推进，应先 fresh 对比 `/daily-latin` 与 `/dashboard`，再决定是否继续留在 `daily`，还是切回 `dashboard`。
