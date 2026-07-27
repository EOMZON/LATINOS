# Daily Library Min Height Pass

## 背景

- 当前继续严格沿用 `390px` mobile compaction 单点循环。
- 上一轮 fully verified broad mobile baseline 为：
  - `/ = 1513`
  - `/daily-latin = 1666`
  - `/dashboard = 1655`
  - `/dance-os = 1664`
- 当前 broad mobile Top1 是：
  - `/daily-latin = 1666`

重新拆 `/daily-latin` 后，当前较厚的 section 为：

- `#today-loop-demo = 240.5`
- `#live-return-bridge = 132.14`
- `#daily-sources = 121.06`
- `#legacy-daily-principles = 119.02`
- `#daily-library = 117.53`

## 问题定义

在不扩 scope、不改交互结构、不引入新组件行为的前提下，继续找一个只改单点 CSS 的收口机会，让：

1. `/daily-latin` route 总高度下降
2. 目标 section 高度同步下降

## preflight 结果

这一轮对几个候选做了 fresh runtime preflight。

成立的候选包括：

- `#today-loop-demo .compact-ledger-shell`
  - `padding: 1px`
  - `/daily-latin: 1666 -> 1662`
  - `#today-loop-demo: 240.5 -> 236.5`
- `#live-return-bridge .daily-return-panel`
  - `padding: 0`
  - `/daily-latin: 1666 -> 1664`
  - `#live-return-bridge: 132.14 -> 130.14`
- `#daily-library .compact-move-card`
  - `min-height: 24px`
  - `/daily-latin: 1666 -> 1656`
  - `#daily-library: 117.53 -> 107.53`

最终选择 `Daily Library`，因为它在当前 preflight 中收益最高，而且截图复核后仍保持了清晰的标签与卡片结构。

## 改动

文件：

- [workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css:3933)

改动：

```css
@media (min-width:390px) and (max-width:430px){
  .daily-latin-page #daily-library .compact-move-card{min-height:24px}
}
```

## 验证顺序

严格按既定顺序串行执行：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh `390px` remeasure

以上全部通过。

## 量化结果

### route 总高

- `/daily-latin 390`
  - `1666 -> 1656`

### 目标 section

- `#daily-library`
  - `117.53 -> 107.53`

## 结果解释

这说明当前这刀满足本轮 compaction 通过条件：

- route 总高下降
- 目标 section 高度下降

同时 browser smoke 保持通过，说明这次压缩 `Daily Library` card min-height 没有破坏：

- 桌面端 route 渲染
- mobile nav 切换
- Daily Latin tabbed library 显示
- mobile 无横向溢出

## 基线变化

这轮后 fresh `390px` broad mobile baseline 变成：

- `/ = 1513`
- `/daily-latin = 1656`
- `/dashboard = 1655`
- `/dance-os = 1664`

新的 broad mobile Top1 切回：

- `/dashboard = 1655`

## 结论

这一轮成立。

当前可以继续按同一规则回到新的 Top1 `/dashboard`，重新做下一轮单点 preflight。
