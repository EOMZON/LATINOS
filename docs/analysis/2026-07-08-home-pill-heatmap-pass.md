# 2026-07-08 Home Pill + Heatmap Pass

## 背景

上一轮首页已经把：

- hero 右侧
- 模块摘要

里的 `repo / process / preview` 语气收掉了一层。

但继续看最新截图，首页顶部仍然还有两块明显带着“内部推进板”气质：

1. 顶部 pill：
   - `Phase 1.5 / frontdoor preview`
2. heatmap 区块辅助说明：
   - `结构 / 内容 / demo`
   - `关键结构动作`

这些词在内部分析文档里没问题，但放在首页前台入口上，仍然会让页面更像：

- 项目进度板

而不是：

- 用户今天能从哪开始的前台入口

## 这轮目标

不改布局，不扩新块，不动交互。

这轮只做两件事：

1. 把顶部 pill 收回“今天先怎么开始”的入口语言
2. 把 heatmap 辅助说明收回“这一周有没有真的留下入口/回流点”的前台语言

同时顺手把这部分文案从页面里抽回内容层，继续强化：

- `数据 / 文案`
- `页面组合`
- `组件渲染`

之间的边界。

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/sections/heatmap.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/page.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/structure-smoke.mjs`

### 1. 顶部 pill 从内部阶段说明收回入口动作说明

原先：

- `2026-07-07 · Phase 1.5 / frontdoor preview`

这更像内部推进标签。

这轮改成：

- `2026-07-07 · 今天先选状态，再做一轮`

这样顶部 pill 不再主要解释当前项目阶段，而是直接服务首页用户的下一步动作。

### 2. heatmap 的标题与辅助说明收回练习入口语言

原先首页 heatmap 区：

- `连续推进 · 12 周`
- `深色 = 这一周的结构 / 内容 / demo 更完整`
- `灰格 = 未开始 · 紫格 = 当前周完成关键结构动作`

这轮收成：

- `连续练习 · 12 周`
- `深色 = 这一周真的留下了入口、练习或回流点`
- `灰格 = 还没真正开始 · 紫格 = 这一周已经留下可回来的入口`

这样这块不再重点解释系统建设，而更像在回答：

- 这一周有没有真的开始
- 有没有留下下次还能回来的入口

### 3. heatmap 文案从页面层抽回内容层

新增：

- `HomeHeatmapData`
- `homeHeatmap`

并把下面这些内容从页面 JSX 抽回 `data/content.ts`：

- section title
- section more
- rangeLabel
- note

同时给 `Heatmap` 组件补了可选 props：

- `rangeLabel`
- `note`

这样这块的结构边界更稳：

- 页面只负责组装
- 内容由 `data` 提供
- 组件只负责渲染

## 量化结果

这轮没有改布局，因此整体高度基本不变。

基于本地 prod 预览 `http://127.0.0.1:3200` 的真实测量：

- 桌面端全页：
  - `1492`
- 手机端全页：
  - `2712`
- 桌面端 `hero`：
  - `368`
- 桌面端 `heatmap`：
  - `288.89`
- 桌面端 `home-lower-cluster`：
  - `489.06`
- 手机端 `hero`：
  - `547.36`
- 手机端 `heatmap`：
  - `254.44`
- 手机端 `home-lower-cluster`：
  - `835.17`

这说明这轮是一次明确的：

- `copy / information tone pass`

而不是：

- `height reduction pass`

## 截图

- 当前首页桌面端：
  - `/tmp/home-after-pill-heatmap-pass-desktop.png`
- 当前首页手机端：
  - `/tmp/home-after-pill-heatmap-pass-mobile.png`
- 上一轮首页桌面端：
  - `/tmp/home-after-copy-clean-pass-desktop.png`
- 上一轮首页手机端：
  - `/tmp/home-after-copy-clean-pass-mobile.png`
- 参考首页桌面端：
  - `/tmp/reference-home-desktop.png`
- 参考首页手机端：
  - `/tmp/reference-home-mobile.png`

## 验证

已通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

过程中同步修正了一个真实 smoke 基线：

- `structure-smoke.mjs`

因为 heatmap 标题从：

- `连续推进`

改成了：

- `连续练习`

## 这轮后的判断

这轮价值不在于视觉块级大变，而在于首页又少了一层“项目状态板”感。

现在首页顶部更像：

- 今天从哪开始
- 这一周有没有真的留下能回来的入口

而不是：

- 当前项目在推进什么内部阶段

## 仍然没完成的主要缺口

这轮之后首页仍未达到“近似同款完成度”。

当前更明显的剩余 gap 开始继续集中到：

1. 首页 footer 仍然明显带 `frontdoor / legacy / demos / Feishu` 这种内部结构语气
2. 顶部 eyebrow `LATIN DANCE OS · 工作台` 仍偏系统命名，不够像参考稿的直接前台标识
3. 模块卡摘要虽然更真，但整体 still slightly denser than reference

## 下一轮最值得继续做什么

1. 继续清理首页 footer 与顶部 eyebrow 的内部结构语气
2. 在不牺牲真实内容的前提下，再收一轮模块卡文字密度
3. 继续只在首页做高 ROI polish，不重新分散到整站
