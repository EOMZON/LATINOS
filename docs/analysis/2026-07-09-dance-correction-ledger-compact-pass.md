# Dance Correction Ledger Compact Pass

## 背景

上一轮 handoff 时，`/dance-os` 的 `CorrectionLedgerDemo` 已经做过一轮 compact pass，但还没有 fresh rebuild / restart / remeasure / smoke 验证。

因此这一轮的第一优先级不是继续猜新的改法，而是先验证这轮未确认改动到底有没有真实收益。

## 目标

验证 `CorrectionLedgerDemo` 这轮 compact pass 是否真的在 `390px` 下减少了 `Dance OS` route 的总高度，并确认是否值得把 broad mobile Top1 继续从 `/dance-os` 转移出去。

## 这轮验证前的已知基线

- `/dance-os 390 = 2220`
- `#correction-ledger-demo = 512.86`
- 当时 route-level Top1：
  - `/dance-os = 2220`

## 这轮实际验证动作

在 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 执行：

1. `pnpm build`
2. 清理旧 `3200` 进程
3. fresh 启动：
   - `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. 运行：
   - `pnpm verify`
   - `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
   - `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
5. 用 `Playwright` 在 fresh `390px` 下重新测 route 总高度和 `Dance OS` 分 section 高度

## 这轮确认的真实结果

fresh `390px` sweep：

- `/ = 1513`
- `/daily-latin = 2165`
- `/dashboard = 2219`
- `/dance-os = 2101`

`Dance OS` 分 section：

- `#dance-summary = 174.44`
- `#dance-assets = 358.91`
- `#correction-ledger-demo = 394.08`
- `#body-map-practice-queue = 480.14`
- `#dance-sources = 175.89`

`Correction Ledger Demo` 关键内部块：

- `.compact-ledger-shell = 367.89`
- `.compact-sec-head = 19.19`
- `.ledger-grid = 351.89`
- `.ledger-output = 309.75`
- `.ledger-result-grid = 128.38`
- `.ledger-next-step = 36.56`
- `.ledger-note-block = 45.53`
- `.ledger-recent` 在 compact + empty 状态下不再渲染

## 这轮成立的结论

这轮未验证 compact pass 已经被 fresh 数据证明有效：

- `/dance-os 390`
  - `2220 -> 2101`
- `#correction-ledger-demo`
  - `512.86 -> 394.08`

也就是说：

- 这次不是“视觉上感觉更紧”
- 而是真实把 `Dance OS` route 拉低了 `119px`
- 同时把 `Correction Ledger Demo` 本段拉低了约 `118.78px`

## 为什么这轮有效

这轮收益主要来自组件层的状态感知收口，而不是继续硬堆 CSS：

- compact 下隐藏 step 解释文案
- compact 下隐藏 checklist detail spans
- compact 下隐藏 output copy
- compact 下隐藏 note label
- compact 下当 recent 为空时不再渲染整块
- `390px` 下隐藏 `Correction Ledger Demo` section head 的 `.more`

这符合当前主线：

- 先做状态层 / 组件层收口
- 再做 very small route-level shell pass

## 对 broad mobile Top1 的影响

这轮后新的 fresh `390px` broad mobile Top1 变成：

- `/dashboard = 2219`

同时：

- `/daily-latin = 2165`
- `/dance-os = 2101`

因此下一轮最值得继续看的 route 已切到：

- `/dashboard`

## 验证结果

这轮继续通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

## 下一步

下一轮不要回到 `/dance-os` 继续乱收。

更高 ROI 的顺序已经切换成：

1. `/dashboard`
2. 如果 `/dashboard` 继续下降，再对比 `/daily-latin`
3. 只有当前三条主 route 足够接近后，才切回整站“参考稿近似同款完成度”的 completion 视角
