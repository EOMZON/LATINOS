# Daily Library Atlas Continuation Pass

## 背景

在上一轮 `daily return + dashboard source continuation pass` 之后，fresh `390px` sweep 已经来到：

- `/` = `1513`
- `/daily-latin` = `2311`
- `/dashboard` = `2298`
- `/dance-os` = `2220`

这时 broad mobile Top1 仍然是：

- `/daily-latin 390 = 2311`

但这轮重新拆 `daily-latin` 后发现，当前更值得动的不是：

- `move cards` 本体
- `Today Loop Demo` 主逻辑

而是：

- `Daily Latin 动作库` 顶部的说明壳

## 问题定义

当前 `daily-library` 的构成是：

- tabs
- library panel
- move grid

真实测量：

- `#daily-library`：`280.56`
- `compact-library-panel`：`60.98`
- `compact-move-grid`：`115`
- `library-note`：`7.34`

判断很明确：

- 当前卡片本体已经足够紧
- atlas 还保留了一层说明性 panel 节奏

所以这轮不去动：

- move cards
- tabs 行为
- 数据结构

而只去做：

**把 `daily-library` 顶部从“说明面板”继续推向 reference 那种 atlas 式入口。**

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. `compact-tabs` 再收一层节奏

- 保持 gap
- 收一点 margin-bottom

作用：

- tabs 和 panel 之间更像一个连续 atlas，而不是两块分离面板

### 2. `compact-library-panel` 再收一层

- margin-bottom 再降
- `library-head` gap 再降
- `library-note` 在当前 compact 状态下直接隐藏

作用：

- 保留：
  - 当前激活组标题
  - item count
- 去掉：
  - 已经重复的解释层

这更接近 reference 那种：

- 先给切换入口
- 再给当前组
- 直接进入 grid

而不是：

- 每次切换还保留一条解释 copy

## 量化结果

### 整页

- `/daily-latin 390`
  - `2311 -> 2297`

### 关键块

- `#daily-library`
  - `280.56 -> 266.22`
- `compact-library-panel`
  - `60.98 -> 52.64`
- `compact-move-grid`
  - `115 -> 115`

判断：

- 这轮最大价值正是：
  - 不碰 grid 本体
  - 只收 atlas 顶部说明壳

## 这轮后的 fresh 390 sweep

- `/` = `1513`
- `/daily-latin` = `2297`
- `/dashboard` = `2298`
- `/dance-os` = `2220`

这意味着：

- `/daily-latin` 已经正式低于 `/dashboard`

当前新的 broad mobile Top1 切到：

- `/dashboard 390 = 2298`

但两者只差：

- `1`

这说明 `daily-latin` 与 `dashboard` 当前在 `390px` 下已经几乎是同一密度档位。

## 验证

这轮继续通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- `DailyLoopDemo` 交互未回退
- mobile home / daily 无横向 overflow
- `dashboard dense sections` 继续正常

## 结论

这轮最重要的价值不是压了多少像素，而是：

1. 把 `Daily Latin 动作库` 从“说明 + 面板 + grid”继续推向更接近 reference 的 atlas 入口
2. 在不碰卡片内容和逻辑的前提下，把 `/daily-latin 390` 正式压到 `/dashboard` 之下

## 下一步

下一轮如果继续追 mobile Top1：

1. 回到 `/dashboard 390`
2. 优先再看：
   - `Witness Archive`
   - `Proof / Risk / Gate`
   - `Route Map`

如果切回整站 completion 视角：

1. 重新看首页 desktop/mobile 的最终完成感
2. 判断是否该从“route-level mobile top1”切回“frontdoor 整体近似同款完成度”
