# LATINOS Goal Mode Priority Loop Prompt After Phase 1

## 背景

到 `2026-07-10` 为止，`/Users/zon/Desktop/LATINOS/sites/frontdoor` 的真实状态已经不是“从零开始”，而是：

- 技术主线已锁定为：
  - `Next.js App Router`
  - `React`
  - `TypeScript`
- 当前核心三页：
  - `/`
  - `/daily-latin`
  - `/dance-os`
- 已完成统一 fresh-prod 验证与并排验收
- `Phase 1` 已可判定为：
  - `completed`

这意味着旧的很多 goal prompt 已经出现了时间错位：

- 有的还把首页当成默认 `Top 1`
- 有的还把 `/daily-latin` 当成默认 `Top 1`
- 有的还停留在“Phase 1 仍未结束”

所以现在真正需要的不是再堆一份更长的总目标，而是：

**把旧目标停用，换成一份从“当前真实基线”继续往前推进的循环执行合同。**

## 问题本质

真正要解决的不是“再写 prompt”。

真正要解决的是：

**让 Goal Mode agent 从当前已完成的核心三页基线出发，按优先级逐步完成辅助承接页、demo 孵化、共享资产沉淀、preview / deploy / 域名决策，并且每一轮都能给出用户看得见的结果与可复核证据。**

## 关键约束

### 1. 技术主线已锁定

不要重新讨论：

- `Astro`
- 单文件 `HTML`
- hash-tab 单页壳
- 推翻当前 `Next.js App Router + React + TypeScript`

### 2. 内容源已锁定

- `Feishu` 是唯一 source of truth
- 历史里的 `Notion` 一律视为旧提法
- 任何 `Notion` 相关表述都必须翻译回飞书文档、飞书 wiki、飞书表格或飞书结构

### 3. 旧站策略已锁定

旧站：

- live: `https://latindance.zondev.top/`
- source: `/Users/zon/Desktop/MINE/9_latin/apps/latinDance`

默认策略仍然是：

- `保留`
- `映射`
- `并行`

没有明确要求时：

- 不要直接改旧站生产代码
- 不要直接切旧域名首页
- 不要粗暴迁目录

### 4. 用户可见结果优先

用户已经明确不接受：

- 长时间只有过程汇报
- 大量微调但没有明显前台结果
- “工程更优雅了”但页面还是不能直接评判

所以后续每一轮都必须以：

- 可见结果
- 截图证据
- 验证通过

作为完成标准。

### 5. 验证链必须串行

当前已知约束：

- `pnpm typecheck` 和 `CI=1 pnpm build` 不能并行跑
- 两者都会触碰 `.next/types`
- 并行会造成假性缺文件错误

所以验证链必须保持串行。

## Best Minds 收口

如果把这个问题拆给最懂的人来看，结论会收敛到同一条路径：

- `Marty Cagan` 会强调：
  - 先完成用户能直接感知的产品结果，不要把内部忙碌误当产品进展
- `Brad Frost` 会强调：
  - 先用真实页面证明模式，再抽系统；不要在页面未稳定前过早抽象
- `Vercel / React` 这一路的长期维护视角会强调：
  - 保持真实路由、类型边界、组件边界和可验证链路，比回退到“简单壳子”更适合长期 AI 协作维护

所以当前最优路径不是平均推进全部目标，而是：

1. 先承认 `Phase 1` 已完成
2. 再按优先级处理辅助承接页
3. 再把两个 demo 做成独立可演进资产
4. 再抽共享资产
5. 最后再做 preview / deploy / 域名映射

## 新的优先级结构

### Phase 0：启动与事实校准

目标：

- 读取仓库规则、memory、source of truth、旧站映射和当前 goal docs
- 确认当前活跃项目仍然是：
  - `/Users/zon/Desktop/LATINOS/sites/frontdoor`
- 确认当前 `Phase 1 completed` 事实仍和代码、截图、验证状态一致

退出条件：

- 文档与工程事实一致
- frontdoor 可运行
- 当前验证链可复现

### Phase 1：核心三页守门，不再当默认主战场

当前状态：

- `completed`

这阶段不再作为默认主战场，但必须继续守门：

- `/`
- `/daily-latin`
- `/dance-os`

允许回切的唯一条件：

- 辅助页推进时发现核心三页真实回归
- 或新的并排截图证据证明某一核心页重新掉队

否则：

- 不要回到核心三页上继续做无止境微调

### Phase 2：辅助承接页 visible pass

这是当前默认主线。

目标页按优先级排序：

1. `/legacy`
2. `/tools`
3. `/roadmap`
4. `/dashboard`
5. `/about`

当前默认 `Top 1`：

- `/legacy`

原因：

- 用户长期在意“旧站 proof 不要丢”
- `/legacy` 决定了新体系如何承接旧资产
- 它当前战略权重高于其他辅助页
- 它也最容易从“映射说明页”升级成“旧 proof 入口页”

这一阶段的目标不是补功能堆内容，而是让这些页：

- 风格与核心三页一致
- 信息结构更像承接页而不是工程页
- 在桌面端和移动端都能直接访问和理解
- 对旧站、工具、路线、状态给出真实可用入口

退出条件：

- 辅助页不再明显掉队
- 整站主前台与辅助页没有强烈割裂感

### Phase 3：两个 demo 的独立孵化与接入

这一阶段要把“想做 demo”从页面片段，升级成独立资产。

目标：

- 回到飞书文档确认“两个 demo”的真实定义与边界
- 在：
  - `/Users/zon/Desktop/LATINOS/apps/demos/`
  下建立独立 demo 目录
- 每个 demo 都具备：
  - 明确命名
  - 独立 README
  - 独立 data / schema
  - 本地可运行入口
  - 和 frontdoor 的明确链接关系

建议默认顺序：

1. 先定义两个 demo 的真实产品边界
2. 再选 `Top 1 demo`
3. 单点做出第一批真实可访问版本
4. 再做第二个 demo

退出条件：

- 两个 demo 都不再只是 frontdoor 里的“概念块”
- 至少具备可单独访问、可单独维护、可继续演进的形态

### Phase 4：共享资产沉淀

这阶段集中处理长期维护，而不是提前抽象。

目标：

- 抽离 shared components
- 抽离 content schema
- 抽离 style tokens
- 抽离 verification contracts
- 给未来：
  - `styles.zondev.top`
  - 跨站共用组件
  - 未来 App 演进
  留下清晰边界

退出条件：

- AI 修改不容易牵一发动全身
- 组件与数据边界清晰
- 共享资产能被后续站点复用

### Phase 5：preview / deploy / 域名决策

只有前面几阶段成立后才进入。

目标：

- 为 frontdoor 和 demo 建立 preview
- 验证预览地址与访问路径
- 决定旧域名如何承接：
  - 保持旧站不动
  - 新 frontdoor 并行
  - 或未来首页映射策略

强约束：

- 没有明确要求时，不直接改 `latindance.zondev.top` 生产指向
- 没有 preview 证据时，不直接做生产替换

退出条件：

- preview 可访问
- 用户认可前台完成态
- 再进入生产域名映射讨论

## 每轮循环执行规则

每一轮必须遵守以下顺序：

1. 只服务当前阶段的 `Top 1 页面 / Top 1 demo / Top 1 切片`
2. 先说明这一轮为什么选它，而不是平均推进
3. 只做能直接改善用户可见结果的改动
4. 改完后必须运行完整串行验证链
5. 只要有用户可见改动，必须补桌面端与移动端截图
6. 必须更新：
   - `docs/analysis/YYYY-MM-DD-<topic>.md`
   - `memory/YYYY-MM-DD.md`
7. 只有当这一轮通过验证并留下证据，才允许进入下一轮

不允许的行为：

- 同时平均推进多个页面
- 大量做 `1px / 2px` 微调却不给整体结果
- 只报状态不交付证据
- 只改 dev 态，不验证 fresh-prod

## 统一验收门槛

凡是 accepted change，默认都要通过：

1. `pnpm typecheck`
2. `CI=1 pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

补充要求：

- 如果改动涉及前台视觉或布局，必须补截图
- 如果改动涉及信息结构或目标切换，必须补 analysis 文档
- 如果改动改变当前阶段判断，必须在 memory 写明

## 对抗性测试

这个新 prompt 最可能失败的地方有 5 个：

### 1. 又回到核心三页无限微调

应对：

- 明确写死 `Phase 1 completed`
- 只有出现回归证据才允许回切

### 2. 辅助页又被平均推进

应对：

- 写死每轮只能有一个 `Top 1`
- 当前默认 `Top 1` 为 `/legacy`

### 3. demo 永远只停留在 frontdoor 概念块

应对：

- 单独设 `Phase 3`
- 强制把 demo 落到 `apps/demos/<demo-name>/`

### 4. 太早做组件抽象

应对：

- 把共享资产沉淀后置到 `Phase 4`
- 先让真实页面稳定，再抽公共层

### 5. 太早碰生产域名

应对：

- 部署与域名放到最后
- 保持旧站 `保留 / 映射 / 并行`

## 当前唯一推荐结论

之前的 goal 先停用。

从现在开始，最适合长期循环执行的新目标是：

- 以 `Phase 1 completed` 为起点
- 默认进入 `Phase 2`
- 当前 `Top 1` 先做 `/legacy`
- 之后按：
  - `/tools`
  - `/roadmap`
  - `/dashboard`
  - `/about`
  的顺序推进
- 辅助页对齐后，再正式做两个 demo
- demo 成立后，再抽共享资产
- 最后才做 preview / deploy / 域名决策

## 可直接复制给 Goal Mode 的最终提示词

```text
你现在在 /Users/zon/Desktop/LATINOS。

这是一个长期主题母仓，不是临时实验目录。

之前的旧目标先全部停用。从现在开始，严格以这份“LATINOS Goal Mode Priority Loop Prompt After Phase 1”作为唯一执行合同。

你的身份不是一次性改页面的执行器，而是 LATINOS 这条长期产品线的负责人、实现者、验收者和资产沉淀者。

你的任务不是平均推进所有事情，也不是继续做大量用户看不见的微调。你的任务是从当前真实基线继续往前推进，逐步完成：

1. 辅助承接页对齐
2. 两个 demo 的独立孵化与接入
3. 共享组件 / schema / tokens / 验证合同沉淀
4. preview / deploy / 域名决策

并最终满足我们最初的全部诉求：

- 样式尽量逼近 /Users/zon/Downloads/latin-workbench (2).html
- 架构长期可维护、适合 AI 协作
- 内容尽量基于本地真实资料和 Feishu source of truth
- 保留旧站 proof，不粗暴推倒
- 后续可沉淀成跨站复用组件与个人资产中台

## 当前真实状态

先接受以下事实，不要回到过期判断：

- 技术主线已锁定：
  - Next.js App Router
  - React
  - TypeScript
- Feishu 是唯一 source of truth
- 历史里提到的 Notion 一律视为旧提法，必须翻译回飞书结构
- 旧站策略仍然是：保留 / 映射 / 并行
- 当前活跃项目是：
  - /Users/zon/Desktop/LATINOS/sites/frontdoor
- 当前核心三页：
  - /
  - /daily-latin
  - /dance-os
- 到 2026-07-10 为止，这三个核心页都已完成 visible pass v3 级别的可见收口，并已通过统一 fresh-prod 验证链
- Phase 1 已完成，不要把核心三页继续当默认主战场

## 强约束

- 不要重新讨论技术选型
- 不要切到 Astro
- 不要回退到单文件 HTML
- 不要回退到 hash-tab 单页壳
- 不要推翻 Next.js App Router + React + TypeScript 主线
- 没有明确要求时，不要直接改 https://latindance.zondev.top/ 生产入口
- 不要把大量时间继续花在只有 1px / 2px 收益的微优化上
- 不要把“过程很多”误判成“结果已经完成”
- 不要只汇报过程而不给截图、验证或可见结果
- pnpm typecheck 和 CI=1 pnpm build 必须串行执行，不能并行

## 启动必读

进入任务后，按顺序读取：

1. /Users/zon/Desktop/LATINOS/AGENTS.md
2. /Users/zon/Desktop/LATINOS/README.md
3. /Users/zon/Desktop/LATINOS/MEMORY.md
4. /Users/zon/Desktop/LATINOS/memory/ 里今天最新的日志
5. /Users/zon/Desktop/LATINOS/docs/standards/source-of-truth.md
6. /Users/zon/Desktop/LATINOS/docs/standards/repo-structure.md
7. /Users/zon/Desktop/LATINOS/docs/standards/website-strategy.md
8. /Users/zon/Desktop/LATINOS/data/feishu/latinos-sources.json
9. /Users/zon/Desktop/LATINOS/docs/legacy/latindance-map.md
10. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-phase1-complete-decision.md
11. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-phase1-core-routes-side-by-side-audit.md
12. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-latinos-goal-mode-active-loop-contract.md
13. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-latinos-goal-mode-priority-loop-prompt-after-phase1.md

## 分阶段推进规则

### Phase 0：事实校准

先确认：

- 当前文档、memory、analysis 与工程事实一致
- frontdoor 仍可运行
- style lock 仍是 /Users/zon/Downloads/latin-workbench (2).html
- Phase 1 completed 的判断仍然成立

退出条件：

- 文档与代码状态一致
- 当前验证链可复现

### Phase 1：核心三页守门

当前状态：

- completed

只允许在以下情况回切：

- 辅助页推进时暴露核心三页真实回归
- 新截图证据证明某一核心页重新成为明显掉队页

否则不要把 `/`、`/daily-latin`、`/dance-os` 继续当默认主线反复微调。

### Phase 2：辅助承接页 visible pass

这是当前默认主线。

优先级顺序：

1. /legacy
2. /tools
3. /roadmap
4. /dashboard
5. /about

当前默认 Top 1：

- /legacy

这一阶段目标：

- 让辅助页风格与核心三页对齐
- 让页面更像前台承接页而不是工程文档页
- 强化真实入口、真实状态、真实链接
- 保证桌面端与移动端都能直接访问和理解

Phase 2 退出条件：

- 辅助页不再明显掉队
- 整站风格与信息架构更加统一

### Phase 3：两个 demo 的独立孵化与接入

这一阶段不要先拍脑袋造 demo。

先回到飞书文档确认两个 demo 的真实边界，再在：

- /Users/zon/Desktop/LATINOS/apps/demos/

下建立独立目录。

每个 demo 都必须具备：

- 明确命名
- 独立 README
- 独立 data / schema
- 可运行入口
- 与 frontdoor 的明确链接关系

顺序：

1. 先定义两个 demo
2. 选一个 Top 1 demo 做到可访问
3. 再做第二个 demo

### Phase 4：共享资产沉淀

只在真实页面和 demo 稳定后再做：

- shared components
- content schema
- style tokens
- verification contracts

目标是让未来 AI 修改更稳，也让后续网站和 App 能复用这套资产。

### Phase 5：preview / deploy / 域名决策

只在前面几阶段都成立后再进入：

- 建立 preview
- 验证可访问性
- 再讨论旧域名承接策略

没有明确要求时，不直接改生产指向。

## 每轮循环执行规则

每一轮必须严格按这个顺序执行：

1. 只选当前阶段的一个 Top 1 页面、Top 1 demo 或 Top 1 切片
2. 先写清楚为什么这一轮做它
3. 只做直接改善用户可见结果的改动
4. 改完后跑完整串行验证链：
   - pnpm typecheck
   - CI=1 pnpm build
   - fresh pnpm exec next start --hostname 127.0.0.1 --port 3200
   - FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes
   - FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser
   - FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs
5. 只要涉及用户可见改动，必须补桌面端和移动端截图
6. 必须更新：
   - docs/analysis/YYYY-MM-DD-<topic>.md
   - memory/YYYY-MM-DD.md
7. 只有通过验证并留下证据，才允许进入下一轮

## Stop Doing

- 不要平均推进多个页面
- 不要让低优先级页面抢走主线
- 不要只做工程清理而没有可见结果
- 不要把 demo 永远停留在页面里的概念块
- 不要过早抽公共组件
- 不要过早碰生产域名

## 当前起手动作

从当前真实状态出发：

1. 先完成 Phase 0 事实校准
2. 然后直接进入 Phase 2
3. 当前第一优先级先做 /legacy
4. 做完 /legacy 的 first visible pass 并验证后，再决定 Phase 2 的下一个 Top 1

在没有新证据证明核心三页回归之前，不要回切到 `/`、`/daily-latin`、`/dance-os` 做默认主线。
```
