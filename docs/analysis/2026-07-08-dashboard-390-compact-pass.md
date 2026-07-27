# Dashboard 390 Compact Pass

## 背景

在上一轮把 `/daily-latin 390` 从 broad mobile Top1 拉下之后，重新做 `390` sweep：

- `/daily-latin`: `2568`
- `/dashboard`: `2783`
- `/dance-os`: `2775`

这意味着新的 broad mobile Top1 已经切到：

- `/dashboard 390 = 2783`

而且 `375` 下同页已经明显更短，所以这轮问题不是内容过多，而是：

**`390px` 这一档仍然停在 `max-width:860` 的较松 mobile 壳，没有吃到 `375-389px` 那层更高密度的 dashboard compact 覆盖。**

## 问题定义

当前真正要解决的是：

- `下一批交付` 在 `390` 还是单列 3 张 card，明显拉长
- `Route Map` 仍然维持较松的 route card 节奏
- `Witness Archive` 里的 summary / panel / archive list 还没有进入更高密度的窄屏工作台状态

所以这轮目标非常单纯：

**补一组 `390-430px` 的 `dashboard` 专属 compact 规则，把 `390` 宽度从“普通 mobile”推进到“接近参考稿的 dense monitor”。**

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 这轮实际改了什么

新增：

- `@media (min-width:390px) and (max-width:430px)` 的 `dashboard-page` 规则

### 1. `下一批交付` 改成真正的 2 列 compact course grid

- `course-grid` 从单列改成 2 列
- `course-card` padding、status、title、正文一起下降
- 让这一块更接近参考稿那种并排 monitor cards，而不是一张张往下叠

### 2. `Route Map` 改成高密度 route board

- `route-grid` 拉回 2 列
- `route-card`、`route-head`、`route-path`、`route-rows` 一起压紧
- `route-note` 收成单行级说明

### 3. `Witness Archive` 进入更紧的 archive monitor 状态

- `archive-summary-grid` 更紧
- `archive-panel`、`archive-links`、`archive-copy` 更薄
- `archive-list` 改回 3 列小卡片
- item 内文案、meta、动作全部收短

## 这轮后的量化结果

### 整页

- `/dashboard 390`
  - `2783 -> 2510`
  - 下降 `273`

### 关键 section

- `下一批交付`
  - `373.80 -> 205.41`
- `Route Map`
  - `324.25 -> 267.56`
- `Witness Archive`
  - `384.55 -> 360.61`

### 组件内部

- `.course-grid`
  - `346.20 -> 177.81`
- `.course-card`
  - `114.11 / 114.11 / 101.98`
  - 变成 `89.67 / 89.67 / 82.14`
- `.route-grid`
  - `276.06 -> 219.38`
- `.route-card`
  - `135.03 x4`
  - 变成 `107.19 x4`
- `.archive-board`
  - `336.36 -> 312.42`
- `.archive-panel`
  - `283.36 -> 263.42`
- `.archive-item`
  - `97.22 x3`
  - 变成 `92.94 x3`

## 这轮后的整站判断

重新做 `390` sweep 后：

- `/`: `1730`
- `/daily-latin`: `2568`
- `/dashboard`: `2510`
- `/dance-os`: `2775`

这意味着当前 broad mobile Top1 已经不再是 `/dashboard`，而是切到：

- `/dance-os 390 = 2775`

## 验证

这轮之后继续通过：

- `pnpm build`
- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

## 截图

- `/tmp/dashboard-390-after-compact-pass.png`

## 结论

这轮的价值不只是把数值压下去，而是把 `390` 这档 dashboard 的布局语言重新拉回到参考稿那种：

- 更像 dense monitor
- 更少像 mobile 长列表

## 下一轮

1. 继续按 broad mobile Top1 追，回看 `/dance-os 390`
2. 如果 `/dance-os` 收下去，再看 broad Top1 是否重新切回 `/daily-latin 390`
