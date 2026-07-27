# Daily Loop Overview Head Negative Margin Pass

## 背景

在上一轮把 `/dance-os` 压到 `1581` 之后，fresh-prod broad mobile 的当前最厚 route 变成：

- `/daily-latin = 1584`

这轮继续严格遵守：

- `390px mobile compaction loop`
- `single-point only`
- 只有当 `route 总高度` 和 `目标 section 高度` 同时下降时才算通过

## 问题定义

这轮直接回到 `/daily-latin`，只看更保守的：

- section header
- shell 级微调

不碰 route 结构，也不碰已明确过于激进的旧候选。

## 当前基线

fresh-dev 初始量得：

- `/daily-latin = 1584`
- `#daily-sources = 121.06`
- `#entry-states = 110.19`
- `#daily-loop-overview = 107.95`
- `#today-loop-demo = 219.5`
- `#live-return-bridge = 128.14`
- `#legacy-daily-principles = 119.02`
- `#daily-library = 67.53`

## 预检候选

这轮只预检这些单点：

- `#daily-loop-overview .compact-sec-head -> -1px / -2px`
- `#daily-sources .compact-sec-head -> -2px`
- `#legacy-daily-principles .compact-sec-head -> -2px`
- `#today-loop-demo .compact-ledger-shell margin-top -> -16px`
- `#today-loop-demo .compact-ledger-shell .ledger-output padding -> 1px`
- `#live-return-bridge .compact-sec-head -> -6px`

预检结果：

- `daily_loop_head_-1`
  - `/daily-latin: 1584 -> 1578`
  - `#daily-loop-overview: 107.95 -> 101.95`
- `daily_loop_head_-2`
  - `/daily-latin: 1584 -> 1577`
  - `#daily-loop-overview: 107.95 -> 100.95`
- `daily_sources_head_-2`
  - `/daily-latin: 1584 -> 1583`
  - `#daily-sources: 121.06 -> 120.06`
- `legacy_head_-2`
  - `/daily-latin: 1584 -> 1583`
  - `#legacy-daily-principles: 119.02 -> 118.02`
- `today_loop_margin_-16`
  - `/daily-latin: 1584 -> 1583`
  - `#today-loop-demo: 219.5 -> 218.5`
- `today_loop_output_pad_1`
  - `/daily-latin: 1584 -> 1584`
  - `#today-loop-demo: 219.5 -> 219.5`
- `live_return_head_-6`
  - `/daily-latin: 1584 -> 1583`
  - `#live-return-bridge: 128.14 -> 127.14`

## 选择

最终写回：

- `.daily-latin-page #daily-loop-overview .compact-sec-head{margin-bottom:-2px}`

原因：

- 它是这轮预检里收益最大的保守点
- 同时显著降低了 route 总高度和 target section 高度
- 比重新碰更重的 `today-loop-demo` 交互壳更稳
- 这轮继续只保留一个 pass，其余候选不写回源码

## 截图复核

对这些候选做了 `390px` screenshot 复核：

- `daily-loop-overview -1px`
- `daily-loop-overview -2px`
- `daily-sources -2px`
- `live-return-bridge -6px`

最终接受 `daily-loop-overview -2px` 的依据是：

- `DAILY LOOP` 标题与三张卡片之间仍有呼吸感
- 中段节奏没有被压塌
- 比继续挤 `live-return` 或 `today-loop-demo` 更符合当前保守策略

## 最终量化结果

fresh-prod 复核后：

- `/daily-latin: 1584 -> 1577`
- `#daily-loop-overview: 107.95 -> 100.95`

同时 broad mobile fresh-prod 重新量得：

- `/ = 1513`
- `/daily-latin = 1577`
- `/dashboard = 1582`
- `/dance-os = 1581`

这意味着：

- 当前 broad mobile 最厚 route 已重新回到：
  - `/dashboard = 1582`

## 同步内容事实

因为 dashboard 页面会显示当前工程状态，这轮同步了：

- `390px Max: 1584 -> 1582`
- `OPS 02`
  - `/daily-latin: 1584 -> 1577`
- `Gate`
  - 改成下一轮重新回到 `/dashboard`

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

- `/daily-latin` 还可以继续压
- 但最稳的方式仍然是先找 section header 级别的窄切口
- 不需要一上来就重新碰更重的 loop 交互外壳

## 下一步

当前下一轮最适合继续看的唯一 route 重新变成：

- `/dashboard`

建议顺序：

1. fresh 量最新 `/dashboard` section 高度
2. 继续优先做 header / panel 级别 preflight
3. 继续保持 `single-point only`
