# 2026-07-08 Dance OS Correction Compact Pass

## 背景

在 `Dance OS` 上半段 compact pass 之后，新的最大厚块已经非常明确：

- `Correction Ledger Demo`

它的问题不是功能不对，而是：

1. 中段仍然偏厚
2. 文案还是更像解释型面板
3. 没有充分复用当前 frontdoor 已经存在的 compact ledger 控制台层

## 问题定义

真正要解决的不是“重做 correction ledger”，而是：

**让 `Dance OS` 的中段交互直接接入现有 compact workbench 壳，在不破坏交互逻辑的前提下，把它从厚功能块继续推向更像 reference 的控制台。**

## 这轮动作

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/correction-ledger-demo.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dance-os/page.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/browser-smoke.py`

### 1. `CorrectionLedgerDemo` 接入 compact 模式

动作：

- 组件新增：
  - `compact?: boolean`
- `Dance OS` 页面直接传入：
  - `compact`

意义：

- 不再为 `Dance OS` 再造一套新样式
- 直接复用已经成立的 `compact-ledger-shell`
- 更符合“共享层优先”的长期维护原则

### 2. 中段文案同步压成控制台短句

动作：

- `STEP 1 / STEP 2 / STEP 3` 标题缩短
- 输出区主标题缩短
- 描述改成更短的操作说明
- textarea placeholder 同步压短
- recent witness 空状态也更短

意义：

- 不只是“外观更薄”
- 而是阅读节奏也更接近当前 workbench 控制台语言

### 3. recent witness 在 compact 下只保留 1 条

动作：

- compact 模式下 recent witness 改成：
  - `savedWitnesses.slice(0, 1)`

意义：

- 避免右侧输出区继续往下拉长
- 保留“最近一条下一轮证据”即可

### 4. 补一层测试稳固

动作：

- 给 textarea 新增：
  - `data-testid="dance-witness-note"`
- `browser-smoke.py` 不再依赖 placeholder 文案，而改抓这个 `data-testid`

意义：

- 这轮顺手修掉了一个长期维护风险：
  - smoke 不该依赖易变展示文案
- 以后继续压文案时，不会再因为 placeholder 变化把测试打碎

## 量化结果

### 整页高度

这轮前：

- `Dance OS` 桌面端全页：`3728.28`
- `Dance OS` 手机端全页：`8173.25`

这轮后：

- `Dance OS` 桌面端全页：`3219.50`
- `Dance OS` 手机端全页：`7022.02`

也就是说：

- 桌面端下降约：`508.78`
- 手机端下降约：`1151.23`

### 当前 correction section 尺寸

这轮后实测：

- 桌面端 `correction-ledger-demo` section：`734.89`
- 桌面端 `ledger-shell`：`697.48`
- 手机端 `correction-ledger-demo` section：`1731.45`
- 手机端 `ledger-shell`：`1651.88`

判断：

- 这一轮不是小修
- 它实打实把 `Dance OS` 当前最厚的交互块收下来了

## 视觉证据

这轮后桌面端：

- `/tmp/latinos-dance-after-correction-compact-desktop.png`

这轮后手机端：

- `/tmp/latinos-dance-after-correction-compact-mobile.png`

上一轮桌面端：

- `/tmp/latinos-sweep-dance-desktop-after-compact.png`

上一轮手机端：

- `/tmp/latinos-sweep-dance-mobile-after-compact.png`

## 验证

这轮后继续通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`

同时，`pnpm verify` 的产物里已经继续通过：

- route smoke
- prod smoke
- browser smoke

额外确认：

- `Dance OS` correction ledger 交互仍然通过
- `Dance OS` anchors 仍然通过
- 首页 / Daily / Dashboard 没被误伤
- mobile shell 与 overflow 继续稳定

## 这轮后的判断

这轮价值很高，因为它不仅继续把 `Dance OS` 从厚产品页往 workbench route 推进，而且还证明了：

- 共享 compact ledger 层是可复用的
- 不需要为每一页重新造样式体系
- 测试也可以跟着结构一起变得更稳

## 剩余差距

当前仍然不能宣称完成。

剩余更大的差距开始集中到：

1. `Body Map / Practice Queue` 已经成为 `Dance OS` 当前最长的一块
2. `Dance OS` 虽然已经明显变短，但仍比 `Daily Latin` 更重
3. 真实内容回填仍有继续压掉模板感的空间

## 下一步

下一轮优先级：

1. 判断 `Body Map / Practice Queue` 是否值得再 compact 一层
2. 或者切到更高 ROI 的真实内容回填
3. 继续用整站截图与 smoke 判断“现在最不像参考稿的是哪一页 / 哪一块”
