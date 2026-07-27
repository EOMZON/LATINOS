# Dashboard Archive / Route 390 Pass

## 背景

上一轮把 `/daily-latin 390` 从 `2501` 压到 `2430` 之后，当前 broad mobile Top1 变成了：

- `/dashboard = 2486`

所以这轮继续严格按既定 Goal 主线推进：

- 不重开技术选型
- 不改逻辑层
- 不动组件结构
- 只用 very small CSS-only pass 继续收 `390px` 的完成感

fresh `build/start` 后复测发现：

- `/dashboard = 2486`
- 其中最厚的单块已经不是上半段，而是 `Witness Archive`
  - `.archive-panel = 262.42`
- 第二个值得继续收的是：
  - `.route-grid = 218.38`

这说明这一轮最值得推进的不是重新整理整页结构，而是：

- `Witness Archive`
- `Route Map`

的移动端 workbench 密度。

## 这轮真正做了什么

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

改动位置：

- `@media (min-width:390px) and (max-width:430px)` 下
- `dashboard-page` 的最终移动端覆盖层

这轮没有去改：

- `WitnessArchiveBoard` JSX
- `RouteSignalCard` JSX
- 数据内容
- 路由结构
- 交互逻辑

只做了移动端密度收口。

## 这轮的 3 类 compact 调整

### 1. 收紧 dashboard 的 section 节奏

- `section margin-bottom`
  - 再降一层
- `dashboard-cluster gap / margin-bottom`
  - 再轻一层

目标：

- 让 dashboard 更像同一块连续的 workbench
- 而不是一段一段被垂直空隙拉长

### 2. 收 `Route Map`

- `route-grid gap`
  - 再降
- `route-card padding`
  - 再降
- `route-head / route-path / h3`
  - 再轻一层
- `route-row`
  - padding / font-size / line-height / clamp 再收
- `route-note`
  - margin / padding / font-size 再收

目标：

- 把 route card 从“解释型卡片”继续拉向
  - “工作台态路由卡”

### 3. 收 `Witness Archive`

- `archive-summary-card`
  - padding / number size 再降
- `archive-panel`
  - padding / head gap / title / link buttons 再降
- `archive-copy`
  - 字级与行高再降
- `archive-latest`
  - padding / title / text 再降
- `archive-actions`
  - gap / button padding / font-size 再降
- `archive-item`
  - padding / header / title / context / body / per-item action 再压一层

目标：

- 保留 witness archive 的真实内容承接
- 但把它收回更像：
  - 一个紧凑的共享回流证据层

而不是：

- 一个仍然偏厚的说明区

## 量化结果

### fresh build/start 后复测

改动前：

- `/ = 1730`
- `/daily-latin = 2430`
- `/dashboard = 2486`
- `/dance-os = 2220`

改动后：

- `/ = 1730`
- `/daily-latin = 2430`
- `/dashboard = 2380`
- `/dance-os = 2220`

### 关键 section 变化

`/dashboard 390`

- `.course-grid`
  - `177.81 -> 159.44`
- `.route-grid`
  - `218.38 -> 183.25`
- `.archive-summary-grid`
  - `44 -> 41`
- `.archive-panel`
  - `262.42 -> 232.64`
- `.archive-list`
  - `92.94 -> 77.06`
- `.archive-item`
  - `92.94 -> 77.06`

总高度：

- `/dashboard 390`
  - `2486 -> 2380`

这说明这轮压到的不是零散字级，而是：

- route section
- archive section

两个当前最值得收的移动端厚块。

## 这一轮后的 broad mobile Top1

这轮之后，当前 fresh `390px` sweep 变成：

- `/ = 1730`
- `/daily-latin = 2430`
- `/dashboard = 2380`
- `/dance-os = 2220`

这意味着 broad mobile Top1 已重新回到：

- `/daily-latin = 2430`

而 `/dashboard` 已被拉回到更接近同一档的工作台密度。

## 视觉结果

新的手机端截图：

- `/tmp/dashboard-390-after-archive-route-pass.png`

当前变化最明显的是：

- `Route Map` 下半段更像成组的 route board
- `Witness Archive` 更像共享证据层，而不是厚说明块

## 验证

这一轮已通过：

- `pnpm build`
- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

并继续确认：

- mobile home 无横向溢出
- mobile daily-latin 无横向溢出
- Dashboard witness archive 相关 smoke 继续通过
- Daily / Dance / Dashboard 关键交互继续通过

## 结论

这轮的价值在于：

- 没有去碰 JSX 与逻辑层
- 只在现有 CSS 结构里做 small blast radius pass
- 把 `/dashboard 390`
  - `2486 -> 2380`

并且继续守住了：

- 组件边界
- 数据边界
- 当前 smoke 验证链

## 下一轮最值得继续做什么

如果继续按 broad mobile Top1 往下追，优先回到：

1. `/daily-latin 390`

但这时已经不再是“大块明显掉队”的状态。

如果从“收数值”切回“收近似同款完成度”，更值得看的会是：

1. 首页 `hero`
2. 首页 `today status / lower workbench`
3. 全站桌面端与移动端的最终统一感
