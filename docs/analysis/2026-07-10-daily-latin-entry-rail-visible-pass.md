# Daily Latin Entry Rail Visible Pass

## 背景

当前激活 goal 仍带着“先完成首页 `/`、`/daily-latin`、`/dance-os` 用户可见完成态”的收口要求。

虽然当前唯一主合同已经把默认 `Top 1` 切到 `Dance OS Demo`，但在真正继续回到 demo 主线之前，仍然需要确认核心页里是否还有一个明显值得继续收口的页面。

这轮先做了真实页面对比：

- 参考稿：
  - `/Users/zon/Downloads/latin-workbench (2).html`
- 当前核心页：
  - `/`
  - `/daily-latin`
  - `/dance-os`

在当前桌面端与移动端对比里，`/daily-latin` 的前半段最明显还带着：

- `入口状态`
- `Daily Loop`

两个 section 分开陈列的“说明页感”。

它们各自成立，但放在一起时仍然偏散，不像参考稿那种统一工作台节奏。

## 问题定义

真正要解决的不是再压一点 margin，而是：

**把 `/daily-latin` 前半段的状态分流与起步闭环，收成一个更像参考稿工作台的统一决策区，减少分散感，提升移动端完成态。**

## 这轮改动

### 1. 把前半段收成统一 `entry rail`

文件：

- [page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/daily-latin/page.tsx)

原先是：

- 一个 `入口状态` section
- 一个 `Daily Loop` section

现在改成：

- 一个统一的 `今天从哪里开始 / 这一轮怎么做完` section
- section 内再分成两个 panel：
  - `入口状态`
  - `Daily Loop`

这让页面在视觉上更像：

- 一个单一工作台
- 而不是两段相邻说明块

### 2. 把这一层的文案边界收回 data 层

文件：

- [daily.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/daily.ts)

新增：

- `dailyEntryRail`

把这一轮新增的：

- 大标题
- more copy
- `ENTRY STATES`
- `DAILY LOOP`

这些结构文案继续放回数据层，而不是直接写死在页面里。

### 3. 给新 rail 补专门样式

文件：

- [workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

新增了一组 `daily-entry-rail-*` 样式，让这个区块具备：

- 双 panel 的桌面端结构
- 单列的移动端结构
- 更接近参考稿的 panel 节奏
- 更统一的标题、说明、卡片密度

## 当前结果

这轮后，`/daily-latin` 前半段的判断更新为：

- 不再像两个分散 section 依次往下排
- 更像一个统一的入口工作台
- `状态分流` 与 `Daily Loop` 的关系更清楚
- 在手机端也更容易一眼看懂“今天从哪里开始 / 这一轮怎么做完”

## 验证

在 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 已按串行链再次通过：

1. `pnpm typecheck`
2. `CI=1 pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

其中 `browser-smoke` 继续证明：

- `Daily loop demo` 交互正常
- `Daily return bridge` 交互正常
- mobile `daily-latin` 无横向溢出

## 截图证据

目录：

- `/tmp/latinos-daily-entry-rail-pass-2026-07-10`

文件：

- `daily-desktop.png`
- `daily-mobile.png`

补充对比目录：

- `/tmp/latinos-core-audit-2026-07-10`

里面保留了：

- 参考稿截图
- 当前 `/` / `/daily-latin` / `/dance-os` 的桌面端与移动端对比

## 结论

这轮属于一次真实的核心页 visible pass，而不是隐性整理。

它让 `/daily-latin` 更接近参考稿式工作台，也更符合当前 goal 对“核心页先完成用户可见完成态”的推进要求。

## 下一步

当前更合理的下一步是：

1. 对 `/`、`/daily-latin`、`/dance-os` 再做一次并排验收
2. 判断当前是否还存在一个明显掉队的核心页
3. 如果没有明显掉队页，再按唯一主合同切回：
   - `Dance OS Demo`
   - `witness archive`
   - `queue`
   - `return trigger`
