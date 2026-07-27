# 2026-07-08 Dance OS Mobile Compact Pass

## 背景

在重新做整站 completion sweep 之后，当前四个关键 route 的手机端量化状态是：

- `/`
  - `2325`
- `/daily-latin`
  - `6364`
- `/dance-os`
  - `6071`
- `/dashboard`
  - `6448`

这说明：

- 首页已经不再是主要问题
- `dashboard` 虽然仍长，但最近两轮已经连续压过
- 当前更值得继续抓的高 ROI 问题，是 `Dance OS` 里仍然存在的几个明显厚块，尤其：
  - `Correction Ledger Demo`
  - `Dance OS 模块库`
  - `本页依据`

进一步看手机端真实截图后，最值得处理的不是功能逻辑，而是：

- 说明层文字过厚
- compact 组件在手机端仍然保留了略多的解释高度
- 整页因此比应有的 workbench route 更重

## 问题定义

这一轮不重做：

- `Correction Ledger Demo`
- `Body Map / Practice Queue`
- `Dance OS` 的信息架构

只解决一件事：

**让 `Dance OS` 在手机端继续保留现有交互和信息结构，但把 compact 壳再压一层，更接近 frontdoor 当前已经形成的 workbench 节奏。**

## 这轮动作

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dance-os/page.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. 给 Dance OS 增加页面级 compact 壳

动作：

- 页面根节点改成：
  - `dance-os-page`
- `Correction Ledger Demo`
  - `Body Map / Practice Queue`
  - `本页依据`
- 这些 section header 全部统一改成：
  - `compact-sec-head`
- `本页依据` 的 `SourceMatrix` 改成：
  - `className="compact-source-matrix"`

意义：

- 不新造结构
- 只是让 `Dance OS` 也拥有和 `dashboard` 一样的页面级 compact 组合控制层

### 2. 手机端继续压顶部 summary 与模块库

动作：

- tabs 更小、更紧
- `compact-detail-dance-top`
  - `subtitle` 变成 2 行 clamp
  - `kv` 的 label/value 更紧
  - `kv span` 变成 2 行 clamp
- `compact-route-stage-dance`
  - signals 继续维持 3 列
  - signal copy 限制为 2 行
- `compact-library-panel`
  - padding、标题、note 继续下降
  - note 变成 2 行 clamp
- `compact-asset-grid`
  - gap、padding、标题、note、meta 继续下降
  - `cap-note` / `asset-meta` 都加 2 行 clamp

意义：

- 顶部不再像“摘要 + 模块库 + 说明”同时抢高度
- 更像当前页的 quick workbench overview

### 3. 手机端继续压 Correction Ledger

动作：

- `compact-ledger-shell`
  - 外层 padding、card padding 下降
- `ledger-copy`
  - 字级下降
  - 2 行 clamp
- `choice-btn`
  - padding 略收
- `choice-note`
  - 字级下降
  - 2 行 clamp
- `ledger-result-card p`
  - `ledger-next-step p`
  - `witness-item p`
  - 全部变成 2 行 clamp
- `ledger-empty`
  - 字级更小

意义：

- 不影响状态选择、focus 选择、保存 witness
- 但把“说明性高度”收短，保留“操作性高度”

### 4. 手机端继续压 Body Map 与 Sources

动作：

- `bodymap-copy`
  - 2 行 clamp
- `bodymap-focus-proof`
  - `bodymap-focus-cue`
  - `bodymap-latest-card p`
  - `practice-queue-card p`
  - `practice-queue-note`
  - 全部变成 2 行 clamp
- `compact-source-matrix`
  - padding、gap、row size 再收一层

意义：

- 后半段依然保留 route 结构
- 但不再让解释层和长句继续把页面拖长

## 量化结果

基于本地 `http://127.0.0.1:3200/dance-os` 的真实测量：

### 整页高度

- 桌面端：
  - 之前：`2733`
  - 现在：`2687`
- 手机端：
  - 之前：`6071`
  - 现在：`5603`

### 关键区块

- `Dance OS 模块库`
  - 手机端：
    - `942 -> 917`
- `Correction Ledger Demo`
  - 桌面端：
    - `593 -> 595`（基本持平）
  - 手机端：
    - `1534 -> 1423`
- `Body Map / Practice Queue`
  - 手机端：
    - `1179 -> 1158`
- `本页依据`
  - 手机端：
    - `721 -> 511`

判断：

- 这轮最大价值在手机端
- 不是删块，而是明显把最厚的两个区块继续收掉了一层
- `本页依据` 的收口尤其有效

## 视觉证据

这轮截图：

- 桌面端：
  - `/tmp/dance-os-after-mobile-compact-desktop.png`
- 手机端：
  - `/tmp/dance-os-after-mobile-compact-mobile.png`

上一轮截图：

- `/tmp/dance-os-sweep-desktop.png`
- `/tmp/dance-os-sweep-mobile.png`

## 验证

这轮后通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- `Correction Ledger Demo` 交互未回退
- `Body Map / Practice Queue` 未被误伤
- `SourceMatrix` 只是换成 compact 语言，没有丢数据
- 首页 / `Daily Latin` / `dashboard` 既有 smoke 继续通过

## 这轮后的判断

这轮价值很高，因为它符合这条线当前最重要的原则：

- 不推翻结构
- 不重做交互
- 优先收掉高 ROI 厚度

现在 `Dance OS` 更接近：

- 一个被控制住密度的 compact workbench route

而不是：

- 手机端仍然偏厚的工具说明页

## 下一步

下一轮最值得继续做的是：

1. 再做一次四个关键 route 的 completion sweep
2. 重新对比：
   - `/`
   - `/daily-latin`
   - `/dance-os`
   - `/dashboard`
3. 确认最后的 Top1 掉队项，再继续单点收口
