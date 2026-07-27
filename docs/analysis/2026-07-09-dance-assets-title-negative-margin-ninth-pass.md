# Dance Assets Title Negative Margin Ninth Pass

## 背景

- 当前继续严格沿用 `390px` mobile compaction 单点循环。
- 这一轮 fresh baseline 为：
  - `/ = 1513`
  - `/daily-latin = 1666`
  - `/dashboard = 1667`
  - `/dance-os = 1670`
- 当前 broad mobile Top1 仍然是：
  - `/dance-os = 1670`

在 `/dance-os` 内部，当前最厚 section 仍包括：

- `#correction-ledger-demo = 327.94`
- `#dance-assets = 293.56`
- `#body-map-practice-queue = 278.55`

## 问题定义

在不扩 scope、不改交互结构、不引入新组件行为的前提下，继续找一个只改单点 CSS 的收口机会，让：

1. `/dance-os` route 总高度下降
2. 目标 section 高度同步下降

## 这轮为什么选 `Dance OS 模块库`

`#dance-assets` 当前已经连续多轮用 `section head` 的 `margin-bottom` 做过安全收口，而且仍然存在稳定的线性下降空间。

相比继续动：

- `correction-ledger-demo` 的交互布局内部
- `body-map-practice-queue` 的内容面板

继续收 `#dance-assets .compact-sec-head` 更符合当前“局部、低风险、单点”的规则。

## 改动

文件：

- [workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css:3921)

改动：

```css
@media (min-width:390px) and (max-width:430px){
  .dance-os-page #dance-assets .compact-sec-head{margin-bottom:-18px}
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
  - `1670 -> 1664`

### 目标 section

- `#dance-assets`
  - `293.56 -> 287.56`

## 结果解释

这说明当前这刀满足本轮 compaction 通过条件：

- route 总高下降
- 目标 section 高度下降

并且 browser smoke 仍然通过，说明这次继续收紧 `Dance OS 模块库` section head 没有破坏：

- 桌面交互
- anchor 切换
- mobile shell
- mobile 无横向溢出

## 基线变化

这轮后 fresh `390px` broad mobile baseline 变成：

- `/ = 1513`
- `/daily-latin = 1666`
- `/dashboard = 1667`
- `/dance-os = 1664`

新的 broad mobile Top1 切到：

- `/dashboard = 1667`

## 结论

这一轮成立。

当前可以继续按同一规则回到新的 Top1 `/dashboard`，重新做下一轮单点 preflight。
