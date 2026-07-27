# Daily / Dashboard 390 Rotation Continuation Pass

## 背景

在上一轮稳定基线里，fresh `390px` sweep 仍然是：

- `/` = `1513`
- `/daily-latin` = `2407`
- `/dashboard` = `2380`
- `/dance-os` = `2220`

这说明当前 broad mobile Top1 仍然是：

- `/daily-latin 390 = 2407`

但它和 `/dashboard 390 = 2380` 已经只差 `27`。

所以这轮不适合再做大改，而更适合：

**继续沿 `390px` 的 dense workbench 语言做两到三次 very small pass，把 `daily-latin` 和 `dashboard` 都再往参考稿拉近一层。**

## 问题定义

这轮只做：

1. `daily-latin`
   - 继续收 `Today Loop Demo`
2. `dashboard`
   - 继续收 `Witness Archive`
3. 然后再回 `daily-latin`
   - 去掉剩余的解释型 helper copy

不做：

- 路由结构调整
- 组件逻辑重写
- 数据结构改造
- 大面积页面重排

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. `daily-latin 390` 先收 `STEP 3`

观察当前手机端截图后，最明显的浪费不是整个 demo，而是：

- `STEP 3 · START LOOP`
- 任务卡被挤成 `4` 列极窄小柱
- 单卡宽度只有约 `36px`
- 文案被迫竖着堆高

因此这轮把：

- `daily-task-list`
  - 从 `4` 列改成 `2` 列
- `daily-task-toggle`
  - 对齐方式更紧
  - gap 更小
- `daily-task-copy`
  - 继续压短
- 空的 `compact-recent-empty`
  - 在 `390` 下直接隐藏

结果是：

- `STEP 3` 不再像 4 根竖条
- 更像一个真正可扫读的 compact task grid

### 2. `dashboard 390` 只收 `Witness Archive`

测量与截图都表明当前 `dashboard` 最厚的单块是：

- `Witness Archive`

而它的厚度主要来自：

- 重复 intro copy
- 每张 archive 小卡还保留独立 CTA
- 每张小卡还保留 context 行

因此这轮只在 `390px` 下收：

- `.archive-copy`
  - 直接隐藏
- `.archive-item-context`
  - 直接隐藏
- `.archive-item .archive-actions`
  - 直接隐藏
- `archive-latest`
  - 再收一点 margin

保留：

- summary
- latest witness
- 顶部两个 route 入口按钮

也就是说：

- 保留“共享 witness 层”的结构
- 去掉手机端重复说明和重复入口

### 3. `daily-latin 390` 再收 helper copy

在 `STEP 3` 已经明显变薄后，剩下最像解释板的仍然是：

- `STEP 1`
- `STEP 2`
- `DAILY LOOP PLANNER`

里的单行 helper copy。

这轮继续只在 `390px` 下把：

- `.daily-latin-page .compact-ledger-shell .ledger-copy`
  - 直接隐藏

这样做的目标不是删信息，而是让当前 demo 更像：

- dense workbench

而不是：

- 每格都保留一行解释

## 量化结果

### 第一轮：收 `daily-latin` 的 `STEP 3`

#### 整页

- `/daily-latin 390`
  - `2407 -> 2367`

#### 关键块

- `Today Loop Demo`
  - `483.27 -> 443.12`
- `STEP 3`
  - `175.55 -> 135.41`
- `ledger-output`
  - `312.86 -> 298.45`
- `daily-task-list`
  - `128.12 -> 87.98`
- 单个 `task card`
  - `128.12 x 36.06`
  - 变成 `48.39 x 74.62`

结论：

- 这一轮不是简单缩字体
- 而是把当前最低效的 `4` 列极窄任务栅格改回真正可用的 compact grid

### 第二轮：收 `dashboard` 的 `Witness Archive`

#### 整页

- `/dashboard 390`
  - `2380 -> 2338`

#### 关键块

- `Witness Archive`
  - `326.83 -> 284.48`
- `.archive-board`
  - `278.64 -> 236.30`
- `.archive-panel`
  - `232.64 -> 190.30`
- `.archive-list`
  - `77.06 -> 45.27`

结论：

- 这轮最大收益来自：
  - 去掉手机端重复说明层
  - 去掉每张小卡的独立 CTA

### 第三轮：`daily-latin` 再收 helper copy

#### 整页

- `/daily-latin 390`
  - `2367 -> 2345`

#### 关键块

- `Today Loop Demo`
  - `443.12 -> 421.88`
- `ledger-output`
  - `298.45 -> 287.83`

结论：

- 这轮是 very small pass
- 但它继续把 `Today Loop Demo` 从“解释板”往“工作台”推进了一层

## 这轮后的 fresh 390 sweep

- `/` = `1513`
- `/daily-latin` = `2345`
- `/dashboard` = `2338`
- `/dance-os` = `2220`

当前新的 broad mobile Top1 仍然是：

- `/daily-latin 390 = 2345`

但它现在只比 `/dashboard 390 = 2338` 高：

- `7`

这说明当前三条主 route 的 `390px` 密度已经非常接近同一档位。

## 视觉证据

- `/tmp/daily-latin-390-after-step3-pass.png`
- `/tmp/dashboard-390-after-witness-pass.png`
- `/tmp/daily-latin-390-after-helper-copy-pass.png`

## 验证

这轮之后通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- `DailyLoopDemo` 交互未回退
- `dashboard witness archive` 仍正常渲染
- mobile shell 正常
- mobile home / daily 无横向 overflow

## 结论

这轮最重要的价值不是“又压短一点”。

而是：

1. 把 `daily-latin` 当前最浪费的 `STEP 3` 窄柱布局改成真正可用的 compact grid
2. 把 `dashboard` 当前最厚的 `Witness Archive` 变成更接近 reference 的 preview monitor
3. 让 `daily-latin` 与 `dashboard` 在 `390px` 下几乎进入同一密度档位

## 下一步

下一轮更值得继续做的是：

1. 再回 `daily-latin 390`
   - 优先看：
     - `#live-return-bridge`
     - `#daily-library`
2. 或者切回整站 completion 视角
   - 重新判断首页 desktop/mobile 的最终完成感是否又重新成为更高 ROI gap
