# Dashboard Witness Archive Head Negative Margin Pass

## 背景

继续沿用当前已经锁定的 `390px` compact loop：

- 只做 single-point pass
- 只有当 route 总高和目标 section 高度都下降时才算成立
- 不重新讨论框架，不扩大到多点改动

在上一轮 `dance-assets` pass 之后，fresh broad mobile route heights 是：

- `/ = 1513`
- `/daily-latin = 1634`
- `/dashboard = 1634`
- `/dance-os = 1631`

因此当前 broad mobile Top1 进入并列状态：

- `/daily-latin = 1634`
- `/dashboard = 1634`

## preflight

这轮先同时对 `/daily-latin` 和 `/dashboard` 做 fresh runtime preflight。

baseline：

- `/daily-latin = 1634`
  - `#today-loop-demo = 234.5`
  - `#live-return-bridge = 132.14`
  - `#daily-library = 91.53`
- `/dashboard = 1634`
  - `#dashboard-witness-archive = 138.84`
  - `#dashboard-structure-bar = 118.19`
  - `#dashboard-next-actions = 124.53`

候选结果：

- `daily-loop-shell-mneg2`
  - `/daily-latin: 1634 -> 1632`
  - `#today-loop-demo: 234.5 -> 232.5`
- `daily-return-panel-pad0`
  - `/daily-latin: 1634 -> 1632`
  - `#live-return-bridge: 132.14 -> 130.14`
- `daily-library-minh14`
  - `/daily-latin: 1634 -> 1633`
  - `#daily-library: 91.53 -> 90.25`
- `dash-witness-head-mb1`
  - `/dashboard: 1634 -> 1632`
  - `#dashboard-witness-archive: 138.84 -> 136.84`
- `dash-structure-head-mb3`
  - `/dashboard: 1634 -> 1632`
  - `#dashboard-structure-bar: 118.19 -> 116.19`
- `dash-next-gap0`
  - `/dashboard: 1634 -> 1632`
  - `#dashboard-next-actions: 124.53 -> 122.53`

从第一轮 preflight 看，`/dashboard` 的 `Witness Archive` 继续收头部间距的潜力最大，于是继续做梯度测试：

- `margin-bottom: 2px`
  - `/dashboard: 1633`
  - `#dashboard-witness-archive: 137.84`
- `margin-bottom: 1px`
  - `/dashboard: 1632`
  - `#dashboard-witness-archive: 136.84`
- `margin-bottom: 0`
  - `/dashboard: 1631`
  - `#dashboard-witness-archive: 135.84`
- `margin-bottom: -1px`
  - `/dashboard: 1630`
  - `#dashboard-witness-archive: 134.84`
- `margin-bottom: -2px`
  - `/dashboard: 1629`
  - `#dashboard-witness-archive: 133.84`
- `margin-bottom: -3px`
  - `/dashboard: 1628`
  - `#dashboard-witness-archive: 132.84`
- `margin-bottom: -4px`
  - `/dashboard: 1627`
  - `#dashboard-witness-archive: 131.84`
- `margin-bottom: -5px`
  - `/dashboard: 1626`
  - `#dashboard-witness-archive: 130.84`

结合 section screenshot 复核后，`-5px` 仍然视觉安全，而且收益高于所有同轮候选，因此选定：

- `.dashboard-page #dashboard-witness-archive .archive-item-head`
- `margin-bottom: -5px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `390px` override：

```css
@media (min-width:390px) and (max-width:430px){
  .dashboard-page #dashboard-witness-archive .archive-item-head{margin-bottom:-5px}
}
```

## 验证链

按既定串行顺序完成：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh `390px` remeasure
7. injected A/B compare

结果：

- `typecheck`: pass
- `build`: pass
- `route smoke`: pass
- `browser smoke`: pass
- mobile overflow:
  - `home`: none
  - `daily-latin`: none

## 量化结果

### injected A/B compare

在浏览器里对同一页面直接注入两条互斥规则做对照：

- `mb4`
  - `/dashboard = 1635`
  - `#dashboard-witness-archive = 139.84`
- `mb-5`
  - `/dashboard = 1626`
  - `#dashboard-witness-archive = 130.84`

这证明这轮收益来自这条规则本身，而且继续往负值收直到 `-5px` 时仍然保持稳定收益。

### fresh `390px` remeasure

- `/ = 1513`
- `/daily-latin = 1634`
- `/dashboard = 1626`
- `/dance-os = 1631`

`/dashboard` 内部关键 section：

- `#dashboard-witness-archive = 130.84`
- `#dashboard-route-map = 114.59`
- `#dashboard-structure-bar = 118.19`
- `#dashboard-next-actions = 124.53`

## 结论

这是一轮成立的 `/dashboard` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

量化上：

- `/dashboard`
  - `1634 -> 1626`
- `#dashboard-witness-archive`
  - `138.84 -> 130.84`

这轮后，当前 fresh broad mobile Top1 变成：

- `/daily-latin = 1634`

因此下一轮应回到 `/daily-latin`，继续做 fresh runtime preflight，再选 single-point ROI 更高的一刀。
