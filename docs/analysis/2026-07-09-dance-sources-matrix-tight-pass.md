# Dance Sources Matrix Tight Pass

## 背景

在 `Daily Loop Choice Shell Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1927`
- `/dashboard = 1928`
- `/dance-os = 1930`

这意味着新的 broad mobile Top1 切到：

- `/dance-os = 1930`

继续拆 `dance-os` 后，确认各 section 高度是：

- `#dance-summary = 174.44`
- `#dance-assets = 358.91`
- `#correction-ledger-demo = 394.08`
- `#body-map-practice-queue = 309.14`
- `#dance-sources = 175.89`

其中：

- `#dance-sources` 不是最大 section
- 但它是最容易用 very small shell pass 稳定拿收益的一块

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

只对 `390px` 下 `dance-sources` 做 very small compact pass：

- 收 section header `margin-bottom`
- 隐藏 `section head .more`
- 收 `compact-source-matrix` 的 `padding / gap`
- 收 `source-list gap`
- 收 `source-row padding`

没有改：

- 组件逻辑
- 数据文案
- 其他 `dance-os` section

## 验证动作

按既定链路 fresh 验证：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh `390px` remeasure

## 量化结果

fresh `390px` broad sweep：

- `/ = 1513`
- `/daily-latin = 1927`
- `/dashboard = 1928`
- `/dance-os = 1897`

对应量化收益：

- `/dance-os 390`
  - `1930 -> 1897`
- `#dance-sources`
  - `175.89 -> 142.89`

其余 `dance-os` sections 保持：

- `#dance-summary = 174.44`
- `#dance-assets = 358.91`
- `#correction-ledger-demo = 394.08`
- `#body-map-practice-queue = 309.14`

## 为什么这轮成立

这轮成立，因为：

1. `typecheck` 通过
2. `build` 通过
3. `route smoke` 通过
4. `browser smoke` 通过
5. fresh `390px` route 总高真实下降

## 结果意义

- `dance-sources` 当前高度更多来自 compact matrix shell，而不是内容本体
- 对 `dance-os` 来说，先拿低风险 section pass 比直接回去硬收 `correction-ledger` 更稳
- 这轮后 broad mobile Top1 再次切回：
  - `/dashboard = 1928`

## 下一步

下一轮优先建议：

1. 回到 `/dashboard`
2. 优先追 `#dashboard-route-map` 或 `#dashboard-guardrails`
3. 仍然先做 `390px` very small pass
