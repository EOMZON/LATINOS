# 2026-07-08 Dashboard Archive Fallback Pass

## 背景

在 `/roadmap`、`/tools`、`/about` 都完成 route-level identity / density pass 之后，重新做整站主页面复核时，新的明显缺口开始集中到：

- 首页整体完成感
- `dashboard` 的 fresh preview 完成感

进一步检查当前真实截图后，`dashboard` 最明显的问题不是结构不完整，而是：

- `Witness Archive` 在 fresh preview 下看起来像空仓

也就是说：

- 页面结构已经在
- 但第一次打开时，这个区块在视觉上仍然像“还没长出来”

这会拖低整页完成感，也让 `dashboard` 更像一个“需要先手动跑 demo 才完整”的页。

## 这轮目标

不伪造 live witness，也不改现有 demo 交互逻辑，而是让：

- `dashboard` 在 fresh preview 下也能显出这条线想形成的回流结构

做法是：

- 保持 live counts 诚实为 `0`
- 但在没有 live witness 时，展示 source-backed return lines

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/witness-archive-board.tsx`

### 1. 复用现有 source-backed fallback

直接复用了已经存在的：

- `homeQueueFallbacks`

并把它们转换成 `archive` 视图需要的 fallback items，而不是新造另一套占位数据。

### 2. 区分 live witness 与 source-backed return lines

新增逻辑：

- 如果已有 live witness
  - 继续按原来方式显示 archive
- 如果还没有 live witness
  - summary counts 继续保持 `0`
  - 但列表展示 `source-backed return lines`
  - latest 区块改成 `STARTER RETURN LINE`
  - intro copy 也改成更诚实的说明

这保证了两件事同时成立：

1. 不伪造真实运行数据
2. 不让 fresh preview 看起来像一个空区块

## 视觉结果

### 之前的问题

`dashboard` 的 `Witness Archive` 在 fresh preview 下会出现：

- 顶部 summary 有结构
- 但主体区块几乎像空仓

这让整页虽然信息多，却在靠近底部时突然掉完成感。

### 这轮后的变化

`Witness Archive` 现在在 fresh preview 下也会展示：

- source-backed starter return line
- Daily / Dance 的参考回流条目

这样整页在第一次打开时更像：

- 一个已经知道自己要形成什么回流系统的 dashboard

而不是：

- 一个必须先手动生成 demo 数据才显得完整的页面

## 量化与截图

真实测量：

- `/dashboard` 桌面端：
  - `3557`
- `/dashboard` 手机端：
  - `8516`

截图：

- 桌面端：
  - `/tmp/dashboard-after-archive-fallback-desktop.png`
- 手机端：
  - `/tmp/dashboard-after-archive-fallback-mobile.png`

## 验证

已通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`

继续确认：

- 既有 browser smoke 不受影响
- `dashboard` route 标题稳定
- live witness 生成逻辑未被改变

## 这轮后的判断

这轮价值在于，它修复了一个很典型的 whole-site completion 问题：

- 页面不是没结构
- 而是 first-open experience 不够完整

现在 `dashboard` 在 fresh preview 下已经更接近：

- 即使没有 live data，也像一个已经成形的工作台 route

## 下一轮最值得继续做什么

1. 重新回首页做一轮整站完成感复核
2. 确认现在最掉队的是不是首页 hero 以下的整体节奏，而不再是次级 route
3. 继续只在最影响“近似同款完成度”的位置做高 ROI 调整
