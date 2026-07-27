# Daily Live Return CTA Tight Pass

## 背景

在 `Dashboard Proof Risk Gate Compact Copy Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1513`
- `/daily-latin = 1948`
- `/dashboard = 1942`
- `/dance-os = 1930`

这意味着新的 broad mobile Top1 切回：

- `/daily-latin = 1948`

继续拆 `/daily-latin` 内部高度后，当前更厚的几块是：

- `#today-loop-demo = 318.55`
- `#daily-library = 185.58`
- `#live-return-bridge = 180.98`

进一步拆 `#live-return-bridge` 后确认：

- `.daily-return-mode-card = 113.69`
- `h4 = 33`
- compact CTA 里仍有两处换行：
  - `看 Archive`
  - `桥接 Dance`

因此这轮没有继续碰布局，而是继续追：

- compact CTA 文案

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/daily-return-board.tsx`

只在 compact 场景收短两个 CTA：

- `看 Archive -> 看归档`
- `桥接 Dance -> 去 OS`

这轮没有去碰：

- 其他 route
- 默认长 CTA
- layout / grid / gap
- 组件结构

## 验证结果

这轮通过：

- `pnpm typecheck`
- `pnpm build`
- fresh `next start --hostname 127.0.0.1 --port 3200`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
- fresh `390px` remeasure

## 量化结果

fresh `390px` broad sweep：

- `/ = 1513`
- `/daily-latin = 1936`
- `/dashboard = 1942`
- `/dance-os = 1930`

对应量化收益：

- `/daily-latin 390`
  - `1948 -> 1936`
- `#live-return-bridge`
  - `180.98 -> 169.14`

其余关键 section 保持：

- `#today-loop-demo = 318.55`
- `#daily-library = 185.58`
- `#daily-sources = 168.06`

## 这轮成立的结论

- `Live Return` 这块当前剩余高度里，CTA 换行仍然是有效支配因素
- 继续沿数据层 very small pass 追，收益仍然真实
- 这轮属于影响面极小、验证完整的 compact 收口

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 再次切回：

- `/dashboard = 1942`
- `/daily-latin = 1936`
- `/dance-os = 1930`

## 下一步

- 回到 `/dashboard`
- 优先继续看：
  - `#dashboard-structure-bar = 182.19`
  - `#dashboard-route-map = 174.75`
  - `#dashboard-guardrails = 172.69`
- 仍然只做 very small pass 或数据层 compact pass
