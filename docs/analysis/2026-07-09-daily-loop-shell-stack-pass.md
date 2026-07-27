# Daily Loop Shell Stack Pass

## 背景

在 `Dashboard Structure Bar Second Compact Pass` 成立之后，fresh `390px` broad mobile heights 变成：

- `/ = 1512.92`
- `/daily-latin = 1902.78`
- `/dashboard = 1898.17`
- `/dance-os = 1897.22`

这意味着新的 broad mobile Top1 切回：

- `/daily-latin = 1902.78`

继续 fresh 拆 `/daily-latin` 后，当前 section heights 是：

- `#today-loop-demo = 292.55`
- `#daily-library = 178.13`
- `#live-return-bridge = 169.14`
- `#daily-sources = 168.06`

这说明当前更值得继续追的仍然是：

- `#today-loop-demo`

进一步拆内部后确认：

- `stack = 255.36`
- `step1 = 93.42`
- `step2 = 66.42`
- `step3 = 89.52`

同时继续拆每张 card 后确认：

- 三张 card 当前共同的剩余高度主要来自：
  - `section head`
  - `ledger stack gap`
  - `card padding`
  - `ledger kicker`
  - `card title`

而不是：

- output 区
- 数据文案
- 交互逻辑

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

只对最终生效的 `390px` `daily-latin` compact 覆盖层做 very small shell pass：

- `#today-loop-demo .compact-sec-head`
  - `margin-bottom: 4px -> 3px`
- `.compact-ledger-shell .ledger-stack`
  - `gap: 3px -> 2px`
- `.ledger-stack > .ledger-card:nth-of-type(-n+2)`
  - `padding: 4px -> 3px`
- `.ledger-card:nth-of-type(3)`
  - `padding: 4px -> 3px`
- `.ledger-kicker`
  - `font-size: 7.6px -> 7.2px`
  - `margin-bottom: 2px -> 1px`
- `.ledger-card h3`
  - `font-size: 11.6px -> 11.2px`
  - `line-height: 1.06 -> 1.04`
  - `margin-bottom: 1px -> 0`

没有改：

- output planner
- choice button 高度
- 数据层
- 组件逻辑
- 其他 route

## 验证动作

按既定链路 fresh 验证：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh `390px` broad route sweep
7. fresh `#today-loop-demo` internal remeasure

## 量化结果

fresh `390px` broad sweep：

- `/ = 1512.92`
- `/daily-latin = 1892.48`
- `/dashboard = 1898.17`
- `/dance-os = 1897.22`

对应量化收益：

- `/daily-latin 390`
  - `1902.78 -> 1892.48`
- `#today-loop-demo`
  - `292.55 -> 282.25`
- `stack`
  - `255.36 -> 234.56`
- `step1`
  - `93.42 -> 87.16`
- `step2`
  - `66.42 -> 60.16`
- `step3`
  - `89.52 -> 83.25`

其余主要 sections 保持：

- `#daily-library = 178.13`
- `#live-return-bridge = 169.14`
- `#daily-sources = 168.06`

## 为什么这轮成立

这轮成立，因为：

1. `typecheck` 通过
2. `build` 通过
3. `route smoke` 通过
4. `browser smoke` 通过
5. fresh `390px` route 总高真实下降
6. `#today-loop-demo` section 高度真实下降

## 结果意义

- `Today Loop Demo` 当前仍然可以继续靠 shell 层稳定收口
- 这轮继续证明高 ROI 位置仍然不是 output，而是左侧 stack 和 card shell
- 这轮后 `/daily-latin` 已低于：
  - `/dashboard = 1898.17`

## 下一步

下一轮优先建议：

1. 切到 `/dashboard`
2. 优先继续追：
   - `#dashboard-guardrails = 172.69`
   - `#dashboard-next-actions = 167.84`
   - `#dashboard-proof-risk-gate = 165.59`
3. 仍然优先用 `390px` very small pass 或 compact copy/component pass
