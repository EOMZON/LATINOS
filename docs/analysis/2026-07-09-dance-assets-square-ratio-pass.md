# Dance Assets Square Ratio Pass

## 背景

在 `Dashboard Next Actions Shell Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1871`
- `/dashboard = 1871`
- `/dance-os = 1875`

这意味着新的 broad mobile Top1 切到：

- `/dance-os = 1875`

继续拆 `/dance-os` 后确认当前 section 高度为：

- `#correction-ledger-demo = 394.08`
- `#dance-assets = 336.91`
- `#body-map-practice-queue = 309.14`
- `#dance-summary = 174.44`
- `#dance-sources = 142.89`

虽然 `Correction Ledger` 仍然最高，但它当前与表单、交互和多组结果卡片耦合更深。

相比之下，`Dance Assets` 当前高度更像一个典型的：

- 固定卡片比例过高
- 纯样式层可直接收口
- 不需要改数据、交互或组件逻辑

的高 ROI shell pass。

进一步拆 `#dance-assets` 后确认：

- `section = 336.91`
- `head = 19.19`
- `panel = 66.16`
- `grid = 197.84`
- 6 张 `.asset` 高度完全一致：
  - `97.42`

继续拆单张 asset 后确认：

- `topline = 11.92`
- `copy = 17.34`
- `cap = 7.03`
- `meta = 6.31`

也就是说，这块高度的主因不是文字，而是：

- `asset` 外壳纵向比例本身过高

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. 只在 `390px` dance-os 场景下收 asset 比例

继续只在：

- `@media (min-width:390px) and (max-width:430px)`

下改：

- `.dance-os-page .compact-asset-grid .asset`

把：

- `aspect-ratio: 7 / 8`

收为：

- `aspect-ratio: 1 / 1`

### 2. 同步微收 asset shell

继续只收：

- `padding: 4px -> 3px`
- `.asset-topline` 定位：
  - `top/left/right: 3px -> 2px`

没有继续改：

- 数据内容
- `AssetCard` 结构
- tabs / panel / note 逻辑
- 交互或 hash 行为

因此这轮是一个纯样式层、影响面很小的 square-ratio shell pass。

## fresh 验证

在 fresh `3200` 上重新执行并通过：

- `pnpm typecheck`
- `pnpm build`
- fresh `pnpm start --hostname 127.0.0.1 --port 3200`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- routes 正常返回 `200`
- desktop 关键路径正常
- dashboard / daily / dance 主要内容正常
- mobile shell 正常
- `home` / `daily-latin` 无横向 overflow

## 量化结果

fresh `390px` broad sweep：

- `/ = 1513`
- `/daily-latin = 1871`
- `/dashboard = 1871`
- `/dance-os = 1851`

`#dance-assets`：

- `336.91 -> 312.56`

内部变化：

- `panel`
  - `66.16 -> 66.16`
- `grid`
  - `197.84 -> 173.50`
- 单张 `.asset`
  - `97.42 -> 85.25`

对应 route 收益：

- `/dance-os 390`
  - `1875 -> 1851`

## 这轮成立的结论

这轮 square-ratio pass 已被 fresh 数据证明有效：

- `Dance Assets` 当前最值钱的收口点确实不是文字层，而是卡片纵向比例
- 这轮完全不碰数据和交互，也能稳定拿到一笔 route 级高度收益
- 对 `dance-os` 来说，这是一刀低风险、高确定性的移动端壳体收口

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 变成并列：

- `/daily-latin = 1871`
- `/dashboard = 1871`

同时：

- `/dance-os = 1851`

因此下一轮应回到：

- `/daily-latin`
- `/dashboard`

重新并排测量两者当前 section 高度，再决定新的最高 ROI 小刀。
