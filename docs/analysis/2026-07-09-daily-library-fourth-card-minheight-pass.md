# Daily Library Fourth Card Min-Height Pass

## 背景

在当前 fresh `390px` broad mobile baseline 下：

- `/ = 1513`
- `/daily-latin = 1764`
- `/dashboard = 1762`
- `/dance-os = 1760`

这意味着当前 broad mobile Top1 是：

- `/daily-latin = 1764`

继续拆 `/daily-latin` 后，当前 section 高度主要是：

- `#today-loop-demo = 252.47`
- `#live-return-bridge = 149.14`
- `#daily-sources = 145.06`
- `#daily-library = 141.53`

这轮先没有回到已经多次证伪的 `today-loop-demo` shell tweak，而是先对几个低风险候选做了运行时注入预演。

预演结果里，最稳且收益最大的成立候选是：

- `#daily-library`

运行时继续确认：

- `#daily-library = 141.53`
- 首张 `compact-move-card = 41`
- `scrollHeight = 41`
- 当前最终命中的：
  - `.daily-latin-page .compact-move-card { min-height: 41px }`

说明这里还有一档 very small、直接命中最终样式层的 card shell 收口空间。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在真正最终生效的 `@media (min-width:390px) and (max-width:430px)` 覆盖层，对：

- `.daily-latin-page .compact-move-card`

做 very small pass：

- `min-height: 41px -> 39px`

这轮没有去碰：

- 动作库数据内容
- card padding
- tabs gap
- `today-loop-demo`
- `live-return-bridge`

## 验证结果

这轮按既定串行链完整通过：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh `390px` remeasure

## 量化结果

fresh `390px` broad sweep：

- `/ = 1513`
- `/daily-latin = 1760`
- `/dashboard = 1762`
- `/dance-os = 1760`

对应量化收益：

- `/daily-latin 390`
  - `1764 -> 1760`
- `#daily-library`
  - `141.53 -> 137.53`

运行时再次确认：

- `.daily-latin-page .compact-move-card`
  - `min-height = 39px`
  - `card height = 39`
  - `scrollHeight = 39`

## 这轮成立的结论

- `daily-library` 在当前这版 worktree 的 `390px` 下，仍然存在一档稳定成立的 fourth card min-height 收口空间
- 这轮收益不是猜出来的，而是先做运行时注入预演后，再把唯一稳定成立的候选正式落到 CSS
- 这轮后 fresh broad mobile Top1 已切回：
  - `/dashboard = 1762`

下一轮应继续 fresh 基线后，回到 `/dashboard`，优先重新判断：

- `#dashboard-guardrails = 149.56`
- `#dashboard-witness-archive = 148.84`
- `#dashboard-next-actions = 147.53`
- `#dashboard-structure-bar = 147.19`
- `#dashboard-metrics = 147.03`
