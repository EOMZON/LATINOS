# 2026-07-08 Home Frontdoor Language + Layout Pass

## 背景

在前面几轮里：

- `Daily Latin`
- `Dance OS`
- `/roadmap`
- `/tools`
- `/about`
- `dashboard`

的 route-level 完成感都已经被明显补上之后，整站的主要差距重新回到首页。

进一步对照参考稿：

- `/Users/zon/Downloads/latin-workbench (2).html`

会发现当前首页剩下的两个问题已经不只是比例问题：

1. 首页顶层语言仍然偏 `repo / frontdoor / preview` 说明口吻
2. 首页下半段虽然已经收轻，但 `queue + modules` 的组织方式仍然不够接近参考稿那种开放式工作台

也就是说，这轮要修的不是单个样式，而是：

- 首页作为真实入口的语言方向
- 首页 lower section 的整体组织方式

## 这轮目标

让首页继续同时往两个方向靠拢：

1. 更接近参考稿的开放式工作台首页
2. 更接近本地真实拉丁入口语气，而不是继续停留在“仓库说明页”感

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/page.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/next-session-queue.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/route-smoke.mjs`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/structure-smoke.mjs`

### 1. 首页顶层语言从技术说明收回到真实入口语气

`homeHero` 这轮没有继续强化：

- `frontdoor preview`
- `结构迁移`
- `demos`

这类偏内部推进语言。

而是改成更接近旧站真实表达、也更接近参考稿首页语气的入口层：

- 标题改成：
  - `想练拉丁舞，不知道从哪开始？`
- hero 主句改成：
  - `先选状态，再把这一轮做完`
- 描述改成：
  - `旧站是公开 proof。新线继续把 Daily、成长站和 Dance OS 收成同一入口。`
- CTA 改成：
  - `从 Daily 开始 →`

这轮的目标不是“更抒情”，而是让首页更像真实前台入口，而不是像给开发者看的概览页。

### 2. 首页 lower section 从左右分栏收成更接近参考稿的开放式工作台

上一轮首页虽然已经把 lower rail 收轻，但结构上仍然是：

- 左边 queue
- 右边 modules

这会让首页下半段在桌面端更像双栏工具页，而不是参考稿那种更开放的工作台页。

这轮改成：

- `home-lower-cluster` 桌面端回到单列主结构
- `Next Session Queue` 作为上方一条开放式回流区
- `工作台` 作为下方完整展开的模块入口区

同时把模块入口从桌面端 `2` 列恢复成更接近参考稿的 `3` 列：

- `旧站 Proof`
- `Daily Latin`
- `Dance OS`
- `来源与规则`
- `路线图`
- `状态看板`

这样首页下半段更接近：

- 上方一层回流
- 下方完整工作台入口

而不是：

- 一边功能入口
- 一边内容列表

### 3. Queue 与 section 文案继续压成首页入口语言

这轮继续把首页 queue 的说明文案压成：

- `首页先给回流入口，再回到对应页面把这一轮继续做完。`

同时把 section header 的说明改成更像首页导流语言：

- `连续推进 · 12 周`
- `先回到最近一轮，再进入对应真实页面`
- `从这里进入 Daily / Dance / legacy / rules`

### 4. 验证基线同步更新

由于首页标题和 heatmap 文案这轮都变了：

- `scripts/route-smoke.mjs`
- `scripts/structure-smoke.mjs`

也同步收到了新的真实首页文案，避免出现“页面已经改了，smoke 仍然盯着旧标题”的假失败。

## 量化结果

基于本地 prod 预览 `http://127.0.0.1:3200` 的真实测量：

### 当前首页

- 桌面端全页：
  - `1530`
- 手机端全页：
  - `2763`

### 当前首页关键区块

- 桌面端 `hero`：
  - `368`
- 桌面端 `heatmap`：
  - `288.89`
- 桌面端 `home-lower-cluster`：
  - `526.83`
- 桌面端 `queue`：
  - `200.55`
- 桌面端 `modules`：
  - `300.28`

- 手机端 `hero`：
  - `547.36`
- 手机端 `heatmap`：
  - `254.44`
- 手机端 `home-lower-cluster`：
  - `886.39`

### 这轮的含义

这轮桌面端页高相比上一轮更高，不是回退，而是有意识地用：

- 更接近参考稿的 `3 列工作台入口`
- 更清楚的上层回流区

替代之前更扁但更像“左右工具面板”的 lower section 组织方式。

也就是说：

- 这轮主要优化的是 `结构语言`
- 不是 `单纯压短`

## 截图

- 当前首页桌面端：
  - `/tmp/home-after-homefront-pass-desktop.png`
- 当前首页手机端：
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

- 首页新标题与 heatmap 文案已经被 smoke 接受
- `Daily Latin` / `Dance OS` 交互 smoke 未被误伤
- `dashboard` witness archive 相关验证未回退
- mobile home / daily 无横向 overflow

## 这轮后的判断

这轮价值很高，因为它修掉的不是某个细节，而是首页两个更本质的问题：

1. 顶层语言更像真实拉丁入口，而不是仓库状态说明
2. 下半段开始更接近参考稿那种开放式工作台结构，而不是双栏工具页

尤其桌面端的工作台区域，现在已经更接近参考稿：

- 3 列模块入口
- 更完整的工作台展开感
- queue 不再挤在左侧变成偏产品面板的块

## 仍然没完成的主要缺口

这轮之后，首页仍然还没有到“近似同款完成度”。

当前剩余更明显的 gap 开始集中到：

1. `Next Session Queue` 仍然占了一块参考稿里原本不存在的高度
2. hero 虽然语言更对了，但视觉主叙事仍然是 `PHASE 1.5`，和参考稿的 `DAY xx` 连续性叙事仍有差距
3. 桌面端 lower section 虽然结构更像参考稿，但仍然比参考稿更高一层

## 下一轮最值得继续做什么

1. 继续看首页下半段，判断 `queue` 是否应继续薄化成更接近“rail / strip”，而不是保留完整 section 高度
2. 继续把 hero 从“当前阶段”叙事往“连续练习 / 今日入口”叙事再拉近一步
3. 在不破坏真实内容和真实路由的前提下，再做一轮首页 completion audit，而不是回去平均修改整站
