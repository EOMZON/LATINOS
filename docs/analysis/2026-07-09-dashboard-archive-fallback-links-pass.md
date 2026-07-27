# Dashboard Archive Fallback Links Pass

## 背景

在上一轮把 `Dashboard` 的 `metric cards` 压到：

- `/dashboard = 2013`

之后，fresh `390px` broad mobile Top1 仍然在 `dashboard` 和 `daily-latin` 之间紧贴：

- `/daily-latin = 2011`
- `/dashboard = 2013`

继续拆 `/dashboard` 当前 section 后确认：

- `Witness Archive = 186.03`
- `决策护栏 = 187.31`
- `下一批交付 = 185.03`

进一步拆 `Witness Archive` 后发现，在当前没有 fresh live witness 的 compact fallback 场景下，这块的主要多余层是：

- panel head 里的双按钮入口

也就是说，在 compact fallback 状态下，它更像是重复 CTA，而不是高信息量层。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/witness-archive-board.tsx`

### 1. 新增 compact fallback 条件

新增：

- `showCompactArchiveLinks = !compact || summary.hasLiveWitness`

### 2. compact + fallback 下不再渲染 archive links

当：

- `compact === true`
- `summary.hasLiveWitness === false`

时，不再渲染：

- `看 Daily Witness`
- `看 Dance Witness`

仍然保留：

- section title
- summary cards
- starter return line / archive list

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
- `/daily-latin = 2011`
- `/dashboard = 1988`
- `/dance-os = 1930`

`Witness Archive`：

- section
  - `186.03 -> 160.84`
- `archive-panel-head`
  - `55.58 -> 30.39`
- `archiveLinksCount`
  - `1 -> 0`

## 这轮成立的结论

这轮 compact fallback pass 已被 fresh 数据证明有效：

- `/dashboard 390`
  - `2013 -> 1988`
- `Witness Archive`
  - `186.03 -> 160.84`

这说明：

- 当前 compact fallback 场景下的双按钮入口确实是低收益高度
- 用组件层条件渲染收掉它，比继续堆 CSS 更稳

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 切回：

- `/daily-latin = 2011`

同时：

- `/dashboard = 1988`
- `/dance-os = 1930`

因此下一轮应继续回到：

- `/daily-latin`

