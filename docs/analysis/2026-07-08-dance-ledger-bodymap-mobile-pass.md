# 2026-07-08 Dance Ledger + Body Map Mobile Pass

## 背景

- 在上一轮 `dashboard` mobile density pass 之后，重新做全站顺序 sweep：
  - `/` mobile：`1730`
  - `/daily-latin` mobile：`3233`
  - `/dashboard` mobile：`2899`
  - `/dance-os` mobile：`3583`
- 这意味着当前新的唯一 mobile Top1 已经明确回到：
  - `/dance-os`

## 问题定义

这轮不再平均缩 `dance-os` 整页。

而是只回答：

**在不改 demo 逻辑前提下，能不能把 `Correction Ledger Demo` 和 `Body Map / Practice Queue` 继续推向更接近参考稿的 mobile workbench 结构？**

## 为什么抓这两块

baseline mobile 下：

- `Correction Ledger Demo`：`1174`
- `Body Map / Practice Queue`：`750`
- `录 / 看 / 记 / 下一轮`：`478`
- `Dance OS 模块库`：`426`

很明显：

- 这页真正的拖长项不是 summary 或 asset gallery
- 而是：
  - correction ledger 仍然太像纵向教学板
  - body map / queue 仍然太像堆叠说明区

## 候选实验

先在浏览器里注入 CSS，再决定是否落盘。

### baseline

- total：
  - `3583`

### 只收 `Correction Ledger`

- total：
  - `3116`
- `Correction Ledger Demo`：
  - `1174 -> 707`

### 只收 `Body Map / Practice Queue`

- total：
  - `3429`
- `Body Map / Practice Queue`：
  - `750 -> 595`

### 组合收口

- total：
  - `2962`
- `Correction Ledger Demo`：
  - `1174 -> 707`
- `Body Map / Practice Queue`：
  - `750 -> 595`

## 视觉与宽度复核

候选组合方案继续检查了：

- `390`
- `375`
- `360`

结果：

- 无横向溢出
- 三档都仍然可访问
- 更接近参考稿里“窄屏工作台”而不是单列长说明

## 最终做法

只改：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

不改：

- `CorrectionLedgerDemo` 逻辑
- `BodyMapPracticeQueue` 逻辑
- route 结构
- data 结构

### 1. Correction Ledger

- `ledger-grid` 恢复成 mobile 双列 workbench
- 左侧 `ledger-stack` 改成 2 列，`STEP 3` 跨满整行
- output panel 再压一层 padding / result card / note field

### 2. Body Map / Practice Queue

- summary cards 压成数值胶囊
- `bodymap-grid` 改回双列
- focus cards 维持 2 列高密度排布
- queue panel 与 focus panel 一起做轻量收口

## 落地后的真实 build 结果

注意：

- 上面的 `2962` 是注入实验值
- 正式写入样式层并重新 build 后，要以真实 sweep 为准

### `/dance-os`

- mobile total：
  - `3583 -> 3050`

### 关键 section

- `Correction Ledger Demo`：
  - `1174 -> 683`

- `Body Map / Practice Queue`：
  - `750 -> 707`

### 其余 section

- `录 / 看 / 记 / 下一轮`：
  - `478`

- `Dance OS 模块库`：
  - `426`

- `本页依据`：
  - `234`

## 更细的块级结果

### Correction Ledger

- `STEP 1`：
  - `297`
- `STEP 2`：
  - `297`
- `STEP 3`：
  - `230`
- `ledger-output`：
  - `599`

### Body Map / Practice Queue

- summary cards：
  - `56 / 56 / 56`
- `Body Map Snapshot` panel：
  - `453`
- `Practice Queue` panel：
  - `181`
- 4 张 focus cards：
  - `167 / 167 / 167 / 167`

## 改动后的整站顺序 sweep

- `/` mobile：`1730`
- `/dashboard` mobile：`2899`
- `/dance-os` mobile：`3050`
- `/daily-latin` mobile：`3233`

这意味着当前新的 mobile Top1 已经变成：

- `/daily-latin`

## 验证

- 已通过：
  - `pnpm verify`
  - `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
  - `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

## 截图

- `dance-os` mobile full page：
  - `/tmp/latinos-dance-page-mobile-ledger-bodymap-pass.png`
- `Correction Ledger / Body Map` mobile：
  - `/tmp/latinos-dance-ledger-bodymap-pass-mobile.png`

## 这轮后的判断

- 这轮最大收益仍然来自：
  - correction ledger 从长讲解板转向 mobile workbench
- body map 也变短，但真实 build 下 ROI 比注入实验值更保守
- 当前下一轮最值得继续追的掉队项，已经重新切回：
  - `/daily-latin`
