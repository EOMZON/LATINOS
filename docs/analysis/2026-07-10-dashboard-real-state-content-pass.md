# 2026-07-10 dashboard real-state content pass

## 背景

前两轮已经把 `frontdoor` 的结构继续收紧到了：

- page 层按 route 分离
- data 层按 route / 主题拆分
- 大多数导入边界也已经从 `@/data/content` 收窄到各自模块

但继续检查当前内容时，`dashboard` 仍然有一块明显的“总结态 / 模板态”问题：

- 一些文案还是在说抽象状态
- 但没有充分利用仓库里已经成立的真实项目证据
- 因此它更像“项目概况页”，还不够像“正在运行中的状态看板”

这与本仓当前已经拥有的大量真实证据不匹配，比如：

- 8 条稳定 route
- 9 个 feature 组件
- 10 个 data 文件
- fresh-prod 验证链
- `390px` broad mobile baseline
- 当前最厚 route 已明确是 `/dashboard = 1600`

## 本轮目标

不改 route 结构、不改组件结构的前提下，把 `dashboard` 的内容从更抽象的项目说明，推进成更真实、更证据化的项目运行状态页。

## 改动

修改文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/dashboard.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/dashboard.ts)

### 1. metric cards 从泛化指标改成当前真实工程指标

原来更像：

- `Legacy Site`
- `Demo Tracks`
- `Feishu Docs`
- `Preview Site`

现在改成更直接反映当前工程状态的指标：

- `Stable Routes = 8`
- `Feature Demos = 9`
- `Data Files = 10`
- `390px Max = 1600`

这让顶部指标更像“当前站点运行面板”，而不只是项目介绍。

### 2. verification cards 更贴近当前验证链事实

本轮把验证卡片进一步压实成当前已经在跑的真实链路：

- `Route Smoke`
  - `8 routes`
  - `HTTP 200 + 标题 + fresh prod`
- `Browser Smoke`
  - `queue / bridge / archive / anchors`
  - `390px nav / overflow / route`
- `Structure Guards`
  - `10 files / route-scoped`
  - `static 已归档`

特别是：

- `browser-smoke.py`
  - 当前不再只验证“页面能打开”
  - 而是验证 `Daily ↔ Dance bridge`、共享 witness queue、双层 anchor 与 `390px` 稳定性

### 3. ops cards 从“概况”改成“当前真实边界”

原来的 `OPS 01 / 02 / 03` 里有明显的总结态表达，例如：

- `frontdoor 模板化`
- `还没完全贴齐参考稿`
- `还要继续填深`

这些方向没错，但还不够“状态页”。

现在把它们收成：

- `当前主线`
  - `栈: Next / React / TS`
  - `内容层: route pack + types + barrel`
- `390px 基线`
  - `/daily-latin = 1591`
  - `/dance-os = 1597`
  - `/dashboard = 1600`
- `当前边界`
  - `生产: 旧站继续保留`
  - `内容: 继续填 Daily / Dance / Dashboard`

这让底部运维判断更像当前项目运行态，而不是一般性的策略口号。

### 4. proof / risk / gate 继续换成更实的工程状态

本轮也同步改写了 `DecisionSignalData`：

- `proof`
  - 不再只说“旧站、新 frontdoor 和 demo 分支已成形”
  - 而是明确写出：
    - 旧站 live
    - 8 routes fresh-prod 已过
    - 10 files / route-scoped
- `risk`
  - 不再只说“页面继续扩散”
  - 而是明确写成：
    - 参考稿贴近度仍不够
    - `Dashboard` 仍有计划态语言风险
    - 扩页快于压实现有 route
- `gate`
  - 不再只停在“样式 / 内容 / 产品”
  - 而是进一步明确：
    - 当前下一道移动门槛先看 `/dashboard`
    - `390px` broad baseline 继续收口

## 额外验证事实

### 1. `typecheck` 的一次失败不是代码回归

第一次执行时，`pnpm typecheck` 报：

- `.next/types/app/.../page.ts not found`

原因不是这轮 dashboard 内容改坏了，而是：

- 我把 `typecheck` 和 `build` 并行跑了
- `build` 正在重写 `.next/types`
- `tsc` 同时读取这些文件，触发竞态

因此这轮再次确认：

- `typecheck` 与 `build` 不应该并行当作最终证据
- 最终验证必须按串行顺序执行

### 2. `next start` 必须在 build 后 fresh restart

这轮也再次确认了另一条硬规则：

- `build` 之后如果沿用旧的 `next start`
- 浏览器 smoke 可能拿旧 manifest 去请求已失效 chunk
- 会出现 `Loading chunk ... failed`

所以本轮最终验证采用的是：

1. `pnpm typecheck`
2. `CI=1 pnpm build`
3. kill 旧 `next start`
4. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
5. 再跑 route / browser / structure smoke

## 视觉复核

因为本轮改的是 `dashboard` 文案密度，额外做了截图复核：

- desktop screenshot:
  - `/tmp/latinos-dashboard-desktop.png`
- mobile screenshot:
  - `/tmp/latinos-dashboard-mobile.png`

移动端复核结论：

- 新指标与新 card 文案虽然更实、更密
- 但 `390px` 下整体层次仍保持可读
- 没有把当前 compact 节奏直接挤坏

## 验证

最终通过链路：

- `pnpm typecheck`: pass
- `CI=1 pnpm build`: pass
- fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`: pass
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`: pass
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`: pass
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`: pass

## 结论

这轮没有新增 route，也没有继续扩大功能面，但它把 `dashboard` 从更泛的“项目说明”推进成了更真实的“运行状态面板”：

- 指标更像当前工程事实
- 风险更像当前真实阻力
- gate 更像当前真正在卡的门槛
- 当前运维判断更贴近今天这条线的真实推进状态

这比继续补抽象说明更符合：

- 用本地真实资料替换模板文案
- 让 route 内容越来越像真实前台，而不是概念页

## 下一步

下一轮更适合继续推进的方向：

1. 继续把 `daily.ts` 和 `dance.ts` 里仍偏计划态的区域换成更真实的本地资料表达
2. 继续回到 `390px` compact loop，优先看当前最厚的 `/dashboard`
3. 如果继续改 dashboard，优先用更多当前验证事实替代一般性项目语言，而不是继续加解释段落
