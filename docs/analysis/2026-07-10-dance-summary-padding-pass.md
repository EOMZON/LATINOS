# Dance Summary Padding Pass

## 背景

在 `/dashboard` 被继续压到 `1582` 之后，fresh-prod broad mobile 的最厚 route 重新变成：

- `/daily-latin = 1584`
- `/dance-os = 1584`

这轮继续严格遵守：

- `390px mobile compaction loop`
- `single-point only`
- 只有当 `route 总高度` 和 `目标 section 高度` 同时下降时才算通过

## 问题定义

这轮先同时 fresh 量了 `/daily-latin` 与 `/dance-os` 的 `390px` section 高度。

结果显示：

- `/daily-latin` 当前最厚块仍然是：
  - `#today-loop-demo = 219.5`
  - `#live-return-bridge = 128.14`
- `/dance-os` 内部更厚：
  - `#dance-summary = 135.75`
  - `#dance-assets = 253.56`
  - `#correction-ledger-demo = 314.94`
  - `#body-map-practice-queue = 255.55`

因此这轮更值得继续看 `/dance-os`，但仍然优先从更保守的：

- header
- shell
- panel padding

层开始。

## 当前基线

fresh-dev 初始量得：

- `/dance-os = 1584`
- `#dance-summary = 135.75`
- `#dance-assets = 253.56`
- `#correction-ledger-demo = 314.94`
- `#body-map-practice-queue = 255.55`
- `#dance-sources = 106.34`

## 预检候选

这轮只预检最保守的几个点：

- `#correction-ledger-demo .compact-sec-head -> -7px / -8px`
- `#body-map-practice-queue .compact-sec-head -> -13px / -14px`
- `#dance-summary .compact-detail-dance-top padding -> 7px / 6px`
- `#dance-assets .compact-library-panel margin-bottom -> -11px / -12px`

预检结果：

- `corr_head_-7`
  - `/dance-os: 1584 -> 1583`
  - `#correction-ledger-demo: 314.94 -> 313.94`
- `corr_head_-8`
  - `/dance-os: 1584 -> 1582`
  - `#correction-ledger-demo: 314.94 -> 312.94`
- `body_head_-13`
  - `/dance-os: 1584 -> 1583`
  - `#body-map-practice-queue: 255.55 -> 254.55`
- `body_head_-14`
  - `/dance-os: 1584 -> 1582`
  - `#body-map-practice-queue: 255.55 -> 253.55`
- `summary padding 7px`
  - `/dance-os: 1584 -> 1583`
  - `#dance-summary: 135.75 -> 134.75`
- `summary padding 6px`
  - `/dance-os: 1584 -> 1581`
  - `#dance-summary: 135.75 -> 132.75`
- `assets_library_mb_-11`
  - `/dance-os: 1584 -> 1583`
  - `#dance-assets: 253.56 -> 252.56`
- `assets_library_mb_-12`
  - `/dance-os: 1584 -> 1582`
  - `#dance-assets: 253.56 -> 251.56`

## 选择

最终写回：

- `.dance-os-page #dance-summary .compact-detail-dance-top{padding:6px}`

原因：

- 它是这一轮预检里收益最大的单点
- 同时降低了 route 总高度和 section 高度
- 风险仍然比继续压更重的 ledger / bodymap header 更低
- 这轮继续只保留一个 pass，其余候选不写回源码

## 截图复核

对以下候选做了 `390px` screenshot 复核：

- `summary padding 7px`
- `summary padding 6px`
- `corr head -8px`
- `body head -14px`
- `assets library -12px`

最终接受 `summary padding 6px` 的依据是：

- 首屏 `Correction Snapshot + Dance OS Demo` 结构仍然完整
- 标题、指标块、chips 和右侧说明没有塌
- 比继续挤下半区 header 更符合“先从壳体本身收一点”的保守策略

## 最终量化结果

fresh-prod 复核后：

- `/dance-os: 1584 -> 1581`
- `#dance-summary: 135.75 -> 132.75`

同时 broad mobile fresh-prod 重新量得：

- `/ = 1513`
- `/daily-latin = 1584`
- `/dashboard = 1582`
- `/dance-os = 1581`

这意味着：

- 当前 broad mobile 最厚 route 已重新收束为：
  - `/daily-latin = 1584`
- `/dance-os` 已被压到四条主 route 中最低的工作台页

## 同步内容事实

因为 dashboard 页面会显示当前工程状态，这轮同步了：

- `OPS 02`
  - `/dance-os: 1584 -> 1581`
- `Gate`
  - 从“下一轮回到 Daily / Dance”
  - 改成“下一轮回到 /daily-latin”

`390px Max` 保持：

- `1584`

因为当前 broad mobile 最大值仍然来自 `/daily-latin`。

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

- `Dance OS` 还可以继续压
- 但当前最优策略仍然不是直接硬挤最厚交互块
- 而是先从 summary 壳体这种更温和、可控、贴近参考稿节奏的点继续收

## 下一步

当前下一轮最适合继续看的唯一 route 重新变成：

- `/daily-latin`

建议顺序：

1. fresh 量最新 `/daily-latin` section 高度
2. 继续优先做 header / shell 级别 preflight
3. 继续保持 `single-point only`
