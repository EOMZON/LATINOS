# Dashboard Route Map Title Negative Margin Pass

## 背景

继续沿用当前已经锁定的 `390px` compact loop：

- 只做 single-point pass
- 只有当 route 总高和目标 section 高度都下降时才算成立
- 不重新讨论框架，不扩大到多点改动

根据上一轮 handoff-confirmed 的 latest fully verified baseline：

- `/ = 1513`
- `/daily-latin = 1642`
- `/dashboard = 1638`
- `/dance-os = 1641`

当时当前 broad mobile Top1 是：

- `/dashboard = 1638`

## preflight 结论

当前最优候选是继续收 `Route Map` 的 section head：

- selector:
  - `.dashboard-page #dashboard-route-map .compact-sec-head`
- candidate:
  - `margin-bottom: -5px`

对应 preflight 收益：

- `/dashboard: 1638 -> 1634`
- `#dashboard-route-map: 118.59 -> 114.59`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `390px` override：

```css
@media (min-width:390px) and (max-width:430px){
  .dashboard-page #dashboard-route-map .compact-sec-head{margin-bottom:-5px}
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
7. injected A/B 对照复核

结果：

- `typecheck`: pass
- `build`: pass
- `route smoke`: pass
- `browser smoke`: pass
- mobile overflow:
  - `home`: none
  - `daily-latin`: none

## 量化结果

### A/B 对照复核

在浏览器里对同一页面直接注入两条互斥规则做对照：

- `mbneg1`
  - `/dashboard = 1638`
  - `#dashboard-route-map = 118.59`
- `mbneg5`
  - `/dashboard = 1634`
  - `#dashboard-route-map = 114.59`

这证明当前成立收益来自这条规则本身，而不是别的偶然因素。

### fresh `390px` remeasure

- `/ = 1513`
- `/daily-latin = 1634`
- `/dashboard = 1634`
- `/dance-os = 1641`

`/dashboard` 内部关键 section：

- `#dashboard-witness-archive = 138.84`
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
  - `1638 -> 1634`
- `#dashboard-route-map`
  - `118.59 -> 114.59`

这轮后，当前 fresh broad mobile Top1 变成：

- `/dance-os = 1641`

因此下一轮应回到 `/dance-os`，继续做 fresh runtime preflight，再选最小且稳定的 single-point pass。
