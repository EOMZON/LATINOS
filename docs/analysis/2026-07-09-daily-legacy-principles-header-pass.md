# Daily Legacy Principles Header Pass

## 背景

在 `Dashboard` 顶部 metrics 被继续拉低之后，fresh `390px` broad mobile Top1 仍然是：

- `/daily-latin = 2049`

这一轮中途先试过把 `Today Loop Demo` 的 compact note 输入从多行 `textarea` 收成单行 `input`。

那一刀虽然让形态更像一条回流 cue，但 fresh `390px` 下：

- route 总高没有变化

因此不把它记成成立 pass。

继续按最小 ROI 重新看 `/daily-latin` section 后，发现更稳的一刀是：

- `#legacy-daily-principles` 的 section head 仍保留一行重复说明

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

在：

- `@media (min-width:390px) and (max-width:430px)`

下新增：

- `.daily-latin-page #legacy-daily-principles .compact-sec-head .more{display:none}`

作用：

- 只在 `390px` 下隐藏 `旧站已验证的起步原则` 的重复说明行
- 保留 section title
- 保留卡片内容

## fresh 验证

在 fresh `3200` 上重新执行：

- `pnpm build`
- `pnpm typecheck`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- daily loop demo 交互正常
- mobile shell 正常
- `home` / `daily-latin` 无横向 overflow

## 量化结果

fresh `390px` sweep：

- `/ = 1513`
- `/daily-latin = 2026`
- `/dashboard = 2013`
- `/dance-os = 1930`

`/daily-latin` section：

- `#legacy-daily-principles`
  - `147.02 -> 125.02`

其他主要 section 保持稳定：

- `#today-loop-demo = 363.55`
- `#live-return-bridge = 197.48`
- `#daily-library = 185.58`

## 这轮成立的结论

这轮 very small route-level pass 已被 fresh 数据证明有效：

- `/daily-latin 390`
  - `2048 -> 2026`
- `#legacy-daily-principles`
  - `147.02 -> 125.02`

这说明：

- 当前这块的剩余可收口空间依旧主要在重复说明层
- 继续沿 very small route-level pass 追，仍然有稳定收益

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 仍然是：

- `/daily-latin = 2026`

但与 `/dashboard` 的差距继续拉近到：

- `2026 vs 2013`

因此下一轮更值得继续看的仍然是：

- `#today-loop-demo`
- `#live-return-bridge`
- `#daily-library`

