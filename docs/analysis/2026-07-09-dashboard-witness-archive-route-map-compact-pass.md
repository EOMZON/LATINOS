# Dashboard Witness Archive + Route Map Compact Pass

## 背景

在 `Correction Ledger Demo` 的未验证改动被确认生效之后，fresh `390px` broad mobile Top1 切到：

- `/dashboard = 2219`

因此这轮的目标不再是继续碰 `/dance-os`，而是只对 `/dashboard` 做最小 ROI 收口。

## 问题定位

先对 `/dashboard` 在 fresh `390px` 下重新拆 section 高度：

- `结构推进条 = 182.19`
- `下一批交付 = 185.03`
- `验证状态 = 124.97`
- `决策护栏 = 209.31`
- `Proof / Risk / Gate = 214.78`
- `Route Map = 229.44`
- `Witness Archive = 237.44`
- `当前运维判断 = 115.84`

这说明当时最厚的两个 section 是：

1. `Witness Archive = 237.44`
2. `Route Map = 229.44`

## 第一刀：Witness Archive

继续拆 `Witness Archive` 后发现：

- 当前是 fallback witness 状态
- 既有 `archiveIntro`
- 又有 `archive-latest`
- 同时下面还有 `archive-list`

对于 compact 场景来说，这里有一层重复证据：

- `latest` 这张卡并没有提供新的状态信息
- 它只是把 fallback line 再重复展示一遍

### 组件层改动

在：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/witness-archive-board.tsx`

新增：

- `showLatestCard = summary.latest && (!compact || summary.hasLiveWitness)`

含义：

- 如果是 compact + fallback 状态
  - 不再渲染 `archive-latest`
- 如果已经有 live witness
  - compact 仍然保留 latest 证据
- 非 compact 场景也仍然保留 latest

### 第一刀后的结果

fresh `390px` sweep：

- `/dashboard 390`
  - `2219 -> 2167`

`Witness Archive` section：

- `237.44 -> 186.03`

继续拆：

- `.archive-board = 161.84`
- `.archive-panel = 115.84`
- `.archive-latest = none`

也就是说，单靠这刀组件层状态收口，就把 `Witness Archive` 压低了：

- `51.41px`

## 第二刀：Route Map 头部说明

第一刀之后：

- `/dashboard = 2167`
- `/daily-latin = 2165`

此时只差 `2px`。

而新的最厚 section 已经变成：

- `Route Map = 229.44`

因此没有必要再动 route card 内容本身，只需要做 very small route-level pass：

在 `390px` 下隐藏 `Route Map` 头部的重复说明行。

### 样式改动

在：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

新增：

- `.dashboard-page section:has(.route-grid) .compact-sec-head .more{display:none}`

### 第二刀后的结果

fresh `390px` sweep：

- `/ = 1513`
- `/daily-latin = 2165`
- `/dashboard = 2145`
- `/dance-os = 2101`

`Route Map` section：

- `229.44 -> 207.44`

## 这轮成立的结论

这轮 `/dashboard` 的两刀都是有效的，并且都符合当前主线：

### 1. 优先组件层状态收口

`Witness Archive`：

- compact + fallback 不再重复渲染 latest 证据卡

### 2. 再做 very small route-level shell pass

`Route Map`：

- 只隐藏移动端 section head 的重复说明

最终结果：

- `/dashboard 390`
  - `2219 -> 2145`

## broad mobile Top1 状态

这轮后 fresh `390px` sweep 变成：

- `/ = 1513`
- `/daily-latin = 2165`
- `/dashboard = 2145`
- `/dance-os = 2101`

因此当前新的 broad mobile Top1 已切到：

- `/daily-latin = 2165`

同时三条核心 route 已经进一步靠近：

- `/daily-latin = 2165`
- `/dashboard = 2145`
- `/dance-os = 2101`

## 验证结果

这轮在 fresh `3200` 上继续通过：

- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

并继续确认：

- desktop 关键路径正常
- mobile shell 正常
- `home` 无横向 overflow
- `daily-latin` 无横向 overflow

## 为什么这轮符合长期方向

这轮没有：

- 扩散到多个 route 同时乱改
- 重写 `dashboard` 数据层
- 用大范围 CSS 硬裁正文

而是继续沿用：

- 先测量
- 抓当前 Top1
- 先做组件层状态收口
- 再做 very small route-level pass
- 改完立即 fresh 验证

## 下一步

下一轮更值得继续看的方向：

1. 重新回到 `/daily-latin = 2165`
2. fresh 拆它当前最厚 section
3. 只做下一刀最小 ROI 收口

如果三条主 route 已经进一步拉齐，则可以开始增加：

- 与参考稿“近似同款完成度”的整站 completion 视角
- 而不是只追 `390px` 数值
