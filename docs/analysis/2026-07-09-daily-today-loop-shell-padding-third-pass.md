# Daily Today Loop Shell Padding Third Pass

## 背景

上一轮 latest fully verified `390px` broad baseline 是：

- `/ = 1513`
- `/daily-latin = 1687`
- `/dashboard = 1700`
- `/dance-os = 1702`

因此当轮 broad mobile Top1 仍然是：

- `/dance-os = 1702`

但当前 worktree 里还带着一条尚未 fresh 验证的 very small override：

- `.daily-latin-page #today-loop-demo .compact-ledger-shell{padding:3px}`

所以这轮没有直接继续做新改动，而是先按既定规则补齐完整验证链，确认这条未验证补丁到底是否成立。

## 当前改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 使用文件末尾更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.daily-latin-page #today-loop-demo .compact-ledger-shell`
- 从：
  - `padding: 4px`
- 收成：
  - `padding: 3px`

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
  - `1687 -> 1685`
- `#today-loop-demo`
  - `242.50 -> 240.50`
- `#live-return-bridge`
  - `138.14 -> 138.14`
- `#daily-overview`
  - `119.06 -> 119.06`
- `#daily-sources`
  - `125.06 -> 125.06`
- `#daily-library`
  - `117.53 -> 117.53`
- `#legacy-daily-principles`
  - `125.02 -> 125.02`

fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1685`
- `/dashboard = 1700`
- `/dance-os = 1702`

## 结论

这是一轮成立的 `/daily-latin` single-point pass。

它满足成立条件：

- route 总高下降
- 目标 section 高度下降

这轮后：

- `/daily-latin` 继续下降到 `1685`
- broad mobile Top1 仍然是：
  - `/dance-os = 1702`

因此下一轮不应该继续留在 `/daily-latin`，而应回到 fresh broad baseline 后，优先处理：

- `/dance-os`

最值得优先复核的候选是：

- `#body-map-practice-queue`
- `#dance-sources`
