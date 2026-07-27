# daily-latin 375 mobile fallback pass

## 背景

在上一轮把 `/dance-os 360` 收到 `2153` 之后，重新看当前全站移动端分布：

- `/daily-latin 390`: `2884`
- `/daily-latin 375`: `2981`
- `/daily-latin 360`: `2778`
- `/dashboard 375`: `2852`
- `/dance-os 375`: `2851`

这说明当前最明显的掉队点已经重新回到：

- `/daily-latin`

而且不是 `360px` 断层了，而是：

- `375px` 下仍然偏厚

## 问题定义

真正的问题不是 `daily-latin` 全部都还很长。

真正的问题是：

**在已经修完 `360px` fallback 之后，`/daily-latin` 在 `375px` 这一档仍然保留了一层偏厚的 workbench 壳，尤其是 `Today Loop Demo`、top overview 和 sources side rail。**

## 这轮前的真实证据

基于本地：

- `http://127.0.0.1:3200/daily-latin`

### full page

- `390`: `2884`
- `375`: `2981`
- `360`: `2778`

### `375px` 下 section 高度

- `daily-overview`: `245.09`
- `daily-sources`: `294.89`
- `entry-states`: `119.19`
- `daily-loop-overview`: `119.19`
- `today-loop-demo`: `717.31`
- `live-return-bridge`: `389.53`
- `legacy-daily-principles`: `149.02`
- `daily-library`: `320.31`

### 其中最关键的厚块

- `overview_shell`: `245.09`
- `source_matrix`: `267.3`
- `ledger_shell`: `669.12`
- `ledger_output`: `524.73`
- `ledger_stack`: `651.12`
- `return_grid`: `284.34`

从 ROI 看，这轮最值得继续抓的是：

1. `Today Loop Demo`
2. top overview / route snapshot
3. sources side rail
4. `Live Return`

## 这轮采取的策略

这轮依旧不改组件逻辑，只改：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

并且继续沿用已经成立的方法：

- 单独给 `375px - 389px` 补 `daily-latin` 专属 fallback
- 不碰 `390px`
- 不碰已经稳定的 `360px`

## 具体改动

### 1. top overview / route snapshot

进一步收：

- `compact-detail-daily-top`
- `compact-route-stage-daily`
- `compact-source-matrix-daily-side`

目标是把第一屏继续推向：

- 更像参考稿里的 dense workbench snapshot
- 更不像“一个 route intro + 一个长侧栏”

### 2. `Today Loop Demo`

这是这一轮最大的 ROI。

主要做了：

- `ledger-grid` 继续保持双栏
- `ledger-stack` 继续保持双列紧凑排布
- state / dance 按钮更薄
- `choice-note` 在这档宽度隐藏
- task、result、recent witness 再压一层
- textarea 与 CTA 同步变薄

这里的目标不是删功能，而是让 `375px` 下仍然保持：

- 是一个 workbench
- 不是解释型厚面板

### 3. `Live Return`

继续沿用更入口化的窄屏策略：

- metric pills 更薄
- return left/right 双栏收紧
- mode card 只保留动作密度最关键的部分

## 这轮后的量化结果

### `/daily-latin`

- `390`: `2884` -> `2884`
- `375`: `2981` -> `2496`
- `360`: `2778` -> `2778`

### `375px` 下关键 section

- `daily-overview`: `245.09` -> `152.39`
- `daily-sources`: `294.89` -> `246.09`
- `today-loop-demo`: `717.31` -> `453.94`
- `live-return-bridge`: `389.53` -> `309.56`

## 这轮后的全站 mobile sweep

### `/`

- `390`: `1730`
- `375`: `1724`
- `360`: `1717`

### `/daily-latin`

- `390`: `2884`
- `375`: `2496`
- `360`: `2778`

### `/dance-os`

- `390`: `2775`
- `375`: `2851`
- `360`: `2153`

### `/dashboard`

- `390`: `2783`
- `375`: `2852`
- `360`: `2571`

## 当前结论

这轮之后，`/daily-latin 375` 已经不再是当前最大 mobile 厚块。

新的对比变成：

- `390` 最高：`/daily-latin = 2884`
- `375` 最高：`/dashboard = 2852`
- `360` 最高：`/daily-latin = 2778`

如果按“当前整个 mobile sweep 里谁最厚”来判断，新的 broad Top1 仍然更像：

- `/daily-latin`

但当前最值得继续单点处理的下一块，也已经可以转向：

- `/dashboard 375`

或者，如果不再继续执着 mobile 数值，则回到：

- 首页 hero / lower workbench 的视觉完成感

## 截图

- 修复前：
  - `/tmp/daily-latin-375-before-pass.png`
- 修复后：
  - `/tmp/daily-latin-375-after-pass.png`

## 验证

已通过：

- `pnpm build`
- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

并继续确认：

- `390 / 375 / 360` 三档无横向溢出
- `daily-latin` route / loop demo / return / library smoke 未回退

## 下一轮最值得继续做什么

1. 如果继续按 mobile sweep Top1 追：
   - 先看 `/dashboard 375`
2. 如果开始把重点转回“近似同款完成度”：
   - 回首页 hero / heatmap / lower workbench 的最终视觉完成感
3. 如果从组件资产继续追：
   - 可以考虑把 `daily-latin` 这次 `375px` fallback 的 dense ledger / overview / return 语言继续抽成更稳定的 shared pattern
