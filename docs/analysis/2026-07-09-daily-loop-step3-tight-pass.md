# Daily Loop Step3 Tight Pass

## 背景

在 `Daily Latin entry-state compact height pass` 成立后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1999`
- `/dashboard = 1988`
- `/dance-os = 1930`

这意味着：

- `/daily-latin` 仍然是 broad mobile Top1
- 但只比 `/dashboard` 高 `11px`

## 为什么这轮继续追 `daily-latin`

重新拆 `daily-latin` 后，当前最厚的 section 仍然是：

- `#today-loop-demo = 336.55`

继续拆 `Today Loop Demo` 内部后确认：

- `today shell = 312.36`
- `step1 = 109.42`
- `step2 = 76.42`
- `step3 = 100.52`

这说明：

- `STEP 1 / STEP 2` 已经被上一轮压薄
- 下一轮更值得继续拿最小 ROI 的位置是：
  - `STEP 3`

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

这轮没有继续动：

- output 区
- route 级 section header
- 其他 route

而是只对 `390px` 下 `daily-latin` `Today Loop Demo` 的 `STEP 3` 做 very small compact pass：

- 收 `daily-task-list` 的 `gap`
- 收 `daily-task-list` 的 `margin-top`
- 收 `daily-task-toggle` 的内部 `gap`
- 收 `daily-task-toggle` 的 `padding`

目的不是让局部“看起来更紧”，而是测试：

- `STEP 3` 这块是否还能继续真实拉低 route 总高

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
  - `1999 -> 1993`
- `#today-loop-demo`
  - `336.55 -> 330.55`
- `today shell`
  - `312.36 -> 306.36`
- `step3`
  - `100.52 -> 94.52`
- `step3 buttons`
  - `[24.55, 24.55, 24.55, 24.55] -> [22.55, 22.55, 22.55, 22.55]`

对应 fresh `390px` broad mobile heights：

- `/ = 1513`
- `/daily-latin = 1993`
- `/dashboard = 1988`
- `/dance-os = 1930`

## 为什么这轮成立

这轮不是局部错觉，而是真正成立的 pass，因为：

1. `verify` 通过
2. `route smoke` 通过
3. `browser smoke` 通过
4. route 总高真实下降

## 下一轮建议

这轮后：

- `/daily-latin` 仍然是 broad mobile Top1
- 但只比 `/dashboard` 高 `5px`

所以下一轮更值得做的是：

1. 允许继续追 `daily-latin` 的 very small pass
2. 也允许切到 `/dashboard`
3. 谁更容易拿到 `5px` 以上，就先做谁
