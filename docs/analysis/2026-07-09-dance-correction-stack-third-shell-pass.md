# Dance Correction Stack Third Shell Pass

## 背景

在上一轮 `Dashboard Next Actions Shell Pass` 成立之后，fresh `390px` broad mobile heights 是：

- `/ = 1513`
- `/daily-latin = 1814`
- `/dashboard = 1811`
- `/dance-os = 1816`

这意味着当轮 broad mobile Top1 是：

- `/dance-os = 1816`

继续拆 `/dance-os` 后，当前 section 高度是：

- `#correction-ledger-demo = 370.08`
- `#dance-assets = 312.56`
- `#body-map-practice-queue = 298.55`
- `#dance-summary = 174.44`
- `#dance-sources = 142.89`

进一步细拆 `#correction-ledger-demo` 后确认：

- `shell = 343.89`
- `stack = 327.89`
- `output = 296.75`
- `card1 = 117.92`
- `card2 = 106.92`
- `card3 = 95.05`

运行态命中样式是：

- `shellPadding = 7px`
- `stackGap = 4px`
- `kickerMargin = 3px`
- `choiceMargin = 4px`

这说明当前仍然是左侧 stack 在支配 section 高度，并且还有 very small 的 shell 收口空间。

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

只在最终命中的 `390px` 覆盖层里，对 `Correction Ledger Demo` 左侧 stack 再做一轮 very small shell pass：

- `.dance-os-page .compact-ledger-shell .ledger-stack`
  - `gap: 4px -> 3px`
- `.dance-os-page .compact-ledger-shell .ledger-kicker`
  - `margin-bottom: 3px -> 2px`
- `.dance-os-page .compact-ledger-shell .ledger-stack .choice-grid`
  - `margin-top: 4px -> 3px`

没有改：

- route 结构
- 数据文案
- output 结构
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
- `/daily-latin = 1814`
- `/dashboard = 1811`
- `/dance-os = 1808`

对应量化收益：

- `/dance-os 390`
  - `1816 -> 1808`
- `#correction-ledger-demo`
  - `370.08 -> 362.08`

细拆确认：

- `shell`
  - `343.89 -> 335.89`
- `stack`
  - `327.89 -> 319.89`
- `output`
  - `296.75 -> 295.75`
- `card1`
  - `117.92 -> 115.92`
- `card2`
  - `106.92 -> 103.92`
- `card3`
  - `95.05 -> 94.05`

运行态命中样式同步变为：

- `stackGap = 3px`
- `kickerMargin = 2px`
- `choiceMargin = 3px`

## 为什么这轮成立

这轮成立，因为：

1. `typecheck` 通过
2. `build` 通过
3. `route smoke` 通过
4. `browser smoke` 通过
5. fresh `390px` route 总高真实下降
6. `Correction Ledger Demo` section 高度同步明显下降
7. 收益可继续归因到左侧 stack shell，而不是测量噪音

## 结果意义

- `Correction Ledger Demo` 仍然存在稳定的 stack shell 收口空间
- `/dance-os` 继续被拉低
- broad mobile Top1 已从 `/dance-os` 切回 `/daily-latin`

## 下一步

这轮后 fresh broad mobile heights 是：

- `/daily-latin = 1814`
- `/dashboard = 1811`
- `/dance-os = 1808`

下一轮优先建议：

1. 切到 `/daily-latin`
2. 优先回看：
   - `#today-loop-demo`
   - `#daily-sources`
   - `#live-return-bridge`
3. 仍然先做 `390px` very small shell / compact copy pass
