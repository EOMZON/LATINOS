# Dashboard Witness Archive Shell Pass

## 背景

在上一轮 `Daily Loop Output Card Shell Pass` 和 `Dance Correction Stack Shell Pass` 成立之后，fresh `390px` broad mobile heights 是：

- `/ = 1513`
- `/daily-latin = 1820`
- `/dashboard = 1823`
- `/dance-os = 1828`

这意味着当轮 broad mobile Top1 是：

- `/dashboard = 1823`

继续拆 `/dashboard` 当前 section 后确认：

- `#dashboard-witness-archive = 160.84`
- `#dashboard-metrics = 159.03`
- `#dashboard-next-actions = 158.53`
- `#dashboard-route-map = 156.59`

进一步细拆 `#dashboard-witness-archive` 后确认：

- `board = 136.66`
- `summary = 41`
- `panel = 90.66`
- `list = 45.27`

同时确认当前 `390px` 最终命中层里：

- `.archive-board { gap: 5px }`
- `.archive-summary-card { padding: 7px }`
- `.archive-panel { padding: 7px }`

这说明当前更高 ROI 的不是继续动文案，而是继续只收 compact shell。

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

只在最终命中的 `390px` 覆盖层里，对 `Witness Archive` 做 very small shell pass：

- `.archive-board`
  - `gap: 5px -> 4px`
- `.archive-summary-card`
  - `padding: 7px -> 6px`
- `.archive-panel`
  - `padding: 7px -> 6px`

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
- `/daily-latin = 1820`
- `/dashboard = 1822`
- `/dance-os = 1828`

对应量化收益：

- `/dashboard 390`
  - `1823 -> 1822`
- `#dashboard-witness-archive`
  - `160.84 -> 159.84`

细拆确认：

- `board`
  - `136.66 -> 135.66`
- `summary`
  - `41 -> 41`
- `panel`
  - `90.66 -> 90.66`

## 为什么这轮成立

这轮成立，因为：

1. `typecheck` 通过
2. `build` 通过
3. `route smoke` 通过
4. `browser smoke` 通过
5. fresh `390px` route 总高真实下降
6. `Witness Archive` section 高度也同步下降

## 结果意义

- `/dashboard` 仍然存在 shell 级 very small 收口空间
- `Witness Archive` 这块当前还能稳定拿到 1px 级收益
- 这轮后 `/dashboard` 仍然是 broad mobile Top1，但与 `daily-latin` 的差距继续缩小

## 下一步

这轮后 fresh broad mobile heights 是：

- `/daily-latin = 1820`
- `/dashboard = 1822`
- `/dance-os = 1828`

下一轮优先建议：

1. 继续留在 `/dashboard`
2. 优先回看：
   - `#dashboard-metrics = 159.03`
   - `#dashboard-next-actions = 158.53`
3. 仍然先做 `390px` very small shell / compact copy pass
