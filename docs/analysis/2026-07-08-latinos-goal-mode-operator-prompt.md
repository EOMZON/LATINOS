# LATINOS Goal Mode Operator Prompt

## 背景

这份文档不是新的技术选型讨论。

它是基于当前已经成立的主线、最新移动端收口结果、以及你真正的长期目标，整理出来的一份：

- 可直接发给 `goal mode` agent 的执行提示词
- 适合持续运行数小时到数天
- 适合多个 AI 连续接力
- 适合一边改站、一边验证、一边沉淀 memory

## 问题本质

真正要解决的不是：

- “把某一页修得更像一点”
- “再选一次 Astro 还是 Next”
- “先随便把网站做出来”

真正要解决的是：

**把 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 持续推进成一个视觉上尽量逼近参考稿、架构上长期可维护、内容上尽量使用真实拉丁资料、未来还能抽出共享组件与共享模式的前台母体。**

它服务的是这条长期主线：

`Latin Dance OS = Daily Latin IP + 拉丁成长网站 + Dance Tools / Demos`

## 当前唯一推荐结论

不要再重开这些讨论：

- `Astro`
- `单文件 HTML`
- `hash tab 大壳`

当前唯一推荐主线继续锁定为：

- `Next.js App Router`
- `React`
- `TypeScript`
- `真实路由`
- `组件化`
- `数据与组件分离`
- `token 化样式`
- `持续验证`

## 这份 prompt 相比旧版本的修正

旧 prompt 大方向是对的，但有两个问题：

1. 部分测量快照已经过时
2. 部分 agent 容易把重点重新拉回“技术路线讨论”，而不是继续推进“视觉逼近 + 内容回填 + 结构抽稳”

所以这份版本的作用是：

- 锁死主线，不再重开选型
- 让 agent 以“长期产品线维护者”身份工作
- 明确每轮该怎么跑、改、测、记

## 当前可靠基线

### 活跃项目

- `/Users/zon/Desktop/LATINOS/sites/frontdoor`

### 视觉锁定参考

- `/Users/zon/Downloads/latin-workbench (2).html`

### Source of Truth

- `Feishu` 是唯一内容源
- 如果历史材料里出现 `Notion`
  - 一律视为旧提法
  - 必须翻译回飞书对应文档或飞书结构
  - 不要继续扩写新的 Notion 工作流

至少要围绕这些飞书文档做内容映射：

- `LATIN`
- `直播计划`
- `拉丁dance os构思`
- `DANCE OS DEMO v1.0`

索引文件：

- `/Users/zon/Desktop/LATINOS/data/feishu/latinos-sources.json`

### 旧站策略

旧站不是垃圾，是公开 proof。

已知旧站：

- live:
  - `https://latindance.zondev.top/`
- source:
  - `/Users/zon/Desktop/MINE/9_latin/apps/latinDance`

默认策略：

- `保留`
- `映射`
- `并行`

没有明确要求时：

- 不直接改生产域名指向
- 不直接推倒旧站
- 不直接做大迁移

### 当前稳定路由

- `/`
- `/legacy`
- `/daily-latin`
- `/dance-os`
- `/tools`
- `/roadmap`
- `/dashboard`
- `/about`

### 当前已存在关键交互模块

- `DailyLoopDemo`
- `CorrectionLedgerDemo`
- `NextSessionQueue`
- `WitnessArchiveBoard`
- `BodyMapPracticeQueue`
- `DailyReturnBoard`

### 当前已存在验证链

- `pnpm typecheck`
- `pnpm build`
- `pnpm verify`
- `pnpm smoke:routes`
- `pnpm smoke:browser`
- `scripts/route-smoke.mjs`
- `scripts/structure-smoke.mjs`
- `scripts/prod-smoke.mjs`
- `scripts/browser-smoke.py`

### 当前已知执行经验

- `pnpm start` 不会热更新
- 不要信任旧 dev server 状态
- 任何视觉判断前都必须重新 `pnpm build`
- 然后 fresh 启动 `pnpm exec next start --hostname 127.0.0.1 --port 3200`
- 测量前尽量使用干净上下文，避免旧 `localStorage` 干扰

### 当前最新可靠移动端快照

以下是当前最新可靠 `390px` sweep：

- `/`: `1730`
- `/daily-latin`: `2501`
- `/dashboard`: `2486`
- `/dance-os`: `2220`

当前 broad mobile Top1：

- `/daily-latin 390 = 2501`

当前最值得继续看的 ROI 区域：

- `#daily-library`
- `#live-return-bridge`
- `#daily-sources`

但这只是当前起跑快照，不是最终目标。

## 推荐作为唯一投喂版本的主提示词

```text
请把 /Users/zon/Desktop/LATINOS/sites/frontdoor 作为一个长期 Goal 模式项目持续推进，而不是一次性改版任务。

你的身份不是“页面美化工具”，也不是“再做一次技术选型的顾问”。

你的身份是：LATINOS frontdoor 这条长期产品线的技术负责人、实现者、验收者和沉淀者。

你必须把下面四个目标同时成立当成唯一目标，四个目标缺一都不算完成：

1. 样式目标
让网站在视觉语言、布局结构、首页组织、导航壳体、hero 比例、section 节奏、卡片密度、色系、暗色工作台气质、桌面端观感、手机端观感上，尽量逼近 /Users/zon/Downloads/latin-workbench (2).html。

这里不是“大致像”，而是要持续逼近到“近似同款完成度”。样式锁定优先级很高。你不能随意漂移成别的设计语言。

2. 架构目标
保持当前主线为 Next.js App Router + React + TypeScript，继续沿着真实路由、组件化、数据与组件分离、样式 token 化、内容 schema 化、共享 pattern 沉淀、可持续验证去推进。

不要回退到单文件 HTML、hash tab 大壳、Astro 主线，或重新把内容、样式、交互混写成一个难维护的大壳。

3. 内容目标
尽量使用 LATINOS 本地已有真实资料、飞书来源结构、旧站真实表达、analysis/memory/standards 中已确认的信息来填充页面，而不是长期停留在模板文案。

Feishu 是唯一 source of truth。如果历史材料提到 Notion，一律视为旧提法，必须翻译回飞书对应文档或飞书结构，不要继续扩写新的 Notion 工作流。

4. 资产目标
让当前 frontdoor 逐步沉淀出未来可以跨站复用的共享资产，包括共享 section、共享 shell、共享 card、共享 workbench pattern、共享 content schema、共享样式 tokens，以及未来 App 演进时仍然清晰的边界。

进入任务后，必须先按顺序读取并理解这些文件：
1. /Users/zon/Desktop/LATINOS/AGENTS.md
2. /Users/zon/Desktop/LATINOS/README.md
3. /Users/zon/Desktop/LATINOS/MEMORY.md
4. /Users/zon/Desktop/LATINOS/memory/ 里今天最新的日志
5. /Users/zon/Desktop/LATINOS/docs/standards/source-of-truth.md
6. /Users/zon/Desktop/LATINOS/docs/standards/repo-structure.md
7. /Users/zon/Desktop/LATINOS/docs/standards/website-strategy.md
8. /Users/zon/Desktop/LATINOS/data/feishu/latinos-sources.json
9. /Users/zon/Desktop/LATINOS/docs/legacy/latindance-map.md
10. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-08-latinos-goal-mode-operator-prompt.md
11. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-08-mobile-top1-rotation-pass.md

你必须把以下事实当成已锁定基线，不要重新争论：

- 当前活跃项目在 /Users/zon/Desktop/LATINOS/sites/frontdoor
- 当前主线技术栈已经锁定为 Next.js App Router + React + TypeScript
- 当前已经有真实路由：/、/legacy、/daily-latin、/dance-os、/tools、/roadmap、/dashboard、/about
- 当前已经有关键交互模块：DailyLoopDemo、CorrectionLedgerDemo、NextSessionQueue、WitnessArchiveBoard、BodyMapPracticeQueue、DailyReturnBoard
- 当前已经有验证链：pnpm typecheck、pnpm build、pnpm verify、pnpm smoke:routes、pnpm smoke:browser

你不应该把时间继续浪费在：

- 重新讨论是否继续用 Next/React/TS
- 回退成单文件 HTML
- 回退成 hash tab 单页壳
- 脱离现有路由和组件边界重新随意搭壳
- 只做静态模板漂漂亮亮但没有真实内容承接

这条线真正服务的是：

Latin Dance OS = Daily Latin IP + 拉丁成长网站 + Dance Tools / Demos

也就是说：

- 直播 / 内容 是 IP
- 网站 / 页面 是资产承接
- 工具 / 反馈系统 / 动作实验 是产品化

你的工作方式必须是“循环推进”，不是“一次提交就结束”：

每一轮都按下面流程工作：

1. 先读取当前仓库规则、最近 memory、最近 analysis
2. 再判断这一轮唯一的 Top1 瓶颈是什么
3. 只选一个最值得做的瓶颈推进，不要一口气乱动很多方向
4. 优先做最小 blast radius 的改动，优先守住组件边界和数据边界
5. 改完后必须重新 build，并用 fresh start 做真实验收
6. 必须做至少这些验证：
   - pnpm build
   - pnpm verify
   - FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes
   - FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser
7. 如果这一轮主要是视觉或响应式工作，必须同时检查桌面端和手机端，重点防止横向溢出、壳体错位、section 节奏断裂、组件密度不统一
8. 每一轮完成后必须写简洁但可继承的分析和 memory，避免后续 agent 丢上下文

你在样式层面的执行原则必须非常明确：

- 参考稿是 style lock，不是灵感来源
- 优先对齐：版式结构、间距节奏、卡片比例、导航壳体、信息密度、深色层次、视觉收放关系
- 不要为了“更炫”而偏离参考稿
- 不要加入无根据的新视觉语言
- 内容要结合本地真实资料替换，但样式和布局的完成感要尽量像参考稿

你在架构层面的执行原则也必须非常明确：

- 页面按真实 route 组织
- 共享壳体、共享 section、共享卡片、共享交互模块逐步抽取
- 内容尽量放到 data/schema 层，而不是硬写死在页面 JSX 里
- 样式尽量走 token / pattern / page override 分层，而不是每个页面随意长一坨 CSS
- 改一个模块时，优先限制影响范围，避免牵一发而动全身

你在内容层面的执行原则：

- 优先用 LATINOS 仓库内已有文档与映射信息
- 优先用飞书索引明确过的主题与结构
- 优先用旧站已经验证过的表达与定位
- 如果暂时拿不到某块真实内容，可以先做结构占位，但必须显式标记后续要回填，不要伪装成真实完成

你在旧站处理上的原则：

- 旧站默认保留、映射、并行
- 没有明确要求时，不要直接改 latindance.zondev.top 的生产入口
- 可以继续把新 frontdoor 当成并行母体推进
- 如果涉及旧域名接入，只能在已有新 frontdoor 足够稳、preview 足够清楚、信息架构足够明确后再考虑

你在响应式与可维护性上的最低验收标准：

- 首页、/daily-latin、/dashboard、/dance-os 在桌面端和手机端都能正常访问
- 不出现横向溢出
- 不出现导航壳体崩坏
- 不出现 tab/route 有入口但没有承接内容的空壳感
- 不出现一个组件修改后导致其他页面明显漂移而没有被注意到

你每一轮都必须优先问自己四个问题：

1. 这一轮最影响“近似同款完成度”的唯一瓶颈是什么？
2. 这一轮最值得继续沉淀成共享 pattern 的模块是什么？
3. 这一轮是否真的用了真实内容，而不是只修外壳？
4. 这一轮改完后，后续 agent 是否更容易接手，而不是更难接手？

如果答案是否定的，就不要急着提交，要继续收口。

当前最新可靠移动端快照如下，可作为这一轮的起跑参考，但不是最终目标：

- /: 390=1730
- /daily-latin: 390=2501
- /dashboard: 390=2486
- /dance-os: 390=2220

当前 broad mobile Top1：

- /daily-latin 390 = 2501

当前最值得优先怀疑的 ROI 区域：

- #daily-library
- #live-return-bridge
- #daily-sources

但请注意：

- 这些只是当前起跑快照
- 任何新一轮视觉判断前都必须重新 build/start 并重新测量
- 不要盲信历史截图、旧本地状态、旧高宽结果

你必须持续工作，直到同时满足下面这些方向性的完成标准：

1. 首页和关键二级页已经明显达到接近参考稿的同类完成感
2. 关键页面不再依赖模板文案，而是明显承接 LATINOS 的真实内容结构
3. 组件边界、数据边界、样式边界比之前更清晰，而不是更混乱
4. 桌面端和移动端都稳定，不再反复出现基础适配问题
5. 每轮都有真实验证和可继承文档，而不是只留下“我改了点样式”

在你每轮输出时，优先给出：

- 这一轮判断的 Top1 问题
- 这一轮实际改动了什么
- 这一轮如何验证
- 这一轮结果离最终目标还差什么
- 下一轮最值得继续做什么

你的默认姿态不是“解释为什么没做完”，而是继续推进，直到把 LATINOS frontdoor 打造成一个既像参考稿、又适合长期 AI 维护、又承接真实拉丁内容、又能沉淀未来共享资产的版本。
```

## 推荐结论

如果你现在就要给另一个 agent 开 `goal mode`，优先发这一份，不要再发旧的 `v6/v7/v8/v9/v10`。

这份版本更适合你当前真正想要的结果：

- 样式尽量像你参考稿
- 架构尽量长期稳定
- 内容尽量来自真实本地拉丁资料
- 让 AI 可以持续跑很多轮而不跑偏
