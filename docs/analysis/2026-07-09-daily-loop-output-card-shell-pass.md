# Daily Loop Output Card Shell Pass

## 背景

在上一轮 `Daily Sources Panel Shell Pass` 成立之后，fresh `390px` broad mobile heights 是：

- `/ = 1513`
- `/daily-latin = 1825`
- `/dashboard = 1823`
- `/dance-os = 1840`

这意味着当轮 broad mobile Top1 仍然是：

- `/daily-latin = 1825`

继续拆 `/daily-latin` 后，当前 section 高度是：

- `#today-loop-demo = 267.47`
- `#daily-sources = 158.06`
- `#live-return-bridge = 153.14`
- `#daily-library = 151.53`

## 为什么这轮继续选 `#today-loop-demo`

对 `#today-loop-demo` 的默认空态再次细拆后确认：

- `section = 267.47`
- `shell = 245.28`
- `grid = 231.28`
- `stack = 226.31`
- `card1 = 83.16`
- `card2 = 58.16`
- `card3 = 81.00`
- `output = 231.28`

进一步拆 output 区：

- `resultGrid = 95.97`
- `result1 = 46.98`
- `result2 = 46.98`
- `result3 = 46.98`
- `result4 = 46.98`
- `nextStep = 31.92`
- `noteBlock = 27.08`
- `linkRow = 21.84`

而当前最终命中的 `390px` 层里：

- `.ledger-result-card / .ledger-next-step / .witness-item { padding: 4px }`
- `.ledger-result-label { margin-bottom: 2px }`

说明 output shell 仍有明显的 very small 收口空间。

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

只在最终命中的 `@media (min-width:390px) and (max-width:430px)` 覆盖层里，对 `Today Loop Demo` 右侧 output shell 做 very small pass：

- `.ledger-result-card`
- `.ledger-next-step`
- `.witness-item`
  - `padding: 4px -> 3px`
- `.ledger-result-label`
  - `margin-bottom: 2px -> 1px`

没有改：

- route 结构
- 数据文案
- 交互逻辑
- 其他 section

## 验证动作

按既定串行链验证：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh `390px` remeasure

## 量化结果

fresh `390px` broad mobile heights：

- `/ = 1513`
- `/daily-latin = 1820`
- `/dashboard = 1823`
- `/dance-os = 1840`

对应量化收益：

- `/daily-latin 390`
  - `1825 -> 1820`
- `#today-loop-demo`
  - `267.47 -> 262.50`

其余关键 section 保持：

- `#daily-sources = 158.06`
- `#live-return-bridge = 153.14`
- `#daily-library = 151.53`

## 为什么这轮成立

这轮成立，因为：

1. `typecheck` 通过
2. `build` 通过
3. `route smoke` 通过
4. `browser smoke` 通过
5. fresh `390px` route 总高真实下降
6. 收益可以直接归因到 output card shell 收紧

## 结果意义

- `today-loop-demo` 仍然存在可重复拿收益的 output shell 空间
- `/daily-latin` 这一轮终于被压到低于 `/dashboard`
- broad mobile Top1 已切换

## 下一步

这轮后 fresh broad mobile heights 是：

- `/daily-latin = 1820`
- `/dashboard = 1823`
- `/dance-os = 1840`

下一轮优先建议：

1. 切到 `/dance-os` 或 `/dashboard` 做 fresh broad Top1 复核
2. 如果以最高 route 为准：
   - `/dance-os = 1840`
3. 如果以“下一名可快速反超”策略为准：
   - `/dashboard = 1823`
4. 仍然先做 `390px` very small pass
