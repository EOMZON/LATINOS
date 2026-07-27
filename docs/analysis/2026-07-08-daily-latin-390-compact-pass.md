# Daily Latin 390 Compact Pass

## 背景

在上一轮一系列 `360 / 375` mobile fallback pass 之后，`/daily-latin` 的窄屏断层已经被收掉。

但重新按真实 `build/start` 复测后，当前 broad mobile Top1 仍然是：

- `/daily-latin 390 = 2884`

而且最厚的两块仍然很集中：

- `Today Loop Demo`
- `Live Return / Clip Bridge / Archive Jump`

这说明这轮最值得做的，不是继续平均缩整页，也不是切回首页，而是：

**专门把 `390px` 这一档缺失的 compact workbench 规则补上，让 `daily-latin` 在主流手机宽度下更接近参考稿那种高密度工作台。**

## 问题定义

当前真正的问题不是：

- 组件逻辑有 bug
- 路由结构需要重做

而是：

- `375-389px` 已经有一层更激进的压缩规则
- `390px` 这档没有吃到同等级别的 compact 覆盖
- 导致 `390` 反而比 `375` 明显更厚

所以这轮目标很明确：

**只补 `390-430px` 的 `daily-latin` CSS 覆盖层，不动组件逻辑，把 `390` 这一档压回参考稿更接近的窄屏节奏。**

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 这轮实际改了什么

新增了一组：

- `@media (min-width:390px) and (max-width:430px)`

只覆盖 `daily-latin` 相关块，重点不是新增新结构，而是把 `390` 这一档补成更完整的 compact route：

### 1. 上半段 detail / stage / source 一起收紧

- `compact-detail-daily-top` 比例、padding、字号继续下降
- `route-stage` 的 metrics / signals 改成更紧的 workbench 节奏
- `source-matrix` 的 panel、row、mini 文本继续压紧

### 2. `Today Loop Demo` 补上更激进的 390 compact 壳

- `ledger-shell` padding 继续下降
- `ledger-grid` 改成更紧的左右宽度
- 左侧 `ledger-stack` 收成单列，减少卡片冗余高度
- `choice-note` 直接隐藏，避免每个状态卡重复解释
- `daily-task` 收成 2 列、更短 badge、更短副文案
- `result / next-step / witness` 全部继续压成更像参考稿的 compact result cards

### 3. `Live Return` 补上同等级别 compact 覆盖

- metric pills 更紧
- `daily-return-grid` 改成更紧的左右比例
- `daily-return-copy` 收成单行级提示
- `mode card` 的说明与 recommendation 隐掉，只保留标题和动作
- queue card 的文案、meta、按钮全部压短

## 这轮后的量化结果

### 整页

- `/daily-latin 390`
  - `2884 -> 2568`
  - 直接下降 `316`

### 关键 section

- `#daily-overview`
  - `245.09 -> 150.20`
- `#daily-sources`
  - `286.75 -> 250.88`
- `#today-loop-demo`
  - `637.31 -> 519.33`
- `#live-return-bridge`
  - `389.53 -> 322.56`

### 组件内部

- `.compact-ledger-shell`
  - `589.12 -> 471.14`
- `.compact-ledger-shell .ledger-card`
  - `300.27 / 300.27 / 265.86`
  - 变成 `143.48 / 92.05 / 209.61`
- `.daily-task-toggle`
  - `115.47 / 115.47 / 83.47 / 83.47`
  - 变成 `93.16 / 93.16 / 65.03 / 65.03`
- `.ledger-result-card`
  - `97.03 x4`
  - 变成 `57.39 / 57.39 / 65.39 / 65.39`
- `.compact-daily-return-board`
  - `341.34 -> 274.38`
- `.daily-return-mode-card`
  - `181.14 x3`
  - 变成 `120.94 x3`

## 这轮后的整站移动端判断

重新做 `390` sweep 后：

- `/`: `1730`
- `/daily-latin`: `2568`
- `/dance-os`: `2775`
- `/dashboard`: `2783`

这意味着当前 broad mobile Top1 已经不再是 `/daily-latin`，而是切回：

- `/dashboard 390 = 2783`

其次是：

- `/dance-os 390 = 2775`

## 验证

这轮已通过：

- `pnpm build`
- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

并且再次确认：

- mobile home 无横向溢出
- mobile daily-latin 无横向溢出
- `Daily Loop Demo` 交互 smoke 继续通过
- `Daily Return -> Dance OS` bridge 继续通过

## 截图

- `/tmp/daily-latin-390-after-compact-pass.png`

## 这轮后的结论

这轮价值很高，因为它解决的不是某一个小卡片，而是：

- `390px` 这一档缺失的 compact strategy
- `daily-latin` 在主流手机宽度下比 `375` 更厚的问题
- `Today Loop Demo` 和 `Live Return` 两个最大 section 的主密度问题

当前 `daily-latin` 已经退出 broad mobile Top1。

## 下一轮最值得做什么

1. 如果继续按 broad mobile Top1 追，优先回看 `/dashboard 390`
2. 同时把 `/dance-os 390` 作为下一个候选，尤其：
   - `#correction-ledger-demo`
   - `#body-map-practice-queue`
3. 如果从“收数值”切回“收完成感”，再回首页 hero / heatmap / lower workbench
