# 2026-07-08 Home Desktop Rail Pass

## 背景

在上一轮完成：

- sidebar / mobile shell 壳体收口
- mobile density pass

之后，重新对照当前桌面端与参考稿首页，会发现当前最大的 whole-page gap 已经不再是：

- 手机端太厚
- 或 hero 完全不对

而更明确地集中到：

- 首页 `工作台` 上方那条 `rail`

当前 rail 虽然已经比早期薄很多，但在桌面端仍然比参考稿的下层入口更像：

- 一个功能块

而不是：

- 一个轻的 return strip / open workbench rail

## 问题定义

真正要解决的不是“再把下半段都压短”，而是：

**怎样在保留真实回流入口与按钮的前提下，让桌面端 `workbench rail` 更接近参考稿那种开放式工作台节奏。**

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/page.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. 工作台 header 文案再收短

`工作台` 的右侧说明从：

- `先回到最近一轮，再进入 Daily / Dance / legacy / rules`

收成：

- `先回到最近一轮，再进对应页面`

这一步虽然小，但减少了 header 右侧的解释感，也更符合当前这条 rail 已经承担“回流入口”职责的状态。

### 2. 桌面端 rail 进一步薄化

这轮没有动组件逻辑，只继续收桌面端 rail 样式：

- `queue-rail-list` gap 略降
- `queue-rail-item` top padding 降低
- `strong` 标题继续压小
- `queue-meta` 直接隐藏
- `queue-rail-item p` 说明直接隐藏
- CTA button 的 padding 与字级继续下降

也就是说，这轮桌面端 rail 从：

- `title + meta + note + button`

继续收成更接近：

- `title + button`

这样保留了：

- 真实 witness title
- route resume button

但明显减少了：

- 说明层
- 功能块厚度

## 量化结果

基于本地 prod 预览 `http://127.0.0.1:3200` 的真实测量：

### 当前首页

- 桌面端全页：
  - `1437`
- 手机端全页：
  - `2439`

### 当前首页关键区块

- 桌面端 `home-lower-cluster`：
  - `434.84`
- 桌面端 `rail`：
  - `106.41`
- 桌面端 `modules`：
  - `281.84`

- 手机端 `home-lower-cluster`：
  - `599.86`
- 手机端 `rail`：
  - `263.27`
- 手机端 `modules`：
  - `294`

### 相比上一轮

上一轮首页量化状态：

- 桌面端全页：
  - `1468`
- 手机端全页：
  - `2477`
- 桌面端 `home-lower-cluster`：
  - `466.05`

这一轮变化：

- 桌面端：
  - `1468 -> 1437`
- 手机端：
  - `2477 -> 2439`
- 桌面端 `lower`：
  - `466.05 -> 434.84`

这说明这轮虽然只集中在 desktop rail，但它确实进一步收掉了首页下半段的厚度。

## 截图

- 当前首页桌面端：
  - `/tmp/home-after-desktop-rail-pass-desktop.png`
- 当前首页手机端：
  - `/tmp/home-after-desktop-rail-pass-mobile.png`
- 上一轮首页桌面端：
  - `/tmp/home-after-mobile-density-pass-desktop.png`
- 上一轮首页手机端：
  - `/tmp/home-after-mobile-density-pass-mobile.png`
- 参考首页桌面端：
  - `/tmp/reference-home-desktop.png`

## 验证

已通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- 这轮只动首页文案与共享样式层，没有误伤 queue resume
- `Daily Latin` / `Dance OS` / `dashboard` 相关交互 smoke 继续通过
- mobile home / daily 无横向 overflow

## 这轮后的判断

这轮价值很高，因为当前桌面端首页已经更接近参考稿那种：

- 上面是主叙事
- 中间是 heatmap
- 下面是更轻的入口层

也就是说，下半段不再那么像一个功能板，而更像一组可进入的开放式入口。

## 仍然没完成的主要缺口

这轮之后首页仍未达到“近似同款完成度”。

当前更明显的剩余 gap 开始继续集中到：

1. hero / heatmap / workbench 三段之间最后一层整体完成感
2. 桌面端主叙事虽然方向对了，但和参考稿仍有一层“具体性”差距
3. 整页已经明显接近，但还没到“几乎同作品”的完成感

## 下一轮最值得继续做什么

1. 继续只做首页，再做一次 desktop + mobile visual audit
2. 判断最后的 Top1 gap 是：
   - hero copy specificity
   - hero / heatmap spacing
   - 整页完成感微收口
3. 继续只做最后几轮高 ROI polish，不重新分散到整站
