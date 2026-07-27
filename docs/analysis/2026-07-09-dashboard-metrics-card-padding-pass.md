# Dashboard Metrics Card Padding Pass

## 背景

在 latest fully verified `390px` broad mobile baseline 下：

- `/ = 1513`
- `/daily-latin = 1726`
- `/dashboard = 1726`
- `/dance-os = 1731`

这意味着当轮 broad mobile Top1 是并列状态：

- `/daily-latin = 1726`
- `/dashboard = 1726`

继续 fresh 预演后，对两条并列 Top1 的主要有效候选做比较：

### `/daily-latin`

- `#daily-library .compact-move-card`
  - route `1726 -> 1724`
  - target `129.53 -> 127.53`
- `#live-return-bridge .bodymap-actions`
  - route `1726 -> 1725`
  - target `145.14 -> 144.14`

### `/dashboard`

- `#dashboard-metrics .dash-card`
  - route `1726 -> 1722`
  - target `139.03 -> 135.03`
- `#dashboard-witness-archive .archive-item`
  - route `1726 -> 1724`
  - target `148.84 -> 146.84`

因此这轮优先收 `/dashboard`，并选择当前 ROI 明显最高的 `metrics-card-padding`。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

在文件末尾追加更具体的 `390px` 覆盖：

- `.dashboard-page #dashboard-metrics .dash-card`

做 very small pass：

- `padding: 8px -> 7px`

这样做的原因是：

- 当前文件里已经存在一层命中的 `390px` metrics card 覆盖
- 运行时确认真正命中的最终值已经是 `8px`
- 这轮只继续收最小一档 metrics card shell，不动其他 dashboard section

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
- `/daily-latin = 1726`
- `/dashboard = 1722`
- `/dance-os = 1731`

对应量化收益：

- `/dashboard 390`
  - `1726 -> 1722`
- `#dashboard-metrics`
  - `139.03 -> 135.03`

运行时再次确认：

- `#dashboard-metrics .dash-card`
  - `padding = 7px`

## 这轮成立的结论

- `dashboard-metrics` 在 `390px` 下还有一档明确成立的 card shell 收口空间
- 在这轮并列 Top1 比较里，它是当前 ROI 最高的一刀
- 这轮后 fresh broad mobile Top1 切回：
  - `/daily-latin = 1726`

下一轮应回到 fresh broad baseline 后，继续拆 `/daily-latin`，优先在 `live-return-bridge / daily-library / today-loop-demo` 之间挑下一刀最小且稳定的 pass。
