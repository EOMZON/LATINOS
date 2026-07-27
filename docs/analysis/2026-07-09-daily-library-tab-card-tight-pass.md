# Daily Library Tab Card Tight Pass

## 背景

在 `Dashboard Route Map Shell Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1927`
- `/dashboard = 1910`
- `/dance-os = 1897`

这意味着新的 broad mobile Top1 切回：

- `/daily-latin = 1927`

继续拆 `daily-latin` 后，当前更值得追的 section 是：

- `#daily-library = 185.58`

进一步拆内部后确认：

- `tabs = 36.39`
- `grid = 115`
- `card = 56`

这说明当前更值得继续收的是：

- tab 壳体
- move card 最小高度

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

只对 `390px` 下 `#daily-library` 做 very small shell pass：

- 收 `compact-tabs gap / margin-bottom`
- 收 `compact-tabs .tab` 字级和 padding
- 收 `compact-move-card min-height`
- 收 `compact-move-card padding`

没有改：

- tab 交互逻辑
- 数据文案
- 其他 `daily-latin` section

## 验证动作

按既定链路 fresh 验证：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh `390px` remeasure

## 量化结果

fresh `390px` broad sweep：

- `/ = 1513`
- `/daily-latin = 1920`
- `/dashboard = 1910`
- `/dance-os = 1897`

对应量化收益：

- `/daily-latin 390`
  - `1927 -> 1920`
- `#daily-library`
  - `185.58 -> 178.12`

其余 `daily-latin` sections 保持：

- `#today-loop-demo = 309.55`
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

- `daily-library` 当前剩余高度确实还来自 tab 壳体和 card shell，而不是组件逻辑
- 这类 section-specific `390px` very small pass 仍然能稳定拿到收益
- 这轮后 broad mobile Top1 仍然是：
  - `/daily-latin = 1920`

## 下一步

下一轮优先建议：

1. 继续留在 `/daily-latin`
2. 优先追：
   - `#today-loop-demo`
   - `#live-return-bridge`
   - `#daily-sources`
3. 仍然优先用 very small pass 或 compact data/component pass
