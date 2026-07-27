# Dashboard Structure Bar Second Compact Pass

## 背景

在 `Daily Loop Entry Choice Card Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1512.92`
- `/daily-latin = 1902.78`
- `/dashboard = 1910.17`
- `/dance-os = 1897.22`

这意味着新的 broad mobile Top1 切到：

- `/dashboard = 1910.17`

继续拆 `/dashboard` 后，当前更高 ROI 的几块是：

- `#dashboard-guardrails = 172.69`
- `#dashboard-structure-bar = 168.19`
- `#dashboard-next-actions = 167.84`

进一步拆 `#dashboard-structure-bar` 内部后确认：

- `heatmap-card = 144`
- `bars = 102`
- label 高度均为 `12.14`

这说明当前更值得继续收的是：

- `heatmap-card` padding
- `.bars` height / margin-top / gap

而不是再动：

- route 结构
- 组件逻辑
- 数据文案

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

只对最终生效的 `390px` `dashboard structure bar` 样式做 very small shell pass：

- `.heatmap-card`
  - `padding: 14px 14px 16px -> 12px 12px 14px`
- `.bars`
  - `height: 102px -> 96px`
  - `margin-top: 10px -> 8px`
  - `gap: 4px -> 3px`
- `.bar span`
  - `bottom: -14px -> -13px`
  - `font-size: 7.6px -> 7.2px`

没有改：

- 其他 dashboard section
- 组件逻辑
- 数据结构
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
- `/daily-latin = 1902.78`
- `/dashboard = 1898.17`
- `/dance-os = 1897.22`

对应量化收益：

- `/dashboard 390`
  - `1910.17 -> 1898.17`
- `#dashboard-structure-bar`
  - `168.19 -> 156.19`

其余 dashboard sections 保持：

- `#dashboard-route-map = 156.59`
- `#dashboard-guardrails = 172.69`
- `#dashboard-next-actions = 167.84`
- `#dashboard-proof-risk-gate = 165.59`
- `#dashboard-witness-archive = 160.84`
- `#dashboard-metrics = 159.03`

## 为什么这轮成立

这轮成立，因为：

1. `typecheck` 通过
2. `build` 通过
3. `route smoke` 通过
4. `browser smoke` 通过
5. fresh `390px` route 总高真实下降
6. `#dashboard-structure-bar` section 高度真实下降

## 结果意义

- `dashboard structure bar` 当前剩余高度依然主要来自壳体，而不是内容本体
- 这类 route-specific `390px` shell pass 仍然能稳定拿到收益
- 这轮后 broad mobile Top1 已经切回：
  - `/daily-latin = 1902.78`

## 下一步

下一轮优先建议：

1. 回到 `/daily-latin`
2. 优先继续追：
   - `#today-loop-demo = 292.55`
   - `#daily-library = 178.13`
   - `#live-return-bridge = 169.14`
3. 仍然优先用 `390px` very small pass 或 compact data/component pass
