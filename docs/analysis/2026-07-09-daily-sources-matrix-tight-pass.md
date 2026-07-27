# Daily Sources Matrix Tight Pass

## 背景

在 `Dashboard Guardrails Matrix Compact Pass` 成立之后，fresh `390px` broad mobile heights 来到：

- `/ = 1513`
- `/daily-latin = 1981`
- `/dashboard = 1969`
- `/dance-os = 1930`

这意味着新的 broad mobile Top1 切回：

- `/daily-latin = 1981`

继续拆 `/daily-latin` 后，当时更厚的 section 是：

- `#today-loop-demo = 318.55`
- `#live-return-bridge = 197.48`
- `#daily-library = 185.58`
- `#daily-sources = 174.06`

这一轮没有回去重写 `Today Loop Demo`，也没有碰 `daily-library` 的 grid，而是继续追：

- `#daily-sources`

因为这块已经进入 compact matrix shell 级别的 very small pass 区间，适合继续只收 `390px` 的局部壳体。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在最终生效的 `@media (min-width:390px) and (max-width:430px)` 覆盖层里，对 `#daily-sources` 做 very small pass：

- `#daily-sources .compact-sec-head`
  - `margin-bottom: 5px -> 3px`
- `#daily-sources .compact-source-matrix-daily-side`
  - `padding: 5px -> 3px`
  - `gap: 5px -> 3px`
- `#daily-sources .compact-source-matrix-daily-side-panel .source-list`
  - `gap: 3px` 保持最紧凑节奏
- `#daily-sources .compact-source-matrix-daily-side-panel .source-row`
  - `padding: 3px 4px -> 2px 3px`

这轮没有去碰：

- 其他 route
- `daily-sources` 的数据结构
- 其他 section
- 组件逻辑

## 验证结果

这轮补齐了完整验证链：

- `pnpm typecheck`
- `pnpm build`
- fresh `next start --hostname 127.0.0.1 --port 3200`
- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
- fresh `390px` remeasure

## 量化结果

fresh `390px` broad sweep：

- `/ = 1513`
- `/daily-latin = 1965`
- `/dashboard = 1969`
- `/dance-os = 1930`

对应量化收益：

- `/daily-latin 390`
  - `1981 -> 1965`
- `#daily-sources`
  - `174.06 -> 168.06`

同时其余关键 section 仍保持：

- `#today-loop-demo = 318.55`
- `#live-return-bridge = 197.48`
- `#daily-library = 185.58`

## 这轮成立的结论

- `daily-sources` 这块仍然有少量但真实的 compact shell 收口空间
- 这轮收益来自 matrix shell，而不是内容本体
- `/daily-latin` 被继续拉低后，broad mobile Top1 只比 `/dashboard` 低 `4px`
- 当前 route-level `390px` 追法依然有效，但已经进入 very small pass 阶段

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 变成：

- `/dashboard = 1969`
- `/daily-latin = 1965`
- `/dance-os = 1930`

## 下一步

- 继续按 fresh 数据追新的 broad mobile Top1
- 优先回看 `/dashboard`
- 如果 `/dashboard` 能再被 very small pass 拉低，则 broad mobile Top1 很可能再次切回 `/daily-latin`
