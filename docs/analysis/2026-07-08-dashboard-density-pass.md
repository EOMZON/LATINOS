# 2026-07-08 Dashboard Density Pass

## 背景

在首页连续几轮已经进入 endgame polish 之后，这轮重新做关键二级页复核，真实量化结果是：

- `/daily-latin` 桌面端：`2309`
- `/daily-latin` 手机端：`6364`
- `/dance-os` 桌面端：`2733`
- `/dance-os` 手机端：`6071`
- `/dashboard` 桌面端：`3549`
- `/dashboard` 手机端：`8505`

也就是说，当前最掉队的已经不是：

- `Daily Latin`
- `Dance OS`

而是：

- `/dashboard`

问题不在于它信息错误，而在于：

- 它比其他 route 更像把所有状态平铺出来
- 尤其手机端，整页明显更长、更密、更像“全量状态页”

## 问题定义

这一轮不改：

- 信息架构
- 数据逻辑
- 归档逻辑
- 文案含义

只解决一件事：

**能不能给 `/dashboard` 加一层页面级 compact 组合，让它在保持信息完整的前提下，更接近其他 route 的 workbench 密度。**

## 这轮动作

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dashboard/page.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. 给 dashboard 增加页面级 compact 组合层

动作：

- 页面根节点改成：
  - `dashboard-page`
- 两个 `WorkbenchCluster` 增加：
  - `dashboard-cluster`
- 所有 section header 改用：
  - `compact-sec-head`
- footer 改成：
  - `compact-dashboard-footer`

意义：

- 不去发明新结构
- 而是在现有 page composition 之上，加一层 dashboard 专属的收口壳

### 2. 验证卡与运维卡改用 compact info cards

动作：

- `InfoCard` 在 dashboard 的：
  - `验证状态`
  - `当前运维判断`
- 两处都改成：
  - `className="compact-card"`

意义：

- 复用已经存在的 compact 信息卡模式
- 不单独为 dashboard 再造一套 log card 结构

### 3. 用页面级 CSS 收 dashboard 整体密度

动作：

- 顶部 metrics：
  - `dash-card` padding、字级、gap 下降
- `结构推进条`：
  - heatmap card padding、bars 高度、label 字级下降
- `下一批交付`：
  - course card padding、status、标题、正文收短
- `Proof / Risk / Gate`：
  - decision card padding、标题、summary、rows、note 全部 compact
- `Route Map`：
  - route card padding、标题、rows、note 全部 compact
- `Witness Archive`：
  - summary cards、panel、copy、latest、list item、CTA 全部 compact
- section 间距、cluster gap、footer 也同步下降

意义：

- 这轮不是删内容
- 而是把 dashboard 压回当前整站已经成立的 route density

### 4. 手机端单独再压一层

动作：

- 在 `@media (max-width:860px)` 下，继续对 dashboard 专属收：
  - section margin
  - metric cards
  - bars
  - course cards
  - decision cards
  - route cards
  - archive board
  - footer

意义：

- 这轮最需要修的是手机端过长
- 所以不能只做桌面端收口

## 量化结果

基于本地 `http://127.0.0.1:3200` 的真实测量：

### 整页高度

- `/dashboard` 桌面端：
  - 之前：`3549`
  - 现在：`3137`
- `/dashboard` 手机端：
  - 之前：`8505`
  - 现在：`6653`

### 关键区块

- `Witness Archive`
  - 现在：
    - 桌面端：`686.28`
    - 手机端：`984.75`
- `Proof / Risk / Gate`
  - 现在：
    - 桌面端：`331.38`
    - 手机端：`829.86`
- `Route Map`
  - 现在：
    - 桌面端：`503.53`
    - 手机端：`929.88`

判断：

- 这轮不是“看起来更紧”
- 而是整页高度被真实收下来了一大截
- 手机端是最明显的受益者

## 视觉证据

这轮截图：

- 桌面端：
  - `/tmp/dashboard-after-density-pass-desktop.png`
- 手机端：
  - `/tmp/dashboard-after-density-pass-mobile.png`

上一轮截图：

- 桌面端：
  - `/tmp/dashboard-current-desktop.png`
- 手机端：
  - `/tmp/dashboard-current-mobile.png`

## 验证

这轮后通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- `/dashboard` 仍然保留完整的 dense sections
- `Witness Archive` fallback 行为未改坏
- 首页 / `Daily Latin` / `Dance OS` 交互 smoke 未回退
- mobile home / daily 继续无横向 overflow

## 这轮后的判断

这轮价值很高，因为它把 `/dashboard` 从：

- 一个把状态全摊开的长页

推进成更接近：

- 当前 frontdoor 体系里的 compact workbench route

而且这轮没有通过删块完成，而是：

- 保留信息
- 只收密度
- 让它和首页 / Daily / Dance OS 更像同一套作品体系

## 剩余差距

当前仍然不能判定完成。

剩余差距主要变成：

1. 首页与关键二级页是否已经足够像同一套作品体系
2. `Daily Latin` 与 `Dance OS` 是否还存在比 dashboard 更值得压的局部厚块
3. 整站是否还需要最后一轮 atmosphere 级 sweep

## 下一步

下一轮最值得继续做的是：

1. 再做一次整站 completion sweep
2. 优先对比：
   - `/`
   - `/daily-latin`
   - `/dance-os`
   - `/dashboard`
3. 如果没有更大掉队项，再回首页做最后 very small 的 atmosphere polish
