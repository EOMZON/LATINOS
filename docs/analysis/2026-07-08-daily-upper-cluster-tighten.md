# 2026-07-08 Daily Upper Cluster Tighten

## 背景

昨天已经把 `Daily Latin` 从默认全摊开的长链收短了一轮。

但继续看真实截图后，仍然有一个非常具体的问题：

- 上半段 `daily-upper-cluster` 高度过高
- 左侧 `snapshot` 下方出现明显黑区
- 右侧 source side panel 过高，拖长了第一屏后的节奏

这不是“字再短一点”能解决的问题，而是上半段布局密度问题。

## 问题定义

当前最大的浪费不是出在：

- 路由结构
- 交互逻辑
- 数据分层

而是出在：

- `Daily Latin` 上半段的空间使用效率

也就是说，这轮真正要解决的是：

**让 `Daily Latin` 第一屏之后的结构更快接上，减少 source panel 造成的拖长，并让页面更接近参考稿那种紧凑、清晰、完成度高的 workbench 节奏。**

## 这轮动作

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. 调整 `compact-detail-daily-top` 列宽

动作：

- 不再维持完全平均的两列感
- 让右侧 `Daily Latin Demo` 文本区拿到更合理的宽度

意义：

- 减少右侧文字区“偏挤”的感觉
- 让顶部 detail 更像一个被设计过的双栏总览，而不是机械拆半

### 2. 继续压缩 `compact-source-matrix-daily-side`

动作：

- side variant 的整体 padding / gap 再压一层
- panel title 再缩一层

意义：

- 让右侧 source panel 更像 reference-side panel
- 减少它在视觉上拖成厚块

### 3. 把 side panel rows 改成双列紧凑布局

动作：

- source rows 不再一列堆满
- 改成两列紧凑 rows

意义：

- 直接减少 `daily-upper-cluster` 的垂直高度
- 收掉 detail 下方黑区的根源

## 量化结果

这轮前：

- `Daily Latin` 总高度：`2669`
- `daily-upper-cluster` 高度：`571.34`

这轮后：

- `Daily Latin` 总高度：`2456`
- `daily-upper-cluster` 高度：`358.69`

也就是说：

- 全页又下降了约 `213`
- 上半段 cluster 直接下降了约 `212.65`

这说明这轮几乎是精准打掉了当前最明显的上半段浪费。

## 结果判断

从最新桌面端截图看：

- `Daily Latin` 上半段已经不再被 source panel 过高拖住
- detail 与 source 的关系明显更协调
- 第一屏后更快进入 `入口状态 / Daily Loop`

从最新手机端截图看：

- 顶部结构仍然稳定
- 没有出现新的横向溢出
- 上半段语言仍和桌面端一致

## 证据

截图：

- 桌面端：
  - `/tmp/latinos-daily-upper-tighten-0708.png`
- 手机端：
  - `/tmp/latinos-daily-upper-tighten-0708-mobile.png`

验证：

- `pnpm verify`
- build / route smoke / prod smoke / browser smoke
- mobile overflow 继续为绿

## 剩余差距

这轮之后，`Daily Latin` 更接近参考稿，但仍然还没完成：

1. `Today Loop Demo` 仍然是当前页最大的单块
2. `Live Return` 仍然偏“功能板”，还可以再向开放式 workbench 收一点
3. 首页 hero 仍然还差最后一层比例与完成感 polish

## 下一步

下一轮优先级：

1. 收 `Today Loop Demo`
2. 再收 `Live Return`
3. 等 `Daily Latin` 再稳一层后，再回首页 hero 做最后一轮收口
