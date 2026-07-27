# 2026-07-08 Roadmap Decision Density Pass

## 背景

在前面几轮里，`Daily Latin` 和 `Dance OS` 的主要工作都在：

- 收 compact workbench 密度
- 压掉厚块
- 让交互页更接近参考稿的节奏

但做完这些之后，再回头看整站截图，会发现新的掉队页不再是这两个 demo route。

当前更明显的问题转移到了：

- `/roadmap`

它虽然已经有真实内容，但桌面端仍然明显偏空，更像：

- 说明页
- 轻文档页

而不像同一套深色 workbench 体系里的 route。

## 这轮目标

这轮不再追求“更短”，而是追求：

- 更像真实决策页
- 更像参考稿里的高密度工作台 route
- 更像这条线当前真的在执行的路线图，而不是抽象阶段说明

也就是说，这轮是：

- `decision density pass`

不是：

- `height reduction pass`

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/roadmap/page.tsx`

### 1. 新增切入口前的 gate 内容

新增两组 route 级真实判断：

- `roadmapGateLeft`
- `roadmapGateRight`

对应内容不是模板，而是来自当前已锁定策略：

- frontdoor preview 必须成立
- Daily Latin 入口闭环必须成立
- Dance OS 工具闭环必须成立
- 验证链必须存在
- 当前明确不做切生产入口
- 当前明确不推倒旧站
- 不允许回到单文件方案
- 不允许回到 Notion 双轨

### 2. 新增“不绑死的 3 个动作”

新增：

- `roadmapGuardCards`

这部分直接把 `website-strategy` 里最关键的长期判断前台化：

1. 先立结构
2. 再做新入口
3. 最后评估域名

重点不是增加卡片数量，而是把当前真正的决策逻辑显式化，避免这页继续停留在“阶段列表 + 交付卡片”的浅层状态。

## 视觉结果

### 之前的问题

这页之前最主要的问题不是太长，而是：

- 桌面端明显偏空
- 下半屏留白过多
- 路由完成感不足
- 和首页 / Daily / Dance OS 的工作台密度不一致

### 这轮后的变化

这页现在更像：

- 一个 route 级决策面板
- 一页能直接回答“当前必须成立什么、明确不做什么、哪些动作不能绑死”的工作台

也更符合参考稿那种：

- 上半段概览
- 中段决策矩阵
- 下半段执行护栏

## 量化与截图

注意：

- 这轮页高增加是预期结果，不是回退

真实测量：

- `/roadmap` 桌面端：
  - 之前：`960`
  - 现在：`1481`
- `/roadmap` 手机端：
  - 之前：`2052`
  - 现在：`3538`

这里不能把“更长”理解为更差，因为之前 `960` 的主要含义是：

- 内容过少
- 桌面端空白太多

当前截图：

- 桌面端：
  - `/tmp/roadmap-after-gates-desktop-fresh.png`
- 手机端：
  - `/tmp/roadmap-after-gates-mobile-fresh.png`

## 验证

已通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`

继续确认：

- 路由标题未变
- `roadmap` 页面可稳定渲染
- 新增内容未误伤已有 demo route

## 这轮后的判断

这轮很重要，因为它修复的是一个容易被忽略的问题：

- 不只是某个组件不够紧
- 而是某条 route 的身份还不够真

现在 `/roadmap` 已经更像这条线真实在运行的决策页，而不是旁边的一张说明纸。

## 下一轮最值得继续做什么

1. 继续做整站级 route 完成感复核，看看 `tools` 或 `about` 是否仍然明显掉队
2. 继续用本地真实资料压掉剩余模板感
3. 只在真正需要时再回到单页密度微调，而不是默认所有页面都继续做“压短 pass”
