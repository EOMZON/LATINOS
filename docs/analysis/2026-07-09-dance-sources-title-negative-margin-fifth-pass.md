# Dance Sources Title Negative Margin Fifth Pass

## 背景

- 当前继续严格沿用 `390px` mobile compaction 单点循环。
- 上一轮 fully verified broad mobile baseline 为：
  - `/ = 1513`
  - `/daily-latin = 1650`
  - `/dashboard = 1644`
  - `/dance-os = 1654`
- 当前 broad mobile Top1 是：
  - `/dance-os = 1654`

重新拆 `/dance-os` 后，当前较厚的 section 为：

- `#correction-ledger-demo = 327.94`
- `#dance-assets = 281.56`
- `#body-map-practice-queue = 274.55`
- `#dance-summary = 135.75`
- `#dance-sources = 116.34`

## 问题定义

在不扩 scope、不改交互结构、不引入新组件行为的前提下，继续找一个只改单点 CSS 的收口机会，让：

1. `/dance-os` route 总高度下降
2. 目标 section 高度同步下降

## preflight 结果

这一轮对几个候选做了 fresh runtime preflight。

成立的候选包括：

- `#dance-assets .compact-sec-head`
  - `margin-bottom: -28px`
  - `/dance-os: 1654 -> 1650`
  - `#dance-assets: 281.56 -> 277.56`
- `#body-map-practice-queue .compact-bodymap-panel`
  - `margin-top: -7px`
  - `/dance-os: 1654 -> 1653`
  - `#body-map-practice-queue: 274.55 -> 273.55`
- `#dance-sources .compact-sec-head`
  - `margin-bottom: -9px`
  - `/dance-os: 1654 -> 1649`
  - `#dance-sources: 116.34 -> 111.34`

最终选择 `Dance Sources`，因为它在当前 preflight 中 route 收益最高，而且截图复核后仍保持了两栏来源矩阵的清晰边界。

## 改动

文件：

- [workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css:3953)

改动：

```css
@media (min-width:390px) and (max-width:430px){
  .dance-os-page #dance-sources .compact-sec-head{margin-bottom:-9px}
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
  - `1654 -> 1649`

### 目标 section

- `#dance-sources`
  - `116.34 -> 111.34`

## 结果解释

这说明当前这刀满足本轮 compaction 通过条件：

- route 总高下降
- 目标 section 高度下降

同时 browser smoke 保持通过，说明这次压缩 `Dance Sources` 标题底部间距没有破坏：

- 桌面端 route 渲染
- dance sources anchor works
- mobile shell
- mobile 无横向溢出

## 基线变化

这轮后 fresh `390px` broad mobile baseline 变成：

- `/ = 1513`
- `/daily-latin = 1650`
- `/dashboard = 1644`
- `/dance-os = 1649`

新的 broad mobile Top1 切到：

- `/daily-latin = 1650`

## 结论

这一轮成立。

当前可以继续按同一规则回到新的 Top1 `/daily-latin`，重新做下一轮单点 preflight。
