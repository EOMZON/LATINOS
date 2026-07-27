# LATINOS Goal Mode Launch Prompt

## 背景

这份不是新的技术选型分析。

它是基于今天已经成立的结论，进一步压缩出来的一份“可直接投喂”的启动版 prompt。

用途只有一个：

- 让后续 Goal 模式 agent 不再重新争论方向
- 直接沿着当前最优主线长跑
- 持续把 `LATINOS frontdoor` 推到“参考稿近似同款完成度 + 长期可维护架构 + 真实内容回填 + 持续验证”同时成立

## 适用场景

适用于下面这种任务：

- 需要连续运行数小时到数天
- 需要反复改页面、看效果、补验证、写 memory
- 需要让多个 AI 在同一主线里接力
- 需要避免每一轮又回到 `Astro / Next / HTML` 之争

## 当前唯一推荐结论

这条线现在不要再重开技术选型。

继续沿用已经成立的主线：

- `Next.js App Router`
- `React`
- `TypeScript`
- `真实路由`
- `组件化`
- `数据与组件分离`
- `token 化样式`
- `持续验证`

## 可直接复制给 Goal 模式 agent 的主提示词

```text
请把 /Users/zon/Desktop/LATINOS/sites/frontdoor 作为一个长期 Goal 模式项目持续推进，而不是一次性改版任务。

你的唯一目标不是“做一个页面”，而是让这个前台系统同时满足下面四个目标，并且四个目标必须同时成立才算接近完成：

1. 样式目标
让网站的视觉语言、布局结构、导航壳体、hero 比例、section 节奏、卡片密度、深色工作台气质，尽量达到和 /Users/zon/Downloads/latin-workbench (2).html 同一作品体系的完成感。不要擅自漂移风格，不要改成另一套审美。

2. 架构目标
保持 Next.js App Router + React + TypeScript、真实路由、组件化、数据与组件分离、token 化样式、长期 AI 可维护。不要回退到单文件 HTML、hash tab 大壳、Astro 主线，或把内容/样式/交互重新混写。

3. 内容目标
尽量使用 LATINOS 本地真实资料、飞书映射、旧站真实表达来填充内容，而不是长期停留在模板文案。Feishu 是唯一 source of truth；如果历史材料提到 Notion，一律视为旧提法，翻译回飞书对应文档或飞书结构。

4. 资产目标
让当前 frontdoor 形成未来可继续抽取的共享资产，包括共享 section、共享 card、共享 workbench pattern、共享 content schema、共享样式 tokens，以及后续跨站复用和 App 演进所需的清晰边界。

进入任务后，必须先读并理解下面这些文件：
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
11. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-08-latinos-goal-mode-prompt-v8.md
12. 当前最新的首页 / route 相关 analysis 文档

把 /Users/zon/Downloads/latin-workbench (2).html 视为 style lock。
你的任务不是参考一下，而是持续逼近，直到首页和关键二级页都达到近似同款完成度。

当前已锁定基线如下，不要重新讨论：
- 技术主线：Next.js App Router + React + TypeScript
- 结构主线：真实路由、组件化、数据与组件分离、token 化样式
- 内容主线：Feishu 为准，Notion 视为遗留说法
- 旧站策略：保留 / 映射 / 并行
- 生产 guardrail：没有明确要求时，不直接改 https://latindance.zondev.top/ 的生产指向

当前稳定路由包括：
- /
- /legacy
- /daily-latin
- /dance-os
- /tools
- /roadmap
- /dashboard
- /about

当前优先顺序默认是：
1. 首页整体完成感，尤其 hero -> heatmap -> workbench 的比例、节奏、现场感
2. 把模板感最强的区域替换成真实本地内容与飞书映射内容
3. 继续把共享层抽稳，优先 shared pattern，不要堆页级补丁
4. 继续复核窄屏和手机端，确保无横向溢出、无内容消失、无交互失效

组件边界继续朝下面推进：
- app/ 只做 route composition
- components/sections/ 做共享 section 结构
- components/feature/ 做业务交互模块
- components/cards/ 做可复用信息单元
- data/ 放内容与配置
- lib/ 和 hooks/ 放逻辑与共享行为
- styles/ 沉淀 tokens、shell、compact workbench 语言

不要为了“以后可能做组件库”而过早抽象万能组件。
只有在一个模式稳定复用至少 3 次后，才进一步上提抽象。
优先抽稳：
- section shell
- route stage panel
- metric strip
- source matrix
- compact workbench shell
- module entry card

每轮必须按下面的循环执行：
1. 先做整站 audit，判断当前最大差距、最掉队 route、最值得动的共享层
2. 每轮只抓 1 到 2 个最高 ROI 问题
3. 优先改共享层，不要同时大改很多页
4. 每轮同时检查：是否更像参考稿了、是否更利于长期维护了
5. 能用真实内容替换模板时就替换
6. 重要改动后至少运行 pnpm verify
7. 涉及整站视觉、关键交互、首页完成感时，再运行：
   - FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes
   - FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser
8. 有本地预览条件时，实际打开看桌面端和手机端效果，不要只靠想象
9. 每轮把关键决策写入 docs/analysis/ 和 memory/YYYY-MM-DD.md
10. 只要还能继续推进，就不要停在“状态汇报”，而要继续完成下一轮最值得做的改动

完成标准必须同时满足：
1. 首页和关键二级页在桌面端与手机端都高度逼近参考稿
2. 主要内容不再大面积依赖模板文案，而是明显更接近真实本地资料
3. 真实路由稳定，没有回退成假切页结构
4. 组件、样式、内容边界更稳，而不是更散
5. verify 与 smoke 持续通过
6. analysis 与 memory 记录足够清楚，后续 AI 可以无缝接手

没有同时满足这些条件时，不要提前宣布完成。

除非用户明确要求重新评估，否则不要再重开 Astro / 单文件 HTML / hash tab 主线讨论。

请直接进入长期循环推进状态，并在每轮都输出：
- 本轮 Top1 问题
- 本轮改动
- 验证结果
- 与参考稿相比缩小了哪些差距
- 剩余最大差距
- 下一轮最值得做什么
```

## 最短投喂版

如果只想最快启动，可以直接发送这段：

```text
请严格按照 /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-08-latinos-goal-mode-prompt-v8.md 和 /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-08-latinos-goal-mode-launch-prompt.md 执行。

不要重新讨论技术选型，不要回退到单文件 HTML、hash tab 或 Astro 主线。

你要把 /Users/zon/Desktop/LATINOS/sites/frontdoor 作为长期 Goal 模式项目持续推进：
- 样式上持续逼近 /Users/zon/Downloads/latin-workbench (2).html，直到首页和关键二级页达到近似同款完成度
- 架构上持续强化 Next.js App Router + React + TypeScript、真实路由、组件化、数据与组件分离、token 化样式
- 内容上持续用 LATINOS 本地真实资料、飞书映射和旧站真实表达替换模板文案
- 验证上每轮都运行 verify，必要时补 route smoke 与 browser smoke，并实际复核桌面端与手机端
- 文档上每轮都同步更新 docs/analysis/ 和 memory

除非参考稿完成度、结构稳定度、真实内容回填和验证结果都同时过关，否则不要把任务判定为完成。
```

## 结论

这份启动版 prompt 的目标不是“写得好看”。

它的目标是让后续 agent：

- 不再反复讨论已经有结论的事情
- 不再只追样式像却把结构改散
- 不再只做结构清理却长期不回填真实内容
- 不再做完一轮就停，而是持续以 `audit -> edit -> verify -> document -> next pass` 的方式长跑
