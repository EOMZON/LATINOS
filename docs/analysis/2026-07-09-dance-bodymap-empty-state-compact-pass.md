# Dance Body Map Empty-State Compact Pass

## 背景

在上一轮把 `CorrectionLedgerDemo` 确认压到：

- `/dance-os = 2101`

之后，fresh `390px` broad mobile Top1 已经不再是 `dance-os`，但 `Dance OS` route 内部最厚的 section 仍然是：

- `#body-map-practice-queue = 480.14`

而且当时它的高度主要浪费在：

- 空 summary grid
- 空 practice queue block

也就是说，在没有真实 witness 时，这块还保留了太多“解释自己未来会长成什么”的空壳高度。

## 目标

继续按当前主线，只做组件层最小收口：

- 不重排 `Body Map`
- 不改 `Dance OS` 其他 section
- 只在 `compact + empty state` 下去掉信息增益最低、但持续占高度的空层

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/body-map-practice-queue.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dance-os/page.tsx`

### 1. `BodyMapPracticeQueue` 增加 `compact` 能力

让这个组件可以按 route 场景接收：

- `compact?: boolean`

## 2. compact + empty state 下隐藏两块空层

当：

- `compact === true`
- `summary.total === 0`

时，不再渲染：

- 顶部 `summary grid`
- 空的 `practice queue` block

仍然保留：

- `Body Map` 主体
- focus cards
- 后续真实 witness 回来后的自然恢复能力

### 3. `/dance-os` 以 compact 方式接入

在：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dance-os/page.tsx`

把：

- `<BodyMapPracticeQueue focuses={danceDemoFocuses} />`

收为：

- `<BodyMapPracticeQueue focuses={danceDemoFocuses} compact />`

## fresh 验证

在 fresh `3200` 上重新执行：

- `pnpm build`
- `pnpm typecheck`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- desktop 关键路径正常
- `Dance OS` correction ledger 交互正常
- `Body Map / Practice Queue` anchor 正常
- mobile shell 正常
- `home` / `daily-latin` 无横向 overflow

## 量化结果

fresh `390px` sweep：

- `/ = 1513`
- `/daily-latin = 2082`
- `/dashboard = 2085`
- `/dance-os = 1930`

`Dance OS` 分 section：

- `#dance-summary = 174.44`
- `#dance-assets = 358.91`
- `#correction-ledger-demo = 394.08`
- `#body-map-practice-queue = 309.14`
- `#dance-sources = 175.89`

`Body Map / Practice Queue` 深拆：

- `.compact-bodymap-board = 244.95`
- `.bodymap-grid = 244.95`
- `map panel = 244.95`
- `practice panel = 82.92`

## 这轮成立的结论

这轮 compact empty-state pass 已被 fresh 数据证明有效：

- `/dance-os 390`
  - `2101 -> 1930`
- `#body-map-practice-queue`
  - `480.14 -> 309.14`

这说明：

- 收益不是来自新样式表演
- 而是来自组件层对 empty state 的条件渲染
- `Dance OS` route 已经被明显拉离 broad mobile Top1

## 为什么这轮符合长期方向

这轮继续符合当前主线：

- 优先组件层
- 优先状态感知
- 不去粗暴裁全局 CSS
- 不把空状态长期保留成厚面板

它让 `Dance OS` 在 `390px` 下更接近 reference 的 dense workbench 语言：

- 有真实内容时再展开
- 没有真实内容时就别硬占高度

## broad mobile Top1 影响

这轮后 fresh `390px` broad mobile Top1 切到：

- `/dashboard = 2085`

同时：

- `/daily-latin = 2082`
- `/dance-os = 1930`

因此下一轮更高 ROI 的对象已经转为：

- `/dashboard`

