# 2026-07-08 Home Copy Clean Pass

## 背景

上一轮首页已经完成了两个重要动作：

- hero 左侧主叙事从 `PHASE 1.5` 收成 `TODAY`
- `Next Session Queue` 从独立 section 收成更薄的 workbench rail

结构上已经更接近参考稿，但复核最新截图后，仍然有一层明显差距：

- hero 右侧仍带有偏内部推进语言
- workbench 模块摘要仍残留 `repo / process / preview` 感

也就是说，首页当前剩下的 gap 不是结构先不对，而是：

**结构已经更接近参考稿，但内容语气还没有完全进入“真实前台入口”状态。**

## 这轮目标

不再改布局，不再增加新块，也不回头平均动整站。

这轮只做内容层收口：

1. 继续把 hero 右侧从内部推进语气拉回用户入口语气
2. 继续清理首页模块摘要里的 `repo / process` 术语

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`

这轮没有动：

- route 结构
- 组件边界
- 共享 CSS 壳体
- 交互逻辑

说明这轮是一次明确的：

- `content truth / copy tone`
- 而不是 `layout pass`

### 1. Hero 右侧继续清理内部推进语言

这轮把：

- `入口结构完成`
- `当前阶段`
- `Daily · Dance OS`
- `从 Daily 开始 →`

改成更接近真实首页入口语气：

- `本周入口就绪`
- `今天先去`
- `Daily / Dance OS 选一条`
- `先做 Daily 一轮 →`

目的不是“更口语”，而是让首页右侧和左侧主叙事一致：

- 左边说今天从哪开始
- 右边就应该说现在先去哪里

而不是继续像内部推进状态板。

### 2. Hero 下方 stats 也收回真实入口语言

原先：

- `关键入口`
- `核心路由`
- `并行轨道`

这类说法仍然偏系统设计视角。

这轮改成：

- `今日入口`
- `真实页面`
- `回流轨道`

仍然保留数字，但把语言拉回首页入口视角。

### 3. 首页模块摘要继续去 `repo / process` 感

这轮对首页 `6` 个模块卡都做了内容语气清理。

#### `旧站 Proof`

从：

- `legacy proof`
- `保留 / 映射 / 并行`

收成：

- `先看旧版起步页`
- `判断你今天从哪开始`

#### `Daily Latin`

从：

- `状态分流`
- `做一轮 / 留 1 点`

收成：

- `断练后重启 / 刚看完直播`
- `做一轮 / 留一句 witness`

#### `Dance OS`

从：

- `录 / 看 / 记 / 下一步`
- `Correction Ledger`

收成：

- `拍子乱 / 脚下乱 / 重心乱`
- `把卡点压成下一步`

#### `来源与规则` → `练习依据`

原先这个模块在首页里最像内部规则页。

这轮直接把标题也收回更像前台入口的：

- `练习依据`

并改成：

- `LATIN / 直播计划 / DEMO`
- `飞书为准 / 旧站先保留`

#### `路线图`

从：

- `Phase 1.5`
- `把 2 个 demo 做深`

收成：

- `先把入口和 demo 跑顺`
- `再决定怎么接旧域名`

#### `状态看板`

从：

- `type / build / browser`
- `preview 已跑通`

收成：

- `哪些 route 已经跑顺`
- `Daily / Dance witness`

这样首页模块区现在更像：

- 你会点进去看的入口

而不是：

- 你要先理解项目管理术语的摘要表

## 量化结果

由于这轮只改内容，没有改布局，变化主要体现在文本换行造成的轻微高度波动。

基于本地 prod 预览 `http://127.0.0.1:3200` 的真实测量：

- 桌面端全页：
  - `1492`
- 手机端全页：
  - `2712`
- 桌面端 `hero`：
  - `368`
- 桌面端 `home-lower-cluster`：
  - `489.06`
- 手机端 `hero`：
  - `547.36`
- 手机端 `home-lower-cluster`：
  - `835.17`

对比上一轮：

- 上一轮桌面端：
  - `1457`
- 上一轮手机端：
  - `2676`

这轮略有回升，主要来自：

- 模块摘要更真实后文字换行变多
- hero 右侧文案也更完整

因此这轮不属于 `height reduction pass`，而属于：

- `copy truth pass`

## 截图

- 当前首页桌面端：
  - `/tmp/home-after-copy-clean-pass-desktop.png`
- 当前首页手机端：
  - `/tmp/home-after-copy-clean-pass-mobile.png`
- 上一轮首页桌面端：
  - `/tmp/home-after-queue-rail-pass-desktop.png`
- 上一轮首页手机端：
  - `/tmp/home-after-queue-rail-pass-mobile.png`
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

- 这轮只动内容层，没有误伤组件边界
- `Daily Latin` / `Dance OS` / `dashboard` 交互 smoke 继续通过
- mobile home / daily 无横向 overflow

## 这轮后的判断

这轮最重要的价值不是“首页更短”，而是：

- 首页右侧终于更少像内部推进板
- 模块入口终于更少像项目说明摘要

当前首页已经更接近参考稿那种：

- 前台入口感
- 连续练习感
- 打开后就知道先去哪的感觉

## 仍然没完成的主要缺口

这轮之后首页仍未达到“近似同款完成度”。

当前更明显的 gap 开始继续集中到：

1. 顶部 pill 仍然带较强的 `Phase 1.5 / frontdoor preview` 内部推进语气
2. heatmap 区块下方说明仍偏系统说明
3. 模块卡虽然语气更真，但内容密度还可以再朝参考稿那种更克制的入口摘要再压一层

## 下一轮最值得继续做什么

1. 继续处理首页顶部 pill 与 heatmap 辅助说明的内部推进语言
2. 在不回退真实内容的前提下，再压一轮模块卡摘要密度
3. 继续只在首页做高 ROI polish，不重新分散到整站
