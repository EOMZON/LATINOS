# Daily Loop Compact Label Pass

## 背景

在 `/dashboard` 被继续拉低之后，fresh `390px` broad mobile Top1 切回：

- `/daily-latin = 2165`

因此这一轮继续按既定主线，不重开技术讨论，而是重新回到 `/daily-latin` 做 fresh route-level ROI 拆解。

## fresh 拆解

在 fresh `3200` 上重新测 `/daily-latin` `390px` section 高度：

- `#daily-overview = 150.20`
- `#daily-sources = 185.47`
- `#entry-states = 117.19`
- `#daily-loop-overview = 107.95`
- `#today-loop-demo = 398.44`
- `#live-return-bridge = 197.48`
- `#legacy-daily-principles = 147.02`
- `#daily-library = 266.22`

这说明当前最厚 section 不是 `daily-library`，而是：

- `#today-loop-demo = 398.44`

## 进一步拆 `Today Loop Demo`

继续测内部块：

- `.compact-ledger-shell = 374.25`
- `.ledger-stack = 358.25`
- `.ledger-output = 274.31`
- `.daily-task-list = 87.98`
- `.ledger-result-grid = 108.97`

继续拆按钮后发现真正的支配块不是 output，而是 `STEP 3` 前两张任务卡：

- task 1 = `48.39`
- task 2 = `48.39`
- task 3 = `35.59`
- task 4 = `35.59`

说明问题不在“还可以继续裁 output 文案”，而在：

- compact 模式下前两个 task label 仍然太长
- 它们在 `390px` 的窄列里换成了两行

## 这轮做法

这轮没有继续堆 CSS，而是先走数据层 + 组件层收口：

### 1. 给 `DailyDemoTaskData` 增加 `compactLabel`

在：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`

为 4 个 task 增加更短的 compact 任务名：

- `先判断今天状态 -> 先定状态`
- `做完 10-15 分钟这一轮 -> 做完一轮`
- `只留 1 个点 -> 只留 1 点`
- `写下回流 witness -> 写 witness`

### 2. `DailyLoopDemo` 在 compact 下使用 `compactLabel`

在：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/daily-loop-demo.tsx`

把 task 的 `<strong>` 改成：

- `compact ? task.compactLabel ?? task.label : task.label`

同时保留：

- `OPEN / DONE` 状态
- 交互逻辑
- witness 保存流程

## 这轮之前的一个无效尝试

这轮中途先试过一个更小的状态层 pass：

- compact + `progress === 0` 时隐藏 `TODAY SCORE` 的解释文案和进度条

那一刀虽然把内部 output 区压低了：

- `.ledger-output`
  - `274.31 -> 266.31`

但没有改变整个 route 总高，因此不把它单独记成成立 pass。

这次最终成立的是：

- 更短的 compact task label

## fresh 验证结果

在 fresh `3200` 上重新执行：

- `pnpm build`
- `pnpm typecheck`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- desktop 关键路径正常
- mobile shell 正常
- `home` 无横向 overflow
- `daily-latin` 无横向 overflow

## 量化结果

fresh `390px` sweep：

- `/ = 1513`
- `/daily-latin = 2141`
- `/dashboard = 2145`
- `/dance-os = 2101`

`Today Loop Demo`：

- `398.44 -> 374.59`

内部块：

- `.compact-ledger-shell = 350.41`
- `.ledger-stack = 334.41`
- `.daily-task-list = 64.14`

task button 高度变成：

- task 1 = `24.55`
- task 2 = `24.55`
- task 3 = `35.59`
- task 4 = `35.59`

## 这轮成立的结论

这轮 `compactLabel` pass 已经被 fresh 数据证明有效：

- `/daily-latin 390`
  - `2165 -> 2141`
- `#today-loop-demo`
  - `398.44 -> 374.59`
- `.daily-task-list`
  - `87.98 -> 64.14`

因此：

- 这轮不是只压了内部子块
- 而是确实把当前 broad mobile Top1 route 拉低了 `24px`

## broad mobile Top1 状态

这轮后 fresh `390px` sweep 变成：

- `/ = 1513`
- `/daily-latin = 2141`
- `/dashboard = 2145`
- `/dance-os = 2101`

当前新的 broad mobile Top1 切到：

- `/dashboard = 2145`

## 为什么这轮符合长期方向

这轮继续符合当前路线：

- 先 fresh 测量
- 只抓当前 Top1
- 优先数据层 / 组件层收口
- 不把无效尝试硬记成功
- 改完立即 fresh build / smoke / remeasure

## 下一步

下一轮更值得继续看：

1. 重新回到 `/dashboard = 2145`
2. fresh 再拆最厚 section
3. 只做一刀最小 ROI 收口

如果几条核心 route 已经继续收敛，则逐步切回：

- 与参考稿“近似同款完成度”的整站 completion 视角
