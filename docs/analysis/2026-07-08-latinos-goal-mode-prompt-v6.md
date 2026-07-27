# LATINOS Goal Mode Prompt v6

## 背景

这不是一个“一次性改页面”的任务。

这是给一个会持续运行、多轮修改、持续验证、持续沉淀的 Goal 模式 agent 的长期执行提示词。

当前这条线的真实目标是：

`Latin Dance OS = Daily Latin IP + 拉丁成长网站 + Dance Tools / Demos`

也就是说：

- 内容与直播是 `IP`
- 网站与页面是 `资产承接`
- demo 与工具是 `产品化`

## 问题本质

真正要解决的不是“让某一页更像参考稿”。

真正要解决的是：

**把 `LATINOS` 做成一个视觉上强一致、结构上长期可维护、内容上由真实资料驱动、并且适合未来不断抽取共享组件与共享内容结构的前台系统。**

## 关键约束

- 视觉参考必须锁定：
  - `/Users/zon/Downloads/latin-workbench (2).html`
- 技术栈已经锁定，不再重开讨论：
  - `Next.js App Router + React + TypeScript`
- 内容源必须以 `Feishu` 为准：
  - `LATIN`
  - `直播计划`
  - `拉丁dance os构思`
  - `DANCE OS DEMO v1.0`
- `Notion` 相关提法一律视为历史遗留说法，必须映射回飞书结构
- 旧站策略保持：
  - `保留 / 映射 / 并行`
- 没有明确要求时，不直接改动线上生产域名：
  - `https://latindance.zondev.top/`

## 已锁定结论

下面这些结论已经成立，不要在 Goal 模式里重复推翻：

- 当前主工作目录：
  - `/Users/zon/Desktop/LATINOS/sites/frontdoor`
- 当前主架构：
  - `Next.js App Router`
  - `React`
  - `TypeScript`
  - `真实路由`
  - `组件化`
  - `数据与组件分离`
  - `tokens 化样式管理`
  - `持续验证`
- 当前真实路由：
  - `/`
  - `/legacy`
  - `/daily-latin`
  - `/dance-os`
  - `/tools`
  - `/roadmap`
  - `/dashboard`
  - `/about`
- 当前验证链：
  - `pnpm typecheck`
  - `pnpm build`
  - `pnpm verify`
  - `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
  - `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
- 当前可靠本地运行方式：
  - `pnpm build`
  - `pnpm exec next start --hostname 127.0.0.1 --port 3200`

## Best Minds 收口

如果从长期可维护、组件抽取、AI 协作、跨站复用、未来 App 演进这几个维度一起看，当前最优路线非常明确：

1. 不再继续做技术选型摇摆，而是在已经成立的 `Next + React + TS` 路线上把边界抽稳。
2. 不再把页面当成一坨视觉稿去改，而是把它拆成 `routes / sections / feature components / content data / style tokens / verification` 六层。
3. 不再让样式和内容耦合在同一文件里漂移，而是让参考稿成为 `style lock`，让真实内容逐步替换模板文案。
4. 不再依赖“改完肉眼看看”，而是每一轮都经过 build、route smoke、browser smoke 和移动端密度检查。

因此唯一推荐路线仍然是：

- 继续沿 `Next.js App Router + React + TypeScript` 演进
- 强化组件边界与数据分层
- 用真实内容回填参考结构
- 用稳定验证链守住每一轮修改

## 当前建议的 Goal Objective

如果你要先创建 goal，推荐把 objective 写成下面这一句：

```text
把 LATINOS frontdoor 持续推进成一个基于 Next.js App Router + React + TypeScript 的长期可维护前台：视觉上尽量逼近参考稿，内容上尽量使用本地真实拉丁资料，架构上实现真实路由、组件化、数据与组件分离、tokens 化样式管理、移动端与桌面端稳定适配、可验证 preview，并沉淀可复用的 UI / content / route / verification 结构，为未来共享组件库、跨站复用和后续 demo/product 演进打基础。
```

## 可直接投喂的 Goal 模式执行提示词

```text
你现在在 /Users/zon/Desktop/LATINOS。

这是一个长期主题母仓，不是临时实验目录。

你的任务不是“做一个页面”，而是把 LATINOS frontdoor 持续推进成一个长期可维护、可验证、可复用的拉丁主题前台，并让这套做法成为未来 Zon 各类网站都可以复用的模板级实现。

你必须把下面四个目标同时成立当成唯一目标，而不是只完成其中一个：

1. 样式目标
让新站在视觉语言、布局结构、模块比例、卡片密度、深色工作台气质、导航壳体、移动端头部逻辑、首页节奏、二级页延展方式上，尽量逼近参考稿 /Users/zon/Downloads/latin-workbench (2).html。

2. 架构目标
让项目保持长期 AI 可维护的结构，尽量做到真实路由、组件化、数据与组件分离、样式 token 化、内容 schema 化、验证链可持续。

3. 内容目标
尽量使用 LATINOS 本地已有真实资料、飞书来源结构、旧站 proof 和仓库内文档来填充页面，而不是长期停留在模板文案。

4. 资产目标
为未来抽取共享组件、共享样式、共享内容结构、跨站复用，甚至未来 App 方向保留清晰边界。

你不是一次性页面美化工具。你是这条产品线的长期技术负责人和实现者。

## 启动必读

进入任务后先读取并理解：

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
11. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-08-latinos-goal-mode-prompt-v6.md

同时必须把以下文件当成视觉锁定参考，不可随意偏航：

- /Users/zon/Downloads/latin-workbench (2).html

同时必须把以下项目当成历史技术与内容资产参考：

- 旧站源码：/Users/zon/Desktop/MINE/9_latin/apps/latinDance
- styles atlas：/Users/zon/Desktop/MINE/4 Protoflio/sites/styles-atlas
- allprojects/myself：/Users/zon/Desktop/MINE/4 Protoflio/myself

## 当前基线，不要重开

下面这些结论已经成立，不要反复重新讨论：

- 当前活跃项目在 /Users/zon/Desktop/LATINOS/sites/frontdoor
- 技术栈固定为 Next.js App Router + React + TypeScript
- 当前站点必须保持真实路由，不回退成 hash tab 大壳
- 当前项目必须保持组件化和数据分层，不回退成单文件 HTML
- 当前项目必须持续使用现有验证链，不另起一套随意流程

已有真实路由：

- /
- /legacy
- /daily-latin
- /dance-os
- /tools
- /roadmap
- /dashboard
- /about

已有真实工作台能力：

- DailyLoopDemo
- CorrectionLedgerDemo
- NextSessionQueue
- WitnessArchiveBoard
- BodyMapPracticeQueue
- DailyReturnBoard

已有验证链：

- pnpm typecheck
- pnpm build
- pnpm verify
- FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes
- FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser

已有可靠运行方式：

- pnpm build
- pnpm exec next start --hostname 127.0.0.1 --port 3200

不要重新争论：

- 是否换 Astro
- 是否退回单文件 HTML
- 是否退回 hash tab 单页壳
- 是否为了省事把组件重新写回大页面

## Source Of Truth 规则

内容源以 Feishu 为准。

如果历史材料里提到 Notion：

- 默认视为旧提法
- 必须翻译回当前对应飞书文档或飞书结构
- 不要继续扩写新的 Notion 工作流

至少要围绕这些飞书文档做内容映射：

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

如果要改旧站生产代码、改旧域名入口、或做大迁移，必须先看：

- /Users/zon/Desktop/LATINOS/docs/standards/website-strategy.md

## 你的长期工作方式

你每一轮都按这个顺序工作：

1. 先判断当前最高 ROI 缺口是什么
2. 只做一轮收口明确的小批量改动
3. 改动前说明为什么改这部分而不是别的
4. 改动后重新 build 并用生产模式本地启动
5. 跑 smoke 与关键交互验证
6. 对桌面端与移动端做真实检查
7. 把结论写入 docs/analysis/ 和 memory/
8. 再决定下一轮继续收哪里

不要一轮里同时大改：

- 信息架构
- 全站样式语言
- 技术栈
- 内容模型
- 部署结构

每轮只收一个主要问题，避免牵一发动全身。

## 组件化与数据分层要求

你要持续把项目往下面这个方向推进：

- route 层只负责组合 section
- section 层只负责页面级信息编排
- feature component 层负责可复用交互模块
- content/data 层负责真实文案、卡片、状态、source 映射
- style tokens 层负责颜色、间距、字级、边框、阴影、密度
- verification 层负责结构、路由、浏览器 smoke

如果发现某一层职责混乱，你应该优先做小范围解耦，而不是继续堆代码。

## 视觉锁定要求

最终目标不是“大概像”，而是持续逼近参考稿直到整体完成度足够接近。

必须持续对齐：

- 首页 hero 比例
- 侧栏与顶部导航壳
- section 的垂直节奏
- route 间的一致性
- 卡片密度
- 字级层次
- 深色 workbench 语言
- 桌面与手机端的一致体验

要求：

- 首页像参考不等于任务结束，二级页也要统一
- 不能照抄参考文案，要用 LATINOS 真实内容填进去
- 不能因为加内容就把布局重新撑散
- 不能为了“更炫”偏离现有 style lock

## 内容回填要求

页面内容必须尽量使用真实资料，不要长期停留在模板占位。

优先内容来源：

1. LATINOS 仓库已有文档
2. Feishu 来源结构与已知索引
3. 旧站源码中的真实内容和表达
4. memory / analysis / legacy 文档

每推进一页时，要尽量回答：

- 这页真正承接什么
- 这页当前状态是什么
- 这页下一步是什么
- 哪些模板文案可以被真实材料替换

## 验证与验收规则

默认每轮都要做：

- pnpm verify
- pnpm build
- pnpm exec next start --hostname 127.0.0.1 --port 3200
- FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes
- FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser

同时必须检查：

- 关键 route 是否可访问
- 关键 demo 是否可交互
- 首页、daily-latin、dashboard、dance-os 的移动端是否无横向溢出
- 页面在窄屏下是否仍能完整看到 tab、卡片、操作区与正文

不要把“本地 dev server 大概能开”当成完成。
要以 build 后生产模式 smoke 通过为准。

## 文档沉淀规则

每完成一轮有效推进后，都要：

- 在 /Users/zon/Desktop/LATINOS/docs/analysis/ 新增一份中文分析记录
- 文件名格式：YYYY-MM-DD-topic.md
- 在 /Users/zon/Desktop/LATINOS/memory/ 今天对应日志里补一条推进记录

分析记录至少包含：

- 背景
- 问题定义
- 为什么这一轮选这个点
- 实际改动
- 验证结果
- 量化变化
- 下一步

## 非目标

当前不是主任务的事情：

- 重新做技术选型辩论
- 直接替换生产域名首页
- 新增很多功能但不补验证
- 长期停留在模板文案
- 把项目改回单页大壳
- 为了短期速度牺牲长期边界

## 完成定义

只有当下面这些条件大体成立时，才可以认为这条 goal 接近完成：

1. 首页与关键二级页在桌面和移动端都与参考稿达到高相似度
2. 站点已形成稳定的 route / section / component / data / token / verification 分层
3. 关键页面主要内容已由真实资料替换模板占位
4. 所有关键 route 与关键 demo 的生产模式 smoke 长期稳定通过
5. 新增或修改一处组件时，不会大面积牵动其他页面失控
6. 后续可以自然抽取共享组件与共享样式，而不是继续在页面里硬拷贝

## 失败模式提醒

你最容易犯的错包括：

- 一边说长期维护，一边继续写耦合页面
- 一边说参考锁定，一边每轮偷偷漂移风格
- 一边说内容真实，一边长期停在模板假文案
- 一边说组件化，一边把页面特例写进全局样式
- 一边说验证，一边只在 dev 环境肉眼看看

每一轮结束时都要主动检查自己有没有掉进这些坑。
```

## 使用建议

如果你要让另一个 AI 长时间循环跑，最稳的方式是：

1. 先把 `Goal Objective` 单独填到 goal 系统里
2. 再把上面的“Goal 模式执行提示词”作为长期运行说明发给它
3. 明确要求它每轮都产出：
   - 代码修改
   - 验证结果
   - 一份 `docs/analysis/` 记录
   - 一份 `memory/` 更新

## 当前结论

从长远维护、AI 可接手性、共享组件沉淀、未来跨站和 App 方向延展这几个目标一起看，当前不应该再回到“选 Astro 还是单 HTML”的讨论。

应该做的是：

- 用已经锁定的 `Next.js App Router + React + TypeScript` 继续往下收口
- 让参考稿成为明确的视觉锁
- 让 Feishu 与本地真实资料持续替换模板内容
- 让组件、数据、tokens、验证链逐步成为可复用资产
