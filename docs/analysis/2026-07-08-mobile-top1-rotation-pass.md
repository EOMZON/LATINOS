# Mobile Top1 Rotation Pass

## 背景

这一轮不是去做新的结构方向，而是继续按既定 Goal 主线，把 `390px` 这一档最影响参考稿完成感的 route 逐个拉齐。

本轮之前，broad mobile Top1 一直在：

- `/daily-latin 390`
- `/dashboard 390`
- `/dance-os 390`

之间轮转。

所以这轮真正做的不是“选一页做完”，而是：

**用一组连续的小型 compact pass，把 3 条主 route 的 `390px` 密度逐步拉回同一个工作台档位。**

## 这轮涉及的 3 个关键 pass

### 1. `daily-latin 390 compact pass`

- 核心文件：
  - `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`
- 先把 `/daily-latin 390`
  - `2884 -> 2568`

### 2. `dashboard 390 compact pass`

- 核心文件：
  - `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`
- 再把 `/dashboard 390`
  - `2783 -> 2510`

### 3. `dance-os 390 compact pass`

- 核心文件：
  - `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`
- 再把 `/dance-os 390`
  - `2775 -> 2220`

### 4. 本轮最后又补了两次 very small micro pass

为了让 `390` 这一档继续往参考稿的高密度工作台收口，这轮最后又补了两个 very small pass：

- `daily-latin 390 micro pass`
  - 把 `Today Loop Demo` 的 `STEP 3` 和 `ledger output` 再压一层
  - 让 `/daily-latin 390`
    - `2568 -> 2501`
- `dashboard 390 micro pass`
  - 再收一点 section gap / route gap / archive gap
  - 让 `/dashboard 390`
    - `2510 -> 2486`

## 当前最新 390 sweep

按真实 `build/start` + 浏览器复测，当前 `390px` sweep 是：

- `/`: `1730`
- `/daily-latin`: `2501`
- `/dance-os`: `2220`
- `/dashboard`: `2486`

## 当前新的 broad mobile Top1

这意味着当前 broad mobile Top1 已重新切回：

- `/daily-latin 390 = 2501`

但它已经只比 `/dashboard 390 = 2486` 高：

- `15`

同时已经明显高于：

- `/dance-os 390 = 2220`

这说明当前 3 条主 route 在 `390` 宽度下已经被明显拉到更接近同一档密度。

## 本轮最后一跳的关键变化

### `daily-latin 390`

- `Today Loop Demo`
  - `519.33 -> 485.27`
- `Live Return / Clip Bridge / Archive Jump`
  - `322.56 -> 312.48`
- `Daily Latin 动作库`
  - `320.31 -> 297.73`

### `dashboard 390`

- `Route Map`
  - `267.56 -> 266.56`
- `Witness Archive`
  - `360.61 -> 359.61`
- 更关键的是整页节奏继续更紧：
  - `2510 -> 2486`

## 当前最值得继续做什么

如果继续按 broad mobile Top1 往下追，当前最值得回看的已经重新变成：

1. `/daily-latin 390`
2. 然后再看是否还有必要继续抠 `/dashboard 390`

而如果从“继续收数值”切回“继续收完成感”，当前最值得回去看的已经不是 route mobile density，而是：

1. 首页 `hero`
2. 首页 `heatmap / today status`
3. 首页 `lower workbench`

## 验证

这轮最终状态已再次通过：

- `pnpm build`
- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

并继续确认：

- mobile home 无横向溢出
- mobile daily-latin 无横向溢出
- Daily / Dance / Dashboard 关键交互 smoke 继续通过

## 截图

- `/tmp/daily-latin-390-after-micro-pass.png`
- `/tmp/dashboard-390-after-micro-pass.png`
- `/tmp/dance-os-390-after-compact-pass.png`

## 结论

这轮最大的价值不是单页数值，而是：

- `390` 这一档已经不再是一页明显掉队、其他页跟不上
- 而是三条主 route 都被拉到了更接近参考稿的同一套窄屏工作台语言

当前还没到“近似同款完成度”，但已经明显更接近：

- 同一作品
- 同一信息密度
- 同一工作台节奏
