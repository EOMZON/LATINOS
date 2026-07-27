# Daily Loop Mobile Output And State Density Pass

## 背景

上一轮完成 `daily-sources` 组件层修复之后，fresh `390px` 重新测量显示：

- `/daily-latin = 2267`
- `/dashboard = 2264`
- `/dance-os = 2220`
- `/ = 1513`

这意味着当前 broad mobile Top1 实际上已经不是“大幅掉队”，而是：

- `/daily-latin 390` 只比 `/dashboard 390` 高 `3`

因此这轮不适合再做结构动作，而更适合：

**继续沿着 `Today Loop Demo` 做一组 very small compact pass，把 `/daily-latin 390` 正式压到 `/dashboard 390` 之下。**

## 问题定义

这轮要解决的不是：

- 新增功能
- 重写 `DailyLoopDemo`
- 调整 route 结构

这轮真正要解决的是：

**在不碰交互逻辑的前提下，把 `Today Loop Demo` 在 `390px` 下仍然偏“解释板”的几层压回 reference 那种 dense workbench 语言。**

进一步拆量后，问题分三层：

1. `daily-latin` 当前最厚单块仍是：
   - `#today-loop-demo = 421.88`
2. 它内部右侧 `ledger-output` 仍偏厚：
   - `287.83`
3. 在右侧收薄之后，新的瓶颈继续收敛到左侧 `STEP 1`
   - 主要被状态按钮长标签撑高

## 为什么这轮选这个点

当前 `/daily-latin` 与 `/dashboard` 只差几像素时，再去碰：

- `daily-library`
- `legacy-daily-principles`
- `live-return`

都不是最高 ROI。

最值得继续收的是：

- 当前全页最大的单块
- 且仍有 compact 解释层残留

也就是：

- `Today Loop Demo`

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/daily-loop-demo.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. 把 `DailyLoopDemo` 输出区的 compact 文案收回数据层

为 `dailyDemoStates` 增加：

- `compactEntry`
- `compactGoal`
- `compactNextStep`

为 `dailyDemoDances` 增加：

- `compactWitness`

作用：

- compact 状态下不再硬用完整版说明句
- 输出区在移动端直接走更短的真实数据句
- 继续强化“数据层决定内容密度”的边界

### 2. `ledger-output` 里的解释层再收一层

在 `compact` 状态下：

- 不再渲染 `DAILY LOOP PLANNER` 下的解释 copy
- 不再渲染 note 区上方的独立 label
- note placeholder 和 score copy 同步压短

作用：

- 输出区更像结果台
- 不再像一块保留完整说明文案的解释板

### 3. `STEP 1 / STEP 2` 的 compact copy 直接拿掉

在 `compact` 状态下：

- `STEP 1` 的 copy 不再渲染
- `STEP 2` 的 copy 不再渲染

作用：

- 左侧三步卡从“标题 + 解释 + 按钮”继续推向“标题 + 选择”
- 更贴近 reference 的 mobile dense shell

### 4. `STEP 1` 状态按钮改走数据层短标签

为 `dailyDemoStates` 新增：

- `compactLabel`

分别收成：

- `完全新手`
- `断练重启`
- `已有卡点`
- `刚看直播`

并且只在 compact 状态使用。

作用：

- 避免 `390px` 下长标签换成两行
- 不靠暴力缩字，而是由数据层提供更适合 compact 的真实命名

### 5. 只对 `daily-latin 390` 做 very small shell pass

继续对当前 route 的 `390px` compact 语言做极小幅收口：

- `choice-grid:not(.compact) .choice-btn`
  - `min-height: 36px -> 34px`
  - padding 同步略降
- `#today-loop-demo .compact-sec-head .more`
  - 在 `390px` 下直接隐藏

作用：

- 不是全站改 header 规则
- 只是把 `today-loop-demo` 这节在手机端本就重复的一行说明收回内容区

## 量化结果

### fresh `390px` 路由高度

这一轮前：

- `/daily-latin = 2267`
- `/dashboard = 2264`

这一轮后：

- `/daily-latin = 2244`
- `/dashboard = 2264`

也就是说：

- `/daily-latin 390`
  - `2267 -> 2244`

并且已经正式低于：

- `/dashboard 390 = 2264`

### `Today Loop Demo`

这一轮前：

- `#today-loop-demo = 421.88`

这一轮后：

- `#today-loop-demo = 398.44`

也就是说：

- `421.88 -> 398.44`

### `STEP 1` 按钮标签

这一轮前：

- `已经有具体卡点`
- `刚看完直播 / 切片`

会在 `390px` 下变成两行

这一轮后：

- `已有卡点`
- `刚看直播`

全部回到单行，label height 统一到：

- `14.72`

## 验证

这轮通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

其中 fresh `3200` browser smoke 继续确认：

- home hero 正常
- dance-os 关键交互正常
- daily loop demo 关键交互正常
- dashboard dense sections 正常
- home next session queue 正常
- mobile shell 正常
- mobile home 无横向 overflow
- mobile daily-latin 无横向 overflow

## 结论

这轮最重要的价值不是“再抠几个像素”。

而是：

1. 把 `Today Loop Demo` 从解释型输出区继续推向 reference 的 dense workbench 输出区
2. 用数据层短标签，而不是全局粗暴缩字，解决 `STEP 1` 的 compact 标签换行问题
3. 让 `/daily-latin 390` 正式低于 `/dashboard 390`
4. 在不碰逻辑、不碰架构、不回退组件边界的前提下，继续把 mobile route density 拉齐

## 下一步

下一轮更值得继续做的是：

1. fresh 重新测一次完整 `390px` sweep
   - `/`
   - `/daily-latin`
   - `/dashboard`
   - `/dance-os`
2. 如果现在 broad mobile Top1 已切回 `/dashboard`
   - 优先回 `/dashboard 390`
   - 看 `Witness Archive` 或 `Route Map`
3. 如果 route-level 390 密度已经进一步拉齐
   - 切回整站 completion 视角
   - 继续收首页与二级页的“近似同款完成度”
