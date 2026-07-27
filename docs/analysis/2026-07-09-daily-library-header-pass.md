# Daily Library Header Pass

## 背景

在 `Dashboard` 的 `Route Map` 被继续拉低之后，fresh `390px` broad mobile Top1 变成：

- `/daily-latin = 2082`

重新拆 `/daily-latin` section 后，当前较厚的两块是：

- `#today-loop-demo = 374.59`
- `#daily-library = 207.58`

继续拆 `daily-library` 后发现：

- move cards 本身已经是稳定紧凑高度
- tablist 只有 `36.39`
- 真正还能最小收口的一层是 section head 里的重复说明行

因此这轮先不重写 `Today Loop Demo`，而是先做一刀更小的 `daily-library` route-level pass。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

在：

- `@media (min-width:390px) and (max-width:430px)`

下新增：

- `.daily-latin-page #daily-library .compact-sec-head .more{display:none}`

作用：

- 只在 `390px` 下隐藏 `Daily Latin 动作库` section head 的重复说明行
- 保留 section title
- 保留 tabs / move grid / 交互逻辑

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
- `/daily-latin = 2060`
- `/dashboard = 2053`
- `/dance-os = 1930`

`/daily-latin` section：

- `#daily-library`
  - `207.58 -> 185.58`

其他主要 section 保持稳定：

- `#today-loop-demo = 374.59`
- `#live-return-bridge = 197.48`

## 这轮成立的结论

这轮 very small route-level pass 已被 fresh 数据证明有效：

- `/daily-latin 390`
  - `2082 -> 2060`
- `#daily-library`
  - `207.58 -> 185.58`

这说明：

- 当前 `daily-library` 的可收口部分并不是 card 网格本体
- 而是 compact 场景下仍然保留的重复说明层

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 仍然是：

- `/daily-latin = 2060`

但它与 `/dashboard` 的差距已经继续缩到：

- `2060 vs 2053`

因此下一轮更值得直接继续拆：

- `#today-loop-demo`

而不是重新扩散到别的 route。

