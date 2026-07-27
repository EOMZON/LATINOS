# Daily Library Tabs Negative Margin Pass

## 背景

继续沿用当前已经锁定的 `390px` compact loop：

- 只做 single-point pass
- 只有当 route 总高和目标 section 高度都下降时才算成立
- 不重新讨论框架，不扩大到多点改动

在上一轮 `dashboard structure bar` pass 之后，fresh broad mobile route heights 是：

- `/ = 1513`
- `/daily-latin = 1624`
- `/dashboard = 1619`
- `/dance-os = 1618`

因此当前 broad mobile Top1 是：

- `/daily-latin = 1624`

## preflight

先对 `/daily-latin` 当前几个主要 section 做 fresh runtime 候选预演。

baseline：

- `/daily-latin = 1624`
- `#today-loop-demo = 224.5`
- `#live-return-bridge = 132.14`
- `#daily-library = 91.53`

候选结果：

- `loop-shell-mtneg12`
  - `/daily-latin: 1624 -> 1622`
  - `#today-loop-demo: 224.5 -> 222.5`
- `loop-shell-mtneg14`
  - `/daily-latin: 1624 -> 1620`
  - `#today-loop-demo: 224.5 -> 220.5`
- `loop-head-mbneg1`
  - `/daily-latin: 1624 -> 1621`
  - `#today-loop-demo: 224.5 -> 221.5`
- `live-head-mbneg4`
  - `/daily-latin: 1624 -> 1621`
  - `#live-return-bridge: 132.14 -> 129.14`
- `library-tabs-mb2`
  - `/daily-latin: 1620`
  - `#daily-library: 87.53`
- `library-head-mb1`
  - `/daily-latin: 1620`
  - `#daily-library: 87.53`

从第一轮 preflight 看，`today-loop-demo` 的 shell 再上提虽然有收益，但截图已经开始顶住上缘；`daily-library` 的 tabs 间距收口则既安全又有持续收益，因此转向继续做 `daily-library` 的梯度测试。

对 `.daily-latin-page #daily-library .compact-tabs` 的 `margin-bottom` 做梯度测试：

- `margin-bottom: 2px`
  - `/daily-latin: 1620`
  - `#daily-library: 87.53`
- `margin-bottom: 0`
  - `/daily-latin: 1618`
  - `#daily-library: 85.53`
- `margin-bottom: -2px`
  - `/daily-latin: 1616`
  - `#daily-library: 83.53`
- `margin-bottom: -4px`
  - `/daily-latin: 1614`
  - `#daily-library: 81.53`
- `margin-bottom: -6px`
  - `/daily-latin: 1612`
  - `#daily-library: 79.53`
- `margin-bottom: -8px`
  - `/daily-latin: 1610`
  - `#daily-library: 77.53`

结合 section screenshot 复核后，`-8px` 仍然视觉安全，而且收益高于 `-6px`、`-4px`、`-2px`，因此这一轮选定：

- `.daily-latin-page #daily-library .compact-tabs`
- `margin-bottom: -8px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `390px` override：

```css
@media (min-width:390px) and (max-width:430px){
  .daily-latin-page #daily-library .compact-tabs{margin-bottom:-8px}
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

- `mb6`
  - `/daily-latin = 1624`
  - `#daily-library = 91.53`
- `mbneg8`
  - `/daily-latin = 1610`
  - `#daily-library = 77.53`

这证明这轮收益来自这条规则本身。

### fresh `390px` remeasure

- `/ = 1513`
- `/daily-latin = 1610`
- `/dashboard = 1619`
- `/dance-os = 1618`

`/daily-latin` 内部关键 section：

- `#today-loop-demo = 224.5`
- `#daily-library = 77.53`
- `#live-return-bridge = 132.14`

## 结论

这是一轮成立的 `/daily-latin` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

量化上：

- `/daily-latin`
  - `1624 -> 1610`
- `#daily-library`
  - `91.53 -> 77.53`

这轮后，当前 fresh broad mobile Top1 变成：

- `/dashboard = 1619`

因此下一轮应回到 `/dashboard`，继续做 fresh runtime preflight，再选 single-point ROI 更高的一刀。
