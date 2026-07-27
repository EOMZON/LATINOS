# 2026-07-07 Daily Latin Density Pass

## 背景

这轮不再继续只盯首页。

在首页下半屏已经明显收稳之后，`Daily Latin` 成了当前整站最明显偏长、最容易拉开与参考稿差距的页面。

参考锁定仍然是：

- `/Users/zon/Downloads/latin-workbench (2).html`

## 问题定义

真正的问题不是“Daily Latin 内容太多”。

真正的问题是：

- 入口页里有太多纵向堆叠
- 默认第一视图摊开过多内容
- `Today Loop Demo` / `Live Return` / `Library` 三块叠加后，整页容易变成长链

所以这轮的目标不是删信息，而是让信息先按“入口页逻辑”重新落位。

## 这轮动作

### 1. 顶部 `snapshot + 本页依据` 改为并层

改动：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/daily-latin/page.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

动作：

- 把顶部 `DetailPanel`
- 和 `本页依据`
- 放进同一个 `daily-upper-cluster`

意义：

- 让顶部不再纯粹纵向叠两块
- 更接近参考稿里“第一屏先给结构”的节奏

### 2. `Daily Return` 改成更轻的 compact 回流壳

改动：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/daily-return-board.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

动作：

- 在 compact 模式下把顶部 summary cards 改成更轻的 metric strip
- queue 只保留最新一条 witness，而不是默认摊两条

意义：

- `Live Return / Clip Bridge / Archive Jump` 仍然保留真实回流逻辑
- 但不会继续把页面往下拉成长面板

### 3. `Today Loop Demo` 再压一层 compact 节奏

改动：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/daily-loop-demo.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

动作：

- compact 模式下 recent witness 只保留 1 条
- `STEP 3` 任务区改成 4 列紧凑网格
- textarea 与 recent witness 区继续变浅变短

意义：

- 继续保留真实 demo
- 但不让它以“解释型大面板”的方式占太多垂直空间

### 4. `Daily Library` 默认从“路径”开始

改动：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/daily-latin/page.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/tabbed-move-library.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`

动作：

- 不再让 `Daily Latin` 动作库默认从 `全部` 起
- 改成默认先显示：
  - `路径`

意义：

- 这页是入口页，不是总目录页
- 默认第一视图应优先回答：
  - 从哪进
  - 回哪去
  - 下一轮怎么继续

## 量化结果

当前桌面端实际测量：

- 全页高度：
  - 之前：`2869`
  - 现在：`2669`
- `Daily Library`：
  - 之前：`全部 / 10 ITEMS`
  - 现在：`路径 / 05 ITEMS`
  - 区块高度从：`383.55`
  - 降到：`270.06`
- `Live Return`：
  - 之前记录约：`621.61`
  - 当前：`594.34`

## 结果判断

这轮之后，`Daily Latin` 已经更像一个真实入口页，而不是把所有东西直接摊成一页：

- 第一屏更快进入 `snapshot + source logic`
- 中段 `Today Loop Demo` 仍然完整，但更扁平
- 下段 `Library` 不再默认全量摊开

## 证据

截图：

- 桌面端：
  - `/tmp/latinos-daily-restarted-current.png`
- 手机端：
  - `/tmp/latinos-daily-restarted-mobile.png`

验证：

- `pnpm verify`
- build / route smoke / prod smoke / browser smoke
- mobile overflow 继续为绿

## 剩余差距

当前仍然不能宣称完成。

剩余差距更集中在：

1. 顶部 `Daily Latin Demo` 右侧文字区仍然偏挤
2. `Today Loop Demo` 仍然是当前页最大单块
3. `Live Return` 已变轻，但和参考稿相比仍然偏“功能板”

## 下一步

下一轮继续优先：

1. 收 `Daily Latin` 顶部 snapshot 右侧信息区
2. 继续压 `Today Loop Demo`
3. 再决定是否需要继续收 `Live Return`
