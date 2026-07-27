# Dashboard Archive Item Padding Pass

## 背景

在 latest fully verified `390px` broad mobile baseline 下：

- `/ = 1513`
- `/daily-latin = 1722`
- `/dashboard = 1722`
- `/dance-os = 1728`

这意味着当轮 broad mobile Top1 是并列状态：

- `/daily-latin = 1722`
- `/dashboard = 1722`

继续 fresh 预演后，对两条并列 Top1 的主要有效候选做比较：

### `/daily-latin`

- `#daily-library .compact-move-card`
  - route `1722 -> 1720`
  - target `125.53 -> 123.53`
- `#live-return-bridge .bodymap-actions`
  - route `1722 -> 1721`
  - target `145.14 -> 144.14`

### `/dashboard`

- `#dashboard-witness-archive .archive-item`
  - route `1722 -> 1720`
  - target `148.84 -> 146.84`
- `#dashboard-metrics .dash-grid`
  - route `1722 -> 1721`
  - target `135.03 -> 134.03`

因此这轮优先收 `/dashboard`，因为在同样能带来 `route -2` 的候选里，`witness-archive` 当前目标 section 更高。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

在文件末尾追加更具体的 `390px` 覆盖：

- `.dashboard-page #dashboard-witness-archive .archive-item`

做 very small pass：

- `padding: 3px -> 2px`

这样做的原因是：

- 当前文件里已经存在一层命中的 `390px` archive item 覆盖
- 运行时确认真正命中的最终值已经是 `3px`
- 这轮只继续收最小一档 archive card shell，不动其他 dashboard section

## 验证结果

这轮按既定串行链完整通过：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh `390px` remeasure

## 量化结果

fresh `390px` broad sweep：

- `/ = 1513`
- `/daily-latin = 1722`
- `/dashboard = 1720`
- `/dance-os = 1728`

对应量化收益：

- `/dashboard 390`
  - `1722 -> 1720`
- `#dashboard-witness-archive`
  - `148.84 -> 146.84`

运行时再次确认：

- `#dashboard-witness-archive .archive-item`
  - `padding = 2px`

## 这轮成立的结论

- `dashboard-witness-archive` 在 `390px` 下还有一档明确成立的 archive item 壳体收口空间
- 在这轮并列 Top1 比较里，它优于同 route 收益但目标 section 更低的 `daily-library`
- 这轮后 fresh broad mobile Top1 切回：
  - `/daily-latin = 1722`

下一轮应回到 fresh broad baseline 后，继续拆 `/daily-latin`，优先在 `daily-library / live-return-bridge / today-loop-demo` 之间挑下一刀最小且稳定的 pass。
