# dance-os 360 mobile fallback pass

## 背景

在上一轮把 `/dashboard` 的 `360px` 收紧之后，重新做全站窄屏 sweep：

- `/dashboard 360`: `2571`
- `/daily-latin 360`: `2778`
- `/dance-os 360`: `2842`

这意味着新的 `360px` Top1 已经转回：

- `/dance-os`

## 问题定义

真正的问题不是 `dance-os` 在所有手机上都太厚。

真正的问题是：

**`/dance-os` 在 `390 / 375` 已经接近稳定，但在 `360px` 下，`Correction Ledger Demo`、`Body Map / Practice Queue` 和 `Dance OS 模块库` 仍然偏厚，窄屏完成度没有跟上其他 route。**

## 这轮前的真实证据

基于本地：

- `http://127.0.0.1:3200/dance-os`

### full page

- `390`: `2775`
- `375`: `2851`
- `360`: `2842`

### `360px` 下 section 高度

- `dance-summary`: `375.86`
- `dance-assets`: `377.08`
- `correction-ledger-demo`: `722.56`
- `body-map-practice-queue`: `614.52`
- `dance-sources`: `234.56`

### 其中最关键的厚块

- `ledger_shell`: `658.38`
- `ledger_output`: `519.72`
- `ledger_stack`: `638.38`
- `bodymap_grid`: `372.33`
- `assets_grid`: `212`

这说明最高 ROI 不是平均缩整页，而是继续抓：

1. `Correction Ledger Demo`
2. `Body Map / Practice Queue`
3. `Dance OS 模块库`

## 这轮采取的策略

这轮依旧不改组件逻辑，只改：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

而且继续沿用已经验证过的模式：

- 只在 `max-width:374px` 下追加 `dance-os` 专属 fallback
- 不改 `390 / 375`
- 优先修窄屏结构回退，而不是改交互实现

## 具体改动

### 1. `dance-summary`

恢复更紧的窄屏双栏壳：

- `compact-detail-dance-top`
- `compact-route-stage-dance`

让 summary 更像参考稿的 route snapshot，而不是窄屏解释面板。

### 2. `Dance OS 模块库`

继续把 module library 往工具卡墙方向推：

- `compact-asset-grid` 在 `360px` 下改成 `4` 列
- asset ratio 进一步收短
- `cap-note` 隐藏
- `asset-state` 隐藏

这样做的目的是把它明确推向“入口工具库”，而不是小型说明卡墙。

### 3. `Correction Ledger Demo`

这是这一轮最大 ROI。

主要做了：

- `ledger-grid` 继续保持双栏
- `ledger-stack` 恢复双列紧凑排布
- state / profile / focus 按钮继续压紧
- `choice-note` 在 `360px` 下隐藏
- checklist 与 result shell 再收一层
- next step / recent witness / textarea / CTA 一起变薄

目标不是删掉 demo，而是让它更接近参考稿里那种：

- 窄屏仍然是 workbench
- 不回退成厚解释单列页

### 4. `Body Map / Practice Queue`

继续把它推向：

- 左侧 focus 热区图
- 右侧 next queue

并进一步在 `360px` 下收：

- summary pills
- left/right panel padding
- `bodymap-copy`
- focus card 的 `proof`
- latest / queue 的说明行

这里最重要的不是“信息越多越好”，而是让用户一眼知道：

- 热区在哪
- 下一轮从哪继续

## 这轮后的量化结果

### `/dance-os`

- `390`: `2775` -> `2775`
- `375`: `2851` -> `2851`
- `360`: `2842` -> `2153`

### `360px` 下关键 section

- `dance-summary`: `375.86` -> `174.44`
- `dance-assets`: `377.08` -> `341.75`
- `correction-ledger-demo`: `722.56` -> `448.8`
- `body-map-practice-queue`: `614.52` -> `480.14`
- `dance-sources`: `234.56` -> `190.36`

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
- `360`: `2153`

### `/dashboard`

- `390`: `2783`
- `375`: `2852`
- `360`: `2571`

## 当前结论

这轮之后，`/dance-os` 已经不再是当前 `360px` Top1。

新的 `360px` 对比变成：

- `/daily-latin`: `2778`
- `/dashboard`: `2571`
- `/dance-os`: `2153`

如果继续追 `360px` Top1，当前最该回看的已经重新变成：

- `/daily-latin`

如果按更广义 mobile consistency 来看，`375px` 下当前更高的 route 仍然是：

- `/daily-latin 375`: `2981`

## 截图

- 修复前：
  - `/tmp/dance-os-360-before-pass.png`
- 修复后：
  - `/tmp/dance-os-360-after-pass.png`

## 验证

已通过：

- `pnpm build`
- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

并继续确认：

- `390 / 375 / 360` 三档无横向溢出
- `dance-os` route / anchors / correction ledger / body map smoke 未回退

## 下一轮最值得继续做什么

1. 如果继续追窄屏 Top1，回看 `/daily-latin`
2. 如果从整体完成感继续追，则回到首页 hero / lower workbench 的比例与现场感
3. 如果从共享资产继续追，则可以考虑把这轮 `dance-os` 的：
   - asset wall
   - compact ledger
   - bodymap queue
   的 `360px` fallback 继续抽成更稳定的 shared pattern
