# 2026-07-08 Dance OS Mobile Override Fix Pass

## 背景

这轮不是重做 `Dance OS` 的结构，也不是新增功能。

目标只有一个：

**继续按既定主线收 `dance-os` 手机端，但这次优先确认“为什么前一轮 compact 已经写了，页面还不够薄”。**

## 先发现的真实问题

在复核当前 CSS 时，发现 `dance-os` 其实已经有一批页面级 mobile compact 规则：

- `compact-ledger-shell`
- `compact-bodymap-board`
- `compact-asset-grid`
- `compact-source-matrix`

但这些规则写在移动端通用规则之前。

文件后半段还有一批更晚生效的通用 mobile 规则，例如：

- `.compact-ledger-shell`
- `.compact-bodymap-panel`
- `.compact-practice-queue-card`

这会把前面更紧的 `dance-os` 页面级控制层部分覆盖掉。

所以这轮真正该修的，不只是再“缩一层”，而是：

1. 让 `dance-os` 页面级 compact 规则在移动端真正生效
2. 再对最高 ROI 区块继续做一轮收口

## 问题定义

这一轮不动：

- 路由结构
- 交互逻辑
- 数据来源
- 信息架构

只处理：

- `Dance OS 模块库`
- `Correction Ledger Demo`
- `Body Map / Practice Queue`
- `本页依据`

在手机端的密度与优先级顺序问题。

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. 在移动端规则尾部追加 `dance-os` 页面级覆盖

这轮没有改组件结构，而是把 `dance-os` 专属 compact 规则放到移动端规则块的后面，确保它不再被通用 mobile 规则反向覆盖。

直接覆盖的部分包括：

- `compact-library-panel`
- `compact-asset-grid`
- `compact-ledger-shell`
- `compact-bodymap-summary-card`
- `compact-bodymap-panel`
- `compact-practice-queue-card`
- `compact-source-matrix`

### 2. 模块库再压一层

主要动作：

- `library panel` padding 再降
- 标题与 count 字级下降
- note 更短
- `asset` aspect ratio 从更高的卡片，改成更矮的手机端比例
- `asset` 顶栏、meta、文案字级继续下降

这轮价值很高，因为 `Dance OS 模块库` 之前虽然不是单个最大块，但它是首屏后马上遇到的一块明显厚区。

### 3. Correction Ledger 再压一层

主要动作：

- 外层 `padding` 和 `gap` 下降
- `ledger card` / `ledger output` padding 下降
- `kicker` / `h3` / `copy` 字级继续下降
- `choice button`、`choice label`、`choice note` 更紧
- `checklist`、`result card`、`witness item` 继续收
- `textarea` 高度下降
- `recent` / `link-row` 间距下降

重点不是删交互，而是把“说明高度”继续让位给“操作高度”。

### 4. Body Map / Practice Queue 再压一层

主要动作：

- summary card 更紧
- bodymap panel / practice panel padding 更小
- 标题、note、copy、focus proof、cue、latest、queue meta 全体再收
- focus card / latest card / queue card padding 下降
- CTA 与 meta 间距下降

这让后半段更接近：

- 一个被压缩控制住的 workbench route

而不是：

- 手机端仍然偏厚的说明型面板

## 量化结果

基于本地 `http://127.0.0.1:3200/dance-os` 的真实测量：

### 整页高度

- mobile total：
  - 之前：`5008`
  - 现在：`4609`

### 关键 section

- `Dance OS 模块库`
  - 之前：`917`
  - 现在：`797`

- `Correction Ledger Demo`
  - 之前：`1423`
  - 现在：`1292`

- `Body Map / Practice Queue`
  - 之前：`1158`
  - 现在：`1057`

- `本页依据`
  - 之前：`511`
  - 现在：`464`

### 内部块

- `ledgerShell`
  - 之前：`1359`
  - 现在：`1228`

- `ledgerOutput`
  - 之前：`549`
  - 现在：`490`

- `ledgerStack`
  - 之前：`778`
  - 现在：`709`

- `bodymapBoard`
  - 之前：`1094`
  - 现在：`993`

- `bodymapSummary`
  - 之前：`232`
  - 现在：`202`

- `bodymapPanel`
  - 之前：`675`
  - 现在：`615`

- `practicePanel`
  - 之前：`170`
  - 现在：`159`

- `asset` 单卡高度
  - 之前：`241`
  - 现在：`204`

## 视觉证据

这轮截图：

- 桌面端：
  - `/tmp/dance-os-mobile-density-pass-desktop.png`
- 手机端：
  - `/tmp/dance-os-mobile-density-pass-mobile.png`

## 验证

这轮通过：

- `pnpm build`
- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- `Correction Ledger Demo` 交互未回退
- `Body Map / Practice Queue` witness 聚合未回退
- `mobile nav shell` 仍是 `99`
- mobile overflow smoke 继续为绿

## 这轮后的判断

这轮最重要的价值，不只是把 `dance-os` 再压短了一点。

真正的价值是：

1. 找到了前一轮 compact 没有完全生效的原因
2. 用页面级优先级修正，把原本已经成立的 compact 设计真正落实到手机端
3. 再额外收掉了模块库、ledger、body map 这三个最高 ROI 区块

当前 `dance-os` 已经从：

- 手机端偏厚的工具说明页

更靠近：

- 一个更克制、更像参考稿体系的 compact workbench route

## 下一步

这一轮之后，下一次更值得继续看的方向会变成：

1. `daily-latin` 的 `Today Loop Demo` 是否还值得再轻一层
2. 首页与关键二级页的桌面端 / 手机端“近似同款完成度”是否要统一再做一轮 sweep
3. 继续把能替换模板感的内容替换成更真实的本地资料表达
