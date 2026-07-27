# Home Workbench Shell Visible Pass

## 背景

在上一轮完成 `/daily-latin` 的 `entry rail` visible pass 后，当前核心页继续并排验收：

- `/`
- `/daily-latin`
- `/dance-os`

结合当前参考稿：

- `/Users/zon/Downloads/latin-workbench (2).html`

可以确认：

- `/dance-os` 已经更像一个聚焦 demo 页
- `/daily-latin` 前半段已经收成统一入口板
- 当前还最像“差最后一轮 frontdoor 收口”的，是首页 `/`

首页的问题不在 hero，也不在热力图，而在下半段工作台：

- 队列是一块
- 入口卡是一排
- 托底卡又是一排

虽然信息都在，但还偏像“几块内容拼在一起”，不像参考稿那种单一 frontdoor 壳。

## 问题定义

真正要解决的不是再压一轮间距，而是：

**把首页下半段的工作台收成一个有外壳、分层明确的统一入口板，让首页更像 frontdoor，而不是信息清单。**

## 这轮改动

### 1. 首页工作台加统一外壳

文件：

- [page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/page.tsx)
- [workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

原先首页工作台部分是：

- intro
- queue
- featured modules
- support modules

按顺序直接往下堆。

现在改成：

- 一个统一的 `home-workbench-board-shell`
- shell 内再组织：
  - intro
  - queue
  - `今天先进入`
  - `保持结构`

这让首页下半段不再像几个分散 section，而更像一个单一承接面。

### 2. 给模块分成两层语义

文件：

- [home.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/home.ts)

给 `homeWorkbench` 新增了两层语义文案：

- `TODAY ENTRY / 今天先进入`
- `KEEP STRUCTURE / 保持结构`

这样首页模块不再只是：

- 上排 3 个
- 下排 3 个

而是有了明确结构：

- 第一层：今天真正要点进去开始的入口
- 第二层：来源、路线、状态这些 frontdoor 托底层

### 3. 工作台更像单一入口板

文件：

- [workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

这轮新增的样式主要做了：

- 工作台外壳背景与边界
- `home-module-rail-*` 的层级样式
- mobile 下的分层堆叠规则
- `KEEP STRUCTURE` 区的分隔

目标不是装饰，而是把视觉结构拉回参考稿的节奏：

- 先看入口
- 再看当前可继续的一轮
- 再看托底模块

## 当前结果

这轮后，首页 `/` 的变化是：

- 工作台下半段不再像“队列 + 两组卡片”的散装组合
- 更像一个完整 frontdoor board
- `今天先进入` 和 `保持结构` 的职责更清楚
- 移动端下半段也更像一个连续入口壳，而不是切断的几块模块

## 验证

在 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 已再次串行通过：

1. `pnpm typecheck`
2. `CI=1 pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

其中：

- `home hero visible`
- `home next session queue updates from archive`
- mobile `homeOverflow`

仍然全部通过。

## 截图证据

目录：

- `/tmp/latinos-home-workbench-shell-pass-2026-07-10`

文件：

- `home-desktop.png`
- `home-mobile.png`

补充对比目录：

- `/tmp/latinos-core-audit-2026-07-10`

## 结论

这轮属于首页 `/` 的一次真实 visible pass。

它没有继续平均去改其他页面，而是只服务当前最值得收口的核心页，把首页进一步拉向参考稿式 frontdoor。

## 下一步

当前更合理的下一步是：

1. 再对 `/`、`/daily-latin`、`/dance-os` 做一次并排验收
2. 判断当前是否还存在一个明显掉队的核心页
3. 如果核心页已没有明显掉队页，再切回：
   - `Dance OS Demo`
   - `witness archive`
   - `queue`
   - `return trigger`
