# Daily Live Return Compact Pass

## 背景

在上一轮把 `/dashboard 390` 从 `2264` 压到 `2219` 之后，fresh `390px` 全路由 sweep 重新来到：

- `/ = 1513`
- `/daily-latin = 2244`
- `/dashboard = 2219`
- `/dance-os = 2220`

这意味着新的 broad mobile Top1 又回到了：

- `/daily-latin 390 = 2244`

因此这轮不应该继续追 `dashboard`，而应该回到 `daily-latin`，只收当前最厚、最有明确 compact 冗余的 section。

## 问题定义

fresh `390px` 下继续拆 `/daily-latin` 后，两个最厚 section 是：

- `#live-return-bridge = 276.48`
- `#daily-library = 266.22`

进一步拆层后确认：

### `#live-return-bridge`

- section head：
  - `41.19`
- `.compact-daily-return-board`：
  - `230.30`
- `daily-return-metric-strip`：
  - `47`
- `daily-return-grid`：
  - `173.30`
- 3 张 `mode card`：
  - 各约 `113.69`

### `#daily-library`

- section head：
  - `41.19`
- tabs：
  - `36.39`
- library panel：
  - `52.64`
- move grid：
  - `115`

这说明当前更值得继续收的不是 `daily-library`，而是：

- `Live Return / Clip Bridge / Archive Jump`

原因很明确：

1. 它更厚
2. compact 状态下仍然保留了一层“零 witness 时几乎没有信息量”的 metric strip
3. section head 还保留了一整行重复说明

## 为什么这轮选这个点

当前 `/daily-latin 390` 的最高 ROI 不是继续缩卡片字号，而是：

- 去掉 compact 状态下没有证据时的空统计层
- 把重复的头部说明收回内容区

这更符合当前主线：

- 不动逻辑
- 不重排结构
- 不用粗暴全局样式去挤
- 继续通过组件条件渲染 + route-level very small pass 收口

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/daily-return-board.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. `DailyReturnBoard` 在 compact 下只在有 witness 时显示 metric strip

新增：

- `showCompactMetrics = compact && summary.total > 0`

然后把 compact 下顶部统计条改成：

- 只有 `summary.total > 0` 时才渲染

作用：

- 当前 fresh preview 里 `Daily return` 还没有 witness 时
- 不再浪费一整条 `47px` 高的空统计层
- 一旦后续真的有 witness，这层又会自然回来

这比单纯用 CSS 隐藏更稳，因为它让“是否显示”回到组件状态判断。

### 2. 只对 `#live-return-bridge` 的 `390px` section head 做 very small pass

在：

- `@media (min-width:390px) and (max-width:430px)`

下新增：

- `.daily-latin-page #live-return-bridge .compact-sec-head .more{display:none}`

作用：

- 不改全站 section head 规则
- 只移除这一个 section 在移动端重复的一行说明
- 让桥接区更像 dense route bridge，而不是解释面板

## 量化结果

### fresh `390px` 路由高度

这一轮前：

- `/daily-latin = 2244`
- `/dashboard = 2219`
- `/dance-os = 2220`

这一轮后：

- `/daily-latin = 2165`
- `/dashboard = 2219`
- `/dance-os = 2220`

也就是说：

- `/daily-latin 390`
  - `2244 -> 2165`

### `#live-return-bridge`

这一轮后实测：

- section：
  - `197.48`
- `.compact-daily-return-board`：
  - `173.30`
- `daily-return-grid`：
  - `173.30`
- `metric strip exists`：
  - `false`
- section head：
  - `19.19`

对比上一轮：

- `#live-return-bridge`
  - `276.48 -> 197.48`

这说明真正起效的不是“缩一点字”，而是：

1. 去掉无 witness 时的空统计条
2. 去掉 section 头部重复说明

## 新的 fresh `390px` sweep

这轮之后，fresh `390px` 路由高度是：

- `/ = 1513`
- `/daily-latin = 2165`
- `/dashboard = 2219`
- `/dance-os = 2220`

这意味着：

- `/daily-latin` 已经不再是 broad mobile Top1
- 当前新的 broad mobile Top1 切到：
  - `/dance-os = 2220`

同时：

- `/dashboard = 2219`
- `/dance-os = 2220`

这两条 route 已经几乎进入同一档 mobile density。

## 验证

这轮通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- daily loop demo 交互未回退
- daily return bridge 正常
- dashboard dense sections 正常
- dance-os 关键交互正常
- home next session queue 正常
- mobile shell 正常
- mobile home / daily 无横向 overflow

## 结论

这轮最重要的价值不是又收掉一点 padding。

而是：

1. 用组件层条件渲染，把 `Live Return` 在“无 witness”场景下的空统计层真正拿掉
2. 让 `#live-return-bridge` 从功能板继续推向 reference 的 dense route bridge
3. 让 `/daily-latin 390` 从 `2244` 进一步降到 `2165`
4. 继续把三条主 route 的 `390px` 密度拉回同一档

## 下一步

下一轮更值得继续做的是：

1. fresh 再测一次完整 `390px` sweep
2. 重新确认新的 broad mobile Top1：
   - 当前很可能是 `/dance-os = 2220`
3. 如果继续按 route-level mobile ROI 追
   - 优先回看 `/dance-os`
   - 重点看：
     - `#correction-ledger-demo`
     - `#body-map-practice-queue`
4. 如果 route-level mobile density 已进一步拉齐
   - 切回整站“近似同款完成度”的 completion 视角
