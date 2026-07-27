# Dashboard Guardrails Second Compact Pass

## 背景

在 `Daily Loop Shell Stack Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1512.92`
- `/daily-latin = 1892.48`
- `/dashboard = 1898.17`
- `/dance-os = 1897.22`

这意味着新的 broad mobile Top1 切回：

- `/dashboard = 1898.17`

继续 fresh 拆 `/dashboard` 后，当前更高 ROI 的几块是：

- `#dashboard-guardrails = 172.69`
- `#dashboard-next-actions = 167.84`
- `#dashboard-proof-risk-gate = 165.59`

进一步拆 `#dashboard-guardrails` 后确认：

- `matrix = 148.5`
- `panel title = 16.94`
- `8` 条 `source-row` 都是 `19.16`

这说明当前更值得继续收的是：

- `source-panel-title`
- `source-row` 的壳体高度

而不是：

- 组件逻辑
- route 结构
- 文案体系

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

只对最终生效的 `390px` `dashboard guardrails` 样式做 very small shell pass：

- `.compact-source-matrix-panel .source-panel-title`
  - `font-size: 10.6px -> 10px`
  - `margin-bottom: 5px -> 4px`
- `.compact-source-matrix-panel .source-row`
  - `padding: 4px 5px -> 3px 4px`
  - `font-size: 8px -> 7.6px`
  - `line-height: 1.02 -> 1`
- `.source-row strong`
  - `margin-bottom: 0`

没有改：

- 数据结构
- `SourcePanel` 组件
- 其他 dashboard section
- 任何 Daily / Dance OS 内容

## 验证动作

按既定链路 fresh 验证：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh `390px` broad route sweep
7. fresh `/dashboard` section remeasure

## 量化结果

fresh `390px` broad sweep：

- `/ = 1512.92`
- `/daily-latin = 1892.48`
- `/dashboard = 1880.05`
- `/dance-os = 1897.22`

对应量化收益：

- `/dashboard 390`
  - `1898.17 -> 1880.05`
- `#dashboard-guardrails`
  - `172.69 -> 154.56`

其余 dashboard sections 保持：

- `#dashboard-next-actions = 167.84`
- `#dashboard-proof-risk-gate = 165.59`
- `#dashboard-structure-bar = 156.19`
- `#dashboard-route-map = 156.59`
- `#dashboard-witness-archive = 160.84`

## 为什么这轮成立

这轮成立，因为：

1. `typecheck` 通过
2. `build` 通过
3. `route smoke` 通过
4. `browser smoke` 通过
5. fresh `390px` route 总高真实下降
6. `#dashboard-guardrails` section 高度真实下降

## 结果意义

- `dashboard guardrails` 当前剩余高度仍然主要来自 row shell，而不是内容本体
- 这类 route-specific compact shell pass 仍然有稳定收益
- 这轮后 broad mobile Top1 已经切到：
  - `/dance-os = 1897.22`

## 下一步

下一轮优先建议：

1. 切到 `/dance-os`
2. 优先继续追：
   - `#correction-ledger-demo = 394.08`
   - `#dance-assets = 358.91`
   - `#body-map-practice-queue = 309.14`
3. 仍然优先用 `390px` very small pass 或 compact component/data pass
