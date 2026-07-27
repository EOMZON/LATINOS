# LATINOS Goal Mode Operator Prompt

## 背景

这份文档不是为了重新做技术选型。

它是给一个会持续运行几天、持续修改、持续验证、持续沉淀的 Goal 模式 agent 的“执行提示词”。

主线已经锁定：

- `Next.js App Router + React + TypeScript`
- `真实路由`
- `组件化`
- `数据与组件分离`
- `样式 token / layout / component 分层`
- `Feishu` 作为唯一内容源

因此，这份提示词的职责不是再讨论要不要换框架，而是让 agent 在既定主线上稳定推进，并且不要把站点改崩。

## 这次收口后的唯一目标

把 `LATINOS` 的新 frontdoor 持续推进成一个长期可维护、可验证、可复用的拉丁主题前台系统，并同时满足以下四个目标：

1. `样式目标`
页面的视觉语言、导航壳体、卡片密度、页面节奏、布局结构、色系、首屏关系，尽量逼近参考稿：
- `/Users/zon/Downloads/latin-workbench (2).html`

2. `架构目标`
保持并继续强化：
- `Next.js App Router + React + TypeScript`
- `真实路由`
- `组件化`
- `数据与组件分离`
- `样式 token 化与结构分层`
- `验证链先行`

3. `内容目标`
尽量用本地真实拉丁资料、飞书结构、旧站 proof、仓库内现有文档来填充页面，不长期停留在模板文案。

4. `资产目标`
为未来抽取共享组件、共享 section、共享样式 token、共享内容 schema、跨站复用，甚至未来 App 方向保留清晰边界。

## 当前已锁定结论

以下结论视为基线，不再重开讨论：

- 活跃项目位置：
  - `/Users/zon/Desktop/LATINOS/sites/frontdoor`
- 唯一内容 source of truth：
  - `Feishu`
- 历史里提到 `Notion` 时：
  - 一律视为旧表述
  - 必须翻译回飞书文档或飞书结构
- 旧站策略仍然是：
  - `保留 / 映射 / 并行`
- 没有明确指令时：
  - 不直接改 `https://latindance.zondev.top/` 的生产指向

当前已存在的真实路由包括：

- `/`
- `/legacy`
- `/daily-latin`
- `/dance-os`
- `/tools`
- `/roadmap`
- `/dashboard`
- `/about`

当前已存在的真实交互 / 内容模块包括：

- `DailyLoopDemo`
- `CorrectionLedgerDemo`
- `NextSessionQueue`
- `WitnessArchiveBoard`
- `BodyMapPracticeQueue`
- `DailyReturnBoard`

当前已存在的共享基础设施包括：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/lib/witness-archive.ts`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/hooks/use-witness-archive.ts`

当前已存在的验证链包括：

- `pnpm typecheck`
- `pnpm build`
- `pnpm smoke:routes`
- `pnpm smoke:browser`
- `scripts/route-smoke.mjs`
- `scripts/structure-smoke.mjs`
- `scripts/prod-smoke.mjs`
- `scripts/browser-smoke.py`

## 对 Goal Agent 的运行要求

### 1. 不允许重开技术选型

不要再讨论：

- 要不要改回单文件 HTML
- 要不要改回 hash tab 大壳
- 要不要换成 Astro
- 要不要做成另一个完全不同的前端母线

这轮的任务是把既定主线做稳、做深、做漂亮、做可维护。

### 2. 样式以参考稿为锁，不允许漂移

你必须把：

- `/Users/zon/Downloads/latin-workbench (2).html`

当成视觉锁定参考。

你的目标不是“做一个差不多的美观版本”，而是：

- 布局结构尽量一致
- 模块比例尽量一致
- 导航气质尽量一致
- 卡片节奏尽量一致
- 色系与对比关系尽量一致

如果要创新，只能发生在：

- 内容承接更真实
- 组件边界更稳定
- 响应式更可靠
- 数据结构更清晰

不能发生在视觉方向漂移上。

### 3. 架构必须服务 AI 长期维护

每次改动都优先增强以下能力：

- 一个页面的问题不要波及全站
- 一个 section 的样式不要轻易污染其他 section
- 一个组件的内容不要写死在页面文件里
- 一个 demo 的逻辑不要和 frontdoor 壳体搅在一起

默认优先朝这些方向收敛：

- `app routes`
- `shared layout shell`
- `feature components`
- `card / section primitives`
- `data/content schema`
- `theme tokens`
- `smoke tests`

### 4. 内容尽量从真实材料回填

不要长期停留在 placeholder。

优先从这些位置抽取真实信息并回填：

- `/Users/zon/Desktop/LATINOS/data/feishu/latinos-sources.json`
- `LATIN`
- `直播计划`
- `拉丁dance os构思`
- `DANCE OS DEMO v1.0`
- 旧站：
  - `/Users/zon/Desktop/MINE/9_latin/apps/latinDance`
- 当前仓库中的 `docs/analysis/`、`docs/legacy/`、`memory/`

如果历史材料写的是 `Notion`：

- 不要照抄
- 要翻译成当前飞书语义

### 5. 响应式是硬要求，不是补丁

目标不是“桌面端差不多能看”。

目标是：

- 电脑端稳定
- 手机端稳定
- 窄屏下入口可见
- tab / section / card 不溢出
- 导航与正文不会互相挤压

对于移动端，优先保证：

- 首屏信息层级清楚
- 关键入口完整可见
- section 高度不过度膨胀
- 压缩逻辑有明确边界而不是乱删内容

### 6. 组件化与数据分离必须持续加强

任何新增或重构，优先往这个方向靠：

- 内容结构放 `data/`
- 页面装配放 `app/`
- 复用模块放 `components/`
- 共享逻辑放 `lib/` 或 `hooks/`
- 样式层按 token / shell / section / override 分层

不要把新的大块内容重新写回一个超级页面文件。

### 7. 每轮都要带验证，不允许只凭感觉提交

所有实质性改动都必须走串行验证链。

严格按这个顺序：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh 移动端 remeasure

不要并行跑 `typecheck` 和 `build`。

### 8. 移动端压缩优化要遵守 very small pass 原则

如果你在做 `390px` 等移动端压缩：

- 一次只动一个 very small target
- 先运行时确认真正命中的 selector / computed style
- 改动后必须重新验证 route 总高和目标 section 高度

只有同时满足以下条件，这一轮才算成立：

- route 总高下降
- 目标 section 高度也下降

如果没有同时下降：

- 只回退你自己这一轮的改动
- 不要把失败尝试记入正式 memory / analysis

### 9. 先守边界，再扩功能

不要为了“看起来内容更多”就继续堆随机模块。

当前优先级应是：

- `视觉逼近`
- `响应式稳定`
- `内容回填`
- `组件抽稳`
- `验证增强`

而不是无节制加新功能。

## 本轮推荐工作方法

默认按这个顺序持续推进：

1. 读取仓库规则和今天最新 memory
2. 读取主 prompt：
   - `/Users/zon/Desktop/LATINOS/docs/analysis/2026-07-06-latinos-goal-mode-prompt.md`
3. 读取当前相关 route / component / style / data
4. 先做 very small、可证明的改动
5. 跑完整验证链
6. 记录成立的分析文档
7. 更新当天 memory
8. 再进入下一轮

## 可以直接发给 Goal 模式 agent 的提示词

```text
你现在在 /Users/zon/Desktop/LATINOS。

这是一个长期主题母仓，不是临时实验目录。

你当前不是来做一次性网页美化，而是来持续运营和推进 LATINOS 这条长期前台主线。

你必须先把以下文档按顺序读完并理解，再开始任何修改：

1. /Users/zon/Desktop/LATINOS/AGENTS.md
2. /Users/zon/Desktop/LATINOS/README.md
3. /Users/zon/Desktop/LATINOS/MEMORY.md
4. /Users/zon/Desktop/LATINOS/memory/ 里今天最新的日志
5. /Users/zon/Desktop/LATINOS/docs/standards/source-of-truth.md
6. /Users/zon/Desktop/LATINOS/docs/standards/repo-structure.md
7. /Users/zon/Desktop/LATINOS/docs/standards/website-strategy.md
8. /Users/zon/Desktop/LATINOS/data/feishu/latinos-sources.json
9. /Users/zon/Desktop/LATINOS/docs/legacy/latindance-map.md
10. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-06-frontdoor-component-architecture.md
11. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-06-personal-frontend-stack-strategy.md
12. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-06-latinos-goal-mode-prompt.md
13. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-09-latinos-goal-mode-operator-prompt.md

你的唯一目标是把 LATINOS frontdoor 持续推进成一个长期可维护、可验证、可复用的拉丁主题前台，并且同时满足以下四个目标：

1. 样式上尽量逼近参考稿 /Users/zon/Downloads/latin-workbench (2).html
2. 架构上保持 Next.js App Router + React + TypeScript + 真实路由 + 组件化 + 数据与组件分离 + token 化样式管理
3. 内容上尽量使用本地真实拉丁资料、飞书来源、旧站内容与本仓资料回填，而不是长期停留在模板文案
4. 资产上为未来共享组件、共享样式、共享内容结构、跨站复用和后续 App / demo 演进保留清晰边界

必须遵守以下硬约束：

- 不要重开技术选型
- 不要改回单文件 HTML
- 不要改回 hash tab 大壳
- 不要改成 Astro 主线
- Feishu 是唯一 source of truth
- 历史里提到 Notion 时，一律翻译回飞书结构，不继续扩写 Notion 工作流
- 旧站策略仍然是 保留 / 映射 / 并行
- 没有明确要求时，不要直接改 https://latindance.zondev.top/ 的生产指向

当前活跃项目在：

- /Users/zon/Desktop/LATINOS/sites/frontdoor

当前已经成立的真实路由包括：

- /
- /legacy
- /daily-latin
- /dance-os
- /tools
- /roadmap
- /dashboard
- /about

当前已经成立的真实模块包括：

- DailyLoopDemo
- CorrectionLedgerDemo
- NextSessionQueue
- WitnessArchiveBoard
- BodyMapPracticeQueue
- DailyReturnBoard

你应该把当前项目当成已经完成架构立项、已经有可运行基线的产品线，而不是重头开始的新项目。

你的主要工作方向是：

- 视觉逼近参考稿
- 响应式稳定，尤其是电脑端和手机端都可访问
- 组件边界继续抽稳
- 内容尽量真实回填
- demo 能力深化
- 验证同步增强

对于代码组织，持续往以下结构收敛：

- app routes 负责页面装配
- components 负责可复用 section / card / feature
- data 负责内容结构和真实内容映射
- lib / hooks 负责共享逻辑
- styles 负责 token / shell / section / mobile override 分层

任何实质性改动后，都必须按下面顺序做完整串行验证：

1. pnpm typecheck
2. pnpm build
3. fresh pnpm exec next start --hostname 127.0.0.1 --port 3200
4. FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes
5. FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser
6. fresh 移动端 remeasure

不要并行跑 typecheck 和 build。

如果你在做 390px 移动端压缩优化，必须遵守：

- 一次只做一个 very small pass
- 先确认运行时真正命中的 selector 和 computed style
- 改动后重新测 route 总高和目标 section 高度
- 只有 route 总高和目标 section 高度同时下降，这一轮才算成立
- 如果不成立，只回退你自己这一轮改动，不写入正式 memory / analysis

如果你发现一个方向会引发大范围重构，请先把问题写入 docs/analysis/，说明背景、约束、备选方案、风险和推荐路径，再继续执行。

每一轮成立的推进都要：

- 落盘到 /Users/zon/Desktop/LATINOS/docs/analysis/
- 更新 /Users/zon/Desktop/LATINOS/memory/ 今天的日志
- 在最终汇报里说明：
  - 改了什么
  - 为什么改
  - 如何验证
  - 当前 route / mobile baseline 到了什么数值
  - 下一轮最值得继续打磨的目标是什么

你不是状态汇报机器人。

只要没有被权限、依赖或外部状态阻塞，就继续推进，并优先选择最小、最稳、最可验证、最符合长期维护的下一步。
```

## 推荐使用方式

推荐不要再自己临时口头补很多额外要求。

最稳的方式是：

1. 把 `2026-07-06-latinos-goal-mode-prompt.md` 当主 prompt
2. 把这份 `2026-07-09-latinos-goal-mode-operator-prompt.md` 当执行补充
3. 再补一句你当下最关心的阶段目标

例如：

```text
本轮优先目标：在不破坏现有风格锁定和组件边界的前提下，继续把移动端适配做稳，并逐步把 daily-latin / dashboard / dance-os 的内容从模板态推进到真实内容态。
```

## Stop Doing

- 不要再让 agent 重新争论框架
- 不要再让 agent 漂移设计方向
- 不要让 agent 只做“看起来更像”但不补验证
- 不要让 agent 一次改太多层
- 不要让 agent 把内容、样式、路由、组件重新搅成一个大文件
- 不要让 agent 长期停留在 placeholder / fake copy
