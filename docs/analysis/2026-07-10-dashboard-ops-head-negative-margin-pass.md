# Dashboard Ops Head Negative Margin Pass

## 背景

在上一轮把 `/daily-latin` 压到 `1584` 之后，`/dashboard` 重新成为 fresh-prod broad mobile 最厚 route：

- `/dashboard = 1589`

这轮继续严格遵守：

- `390px mobile compaction loop`
- `single-point only`
- 只有当 `route 总高度` 和 `目标 section 高度` 同时下降时才算通过

## 问题定义

这轮不碰大块组件结构，也不碰多处 card padding。

只回到更保守的 header 层，重新检查 dashboard 里当前最厚的下半段 section：

- `#dashboard-guardrails`
- `#dashboard-witness-archive`
- `#dashboard-ops`

目标是判断：

- 哪个 section header 还能继续收一点，同时不破坏当前移动端节奏。

## 当前基线

`390px` 下 fresh-dev 初始量得：

- `/dashboard = 1589`
- `#dashboard-structure-bar = 105.19`
- `#dashboard-next-actions = 111.53`
- `#dashboard-verification = 112.56`
- `#dashboard-guardrails = 125.56`
- `#dashboard-proof-risk-gate = 108.86`
- `#dashboard-route-map = 114.59`
- `#dashboard-witness-archive = 130.84`
- `#dashboard-ops = 123.56`

这说明当前最厚的 section 已经不是上半部分，而是：

- `witness archive`
- `guardrails`
- `ops`

## 预检候选

这轮只预检单点 header margin：

- `#dashboard-guardrails .compact-sec-head -> -1px / -2px`
- `#dashboard-ops .compact-sec-head -> -1px / -2px`
- `#dashboard-witness-archive .compact-sec-head -> -1px / -2px`
- 另补看一个更轻的：
  - `#dashboard-route-map .compact-sec-head -> -6px`

预检结果：

- `guardrails -1px`
  - `/dashboard: 1589 -> 1583`
  - `#dashboard-guardrails: 125.56 -> 119.56`
- `guardrails -2px`
  - `/dashboard: 1589 -> 1582`
  - `#dashboard-guardrails: 125.56 -> 118.56`
- `ops -1px`
  - `/dashboard: 1589 -> 1583`
  - `#dashboard-ops: 123.56 -> 117.56`
- `ops -2px`
  - `/dashboard: 1589 -> 1582`
  - `#dashboard-ops: 123.56 -> 116.56`
- `witness -1px`
  - `/dashboard: 1589 -> 1583`
  - `#dashboard-witness-archive: 130.84 -> 124.84`
- `witness -2px`
  - `/dashboard: 1589 -> 1582`
  - `#dashboard-witness-archive: 130.84 -> 123.84`
- `route-map -6px`
  - `/dashboard: 1589 -> 1588`
  - `#dashboard-route-map: 114.59 -> 113.59`

## 选择

最终写回：

- `.dashboard-page #dashboard-ops .compact-sec-head{margin-bottom:-2px}`

原因：

- 它和 `guardrails -2px`、`witness -2px` 一样给出了最强数值收益
- `ops` 区块位于页面底部，视觉节奏更稳，更不容易造成 section 顶缘拥挤
- `witness archive` 之前已经有 `archive-item-head` 的压缩 pass，这轮不重复把风险叠在同一块
- 这轮只保留一个 pass，其余候选不写回源码

## 截图复核

对以下候选都做了 `390px` screenshot 复核：

- `guardrails -1px / -2px`
- `ops -1px / -2px`
- `witness -1px / -2px`

最终接受 `ops -2px` 的依据是：

- `当前运维判断` 标题与三张卡片之间仍然有呼吸感
- 没有出现标题线和卡片边缘打架
- 视觉上比继续挤 `witness archive` 更稳

## 最终量化结果

fresh-prod 复核后：

- `/dashboard: 1589 -> 1582`
- `#dashboard-ops: 123.56 -> 116.56`

同时 broad mobile fresh-prod 重新量得：

- `/ = 1513`
- `/daily-latin = 1584`
- `/dashboard = 1582`
- `/dance-os = 1584`

这意味着：

- broad mobile 的最大值不再来自 `/dashboard`
- 当前最厚 route 变成：
  - `/daily-latin = 1584`
  - `/dance-os = 1584`

## 同步内容事实

因为 dashboard 页面会展示当前工程状态，这轮同步了：

- `390px Max: 1589 -> 1584`
- `OPS 02`
  - `/dashboard: 1589 -> 1582`
- `Gate` 文案
  - 从“下一轮先看 `/dashboard`”
  - 改成“下一轮回到 `/daily-latin` 与 `/dance-os`”

## 验证

按要求完成串行验证：

1. `pnpm typecheck`
2. `CI=1 pnpm build`
3. kill 旧 `next start`
4. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
6. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
7. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

结果：

- 全部通过

## 结论

这轮 pass 成立。

它继续证明：

- dashboard 的移动端压缩还没有结束
- 但最稳的路径仍然是先找 header 级别的小切口
- 不需要一上来就碰更激进的 panel / card 压缩

## 下一步

当前下一轮最适合继续看的目标变成：

- `/daily-latin`
- `/dance-os`

建议顺序：

1. 先 fresh 量这两条 route 的 `390px` section 高度
2. 只在更保守的 header / shell 层继续做 preflight
3. 继续保持 `single-point only`
