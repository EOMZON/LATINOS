# Dance Body Map Head Negative Margin Pass

## 背景

继续沿用当前已经锁定的 `390px` compact loop：

- 只做 single-point pass
- 只有当 route 总高和目标 section 高度都下降时才算成立
- 不重新讨论框架，不扩大到多点改动

在上一轮 `daily loop` pass 之后，fresh broad mobile route heights 是：

- `/ = 1513`
- `/daily-latin = 1624`
- `/dashboard = 1626`
- `/dance-os = 1631`

因此当前 broad mobile Top1 是：

- `/dance-os = 1631`

## preflight

先对 `/dance-os` 当前最厚的几个 section 做 fresh runtime 候选预演。

baseline：

- `/dance-os = 1631`
- `#body-map-practice-queue = 274.55`
- `#dance-assets = 263.56`
- `#dance-sources = 111.34`

候选结果：

- `bodymap-panel-mtneg8`
  - `/dance-os: 1631 -> 1629`
  - `#body-map-practice-queue: 274.55 -> 272.55`
- `bodymap-panel-mtneg10`
  - `/dance-os: 1631 -> 1627`
  - `#body-map-practice-queue: 274.55 -> 270.55`
- `bodymap-focus-pad1`
  - `/dance-os: 1631 -> 1627`
  - `#body-map-practice-queue: 274.55 -> 270.55`
- `bodymap-head-mbneg1`
  - `/dance-os: 1631 -> 1623`
  - `#body-map-practice-queue: 274.55 -> 266.55`
- `dance-assets-head-mbneg36`
  - `/dance-os: 1631 -> 1627`
  - `#dance-assets: 263.56 -> 259.56`
- `dance-assets-library-mbneg2`
  - `/dance-os: 1631 -> 1629`
  - `#dance-assets: 263.56 -> 261.56`
- `dance-sources-head-mbneg10`
  - `/dance-os: 1631 -> 1630`
  - `#dance-sources: 111.34 -> 110.34`

从第一轮 preflight 看，当前 ROI 最高的是继续收 `Body Map / Practice Queue` 的 section header：

- `.dance-os-page #body-map-practice-queue .compact-sec-head`
- `margin-bottom`

随后继续做梯度测试：

- `margin-bottom: 0`
  - `/dance-os: 1624`
  - `#body-map-practice-queue: 267.55`
- `margin-bottom: -1px`
  - `/dance-os: 1623`
  - `#body-map-practice-queue: 266.55`
- `margin-bottom: -2px`
  - `/dance-os: 1622`
  - `#body-map-practice-queue: 265.55`
- `margin-bottom: -3px`
  - `/dance-os: 1621`
  - `#body-map-practice-queue: 264.55`
- `margin-bottom: -4px`
  - `/dance-os: 1620`
  - `#body-map-practice-queue: 263.55`
- `margin-bottom: -5px`
  - `/dance-os: 1619`
  - `#body-map-practice-queue: 262.55`
- `margin-bottom: -6px`
  - `/dance-os: 1618`
  - `#body-map-practice-queue: 261.55`

结合 section screenshot 复核后，`-6px` 仍然视觉安全，而且收益高于 `-4px` 和 `-5px`，因此这一轮选定：

- `.dance-os-page #body-map-practice-queue .compact-sec-head`
- `margin-bottom: -6px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `390px` override：

```css
@media (min-width:390px) and (max-width:430px){
  .dance-os-page #body-map-practice-queue .compact-sec-head{margin-bottom:-6px}
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
  - `/dance-os = 1629`
  - `#body-map-practice-queue = 272.55`
- `mbneg6`
  - `/dance-os = 1618`
  - `#body-map-practice-queue = 261.55`

这证明这轮收益来自这条规则本身。

### fresh `390px` remeasure

- `/ = 1513`
- `/daily-latin = 1624`
- `/dashboard = 1626`
- `/dance-os = 1618`

`/dance-os` 内部关键 section：

- `#dance-assets = 263.56`
- `#body-map-practice-queue = 261.55`
- `#dance-sources = 111.34`

## 结论

这是一轮成立的 `/dance-os` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

量化上：

- `/dance-os`
  - `1631 -> 1618`
- `#body-map-practice-queue`
  - `274.55 -> 261.55`

这轮后，当前 fresh broad mobile Top1 变成：

- `/dashboard = 1626`

因此下一轮应回到 `/dashboard`，继续做 fresh runtime preflight，再选 single-point ROI 更高的一刀。
