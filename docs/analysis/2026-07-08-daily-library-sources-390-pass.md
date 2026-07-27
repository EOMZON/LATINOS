# Daily Library / Sources 390 Pass

## 背景

这一轮继续严格按既定主线推进：

- 不重开技术选型
- 不回退单文件 HTML
- 不动路由与交互逻辑
- 只在当前 `Next.js App Router + React + TypeScript` 基线上继续收 mobile 完成感

在 fresh `build/start` 后，当前 `390px` broad mobile Top1 仍然是：

- `/daily-latin = 2501`

并且最值得继续怀疑的小块已经比较明确：

- `#daily-library = 297.73`
- `#daily-sources = 250.88`

这两块都属于：

- 可以用 very small CSS-only pass 继续压
- blast radius 相对小
- 不需要碰逻辑与数据结构

## 这轮真正做了什么

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

改动位置：

- 最终生效的 `@media (min-width:390px) and (max-width:430px)` 下
- `daily-latin-page` 的最终覆盖层

这轮没有去改：

- `DailyLoopDemo`
- `DailyReturnBoard`
- `TabbedMoveLibrary` 逻辑
- 路由结构
- 数据内容

只做了 3 类 very small compact 调整：

### 1. 收紧 `daily-latin` 的 section 节奏

- `section margin-bottom`
  - `24 -> 22`
- `compact-sec-head margin-bottom`
  - 再压一层

这类改动的目标不是改视觉方向，而是把纵向节奏更拉回参考稿那种：

- 信息块更连贯
- section 之间不拖长

### 2. 再压 `#daily-sources`

- `compact-source-matrix-daily`
  - padding / gap / margin-bottom 再降一层
- source panel title 再轻一层
- source row 的：
  - padding
  - font-size
  - line-height
  - strong margin
  - 都继续收紧

目标是让这块更像：

- 一个克制的 reference panel

而不是：

- 仍然偏厚的资料块

### 3. 再压 `#daily-library`

- `compact-library-panel`
  - padding / margin-bottom 再降
- `library-head h3`
  - 再轻一层
- `library-count`
  - 再轻一层
- `library-note`
  - 更短、更贴近 header
- `compact-move-grid`
  - gap 再降
- `compact-move-card`
  - min-height / padding / tag / heading / meta 全部再压一层

目标是让这块更接近：

- “当前分组的最小动作入口”

而不是：

- 仍然有点像小型卡片展区

## 量化结果

### fresh build/start 后复测

改动前：

- `/ = 1730`
- `/daily-latin = 2501`
- `/dashboard = 2486`
- `/dance-os = 2220`

改动后：

- `/ = 1730`
- `/daily-latin = 2430`
- `/dashboard = 2486`
- `/dance-os = 2220`

### 关键 section 变化

`/daily-latin 390`

- `#daily-sources`
  - `250.88 -> 216.53`
- `.compact-source-matrix-daily`
  - `223.28 -> 189.94`
- `#daily-library`
  - `297.73 -> 281.56`
- `.compact-library-panel`
  - `65.16 -> 60.98`
- `.compact-move-grid`
  - `124 -> 115`
- `.compact-move-card`
  - `60 -> 56`

`#today-loop-demo` 和 `#live-return-bridge` 基本保持稳定：

- `#today-loop-demo`
  - `485.27 -> 484.27`
- `#live-return-bridge`
  - `312.48 -> 311.48`

这说明这轮改动确实集中命中了：

- `sources`
- `library`

而不是误伤其它大块。

## 这一轮后的 broad mobile Top1

这轮之后，当前 `390px` broad mobile Top1 已经不再是 `/daily-latin`，而是：

- `/dashboard = 2486`

同时：

- `/daily-latin = 2430`

这意味着：

- `daily-latin` 这条路由已经被明显拉回更统一的工作台密度
- 下一轮如果继续追 mobile ROI，应该重新回到 `/dashboard`

## 视觉结果

新的手机端截图：

- `/tmp/daily-latin-390-after-library-sources-pass.png`

当前这页更接近参考稿那种：

- 上半段快
- 中段 demo 厚度已经被控住
- 下半段入口与动作库更像紧凑的 workbench route

## 验证

这一轮已通过：

- `pnpm build`
- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

并继续确认：

- mobile home 无横向溢出
- mobile daily-latin 无横向溢出
- Daily / Dance / Dashboard 关键交互 smoke 继续通过

## 结论

这轮的价值不在于“又小调了一点”，而在于：

- 用极小 blast radius 的 CSS-only pass
- 把 `daily-latin 390`
  - `2501 -> 2430`

而且没有破坏：

- 交互
- 路由
- 组件边界
- 当前验证链

## 下一轮最值得继续做什么

如果继续按 broad mobile Top1 往下追，优先回到：

1. `/dashboard 390`

如果从“收数值”切回“收完成感”，则更值得回到：

1. 首页 `hero`
2. 首页 `today status / lower workbench`
3. 整站桌面端与手机端的最终同款完成感统一
