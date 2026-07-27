# Daily Ledger 390 Pass

## 背景

上一轮把 `/dashboard 390` 从 `2486` 压到 `2380` 之后，fresh `390px` broad mobile Top1 又回到：

- `/daily-latin = 2430`

这时的 `daily-latin` 已经不是“大面积明显掉队”的状态，但 fresh 复测仍然显示：

- `#today-loop-demo = 484.27`
- `.compact-ledger-shell = 437.08`

这说明当前最值得继续怀疑的单块仍然是：

- `Today Loop Demo`

所以这轮继续严格按既定 Goal 主线推进：

- 不重开技术选型
- 不碰 JSX 逻辑
- 不动路由与数据结构
- 只在现有 CSS 架构里继续做 very small compact pass

## 这轮真正做了什么

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

改动位置：

- `@media (min-width:390px) and (max-width:430px)` 下
- `daily-latin-page` 的最终移动端覆盖层

这轮没有去改：

- `DailyLoopDemo` 逻辑
- witness 存储
- route 结构
- data content

只继续收：

- `compact-ledger-shell`
- section 节奏

## 这轮的 3 类 compact 调整

### 1. 再收 daily-latin section 节奏

- `section margin-bottom`
  - 再降
- `compact-sec-head margin-bottom`
  - 再降

目标：

- 让上中下几段切换更快
- 继续减少 route 在窄屏里的拖长感

### 2. 再收 `ledger-shell` 左侧 step cards

- shell padding / grid gap / stack gap 再降
- `ledger-card` padding 再降
- `ledger-kicker / h3 / ledger-copy`
  - 字级与行高再降
- `choice-grid / choice-btn`
  - gap / padding / min-height 再降
- `daily-task-list`
  - gap / margin-top / task padding 再降
- `daily-task-copy span`
  - 在这一档直接隐藏
- `daily-task-badge`
  - 再降一层

目标：

- 让左侧 step cards 更像工作台控制面板
- 而不是仍然偏解释型的操作卡

### 3. 再收右侧 planner / result / recent

- `ledger-result-grid`
  - gap / margin-top 再降
- `ledger-result-card / ledger-next-step / witness-item`
  - padding 再降
- `ledger-result-label / strong / p`
  - 再轻一层
- `ledger-copy`
  - clamp 从 2 收到 1
- `ledger-note-field`
  - min-height / font-size 再降
- `witness-note`
  - 这一档隐藏
- `link-row`
  - gap / margin-top / button padding 再降

目标：

- 保留 right column 的“这轮计划 + witness 回流”结构
- 但把它压回更紧凑的 workbench 密度

## 量化结果

### fresh build/start 后复测

改动前：

- `/ = 1730`
- `/daily-latin = 2430`
- `/dashboard = 2380`
- `/dance-os = 2220`

改动后：

- `/ = 1730`
- `/daily-latin = 2407`
- `/dashboard = 2380`
- `/dance-os = 2220`

### 关键 section 变化

`/daily-latin 390`

- `#daily-sources`
  - `216.53 -> 215.53`
- `#entry-states`
  - `118.19 -> 117.19`
- `#daily-loop-overview`
  - `108.95 -> 107.95`
- `#today-loop-demo`
  - `484.27 -> 483.27`
- `#live-return-bridge`
  - `311.48 -> 310.48`
- `#legacy-daily-principles`
  - `148.02 -> 147.02`
- `#daily-library`
  - `281.56 -> 280.56`

总高度：

- `/daily-latin 390`
  - `2430 -> 2407`

## 这轮的关键观察

这轮有一个很重要的现象：

- `.compact-ledger-shell`
  - 量测仍然是 `437.08`

但整页仍然继续缩短：

- `2430 -> 2407`

这说明当前 `daily-latin` 已经进入了一个更细的阶段：

- 不是某一个大块一下子掉很多
- 而是多个 section 与中段节奏被继续拉紧

也就是说，这轮更像：

- route-level micro pass

而不是：

- 单块大幅裁剪

## 这一轮后的 broad mobile Top1

这轮之后，fresh `390px` sweep 变成：

- `/ = 1730`
- `/daily-latin = 2407`
- `/dashboard = 2380`
- `/dance-os = 2220`

当前 broad mobile Top1 仍然是：

- `/daily-latin = 2407`

但它已经只比 `/dashboard = 2380` 高：

- `27`

这说明当前 3 条主 route 已经被明显拉到更接近同一档完成度。

## 视觉结果

新的手机端截图：

- `/tmp/daily-latin-390-after-ledger-pass.png`

当前变化更偏 subtle：

- `Today Loop Demo` 更像紧凑的中段工作台
- 整页上下段切换更快

## 验证

这一轮已通过：

- `pnpm build`
- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

并继续确认：

- mobile home 无横向溢出
- mobile daily-latin 无横向溢出
- Daily loop demo 交互 smoke 继续通过
- Daily / Dance / Dashboard 关键交互继续通过

## 结论

这轮的价值在于：

- 继续守住了 small blast radius
- 没有碰逻辑层
- 继续把 `/daily-latin 390`
  - `2430 -> 2407`

虽然已经进入更细的微调阶段，但它仍然让整体更接近：

- 同一作品
- 同一窄屏工作台语言
- 同一套参考稿完成感

## 下一轮最值得继续做什么

如果继续按 broad mobile Top1 往下追，仍然优先回看：

1. `/daily-latin 390`

但当前更值得切回“完成感判断”的区域已经越来越明显：

1. 首页 `hero`
2. 首页 `today status / lower workbench`
3. 全站桌面端与移动端的最终统一感
