# LATINOS Goal Mode Prompt vNext

## 背景

这不是一次性“改页面”的 prompt。

这是给一个会持续运行数天、持续修改、持续验证、持续沉淀的 Goal 模式 agent 的长期执行提示词。

这次收束后的核心前提已经明确：

- 当前长期主线不是继续争论框架
- 当前长期主线不是回到单文件 HTML
- 当前长期主线不是把视觉参考和真实内容拆成两条线

当前唯一推荐主线是：

`Next.js App Router + React + TypeScript + 真实路由 + 组件化 + 数据与组件分离 + tokens 化样式管理 + 持续验证`

## 问题定义

真正要解决的不是“让某一页更像参考稿”。

真正要解决的是：

**把 `LATINOS/sites/frontdoor` 持续推进成一个长期可维护、长期可验证、长期可复用的拉丁主题前台系统，并让它同时承接 `Daily Latin IP + 拉丁成长网站 + Dance Tools / Demos`。**

## 关键约束

### 1. 视觉约束

样式必须尽量逼近这个参考：

- `/Users/zon/Downloads/latin-workbench (2).html`

这里的“逼近”不是只学局部卡片，而是要整体对齐：

- 首页结构
- 导航壳体
- 模块节奏
- 版面比例
- 卡片密度
- 文本层级
- 色系与材质感
- 移动端与桌面端的一致体验

### 2. 技术约束

当前长期主线已经锁定：

- `Next.js App Router`
- `React`
- `TypeScript`

不要重新提议：

- Astro 作为当前主站主线
- 回退成单文件 HTML 大壳
- 回到 hash-tab 切页模型
- 因为局部页面简单就改成另一套技术栈

### 3. 内容约束

这条线以 `Feishu` 为唯一 source of truth。

如果材料里出现 `Notion`：

- 视为历史提法
- 必须翻译回飞书结构
- 不要扩写新的 Notion 工作流

至少围绕以下飞书材料持续回填：

- `LATIN`
- `直播计划`
- `拉丁dance os构思`
- `DANCE OS DEMO v1.0`

来源索引在：

- `/Users/zon/Desktop/LATINOS/data/feishu/latinos-sources.json`

### 4. 资产约束

旧站不是废稿。

已知旧站：

- live: `https://latindance.zondev.top/`
- source: `/Users/zon/Desktop/MINE/9_latin/apps/latinDance`

对旧站默认策略是：

- `保留`
- `映射`
- `并行`

不要默认：

- 推倒重做
- 直接迁目录
- 直接改生产域名首页

### 5. 维护约束

目标不是“当前能跑”。

目标是让后续 AI 修改时：

- 不会牵一发动全身
- 不会为了改一个模块破坏其他页面
- 不会长期依赖假数据和模板文案
- 不会每次都重新判断结构

## 已锁定结论

以下结论优先级最高，后续 agent 不要重复推翻：

### 项目位置

- 当前活跃项目：
  - `/Users/zon/Desktop/LATINOS/sites/frontdoor`

### 当前主线栈

- `Next.js App Router + React + TypeScript`

### 当前主站定位

不是简单 landing page，而是：

`Latin Dance OS = Daily Latin IP + 拉丁成长网站 + Dance Tools / Demos`

### 当前执行重点

不是重新选型，而是继续推进：

- `视觉逼近参考稿`
- `组件边界抽稳`
- `真实内容回填`
- `响应式与密度优化`
- `验证链持续收紧`
- `可复用组件与数据层沉淀`

### 当前已验证的移动端压缩基线

在 `390px` 宽度下，最新 fresh-prod broad baseline 为：

- `/ = 1513`
- `/daily-latin = 1591`
- `/dashboard = 1600`
- `/dance-os = 1597`

这组数据不是最终目标，只是新的起跑线。

任何后续 compact pass 都必须遵守：

- `single-point only`
- 只有当 `route 总高度` 和 `目标 section 高度` 都下降时，才算通过
- 不允许把失败实验伪装成通过结果

## Best Minds 收束

如果从长期前端主线、组件沉淀、AI 维护、未来跨站与未来 App 兼容性的角度综合判断，当前最接近正确答案的人会给出类似收束：

### React / Next 视角

不要把问题理解成“哪个框架当下更轻”。

要把问题理解成：

- 哪条主线最适合长期复用组件
- 哪条主线最适合清晰路由与布局边界
- 哪条主线最适合自动化验证
- 哪条主线最适合 AI 连续接力维护

在这个问题上，`Next.js App Router + React + TypeScript` 明显优于再开一条 Astro 主线。

### 设计系统视角

长期最值钱的不是单个页面，而是这几层能不能被沉淀成资产：

- `design tokens`
- `layout primitives`
- `shell/navigation primitives`
- `card/list/section primitives`
- `content schema`
- `route contracts`
- `verification contracts`

### 产品架构视角

`frontdoor` 应该像“统一入口与品牌壳”，而不是把所有东西塞进一个页面。

更重的交互或工具，应该在清晰边界内成长成独立 demo 或独立应用，但仍复用共享样式、共享组件与共享内容结构。

## 推荐结论

### Top 1 路线

继续以 `sites/frontdoor` 为主战场，沿着以下模式推进：

1. `Next.js App Router` 作为统一路由和布局壳
2. `React 组件` 作为 UI 组合基础
3. `TypeScript` 约束内容结构、组件 props、共享 contracts
4. `data/content` 与 `components` 分离
5. `styles tokens / layout / module` 分层
6. `真实内容逐步替换模板文本`
7. `移动端优先验证 + 桌面端复核`
8. `每轮改动都经过 fresh-prod 验证`

### 当前不推荐路径

- 重新切回 Astro 主线
- 回到静态 HTML 单文件
- 回到 hash-tab 单页壳
- 视觉不断漂移，不再锁定参考稿
- 新增大量模块但不补数据层与验证层

## 对抗性测试

如果这个方向失败，最可能死在下面几类问题里：

### 1. 只顾样式，不做结构

风险：

- 看起来越来越像参考稿
- 但项目内部越来越难改

应对：

- 每次样式改动都要同步判断是否应该抽成组件或 token

### 2. 只顾结构，不做内容回填

风险：

- 代码越来越漂亮
- 页面仍然像空壳模板

应对：

- 每个路由都要持续用真实拉丁内容替换占位文本

### 3. 只顾桌面，不顾移动端

风险：

- 桌面截图好看
- 手机不可用

应对：

- 每轮必须先过 `390px`，再看桌面

### 4. 只顾通过单点验证，不看全局回归

风险：

- 某个 section 更紧了
- 其他页面被挤坏了

应对：

- 每轮必须走完整验证链，而不是局部截图自证

## 适合直接开 Goal Mode 的提示词

下面这段是可直接复制版本。

```text
你现在在 /Users/zon/Desktop/LATINOS。

这是一个长期主题母仓，不是临时实验目录。

你的任务不是“做一个页面”，而是把 /Users/zon/Desktop/LATINOS/sites/frontdoor 持续推进成一个长期可维护、可验证、可复用的拉丁主题前台系统，并让它同时承接：

Latin Dance OS = Daily Latin IP + 拉丁成长网站 + Dance Tools / Demos

你必须同时满足这四个目标：

1. 样式目标
让站点的视觉语言、首页布局、导航壳体、模块结构、卡片密度、节奏和色系尽量逼近 /Users/zon/Downloads/latin-workbench (2).html。

2. 架构目标
坚持长期 AI 可维护的前端架构：真实路由、组件化、数据与组件分离、样式 token 化、内容 schema 化、验证链可持续。

3. 内容目标
尽量使用 LATINOS 本地已有真实资料、飞书来源、旧站 proof 和仓库文档来填充页面，而不是长期停留在模板文案。

4. 资产目标
为未来抽取共享组件、共享样式、共享内容结构、跨站复用和后续 App 演进保留清晰边界。

你不是一次性美化工具。你是这条产品线的长期技术负责人和实现者。

## 先读这些文件，按顺序

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
11. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-06-frontdoor-component-architecture.md
12. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-06-personal-frontend-stack-strategy.md
13. /Users/zon/Desktop/LATINOS/docs/analysis/2026-07-10-latinos-goal-mode-prompt-next-frontdoor.md

## 视觉锁定参考

必须把这个文件当成 style lock：

- /Users/zon/Downloads/latin-workbench (2).html

不要自行发散出新的色系、新的布局系统、新的导航结构，除非已经证明参考稿本身无法支持当前真实内容。

## 内容 source of truth

这条线以 Feishu 为准。

如果历史材料里提到 Notion：

- 视为旧提法
- 必须翻译回飞书对应结构
- 不要扩写新的 Notion 工作流

至少围绕这些飞书文档进行内容映射与页面回填：

- LATIN
- 直播计划
- 拉丁dance os构思
- DANCE OS DEMO v1.0

详见：

- /Users/zon/Desktop/LATINOS/data/feishu/latinos-sources.json

## 已锁定，不要再争论

当前前端主线已经锁定为：

- Next.js App Router
- React
- TypeScript

不要再提议：

- 回到单文件 HTML
- 回到 hash-tab 单页壳
- 让 Astro 取代当前主线
- 为了局部简单重新换栈

当前活跃项目就在：

- /Users/zon/Desktop/LATINOS/sites/frontdoor

## 对旧站的态度

旧站是已上线 proof，不是垃圾。

已知旧站：

- live: https://latindance.zondev.top/
- source: /Users/zon/Desktop/MINE/9_latin/apps/latinDance

默认策略：

- 保留
- 映射
- 并行

没有明确要求时：

- 不要直接改生产域名指向
- 不要直接改旧站生产首页
- 不要把旧站强行迁到新仓

## 工作方式

你要按“长期 AI 可维护”的方式推进，而不是追求一次性看起来更像。

默认优先级顺序：

1. 先守住架构边界
2. 再逼近视觉参考
3. 再持续回填真实内容
4. 再抽取共享组件与共享数据结构
5. 再扩 demo 或工具

## 你必须追求的结构结果

最终要让 frontdoor 逐步具备这些特征：

- 真实 route 明确
- layout shell 稳定
- 页面 section 可独立维护
- 重复 UI 已提炼成共享组件
- 页面内容尽量从 data/content 层驱动
- 样式尽量从 tokens 和模块样式驱动
- demo 与正式承接内容边界清晰
- 改一个模块不会轻易破坏其他模块

## 组件化与数据分离原则

默认把变动点拆到这几层思考：

1. theme/tokens
2. layout shell
3. section primitives
4. route-specific blocks
5. content/data
6. demo/stateful widgets

如果一个改动同时影响多个页面，就优先考虑是不是应该提炼到共享层，而不是复制 patch。

## 响应式要求

必须保证电脑和手机都能正常访问。

不要只看桌面。

每轮都至少验证：

- 390px mobile
- 常规 desktop

移动端不是补救项，而是主验收维度之一。

## 当前 compact loop 规则

如果你继续做移动端密度与压缩优化，必须遵守：

- single-point only
- 只有当 route 总高度和目标 section 高度都下降时，该轮才算通过
- 失败实验不得保留在源码中
- 失败实验不得写成已通过结论

当前 fresh-prod broad baseline 参考值：

- / = 1513
- /daily-latin = 1591
- /dashboard = 1600
- /dance-os = 1597

这组数据是起跑线，不是终点。

## 验证规则

任何较大改动后，都要尽量走完整验证链：

- pnpm typecheck
- pnpm build
- fresh next start
- smoke routes
- smoke browser
- 必要时重新测量 mobile broad baseline

不要只凭 dev server 页面主观判断“应该没问题”。

## 文档与记忆要求

每当你做出重要架构决策、验证通过的样式收缩、组件拆分、内容回填策略变化时：

- 把深度分析写到 /Users/zon/Desktop/LATINOS/docs/analysis/
- 把当天关键结论追加到 /Users/zon/Desktop/LATINOS/memory/YYYY-MM-DD.md

不要只改代码不落盘。

## 执行节奏

你应该用循环方式工作：

1. 读上下文与当前代码结构
2. 找到当前最该收敛的一个问题
3. 做最小但真实的改动
4. 跑验证
5. 记录结论
6. 再进入下一轮

不要同时大面积重写多个方向。

## 目标导向

只有当下面这些事情已经明显成立时，才可以认为阶段性完成：

- 样式已经高度逼近参考稿
- 首页和主要路由结构稳定
- 组件化与数据分离结构清晰
- 移动端和桌面端都稳定
- 页面内容大量替换为真实拉丁资料
- 共享组件与共享内容结构开始具备跨站复用价值

在此之前，不要轻易把任务定义为完成。
```

## 下一步建议

如果你要立刻开启 goal mode，建议直接使用上面的整段提示词。

如果你想再强化执行效果，可以在开跑时额外补一句：

`优先推进当前 sites/frontdoor，不重新开新项目，不重新做技术选型，先把现有 Next 基线打磨到真正可长期维护。`
