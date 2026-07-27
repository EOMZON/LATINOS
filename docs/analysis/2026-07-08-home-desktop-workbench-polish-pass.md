# Home Desktop Workbench Polish Pass

## 背景

上一轮已经完成了一次 desktop home completion pass，重点把：

- `hero`
- `heatmap`
- `lower workbench`

都从更松的桌面版式拉回更克制的 frontdoor 节奏。

但 fresh desktop 截图里仍然能看到一个比较具体的剩余问题：

- `lower workbench` 的 queue rail 和 module grid 仍然略松
- 整体已经对了，但还差最后一层 “入口网格” 的紧度

所以这轮没有回到 route-level mobile Top1，而是继续只做：

- 首页 desktop `lower workbench`

的 very small polish pass。

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动范围

只改：

- `@media (min-width:1100px)` 下
- home 专用桌面覆盖层

没有改：

- JSX
- 组件逻辑
- route 结构
- queue 数据逻辑

## 这轮真正做了什么

### 1. 收 `queue rail`

- `compact-sec-head`
  - margin-bottom 再降
- `compact-queue-rail-board`
  - margin-bottom 再降
- `queue-rail-title`
  - 再轻一层
- `queue-head-rail`
  - gap / margin-bottom 再降
- `queue-rail-list`
  - gap 再降
- `queue-rail-item`
  - padding-top 再降
- `queue-rail-item strong`
  - 字级再降
- `queue-inline-link`
  - font-size / padding 再降

目标：

- 让 queue rail 更像一个窄而清楚的“上一轮 → 下一轮”中继带

### 2. 收 `module grid`

- `compact-module-grid`
  - gap 从 `12x16` 再降到 `10x14`
- `home-module-card`
  - min-height `108 -> 100`
  - padding 再降
- `h3 / day`
  - 字级再降
- `home-module-summary / detail`
  - font-size / line-height 再轻
  - 加 2 行 clamp

目标：

- 让下半段模块更像 frontdoor modules
- 而不是还有点像被铺开的内容卡片

## 量化结果

fresh desktop 复测：

### 改动前

- `.home-lower-cluster = 400.47`
- `.compact-queue-rail-board = 101.12`
- `.compact-module-grid = 256.75`
- 单个 `.home-module-card = 120.38`

### 改动后

- `.home-lower-cluster = 399.72`
- `.compact-queue-rail-board = 101.12`
- `.queue-rail-list = 71.06`
- `.queue-rail-item.latest = 71.06`
- `.compact-module-grid = 256`
- 单个 `.home-module-card = 120`

这轮量化变化非常小，说明这已经是：

- 最后一层桌面端细修

而不是：

- 仍然能靠一轮 CSS 改动大幅压缩的阶段

## 视觉结果

桌面端新截图：

- `/tmp/home-desktop-after-workbench-polish.png`

从视觉上看，这轮的主要价值是：

- queue rail 与 section head 的关系更紧
- module grid 更像入口网格
- 首页下半段更接近参考稿那种被收过的 frontdoor 节奏

## 验证

这一轮已通过：

- `pnpm build`
- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

并继续确认：

- desktop home hero visible
- home next session queue continues to work
- mobile home / daily-latin 无横向溢出
- Daily / Dance / Dashboard 关键交互继续通过

## 结论

这轮不是“大幅推进”型 pass，而是：

- 用 very small desktop CSS polish
- 继续把首页下半段往参考稿的入口网格语言收

从完成感角度，它是有价值的；从数值角度，这已经很接近 “继续抠首页桌面端收益递减” 的区间了。

## 下一轮最值得继续做什么

1. 如果继续按 route-level broad mobile Top1 追，回到 `/daily-latin 390 = 2407`
2. 如果继续按整体完成感推进，可以开始重新做一次桌面 + mobile completion sweep，判断最后真正掉队的是哪一条 route
