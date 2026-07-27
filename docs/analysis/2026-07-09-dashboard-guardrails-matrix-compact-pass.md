# Dashboard Guardrails Matrix Compact Pass

## 背景

在 `Dashboard Mobile Header Visibility Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1988`
- `/dashboard = 1984`
- `/dance-os = 1930`

这意味着：

- `/dashboard` 已经成为新的 broad mobile Top1
- 但它只比 `/daily-latin` 低 `4px`

继续拆 `/dashboard` 后，当前更值得追的一块是：

- `#dashboard-guardrails = 187.31`

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只对 `390px` 下 `#dashboard-guardrails` 的 matrix shell 做 very small pass：

- 收 `compact-source-matrix` 的 `padding`
- 收 `compact-source-matrix` 的 `gap`
- 收 `.source-list` 的 `gap`
- 收 `.source-row` 的 `padding`
- 收 `.source-row` 的 `line-height`

这轮没有去碰：

- 其他 route
- 其他 dashboard section
- 组件逻辑
- 数据结构

## 验证结果

这轮按既定链路完成验证：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
- fresh `390px` remeasure

## 量化结果

fresh `390px` broad sweep：

- `/ = 1513`
- `/daily-latin = 1981`
- `/dashboard = 1969`
- `/dance-os = 1930`

对应量化收益：

- `/dashboard 390`
  - `1984 -> 1969`
- `#dashboard-guardrails`
  - `187.31 -> 172.69`

## 这轮成立的结论

- 当前 `dashboard` 的这部分高度确实主要来自 compact matrix shell，而不是内容本体
- 继续沿 route-level `390px` very small pass 追，仍然有稳定收益
- 这轮属于低风险、可验证、可继承的 compact pass

## 下一步

- 继续 fresh 测量 broad mobile Top1
- 如果 `daily-latin` 重新成为 Top1，则优先回到 `today-loop-demo` 或 `daily-sources`
- 如果 `dashboard` 仍有更高 ROI section，则继续只做 very small pass
