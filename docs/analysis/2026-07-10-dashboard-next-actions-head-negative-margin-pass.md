# Dashboard Next Actions Head Negative Margin Pass

## 背景

继续沿用当前已经锁定的 `390px` compact loop：

- 只做 single-point pass
- 只有当 route 总高和目标 section 高度都下降时才算成立
- 不重新讨论框架，不扩大到多点改动

在上一轮 `daily library tabs` pass 之后，fresh broad mobile route heights 是：

- `/ = 1513`
- `/daily-latin = 1610`
- `/dashboard = 1619`
- `/dance-os = 1618`

因此当前 broad mobile Top1 是：

- `/dashboard = 1619`

## preflight

先对 `/dashboard` 当前几个主要 section 做 fresh runtime 候选预演。

baseline：

- `/dashboard = 1619`
- `#dashboard-witness-archive = 130.84`
- `#dashboard-route-map = 114.59`
- `#dashboard-structure-bar = 111.19`
- `#dashboard-next-actions = 124.53`

候选结果：

- `witness-head-mbneg10`
  - `/dashboard: 1614`
  - `#dashboard-witness-archive: 125.84`
- `witness-head-mbneg12`
  - `/dashboard: 1612`
  - `#dashboard-witness-archive: 123.84`
- `route-head-mbneg10`
  - `/dashboard: 1614`
  - `#dashboard-route-map: 109.59`
- `route-head-mbneg12`
  - `/dashboard: 1612`
  - `#dashboard-route-map: 107.59`
- `structure-head-mbneg10`
  - `/dashboard: 1617`
  - `#dashboard-structure-bar: 109.19`
- `structure-head-mbneg12`
  - `/dashboard: 1615`
  - `#dashboard-structure-bar: 107.19`
- `next-gap0`
  - `/dashboard: 1617`
  - `#dashboard-next-actions: 122.53`
- `next-head-mbneg2`
  - `/dashboard: 1612`
  - `#dashboard-next-actions: 117.53`

从第一轮 preflight 看，`witness archive`、`route map`、`next actions` 一度并列高收益，于是先做局部截图复核。截图上看：

- `witness archive` 再压已经开始更贴近内容层
- `route map` 再压也更容易顶住卡片上缘
- `next actions` 的标题间距继续下收最稳

因此转向继续做 `.dashboard-page #dashboard-next-actions .compact-sec-head` 的梯度测试：

- `margin-bottom: -2px`
  - `/dashboard: 1612`
  - `#dashboard-next-actions: 117.53`
- `margin-bottom: -3px`
  - `/dashboard: 1611`
  - `#dashboard-next-actions: 116.53`
- `margin-bottom: -4px`
  - `/dashboard: 1610`
  - `#dashboard-next-actions: 115.53`
- `margin-bottom: -5px`
  - `/dashboard: 1609`
  - `#dashboard-next-actions: 114.53`
- `margin-bottom: -6px`
  - `/dashboard: 1608`
  - `#dashboard-next-actions: 113.53`

结合 section screenshot 复核后：

- `-6px` 已开始有一点顶住标题上缘
- `-5px` 更稳，而且收益已经很高

因此这一轮选定：

- `.dashboard-page #dashboard-next-actions .compact-sec-head`
- `margin-bottom: -5px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `390px` override：

```css
@media (min-width:390px) and (max-width:430px){
  .dashboard-page #dashboard-next-actions .compact-sec-head{margin-bottom:-5px}
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

- `mb5`
  - `/dashboard = 1619`
  - `#dashboard-next-actions = 124.53`
- `mbneg5`
  - `/dashboard = 1609`
  - `#dashboard-next-actions = 114.53`

这证明这轮收益来自这条规则本身。

### fresh `390px` remeasure

- `/ = 1513`
- `/daily-latin = 1610`
- `/dashboard = 1609`
- `/dance-os = 1618`

`/dashboard` 内部关键 section：

- `#dashboard-witness-archive = 130.84`
- `#dashboard-route-map = 114.59`
- `#dashboard-structure-bar = 111.19`
- `#dashboard-next-actions = 114.53`

## 结论

这是一轮成立的 `/dashboard` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

量化上：

- `/dashboard`
  - `1619 -> 1609`
- `#dashboard-next-actions`
  - `124.53 -> 114.53`

这轮后，当前 fresh broad mobile Top1 变成：

- `/daily-latin = 1610`

因此下一轮应回到 `/daily-latin`，继续做 fresh runtime preflight，再选 single-point ROI 更高的一刀。
