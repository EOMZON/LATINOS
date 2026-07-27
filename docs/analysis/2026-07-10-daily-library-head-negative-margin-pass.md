# Daily Library Head Negative Margin Pass

## 背景

继续沿用当前已经锁定的 `390px` compact loop：

- 只做 single-point pass
- 只有当 route 总高和目标 section 高度都下降时才算成立
- 不重新讨论框架，不扩大到多点改动

在上一轮 `dashboard next actions` pass 之后，fresh broad mobile route heights 是：

- `/ = 1513`
- `/daily-latin = 1610`
- `/dashboard = 1609`
- `/dance-os = 1618`

因此当前 broad mobile Top1 是：

- `/daily-latin = 1610`

## preflight

先对 `/daily-latin` 当前几个主要 section 做 fresh runtime 候选预演。

baseline：

- `/daily-latin = 1610`
- `#today-loop-demo = 224.5`
- `#live-return-bridge = 132.14`
- `#daily-library = 77.53`

候选结果：

- `loop-shell-mtneg16`
  - `/daily-latin: 1604`
  - `#today-loop-demo: 218.5`
- `loop-head-mbneg3`
  - `/daily-latin: 1607`
  - `#today-loop-demo: 221.5`
- `live-head-mbneg6`
  - `/daily-latin: 1605`
  - `#live-return-bridge: 127.14`
- `library-tabs-mbneg10`
  - `/daily-latin: 1608`
  - `#daily-library: 75.53`
- `library-head-mbneg1`
  - `/daily-latin: 1604`
  - `#daily-library: 71.53`

从第一轮 preflight 看，`today-loop-demo` 和 `live-return-bridge` 虽然仍有收益，但截图已开始更贴近上缘；`daily-library` 的 section header 则继续稳定赚钱，因此转向继续做 `.daily-latin-page #daily-library .compact-sec-head` 的梯度测试。

梯度测试结果：

- `margin-bottom: -1px`
  - `/daily-latin: 1604`
  - `#daily-library: 71.53`
- `margin-bottom: -2px`
  - `/daily-latin: 1603`
  - `#daily-library: 70.53`
- `margin-bottom: -3px`
  - `/daily-latin: 1602`
  - `#daily-library: 69.53`
- `margin-bottom: -4px`
  - `/daily-latin: 1601`
  - `#daily-library: 68.53`
- `margin-bottom: -5px`
  - `/daily-latin: 1600`
  - `#daily-library: 67.53`

结合 section screenshot 复核后，`-5px` 仍然视觉安全，而且收益高于 `-4px`、`-3px`、`-2px`、`-1px`，因此这一轮选定：

- `.daily-latin-page #daily-library .compact-sec-head`
- `margin-bottom: -5px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `390px` override：

```css
@media (min-width:390px) and (max-width:430px){
  .daily-latin-page #daily-library .compact-sec-head{margin-bottom:-5px}
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
  - `/daily-latin = 1610`
  - `#daily-library = 77.53`
- `mbneg5`
  - `/daily-latin = 1600`
  - `#daily-library = 67.53`

这证明这轮收益来自这条规则本身。

### fresh `390px` remeasure

- `/ = 1513`
- `/daily-latin = 1600`
- `/dashboard = 1609`
- `/dance-os = 1618`

`/daily-latin` 内部关键 section：

- `#today-loop-demo = 224.5`
- `#daily-library = 67.53`
- `#live-return-bridge = 132.14`

## 结论

这是一轮成立的 `/daily-latin` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

量化上：

- `/daily-latin`
  - `1610 -> 1600`
- `#daily-library`
  - `77.53 -> 67.53`

这轮后，当前 fresh broad mobile Top1 变成：

- `/dashboard = 1609`

因此下一轮应回到 `/dashboard`，继续做 fresh runtime preflight，再选 single-point ROI 更高的一刀。
