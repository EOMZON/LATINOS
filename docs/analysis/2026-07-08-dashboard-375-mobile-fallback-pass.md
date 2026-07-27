# dashboard 375 mobile fallback pass

## 背景

在上一轮把 `/daily-latin 375` 从 `2981` 收到 `2496` 之后，重新看当前移动端分布：

- `/daily-latin 390`: `2884`
- `/dashboard 375`: `2852`
- `/dance-os 375`: `2851`
- `/daily-latin 360`: `2778`

这说明如果继续按当前最高 ROI 的 mobile density 问题往下追，最值得继续抓的是：

- `/dashboard 375`

## 问题定义

真正的问题不是 dashboard 在 `360px` 仍然最差。

上一轮已经把：

- `/dashboard 360`: `2864 -> 2571`

收掉了。

现在真正的问题是：

**`/dashboard` 在 `375px` 这一档仍然保留了一层偏厚的“信息看板壳”，尤其是 `下一批交付`、`Route Map`、`Witness Archive` 这几个共享层。**

## 这轮前的真实证据

基于本地：

- `http://127.0.0.1:3200/dashboard`

### full page

- `390`: `2783`
- `375`: `2852`
- `360`: `2571`

### `375px` 下 section 高度

- `下一批交付`: `373.8`
- `验证状态`: `126.97`
- `决策护栏`: `265.62`
- `Proof / Risk / Gate`: `273.25`
- `Route Map`: `340.25`
- `Witness Archive`: `400.55`
- `当前运维判断`: `117.84`

从 ROI 看，依旧最值得继续抓的是：

1. `下一批交付`
2. `Route Map`
3. `Witness Archive`

## 这轮采取的策略

这轮继续不改组件逻辑，只改：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

并采用和前几轮相同的策略：

- 只给 `375px - 389px` 补 dashboard 专属 fallback
- 不动 `390px`
- 不动已经稳定的 `360px`

## 具体改动

### 1. `下一批交付`

继续把 `course-grid` 往更像 reference workbench 卡列的方向推：

- 维持 `2` 列
- `course-card` 更薄
- 状态标签更轻
- 标题与描述再压一层

目标是把它更明确地变成：

- 下一批动作卡

而不是小型说明列表。

### 2. `Route Map`

继续保留：

- `2` 列 route card

并进一步压紧：

- route head
- route rows
- route note

让它更接近参考稿里的 dense route wall。

### 3. `Witness Archive`

这轮继续沿用已经在 `360px` 验证过的方向，但放在更宽一点的 `375px` 档里：

- summary card 继续变薄
- archive panel padding 继续下降
- latest / archive list 继续更像证据卡列

目标不是让它“内容更少”，而是让它：

- 更像共享 evidence layer
- 更不像大段解释性面板

## 这轮后的量化结果

### `/dashboard`

- `390`: `2783` -> `2783`
- `375`: `2852` -> `2563`
- `360`: `2571` -> `2571`

### `375px` 下关键 section

- `下一批交付`: `373.8` -> `205.41`
- `Route Map`: `340.25` -> `283.56`
- `Witness Archive`: `400.55` -> `360.61`

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
- `375`: `2563`
- `360`: `2571`

## 当前结论

这轮之后，`/dashboard 375` 已经不再是当前 mobile Top1。

新的 broad mobile 对比变成：

- `/daily-latin 390`: `2884`
- `/dance-os 375`: `2851`
- `/dashboard 390`: `2783`
- `/daily-latin 360`: `2778`

因此，如果继续按数值意义上的 mobile Top1 往下追，当前最值得回看的已经重新变成：

- `/daily-latin 390`

也就是说：

- 现在的主要 gap，开始从“窄屏 fallback 漏洞”重新转向“整体视觉完成度与密度平衡”

## 截图

- 修复前：
  - `/tmp/dashboard-375-before-pass.png`
- 修复后：
  - `/tmp/dashboard-375-after-pass.png`

## 验证

已通过：

- `pnpm build`
- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

并继续确认：

- `390 / 375 / 360` 三档无横向溢出
- dashboard dense sections / witness archive / route content smoke 未回退

## 下一轮最值得继续做什么

1. 如果继续按 mobile Top1 追：
   - 回看 `/daily-latin 390`
2. 如果把重心切回“近似同款完成度”：
   - 回首页 hero / heatmap / lower workbench 的最终视觉完成感
3. 如果从共享资产继续追：
   - 可以考虑把 dashboard 这次 `375px` 的 `course / route / archive` fallback 和前面的 `360px` 版本一起收敛成更清晰的 shared compact policy
