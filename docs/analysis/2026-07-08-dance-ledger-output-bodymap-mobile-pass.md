# 2026-07-08 Dance Ledger Output + Body Map Mobile Pass

## 背景

- 在上一轮 `dance summary + assets mobile pass` 之后，重新 build / start 并做真实 mobile sweep：
  - `/` mobile：`1730`
  - `/daily-latin` mobile：`2884`
  - `/dance-os` mobile：`2934`
  - `/dashboard` mobile：`2899`

- 这意味着当前新的唯一 mobile Top1 仍然是：
  - `/dance-os`

## 问题定义

这轮不再继续碰：

- `dance-summary`
- `dance-assets`

而是只回答：

**在不改 demo 逻辑前提下，能不能继续把 `ledger-output` 和 `Body Map / Practice Queue` 两个真正的 mobile 厚块再压一轮？**

## 当前最大块

baseline mobile 下：

- `Correction Ledger Demo`：`683.16`
- `ledger-output`：`598.97`
- `Body Map / Practice Queue`：`707.34`
- `Body Map Snapshot`：`453.16`
- `Practice Queue` panel：`181.34`

这说明真正拖长 `/dance-os` 的，已经不再是：

- summary
- asset library

而是：

- correction output 结果层
- body map snapshot / practice queue 这组聚合面板

## 候选实验

先在浏览器里注入 CSS 做 A/B，再决定是否落盘。

### baseline

- `/dance-os` mobile total：
  - `2934`

### 只收 `ledger-output`

做法：

- output panel 继续减 padding
- result cards / next-step / witness 继续收薄
- note field / recent witness / CTA 再压一层

结果：

- `/dance-os` mobile total：
  - `2934 -> 2868`
- `Correction Ledger Demo`：
  - `683.16 -> 616.88`
- `ledger-output`：
  - `598.97 -> 497.97`

### 只收 `Body Map / Practice Queue`

做法：

- bodymap summary cards 继续压薄
- snapshot / practice panel head 与 copy 再收一层
- focus cards / latest card / queue card 再压紧

结果：

- `/dance-os` mobile total：
  - `2934 -> 2841`
- `Body Map / Practice Queue`：
  - `707.34 -> 614.52`
- `Body Map Snapshot`：
  - `453.16 -> 372.33`
- `Practice Queue` panel：
  - `181.34 -> 161.2`

### 组合方案

把上面两组一起启用后：

- `/dance-os` mobile total：
  - `2934 -> 2775`
- `Correction Ledger Demo`：
  - `683.16 -> 616.88`
- `ledger-output`：
  - `598.97 -> 497.97`
- `Body Map / Practice Queue`：
  - `707.34 -> 614.52`
- `Body Map Snapshot`：
  - `453.16 -> 372.33`
- `Practice Queue` panel：
  - `181.34 -> 161.2`

## 视觉与窄屏复核

组合方案在：

- `390`
- `375`
- `360`

都继续确认：

- 无横向溢出
- 黑底 workbench 结构仍然成立
- 视觉上虽然更密，但没有崩成纯粹信息堆

真实 build 下三档高度分别为：

- `390`：`2775`
- `375`：`2851`
- `360`：`2842`

## 最终做法

只改：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

不改：

- `CorrectionLedgerDemo` 逻辑
- `BodyMapPracticeQueue` 逻辑
- route / data 结构

### 1. `ledger-output`

- output panel padding 再降一层
- result cards / next-step / witness 再收薄
- result label / strong / body text 统一再缩一层
- note field / recent witness / CTA 继续收短

### 2. `Body Map / Practice Queue`

- summary cards 再压一层
- `bodymap-grid` 继续收紧左右占比与 gap
- snapshot / practice panel head 与说明 copy 再压薄
- focus cards / latest card / queue card 字级、padding、gap 继续下降
- bodymap actions / queue actions 同步变轻

## 落地后的真实 build 结果

### `/dance-os`

- mobile total：
  - `2934 -> 2775`

### 关键 section

- `dance-summary`：
  - `394.61`
- `dance-assets`：
  - `397.08`
- `Correction Ledger Demo`：
  - `683.16 -> 616.88`
- `Body Map / Practice Queue`：
  - `707.34 -> 614.52`
- `dance-sources`：
  - `233.88`

### 更细的块级结果

- `ledger-output`：
  - `598.97 -> 497.97`
- `Body Map Snapshot`：
  - `453.16 -> 372.33`
- `Practice Queue` panel：
  - `181.34 -> 161.2`

## 改动后的整站顺序 sweep

- `/` mobile：`1730`
- `/daily-latin` mobile：`2884`
- `/dance-os` mobile：`2775`
- `/dashboard` mobile：`2899`

这意味着当前新的 mobile Top1 已经变成：

- `/dashboard`

而 `/dance-os` 不再是整站最掉队项。

## 验证

- 已通过：
  - `pnpm verify`
  - `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
  - `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

## 截图

- `/dance-os` mobile full page：
  - `/tmp/latinos-dance-ledger-bodymap-mobile-pass-2.png`

## 这轮后的判断

- 这轮价值很高，因为它不是再去碰上半屏的展示层
- 而是把真正的行为工作台厚块继续往 reference-like mobile workbench 收
- 结果是：
  - `/dance-os` 明显变短
  - 仍然保留可读性
  - 并且把整站 mobile Top1 从 `/dance-os` 让出来

## 下一轮最值得继续看的地方

当前更值得继续追的掉队项已经重新切回：

- `/dashboard`

如果继续留在 `/dance-os`，下一个 ROI 可能已经下降。
更合理的下一轮默认顺序应是：

1. 重新复看 `/dashboard`
2. 判断 `Route Map / Witness Archive` 是否还能更像参考稿的高密度 workbench
3. 再决定是否回头继续收 `/daily-latin`
