# 2026-07-08 Home Mobile Density Pass

## 背景

在前面连续几轮里，首页已经完成了：

- 顶部语言收口
- hero 主叙事收口
- heatmap 说明收口
- sidebar / mobile shell 壳体收口

这时再看整页桌面端与手机端截图，最明显的剩余 gap 已经不再主要在桌面端结构，而开始集中到：

- 手机端首页 `workbench rail`
- 手机端首页 `module cards`

也就是说，当前最掉队的不是信息架构，而是：

**手机端密度仍然比参考稿更厚。**

## 这轮目标

继续只做首页，不回到整站平均修改。

这轮专门做一轮：

- `mobile-only density pass`

目标不是删内容，而是让手机端 workbench 区块更接近参考稿那种：

- 更薄
- 更快读
- 更少说明感

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

这轮没有改：

- 路由结构
- 数据层
- 组件逻辑
- 桌面端布局

说明这轮是一次非常明确的：

- `mobile density tuning`

### 1. 手机端模块卡继续压薄

对 mobile 下的：

- `.home-module-card`
- `.compact-module-grid .home-module-card`

继续收：

- `min-height`
- `padding`
- `summary` 字级与行高
- `note` 字级与行高

同时在首页专属的 mobile workbench 区下：

- `home-module-note` 直接隐藏
- `home-module-summary` 用 `2` 行 clamp 收住

这样手机端模块卡不再像：

- 小型说明卡

而更像：

- 轻入口

### 2. 手机端 rail 继续压薄

对 mobile 下的首页 rail 继续收：

- rail board margin-bottom
- rail head gap
- rail list gap
- rail item top padding
- rail item title / body 字级
- queue meta 直接隐藏

这样手机端 rail 从：

- 小功能区

继续往：

- 一条快速回流入口

靠近。

## 量化结果

基于本地 prod 预览 `http://127.0.0.1:3200` 的真实测量：

### 当前首页

- 桌面端全页：
  - `1468`
- 手机端全页：
  - `2477`

### 当前首页关键区块

- 桌面端 `home-lower-cluster`：
  - `466.05`
- 桌面端 `modules`：
  - `281.84`

- 手机端 `home-lower-cluster`：
  - `638.48`
- 手机端 `modules`：
  - `294`

### 相比上一轮

上一轮首页量化状态：

- 桌面端：
  - `1468`
- 手机端：
  - `2657`
- 手机端 `home-lower-cluster`：
  - `818.23`
- 手机端 `modules`：
  - `415.77`

这一轮变化：

- 手机端全页：
  - `2657 -> 2477`
- 手机端 `home-lower-cluster`：
  - `818.23 -> 638.48`
- 手机端 `modules`：
  - `415.77 -> 294`

这说明这轮不是“看起来更轻一点”，而是手机端首页的 workbench 区块确实被显著压短了。

## 截图

- 当前首页桌面端：
  - `/tmp/home-after-mobile-density-pass-desktop.png`
- 当前首页手机端：
  - `/tmp/home-after-mobile-density-pass-mobile.png`
- 上一轮首页桌面端：
  - `/tmp/home-after-sidebar-shell-pass-desktop.png`
- 上一轮首页手机端：
  - `/tmp/home-after-sidebar-shell-pass-mobile.png`
- 参考首页手机端：
  - `/tmp/reference-home-mobile.png`

## 验证

已通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- 这轮只动 mobile CSS，没有误伤组件逻辑
- mobile shell 继续正确切换
- mobile home / daily 无横向 overflow

## 这轮后的判断

这轮价值非常高，因为当前首页和参考稿之间最明显的差距已经明显转回：

- 不是手机端太厚
- 而是最后的整体完成感细节

现在手机端首页已经更接近参考稿那种：

- 上半段清楚
- heatmap 之后快速进入 rail
- module 区更像入口而不是说明卡

## 仍然没完成的主要缺口

这轮之后首页仍未达到“近似同款完成度”。

当前更明显的剩余 gap 开始继续集中到：

1. hero / heatmap / workbench 三段之间最后一层整体完成感
2. 桌面端主叙事与参考稿之间仍有细微比例与叙事差异
3. 整页虽然已经很接近，但还没到“几乎同作品”的程度

## 下一轮最值得继续做什么

1. 再做一次只看首页的 desktop + mobile visual audit
2. 判断最后的 Top1 gap 是：
   - hero 叙事
   - hero/heatmap spacing
   - desktop workbench 完成感
3. 继续只做首页最后几轮高 ROI 微收口
