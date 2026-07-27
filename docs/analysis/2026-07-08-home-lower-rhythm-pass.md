# 2026-07-08 Home Lower Rhythm Pass

## 背景

上一轮 `today realness pass` 之后，首页上半屏已经更像：

- 今天先做什么
- 这一轮先守住什么

也就是说，hero 的“现场感”已经明显比之前更对。

但继续对照参考稿：

- `/Users/zon/Downloads/latin-workbench (2).html`

当前首页最细的一层差距，开始集中到桌面端下半屏：

- `工作台` header 仍略重
- `Daily / Dance OS` route pills 仍略显眼
- queue rail 和 module grid 的存在感还可以再轻一点
- footer 还可以再更退后

## 问题定义

这一轮不再碰：

- hero 内容
- 路由结构
- 交互逻辑

只解决一个很小但高 ROI 的问题：

**能不能只通过共享 CSS 层，把首页下半屏桌面端再收轻一层，让它更像参考稿那种安静的开放式工作台。**

## 这轮动作

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. workbench 顶部节奏继续收薄

动作：

- `compact-sec-head` 在首页 workbench 中：
  - `margin-bottom: 10px -> 8px`
- `compact-queue-rail-board`
  - `margin-bottom: 16px -> 14px`
- queue rail 顶部 `head-rail`
  - `gap: 12px -> 10px`
  - `margin-bottom: 8px -> 6px`
- `queue-rail-title`
  - 字级再轻一层
  - 颜色再退后一点
  - letter-spacing 略收

意义：

- 让 `工作台 -> rail` 的起手更像参考稿那种轻提示
- 而不是再像一个需要阅读解释的内部控制条

### 2. route pills 再退后一层

动作：

- `queue-route-link`
  - `min-width: 76px -> 70px`
  - `padding: 5px 9px -> 4px 8px`
  - `font-size: 9.3px -> 8.8px`
  - 文字、边框、背景都更轻

意义：

- pills 仍然存在
- 但它们更像 quiet route switch
- 不再和核心内容抢壳

### 3. queue rail 本体再轻一层

动作：

- desktop 首页 queue rail：
  - `gap: 12px -> 10px`
- rail item title：
  - `9.8px -> 9.5px`
- inline resume link：
  - 字级更小
  - 边框更淡
  - 色彩更退后

意义：

- 保持回流能力不变
- 但让 rail 更像一个轻轨道，而不是半张功能卡

### 4. module grid 与 footer 再收一层

动作：

- `compact-module-grid`
  - `gap: 18px 22px -> 16px 20px`
- module card：
  - `min-height: 126px -> 120px`
  - padding 再收小
- summary / detail：
  - 字级与 line-height 继续下降一层
  - max-width 更收
- footer：
  - `padding-top: 20px -> 16px`
  - 字级更小
  - opacity 更低

意义：

- 继续把下半屏做成开放式入口
- 不是再堆厚信息卡
- footer 也更像最末尾的 quiet closing line

## 量化结果

基于本地 `http://127.0.0.1:3200` 的真实测量：

### 桌面端

- `home-workbench-stack`
  - 之前：`423.69`
  - 现在：`403.78`
- queue rail：
  - 现在：`101.13`
- footer：
  - 现在：`32.67`
- 首页总高度：
  - 之前：`1403`
  - 现在：`1378`

### 手机端

- `home-workbench-stack`
  - 之前：`501.61`
  - 现在：`501.14`
- queue rail：
  - 现在：`107.73`
- footer：
  - 现在：`32.67`
- 首页总高度：
  - 之前：`2330`
  - 现在：`2325`

判断：

- 这轮桌面端下半屏继续变薄
- 手机端几乎不变，没有因为桌面端收口而误伤移动端节奏

## 视觉证据

这轮截图：

- 桌面端：
  - `/tmp/latinos-home-after-lower-rhythm-pass-desktop.png`
- 手机端：
  - `/tmp/latinos-home-after-lower-rhythm-pass-mobile.png`

上一轮截图：

- 桌面端：
  - `/tmp/latinos-home-after-today-realness-pass-desktop.png`
- 手机端：
  - `/tmp/latinos-home-after-today-realness-pass-mobile.png`

参考稿：

- `/tmp/reference-home-desktop.png`
- `/tmp/reference-home-mobile.png`

## 验证

这轮后通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- 首页真实预览已复核
- mobile home / daily 继续无横向 overflow
- `Daily Latin` / `Dance OS` 交互 smoke 未回退

## 这轮后的判断

这轮价值不在于“变化很明显”。

它真正缩小的是最后一层下半屏差距：

- 从：
  - 首页下半段已经对，但还略重
- 到：
  - 首页下半段更接近参考稿那种 quiet workbench rhythm

也就是说：

- 结构没变
- 验证没退
- 但桌面端完成感又更接近参考稿了一层

## 剩余差距

当前仍然不能判定完成。

剩余差距继续变得很细，主要在：

1. 首页整体的最后一层 atmosphere 是否已足够“同一作品体系”
2. 关键二级页是否都达到了和首页接近的完成度
3. 整站是否还存在比首页更掉队的 route

## 下一步

下一轮最值得做的是：

1. 做一次关键二级页一致性 sweep：
   - `/daily-latin`
   - `/dance-os`
   - `/dashboard`
2. 如果首页仍然是最大差距，再做 very small 的整体 atmosphere polish
3. 继续坚持共享层优先，不回到页级零散补丁
