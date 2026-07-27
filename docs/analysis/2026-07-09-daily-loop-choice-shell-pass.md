# Daily Loop Choice Shell Pass

## 背景

在 `Dashboard Structure Bar Compact Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1936`
- `/dashboard = 1928`
- `/dance-os = 1930`

这意味着新的 broad mobile Top1 切到：

- `/daily-latin = 1936`

重新拆 `/daily-latin` 后，当前最厚 section 仍然是：

- `#today-loop-demo = 318.55`

继续拆内部后确认：

- `shell = 295.36`
- `stack = 281.36`
- `card1 = 109.42`
- `card2 = 76.42`
- `card3 = 89.52`
- `output = 249.02`

这说明这轮更值得继续追的不是 output 区，而是：

- 左侧 `STEP 1 / STEP 2` 的 choice shell

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

只对 `390px` 下 `Today Loop Demo` 左侧 choice shell 做 very small pass：

- `.choice-grid`
  - `gap`
  - `margin-top`
- `.choice-btn`
  - `min-height`
- `.choice-label`
  - `font-size`
  - `line-height`

没有改：

- 组件逻辑
- 数据结构
- planner output
- 其他 route

## 验证动作

继续补齐并通过：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh `390px` remeasure

## 量化结果

fresh `390px` broad sweep：

- `/ = 1513`
- `/daily-latin = 1927`
- `/dashboard = 1928`
- `/dance-os = 1930`

对应量化收益：

- `/daily-latin 390`
  - `1936 -> 1927`
- `#today-loop-demo`
  - `318.55 -> 309.55`

其他 `daily-latin` sections 保持：

- `#daily-library = 185.58`
- `#live-return-bridge = 169.14`
- `#daily-sources = 168.06`

## 为什么这轮成立

这轮成立，因为：

1. `typecheck` 通过
2. `build` 通过
3. `route smoke` 通过
4. `browser smoke` 通过
5. fresh `390px` route 总高真实下降

## 结果意义

- `Today Loop Demo` 当前仍然可以继续靠 compact shell 收口，而不需要先改动数据结构
- 左侧 choice shell 仍然比右侧 output 更容易拿到稳定收益
- 这轮后 broad mobile heights 已经非常接近：
  - `/daily-latin = 1927`
  - `/dashboard = 1928`
  - `/dance-os = 1930`

## 下一步

下一轮优先级建议改为：

1. fresh 复测 `dance-os`
2. 先追更容易拿到 `3px+` 收益的 section
3. 优先看：
   - `#dance-assets = 358.91`
   - `#dance-sources = 175.89`
