# 2026-07-08 Daily Latin Mobile Compact Pass

## 背景

在继续做四个关键 route 的 completion sweep 后，当前手机端真实量化是：

- `/daily-latin`
  - `6364`
- `/dance-os`
  - `5603`
- `/dashboard`
  - `6448`

进一步看 section 高度后，`Daily Latin` 当前最厚的几个块依然很明确：

- `Today Loop Demo`
  - `1343`
- `Live Return / Clip Bridge / Archive Jump`
  - `843`
- `本页依据`
  - `413`
- `Daily Latin 动作库`
  - `493`

也就是说，当前最值得继续抓的并不是再压首页，而是：

**让 `Daily Latin` 手机端继续保留完整入口逻辑和 loop 结构，但把几个高 ROI 厚块再压一层。**

## 问题定义

这一轮不改：

- `DailyLoopDemo` 的交互逻辑
- `DailyReturnBoard` 的行为逻辑
- `Daily Latin` 的路由结构

只解决一个问题：

**把 `Daily Latin` 手机端重新收回更接近 compact workbench route 的密度。**

## 这轮动作

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/daily-latin/page.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. 给 Daily Latin 加页面级 compact 壳

动作：

- 页面根节点改成：
  - `daily-latin-page`

意义：

- 不去发明新结构
- 而是给这条 route 一层页面级压缩控制

### 2. 手机端继续压顶部 summary 与 source matrix

动作：

- `compact-sec-head` 的 `more` 在手机端改成 2 行 clamp
- `AnchorTabs`、cluster gap、detail top 节奏继续下降
- `compact-detail-daily-top`
  - subtitle 改成 2 行 clamp
  - `kv` label/value 更紧
  - value 改成 2 行 clamp
- `compact-route-stage-daily`
  - signals 维持 3 列
  - signal copy 改成 2 行 clamp
- `compact-source-matrix-daily`
  - padding / gap / source row 继续下降

意义：

- 让顶部 summary 与依据区不再过早把页面拖长
- 继续保持“入口先站稳”的结构判断

### 3. 手机端继续压 Today Loop Demo

动作：

- `compact-ledger-shell`
  - 外层 padding 与 card padding 下降
- `ledger-copy`
  - 字级下降
  - 2 行 clamp
- `choice-note`
  - 2 行 clamp
- `daily-task-copy span`
  - 2 行 clamp
- `ledger-result-card p`
  - `ledger-next-step p`
  - `witness-item p`
  - 全部改成 2 行 clamp

意义：

- 不删步骤
- 不删 planner
- 只把说明层压短，让它更像当天 loop 控制台

### 4. 手机端继续压 Live Return 与动作库

动作：

- `daily-return-copy`
  - 2 行 clamp
- `daily-return-mode-card p`
  - `daily-return-recommendation`
  - `practice-queue-card p`
  - `practice-queue-note`
  - 都改成 2 行 clamp
- mode cards / queue cards padding 下降
- `compact-move-grid` / `compact-move-card`
  - gap、padding、标题、meta 一起下降
  - move meta 也改成 2 行 clamp

意义：

- 让 `Live Return` 更像桥接入口，而不是厚功能板
- 动作库也更像 route 下半段的轻工作台，而不是信息墙

## 量化结果

基于本地 `http://127.0.0.1:3200/daily-latin` 的真实测量：

### 整页高度

- 桌面端：
  - 之前：`2309`
  - 现在：`2412`
- 手机端：
  - 之前：`6364`
  - 现在：`5995`

### 手机端关键区块

- `本页依据`
  - `413 -> 367`
- `Today Loop Demo`
  - `1343 -> 1248`
- `Live Return / Clip Bridge / Archive Jump`
  - `843 -> 829`
- `Daily Latin 动作库`
  - `493 -> 468`

判断：

- 这轮的主收益在手机端
- `Today Loop Demo` 被明显压短
- `Source` 与 `Library` 也一起收薄了
- 桌面端略有回涨，但幅度不大，且桌面端本来就不是这轮主问题

## 视觉证据

这轮截图：

- 桌面端：
  - `/tmp/daily-latin-after-mobile-compact-desktop.png`
- 手机端：
  - `/tmp/daily-latin-after-mobile-compact-mobile.png`

上一轮截图：

- `/tmp/daily-latin-sweep-desktop.png`
- `/tmp/daily-latin-sweep-mobile.png`

## 验证

这轮后通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- `DailyLoopDemo` 交互没回退
- `DailyReturnBoard` 行为没被误伤
- mobile home / daily 无横向 overflow
- 首页 / `Dance OS` / `dashboard` smoke 继续通过

## 这轮后的判断

这轮价值很高，因为它把 `Daily Latin` 手机端从：

- 一个虽然已经收过很多轮，但仍然偏长的 route

继续推进到更接近：

- 一个结构稳定、说明受控、可直接进入练习的 compact workbench route

## 下一步

下一轮最值得继续做的是：

1. 再做一次四个关键 route 的 completion sweep
2. 对比：
   - `/`
   - `/daily-latin`
   - `/dance-os`
   - `/dashboard`
3. 确认现在最后的 Top1 掉队项，再继续做单点收口
