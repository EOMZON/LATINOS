# Dashboard Next Actions Course Card Padding Pass

## 背景

- 当前继续严格沿用 `390px` mobile compaction 单点循环。
- 上一轮 fully verified broad mobile baseline 为：
  - `/ = 1513`
  - `/daily-latin = 1666`
  - `/dashboard = 1667`
  - `/dance-os = 1664`
- 当前 broad mobile Top1 是：
  - `/dashboard = 1667`

重新拆 `/dashboard` 后，当前最厚 section 为：

- `#dashboard-witness-archive = 138.84`
- `#dashboard-next-actions = 136.53`
- `#dashboard-structure-bar = 135.19`

## 问题定义

在不扩 scope、不改交互结构、不引入新组件行为的前提下，继续找一个只改单点 CSS 的收口机会，让：

1. `/dashboard` route 总高度下降
2. 目标 section 高度同步下降

## preflight 结果

这一轮对几个候选做了 fresh runtime preflight。

成立的候选包括：

- `#dashboard-structure-bar .heatmap-card`
  - `padding: 3px 3px 4px`
  - `/dashboard: 1667 -> 1663`
  - `#dashboard-structure-bar: 135.19 -> 131.19`
- `#dashboard-next-actions .course-card`
  - `padding: 0 4px`
  - `/dashboard: 1667 -> 1655`
  - `#dashboard-next-actions: 136.53 -> 124.53`

最终选择 `Next Actions`，因为它在当前 preflight 中收益最高，而且截图复核后仍保持了可读性和结构完整性。

## 改动

文件：

- [workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css:3929)

改动：

```css
@media (min-width:390px) and (max-width:430px){
  .dashboard-page #dashboard-next-actions .course-card{padding:0 4px}
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

- `/dashboard 390`
  - `1667 -> 1655`

### 目标 section

- `#dashboard-next-actions`
  - `136.53 -> 124.53`

## 结果解释

这说明当前这刀满足本轮 compaction 通过条件：

- route 总高下降
- 目标 section 高度下降

同时 browser smoke 保持通过，说明这次压缩 `Next Actions` card padding 没有破坏：

- 桌面端 route 渲染
- dashboard dense sections render
- mobile shell
- mobile 无横向溢出

## 基线变化

这轮后 fresh `390px` broad mobile baseline 变成：

- `/ = 1513`
- `/daily-latin = 1666`
- `/dashboard = 1655`
- `/dance-os = 1664`

新的 broad mobile Top1 切到：

- `/daily-latin = 1666`

## 结论

这一轮成立。

当前可以继续按同一规则回到新的 Top1 `/daily-latin`，重新做下一轮单点 preflight。
