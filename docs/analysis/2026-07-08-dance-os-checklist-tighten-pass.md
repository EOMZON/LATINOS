# 2026-07-08 Dance OS Checklist Tighten Pass

## 背景

在 `Body Map / Practice Queue` 完成 compact pass 之后，`Dance OS` 当时的真实量化状态是：

- 桌面端全页：`2964`
- 手机端全页：`6609`
- `body-map-practice-queue`：`597.31`
- `correction-ledger-demo`：`734.89`

这说明新的最大厚块已经重新集中到：

- `Correction Ledger Demo`

进一步看截图后，最明显的结构浪费不在交互逻辑，而在：

- `STEP 3 · CHECKLIST`

它仍然以较厚的纵向列表在占空间，拖高了整个左列底部。

## 这轮目标

不重做 `Correction Ledger Demo`，也不去碰交互逻辑，而是继续沿当前策略：

- 优先改共享 compact 层
- 收掉 `STEP 3 checklist` 的纵向浪费
- 让 `Correction Ledger Demo` 更像同一套 workbench route 里的 section

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

主要新增与调整：

- `compact-ledger-shell .ledger-checklist`
- `compact-ledger-shell .ledger-check-item`
- `compact-ledger-shell .ledger-check-item strong`
- `compact-ledger-shell .ledger-check-item span`

收口动作：

- checklist 在 compact 下改成 `2 x 2` 网格
- checklist gap 与 margin-top 下降
- checklist item padding 变薄
- label / detail 字级进一步下调
- mobile 端也维持 compact 的两列 checklist，而不是重新长成厚纵列

## 量化结果

这轮后的真实测量：

- `Dance OS` 桌面端全页：
  - 之前：`2964`
  - 现在：`2897`
- `Dance OS` 手机端全页：
  - 之前：`6609`
  - 现在：`6412`
- `correction-ledger-demo` 桌面端：
  - 之前：`734.89`
  - 现在：`667.77`
- `correction-ledger-demo` 手机端：
  - 现在：`1636.91`
- `body-map-practice-queue` 桌面端：
  - `597.31`

这说明：

- 这轮不是“视觉更紧一点”的主观变化
- 而是把 `Correction Ledger Demo` 这个最大块继续压短了约 `67px`
- 整页也同步继续下降

## 截图

- 桌面端：
  - `/tmp/latinos-dance-after-checklist-tighten-desktop.png`
- 手机端：
  - `/tmp/latinos-dance-after-checklist-tighten-mobile.png`

## 验证

已继续通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`

继续确认：

- `Correction Ledger Demo` 交互没回退
- `dance-witness-note`、state/profile/focus 相关 smoke 继续通过
- `Body Map / Practice Queue` 未被误伤
- 手机端 overflow 继续稳定

## 这轮后的判断

这轮价值很高，因为它符合当前最重要的原则：

- 不重做
- 不页级打补丁
- 继续走共享 compact workbench 层

现在 `Dance OS` 整体更接近参考稿那种：

- 上半段 summary 清楚
- 中段 correction 不再那么厚
- 后半段 body map / queue 已经接到统一密度

## 下一轮最值得继续做什么

1. 重新看整站桌面端与手机端完成感，确认 `Dance OS` 现在是否已经不再是最明显掉队页
2. 把剩余模板感继续替换为更真实的来源语言与状态语言
3. 如还要继续压 `Dance OS`，优先看 output 右列文案密度，而不是重新动核心交互结构
