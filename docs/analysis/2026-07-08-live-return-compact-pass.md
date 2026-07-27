# 2026-07-08 Live Return Compact Pass

## 背景

在 `Daily Latin` 上半段和 `Today Loop Demo` 都已经明显收短之后，当前最大的剩余厚块已经从：

- `Today Loop Demo`

转移到：

- `Live Return / Clip Bridge / Archive Jump`

也就是说，这轮的目标不是再去抠前面已经收过的部分，而是把 `Live Return` 从“功能板”继续推向更像参考稿的开放式工作台入口。

## 问题定义

真正的问题不是：

- 回流逻辑不对
- 数据或交互坏了

真正的问题是：

- 左侧 mode list 太厚
- recommendation 像独立说明块
- compact 版 CTA 还是偏“面板动作”而不是“入口动作”

## 这轮动作

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/daily-return-board.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. compact 版文案继续压短

动作：

- 主 panel 标题更短
- queue 标题更短
- compact recommendation 更短
- CTA 标签更短
- empty state 更短

意义：

- 让用户更快读到“继续 / 归档 / 桥接”的判断
- 减少解释感

### 2. compact recommendation 从独立块改成更轻的 inline 提示

动作：

- recommendation 不再维持虚线边框块
- 改为更轻的文字提示

意义：

- 直接收薄 mode cards
- 让 mode cards 更像入口矩阵，而不是说明卡集合

### 3. compact panel / mode / queue 的 padding 与字级继续下降

动作：

- panel padding 更小
- mode list gap 更小
- queue panel 更短
- buttons 更短

意义：

- 收掉当前最厚的 `modeList`
- 把 Live Return 整体推进到更像参考稿的 workbench 密度

## 量化结果

这轮前：

- `liveReturn` section：`594.34`
- `daily-return-board`：`542.36`
- 左侧主 panel：`474.36`
- `modeList`：`328.38`
- 右侧 queue panel：`191.22`
- `Daily Latin` 全页：`2376`

这轮后：

- `liveReturn` section：`463.81`
- `daily-return-board`：`411.83`
- 左侧主 panel：`343.83`
- `modeList`：`211.23`
- 右侧 queue panel：`110.34`
- `Daily Latin` 全页：`2317`

## 结果判断

这轮之后：

- `Live Return` 已不再是当前页最大的厚块
- section 更像一个短判断入口
- `Daily Latin` 的中后段完成感明显提升

## 证据

截图：

- 桌面端：
  - `/tmp/latinos-daily-after-live-return-pass.png`
- 手机端：
  - `/tmp/latinos-daily-after-live-return-pass-mobile.png`

验证：

- `pnpm verify`
- build / route smoke / prod smoke / browser smoke
- mobile overflow 继续为绿

## 剩余差距

当前 `Daily Latin` 的大厚块已经基本都被收掉。

剩余更大的差距重新回到：

1. 首页 hero 最后一层比例与完成感
2. 桌面端与手机端整体“近似同款完成度”的统一

## 下一步

下一轮优先：

1. 回首页 hero 做最后一轮收口
2. 用最新 `Daily Latin` 成果反向校验整站一致性
