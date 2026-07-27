# 2026-07-08 Home Queue Rail Pass

## 背景

上一轮首页已经做过：

- 顶层语言收回真实入口语气
- lower section 从左右分栏收成更接近参考稿的开放式工作台

但复核后仍然有两个明显差距：

1. `Next Session Queue` 仍然以一个完整独立 section 的高度存在
2. hero 虽然文案更对，但左侧大字仍然偏内部阶段叙事，不够接近参考稿那种直接的首页主叙事

也就是说，首页仍然离参考稿差一层：

- 下半段还不够薄
- 顶层连续感还不够直接

## 这轮目标

继续只改首页，不平均动整站。

这轮集中收两个问题：

1. 把 `Next Session Queue` 进一步薄化成真正的 `workbench rail`
2. 把 hero 左侧大字从 `PHASE 1.5` 收成更接近首页入口叙事的 `TODAY`

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/page.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/next-session-queue.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/browser-smoke.py`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/structure-smoke.mjs`

### 1. Queue 从独立 section 收成 workbench rail

上一轮首页下半段虽然已经更像开放式工作台，但仍然还有：

- `Next Session Queue` 一个单独 section
- `工作台` 一个单独 section

这和参考稿里更接近“一个工作台 section 内部自带不同层”的组织方式还不够一致。

这轮把它改成：

- 首页 lower area 仍然只有一个主 section：
  - `工作台`
- queue 不再单独占一个 header
- `NextSessionQueue` 新增：
  - `variant="rail"`

`rail` 变体的特点：

- 只保留一条：
  - `最近 witness → 下一轮`
- 右侧保留 `Daily / Dance OS` pills
- 下方直接进入 3 个回流 rail items
- 去掉原先更厚的内部标题和说明块

这样 queue 从“独立功能区”更明确收成：

- workbench 内的一条回流 rail

### 2. Hero 大字从阶段叙事收回首页入口叙事

`homeHero.phase` 这轮从：

- `PHASE 1.5`

改成：

- `TODAY`

同时把旁边的 note 改成：

- `从这里开始`
- `先做一轮`

这样做的目的不是为了更英文，而是让首页左侧主叙事：

- 不再主要讲当前内部阶段
- 而是更接近参考稿那种“今天从这里开始”的首页进入感

保留下来的阶段信息仍然在：

- 顶部 pill
- 右侧进度环

因此这轮不是丢掉阶段状态，而是把阶段状态从首页主叙事退到辅助信息层。

### 3. Smoke 同步更新

由于首页 hero marker 和 queue section marker 都发生了真实变化，这轮同步更新：

- `browser-smoke.py`
- `structure-smoke.mjs`

从检查：

- `PHASE 1.5`
- `Next Session Queue`

改成检查：

- `TODAY`
- `最近 witness`

确保验证和真实页面状态保持一致。

## 量化结果

基于本地 prod 预览 `http://127.0.0.1:3200` 的真实测量：

### 当前首页

- 桌面端全页：
  - `1457`
- 手机端全页：
  - `2676`

### 当前首页关键区块

- 桌面端 `hero`：
  - `368`
- 桌面端 `heatmap`：
  - `288.89`
- 桌面端 `home-lower-cluster`：
  - `453.89`
- 桌面端 `queue`：
  - `137.61`
- 桌面端 `modules`：
  - `269.69`

- 手机端 `hero`：
  - `547.36`
- 手机端 `heatmap`：
  - `254.44`
- 手机端 `home-lower-cluster`：
  - `800`
- 手机端 `queue`：
  - `357.88`
- 手机端 `modules`：
  - `397.53`

### 相比上一轮

上一轮首页量化状态：

- 桌面端全页：
  - `1530`
- 手机端全页：
  - `2763`
- 桌面端 `home-lower-cluster`：
  - `526.83`
- 桌面端 `queue`：
  - `200.55`
- 桌面端 `modules`：
  - `300.28`

这一轮变化：

- 首页桌面端：
  - `1530 -> 1457`
- 首页手机端：
  - `2763 -> 2676`
- 桌面端 lower：
  - `526.83 -> 453.89`
- 桌面端 queue：
  - `200.55 -> 137.61`
- 桌面端 modules：
  - `300.28 -> 269.69`

这说明这轮不是主观“看起来更轻”，而是首页下半段确实又实打实变薄了一层。

## 截图

- 当前首页桌面端：
  - `/tmp/home-after-queue-rail-pass-desktop.png`
- 当前首页手机端：
  - `/tmp/home-after-queue-rail-pass-mobile.png`
- 上一轮首页桌面端：
  - `/tmp/home-after-homefront-pass-desktop.png`
- 上一轮首页手机端：
  - `/tmp/home-after-homefront-pass-mobile.png`
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

- `NextSessionQueue` 的新 rail 变体没有误伤 archive resume
- `Daily Latin` / `Dance OS` 交互 smoke 继续通过
- `dashboard` / `legacy` / `about` 既有验证继续通过
- mobile home / daily 无横向 overflow

## 这轮后的判断

这轮价值很高，因为首页最重的两个残留问题都一起往参考稿方向推进了一层：

1. queue 终于更像 rail，而不是独立工具 section
2. hero 左侧终于不再主要讲内部阶段，而更像一个首页入口主叙事

当前桌面端首页已经比上一轮更接近参考稿：

- 顶层叙事更直接
- heatmap 与 workbench 的节奏更顺
- 下半段更像开放式入口，而不是功能区堆叠

## 仍然没完成的主要缺口

这轮之后首页仍未到“近似同款完成度”。

当前更明显的剩余 gap 开始集中到：

1. hero 左侧虽然已改成 `TODAY`，但右侧 `58%` 进度环和 `入口结构完成` 仍然偏内部推进语言
2. workbench 模块卡虽然已经更开，但内容摘要仍有一层 `repo / process` 感
3. 手机端首页整体已经更短，但 workbench rail 仍然比参考稿更显功能感

## 下一轮最值得继续做什么

1. 继续收 hero 右侧，把 `progress/session` 文案进一步往真实拉丁入口语言靠近
2. 再做一轮首页模块内容语气清洗，继续减少 `repo / preview / process` 感
3. 只在首页继续做高 ROI polish，不要重新切回平均修改整站
