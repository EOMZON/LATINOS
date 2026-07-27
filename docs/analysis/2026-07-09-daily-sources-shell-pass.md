# Daily Sources Shell Pass

## 背景

在上一轮 `Dashboard Witness Archive Third Shell Pass` 成立之后，fresh `390px` broad mobile heights 是：

- `/ = 1513`
- `/daily-latin = 1810`
- `/dashboard = 1806`
- `/dance-os = 1808`

这意味着当轮 broad mobile Top1 是：

- `/daily-latin = 1810`

继续拆 `/daily-latin` 当前 section 后确认：

- `#today-loop-demo = 252.47`
- `#daily-sources = 158.06`
- `#live-return-bridge = 153.14`
- `#daily-library = 151.53`
- `#daily-overview = 150.20`

中途验证了两轮 `Today Loop Demo` 的 shell / output pass，但 route 总高和 section 高度都没有下降，因此不算成立改动，也没有写入长期结论。

转而重新拆 `#daily-sources` 后确认：

- `section = 158.06`
- `head = 19.19`
- `matrix = 135.88`
- `panel = 56.44`

同时确认当前 `390px` 最终命中层里：

- `.compact-source-matrix-daily-side { padding: 3px; gap: 3px }`
- `.compact-source-matrix-daily-side-panel { padding: 4px; gap: 4px; margin-bottom: 6px }`
- `.source-panel-title { margin-bottom: 2px }`
- `.source-row { padding: 2px 3px }`

这说明当前更高 ROI 的不是继续动 `Today Loop Demo`，而是对 `Daily Sources` 做 very small shell pass。

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

只在最终命中的 `390px` 覆盖层里，对 `#daily-sources` 做 very small shell pass：

- `.daily-latin-page #daily-sources .compact-source-matrix-daily-side`
  - `padding: 3px -> 2px`
  - `gap: 3px -> 2px`
- `.daily-latin-page #daily-sources .compact-source-matrix-daily-side-panel`
  - `padding: 4px -> 3px`
  - `gap: 4px -> 3px`
  - `margin-bottom: 6px -> 5px`
- `.daily-latin-page #daily-sources .compact-source-matrix-daily-side-panel .source-panel-title`
  - `margin-bottom: 2px -> 1px`
- `.daily-latin-page #daily-sources .compact-source-matrix-daily-side-panel .source-row`
  - `padding: 2px 3px -> 2px 2px`

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
- `/dashboard = 1806`
- `/dance-os = 1808`

对应量化收益：

- `/daily-latin 390`
  - `1810 -> 1799`
- `#daily-sources`
  - `158.06 -> 147.06`

其他主要 section 保持：

- `#today-loop-demo = 252.47`
- `#live-return-bridge = 153.14`
- `#daily-library = 151.53`
- `#daily-overview = 150.20`

## 为什么这轮成立

这轮成立，因为：

1. `typecheck` 通过
2. `build` 通过
3. fresh `next start` 成功
4. `route smoke` 通过
5. `browser smoke` 通过
6. fresh `390px` route 总高真实下降
7. `Daily Sources` section 高度也同步下降

## 结果意义

- `/daily-latin` 当前已不再是 broad mobile Top1
- `Daily Sources` 这块当前仍然存在稳定的 shell 级收口空间
- 当前 broad mobile Top1 切到：
  - `/dance-os = 1808`

## 下一步

这轮后 fresh broad mobile heights 是：

- `/daily-latin = 1799`
- `/dashboard = 1806`
- `/dance-os = 1808`

下一轮优先建议：

1. 切到 `/dance-os`
2. 优先回看：
   - `#correction-ledger-demo = 362.08`
3. 仍然先做 `390px` very small shell / stack pass
