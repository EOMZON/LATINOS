# `/dance-os` Phase 1 Visible Pass v3

## 背景

今天继续按 `Phase 1` 核心前台完成态的要求推进：

- 不切辅助页
- 不先做部署
- 只继续收口核心三页里最像“还没完全完成”的页面

在首页 `/` 已有 `visible pass v3`、`/daily-latin` 已有 `visible pass v2` 的前提下，当前更合理的继续收口对象回到了：

- `/dance-os`

原因不是它不可用，而是它仍然最容易被感知为：

- 模块库像资产墙
- 手机端密度仍偏系统页
- 顶部 summary / correction / body map / sources 的节奏还不够成品化

## 这一轮先处理了什么

这轮首先暴露的不是审美问题，而是源码结构问题：

### 1. `workbench.css` 里有真实的括号结构错误

本轮实际发现：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

里存在两处历史遗留的括号问题：

1. `/dance-os` visible pass 区块前多了一个多余的 `}`
2. `dashboard-guardrails` 的一个 `@media` block 少了结束 `}`

这两个问题会直接导致：

- CSS block 作用范围混乱
- later override 被吞并或顺序失真
- build 在 fresh-prod 下直接失败

所以这轮不是“继续凭感觉微调”，而是先把 `/dance-os` 当前真实样式状态修回可验证状态。

### 2. `/dance-os` 顶部 visible-pass v3 覆盖继续保留

本轮继续沿用并验证了 `/dance-os` 最近这组更偏前台完成态的调整：

- `data/dance.ts`
  - `danceRows` 缩到 4 行
  - `danceLead` 收短
  - 模块与来源文案继续压成更 frontdoor 的表达
- `app/dance-os/page.tsx`
  - `SectionHeader more` 文案继续收短
- `styles/workbench.css`
  - 模块库从更像“空资产墙”的状态拉回更可读的入口卡
  - correction / body map / sources 的间距和密度继续回到可评判态

### 3. 顺手修了一个影响 `Daily` 和 `Dance` 的组件层问题

截图复核后还发现顶部 `DetailPanel` 在手机端有“内容压住 / 视觉像重叠”的感觉。

真实原因不是文本定位错，而是：

- `.compact-detail-daily-top .stage`
- `.compact-detail-dance-top .stage`

在手机端仍保留固定 `aspect-ratio`，而内部内容已经超过这个固定高度。

所以本轮追加了一刀组件层移动端修正：

- 在 `@media (max-width:860px)` 下
  - `.daily-latin-page .compact-detail-daily-top .stage`
  - `.dance-os-page .compact-detail-dance-top .stage`
    - `aspect-ratio:auto`
    - `min-height:0`

这刀的意义是：

- 不再让顶部 stage 区因固定高度而把真实内容挤出盒子
- 让手机端的顶部 detail panel 回到可读的自然高度

## 变更文件

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

本轮没有新增新文件到前台代码层，主要是在现有结构上修正：

- CSS 结构问题
- `/dance-os` visible-pass v3 覆盖
- 顶部 detail panel 的移动端高度约束

## fresh-prod 验证

本轮最终通过：

- `pnpm typecheck`
- `CI=1 pnpm build`
- fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

## fresh 截图证据

本轮新证据目录：

- `/tmp/latinos-phase1-2026-07-10-v2`

核心截图：

- `/tmp/latinos-phase1-2026-07-10-v2/dance-desktop.png`
- `/tmp/latinos-phase1-2026-07-10-v2/dance-mobile.png`
- `/tmp/latinos-phase1-2026-07-10-v2/daily-mobile.png`
- `/tmp/latinos-phase1-2026-07-10-v2/home-mobile.png`

## 当前判断

这轮之后，`/dance-os` 可以成立为一次新的 `visible pass v3`，理由是：

### 成立的部分

- `/dance-os` 不再带着“CSS 实际未闭合”的不可信状态
- 桌面端模块库已明显比之前更像 frontdoor 模块，而不是微型资产墙
- 手机端整体密度比之前更稳
- top summary / correction / body map / source 的节奏比之前更统一
- `DetailPanel` 的手机端固定高度问题已被明确处理

### 仍然不等于 `Phase 1 done`

虽然 `/dance-os` 这一页更稳了，但并排看三页当前状态后，更合理的判断仍然是：

- 首页 `/` 已明显接近前台完成态
- `/dance-os` 现在也更接近前台完成态
- `/daily-latin` 仍更像下一轮最可能继续收口的核心页

原因不是它坏掉，而是它目前仍更容易被感知为：

- 页面更长
- 手机端信息更密
- 顶部和中段仍更像系统工作台，而不是已经完全收成的入口页

## 当前更合理的下一步

继续保持 `Phase 1`，但不要平均推进。

下一轮更合理的顺序是：

1. 把 `Top 1` 暂时切回 `/daily-latin`
2. 继续做一轮针对手机端和整体完成感的 visible pass
3. 再对 `/`、`/daily-latin`、`/dance-os` 做并排验收
4. 只有当三页都达到“用户直接看页面即可评价为接近最终版”时，才结束 `Phase 1`
