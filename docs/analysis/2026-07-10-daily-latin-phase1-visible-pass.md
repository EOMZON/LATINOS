# 2026-07-10 Daily Latin Phase 1 Visible Pass

## 背景

在首页 `/` 完成一轮 `Phase 1` visible pass 后，当前下一张最需要做用户可见收口的核心页是：

- `/daily-latin`

原因不是它功能没做完，而是它已经开始出现典型的“系统页症状”：

- 内容很多
- 交互不少
- 但首屏与移动端为了压高度，被压得太扁
- 最重要的 `daily overview / 本页依据 / 入口状态 / Daily Loop / Today Loop Demo` 在手机上已经影响可读性

也就是说，当前要解决的不是“再加模块”，而是：

**把 `/daily-latin` 从压缩实验页收成更像 frontdoor 成品页的可见完成态。**

## 这轮改了什么

本轮主要改动：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/app/daily-latin/page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/daily-latin/page.tsx)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/daily.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/daily.ts)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

### 1. 给 `/daily-latin` 补了一句 frontdoor lead

- 新增 `dailyLead`
- 放在 anchor tabs 下方

作用：

- 不再让页面一上来就只剩 route header + tabs + 大量结构模块
- 先把这页真正负责的 3 件事说清楚：
  - 今天怎么开始
  - 怎么做完一轮
  - 做完后该继续还是桥接到 `Dance OS`

### 2. 首屏 overview 在移动端不再横向挤压

主要改动：

- `compact-detail-daily-top` 在 `<= 860px` 下改回单列
- `RouteStagePanel` 的 metric / signal 区恢复更可读的 spacing
- 首屏 `kv`、subtitle、chips 重新放宽

结果：

- 手机端不再出现 overview 左右强挤、内容截断感很重的状态
- `Daily Latin Demo` 这张首屏说明卡重新可读

### 3. `本页依据` 区域不再像被压扁的规则条

主要改动：

- `compact-source-matrix-daily` 和其 panel / row 恢复更大的 padding
- 手机端字体和行高恢复

结果：

- `真实来源 / 当前入口原则` 不再是高度压缩后的信息块
- 这部分更像 frontdoor 的“依据说明”，而不是内部密文

### 4. 核心解释卡在手机端不再 3 列强塞

主要改动：

- `入口状态`
- `Daily Loop`
- `旧站已验证的起步原则`

在 `<= 860px` 下改为单列卡片，恢复正常的阅读密度。

结果：

- 从“能挤下”回到“能直接读”
- 页面仍然长，但它现在是成品式的可读长，而不是高度驱动的压缩长

### 5. `Today Loop Demo` 在移动端重新拉回可操作状态

主要改动：

- `compact-ledger-shell` 在手机宽度下恢复单列 `ledger-grid`
- `ledger-stack` 回到单列
- `choice-grid`、`daily-task-list`、`ledger-result-grid` 重新放宽
- note field / buttons / text sizes 恢复到更可操作的尺寸

结果：

- 手机端不再把 `entry state / planner` 强塞成双列细条
- 这部分重新像“可用 demo”，而不是“勉强可见的 demo”

### 6. `Live Return / Clip Bridge / Archive Jump` 与动作库重新恢复可读性

主要改动：

- `compact-daily-return-board .daily-return-grid` 改为单列
- mode cards / queue cards 恢复更大的 padding 与字体
- `compact-move-grid` 改为两列
- move card 的 `en / meta` 在手机端恢复显示

结果：

- 回流判断不再挤在狭窄双列里
- 动作库卡片不再像“tiny chips”

## 用户可见结果

这轮之后，`/daily-latin` 的用户可见结果主要有 4 点：

1. 手机端首屏和中段不再被过度压缩
2. 这页更像真正的前台入口页，而不是工程结构页
3. 真实内容、桥接逻辑和 demo 仍然保留，没有为“更好看”而削掉核心逻辑
4. 视觉上更接近参考稿那种“密但可读”的工作台节奏，而不是“密到挤”

## 证据截图

fresh-prod 截图：

- `/tmp/frontdoor-daily-desktop-2026-07-10-phase1-visible-pass.png`
- `/tmp/frontdoor-daily-mobile-2026-07-10-phase1-visible-pass.png`

## 验证

在 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 执行并通过：

1. `pnpm typecheck`
2. `CI=1 pnpm build`
3. kill 旧的 `next start`
4. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
6. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
7. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

并且 `browser-smoke` 仍然证明：

- `mobile daily-latin` 无横向溢出
- Daily loop demo 交互仍正常

## 这轮之后的判断

这轮可以算：

- `Phase 1 / daily-latin visible pass`

但仍然不是：

- `Phase 1 done`

当前更合理的下一步顺序：

1. 判断 `/daily-latin` 是否还需要第二轮结构收口
2. 如果这一版已足够稳，就切到 `/dance-os`
3. 继续遵守：
   - 核心页优先
   - 不回去平均推进辅助页
   - 不提前做 deploy / domain
