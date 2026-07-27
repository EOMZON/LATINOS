# Dashboard Guardrails Head Negative Margin Pass

## 背景

在上一轮把 `/daily-latin` 压到 `1577` 之后，fresh-prod broad mobile 的当前最厚 route 变成：

- `/dashboard = 1582`

这轮继续严格遵守：

- `390px mobile compaction loop`
- `single-point only`
- 只有当 `route 总高度` 和 `目标 section 高度` 同时下降时才算通过

## 问题定义

这轮回到 `/dashboard`，只预检更保守的 section header 层，不去碰已经被证明容易过紧的更激进 `route-map` 压缩。

重点只看：

- `#dashboard-guardrails`
- `#dashboard-witness-archive`
- `#dashboard-ops`

## 当前基线

fresh-dev 初始量得：

- `/dashboard = 1582`
- `#dashboard-structure-bar = 105.19`
- `#dashboard-next-actions = 111.53`
- `#dashboard-verification = 112.56`
- `#dashboard-guardrails = 125.56`
- `#dashboard-proof-risk-gate = 108.86`
- `#dashboard-route-map = 114.59`
- `#dashboard-witness-archive = 130.84`
- `#dashboard-ops = 116.56`

其中当前更适合继续看的，是下半区较厚的：

- `guardrails`
- `witness archive`
- `ops`

## 预检候选

这轮只预检：

- `#dashboard-guardrails .compact-sec-head -> -1px / -2px`
- `#dashboard-witness-archive .compact-sec-head -> -1px / -2px`
- `#dashboard-ops .compact-sec-head -> -3px / -4px`

预检结果：

- `guardrails -1px`
  - `/dashboard: 1582 -> 1576`
  - `#dashboard-guardrails: 125.56 -> 119.56`
- `guardrails -2px`
  - `/dashboard: 1582 -> 1575`
  - `#dashboard-guardrails: 125.56 -> 118.56`
- `witness -1px`
  - `/dashboard: 1582 -> 1576`
  - `#dashboard-witness-archive: 130.84 -> 124.84`
- `witness -2px`
  - `/dashboard: 1582 -> 1575`
  - `#dashboard-witness-archive: 130.84 -> 123.84`
- `ops -3px`
  - `/dashboard: 1582 -> 1581`
  - `#dashboard-ops: 116.56 -> 115.56`
- `ops -4px`
  - `/dashboard: 1582 -> 1580`
  - `#dashboard-ops: 116.56 -> 114.56`

## 选择

最终写回：

- `.dashboard-page #dashboard-guardrails .compact-sec-head{margin-bottom:-2px}`

原因：

- 它和 `witness -2px` 一样给出了这轮最强数值收益
- 但 `guardrails` 更像 section 头部节奏收紧，不会把共享 archive 那块继续叠加到更拥挤的风险上
- 比继续追 `ops` 更高效
- 这轮继续只保留一个 pass，其余候选不写回源码

## 截图复核

这轮做了 `390px` screenshot 复核：

- `guardrails -1px / -2px`
- `witness -1px / -2px`
- `ops -4px`

最终接受 `guardrails -2px` 的依据是：

- `决策护栏` 标题与 source matrix 之间仍有呼吸感
- 视觉上比继续压 witness 更自然
- 没有出现 section 顶缘过紧的问题

## 最终量化结果

fresh-prod 复核后：

- `/dashboard: 1582 -> 1575`
- `#dashboard-guardrails: 125.56 -> 118.56`

同时 broad mobile fresh-prod 重新量得：

- `/ = 1513`
- `/daily-latin = 1577`
- `/dashboard = 1575`
- `/dance-os = 1581`

这意味着：

- 当前 broad mobile 最厚 route 已重新回到：
  - `/dance-os = 1581`

## 同步内容事实

因为 dashboard 页面会显示当前工程状态，这轮同步了：

- `390px Max: 1582 -> 1581`
- `OPS 02`
  - `/dashboard: 1582 -> 1575`
- `Gate`
  - 改成下一轮回到 `/dance-os`

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

它说明：

- `/dashboard` 还可以继续压
- 但最稳的路径依然是先找 section header 级别的小切口
- 不需要重新回到更激进的 route-map 或 witness 紧缩

## 下一步

当前下一轮最适合继续看的唯一 route 重新变成：

- `/dance-os`

建议顺序：

1. fresh 量最新 `/dance-os` section 高度
2. 继续优先做 shell / header / panel 级别 preflight
3. 继续保持 `single-point only`
