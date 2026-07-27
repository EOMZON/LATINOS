# Dashboard Proof Risk Gate Compact Copy Pass

## 背景

在 `Daily Live Return Compact Copy Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1948`
- `/dashboard = 1954`
- `/dance-os = 1930`

这意味着新的 broad mobile Top1 切到：

- `/dashboard = 1954`

继续拆 `/dashboard` 后，当前更厚的几块是：

- `#dashboard-structure-bar = 182.19`
- `#dashboard-proof-risk-gate = 176.78`
- `#dashboard-route-map = 174.75`

进一步拆 `Proof / Risk / Gate` 后确认：

- `.decision-card = 152.59`
- `.decision-summary = 19.69`
- `.decision-row = 51.09`
- `.decision-note = 0`

这说明这块当前可收口的部分不是 note 层，而是：

- summary 文案
- row value 文案

因此这轮优先继续走：

- 数据层 compact copy

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/cards/decision-card.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dashboard/page.tsx`

### 1. 给 `DecisionSignalData` 增加 compact 文案槽位

新增：

- `compactSummary?: string`
- `compactRows?: KeyValue[]`
- `compactNote?: string`

并只给 `dashboardDecisionSignals` 增加更短的 compact 文案。

### 2. `DecisionCard` 增加 `compact` 能力

- `compact?: boolean`
- `compact` 下优先使用：
  - `compactSummary`
  - `compactRows`
  - `compactNote`

### 3. 只在 `/dashboard` 的 `Proof / Risk / Gate` 场景启用 compact

其他地方不受影响。

## 验证结果

这轮通过：

- `pnpm typecheck`
- `pnpm build`
- fresh `next start --hostname 127.0.0.1 --port 3200`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
- fresh `390px` remeasure

## 量化结果

fresh `390px` broad sweep：

- `/ = 1513`
- `/daily-latin = 1948`
- `/dashboard = 1942`
- `/dance-os = 1930`

对应量化收益：

- `/dashboard 390`
  - `1954 -> 1942`
- `#dashboard-proof-risk-gate`
  - `176.78 -> 165.59`

其余关键 section 保持：

- `#dashboard-structure-bar = 182.19`
- `#dashboard-next-actions = 167.84`
- `#dashboard-route-map = 174.75`
- `#dashboard-guardrails = 172.69`

## 这轮成立的结论

- `Proof / Risk / Gate` 这块当前可收口部分主要来自文案长度，而不是继续堆 CSS
- 数据层 compact copy 依然是当前最稳的 very small pass 方式
- 这轮收益明确、影响面小、验证完整

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 再次切回：

- `/daily-latin = 1948`
- `/dashboard = 1942`
- `/dance-os = 1930`

## 下一步

- 回到 `/daily-latin`
- 优先继续看：
  - `#today-loop-demo = 318.55`
  - `#daily-library = 185.58`
  - `#live-return-bridge = 180.98`
- 仍然只做 very small pass 或数据层 compact pass
