# 2026-07-08 Mobile Shell And Daily Compact Pass

## 背景

这轮不是重新讨论技术主线，也不是大改页面结构。

目标是在既定的：

- `Next.js App Router`
- `React`
- `TypeScript`
- `真实路由`
- `组件化`
- `数据与组件分离`

基线下，继续做一轮高 ROI 收口。

## 先解决的真实问题

这轮一开始，`3200` 端口上残留了一个旧的 `next start` 实例。

它的 HTML 还在引用过期 CSS hash，导致浏览器里呈现出：

- 样式像没生效
- `hero` 退回 `display: block`
- `shell` 退回普通流布局
- 移动端首屏判断完全失真

所以这轮第一步不是盲改页面，而是先做环境校正：

1. 确认 `3200` 是旧实例
2. 停掉旧实例
3. 重新 `build + start`
4. 重新用真实页面状态做 sweep

## 重新 sweep 后的判断

在干净实例下，关键 route 的量化重新回到可信状态：

- `/daily-latin`
  - desktop: `2456`
  - mobile: `5995`
- `/dance-os`
  - desktop: `2626`
  - mobile: `5603`
- `/dashboard`
  - desktop: `3140`
  - mobile: `5096`

这说明：

- 当前真正最掉队的不是首页
- 也不是 `dashboard`
- 而是 `daily-latin` 手机端

其中最大块很明确：

- `Today Loop Demo`
  - mobile: `1248`
- `Live Return / Clip Bridge / Archive Jump`
  - mobile: `829`

## 这轮先做了一个更上游的共享壳体修正

在真实手机首屏复核中，先发现了一个更上游的问题：

- 移动端导航虽然断点生效
- 但 `mobile nav` 默认整块展开
- 第一屏被导航壳体大面积占用

这会直接拖累所有 route 的移动端体验。

所以先处理共享壳体，而不是只改 `daily-latin` 内容块。

### 实际改动

- 改动文件：
  - `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/shell/mobile-nav.tsx`
  - `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/shell/sidebar.tsx`
  - `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 改动内容

1. 把移动端导航从“默认整块展开”改成“默认折叠”
2. 顶部只保留：
   - 品牌
   - `TODAY READY`
   - 当前 route 摘要
   - `导航 +` 按钮
3. 展开时再显示完整导航组
4. 同步做路径归一化
   - 解决 `/daily-latin` 与 `/daily-latin/` 的 active 判断漂移

### 量化结果

- 移动端 `mobile-nav-shell` 高度：
  - 之前：约 `694`
  - 现在：`99`

这一步不是局部美化，而是把手机首屏重新还给页面主体。

## 在共享壳体修正后，继续收 `daily-latin` 手机端

在壳体收口后，这轮继续直接压：

- `daily-latin` 上半屏 detail 区
- `Today Loop Demo`
- `Daily ReturnBoard`

### 实际改动

- 主要改动文件：
  - `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 做法

继续走共享样式层，而不是改交互逻辑：

- header / pill / tabs 再压一层
- `compact-detail-daily-top`
  - padding
  - gap
  - title
  - kv 列宽
  - chip 尺寸
- `compact-route-stage-daily`
  - stage card padding
  - metric / signal 字级
- `compact-source-matrix-daily`
  - padding
  - row 尺寸
- `compact-ledger-shell`
  - card padding
  - kicker / title / copy / choice / task / result / button 尺寸
  - witness textarea 高度
- `compact-daily-return-board`
  - metric pill
  - panel padding
  - mode card
  - queue card
  - CTA 尺寸

## 这轮后的量化结果

### `daily-latin`

- mobile total：
  - 之前：`5995`
  - 现在：`5067`

- `状态分流 / 4 步起步 / 回流判断`
  - 之前：`464`
  - 现在：`421`

- `本页依据`
  - 之前：`367`
  - 现在：`321`

- `Today Loop Demo`
  - 之前：`1248`
  - 现在：`1115`

- `Live Return / Clip Bridge / Archive Jump`
  - 之前：`829`
  - 现在：`745`

这轮的价值很明确：

- 不是“少一点字”
- 而是把手机端主掉队块继续收薄
- 同时让整个首屏回到参考稿那种更像工作台入口的节奏

## 真实页面结论

这轮后，`daily-latin` 手机首屏已经从：

- 几乎全是导航

变成：

- 轻量导航头
- 页面标题
- anchor tabs
- 第一块 `Daily Entry Snapshot`

也就是：

- 页面主体重新回到了第一屏

## 验证

这轮已通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

其中 browser smoke 还同步补了一处必要修复：

- 因为移动导航现在默认折叠
- 旧 smoke 不能再直接点击移动端 `Daily Latin` 链接
- 所以新增：
  - 先点击 `展开导航`
  - 再继续移动端路径验证

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/browser-smoke.py`

## 这轮后的判断

这轮最重要的不是某一个页面卡片再薄一点，而是两件事同时成立：

1. 移动端共享壳体终于不再吞掉首屏
2. `daily-latin` 手机端最大厚块继续明显下降

当前主任务仍未完成。

但这轮之后，下一次最值得继续看的方向会更集中到：

- `daily-latin` 的 `Today Loop Demo` 是否还能再轻一层
- `dance-os` 手机端 `Correction Ledger Demo` 与 `Body Map / Practice Queue` 是否需要继续同步收口

而不需要再回到移动端导航壳体层面。
