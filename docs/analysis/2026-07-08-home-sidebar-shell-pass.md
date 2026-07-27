# 2026-07-08 Home Sidebar Shell Pass

## 背景

上一轮首页已经把：

- 顶部 `eyebrow`
- footer
- 模块卡密度

都往参考稿方向收了一层。

但继续看桌面端和手机端截图后，会发现新的最明显残留差距不再是首页正文，而是：

- 左侧 sidebar 顶部壳体
- mobile shell 顶部壳体

当前问题主要有两层：

1. 顶部站名仍偏“品牌 / 系统名”
2. live badge 与 footer 文案仍偏“内部状态条”

也就是说，首页壳体已经不再结构错误，但还没完全进入参考稿那种：

- 更克制
- 更像练习入口
- 不像后台说明条

## 这轮目标

继续只改共享壳体层，不回到首页 page 局部补丁。

这轮集中做：

1. 收 `siteMeta` 的品牌壳体文案
2. 收 sidebar / mobile shell 的 live badge 与 footer 语气
3. 让移动端顶部壳体也跟着一起更像前台入口

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/site.ts`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. sidebar / mobile shell 顶部品牌区收回“练习入口”语气

原先：

- `拉丁成长工作台`
- `LATIN DANCE OS · SINCE 2026`

这仍然更像一个系统名称。

这轮改成：

- `拉丁练习入口`
- `PRACTICE LOG · SINCE 2026`

这样顶部更接近参考稿那种：

- 一个清楚的前台名字
- 一条轻的副标题

而不是先理解内部系统概念。

### 2. live badge 从内部验证状态收回“今天可进入”语气

原先：

- `PREVIEW VERIFIED · 8 ROUTES`

这很明显是内部验证状态。

这轮改成：

- `TODAY READY · 8 ROUTES`

它仍然保留了“今天已经可进入”的状态感，但不再像纯开发校验标签。

### 3. shell footer 从内部原则语气收回用户入口语气

原先：

- `旧站保留 · 双轨并行 · 飞书为准`

这对内部是对的，但在壳体底部更像“系统规则”。

这轮改成：

- `先看旧站 / 再进 Daily / 或去 Dance OS`

这样 sidebar 与 mobile shell 底部都更像：

- 给你三个真实入口

而不是：

- 再强调一次内部治理原则

### 4. sidebar 壳体字级继续收轻

这轮顺手在共享样式层继续压轻：

- `.brand .name`
- `.brand .sub`
- `.sidebar-foot`
- `.live-badge`

这样壳体整体更克制，也更接近参考稿那种：

- 壳体存在
- 但不抢正文

## 量化结果

基于本地 prod 预览 `http://127.0.0.1:3200` 的真实测量：

- 桌面端全页：
  - `1468`
- 手机端全页：
  - `2657`
- 桌面端 `home-lower-cluster`：
  - `466.05`
- 桌面端 `modules`：
  - `281.84`
- 桌面端 `footer`：
  - `40.59`

- 手机端 `home-lower-cluster`：
  - `818.23`
- 手机端 `modules`：
  - `415.77`
- 手机端 `footer`：
  - `40.59`

### 相比上一轮

上一轮首页量化状态：

- 桌面端：
  - `1468`
- 手机端：
  - `2667`

这一轮桌面端基本持平，手机端轻降：

- `2667 -> 2657`

说明这轮主要是：

- `shell tone pass`

而不是：

- `height reduction pass`

## 截图

- 当前首页桌面端：
  - `/tmp/home-after-sidebar-shell-pass-desktop.png`
- 当前首页手机端：
  - `/tmp/home-after-sidebar-shell-pass-mobile.png`
- 上一轮首页桌面端：
  - `/tmp/home-after-eyebrow-footer-pass-desktop.png`
- 上一轮首页手机端：
  - `/tmp/home-after-eyebrow-footer-pass-mobile.png`
- 参考首页桌面端：
  - `/tmp/reference-home-desktop.png`
- 参考首页手机端：
  - `/tmp/reference-home-mobile.png`

## 验证

已通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- 这轮只动共享壳体层，没有误伤 route / interaction
- mobile shell 仍正确切换
- mobile home / daily 无横向 overflow

## 这轮后的判断

这轮价值很高，因为当前首页的“系统后台感”主要就来自这层壳体。

现在 sidebar 与 mobile shell 已经更接近参考稿那种：

- 名称更克制
- 状态更像“今天可进入”
- 底部更像真实入口收口

## 仍然没完成的主要缺口

这轮之后首页仍未达到“近似同款完成度”。

当前更明显的剩余 gap 开始继续集中到：

1. hero / heatmap / workbench 之间最后一层整体完成感
2. 手机端首页 workbench rail 与模块区仍略密
3. 参考稿那种“整页一气呵成”的完成感，当前仍差最后几轮微收口

## 下一轮最值得继续做什么

1. 再做一次整页 desktop + mobile completion audit，只看首页
2. 判断最后的最大残留差距到底是：
   - hero 比例与语言
   - workbench rail 密度
   - mobile 模块区密度
3. 继续只做首页高 ROI 微收口，不重新分散到整站
