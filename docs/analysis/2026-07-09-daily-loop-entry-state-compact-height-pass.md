# Daily Loop Entry State Compact Height Pass

## 背景

在按既定 Goal 主线重新执行 fresh 验证链后，当前 `390px` broad mobile route heights 回到：

- `/ = 1513`
- `/daily-latin = 2011`
- `/dashboard = 1988`
- `/dance-os = 1930`

这说明当前新的 broad mobile Top1 再次回到：

- `/daily-latin = 2011`

## 为什么这轮继续选 `daily-latin`

重新拆 `daily-latin` section 后，当前最厚的是：

- `#today-loop-demo = 348.55`
- `#live-return-bridge = 197.48`
- `#daily-library = 185.58`
- `#daily-sources = 184.06`

这意味着这轮最值得继续追的不是 header pass，也不是 `Daily Return`，而是继续回到：

- `Today Loop Demo`

## 先做了什么验证

这轮没有直接沿用记忆里的判断，而是先重新跑了完整 fresh 链：

- `pnpm build`
- fresh `next start --hostname 127.0.0.1 --port 3200`
- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

同时，这轮先发现了一个真实回归：

- `DailyReturnBoard` 之前一轮未验证改动把 compact 空状态下的 `NEXT DAILY QUEUE` 整块隐藏了
- 导致 `structure smoke` 报错：
  - `Daily Latin is missing the next daily queue panel`

所以这轮先修复回归，再继续追新的 compact pass。

## 这轮先修的回归

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/daily-return-board.tsx`

做法：

- 不再在 compact + empty queue 时整块隐藏 `NEXT DAILY QUEUE`
- 改成：
  - 始终保留 queue panel 结构
  - 但空状态继续走 compact empty copy

作用：

- 恢复 `verify` 与 `structure smoke`
- 不回退到大范围样式或结构重写

## 这轮成立的 compact pass

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 过程判断

先重新拆 `Today Loop Demo` 内部高度，确认当前支配高度的是左侧 `stack`，而不是右侧 `output`：

- `today shell = 324.36`
- `ledger stack = 308.36`
- `step1 = 117.42`
- `step2 = 80.42`
- `step3 = 100.52`
- `ledger output = 249.02`

继续往里拆后确认：

- `STEP 1` 的 4 个状态按钮仍然各是 `34px`
- `STEP 2` 的 3 个按钮也仍然各是 `34px`

也就是说，当前 route 高度继续被：

- `Entry State`
- `Today Dance`

这两组 compact button 壳体顶着。

## 第一刀为什么不算成立

这轮先尝试过一刀 very small pass：

- 直接改 `choice-btn` 的 compact 高度规则

但 first attempt 虽然局部更紧，fresh `390px` route height 仍然没有变化：

- `/daily-latin = 2011`

所以没有把那刀记成成立 pass。

## 真正成立的那一刀

继续排查后确认：

- 前面的调整被后面更晚生效的一组 `390px` `daily-latin` media query 覆盖了

所以最终成立的一刀不是“再改一次同样逻辑”，而是：

- 直接修改最终生效的 `390px` 规则
- 把 `daily-latin` `Today Loop Demo` 中 `STEP 1 / STEP 2` 状态按钮壳体从 `34px` 压到 `30px`

具体结果：

- `step1 buttons`
  - `[34, 34, 34, 34] -> [30, 30, 30, 30]`
- `step2 buttons`
  - `[34, 34, 34] -> [30, 30, 30]`

同时对应内部块也真实下降：

- `step1`
  - `117.42 -> 109.42`
- `step2`
  - `80.42 -> 76.42`
- `today shell`
  - `324.36 -> 312.36`

## 这轮最重要的量化结果

- `/daily-latin 390`
  - `2011 -> 1999`
- `#today-loop-demo`
  - `348.55 -> 336.55`
- `step1`
  - `117.42 -> 109.42`
- `step2`
  - `80.42 -> 76.42`

当前 fresh `390px` broad mobile route heights 变成：

- `/ = 1513`
- `/daily-latin = 1999`
- `/dashboard = 1988`
- `/dance-os = 1930`

## 为什么这轮成立

这轮符合成立标准，因为同时满足：

1. `pnpm verify` 通过
2. `smoke:routes` 通过
3. `smoke:browser` 通过
4. `390px` route 总高度真实下降

而不是只出现“局部更紧凑，但 route 总高不变”的假 pass。

## 当前判断

这轮后：

- `/daily-latin` 仍然是 broad mobile Top1
- 但它只比 `/dashboard = 1988` 高：
  - `11px`

也就是说，三条主 route 已经继续拉近到同一档：

- `/daily-latin = 1999`
- `/dashboard = 1988`
- `/dance-os = 1930`

## 下一轮建议

下一轮更值得继续做的是：

1. 继续追 `/daily-latin`
2. 优先继续看 `#today-loop-demo`
3. 但只接受 very small pass
4. 如果下一刀没有真实改变 route 总高，就立刻停，不要在同一块空耗
5. 一旦 `/daily-latin` 低于 `/dashboard`，就切去处理新的 broad mobile Top1
