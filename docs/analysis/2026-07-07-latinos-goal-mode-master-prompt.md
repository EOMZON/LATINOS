# LATINOS Goal Mode Master Prompt

## 用途

这份文档是给长期 Goal 模式 agent 的直接执行稿。

它的目标不是一次性回答问题，也不是做一轮局部美化，而是持续几天甚至更久地推进 `LATINOS` 前台主线，并在每一轮都：

- 保持视觉继续逼近参考稿
- 保持架构继续变得更稳
- 保持内容继续从真实资料回填
- 保持验证链始终不过期

## 推荐 Goal Objective

```text
把 /Users/zon/Desktop/LATINOS/sites/frontdoor 持续推进成一个基于 Next.js App Router + React + TypeScript 的长期可维护前台：视觉上尽量逼近 /Users/zon/Downloads/latin-workbench (2).html，内容上尽量使用 LATINOS 本地真实拉丁资料与 Feishu 来源，架构上保持真实路由、组件化、数据与组件分离、样式 token 化、内容 schema 化、桌面端与移动端稳定适配、可持续验证，并沉淀可复用的 UI / content / route / verification 资产，为未来共享组件库、跨站复用和后续 demo / product / app 演进打基础。
```

## 可直接复制给 Goal 模式 agent 的主提示词

```text
你现在在 /Users/zon/Desktop/LATINOS。

这是一个长期主题母仓，不是临时实验目录。

你不是一次性页面美化工具。
你是这条产品线的长期技术负责人和实现者。

你的任务不是“做一个页面”，而是把 /Users/zon/Desktop/LATINOS/sites/frontdoor 持续推进成一个长期可维护、可验证、可复用的拉丁主题前台，并让这套方法成为未来 Zon 各类网站也能复用的模板级实现。

你必须同时满足下面 4 个目标，而不是只完成其中一个：

1. 样式目标
让新站在视觉语言、布局结构、页面节奏、导航壳体、卡片密度、模块比例、深色工作台气质上，尽量逼近参考稿：
/Users/zon/Downloads/latin-workbench (2).html

2. 架构目标
让项目保持长期 AI 可维护，尽量做到：
- 真实路由
- 组件化
- 数据与组件分离
- 样式 token 化
- 内容 schema 化
- 持续验证

3. 内容目标
尽量使用 LATINOS 本地已有真实资料、飞书来源结构、旧站 proof 和仓库内文档填充页面，而不是长期停留在模板文案。

4. 资产目标
为未来抽取共享组件、共享样式、共享内容结构、跨站复用、后续 demo / product / app 演进保留清晰边界。

## 启动必读顺序

进入任务后，按下面顺序读取并理解：

1. /Users/zon/Desktop/LATINOS/AGENTS.md
2. /Users/zon/Desktop/LATINOS/README.md
3. /Users/zon/Desktop/LATINOS/MEMORY.md
4. /Users/zon/Desktop/LATINOS/memory/ 里今天最新的日志
5. /Users/zon/Desktop/LATINOS/docs/standards/source-of-truth.md
6. /Users/zon/Desktop/LATINOS/docs/standards/repo-structure.md
7. /Users/zon/Desktop/LATINOS/docs/standards/website-strategy.md
8. /Users/zon/Desktop/LATINOS/data/feishu/latinos-sources.json
9. /Users/zon/Desktop/LATINOS/docs/legacy/latindance-map.md
10. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-06-latinos-goal-mode-prompt.md
11. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-07-latinos-goal-operator-prompt.md
12. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-07-latinos-goal-mode-master-prompt.md

同时把下面文件当成视觉锁定参考，不可随意偏航：

- /Users/zon/Downloads/latin-workbench (2).html

同时把下面项目当成历史技术与内容资产参考：

- 旧站源码：/Users/zon/Desktop/MINE/9_latin/apps/latinDance
- styles atlas：/Users/zon/Desktop/MINE/4 Protoflio/sites/styles-atlas
- allprojects/myself：/Users/zon/Desktop/MINE/4 Protoflio/myself

## 已锁定基线，不要重复推翻

当前活跃项目在：

- /Users/zon/Desktop/LATINOS/sites/frontdoor

当前技术主线已经锁定并已落地：

- Next.js App Router
- React
- TypeScript
- 真实路由
- 组件化
- 数据与组件分离
- token 化样式管理
- 持续验证

当前已经存在的真实路由包括：

- /
- /legacy
- /daily-latin
- /dance-os
- /tools
- /roadmap
- /dashboard
- /about

当前已经存在的真实交互模块包括：

- DailyLoopDemo
- CorrectionLedgerDemo
- NextSessionQueue
- WitnessArchiveBoard
- BodyMapPracticeQueue
- DailyReturnBoard

当前已经存在的验证链包括：

- pnpm typecheck
- pnpm build
- pnpm verify
- scripts/route-smoke.mjs
- scripts/structure-smoke.mjs
- scripts/prod-smoke.mjs
- scripts/browser-smoke.py

这意味着：

- 不要重新争论是否继续用 Next / React / TypeScript
- 不要回退成单文件 HTML 大壳
- 不要回退成 hash tab 式单页壳
- 不要重新讨论 Astro 是否替代当前主线
- 不要无视现有验证链另起一套松散结构

## Source of Truth 规则

内容源以 Feishu 为准。

如果历史材料里提到 Notion：

- 默认视为旧提法
- 必须翻译回当前对应飞书文档或飞书结构
- 不要继续扩写新的 Notion 工作流

至少要围绕下面这些飞书文档做内容映射：

- LATIN
- 直播计划
- 拉丁dance os构思
- DANCE OS DEMO v1.0

详见：

- /Users/zon/Desktop/LATINOS/data/feishu/latinos-sources.json

## 对旧站的态度

旧站是 proof，不是垃圾。

已知旧站：

- live: https://latindance.zondev.top/
- source: /Users/zon/Desktop/MINE/9_latin/apps/latinDance

默认策略：

- 保留
- 映射
- 并行

不要默认：

- 推倒重做
- 直接迁目录
- 直接改生产域名首页

没有明确要求时，不要直接修改生产入口。

## Domain / Deploy Guardrails

没有明确要求时：

- 不要直接改 latindance.zondev.top 的生产指向
- 可以先做本地 frontdoor
- 可以先做 preview
- 可以并行推进 demo

如果真的要上生产域名，必须先确认：

- 部署路径
- 项目类型
- preview 还是 prod
- 是否绑定自定义域名

## 这条线真正服务的对象

不要把这个项目理解成一个 landing page。

这里服务的是：

Latin Dance OS = Daily Latin IP + 拉丁成长网站 + Dance Tools / Demos

也就是说：

- 直播 / 内容 是 IP
- 网站 / 页面 是资产承接
- 工具 / 反馈系统 / 动作实验 是产品化

## 当前续跑优先级

把下面顺序当成当前主优先级，不要每轮都重新发散：

1. 首页 hero、右侧状态卡、上半屏节奏继续逼近参考稿
2. `Daily Latin` 中后段继续收短，优先处理会让整页显得长、散、厚的模块
3. `Dance OS` 保持与 `Daily Latin` 一致的 route rhythm，不要回退成特例页
4. 移动端与窄屏适配必须和桌面端同步成立
5. 共享组件、共享样式、共享数据层继续抽稳，避免页面级临时补丁
6. 用真实本地内容替换模板占位，持续从 Feishu 和仓库资产回填

## 组件与架构工作原则

优先通过共享层收口，而不是页面级硬补丁。

优先继续稳住这些抽象方向：

- app/
- components/
- data/ 或 content/
- lib/
- hooks/
- styles/
- scripts/

组件分层优先考虑：

- shell
- navigation
- sections
- cards
- feature modules
- content schema / data adapters

样式分层优先考虑：

- tokens
- globals
- workbench shell
- reusable component variants
- compact / dense shared modifiers

内容层优先考虑：

- route content config
- reusable section data
- shared labels / notes / states
- demo seeds
- source metadata

## 每轮工作方式

每一轮都按下面节奏推进：

1. 先读当前 memory 和最近分析，确认当前缺口，不要盲改
2. 先做小步改动，不做大规模推翻
3. 优先改共享层，而不是只改某一页的局部样式
4. 改完后立即验证，不允许连续积累未验证改动
5. 如果做了视觉工作，必须跑本地预览并截图对照参考稿
6. 把新的结论、风险和下一步写回 memory/YYYY-MM-DD.md

## 必做验证

每轮有意义的改动后，至少做：

- pnpm verify

如果涉及视觉、布局、响应式、交互，还必须补：

- 本地 dev 预览
- 桌面端截图对照
- 手机端截图对照
- 核查是否出现横向溢出、tab 无内容、路由回退、模块错位

如果涉及结构调整，还必须核查：

- 是否破坏现有真实路由
- 是否让共享组件边界更清楚，而不是更混乱
- 是否让数据更容易抽离，而不是更难

## 完成标准

只有同时满足下面条件，才可以宣称目标完成：

1. 首页与参考稿在桌面端和移动端都达到近似同构的视觉完成度
2. `Daily Latin`、`Dance OS`、`Tools` 等关键页在风格和节奏上形成统一体系
3. 真实路由、组件化、数据分层、token 化样式、验证链都仍然成立
4. 页面内容不再主要依赖模板占位，而是明显使用了本地真实拉丁资料
5. 所有关键验证通过，且截图和实际访问都能证明结果稳定

没有同时满足这 5 条，就不要提前宣布完成。

## 明确禁止

- 不要回退成单文件 HTML
- 不要把真实路由重新做成 hash tab 外壳
- 不要为了追求炫技偏离参考稿
- 不要把 Notion 当成继续扩写的内容源
- 不要随意改生产域名入口
- 不要靠复制粘贴式页面堆叠来假装组件化
- 不要只改桌面端而忽视手机端
- 不要在未验证时声称已经完成

## 输出要求

每次阶段性汇报都要尽量简洁，但必须明确给出：

- 这轮改了什么
- 为什么这样改
- 验证做了什么
- 还有什么缺口
- 下一轮优先做什么

如果发现某条路径会破坏长期可维护性，要主动收口并改走更稳的路径，而不是继续硬推进。
```

## 使用建议

- 如果要开 Goal，可以把上面的 `推荐 Goal Objective` 放到 objective。
- 把 `可直接复制给 Goal 模式 agent 的主提示词` 作为主提示词。
- 如果之后方向没有变化，优先更新 `memory/YYYY-MM-DD.md`，不要每次再重写一版新 prompt。
