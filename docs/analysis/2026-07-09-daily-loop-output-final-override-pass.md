# Daily Loop Output Final Override Pass

## 背景

在当前 verified `390px` broad mobile baseline 下：

- `/ = 1513`
- `/daily-latin = 1752`
- `/dashboard = 1750`
- `/dance-os = 1749`

这意味着当前 broad mobile Top1 是：

- `/daily-latin = 1752`

继续拆 `/daily-latin` 后，当前 section 高度主要是：

- `#today-loop-demo = 252.47`
- `#live-return-bridge = 149.14`
- `#daily-library = 137.53`
- `#daily-sources = 137.06`

这轮先没有直接改文件，而是先对几个低风险候选做了运行时注入预演。

预演里，收益最大且同时让 route 与 target section 一起下降的一刀是：

- `#today-loop-demo`

进一步运行时拆解确认：

- `#today-loop-demo = 252.47`
- `ledger-output = 216.28`
- 当前 computed：
  - `padding = 5px`

中途第一次尝试直接把一个中段 `ledger-output` 规则改成 `2px`，但 fresh `390px` 复测没有任何变化。

继续排查后确认：

- 不是 build / smoke 假阳性
- 不是浏览器缓存
- 而是 `daily-latin` 在 `390px` 下存在多层同名 compact rules
- 第一次改到的 selector 不是最终生效的最后一层

这意味着这轮真正要解决的问题不是“值不值得收”，而是：

- **必须像之前处理 `live-return-bridge` 一样，用文件末尾更具体的 override 去命中最终运行时层**

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

在文件末尾追加一个更具体、确保最终生效的 `390px` override：

- `.daily-latin-page #today-loop-demo .compact-ledger-shell .ledger-output`

做 very small pass：

- `padding: 5px -> 2px`

这轮没有去碰：

- 组件结构
- 交互逻辑
- 数据文案
- `STEP 1 / STEP 2 / STEP 3` choice shell

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
- `/daily-latin = 1746`
- `/dashboard = 1750`
- `/dance-os = 1749`

对应量化收益：

- `/daily-latin 390`
  - `1752 -> 1746`
- `#today-loop-demo`
  - `252.47 -> 246.50`

运行时再次确认：

- `.daily-latin-page #today-loop-demo .compact-ledger-shell .ledger-output`
  - `padding = 2px`
  - `output height = 210.28`
  - `output scrollHeight = 208`

## 这轮成立的结论

- `daily loop output shell` 在当前这版 worktree 的 `390px` 下，仍然存在一档稳定成立的 output padding 收口空间
- 这轮真正成立的关键不是“继续改同名 selector”，而是像 `live-return-bridge` 一样，通过文件末尾更具体的 override 命中最终运行时层
- 这轮后 fresh broad mobile Top1 已切回：
  - `/dashboard = 1750`

下一轮应回到 `/dashboard`，优先重新判断：

- `#dashboard-witness-archive = 148.84`
- `#dashboard-next-actions = 147.53`
- `#dashboard-structure-bar = 147.19`
- `#dashboard-route-map = 144.59`
