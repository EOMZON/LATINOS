# Dashboard Route Map Title Negative Margin Pass

## 背景

在上一轮 latest fully verified `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1678`
- `/dashboard = 1683`
- `/dance-os = 1684`

因此当前 broad mobile Top1 是：

- `/dance-os = 1684`

但 `/dashboard` 只落后 `1px`，所以这一轮先对 `/dashboard` 做 fresh runtime preflight，而不是直接盲改。

## preflight

候选结果：

- `dashboard-structure-pad8`
  - `/dashboard: 1683 -> 1681`
  - `#dashboard-structure-bar: 143.19 -> 141.19`
- `dashboard-next-actions-gap1`
  - `/dashboard: 1683 -> 1682`
  - `#dashboard-next-actions: 136.53 -> 135.53`
- `dashboard-archive-panel-pad0`
  - `/dashboard: 1683 -> 1681`
  - `#dashboard-witness-archive: 140.84 -> 138.84`
- `dashboard-route-card-mneg1`
  - `/dashboard: 1683 -> 1677`
  - `#dashboard-route-map: 124.59 -> 118.59`

这一轮优先选择当前收益最高、同时仍然是 section head 收口的一刀：

- `.dashboard-page #dashboard-route-map .compact-sec-head`
- `margin-bottom: -1px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.dashboard-page #dashboard-route-map .compact-sec-head`
- 收成：
  - `margin-bottom: -1px`

## 验证链

按既定串行顺序完成：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh `390px` remeasure

结果：

- `typecheck`: pass
- `build`: pass
- `route smoke`: pass
- `browser smoke`: pass
- mobile overflow:
  - `home`: no overflow
  - `daily-latin`: no overflow

## 量化结果

fresh `390px` remeasure：

- `/dashboard`
  - `1683 -> 1677`
- `#dashboard-route-map`
  - `124.59 -> 118.59`
- `#dashboard-structure-bar`
  - `143.19 -> 143.19`
- `#dashboard-witness-archive`
  - `140.84 -> 140.84`
- `#dashboard-next-actions`
  - `136.53 -> 136.53`

fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1678`
- `/dashboard = 1677`
- `/dance-os = 1684`

## 结论

这是一轮成立的 `/dashboard` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

这轮后：

- `/dashboard` 从 `1683` 下降到 `1677`
- 当前 broad mobile Top1 回到：
  - `/dance-os = 1684`

因此下一轮应优先回到 `/dance-os`，继续做 fresh runtime preflight，再选最小且稳定的 single-point pass。
