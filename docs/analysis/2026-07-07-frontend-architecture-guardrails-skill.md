# 前端长期可维护架构 skill 提炼

## 背景

这次要解决的不是 `LATINOS` 单个页面怎么写，而是把已经在这条线程里逐渐收敛出的前端系统方法，沉淀成一个未来多个项目都能复用的 skill。

用户真正关心的是：

- 未来项目不要再改一个地方牵一身
- AI 接手时能快速看懂边界并稳定迭代
- 公共组件、数据、样式、路由、测试之间要可拆分
- 架构要允许渐进式演化，而不是一上来大重构

## 问题定义

要做的是一套 `适合 React / Next.js 长期演化、适合 AI 维护、并且默认自带防回归护栏` 的前端架构 skill，而不是单纯写一份“组件化是好事”的泛泛建议。

## 关键约束

1. 这套方法要能跨多个项目复用，而不是写死在 `LATINOS`。
2. 默认要支持渐进改造，不要求推倒重来。
3. 默认要把验证链一起设计进去，而不是最后补测试。
4. 公共组件库不能过早 package 化，否则维护成本会反噬。
5. 这套 skill 的说明必须足够短，能被 agent 真正稳定调用。

## Best Minds

### React 团队

最懂“组件边界应该如何保持可推理”。

当前官方文档仍然强调：

- 组件应保持 pure
- 数据通过 props 明确流动
- 不要让组件同时承担太多互相耦合的责任

### Next.js / Vercel 团队

最懂今天 React 站点在路由、服务端边界、可增长结构上的默认主线。

当前官方文档仍然支持：

- `App Router`
- `Server Components` 默认优先
- 只把真正需要交互的部分下沉为 client islands

### Playwright 团队 + Testing Library

最懂“怎样测，才不会为了测试而把测试也写成一层脆弱耦合”。

当前官方文档仍然强调：

- 先测用户可见行为
- 优先稳定定位器，不要依赖脆弱实现细节
- 把端到端测试聚焦在真实关键路径

## 方案对比

### 方案 A：继续页内堆逻辑

优点：

- 一开始最快

缺点：

- 复制文案、样式、逻辑非常快
- route 文件膨胀
- AI 很难判断该改哪一层
- 很容易出现“顺手改一个页面，别的页面跟着歪”

结论：

不适合作为长期默认方案。

### 方案 B：一开始就做独立公共组件库

优点：

- 看起来体系感最强

缺点：

- 很容易提前抽象
- API 还没稳定就要背版本成本
- 多数时候真实重复度还不够

结论：

不适合作为默认第一步。

### 方案 C：薄路由 + 数据/主题/组件分层 + 渐进验证

优点：

- AI 最容易理解 ownership
- 改动可被拆成小 patch
- 可在单项目内先验证，再决定是否抽库
- 最适合逐渐长成多个 route / demo / frontdoor

缺点：

- 一开始需要纪律
- 需要持续守住“什么东西放哪层”

结论：

这是当前最稳的默认路线。

## 当前推荐结论

截至 `2026-07-07`，对你这种会持续长、未来还希望 AI 反复维护的前端项目，当前最合适的默认主线仍然是：

- `Next.js App Router`
- `React`
- `TypeScript`
- `Server Components` 默认优先
- client islands 承担交互
- `routes / data / view-model / primitives / feature components / theme / verification` 七层分工

具体落地建议：

1. 路由只做编排，不做内容与主题的隐藏 owner。
2. 文案、指标、链接、section 顺序统一放 `data/`。
3. 颜色、间距、表面、响应式节奏统一放 `styles/` 或 `theme/`。
4. 低层复用件先在项目内共享，不要急着独立发组件库。
5. 先建立 `typecheck + build + route smoke + structure smoke + browser smoke`，再继续扩页面。

## 对抗性测试

### 最可能失败的地方

1. 名义上分层，实际上 `page.tsx` 继续偷藏 copy 和逻辑。
2. 为了“公共组件库”过早抽象，导致 API 变成新的负担。
3. 测试只测实现细节，没有测真实用户路径。
4. 每个页面各自加一套样式特例，最后 tokens 形同虚设。

### 如何防

1. 任何新改动先回答“归哪层”。
2. 共享 primitive 至少经过三次真实复用再提升。
3. browser smoke 永远覆盖最关键路径，而不只是渲染成功。
4. 新 bug 修复后补一条最小回归测试，而不是只改代码。

## Skill 设计结论

新 skill 应该是一个 `workflow + guardrails` 型 skill，而不是单纯参考文档型 skill。

它需要包含：

- 触发条件
- 七层 ownership 规则
- 渐进抽象顺序
- 公共组件的升级门槛
- 自动化验证梯子
- should trigger / should not trigger / reuse test

## 已落地产物

1. 新 skill：
   - `/Users/zon/.codex/skills/frontend-architecture-guardrails/`
2. skill references：
   - `architecture-playbook.md`
   - `testing-guardrails.md`

## 下一步

1. 先把这个 skill 用在未来一个新的前端项目里，看触发是否自然。
2. 如果以后稳定复用，再考虑加模板脚手架或验证脚本。
3. 在真的出现第二个、第三个项目复用同一套 primitives 之前，不要急着拆独立组件库。

## 参考来源

- React: [Keeping Components Pure](https://react.dev/learn/keeping-components-pure)
- React: [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- Next.js: [Project Structure and Organization](https://nextjs.org/docs/app/getting-started/project-structure)
- Next.js: [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- Playwright: [Best Practices](https://playwright.dev/docs/best-practices)
- Testing Library: [Guiding Principles](https://testing-library.com/docs/guiding-principles/)
