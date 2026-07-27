# Dashboard Next Actions Compact Copy Pass

## 背景

在 `Daily Sources Matrix Tight Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1965`
- `/dashboard = 1969`
- `/dance-os = 1930`

这意味着新的 broad mobile Top1 切到：

- `/dashboard = 1969`

继续拆 `/dashboard` 后，当前最厚 section 是：

- `#dashboard-next-actions = 183.63`

相比之下：

- `#dashboard-structure-bar = 182.19`
- `#dashboard-proof-risk-gate = 176.78`
- `#dashboard-route-map = 174.75`
- `#dashboard-guardrails = 172.69`

因此这轮优先追：

- `下一批交付`

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/cards/course-card.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dashboard/page.tsx`

### 1. 给 `CourseCardData` 增加 compact 文案槽位

新增：

- `compactTitle?: string`
- `compactDescription?: string`

并只为 `roadmapDeliverables` 增加 dashboard 可用的短文案：

- `Daily Latin 第二版 -> Daily Latin v2`
- `Dance OS 第二版 -> Dance OS v2`
- `旧域名首页评估 -> 旧域名评估`

同时补短描述，保留原始长描述不动。

### 2. `CourseCard` 增加 `compact` 能力

- `compact?: boolean`
- `compact` 下优先使用 `compactTitle / compactDescription`

### 3. 只在 `/dashboard` 的 `下一批交付` 场景里启用 `compact`

`/roadmap` 和其他复用位置不受影响，仍保留原始表达。

## 验证结果

这轮补齐并通过：

- `pnpm typecheck`
- `pnpm build`
- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
- fresh `390px` remeasure

## 量化结果

fresh `390px` broad sweep：

- `/ = 1513`
- `/daily-latin = 1965`
- `/dashboard = 1954`
- `/dance-os = 1930`

对应量化收益：

- `/dashboard 390`
  - `1969 -> 1954`
- `#dashboard-next-actions`
  - `183.63 -> 167.84`

其余 section 保持：

- `#dashboard-metrics = 159.03`
- `#dashboard-structure-bar = 182.19`
- `#dashboard-proof-risk-gate = 176.78`
- `#dashboard-route-map = 174.75`
- `#dashboard-witness-archive = 160.84`

## 这轮成立的结论

- `下一批交付` 这块当前可收口部分主要来自文案长度，而不是继续堆 CSS
- 数据层 compact copy 比 route-level 粗裁更稳，也更符合当前的组件化与内容分层主线
- 这轮收益明确、影响面小、验证完整

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 再次切回：

- `/daily-latin = 1965`
- `/dashboard = 1954`
- `/dance-os = 1930`

## 下一步

- 回到 `/daily-latin`
- 优先继续看 `#today-loop-demo`、`#live-return-bridge`、`#daily-library`
- 仍然只做 very small pass 或数据层 compact pass
