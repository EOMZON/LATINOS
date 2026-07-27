# Home 390 Completion Pass

## 背景

前几轮一直在追 `390px` broad mobile Top1：

- `/daily-latin`
- `/dashboard`
- `/dance-os`

并且已经把它们明显拉回到更接近同一档的窄屏工作台密度。

当前 fresh `390px` sweep 在这一轮开始前是：

- `/ = 1730`
- `/daily-latin = 2407`
- `/dashboard = 2380`
- `/dance-os = 2220`

这意味着：

- route-level laggard 仍然是 `/daily-latin`
- 但它只比 `/dashboard` 高 `27`

这时继续机械地只追 route 数值，收益已经开始下降。

同时 fresh 首页截图很明确地暴露出另一个更重要的问题：

- 首页整体还没有完全达到参考稿那种 frontdoor 完成感
- 尤其是：
  - `hero`
  - `heatmap`
  - `lower workbench`

之间的节奏还可以更紧、更像同一块入口壳

所以这轮不再只盯着 route Top1，而是切回：

- 首页完成感统一

## fresh 首页量化

改动前：

- `/ = 1730`

关键 section：

- `.hero = 542.23`
- `.compact-heatmap-card = 223.84`
- `.home-lower-cluster = 501.14`
- `.compact-queue-rail-board = 107.73`
- `.compact-module-grid = 350.81`
- 单个 `.home-module-card` 约 `98-100`

这说明首页最值得推进的不是热力图单独一块，而是：

1. `hero`
2. `lower workbench`

## 这轮真正做了什么

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

改动位置：

- 新增并插入：
  - `@media (min-width:390px) and (max-width:430px)` 下的 home 专用覆盖层

这轮没有去改：

- 首页 JSX 结构
- 组件逻辑
- queue 数据逻辑
- route 结构

只做首页移动端完成感收口。

## 这轮的 4 类 compact 调整

### 1. 收 `hero`

- `topline-home` margin-bottom 再降
- `hero gap / margin-bottom` 再降
- `hero-left / hero-right` padding 再降
- `day-num / phase-note / hero-tag / hero-desc`
  - 字级、行高、间距继续收
- `stat-strip`
  - gap / padding-top / 数字字级继续收
- `ring-wrap`
  - `140 -> 126`
- `live-session`
  - padding / label / value 再降
- `hero-cta`
  - font-size / padding 再降

### 2. 收 `heatmap`

- `home-heatmap-section margin-bottom` 再降
- `compact-heatmap-card padding` 再降
- `heatmap-top / legend / cell / note`
  - 再轻一层

### 3. 收 `queue rail`

- `compact-queue-rail-board margin-bottom` 再降
- `queue-rail-title`
  - 再轻
- `queue-head-rail`
  - gap / margin-bottom 再降
- `queue-route-link`
  - min-width / padding / font-size 再降
- `queue-rail-list / queue-rail-item`
  - gap / padding-top 再降
- `queue-inline-link`
  - font-size / padding 再降

### 4. 收 `module grid`

- `compact-module-grid gap`
  - 再降
- `home-module-card min-height / padding`
  - 再降
- `h3 / day`
  - 再轻
- `home-module-summary / detail`
  - font-size / line-height 再降
  - 同时加 2 行 clamp

## 量化结果

### fresh build/start 后复测

改动前：

- `/ = 1730`
- `/daily-latin = 2407`
- `/dashboard = 2380`
- `/dance-os = 2220`

改动后：

- `/ = 1513`
- `/daily-latin = 2407`
- `/dashboard = 2380`
- `/dance-os = 2220`

### 首页关键 section 变化

- `.hero`
  - `542.23 -> 459.03`
- `.hero-left`
  - `237.36 -> 199.09`
- `.hero-right`
  - `288.88 -> 247.94`
- `.compact-heatmap-card`
  - `223.84 -> 210.55`
- `.home-lower-cluster`
  - `501.14 -> 408.41`
- `.compact-queue-rail-board`
  - `107.73 -> 100.81`
- `.compact-module-grid`
  - `350.81 -> 272`
- 单个 `.home-module-card`
  - 到 `86`

总高度：

- `/ 390`
  - `1730 -> 1513`

## 这轮后的 broad mobile Top1

这轮没有去改 route laggard，所以 fresh `390px` broad mobile Top1 仍然是：

- `/daily-latin = 2407`

但这轮的价值不是 broad Top1 数值，而是：

- 首页 frontdoor 完成感被明显拉回来了

## 视觉结果

新的首页截图：

- `/tmp/home-390-after-completion-pass.png`

当前更明显的变化：

- 第一屏更像一个 frontdoor hero
- heatmap 变成中继块，而不是厚内容卡
- workbench 下半段更像入口网格，不再太松

## 验证

这一轮已通过：

- `pnpm build`
- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

并继续确认：

- mobile home 无横向溢出
- mobile daily-latin 无横向溢出
- home next session queue 继续通过
- Daily / Dance / Dashboard 关键交互继续通过

## 结论

这轮不是在追 broad Top1 数值，而是在追：

- 首页是否真的更像参考稿里的前台入口

从结果看，这轮是一次高价值 pass，因为它：

- 没有碰 JSX 与逻辑层
- 只加了一层 home 专用 `390px` 覆盖
- 却把 `/ 390`
  - `1730 -> 1513`

同时让首页的：

- hero
- heatmap
- lower workbench

更像同一块 frontdoor 壳体。

## 下一轮最值得继续做什么

如果继续按 route-level broad mobile Top1 追：

1. 回到 `/daily-latin 390 = 2407`

如果继续按“近似同款完成度”推进：

1. 首页桌面端 hero 比例
2. 首页 lower workbench 的桌面端完整感
3. 再回 route-level 做最后几轮统一
