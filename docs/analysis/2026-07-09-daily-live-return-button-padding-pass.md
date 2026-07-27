# Daily Live Return Button Padding Pass

## 背景

在上一轮 fresh `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1705`
- `/dashboard = 1702`
- `/dance-os = 1702`

因此当前 broad mobile Top1 仍然是：

- `/daily-latin = 1705`

fresh 拆 `/daily-latin` 后，当前主要 section 是：

- `#today-loop-demo = 246.50`
- `#live-return-bridge = 140.14`
- `#daily-overview = 129.06`
- `#daily-sources = 125.06`
- `#legacy-daily-principles = 125.02`
- `#daily-library = 119.53`

因此这一轮继续只在几个 very small 候选里做 runtime preflight，优先选择不破坏结构边界的小刀。

## preflight

基线：

- route:
  - `/daily-latin = 1705`
- sections:
  - `#live-return-bridge = 140.14`
  - `#legacy-daily-principles = 125.02`
  - `#today-loop-demo = 246.50`
  - `#daily-sources = 125.06`

候选结果：

- `daily-live-btn-pad1x5`
  - `/daily-latin: 1705 -> 1703`
  - `#live-return-bridge: 140.14 -> 138.14`

其余候选：

- `daily-live-actions-gap2`
  - 只有 `-1px`
- `daily-legacy-head-mb4`
  - 只有 `-1px`
- `today-loop-sechead-mb2`
  - 只有 `-1px`
- `daily-sources-row-pad0x1`
  - 无收益

这一轮最终选择：

- `.daily-latin-page #live-return-bridge .compact-daily-return-board .bodymap-actions .btn`
- `padding: 1px 5px`

原因：

- route 与目标 section 同时下降
- 只动 very small button padding，不改结构层级和数据层
- 相比继续压 section head 间距，这刀收益更高

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.daily-latin-page #live-return-bridge .compact-daily-return-board .bodymap-actions .btn`
- 收成：
  - `padding: 1px 5px`

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
  - `1705 -> 1703`
- `#live-return-bridge`
  - `140.14 -> 138.14`
- `#today-loop-demo`
  - `246.50 -> 246.50`
- `#daily-overview`
  - `129.06 -> 129.06`
- `#daily-sources`
  - `125.06 -> 125.06`
- `#daily-library`
  - `119.53 -> 119.53`
- `#legacy-daily-principles`
  - `125.02 -> 125.02`

fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1703`
- `/dashboard = 1702`
- `/dance-os = 1702`

## 结论

这是一轮成立的 `/daily-latin` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

这轮后 broad mobile Top1 仍然是：

- `/daily-latin = 1703`

而第二名仍是并列：

- `/dashboard = 1702`
- `/dance-os = 1702`

因此下一轮如果继续沿着同一主线推进，默认仍应先 fresh 对比这三条 route，再决定是否继续留在 `daily`，还是切到 `dashboard / dance-os`。
