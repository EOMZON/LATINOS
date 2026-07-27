# Dance Correction Stack Shell Pass

## 背景

在上一轮 `Daily Loop Output Card Shell Pass` 成立之后，fresh `390px` broad mobile heights 是：

- `/ = 1513`
- `/daily-latin = 1820`
- `/dashboard = 1823`
- `/dance-os = 1840`

这意味着当轮 broad mobile Top1 是：

- `/dance-os = 1840`

继续拆 `/dance-os` 后，当前 section 高度是：

- `#correction-ledger-demo = 394.08`
- `#dance-assets = 312.56`
- `#body-map-practice-queue = 298.55`
- `#dance-summary = 174.44`
- `#dance-sources = 142.89`

## 为什么这轮选 `#correction-ledger-demo`

继续细拆 `#correction-ledger-demo` 后确认：

- `shell = 367.89`
- `grid = 351.89`
- `stack = 351.89`
- `card1 = 125.92`
- `card2 = 114.92`
- `card3 = 103.05`
- `output = 309.75`

上一轮曾先尝试收右侧 output shell，但 fresh `390px` route 总高没有变化，说明真正支配 section 高度的不是右侧 output，而是左侧 stack。

进一步拆左侧 stack 后确认：

- `STEP 1` 四个 state button：
  - 单个 `40px`
- `STEP 2` profile / focus button：
  - profile button `34px`
  - focus button `34px`
- `STEP 3` checklist item：
  - 单个 `26.06`

而当前最终命中 `390px` 层里仍然是：

- `choice-grid:not(.compact) .choice-btn { min-height: 40px }`
- `.choice-btn.compact { min-height: 34px }`
- `.ledger-check-item { padding: 5px }`

所以这轮最高 ROI 是继续只收左侧 stack shell，而不是再碰 output。

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

只在最终命中的 `@media (min-width:390px) and (max-width:430px)` 覆盖层里，对 `Correction Ledger Demo` 左侧 stack 做 very small pass：

- `.choice-grid:not(.compact) .choice-btn`
  - `min-height: 40px -> 38px`
- `.choice-btn.compact`
  - `min-height: 34px -> 32px`
- `.ledger-check-item`
  - `padding: 5px -> 4px`

没有改：

- route 结构
- 数据文案
- 交互逻辑
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
- `/dashboard = 1823`
- `/dance-os = 1828`

对应量化收益：

- `/dance-os 390`
  - `1840 -> 1828`
- `#correction-ledger-demo`
  - `394.08 -> 382.08`

其余关键 section 保持：

- `#dance-assets = 312.56`
- `#body-map-practice-queue = 298.55`
- `#dance-summary = 174.44`
- `#dance-sources = 142.89`

## 为什么这轮成立

这轮成立，因为：

1. `typecheck` 通过
2. `build` 通过
3. `route smoke` 通过
4. `browser smoke` 通过
5. fresh `390px` route 总高真实下降
6. 收益可直接归因到左侧 stack shell 收紧，而不是测量噪音

## 结果意义

- `Correction Ledger Demo` 仍然存在真实的 stack shell 收口空间
- `/dance-os` 这一轮被明显拉低
- broad mobile Top1 已从 `/dance-os` 切到 `/dashboard`

## 下一步

这轮后 fresh broad mobile heights 是：

- `/daily-latin = 1820`
- `/dashboard = 1823`
- `/dance-os = 1828`

下一轮优先建议：

1. 切到 `/dashboard`
2. 优先回看：
   - `#dashboard-witness-archive = 160.84`
   - `#dashboard-metrics = 159.03`
   - `#dashboard-next-actions = 158.53`
3. 仍然先做 `390px` very small pass
