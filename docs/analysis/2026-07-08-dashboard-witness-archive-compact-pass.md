# Dashboard Witness Archive Compact Pass

## 背景

在上一轮把 `/daily-latin 390` 从 `2267` 压到 `2244` 之后，fresh `390px` 全路由 sweep 重新来到：

- `/ = 1513`
- `/daily-latin = 2244`
- `/dashboard = 2264`
- `/dance-os = 2220`

这意味着当前新的 broad mobile Top1 已经切到：

- `/dashboard 390 = 2264`

所以这轮不应该再回头动 `daily-latin`，而应该继续沿着同一套 dense workbench 语言，只收：

- `/dashboard`

里当前最厚且最容易被 compact 化的一块。

## 问题定义

fresh `390px` 下继续拆 `/dashboard` 后，最厚单块是：

- `Witness Archive = 284.48`

进一步拆层后确认：

- section head：
  - `41.19`
- `.archive-board`：
  - `236.30`
- `.archive-panel`：
  - `190.30`
- `.archive-latest`：
  - `72.45`

这说明当前最值得继续收的不是：

- `Route Map`
- `Proof / Risk / Gate`
- `当前运维判断`

而是：

**`Witness Archive` 在 `390px` 下仍然保留了一层重复说明和一个独立 latest CTA，它更像“解释面板”，还没完全收成 reference 那种 dense monitor。**

## 为什么这轮选这个点

当前 `/dashboard` 的 ROI 很高，因为：

1. 它已经是新的 mobile Top1
2. `Witness Archive` 是当前最厚单块
3. 它有明确的 compact 收口空间
4. 不需要动路由结构或逻辑，只要继续做共享组件的 compact 变体

因此这轮最优解不是继续堆 CSS，而是：

- 给 `WitnessArchiveBoard` 增加显式 `compact` 能力
- 再只在 `dashboard` 启用

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/witness-archive-board.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dashboard/page.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. `WitnessArchiveBoard` 增加 `compact` 模式

新增：

- `compact?: boolean`

作用：

- 让组件自己知道什么时候应该走更 dense 的 witness archive 表达
- 不再把所有差异都硬塞给全局 CSS

### 2. compact 状态下压短 archive intro

`archiveIntro` 现在在 compact 下不再使用完整解释段，而是改成更短的真实句子：

- live 情况：
  - “这里开始验证 Daily 和 Dance 是否真的共用同一条回流线。”
- fallback 情况：
  - “当前先用 source-backed return lines 保持这条回流线可见。”

作用：

- 保持真实语义
- 去掉不适合 `390px` 的长解释段

### 3. compact 状态下不再渲染 latest 独立 CTA

在 `.archive-latest` 里：

- compact 时不再渲染：
  - `继续这一轮`

作用：

- latest 卡片继续保留：
  - label
  - title
  - next step
- 去掉重复入口动作
- 更接近当前 `390px` 下 dense preview monitor 的语言

### 4. 只在 `/dashboard` 启用 compact archive

在：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dashboard/page.tsx`

中把：

- `<WitnessArchiveBoard />`

改成：

- `<WitnessArchiveBoard compact />`

作用：

- 只影响 dashboard
- 不波及其他 route 或 future reuse

### 5. 只对 `Witness Archive` section 头部做 very small pass

在 `390px` 下继续收：

- `.dashboard-page section:has(.archive-board) .compact-sec-head .more`
  - 直接隐藏

同时把：

- `.dashboard-page section`
  - `margin-bottom`
- `.dashboard-page .compact-sec-head`
  - `margin-bottom`

再收一层。

作用：

- 不是全站改 header 语言
- 只是把当前这一节在移动端重复的一行说明收回组件内部表达

## 量化结果

### fresh `390px` 路由高度

这一轮前：

- `/dashboard = 2264`
- `/daily-latin = 2244`
- `/dance-os = 2220`

这一轮后：

- `/dashboard = 2219`
- `/daily-latin = 2244`
- `/dance-os = 2220`

也就是说：

- `/dashboard 390`
  - `2264 -> 2219`

### `Witness Archive`

这一轮前：

- `section = 284.48`
- `.archive-board = 236.30`
- `.archive-latest = 72.45`
- `.archive-panel = 190.30`

这一轮后：

- `section = 237.44`
- `.archive-board = 213.25`
- `.archive-latest = 49.41`
- `.archive-panel = 167.25`

判断：

- 最大收益来自：
  - latest 卡片去掉独立 CTA
  - compact intro 收短
  - section head 的 `more` 在 `390px` 下消失

## 新的 fresh `390px` sweep

这轮之后，fresh `390px` 路由高度是：

- `/ = 1513`
- `/daily-latin = 2244`
- `/dashboard = 2219`
- `/dance-os = 2220`

这意味着：

- `/dashboard` 已不再是 broad mobile Top1
- 当前新的 broad mobile Top1 切到：
  - `/daily-latin = 2244`

同时：

- `/dashboard` 和 `/dance-os` 已经进一步靠近同一档 dense mobile monitor 语言

## 验证

这轮通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- dashboard dense sections render
- dashboard witness archive 正常渲染
- daily loop demo 交互未回退
- dance-os 关键交互未回退
- home next session queue 正常
- mobile shell 正常
- mobile home / daily 无横向 overflow

## 结论

这轮最重要的价值不是“又减了几十像素”。

而是：

1. 把 `Witness Archive` 从解释面板继续推向共享回流监控层
2. 用组件层 compact 能力，而不是全靠 CSS 粗暴裁剪
3. 让 `/dashboard 390` 从 `2264` 降到 `2219`
4. 继续把 3 条主 route 的 `390px` 密度往同一档拉齐

## 下一步

下一轮更值得继续做的是：

1. fresh 再测一次完整 `390px` sweep
2. 重新确认新的 broad mobile Top1
3. 如果当前 Top1 回到 `/daily-latin`
   - 继续看：
     - `#live-return-bridge`
     - `#daily-library`
4. 如果 route-level mobile density 已继续拉齐
   - 重新回到整站“近似同款完成度”的 completion 视角
