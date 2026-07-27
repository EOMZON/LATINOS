# Daily Library Second Min Height Pass

## 背景

在上一轮 fresh `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1697`
- `/dashboard = 1700`
- `/dance-os = 1702`

因此当前 broad mobile Top1 仍然是：

- `/daily-latin = 1697`

fresh 拆 `/daily-latin` 后，当前主要 section 是：

- `#today-loop-demo = 242.50`
- `#live-return-bridge = 138.14`
- `#daily-overview = 127.06`
- `#daily-sources = 125.06`
- `#legacy-daily-principles = 125.02`
- `#daily-library = 119.53`

## preflight

这一轮继续同时看 `daily / dashboard / dance-os` 的 very small 候选，结果如下。

### `/daily-latin` 候选

- `daily-library-min29`
  - `/daily-latin: 1697 -> 1695`
  - `#daily-library: 119.53 -> 117.53`
- `daily-legacy-head-mb4`
  - 只有 `-1px`
- `daily-sources-head-mb2`
  - 只有 `-1px`

### `/dashboard` 候选

- `dashboard-archive-panel-pad2`
  - `/dashboard: 1700 -> 1698`
  - `#dashboard-witness-archive: 144.84 -> 142.84`

### `/dance-os` 候选

- `dance-bodymap-panel-pad2`
  - `/dance-os: 1702 -> 1700`
  - `#body-map-practice-queue: 286.55 -> 284.55`
- `dance-sources-title-mb2`
  - `/dance-os: 1702 -> 1700`
  - `#dance-sources: 123.34 -> 121.34`

因此这一轮继续选择当前 Top1 `/daily-latin` 内部的最稳一刀：

- `.daily-latin-page #daily-library .compact-move-card`
- `min-height: 29px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.daily-latin-page #daily-library .compact-move-card`
- 收成：
  - `min-height: 29px`

## 验证链

按既定串行顺序完成：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh `390px` remeasure

结果：

- `typecheck`: pass
- `build`: pass
- `route smoke`: pass
- `browser smoke`: pass
- mobile overflow:
  - `home`: no overflow
  - `daily-latin`: no overflow

## 量化结果

fresh `390px` remeasure：

- `/daily-latin`
  - `1697 -> 1695`
- `#daily-library`
  - `119.53 -> 117.53`
- `#today-loop-demo`
  - `242.50 -> 242.50`
- `#live-return-bridge`
  - `138.14 -> 138.14`
- `#daily-overview`
  - `127.06 -> 127.06`
- `#daily-sources`
  - `125.06 -> 125.06`
- `#legacy-daily-principles`
  - `125.02 -> 125.02`

fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1695`
- `/dashboard = 1700`
- `/dance-os = 1702`

## 结论

这是一轮成立的 `/daily-latin` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

这轮后 broad mobile Top1 仍然是：

- `/daily-latin = 1695`

同时把与第二名的差距继续拉开到：

- `/daily-latin = 1695`
- `/dashboard = 1700`
