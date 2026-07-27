# Dance Assets Library Margin Bottom Zero Pass

## 背景

继续沿用当前已经锁定的 `390px` compact loop：

- 只做 single-point pass
- 只有当 route 总高和目标 section 高度都下降时才算成立
- 不重新讨论框架，不扩大到多点改动

上一轮 latest fully verified baseline 之后，fresh broad mobile route heights 是：

- `/ = 1513`
- `/daily-latin = 1634`
- `/dashboard = 1634`
- `/dance-os = 1641`

因此当前 broad mobile Top1 是：

- `/dance-os = 1641`

## preflight

先对 `/dance-os` 当前最厚 section 做 fresh runtime 候选预演。

baseline：

- `/dance-os = 1641`
- `#dance-assets = 273.56`
- `#body-map-practice-queue = 274.55`
- `#dance-sources = 111.34`

候选结果：

- `bodymap-panel-mtneg8`
  - `/dance-os: 1641 -> 1639`
  - `#body-map-practice-queue: 274.55 -> 272.55`
- `dance-assets-head-mbneg36`
  - `/dance-os: 1641 -> 1637`
  - `#dance-assets: 273.56 -> 269.56`
- `dance-sources-head-mbneg10`
  - `/dance-os: 1641 -> 1640`
  - `#dance-sources: 111.34 -> 110.34`
- `dance-assets-library-mb4`
  - `/dance-os: 1641 -> 1635`
  - `#dance-assets: 273.56 -> 267.56`

从收益和边界清晰度来看，最优候选不是继续压 section header，而是：

- `.dance-os-page #dance-assets .compact-library-panel`
- `margin-bottom`

随后继续对同一条规则做梯度测试：

- `margin-bottom: 6px`
  - `/dance-os: 1637`
  - `#dance-assets: 269.56`
- `margin-bottom: 4px`
  - `/dance-os: 1635`
  - `#dance-assets: 267.56`
- `margin-bottom: 2px`
  - `/dance-os: 1633`
  - `#dance-assets: 265.56`
- `margin-bottom: 0`
  - `/dance-os: 1631`
  - `#dance-assets: 263.56`
- `margin-bottom: -2px`
  - `/dance-os: 1629`
  - `#dance-assets: 261.56`

结合 section screenshot 复核后，`0` 仍然视觉安全，而且比 `4px` 和 `2px` 都更有收益，因此选择：

- `margin-bottom: 0`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `390px` override：

```css
@media (min-width:390px) and (max-width:430px){
  .dance-os-page #dance-assets .compact-library-panel{margin-bottom:0}
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

- `mb10`
  - `/dance-os = 1641`
  - `#dance-assets = 273.56`
- `mb0`
  - `/dance-os = 1631`
  - `#dance-assets = 263.56`

这证明这轮收益来自这条规则本身。

### fresh `390px` remeasure

- `/ = 1513`
- `/daily-latin = 1634`
- `/dashboard = 1634`
- `/dance-os = 1631`

`/dance-os` 内部关键 section：

- `#dance-assets = 263.56`
- `#body-map-practice-queue = 274.55`
- `#dance-sources = 111.34`

## 结论

这是一轮成立的 `/dance-os` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

量化上：

- `/dance-os`
  - `1641 -> 1631`
- `#dance-assets`
  - `273.56 -> 263.56`

这轮后，当前 fresh broad mobile Top1 变成：

- `/daily-latin = 1634`
- `/dashboard = 1634`

也就是说当前 broad mobile Top1 进入并列状态。

下一轮应在 `/daily-latin` 和 `/dashboard` 之间做 fresh runtime preflight，再选 single-point ROI 更高的一刀。
