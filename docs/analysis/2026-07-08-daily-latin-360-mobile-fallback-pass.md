# daily-latin 360 mobile fallback pass

## 背景

上一轮 checkpoint 里，`/daily-latin` 在 `390px` 看起来已经接近可接受基线：

- `390`: `2884`

但这一轮重新用真实 build + start 复测后，发现它在更窄的 `360px` 宽度下会突然失稳：

- `375`: `2981`
- `360`: `3752`

而且不是轻微变长，而是明显断层式膨胀。

## 问题定义

真正的问题不是“daily-latin 还可以再短一点”。

真正的问题是：

**`/daily-latin` 当前只在 `375px+` 有一套更紧的 workbench 布局，但在 `360px` 会回退到通用移动端单列壳，导致页面结构突然变厚。**

这会直接破坏：

- 手机端一致性
- 不同机型下的同款完成度
- 未来 agent 对“当前 mobile baseline”的判断

## 这一轮的关键证据

基于本地：

- `http://127.0.0.1:3200/daily-latin`

复测得到的断层前基线：

### `/daily-latin` full page

- `390`: `2884`
- `375`: `2981`
- `360`: `3752`

### `360px` 下的主要厚块

- `daily-overview`: `409.83`
- `today-loop-demo`: `1077.86`
- `live-return-bridge`: `608.86`

这说明问题不是单个段落多几十像素，而是：

- 上半段 detail / stage 重新变回了厚单列
- `Today Loop Demo` 失去紧凑双栏结构
- `Live Return` 也退回到更厚的窄屏堆叠版

## 这轮采取的策略

这轮没有去改组件逻辑。

只改了：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

而且不是重新动 `390 / 375` 的已有规则，而是**追加一层 `max-width:374px` 的 daily-latin 专属 fallback**。

## 具体改动

### 1. 给 `daily-overview` 补了 `360px` 专属双栏回退

在 `360px` 下恢复：

- `compact-detail-daily-top` 的双栏结构
- `route-stage` 的紧凑 metrics / signals 排布
- `source matrix` 的更薄壳体

目标不是极限压缩，而是避免整块退回单列厚版。

### 2. 给 `Today Loop Demo` 补了 `360px` 专属紧凑工作台

在 `360px` 下恢复：

- `ledger-grid` 左右双栏
- `planner` 右栏独立存在
- `choice grid` / `result grid` 的紧凑排布

同时针对最容易竖排失真的区域做了克制处理：

- 入口选择按钮隐藏 `choice-note`
- task hint 压成单行
- result / witness 文案继续收短

这样做的目的，是把高 ROI 的布局优势保留下来，同时避免按钮文字被挤成几乎不可读的竖排。

### 3. 给 `Live Return` 补了 `360px` 专属并排回退

在 `360px` 下恢复：

- metric pills 的并排
- left panel / queue panel 的双栏结构

并把 `mode card` 的说明和 recommendation 在这档宽度下隐藏，只保留：

- label
- title
- CTA

这更接近参考稿那种窄屏 workbench 上“先给入口动作，不继续解释”的节奏。

## 这轮后的量化结果

### `/daily-latin` full page

- `390`: `2884` -> `2884`
- `375`: `2981` -> `2981`
- `360`: `3752` -> `2778`

### `360px` 下关键 section

- `daily-overview`: `409.83` -> `171.34`
- `today-loop-demo`: `1077.86` -> `621.14`
- `live-return-bridge`: `608.86` -> `366.75`

这说明这轮修掉的不是“局部几处 padding”，而是 `360px` 下整套结构回退。

## 这轮后的全站 mobile sweep

### `/`

- `390`: `1730`
- `375`: `1724`
- `360`: `1717`

### `/daily-latin`

- `390`: `2884`
- `375`: `2981`
- `360`: `2778`

### `/dance-os`

- `390`: `2775`
- `375`: `2851`
- `360`: `2842`

### `/dashboard`

- `390`: `2783`
- `375`: `2852`
- `360`: `2864`

## 当前结论

这轮之后，`/daily-latin` 最危险的问题已经不再是：

- `360px` 下结构突然炸开

因为这个断层已经被补平了。

而且新的 `360px` 数值已经不再是整站最差项：

- `/daily-latin 360`: `2778`
- `/dance-os 360`: `2842`
- `/dashboard 360`: `2864`

从当前 sweep 看，新的窄屏 Top1 已经转回：

- `/dashboard`

## 截图

- 修复前：
  - `/tmp/daily-latin-360-before-fix.png`
- 修复后：
  - `/tmp/daily-latin-360-after-fix.png`

## 验证

已通过：

- `pnpm build`
- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

并继续确认：

- `390 / 375 / 360` 三档无横向溢出
- `/daily-latin` 交互 smoke 未回退
- `Today Loop Demo` 与 `Daily Return` 未因紧凑 fallback 失效

## 下一轮最值得继续做什么

1. 重新看 `/dashboard` 的 `360px` 是否成为新的窄屏 Top1
2. 如果继续追 mobile consistency，优先抓：
   - archive / route / decision 这种在窄屏容易重新变厚的共享展示层
3. 如果回到样式完成度，则重新看：
   - 首页 hero 的最终完成感
   - `daily-latin` 顶部 summary 文字是否还能在不增加高度的前提下再清晰一层
