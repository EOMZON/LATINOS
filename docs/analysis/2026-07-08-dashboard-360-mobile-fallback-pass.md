# dashboard 360 mobile fallback pass

## 背景

在上一轮修完 `/daily-latin` 的 `360px` 断层之后，重新做全站 mobile sweep：

- `/daily-latin 360`: `2778`
- `/dance-os 360`: `2842`
- `/dashboard 360`: `2864`

这意味着新的窄屏 Top1 已经转回：

- `/dashboard`

## 问题定义

真正的问题不是 dashboard 在所有手机上都很差。

真正的问题是：

**`/dashboard` 在 `390px` 还算稳定，但在 `360px` 下，几块本来已经压紧的共享看板层仍然偏厚，导致整页密度没有跟上其他 route。**

尤其是：

- `下一批交付`
- `Route Map`
- `Witness Archive`

## 这轮前的真实证据

基于本地：

- `http://127.0.0.1:3200/dashboard`

### full page

- `390`: `2783`
- `375`: `2852`
- `360`: `2864`

### `360px` 下 section 高度

- `下一批交付`: `373.8`
- `验证状态`: `129.91`
- `决策护栏`: `265.62`
- `Proof / Risk / Gate`: `273.25`
- `Route Map`: `340.25`
- `Witness Archive`: `400.55`
- `当前运维判断`: `126.97`

从 ROI 看，最值得继续抓的是：

1. `下一批交付`
2. `Route Map`
3. `Witness Archive`

## 这轮采取的策略

这轮不改组件逻辑，不改内容结构。

只改：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

而且依旧采用和 `daily-latin` 一样的策略：

- 在 `max-width:374px` 下补 dashboard 专属 fallback
- 保持 `390 / 375` 不动
- 只处理窄屏回退里最厚的共享展示层

## 具体改动

### 1. `下一批交付`

把 `course-grid` 在 `360px` 下恢复成：

- `2` 列排布
- 更薄的 `course-card`
- 更短的标题和文案行高

目标不是极限缩字，而是避免 3 张卡在窄屏下一直纵向叠长。

### 2. `Route Map`

继续保留：

- `2` 列 route card

但把 card 内部再压紧一层：

- 更小的 `route-head`
- 更紧的 `route-row`
- 更短的 `route-note`

让它更接近参考稿那种“状态卡片墙”，而不是窄屏解释页。

### 3. `Witness Archive`

继续保留共享 archive 结构，但在 `360px` 下做更激进的 dashboard 专属压缩：

- summary cards 继续变薄
- archive panel padding 继续下降
- intro / latest / item copy 再收一层
- archive list 继续维持紧凑多列

目标不是删掉 witness，而是把它推进到更像 workbench 证据层，而不是大段解释板。

## 这轮后的量化结果

### `/dashboard`

- `390`: `2783` -> `2783`
- `375`: `2852` -> `2852`
- `360`: `2864` -> `2571`

### `360px` 下 section 变化

- `下一批交付`: `373.8` -> `201.25`
- `Route Map`: `340.25` -> `283.56`
- `Witness Archive`: `400.55` -> `376.61`

其中 `Witness Archive` 没有像 `下一批交付` 那样大幅下降，但整体路线已经明显更紧。

## 这轮后的全站 mobile sweep

### `/`

- `390`: `1730`
- `375`: `1724`
- `360`: `1717`

### `/daily-latin`

- `390`: `2884`
- `375`: `2981`
- `360`: `2778`

### `/dance-os`

- `390`: `2775`
- `375`: `2851`
- `360`: `2842`

### `/dashboard`

- `390`: `2783`
- `375`: `2852`
- `360`: `2571`

## 当前结论

这轮之后，`/dashboard` 已经不再是当前 `360px` Top1。

新的 `360px` 对比变成：

- `/dashboard`: `2571`
- `/daily-latin`: `2778`
- `/dance-os`: `2842`

所以当前新的窄屏 Top1 已转回：

- `/dance-os`

## 截图

- 修复前：
  - `/tmp/dashboard-360-before-pass.png`
- 修复后：
  - `/tmp/dashboard-360-after-pass.png`

## 验证

已通过：

- `pnpm build`
- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

并继续确认：

- `390 / 375 / 360` 三档无横向溢出
- dashboard route / dense sections / witness archive smoke 未回退

## 下一轮最值得继续做什么

1. 如果继续追窄屏 Top1，优先回看：
   - `/dance-os 360`
2. 如果从视觉完成度继续追，则更值得回到：
   - 首页 hero / lower workbench 的最终完成感
3. 如果从结构资产继续追，则可以考虑把 dashboard 这次 `course / route / archive` 的窄屏密度语言，继续抽象成更稳定的 shared fallback pattern
