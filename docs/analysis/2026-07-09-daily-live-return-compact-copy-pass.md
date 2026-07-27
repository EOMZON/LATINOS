# Daily Live Return Compact Copy Pass

## 背景

在 `Dashboard Next Actions Compact Copy Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1965`
- `/dashboard = 1954`
- `/dance-os = 1930`

这意味着新的 broad mobile Top1 切回：

- `/daily-latin = 1965`

继续拆 `/daily-latin` 内部高度后，当前更厚的 section 是：

- `#today-loop-demo = 318.55`
- `#live-return-bridge = 197.48`
- `#daily-library = 185.58`
- `#daily-sources = 168.06`

进一步拆 `#live-return-bridge` 后确认：

- `.daily-return-mode-card = 113.69`
- `h4 = 33`
- 两个 CTA 仍在窄卡内换行：
  - `看 Archive`
  - `桥接 Dance`

因此这轮优先不动布局，而是继续走：

- 数据层 compact copy

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`

只收 `dailyReturnModeSeeds` 的 compact 文案：

- `LIVE RETURN`
  - `compactTitle: 看完直播后，先带一句动作句回这一轮 -> 直播句回这一轮`
- `CLIP BRIDGE`
  - `compactTitle: 把这一轮的问题压成可回看的 clip witness -> 压成 clip 证据`
- `DANCE BRIDGE`
  - `compactTitle: 当问题够具体时，桥接到 Dance OS -> 卡点桥接到 OS`

同时轻收 compact 描述长度，但不改默认长文案、不改结构、不改交互。

## 验证结果

这轮补齐并通过：

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
- `/dashboard = 1954`
- `/dance-os = 1930`

对应量化收益：

- `/daily-latin 390`
  - `1965 -> 1948`
- `#live-return-bridge`
  - `197.48 -> 180.98`

其余关键 section 保持：

- `#today-loop-demo = 318.55`
- `#daily-library = 185.58`
- `#daily-sources = 168.06`

## 这轮成立的结论

- `Live Return` 这块当前可收口部分主要来自 compact copy，而不是继续堆 CSS
- mode card 标题和 CTA 换行确实在支配这块剩余高度
- 继续沿数据层 compact 文案追，收益真实且影响面小

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 再次切回：

- `/dashboard = 1954`
- `/daily-latin = 1948`
- `/dance-os = 1930`

## 下一步

- 回到 `/dashboard`
- 优先继续看：
  - `#dashboard-structure-bar = 182.19`
  - `#dashboard-proof-risk-gate = 176.78`
  - `#dashboard-route-map = 174.75`
- 仍然只做 very small pass 或数据层 compact pass
