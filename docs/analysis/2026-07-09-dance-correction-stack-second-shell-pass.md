# Dance Correction Stack Second Shell Pass

## 背景

在上一轮 `Dashboard Metrics Shell Pass` 成立之后，fresh `390px` broad mobile heights 是：

- `/ = 1513`
- `/daily-latin = 1820`
- `/dashboard = 1817`
- `/dance-os = 1828`

这意味着当轮 broad mobile Top1 是：

- `/dance-os = 1828`

继续拆 `/dance-os` 后，当前 section 高度是：

- `#correction-ledger-demo = 382.08`
- `#dance-assets = 312.56`
- `#body-map-practice-queue = 298.55`
- `#dance-summary = 174.44`
- `#dance-sources = 142.89`

进一步细拆 `#correction-ledger-demo` 后确认：

- `shell = 355.89`
- `stack = 339.89`
- `output = 296.75`
- `card1 = 121.92`
- `card2 = 110.92`
- `card3 = 99.05`

这说明当前真正支配 section 高度的仍然是左侧 stack，而不是右侧 output。

同时 fresh 运行态确认最终命中的 `390px` 样式是：

- `choice-btn min-height = 38px`
- `compact choice-btn min-height = 32px`
- `ledger-check-item padding = 4px`

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

只在最终命中的 `@media (min-width:390px) and (max-width:430px)` 覆盖层里，对 `Correction Ledger Demo` 左侧 stack 再做一轮 very small shell pass：

- `.dance-os-page .compact-ledger-shell .choice-grid:not(.compact) .choice-btn`
  - `min-height: 38px -> 36px`
- `.dance-os-page .compact-ledger-shell .choice-btn.compact`
  - `min-height: 32px -> 30px`
- `.dance-os-page .compact-ledger-shell .ledger-check-item`
  - `padding: 4px -> 3px`

没有改：

- route 结构
- 数据文案
- output shell
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
- `/dashboard = 1817`
- `/dance-os = 1816`

对应量化收益：

- `/dance-os 390`
  - `1828 -> 1816`
- `#correction-ledger-demo`
  - `382.08 -> 370.08`

细拆确认：

- `shell`
  - `355.89 -> 343.89`
- `stack`
  - `339.89 -> 327.89`
- `output`
  - `296.75 -> 296.75`
- `card1`
  - `121.92 -> 117.92`
- `card2`
  - `110.92 -> 106.92`
- `card3`
  - `99.05 -> 95.05`

运行态命中样式同步变为：

- `buttonMinHeight = 36px`
- `compactButtonMinHeight = 30px`
- `checklistPadding = 3px`

## 为什么这轮成立

这轮成立，因为：

1. `typecheck` 通过
2. `build` 通过
3. `route smoke` 通过
4. `browser smoke` 通过
5. fresh `390px` route 总高真实下降
6. `Correction Ledger Demo` section 高度同步明显下降
7. 下降可归因到左侧 stack shell 收紧，而不是测量噪音

## 结果意义

- `Correction Ledger Demo` 仍然存在稳定的 stack shell 收口空间
- `/dance-os` 这一轮被明显继续拉低
- broad mobile Top1 已从 `/dance-os` 切回 `/daily-latin`

## 下一步

这轮后 fresh broad mobile heights 是：

- `/daily-latin = 1820`
- `/dashboard = 1817`
- `/dance-os = 1816`

下一轮优先建议：

1. 切到 `/daily-latin`
2. 优先回看：
   - `#today-loop-demo`
   - `#daily-sources`
   - `#live-return-bridge`
3. 仍然先做 `390px` very small shell / compact copy pass
