# Dashboard Structure Bar Compact Pass

## 背景

上一轮 handoff 时，`/dashboard` 已经来到：

- `/dashboard 390 = 1942`

其中当前高 ROI section 是：

- `#dashboard-structure-bar = 182.19`

当时已经落了一组未验证的 `390px` 定向样式：

- `#dashboard-structure-bar .heatmap-card`
- `#dashboard-structure-bar .bars`
- `#dashboard-structure-bar .bar span`

因此这一轮第一优先级不是继续猜，而是先验证这组改动到底有没有真实收益。

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

只对 `390px` 下 `dashboard structure bar` 做 very small shell pass：

- 收 `heatmap-card` padding
- 收 `.bars` height / margin-top / gap
- 收 `.bar span` bottom / font-size

没有改：

- route 结构
- 组件逻辑
- 数据文案
- 其他 dashboard section

## 验证动作

按既定链路完成 fresh 验证：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh `390px` remeasure

## 量化结果

fresh `390px` broad sweep：

- `/ = 1513`
- `/daily-latin = 1936`
- `/dashboard = 1928`
- `/dance-os = 1930`

对应量化收益：

- `/dashboard 390`
  - `1942 -> 1928`
- `#dashboard-structure-bar`
  - `182.19 -> 168.19`

其余 dashboard sections 保持：

- `#dashboard-route-map = 174.75`
- `#dashboard-guardrails = 172.69`
- `#dashboard-next-actions = 167.84`
- `#dashboard-proof-risk-gate = 165.59`
- `#dashboard-witness-archive = 160.84`

## 为什么这轮成立

这轮成立，因为：

1. `typecheck` 通过
2. `build` 通过
3. `route smoke` 通过
4. `browser smoke` 通过
5. fresh `390px` route 总高真实下降

## 结果意义

- 这说明 `dashboard structure bar` 当前剩余高度主要仍来自 bar shell，而不是 route-level 其他结构
- 这类 `390px` 定向 very small pass 仍然有稳定收益
- 这轮后 broad mobile Top1 暂时切回：
  - `/daily-latin = 1936`

## 下一步

下一轮更值得做的是：

1. 回到 `/daily-latin`
2. 继续追 `#today-loop-demo`
3. 优先只做 small pass 或 compact data/component pass
