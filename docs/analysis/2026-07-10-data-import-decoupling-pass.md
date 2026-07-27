# 2026-07-10 `data` import decoupling pass

## 背景

上一轮已经把：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`

从单一超大文件拆成了：

- `types.ts`
- `home.ts`
- `legacy.ts`
- `daily.ts`
- `dance.ts`
- `tools.ts`
- `roadmap.ts`
- `dashboard.ts`
- `about.ts`

但当时还保留了一个明显的中间态：

- 绝大多数 page 和 component 依旧继续从 `@/data/content` 导入

这意味着：

- 文件虽然拆了
- 但依赖边界还没有真的收紧

换句话说，结构上还是容易让 AI 继续把它当成一个“统一大内容出口”，而不是按 route / 类型职责精确修改。

## 本轮目标

让“内容层模块化”从文件层落到依赖层：

1. route page 只直接读取自己对应的 route 数据模块
2. 通用组件只直接读取 `data/types`
3. 只有确实需要跨 route 聚合时，才继续经过统一出口

## 本轮改动

### 1. route page 直接连 route 数据模块

以下页面不再从 `@/data/content` 读值，而改为直接读取自己的 route 模块：

- [app/page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/page.tsx)
  - `@/data/home`
- [app/daily-latin/page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/daily-latin/page.tsx)
  - `@/data/daily`
- [app/dance-os/page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dance-os/page.tsx)
  - `@/data/dance`
- [app/dashboard/page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dashboard/page.tsx)
  - `@/data/dashboard`
- [app/legacy/page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/legacy/page.tsx)
  - `@/data/legacy`
- [app/roadmap/page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/roadmap/page.tsx)
  - `@/data/roadmap`
- [app/tools/page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/tools/page.tsx)
  - `@/data/tools`
- [app/about/page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/about/page.tsx)
  - `@/data/about`

这一步的价值不是代码更短，而是以后 AI 改某一条 route 时，会自然先进入对应的数据模块，而不是再次从通用大出口里模糊搜索。

### 2. 通用组件只读 `data/types`

以下组件改为直接从：

- `@/data/types`

导入类型，而不再依赖 `@/data/content`：

- cards:
  - `asset-card.tsx`
  - `course-card.tsx`
  - `decision-card.tsx`
  - `home-module-card.tsx`
  - `info-card.tsx`
  - `metric-card.tsx`
  - `move-card.tsx`
  - `route-signal-card.tsx`
- sections:
  - `detail-panel.tsx`
  - `home-hero.tsx`
  - `route-stage-panel.tsx`
  - `source-matrix.tsx`
  - `source-panel.tsx`
- features:
  - `body-map-practice-queue.tsx`
  - `correction-ledger-demo.tsx`
  - `daily-loop-demo.tsx`
  - `hashed-asset-gallery.tsx`
  - `tabbed-move-library.tsx`

这意味着通用组件现在只依赖 schema，不依赖具体内容分发层。

### 3. feature 组件直接连更精确的数据模块

以下组件改为直连更合适的数据源：

- [components/feature/next-session-queue.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/next-session-queue.tsx)
  - `homeQueueFallbacks` 改为来自 `@/data/home`
- [components/feature/witness-archive-board.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/witness-archive-board.tsx)
  - `homeQueueFallbacks` 改为来自 `@/data/home`
- [components/feature/daily-return-board.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/daily-return-board.tsx)
  - `dailyReturnModeSeeds` 改为来自 `@/data/daily`

这比继续统一走 `content.ts` 更符合“功能属于哪条线，就连哪条线的数据源”。

## 额外修复：browser smoke 对齐当前真实结构

本轮顺手修了：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/browser-smoke.py](/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/browser-smoke.py)

### 修复点 1

原来仍把：

- top anchor `#dance-sources`

和：

- asset gallery sources tab `#sources`

混成同一件事。

现在改成分别验证：

1. 顶层 route anchor 能跳到 `#dance-sources`
2. 资产库 tab 能切到 `#sources`

### 修复点 2

原来 `Daily Latin` 用：

- `text_is_visible("Today Loop Demo")`

做 loop demo section 断言。

现在改成更稳定的结构断言：

- `#today-loop-demo` 存在
- `#today-loop-demo h2` 可见

## 验证时发现的一个重要事实

第一次重跑 browser smoke 时曾出现：

- `Loading chunk 728 failed`

这不是代码回归，而是验证顺序问题：

- 我在完成新 build 之后，短暂沿用了旧的 `next start` 进程
- 浏览器因此拿到了旧 build manifest
- 随后请求已经被新构建替换掉的 chunk，触发 `400` 和 chunk load failure

因此本轮再次确认一条重要执行规则：

### 正确顺序必须是

1. `pnpm typecheck`
2. `pnpm build`
3. kill 旧 `next start`
4. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
5. 再跑 `smoke:routes / smoke:browser / structure-smoke`

否则会出现“代码没坏，但验证链拿着旧 manifest 自己把自己打碎”的假失败。

## 本轮验证

在 fresh prod 顺序下，本轮全部通过：

- `pnpm typecheck`: pass
- `CI=1 pnpm build`: pass
- fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`: pass
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`: pass
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`: pass
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`: pass

## 结论

这一轮的价值在于：

- 内容层不只是“物理拆文件”
- 依赖层也真正开始按 route / schema / feature 变窄
- 以后 AI 修改 route 时，工作上下文会更聚焦
- `browser-smoke` 也重新对齐到当前真实前台结构
- fresh-prod 验证顺序被再次证明是硬约束，不是可省略习惯

## 下一步

更适合继续推进的方向：

1. 继续把 `daily.ts / dance.ts / dashboard.ts` 里模板感仍然较强的区域替换成更真实的本地资料表达
2. 在当前结构更清楚的前提下，继续推进 `390px` mobile compaction loop
3. 之后可以考虑把 `workbench.css` 再从依赖层面继续收口，而不是长期保持单个超大样式文件
