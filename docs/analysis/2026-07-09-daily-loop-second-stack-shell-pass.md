# Daily Loop Second Stack Shell Pass

## 背景

在上一轮 `Dance Correction Stack Third Shell Pass` 成立之后，fresh `390px` broad mobile heights 是：

- `/ = 1513`
- `/daily-latin = 1814`
- `/dashboard = 1811`
- `/dance-os = 1808`

这意味着当轮 broad mobile Top1 是：

- `/daily-latin = 1814`

继续拆 `/daily-latin` 后，当前主要 section 高度是：

- `#today-loop-demo = 256.50`
- `#daily-sources = 158.06`
- `#live-return-bridge = 153.14`
- `#daily-library = 151.53`

进一步细拆 `#today-loop-demo` 后确认：

- `shell = 234.31`
- `stack = 220.31`
- `output = 216.28`
- `STEP 1 = 79.16`
- `STEP 2 = 56.16`
- `STEP 3 = 81.00`

运行态命中样式是：

- `btnMinHeight = 22px`
- `compactBtnMinHeight = 22px`
- `taskPadding = 3px 4px`
- `gridGap = 2px`

这说明当前仍然是左侧 stack 在支配 `Today Loop Demo` 高度，并且按钮与 task toggle 还存在一轮 very small shell 收口空间。

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

只在最终命中的 `390px` 覆盖层里，对 `Today Loop Demo` 左侧 stack 再做一轮 very small shell pass：

- `.daily-latin-page .compact-ledger-shell .choice-grid:not(.compact) .choice-btn`
  - `min-height: 22px -> 20px`
- `.daily-latin-page .compact-ledger-shell .choice-btn.compact`
  - `min-height: 22px -> 20px`
- `.daily-latin-page .compact-ledger-shell .daily-task-toggle`
  - `padding: 3px 4px -> 2px 4px`

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
- `/daily-latin = 1810`
- `/dashboard = 1811`
- `/dance-os = 1808`

对应量化收益：

- `/daily-latin 390`
  - `1814 -> 1810`
- `#today-loop-demo`
  - `256.50 -> 252.47`

细拆确认：

- `shell`
  - `234.31 -> 230.28`
- `stack`
  - `220.31 -> 210.31`
- `output`
  - `216.28 -> 216.28`
- `STEP 1`
  - `79.16 -> 75.16`
- `STEP 2`
  - `56.16 -> 54.16`
- `STEP 3`
  - `81.00 -> 77.00`

运行态命中样式同步变为：

- `btnMinHeight = 20px`
- `compactBtnMinHeight = 20px`
- `taskPadding = 2px 4px`

## 为什么这轮成立

这轮成立，因为：

1. `typecheck` 通过
2. `build` 通过
3. `route smoke` 通过
4. `browser smoke` 通过
5. fresh `390px` route 总高真实下降
6. `Today Loop Demo` section 高度同步明显下降
7. 收益可继续归因到左侧 stack shell，而不是测量噪音

## 结果意义

- `Today Loop Demo` 仍然存在稳定的 stack shell 收口空间
- `/daily-latin` 被继续拉低到与 `/dashboard` 只差 `1px`
- broad mobile Top1 已从 `/daily-latin` 切回 `/dashboard`

## 下一步

这轮后 fresh broad mobile heights 是：

- `/daily-latin = 1810`
- `/dashboard = 1811`
- `/dance-os = 1808`

下一轮优先建议：

1. 切到 `/dashboard`
2. 优先回看：
   - `#dashboard-witness-archive`
   - `#dashboard-route-map`
   - `#dashboard-next-actions`
3. 仍然先做 `390px` very small shell / compact copy pass
