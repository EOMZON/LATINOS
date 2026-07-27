# Dashboard Metric Compact Pass

## 背景

在 `Daily Loop` 的 second compact label pass 成立之后，fresh `390px` broad mobile Top1 变成：

- `/dashboard = 2053`

重新拆 `/dashboard` section 后确认当前最厚的是顶部 metric 区：

- top section / `.dash-grid = 198.47`

进一步拆单张 metric card 后发现：

- 4 张 card 高度完全一致
- 每张 `dash-card` 高度 `95.23`
- `label / value / detail` 三层都稳定存在

其中最容易继续收的低收益层是：

- `detail`

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/cards/metric-card.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dashboard/page.tsx`

### 1. `MetricCard` 增加 compact 开关

让组件支持：

- `compact?: boolean`

### 2. compact 下不再渲染 `detail`

保留：

- label
- value

隐藏：

- detail

### 3. `/dashboard` 顶部 metrics 以 compact 方式接入

在：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dashboard/page.tsx`

把：

- `<MetricCard metric={metric} />`

收为：

- `<MetricCard metric={metric} compact />`

## fresh 验证

在 fresh `3200` 上重新执行：

- `pnpm build`
- `pnpm typecheck`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- dashboard dense sections 正常
- desktop 关键路径正常
- mobile shell 正常
- `home` / `daily-latin` 无横向 overflow

## 量化结果

fresh `390px` sweep：

- `/ = 1513`
- `/daily-latin = 2049`
- `/dashboard = 2013`
- `/dance-os = 1930`

顶部 metrics：

- top section
  - `198.47 -> 159.03`
- `.dash-grid`
  - `198.47 -> 159.03`
- `.dash-card`
  - `95.23 -> 75.52`

## 这轮成立的结论

这轮 metric compact pass 已被 fresh 数据证明有效：

- `/dashboard 390`
  - `2053 -> 2013`
- top section
  - `198.47 -> 159.03`

这说明：

- 当前顶部 metrics 的可收口部分确实不是 value 本体
- 而是 compact 场景下仍保留的 detail 行
- 组件级 compact 开关比继续靠 CSS 微裁更稳

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 切回：

- `/daily-latin = 2049`

同时：

- `/dashboard = 2013`
- `/dance-os = 1930`

因此下一轮应继续回到：

- `/daily-latin`

