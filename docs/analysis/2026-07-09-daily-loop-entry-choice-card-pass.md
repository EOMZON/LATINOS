# Daily Loop Entry Choice Card Pass

## 背景

在 `Daily Library Tab Card Tight Pass` 成立之后，fresh `390px` broad mobile heights 是：

- `/ = 1513`
- `/daily-latin = 1920`
- `/dashboard = 1910`
- `/dance-os = 1897`

这意味着当时的 broad mobile Top1 仍然是：

- `/daily-latin = 1920`

继续拆 `/daily-latin` 后，当前最厚的 section 仍然是：

- `#today-loop-demo = 309.55`

进一步拆内部后确认：

- `stack = 272.36`
- `step1 = 103.42`
- `step2 = 73.42`
- `step3 = 89.52`

并且当前真正支配 `STEP 1 / STEP 2` 的，不再是数据文案，而是：

- 两张 entry / dance card 的壳体高度
- choice grid gap
- choice button 最小高度

## 为什么这轮不继续追 output 区

这轮先试过只收右侧 output shell：

- `result grid`
- `next step`
- `note block`
- `link row`

但在 fresh `390px` remeasure 里：

- `/daily-latin` route 总高没有下降
- `#today-loop-demo` 也没有下降

所以那一刀不算成立，并且已经被回退。

这说明当前更高 ROI 的位置仍然是：

- 左侧 `STEP 1 / STEP 2`

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

只对最终生效的 `390px` `daily-latin` compact 覆盖层做 very small pass：

- 收 `STEP 1 / STEP 2` card padding
- 收 `choice-grid gap / margin-top`
- 收 `choice-btn` padding
- 把 `choice-btn` 高度从 `28px` 收到 `26px`
- 收 `choice-label` 字级和行高

没有改：

- 组件逻辑
- 路由结构
- output planner
- `STEP 3`
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
- `/daily-latin = 1902.78`
- `/dashboard = 1910.17`
- `/dance-os = 1897.22`

对应量化收益：

- `/daily-latin 390`
  - `1920 -> 1902.78`
- `#today-loop-demo`
  - `309.55 -> 292.55`
- `stack`
  - `272.36 -> 255.36`
- `step1`
  - `103.42 -> 93.42`
- `step2`
  - `73.42 -> 66.42`
- `step1 buttons`
  - `[28, 28, 28, 28] -> [26, 26, 26, 26]`
- `step2 buttons`
  - `[28, 28, 28] -> [26, 26, 26]`

其余主要 `daily-latin` sections 保持：

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

- `Today Loop Demo` 当前仍然能稳定靠 `STEP 1 / STEP 2` compact 壳体继续收口
- 右侧 output shell 在当前阶段不是高 ROI 位置
- 这轮后 broad mobile Top1 已经切回：
  - `/dashboard = 1910.17`

## 下一步

下一轮优先建议：

1. 切到 `/dashboard`
2. 优先追：
   - `#dashboard-guardrails = 172.69`
   - `#dashboard-structure-bar = 168.19`
   - `#dashboard-next-actions = 167.84`
3. 仍然优先用 `390px` very small pass 或 compact copy/component pass
