# Daily Library Sixth Minheight Pass

## 背景

在 latest fully verified `390px` broad mobile baseline 下：

- `/ = 1513`
- `/daily-latin = 1720`
- `/dashboard = 1718`
- `/dance-os = 1728`

这意味着当轮 broad mobile Top1 是：

- `/daily-latin = 1720`

继续 fresh 拆 `/daily-latin` 后，当前 section 高度主要是：

- `#today-loop-demo = 246.5`
- `#live-return-bridge = 145.14`
- `#daily-overview = 131.06`
- `#daily-sources = 129.06`
- `#daily-library = 123.53`

运行时 preflight 后确认：

- `#daily-library .compact-move-card`
  - route `1720 -> 1718`
  - target `123.53 -> 121.53`
- `#live-return-bridge .bodymap-actions`
  - route `1720 -> 1719`
  - target `145.14 -> 144.14`
- `legacy principles` header margin 只有 `-1`
- `today-loop-demo / daily-overview` 这批候选没有更高收益

因此这轮继续沿 `daily-library` 的 card shell 收口。

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

在文件末尾追加更具体的 `390px` 覆盖：

- `.daily-latin-page #daily-library .compact-move-card`

做 very small pass：

- `min-height: 32px -> 31px`

这样做的原因是：

- 运行时确认当前命中的最终值已经是 `32px`
- 当前文件里已经存在多层 `compact-move-card` 的历史 `390px` 定义
- 这轮只继续收最小一档卡片壳体高度，不动内容、不动 tabs、不动其他 section

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
- `/daily-latin = 1718`
- `/dashboard = 1718`
- `/dance-os = 1728`

对应量化收益：

- `/daily-latin 390`
  - `1720 -> 1718`
- `#daily-library`
  - `123.53 -> 121.53`

运行时再次确认：

- `#daily-library .compact-move-card`
  - `min-height = 31px`

## 这轮成立的结论

- `daily-library` 在 `390px` 下还有一档稳定成立的 card min-height 收口空间
- 这轮收益继续高于同批的 `live-return actions` 候选，因此优先级更高
- 这轮后 fresh broad mobile Top1 进入并列状态：
  - `/daily-latin = 1718`
  - `/dashboard = 1718`

下一轮应回到 fresh broad baseline 后，对 `/daily-latin` 与 `/dashboard` 继续做并列 Top1 比较，再挑下一刀最小且稳定的 pass。
