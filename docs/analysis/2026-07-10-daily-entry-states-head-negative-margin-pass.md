# Daily Entry States Head Negative Margin Pass

## 背景

在前一轮连续压缩后，`/daily-latin` 重新成为 broad mobile 最厚 route。

这轮继续严格遵守：

- `390px mobile compaction loop`
- `single-point only`
- 只有当 `route 总高度` 和 `目标 section 高度` 同时下降时才算通过

## 问题定义

这轮不是再碰 `today-loop-demo` 这类更重的交互块，而是回到更保守的 section header。

目标是判断：

- `#entry-states .compact-sec-head`

是否还能继续压缩，同时不破坏移动端节奏。

## 当前基线

在本轮开始前，`390px` 下 fresh-dev / preflight 的核心数值是：

- `/daily-latin = 1591`
- `#entry-states = 117.19`

同一轮里其余参考段高度：

- `#daily-sources = 121.06`
- `#daily-loop-overview = 107.95`
- `#today-loop-demo = 219.5`
- `#live-return-bridge = 128.14`
- `#legacy-daily-principles = 119.02`
- `#daily-library = 67.53`

## 预检候选

本轮只预检 header margin-bottom：

- `#entry-states .compact-sec-head -> -1px`
- `#entry-states .compact-sec-head -> -2px`
- `#daily-loop-overview .compact-sec-head -> -1px`
- `#daily-loop-overview .compact-sec-head -> -2px`
- `#daily-sources .compact-sec-head -> -2px`
- `#legacy-daily-principles .compact-sec-head -> -2px`

预检结果：

- `entry-states -1px`
  - `/daily-latin: 1591 -> 1585`
  - `#entry-states: 117.19 -> 111.19`
- `entry-states -2px`
  - `/daily-latin: 1591 -> 1584`
  - `#entry-states: 117.19 -> 110.19`
- `daily-loop-overview -1px`
  - `/daily-latin: 1591 -> 1585`
  - `#daily-loop-overview: 107.95 -> 101.95`
- `daily-loop-overview -2px`
  - `/daily-latin: 1591 -> 1584`
  - `#daily-loop-overview: 107.95 -> 100.95`
- `daily-sources -2px`
  - `/daily-latin: 1591 -> 1590`
  - `#daily-sources: 121.06 -> 120.06`
- `legacy-daily-principles -2px`
  - `/daily-latin: 1591 -> 1590`
  - `#legacy-daily-principles: 119.02 -> 118.02`

## 选择

最终写回：

- `.daily-latin-page #entry-states .compact-sec-head{margin-bottom:-2px}`

原因：

- 它和 `daily-loop-overview -2px` 一样有最强数值收益
- 截图复核里 `入口状态` 区块比 `Daily Loop` 更稳，更不容易显得标题贴得太死
- 这一轮只保留一个单点 pass，其余候选不写回源码

## 截图复核

在 `390px` 下对 `-1px / -2px` 都做了 screenshot 复核。

最终接受 `entry-states -2px` 的依据是：

- 标题与卡片上缘仍有呼吸感
- 没有出现标题线和卡片边框打架
- 没有破坏当前参考稿风格下的紧凑节奏

## 最终量化结果

fresh-prod 复核后：

- `/daily-latin: 1591 -> 1584`
- `#entry-states: 117.19 -> 110.19`

同时 broad mobile fresh-prod 重新量得：

- `/ = 1513`
- `/daily-latin = 1584`
- `/dashboard = 1589`
- `/dance-os = 1584`

这意味着：

- `/daily-latin` 已经压到和 `/dance-os` 同一层
- 当前 broad mobile 最厚 route 变得更明确地只剩 `/dashboard`

## 同步内容事实

因为 `dashboard` 页面会展示当前工程状态，这轮顺手同步了：

- `390px Max: 1600 -> 1589`
- `/daily-latin: 1591 -> 1584`
- `/dance-os: 1597 -> 1584`
- `/dashboard: 1600 -> 1589`

并把对应说明改成：

- 当前最厚 route 仍然是 `/dashboard`
- `/daily-latin` 已经被压到和 `/dance-os` 同层

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

它是一个典型的“只动一个 header margin，就同时带动 route 和 section 双下降”的有效 compact win。

## 下一步

当前下一轮最适合继续看的唯一目标变成：

- `/dashboard`

优先顺序建议：

1. 先量最新 `/dashboard` 的 `390px` section 高度
2. 继续只做 header / panel 级别的保守 preflight
3. 保持 `single-point only`
