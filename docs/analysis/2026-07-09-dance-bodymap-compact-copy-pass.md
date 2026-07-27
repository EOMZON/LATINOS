# Dance BodyMap Compact Copy Pass

## 背景

在上一轮 `Daily Live Return Compact Label Pass` 成立之后，fresh `390px` broad mobile heights 是：

- `/ = 1513`
- `/daily-latin = 1841`
- `/dashboard = 1823`
- `/dance-os = 1851`

这意味着当轮 broad mobile Top1 是：

- `/dance-os = 1851`

继续拆 `/dance-os` 后，当前 section 高度是：

- `#correction-ledger-demo = 394.08`
- `#dance-assets = 312.56`
- `#body-map-practice-queue = 309.14`
- `#dance-summary = 174.44`
- `#dance-sources = 142.89`

虽然 `correction-ledger-demo` 仍然最大，但从默认空态和 low-risk very small pass 的角度看，`body-map-practice-queue` 是更稳的收口对象。

## 为什么这轮选 `#body-map-practice-queue`

对默认空态的内部拆解显示：

- `#body-map-practice-queue = 309.14`
- `board = 244.95`
- `panel1 = 244.95`
- `panel2 = 82.92`
- `focusList = 159.03`

进一步拆默认空态文案后发现：

- `panel1 title = 21.19`
  - `把身体问题压成热区，而不是散掉的反馈句`
- `panel2 title = 21.19`
  - `让“下轮继续什么”成为真实可回来的队列`
- `panel2 note = 17.19`
  - `等待第一个 witness`
- 默认空态 focus card 头部：
  - `focus1Head = 43.77`
  - `focus1Count = 21.75`
  - `暂无 witness`

这说明这块当前还有很明显的 compact copy 收口空间：

- 默认空态标题过长
- 等待态标签过长
- `暂无 witness` 在紧凑头部里也偏长

所以这轮不去改结构，不去回写布局层，而是继续走数据/文案级 very small pass。

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/body-map-practice-queue.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/browser-smoke.py`

## 改动策略

### 1. 只对 compact 场景收短 body-map 文案

新增 compact 版本文案：

- `把身体问题压成热区，而不是散掉的反馈句`
  - `-> 把问题压成身体热区`
- `按当前 witness 聚合热区`
  - `-> 按 witness 聚合`
- `让“下轮继续什么”成为真实可回来的队列`
  - `-> 让下轮继续成为队列`
- `等待第一个 witness`
  - `-> 等待 witness`
- `暂无 witness`
  - `-> 暂无`

要求：

- 只影响 `compact`
- 非 compact 场景保持原始表达
- 不改结构与交互逻辑

### 2. 同步修正 browser smoke 断言

由于之前 `browser-smoke.py` 对旧长标题做了写死校验：

- `把身体问题压成热区，而不是散掉的反馈句`

这轮将其同步改为更稳的 section 到达判断：

- `把问题压成身体热区`
  - 或
- `按 witness 聚合`

作用：

- 验证脚本继续服务当前真实前台
- 不让脚本因 compact 文案收短而误报回归

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
- `/daily-latin = 1841`
- `/dashboard = 1823`
- `/dance-os = 1840`

对应量化收益：

- `/dance-os 390`
  - `1851 -> 1840`
- `#body-map-practice-queue`
  - `309.14 -> 298.55`

其余 `dance-os` 关键 section 保持：

- `#dance-summary = 174.44`
- `#dance-assets = 312.56`
- `#correction-ledger-demo = 394.08`
- `#dance-sources = 142.89`

## 为什么这轮成立

这轮成立，因为：

1. `typecheck` 通过
2. `build` 通过
3. `route smoke` 通过
4. `browser smoke` 在同步断言后通过
5. fresh `390px` route 总高真实下降
6. 收益可直接归因到 compact copy 收短，而不是结构层偶然波动

## 结果意义

- `body-map-practice-queue` 的默认空态仍有真实 compact copy 收口空间
- 这轮收益主要来自：
  - panel title 缩短
  - waiting note 缩短
  - focus count 缩短
- 说明在当前阶段，`dance-os` 仍然更适合：
  - 先追默认空态
  - 先追 very small compact pass
  - 再回到更重的 `correction-ledger-demo`

## 下一步

这轮后 fresh broad mobile Top1 仍然是：

- `/daily-latin = 1841`
- `/dance-os = 1840`

也就是：

- `/daily-latin` 和 `/dance-os` 已经进入极小差距竞争

下一轮优先建议：

1. 继续留在 `/dance-os`
2. 优先看：
   - `#dance-assets = 312.56`
   - 或 `#correction-ledger-demo = 394.08`
3. 仍然先做 `390px` very small pass
