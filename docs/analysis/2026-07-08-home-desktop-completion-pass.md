# Home Desktop Completion Pass

## 背景

上一轮已经把首页 `390px` 的 frontdoor 完成感明显拉回来了：

- `/ 390`
  - `1730 -> 1513`

同时当前 fresh `390px` broad mobile Top1 仍然是：

- `/daily-latin = 2407`

但从整体完成感判断，这时如果继续机械地只追 `390px` 数值，收益已经开始下降。

fresh 首页 desktop 截图更值得继续处理的问题变成了：

- 首页桌面端的 `hero`
- 首页桌面端的 `lower workbench`

虽然结构已经是对的，但仍然偏松，离参考稿那种：

- 克制
- 紧凑
- 明确的 frontdoor 节奏

还差最后一层比例统一。

所以这轮不再继续追 mobile route Top1，而是切回：

- 首页 desktop completion

## fresh desktop 首页量化

改动前：

- `.hero = 368`
- `.hero-left = 368`
- `.hero-right = 368`
- `.compact-heatmap-card = 258.3`
- `.home-lower-cluster = 403.78`
- `.compact-queue-rail-board = 101.12`
- `.compact-module-grid = 260.06`
- 单个 `.home-module-card = 122.03`

## 这轮真正做了什么

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

改动位置：

- 新增：
  - `@media (min-width:1100px)` 下的 home 专用桌面覆盖层

这轮没有去改：

- 首页 JSX
- 组件逻辑
- route 结构
- queue 数据逻辑

只做桌面端首页的比例与节奏收口。

## 这轮的 3 类调整

### 1. 收 `hero`

- `topline-home`
  - margin-bottom 再降
- `hero gap / margin-bottom`
  - 再降
- `hero-left / hero-right`
  - min-height 从 `368` 收到 `340`
  - padding 继续下降
- `day-num / phase-note / hero-tag / hero-desc`
  - 字级、间距、行高继续收
- `stat-strip`
  - gap / padding-top / number size 再降
- `ring-wrap`
  - `170 -> 156`
- `hero-cta`
  - 再轻一层

目标：

- 让 hero 更像桌面端的入口壳
- 而不是两块偏大的信息面板

### 2. 收 `heatmap`

- `home-heatmap-section`
  - margin-bottom 再降
- `compact-heatmap-card`
  - padding 与 note 再轻一层

目标：

- 把它更明确地变成中继层
- 而不是与 hero 等权重的大块

### 3. 收 `lower workbench`

- `home-lower-cluster`
  - margin-bottom 再降
- `compact-sec-head`
  - margin-bottom 再降
- `compact-queue-rail-board`
  - margin-bottom 再降
- `queue-rail-title / queue-inline-link / rail item`
  - 再轻一层
- `compact-module-grid`
  - gap 从 `16x20` 拉回 `12x16`
- `home-module-card`
  - min-height / padding / h3 / summary / detail 再降

目标：

- 让下半段更像一组 frontdoor modules
- 而不是铺得比较开的内容面板

## 量化结果

### fresh build/start 后复测

改动后：

- `.hero`
  - `368 -> 340`
- `.hero-left`
  - `368 -> 340`
- `.hero-right`
  - `368 -> 340`
- `.compact-heatmap-card`
  - `258.3 -> 249`
- `.home-lower-cluster`
  - `403.78 -> 400.47`
- `.compact-queue-rail-board`
  - `101.12 -> 101.12`
- `.compact-module-grid`
  - `260.06 -> 256.75`
- 单个 `.home-module-card`
  - `122.03 -> 120.38`

## 这轮的关键观察

这轮的量化不像 mobile pass 那样剧烈，但它的价值在于：

- 不是为了压某个 route 数值
- 而是为了统一首页 desktop 的整体版式完成感

最关键的几处变化是：

- hero 左右两块都被拉回更紧的高度
- workbench 模块网格不再那么松
- 首页整体更像一个被收过比例的入口版式

## 视觉结果

桌面端新截图：

- `/tmp/home-desktop-after-completion-pass.png`

当前更明显的变化：

- hero 更克制
- heatmap 不再抢权重
- lower workbench 更像真正的入口网格

## 验证

这一轮已通过：

- `pnpm build`
- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

并继续确认：

- desktop home hero visible
- home next session queue continues to work
- mobile shell 继续正常
- mobile home / daily-latin 无横向溢出

## 结论

这轮的价值在于：

- 没有改逻辑层
- 没有改组件结构
- 只加了一层 desktop home 比例收口

但它继续推进了一个更接近最终目标的方向：

- 首页 desktop 与 mobile 的统一 frontdoor 完成感

## 下一轮最值得继续做什么

如果继续按 route-level broad mobile Top1 追：

1. 回到 `/daily-latin 390 = 2407`

如果继续按“近似同款完成度”推进：

1. 首页 desktop lower workbench 的最后一层精修
2. 再回 `daily-latin / dashboard / dance-os` 做最后几轮统一
