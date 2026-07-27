# Daily Loop Shell Spacing Pass

## 背景

在 `Dashboard Mobile Header Visibility Pass` 成立后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1988`
- `/dashboard = 1984`
- `/dance-os = 1930`

这意味着：

- `/daily-latin` 重新成为 broad mobile Top1
- 但它只比 `/dashboard` 高 `4px`

## 为什么这轮继续追 `daily-latin`

fresh 拆 `daily-latin` 后，当前最厚 section 仍然是：

- `#today-loop-demo = 325.55`

继续拆内部后确认当前真实生效值是：

- `section head margin-bottom = 5px`
- `shell padding top/bottom = 7px`
- `ledger-grid gap = 6px`
- `ledger-stack gap = 5px`
- `step3 = 91.52`

所以这轮最小 ROI 的位置不是继续改按钮文字，而是：

- shell spacing

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

在最终生效的 `390px` 覆盖层里，只做 very small pass：

- `#today-loop-demo .compact-sec-head`
  - `margin-bottom: 5px -> 4px`
- `.daily-latin-page .compact-ledger-shell`
  - `padding: 7px -> 6px`
- `.daily-latin-page .compact-ledger-shell .ledger-grid`
  - `gap: 6px -> 5px`
- 保留前一轮已经成立的：
  - `ledger-stack gap`
  - `STEP 3` compact 收口

## 验证动作

继续补齐：

- `pnpm build`
- `pnpm typecheck`
- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
- fresh `390px` route sweep

## 量化结果

- `/daily-latin 390`
  - `1988 -> 1981`
- `#today-loop-demo`
  - `325.55 -> 318.55`
- `today shell`
  - `301.36 -> 295.36`
- `ledger-stack`
  - `285.36 -> 281.36`
- `step3`
  - `91.52 -> 89.52`

对应 fresh `390px` broad mobile heights：

- `/ = 1513`
- `/daily-latin = 1981`
- `/dashboard = 1984`
- `/dance-os = 1930`

## 为什么这轮成立

这轮成立，因为：

1. `verify` 通过
2. `route smoke` 通过
3. `browser smoke` 通过
4. `/daily-latin` route 总高真实下降

## 结果意义

这轮之后：

- `/daily-latin` 终于低于 `/dashboard`
- broad mobile Top1 不再是 `daily-latin`

## 下一轮建议

当前新的 broad mobile Top1 已切回：

- `/dashboard = 1984`

所以下一轮更值得继续做的是：

1. 重新拆 `/dashboard`
2. 继续找只影响 `390px` 的 very small section pass
3. 优先继续看：
   - `下一批交付`
   - `决策护栏`
   - `Proof / Risk / Gate`
