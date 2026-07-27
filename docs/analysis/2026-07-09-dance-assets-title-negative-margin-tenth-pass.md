# Dance Assets Title Negative Margin Tenth Pass

## 背景

- 当前继续严格沿用 `390px` mobile compaction 单点循环。
- 上一轮 fully verified broad mobile baseline 为：
  - `/ = 1513`
  - `/daily-latin = 1656`
  - `/dashboard = 1644`
  - `/dance-os = 1664`
- 当前 broad mobile Top1 是：
  - `/dance-os = 1664`

重新拆 `/dance-os` 后，当前较厚的 section 为：

- `#correction-ledger-demo = 327.94`
- `#dance-assets = 287.56`
- `#body-map-practice-queue = 278.55`
- `#dance-summary = 135.75`

## 问题定义

在不扩 scope、不改交互结构、不引入新组件行为的前提下，继续找一个只改单点 CSS 的收口机会，让：

1. `/dance-os` route 总高度下降
2. 目标 section 高度同步下降

## preflight 结果

这一轮对几个候选做了 fresh runtime preflight。

成立的候选包括：

- `#body-map-practice-queue .compact-bodymap-panel`
  - `margin-top: -4px`
  - `/dance-os: 1664 -> 1662`
  - `#body-map-practice-queue: 278.55 -> 276.55`
- `#dance-sources .compact-sec-head`
  - `margin-bottom: -6px`
  - `/dance-os: 1664 -> 1662`
  - `#dance-sources: 116.34 -> 114.34`
- `#dance-assets .compact-sec-head`
  - `margin-bottom: -24px`
  - `/dance-os: 1664 -> 1658`
  - `#dance-assets: 287.56 -> 281.56`

最终选择 `Dance Assets`，因为它在当前 preflight 中收益最高，而且截图复核后仍保持了模块库标题与卡片墙的可读性。

## 改动

文件：

- [workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css:3941)

改动：

```css
@media (min-width:390px) and (max-width:430px){
  .dance-os-page #dance-assets .compact-sec-head{margin-bottom:-24px}
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

- `/dance-os 390`
  - `1664 -> 1658`

### 目标 section

- `#dance-assets`
  - `287.56 -> 281.56`

## 结果解释

这说明当前这刀满足本轮 compaction 通过条件：

- route 总高下降
- 目标 section 高度下降

同时 browser smoke 保持通过，说明这次压缩 `Dance Assets` section head 没有破坏：

- 桌面端 route 渲染
- dance sources anchor works
- mobile shell
- mobile 无横向溢出

## 基线变化

这轮后 fresh `390px` broad mobile baseline 变成：

- `/ = 1513`
- `/daily-latin = 1656`
- `/dashboard = 1644`
- `/dance-os = 1658`

当前 broad mobile Top1 仍然是：

- `/dance-os = 1658`

## 结论

这一轮成立。

当前可以继续按同一规则留在当前 Top1 `/dance-os`，重新做下一轮单点 preflight。
