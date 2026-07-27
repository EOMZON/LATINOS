# Daily Library Sixth Card Min-Height Pass

## 背景

在 `dashboard metrics` eighth padding pass 之后，fresh `390px` broad mobile baseline 变成：

- `/ = 1513`
- `/daily-latin = 1744`
- `/dashboard = 1738`
- `/dance-os = 1745`

这意味着当前 broad mobile Top1 是：

- `/daily-latin = 1744`

继续拆 `/daily-latin` 后，当前主要 section 高度是：

- `#today-loop-demo = 246.50`
- `#live-return-bridge = 149.14`
- `#daily-library = 135.53`
- `#daily-sources = 137.06`

这轮先做了 fresh 运行时注入预演。

预演里收益最高且足够稳的候选有两个并列：

- `#live-return-bridge`
- `#daily-library`

其中更克制、命中链更短的一刀是：

- `#daily-library`

运行时继续确认：

- `#daily-library = 135.53`
- 当前最终命中的：
  - `.daily-latin-page .compact-move-card { min-height: 38px }`

进一步注入补测确认：

- `min-height: 38px -> 37px`

会同时带来：

- `/daily-latin route -2`
- `#daily-library section -2`

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

只在真正最终生效的 daily `390px` 覆盖层，对：

- `.daily-latin-page .compact-move-card`

做 very small pass：

- `min-height: 38px -> 37px`

这轮没有去碰：

- 动作库内容数据
- tab 文案
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
- `/daily-latin = 1742`
- `/dashboard = 1738`
- `/dance-os = 1745`

对应量化收益：

- `/daily-latin 390`
  - `1744 -> 1742`
- `#daily-library`
  - `135.53 -> 133.53`

运行时再次确认：

- `.daily-latin-page #daily-library .compact-move-card`
  - `min-height = 37px`
  - `card height = 37`
  - `scrollHeight = 37`

## 这轮成立的结论

- `daily-library` 在当前这版 worktree 的 `390px` 下，仍然存在一档稳定成立的 sixth card min-height 收口空间
- 这轮收益来自 fresh 预演后只收最终命中的 min-height，而不是继续追高噪声 section
- 这轮后 fresh broad mobile Top1 已切成并列：
  - `/daily-latin = 1742`
  - `/dashboard = 1738`

下一轮应继续 fresh 预演，并在：

- `/daily-latin`
- `/dashboard`

之间重新判断谁更适合继续追。
