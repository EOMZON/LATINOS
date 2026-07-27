# Daily Loop Output Shell Pass

## 背景

在 `Dance Assets Square Ratio Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1871`
- `/dashboard = 1871`
- `/dance-os = 1851`

这意味着 broad mobile Top1 暂时变成并列：

- `/daily-latin = 1871`
- `/dashboard = 1871`

继续拆 section 后，当前全站最厚单块仍然是：

- `/daily-latin #today-loop-demo = 282.25`

进一步拆 `#today-loop-demo` 后确认：

- `section = 282.25`
- `shell = 260.06`
- `stack = 234.56`
- `output = 246.06`
- `card1 = 87.16`
- `card2 = 60.16`
- `card3 = 83.25`
- `tasks = 48.09`
- `resultGrid = 100.97`
- `nextStep = 33.92`
- `note = 28.23`
- `linkRow = 24.47`

这说明当前最有价值的继续收口点不是再改 route 级结构，而是：

- `STEP 3` task shell
- 右侧 output shell

## 中途排障

这轮中途先做过一版 CSS very small pass，但 fresh `390px` 量化没有任何变化。

排查后确认：

- 不是浏览器没刷新
- 不是 build/smoke 假阳性
- 而是 `daily-latin` 在 `390px` 下有多层 media block
- 我第一次改动命中了后置但并非最终生效的样式层

因此这轮真正成立的关键不是“继续加更多规则”，而是：

- 找准当前 viewport 下真正命中的最后一层样式

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. 只改 `390px` 下真正命中的 `daily-latin` compact 样式层

在最终生效的 `@media (min-width:390px) and (max-width:430px)` / `daily-latin` ledger block 上继续收：

- `.compact-ledger-shell` padding
- `.ledger-grid` gap
- `.ledger-stack` gap
- `.ledger-output` padding

### 2. 继续收 `STEP 3` task shell

继续只收：

- `.daily-task-list` gap / margin-top
- `.daily-task-toggle` padding / gap
- `.daily-task-badge` font-size

### 3. 继续收 output 区

继续只收：

- `.ledger-result-grid` gap / margin-top
- `.ledger-result-card` / `.ledger-next-step` padding
- `.ledger-note-field` min-height / padding
- `.link-row` gap / margin-top
- `.link-row .btn` padding / font-size

没有改：

- 组件结构
- 交互逻辑
- 数据内容
- witness 流程

因此这轮仍然是一个纯样式层、共享 compact shell pass。

## fresh 验证

在 fresh `3200` 上重新执行并通过：

- `pnpm typecheck`
- `pnpm build`
- fresh `pnpm start --hostname 127.0.0.1 --port 3200`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- routes 正常返回 `200`
- desktop 关键路径正常
- `daily loop demo interaction works`
- mobile shell 正常
- `home` / `daily-latin` 无横向 overflow

## 量化结果

fresh `390px` broad sweep：

- `/ = 1513`
- `/daily-latin = 1857`
- `/dashboard = 1871`
- `/dance-os = 1851`

`#today-loop-demo`：

- `282.25 -> 268.50`

内部变化：

- `shell`
  - `260.06 -> 246.31`
- `output`
  - `246.06 -> 231.28`
- `card3`
  - `83.25 -> 81.00`
- `tasks`
  - `48.09 -> 45.84`
- `resultGrid`
  - `100.97 -> 95.97`
- `nextStep`
  - `33.92 -> 31.92`
- `note`
  - `28.23 -> 27.08`
- `linkRow`
  - `24.47 -> 21.84`

对应 route 收益：

- `/daily-latin 390`
  - `1871 -> 1857`

## 这轮成立的结论

这轮 compact pass 已被 fresh 数据证明有效：

- `Daily Loop` 当前最值钱的收口点确实是 output shell，而不是继续改文案
- 找准真正命中的样式层后，small CSS pass 可以稳定转化成 route 级收益
- 这轮也验证了：在多层 media block 下，先确认实际命中的覆盖链比盲目继续收样式更重要

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 切到：

- `/dashboard = 1871`

同时：

- `/daily-latin = 1857`
- `/dance-os = 1851`

因此下一轮应切回：

- `/dashboard`

并重新测量当前最高 ROI section。
