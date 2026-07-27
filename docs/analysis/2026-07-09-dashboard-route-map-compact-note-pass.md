# Dashboard Route Map Compact Note Pass

## 背景

在 `Dance OS` 被 `Body Map` compact pass 拉低之后，fresh `390px` broad mobile Top1 变成：

- `/dashboard = 2085`

重新拆 `/dashboard` section 后确认当前最厚的是：

- `Route Map = 207.44`

进一步拆 `route-card` 后发现：

- 4 张卡高度完全一致
- 每张 card 的主要多余层不是 `proof / risk / gate` 三行本体
- 而是 compact 场景下仍保留的底部 `note`

这说明当前最值得继续收的不是改 grid，而是把 `Route Map` 更明确地收成 dense route monitor。

## 目标

继续按最小 blast radius 做一刀组件层收口：

- 不改 `dashboard` 其他 section
- 不重排 `route-grid`
- 不删除 `proof / risk / gate`
- 只在当前 compact route map 场景里收掉最低收益的 `note`

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/cards/route-signal-card.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dashboard/page.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`

### 1. 先给 `RouteSignalData` 增加 compact 文案槽位

补了：

- `compactProof`
- `compactRisk`
- `compactGate`
- `compactNote`

并在：

- `dashboardRouteSignals`

里写入更短的 compact 文案。

### 2. `RouteSignalCard` 增加 compact / hideNote 开关

让组件支持：

- `compact?: boolean`
- `hideNote?: boolean`

其中：

- `compact` 用于优先吃短文案
- `hideNote` 用于在 dense route monitor 场景下直接不渲染底部说明层

### 3. `/dashboard` 的 `Route Map` 以 compact + hideNote 方式接入

在：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dashboard/page.tsx`

把：

- `<RouteSignalCard item={item} />`

收为：

- `<RouteSignalCard item={item} compact hideNote />`

## 中途一个未成立尝试

这轮先试过只换 compact 短文案。

它让内容更干净了，但 fresh `390px` 下：

- `/dashboard` route 总高没有变化

所以那一刀不记为成立 pass。

最终成立的是：

- compact + hideNote

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
- `/daily-latin = 2082`
- `/dashboard = 2053`
- `/dance-os = 1930`

`/dashboard` section：

- `Route Map`
  - `207.44 -> 174.75`

`route-card`：

- `90.13 -> 73.78`
- `noteExists = false`

## 这轮成立的结论

这轮 compact route-map pass 已被 fresh 数据证明有效：

- `/dashboard 390`
  - `2085 -> 2053`
- `Route Map`
  - `207.44 -> 174.75`

这说明：

- 当前 `Route Map` 的瓶颈不是三列本体
- 而是 compact monitor 场景下仍保留的底部说明层
- 组件级条件渲染比继续堆 CSS 更有效

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 切到：

- `/daily-latin = 2082`

同时：

- `/dashboard = 2053`
- `/dance-os = 1930`

因此下一轮应继续回到：

- `/daily-latin`

