# 2026-07-10 `data/content` modularization pass

## 背景

当前 `LATINOS frontdoor` 已经不再是单文件页面，也已经具备：

- `Next.js App Router`
- 真实路由
- 组件化页面层
- 独立 demo 组件
- `styles/tokens.css` + `styles/workbench.css`

但内容层仍有一个明显的长期维护风险：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`

这个文件此前已经达到约 `1580` 行。

它虽然比把内容硬写进页面里更好，但对长期 Goal 模式和后续 AI 接手来说，仍然有几个问题：

1. 一次改某个 route 文案时，很容易误碰其他 route 的内容
2. 内容虽与组件分离，但还没有与“route / 主题职责”进一步分离
3. 后续想继续回填真实资料时，单文件搜索和上下文负担都偏大
4. 很容易又退回“一个大内容池 + 各页面从中随便捞”的模糊维护方式

## 本轮目标

不改变现有页面行为、不改现有导入接口的前提下，把内容层进一步收口成清晰的模块边界。

目标不是“重写内容”，而是：

- 让数据层更像长期资产层
- 让 AI 后续可以按 route 或主题精确修改
- 保持现有 `@/data/content` 导入方式继续可用

## 改动

### 1. 拆出类型层

新增：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/types.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/types.ts)

这里承接原先 `content.ts` 顶部的全部共享类型，包括：

- `InfoCardData`
- `HomeHeroData`
- `MoveCardData`
- `AssetGroupData`
- `DecisionSignalData`
- `RouteSignalData`
- `DailyDemoStateData`
- `DanceDemoProfileData`

这让“内容 schema”先独立出来，后续再扩数据层时不用继续把类型和内容混在同一文件里。

### 2. 按 route / 主题拆内容模块

新增：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/home.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/home.ts)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/legacy.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/legacy.ts)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/daily.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/daily.ts)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/dance.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/dance.ts)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/tools.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/tools.ts)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/roadmap.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/roadmap.ts)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/dashboard.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/dashboard.ts)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/about.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/about.ts)

这次拆分遵循的是“前台职责边界”，不是纯粹按数据类型分文件。

也就是说：

- `daily.ts` 里放 Daily Latin route 的真实内容、demo 状态和来源依据
- `dance.ts` 里放 Dance OS route 的模块库、demo 状态和产品成立条件
- `dashboard.ts` 里放状态看板、proof/risk/gate 和 route map
- `tools.ts` 里放 source-of-truth / stop doing / 执行链

这样后续继续回填真实资料时，维护动作会更接近真实页面职责。

### 3. 保留统一出口，避免大面积改 import

重建：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts)

它现在不再承载巨型内容实体，而是作为 barrel：

- `export * from "./types"`
- `export * from "./daily"` 等

同时保留少量跨模块派生值：

- `homeStateMetrics`
- `homeMovePreview`
- `homeAssetPreview`
- `homeDeliveryPreview`
- `homeVoicePreview`

这保证了当前 app 和组件层不需要为了本轮拆分而大面积改 import 路径。

## 额外修复

在补验证时发现：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/structure-smoke.mjs`

里还保留了旧的 Dance OS anchor 断言：

- `href="#sources"`
- `id="sources"`

但当前真实实现已经是：

- `href="#dance-sources"`
- `id="dance-sources"`

因此这轮同步把验证脚本对齐到当前真实 route 结构，避免验证链本身落后于代码。

## 验证

本轮验证结果：

- `pnpm typecheck`: pass
- `CI=1 pnpm build`: pass
- fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`: pass
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`: pass
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`: pass
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`: pass

其中 `route smoke` 继续验证了：

- `/`
- `/legacy`
- `/daily-latin`
- `/dance-os`
- `/tools`
- `/roadmap`
- `/dashboard`
- `/about`

都返回 `HTTP 200` 且标题正确。

`browser smoke` 继续验证了：

- 桌面导航与页面渲染
- `Dance OS` 锚点与交互
- `Daily Loop Demo` 交互
- 共享 witness archive 回流
- 移动端导航与无横向溢出

## 结论

这轮没有直接增加新视觉模块，但它对长期 Goal 模式是一次高价值收口：

- 页面层已经组件化
- 现在内容层也开始按 route / 主题职责分块
- 后续回填真实 Feishu 内容时，修改边界会明显更清楚
- AI 以后更不容易为了改 `Daily Latin` 文案而误碰 `Dashboard` 或 `Dance OS`

## 下一步

这一轮之后，更适合继续推进的方向：

1. 继续把 `daily.ts / dance.ts / dashboard.ts` 里模板感最强的区域替换成更真实的本地资料表达
2. 在不破坏现有边界的前提下，继续推进 `390px` mobile compaction loop
3. 逐步考虑是否把 `workbench.css` 也从单一大文件继续往 `layout / route / compact overrides` 分层
