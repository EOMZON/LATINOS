# Daily Loop Shell Negative Margin Pass

## 背景

继续沿用当前已经锁定的 `390px` compact loop：

- 只做 single-point pass
- 只有当 route 总高和目标 section 高度都下降时才算成立
- 不重新讨论框架，不扩大到多点改动

在上一轮 `dashboard witness archive` pass 之后，fresh broad mobile route heights 是：

- `/ = 1513`
- `/daily-latin = 1634`
- `/dashboard = 1626`
- `/dance-os = 1631`

因此当前 broad mobile Top1 是：

- `/daily-latin = 1634`

## preflight

先对 `/daily-latin` 当前最厚的几个 section 做 fresh runtime 候选预演。

baseline：

- `/daily-latin = 1634`
- `#today-loop-demo = 234.5`
- `#live-return-bridge = 132.14`
- `#daily-library = 91.53`

候选结果：

- `loop-shell-mtneg4`
  - `/daily-latin: 1634 -> 1630`
  - `#today-loop-demo: 234.5 -> 230.5`
- `loop-shell-mtneg6`
  - `/daily-latin: 1634 -> 1628`
  - `#today-loop-demo: 234.5 -> 228.5`
- `loop-head-mb0`
  - `/daily-latin: 1634 -> 1631`
  - `#today-loop-demo: 234.5 -> 231.5`
- `live-panel-pad0`
  - `/daily-latin: 1634 -> 1632`
  - `#live-return-bridge: 132.14 -> 130.14`
- `library-tabs-mb4`
  - `/daily-latin: 1634 -> 1632`
  - `#daily-library: 91.53 -> 89.53`

从第一轮 preflight 看，当前 ROI 最高的是继续收 `Today Loop Demo` 的外层壳：

- `.daily-latin-page #today-loop-demo .compact-ledger-shell`
- `margin-top`

随后继续做梯度测试：

- `margin-top: -6px`
  - `/daily-latin: 1628`
  - `#today-loop-demo: 228.5`
- `margin-top: -8px`
  - `/daily-latin: 1626`
  - `#today-loop-demo: 226.5`
- `margin-top: -10px`
  - `/daily-latin: 1624`
  - `#today-loop-demo: 224.5`
- `margin-top: -12px`
  - `/daily-latin: 1622`
  - `#today-loop-demo: 222.5`

结合 section screenshot 复核后：

- `-10px` 仍然视觉安全
- `-12px` 已开始把标题区域挤得过紧

因此这一轮选定：

- `.daily-latin-page #today-loop-demo .compact-ledger-shell`
- `margin-top: -10px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `390px` override：

```css
@media (min-width:390px) and (max-width:430px){
  .daily-latin-page #today-loop-demo .compact-ledger-shell{margin-top:-10px}
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

- `mt0`
  - `/daily-latin = 1634`
  - `#today-loop-demo = 234.5`
- `mtneg10`
  - `/daily-latin = 1624`
  - `#today-loop-demo = 224.5`

这证明这轮收益来自这条规则本身。

### fresh `390px` remeasure

- `/ = 1513`
- `/daily-latin = 1624`
- `/dashboard = 1626`
- `/dance-os = 1631`

`/daily-latin` 内部关键 section：

- `#today-loop-demo = 224.5`
- `#daily-library = 91.53`
- `#live-return-bridge = 132.14`

## 结论

这是一轮成立的 `/daily-latin` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

量化上：

- `/daily-latin`
  - `1634 -> 1624`
- `#today-loop-demo`
  - `234.5 -> 224.5`

这轮后，当前 fresh broad mobile Top1 变成：

- `/dance-os = 1631`

因此下一轮应回到 `/dance-os`，继续做 fresh runtime preflight，再选 single-point ROI 更高的一刀。
