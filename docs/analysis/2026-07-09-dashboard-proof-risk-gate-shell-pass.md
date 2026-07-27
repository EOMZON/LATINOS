# Dashboard Proof Risk Gate Shell Pass

## 背景

在 `Daily Loop Output Shell Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1857`
- `/dashboard = 1871`
- `/dance-os = 1851`

这意味着新的 broad mobile Top1 切到：

- `/dashboard = 1871`

继续拆 `/dashboard` 后，当前最厚 section 是：

- `#dashboard-proof-risk-gate = 165.59`

进一步拆这块后确认：

- `section = 165.59`
- `head = 19.19`
- `grid = 141.41`
- 三张 `decision-card` 高度完全一致：
  - `141.41`

继续拆单张 `decision-card` 后确认：

- `topline = 25.59`
- `title = 15.22`
- `summary = 19.69`
- 每个 `decision-row = 39.91`
- `note = 0`

先尝试过一轮更短的 `compactRows` 数据文案，但 fresh `390px` 高度完全不变，因此不成立。

这说明当前真正值钱的收口点不是继续压 row copy，而是：

- 重复的 `PROOF / RISK / GATE` topline
- card shell 留白
- row 壳体本身

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. 只在 `390px` dashboard 场景下继续收 `DecisionCard`

继续只在：

- `@media (min-width:390px) and (max-width:430px)`

下收：

- `.dashboard-page .decision-grid`
- `.dashboard-page .decision-card`
- `.dashboard-page .decision-topline`
- `.dashboard-page .decision-card h3`
- `.dashboard-page .decision-summary`
- `.dashboard-page .decision-row`
- `.dashboard-page .decision-row span`
- `.dashboard-page .decision-row b`

### 2. 隐藏重复 topline

在 `390px` 下直接隐藏：

- `.dashboard-page .decision-topline`

因为：

- `kind` 信息已经体现在这组三列的标题和上下文里
- 窄屏下继续保留 `PROOF / RISK / GATE` 重复标签，收益很低但高度成本很高

### 3. 微收 card shell

继续只收：

- card padding
- title / summary spacing
- row padding
- row 内字号

没有改：

- 组件结构
- route 结构
- 数据内容
- desktop 行为

因此这轮是一个纯样式层、纯 mobile shell pass。

## fresh 验证

在 fresh `3200` 上重新执行并通过：

- `pnpm typecheck`
- `pnpm build`
- fresh `pnpm start --hostname 127.0.0.1 --port 3200`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- routes 正常返回 `200`
- dashboard dense sections 正常
- desktop 关键路径正常
- mobile shell 正常
- `home` / `daily-latin` 无横向 overflow

## 量化结果

fresh `390px` broad sweep：

- `/ = 1513`
- `/daily-latin = 1857`
- `/dashboard = 1823`
- `/dance-os = 1851`

`#dashboard-proof-risk-gate`：

- `165.59 -> 117.86`

内部变化：

- `grid`
  - `141.41 -> 93.67`
- 单张 `decision-card`
  - `141.41 -> 93.67`
- `topline`
  - `25.59 -> 0`
- `title`
  - `15.22 -> 13.77`
- `summary`
  - `19.69 -> 18.16`
- 每个 `decision-row`
  - `39.91 -> 35.75`

对应 route 收益：

- `/dashboard 390`
  - `1871 -> 1823`

## 这轮成立的结论

这轮 shell pass 已被 fresh 数据证明有效：

- `Proof / Risk / Gate` 当前最大的低收益层确实是重复 topline
- 这组三张 card 不需要继续靠 copy 微调，也能拿到很明显的 route 级收益
- 对 `dashboard` 来说，这是一刀高确定性、低风险、影响非常集中的 mobile compact pass

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 切回：

- `/daily-latin = 1857`

同时：

- `/dance-os = 1851`
- `/dashboard = 1823`

因此下一轮应回到：

- `/daily-latin`

并重新测量当前最厚 section。
