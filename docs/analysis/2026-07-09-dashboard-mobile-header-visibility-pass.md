# Dashboard Mobile Header Visibility Pass

## 背景

在 `Daily Loop Step3 Tight Pass` 成立后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1993`
- `/dashboard = 1988`
- `/dance-os = 1930`

这意味着：

- `/dashboard` 已经非常接近 `Top1`
- 只需要 very small route-level pass 就可能把排序切走

## 为什么这轮选 `dashboard`

fresh 拆 `/dashboard` section 后，当前较厚 section 仍然包括：

- `决策护栏 = 187.31`
- `下一批交付 = 183.62`
- `Proof / Risk / Gate = 176.78`
- `Route Map = 174.75`

同时复核 `390px` 下 section header 的 `.more` 行时发现：

- `guardrails / proof-risk-gate / route-map / archive` 已经隐藏
- 但仍有几条 `.more` 在移动端可见：
  - `下一批交付`
  - `验证状态`
  - `当前运维判断`

所以这轮最小 ROI 不是再碰 card 内容，而是继续做 very small route-level header pass。

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dashboard/page.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

这轮做了两件事：

### 1. 给 dashboard section 补稳定 `id`

新增：

- `#dashboard-metrics`
- `#dashboard-structure-bar`
- `#dashboard-next-actions`
- `#dashboard-verification`
- `#dashboard-guardrails`
- `#dashboard-proof-risk-gate`
- `#dashboard-route-map`
- `#dashboard-witness-archive`
- `#dashboard-ops`

作用：

- 让后续 AI 能继续做更稳定的 route-level compact pass
- 不再依赖含糊的 `section:has(...)` 选择器猜目标

### 2. 只对 `390px` 下仍可见的 `.more` 做隐藏

新增：

- `#dashboard-next-actions .compact-sec-head .more { display:none }`
- `#dashboard-verification .compact-sec-head .more { display:none }`
- `#dashboard-ops .compact-sec-head .more { display:none }`

## 验证动作

继续补齐：

- `pnpm build`
- `pnpm typecheck`
- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
- fresh `390px` route sweep

## 量化结果

- `/dashboard 390`
  - `1988 -> 1984`
- `下一批交付`
  - `185.03 -> 183.62`
- `验证状态`
  - `124.97 -> 123.56`
- `当前运维判断`
  - `115.84 -> 114.44`

对应 fresh `390px` broad mobile heights：

- `/ = 1513`
- `/daily-latin = 1988`
- `/dashboard = 1984`
- `/dance-os = 1930`

## 为什么这轮成立

这轮成立，因为：

1. `verify` 通过
2. `route smoke` 通过
3. `browser smoke` 通过
4. `/dashboard` route 总高真实下降

## 特别说明

这轮中间有一次异常测量读到了：

- `/dashboard = 844`

但后续 fresh 复核确认这只是异常测量，不是页面真实高度变化，因此没有把它当作成立结果。

## 下一轮建议

这轮后：

- `Top1` 又切回 `/daily-latin = 1988`
- `/dashboard = 1984`

说明：

- 两条 route 已经进入同一档极小差距竞争
- 下一轮应该优先继续追：
  - `/daily-latin`
  - 但只允许 very small compact pass
