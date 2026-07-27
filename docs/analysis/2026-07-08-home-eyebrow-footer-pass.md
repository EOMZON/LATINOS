# 2026-07-08 Home Eyebrow + Footer Pass

## 背景

上一轮首页已经把：

- 顶部 pill
- heatmap 辅助说明

里的内部推进语气又收掉一层。

但继续对照参考稿和当前截图，首页仍然还残留两块非常明显的“系统内部命名感”：

1. 顶部 `eyebrow`
   - `LATIN DANCE OS · 工作台`
2. footer
   - `LATINOS · frontdoor / legacy / demos / Feishu`

同时，模块卡虽然内容已经更真，但整体仍然略比参考稿更密。

也就是说，这轮更值得做的，不是继续调结构，而是：

- 再把首页的系统命名感和信息密度压轻一层

## 这轮目标

继续只留在首页，不回头平均改整站。

这轮集中做三件事：

1. 把 `eyebrow` 从系统命名收回前台入口语气
2. 把 footer 从内部结构标签收回真实用户收口语气
3. 再轻压一轮模块卡文字密度

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/page.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. 顶部 eyebrow 从系统命名收回前台入口语气

原先：

- `LATIN DANCE OS · 工作台`

仍然太像项目命名。

这轮改成：

- `拉丁练习入口 · 今天从这里开始`

目的很明确：

- 打开首页时，先看到“今天从哪里开始”
- 而不是先理解系统名称

### 2. footer 从内部结构标签收回前台收口

原先 footer：

- `LATINOS · frontdoor / legacy / demos / Feishu`
- `旧站保留 · 新版并行 · 先不切生产入口`

虽然对内部是对的，但对首页用户来说太像架构说明。

这轮新增：

- `HomeFooterData`
- `homeFooter`

并把 footer 改成：

- `先选状态，再把这一轮做完。`
- `旧站起步页 / Daily Latin / Dance OS`

这样 footer 现在更像：

- 一个轻的行动收口
- 三个真实入口的简短列举

而不是项目结构词表。

### 3. 模块卡再轻压一层文字密度

这轮没有改模块结构，而是同时从：

- 内容
- 样式

两侧继续轻压。

#### 内容侧

把一些 still-too-explanatory 的 note 继续收短，例如：

- `旧站 Proof`
- `Daily Latin`
- `Dance OS`
- `练习依据`
- `路线图`
- `状态看板`

都改成更短的入口句，而不是解释句。

#### 样式侧

继续压轻：

- `home-module-summary`
- `home-module-note`
- `compact-module-grid` 下的字级、行高、最大宽度
- `compact-home-footer` 的字级

这轮依然没有通过“做新结构”来减密度，而是继续沿现有共享层做收口。

## 量化结果

基于本地 prod 预览 `http://127.0.0.1:3200` 的真实测量：

- 桌面端全页：
  - `1468`
- 手机端全页：
  - `2667`
- 桌面端 `home-lower-cluster`：
  - `466.05`
- 桌面端 `modules`：
  - `281.84`
- 桌面端 `footer`：
  - `40.59`

- 手机端 `home-lower-cluster`：
  - `818.23`
- 手机端 `modules`：
  - `415.77`
- 手机端 `footer`：
  - `40.59`

### 相比上一轮

上一轮首页量化状态：

- 桌面端全页：
  - `1492`
- 手机端全页：
  - `2712`
- 桌面端 `home-lower-cluster`：
  - `489.06`

这轮变化：

- 桌面端：
  - `1492 -> 1468`
- 手机端：
  - `2712 -> 2667`
- 桌面端 `lower`：
  - `489.06 -> 466.05`

这说明这轮虽然主要是在做语气与密度收口，但最终也确实把首页又压短了一层。

## 截图

- 当前首页桌面端：
  - `/tmp/home-after-eyebrow-footer-pass-desktop.png`
- 当前首页手机端：
  - `/tmp/home-after-eyebrow-footer-pass-mobile.png`
- 上一轮首页桌面端：
  - `/tmp/home-after-pill-heatmap-pass-desktop.png`
- 上一轮首页手机端：
  - `/tmp/home-after-pill-heatmap-pass-mobile.png`
- 参考首页桌面端：
  - `/tmp/reference-home-desktop.png`
- 参考首页手机端：
  - `/tmp/reference-home-mobile.png`

## 验证

已通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- 这轮只动首页内容层与共享样式层，没有误伤 route/interaction
- `Daily Latin` / `Dance OS` / `dashboard` 等既有 smoke 继续通过
- mobile home / daily 无横向 overflow

## 这轮后的判断

这轮价值很高，因为首页最像“内部系统页”的两块又被明显收掉一层：

1. 顶部不再先说系统名称，而先说今天从哪开始
2. footer 不再先说目录结构，而先说入口与动作收口

同时模块区也确实更克制了。

当前首页已经比上一轮更接近参考稿那种：

- 打开就进入主题
- 信息足够，但不先讲内部结构
- 下半段更像入口，不像摘要板

## 仍然没完成的主要缺口

这轮之后首页仍未达到“近似同款完成度”。

当前更明显的剩余 gap 开始继续集中到：

1. sidebar 顶部站名仍然偏品牌壳，不够接近参考稿的最终完成感
2. hero 与 heatmap 之间的整体完成感已接近，但首页主叙事仍可再进一步细化
3. workbench rail 与模块卡虽然更轻了，但手机端仍略显密

## 下一轮最值得继续做什么

1. 继续看首页 sidebar / 顶部壳体是否还能再往参考稿贴近
2. 再做一次整页 completion audit，确认当前首页最大残留差距是在壳体、hero，还是移动端密度
3. 继续只做高 ROI 收口，不要回到平均修改整站
