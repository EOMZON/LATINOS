# 2026-07-08 Daily Loop Compact Pass

## 背景

在 `Daily Latin` 上半段已经收紧之后，当前最大的单块变得非常明确：

- `Today Loop Demo`

它的问题不在于功能不对，而在于：

- 面板仍然偏厚
- 标题和说明仍然偏解释型
- 左侧 steps、右侧 planner、底部输入区一起把 section 拉得很高

## 问题定义

真正要解决的不是“删掉 demo”。

真正要解决的是：

**让 `Today Loop Demo` 更像一个当天 practice loop 的控制台，而不是一块解释型大面板。**

## 这轮动作

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/daily-loop-demo.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. compact 模式下的控制台文案继续压短

动作：

- step 标题更短
- step 说明更短
- planner 标题和 copy 更短
- score / note / empty state 更短
- 按钮文案更短

意义：

- 让 section 更像 workbench control
- 减少“说明感”

### 2. compact shell 的结构节奏继续压缩

动作：

- shell padding 更小
- grid gap 更小
- choice card 更浅
- task grid 更扁
- result cards / textarea / buttons 一起压缩

意义：

- 不是删功能
- 而是让同样的功能以更像参考稿的密度存在

## 量化结果

这轮前：

- `Today Loop Demo` section：`604.98`
- `ledger-shell`：`574.39`
- `ledger-grid`：`546.39`
- `STEP 1` / `STEP 2`：`248`
- `STEP 3`：`201.48`
- `Daily Latin` 全页：`2456`

这轮后：

- `Today Loop Demo` section：`524.86`
- `ledger-shell`：`494.27`
- `ledger-grid`：`470.27`
- `STEP 1` / `STEP 2`：`219.47`
- `STEP 3`：`165.11`
- `Daily Latin` 全页：`2376`

## 结果判断

这轮之后：

- `Today Loop Demo` 已明显更短
- section 不再那么像厚面板
- `Daily Latin` 的中段开始更接近参考稿那种“紧凑工作台”而不是“继续往下解释”

## 证据

截图：

- 桌面端：
  - `/tmp/latinos-daily-after-loop-pass.png`
- 手机端：
  - `/tmp/latinos-daily-after-loop-pass-mobile.png`

验证：

- `pnpm verify`
- build / route smoke / prod smoke / browser smoke
- mobile overflow 继续为绿

## 剩余差距

当前仍然不能宣称完成。

下一层最明显差距已经进一步集中到：

1. `Live Return` 仍然偏“功能板”
2. 首页 hero 仍然差最后一层比例与完成感

## 下一步

下一轮优先：

1. 收 `Live Return`
2. 再回首页 hero 做最后一轮 polish
