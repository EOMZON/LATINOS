# LATINOS Frontdoor 组件化与长期架构建议

## 背景

当前 `LATINOS` 的 frontdoor 已经把视觉方向对齐到参考稿，但实现方式仍然是：

- 单文件 `index.html`
- 大量内联 CSS
- 大量内联 HTML 内容
- 一份 JS 同时管理 hash 路由、tab 切换、热力图、过滤器、看板柱状图

这让它可以很快出效果，但很难长期维护，尤其在：

- 新页面越来越多
- Daily Latin / Dance OS 继续扩
- AI 持续参与修改
- 需要电脑 / 手机同时稳定展示

时，风险会迅速上升。

## 问题定义

真正要解决的不是“选 React 还是不选 React”。

真正要解决的是：

**怎样让 `LATINOS` 的前台在保持统一风格的前提下，变成一个对 AI 友好、对内容友好、对长期演化友好的系统。**

## 当前问题诊断

### 1. 当前不是“tab 没反应”，而是“模块内容承接太弱”

以 `Dance OS` 为例，当前页已经切到了对应模块，但首屏主要是大面积占位卡片，信息密度偏低，所以主观感受会像“点进去没有具体内容”。

对应位置：

- [index.html](/Users/zon/Desktop/LATINOS/docs/legacy/frontdoor-static-workbench-v0/index.html:567)
- [index.html](/Users/zon/Desktop/LATINOS/docs/legacy/frontdoor-static-workbench-v0/index.html:585)

### 2. 当前移动端有真实 bug，不只是“响应式没做好”

当前 CSS 里本来写了小屏隐藏侧栏：

- [index.html](/Users/zon/Desktop/LATINOS/docs/legacy/frontdoor-static-workbench-v0/index.html:40)

但后面又重新定义了 `.sidebar { display:flex; }`：

- [index.html](/Users/zon/Desktop/LATINOS/docs/legacy/frontdoor-static-workbench-v0/index.html:43)

因为后定义覆盖前定义，所以在窄屏里仍然显示了整列侧栏，内容被挤掉。这也是为什么你在窄屏时会感觉“看不到所有内容”。

### 3. 当前实现把“路由 / 内容 / 样式 / 交互”绑在了一起

比如：

- 页面路由状态：`.page.active`
- 导航结构：`data-page`
- 页面正文：每个 `.page` 大块 HTML
- 页面特效：热力图 / tabs / bars 的 JS

全部塞在同一个文件里。

这意味着 AI 改一个模块时，很容易误碰：

- 其他模块内容
- 全局样式
- hash 路由
- 交互脚本

### 4. 当前顶层导航其实更适合“真实路由”，不适合“隐藏 div 切页”

`home / log / moves / assets / tools / roadmap / dashboard / about`

这一组已经不是单个页面里的“局部 tab”了，而更像：

- `/`
- `/legacy`
- `/daily-latin`
- `/dance-os`
- `/tools`
- `/roadmap`
- `/dashboard`
- `/about`

继续把它们放在一个 HTML 里用 `display:none` 切换，后续会越来越难维护。

## Best Minds

### 1. Dan Abramov / React 文档视角

React 官方在 *Thinking in React* 里建议：

- 先把 UI 拆成组件层级
- 先做静态版本
- 再把最小状态单独提出来

这跟 `LATINOS` 当前问题非常契合，因为现在最大的问题就是：

- 组件层级不清
- 数据模型和 UI 没对齐
- 页面状态与内容耦合太深

### 2. Jason Miller / Islands Architecture 视角

Astro 官方对 Islands Architecture 的描述非常适合这类“内容站 + 少量交互”的场景：

- 大部分页面输出为静态 HTML
- 只有需要交互的局部组件才加载 JS

这正符合 `LATINOS` frontdoor 的本质：

- 大多数内容是信息承接
- 少量位置需要交互，如：
  - tab/filter
  - dashboard
  - heatmap
  - future demo widgets

### 3. Lee Robinson / Next.js 项目组织视角

Next.js 官方在 App Router 文档里强调：

- 项目文件可以安全 colocate
- 可以按 route / feature 分组
- 可以用 route groups / private folders 把路由和实现细节分开

这对 AI 维护非常关键，因为好的目录边界就是 AI 的“护栏”。

## 方案对比

### 方案 A：继续单文件 HTML，只做局部拆分

做法：

- 把 CSS 抽成独立文件
- 把 JS 抽成独立文件
- 用 JSON 管内容

优点：

- 改动最小
- 很快

缺点：

- 仍然缺真实组件系统
- 路由与内容承接仍脆
- AI 继续改时仍容易跨区误伤
- 长期扩 Daily Latin / Dance OS 会越来越难

结论：

- 适合 1-2 周临时救火
- 不适合你这个长期母仓

### 方案 B：纯 React/Vite SPA

做法：

- 用 Vite 建一个 React SPA
- 所有页面和状态都进 React

优点：

- 组件化很强
- 前端生态成熟
- AI 很容易生成组件代码

缺点：

- 对 frontdoor 这种“以内容为主”的站来说偏重
- 默认会把整个入口更像一个应用，而不是高质量静态前台
- 如果未来多数页面仍是内容页，这会造成额外复杂度

结论：

- 适合“Dance OS 已经是完整产品”的时候
- 不适合作为现在 frontdoor 的最佳起点

### 方案 C：直接用 Next.js App Router 全量重构

做法：

- 新 frontdoor 直接上 Next.js
- 所有页面变真实 route
- 组件按 route / feature 管理

优点：

- 你历史上已经有 Next.js 成功样本：
  - [package.json](/Users/zon/Desktop/MINE/9_latin/apps/latinDance/package.json:1)
  - [app/page.tsx](/Users/zon/Desktop/MINE/9_latin/apps/latinDance/app/page.tsx:1)
- 组件化、路由、布局能力强
- 未来如果要接复杂交互和数据，也够用

缺点：

- 对当前 frontdoor 来说仍偏重
- 会把“内容承接站”和“工具型 demo”过早绑成同一技术重心
- 如果只是为了更好地承接内容与少量交互，成本略高

结论：

- 是可靠的第二选择
- 如果你强烈希望和旧站技术栈统一，可以走这条

### 方案 D：Astro 作为前台壳 + React islands 承载交互

做法：

- 新 frontdoor 用 Astro
- 静态内容、布局、SEO、响应式壳体用 Astro
- 交互模块用 React islands
- 内容源用 Astro content collections / typed data

优点：

- 非常适合“内容站 + 少量交互”
- 样式一致性更容易守住
- JS 只在需要的位置加载
- 对 AI 维护友好：
  - layout 独立
  - component 独立
  - content data 独立
  - interactive island 独立
- 未来仍可嵌 React 组件，不会把你锁死

缺点：

- 需要引入一个新栈
- 团队需要接受 Astro 这层壳

结论：

- **这是当前最优解**

## 推荐结论

### Top 1

对 `LATINOS` 当前阶段，我推荐：

**frontdoor 用 Astro 重构，交互用 React islands，重度 demo 继续单独长成 React/Next 应用。**

也就是说：

- `frontdoor` 是站点壳
- `Daily Latin / Dance OS` 是模块与分支
- 轻交互留在 frontdoor 内
- 重交互 demo 再独立成长

这比“现在就把整个母仓都压到 React SPA 或 Next 全站”更稳。

## 为什么这条路最适合你

### 1. 它最贴合这条线的内容结构

你这里不是纯工具站，也不是纯博客，而是三线并行：

- Daily Latin IP
- 拉丁成长网站
- Dance Tools / Demos

Astro 壳 + React islands 正好允许：

- 外层站点保持静态、清晰、快
- 内层局部模块保留交互能力

### 2. 它最适合 AI 协作

对 AI 最友好的不是“最强框架”，而是“最清晰边界”。

Astro + 组件 + typed content data 可以自然把修改边界拆成：

- layout
- navigation
- cards
- page sections
- content schema
- data entries
- interactive widgets

这样 AI 改一个卡片，不必碰整个页面。

### 3. 它允许你保留旧站，不强绑迁移

旧站已经是 Next.js，且已上线。现在不必强行迁。

更好的做法是：

- `LATINOS` 新 frontdoor 独立成长
- 旧站继续保留为 legacy proof
- 以后如果某些组件或内容结构验证成功，再选择性回迁

## 推荐的信息架构

### 站点层

不要再把顶层模块当“隐藏 div tab”。

改成真实页面：

1. `/`
2. `/legacy`
3. `/daily-latin`
4. `/dance-os`
5. `/tools`
6. `/roadmap`
7. `/dashboard`
8. `/about`

这样做的好处：

- 移动端直接天然成立
- SEO / 分享 / 回访路径更清晰
- AI 改某一页时更不容易误伤其他页

### 页面层

在每个真实页面里，再使用局部 tabs / filters。

例如：

- `/dance-os`
  - `全部`
  - `产品模块`
  - `来源文档`
  - `现有页面`
  - `未来工具`

这类 tab 才适合做成组件级交互。

## 推荐目录结构

```text
sites/frontdoor/
  package.json
  astro.config.mjs
  tsconfig.json
  src/
    pages/
      index.astro
      legacy.astro
      daily-latin.astro
      dance-os.astro
      tools.astro
      roadmap.astro
      dashboard.astro
      about.astro
    layouts/
      WorkbenchLayout.astro
    components/
      shell/
        Sidebar.astro
        MobileNav.astro
        Topline.astro
      sections/
        HeroPanel.astro
        DetailPanel.astro
        SectionHeader.astro
      cards/
        ModuleCard.astro
        LogCard.astro
        MoveCard.astro
        AssetCard.astro
        DashCard.astro
      islands/
        PageFilterTabs.tsx
        Heatmap.tsx
        ProgressRing.tsx
        DashboardBars.tsx
    data/
      site/
        meta.json
        navigation.json
      modules/
        daily-latin.json
        dance-os.json
        legacy.json
        dashboard.json
    styles/
      tokens.css
      globals.css
      utilities.css
    content.config.ts
```

## 内容管理建议

### 原则

**内容不要继续写死在组件里。**

改成：

- 样式在 `styles/`
- 结构在 `components/`
- 页面编排在 `pages/`
- 内容在 `data/` 或 `content collections`

### 对你这个项目最合适的内容类型

#### 1. 相对稳定的结构化内容

放 `data/*.json` 或 `data/*.ts`

例如：

- 导航
- hero 数据
- 模块卡片
- legacy 入口
- dashboard 统计

#### 2. 会不断扩的内容块

放 Astro content collections

例如：

- daily-latin modules
- dance-os modules
- roadmap entries
- future demos

这样可以拿到：

- schema 校验
- 类型提示
- AI 更不容易写错字段

## 组件设计原则

### 1. 一层只管一件事

例如：

- `WorkbenchLayout` 只管壳体
- `Sidebar` 只管导航
- `AssetCard` 只管卡片展示
- `PageFilterTabs` 只管局部筛选

### 2. 组件不直接知道业务真相

不要在组件里写：

- “直播计划”
- “DANCE OS DEMO v1.0”
- “旧站首页”

这些应从数据传入。

### 3. 状态只留最小集合

例如：

- 当前 page
- 当前 filter
- 当前 selected card

其他内容都从数据推导。

### 4. 顶层导航用真实路由，不用全站级 JS 切页

这是本次最重要的 stop doing。

## 如果你坚持统一技术栈到 React / Next

第二推荐是：

**直接用 Next.js App Router 重做 new frontdoor。**

理由：

- 你已有旧站经验
- 官方支持按 route / feature 组织
- 私有文件夹 / route groups 对 AI 很友好

但我仍然不建议现在把“所有 frontdoor + demo + future tool”一次性压成一个 Next 应用。

更稳的做法是：

- frontdoor 先独立
- demo 继续边界清晰

## 对抗性测试

### 反方 1：Astro 会不会增加学习成本？

会，但成本是一次性的。

相比之后长期承受：

- 单文件 HTML 演化失控
- AI 每次改动互相污染
- 移动端和桌面端反复修

这点成本是值得的。

### 反方 2：为什么不直接沿用旧站 Next.js？

可以，但这会更容易让“旧站逻辑”和“新母仓逻辑”再次混在一起。

当前阶段更重要的是：

- 立清边界
- 让新 frontdoor 自己长稳

### 反方 3：为什么不继续纯静态 HTML？

因为你现在的问题已经不是“有没有页面”，而是：

- 内容越来越多
- AI 会不断参与
- 页面要多端适配
- 模块要长期扩展

这时候继续纯单文件，是在放大后期维护成本。

## 当前最小验证

### 本周就该做的

1. 把当前 frontdoor 从单文件切成真正项目
2. 顶层模块改成真实路由
3. 把内容抽出到数据文件
4. 先只保留 3-5 个核心组件类型
5. 先做一版完整的移动端导航

### 暂时不要做的

1. 不要一开始就把所有 future demos 全并进去
2. 不要先做复杂动画系统
3. 不要先上很重的数据层
4. 不要先改旧站生产入口
5. 不要继续在一个 HTML 里藏所有页面

## 结论

一句话收口：

**对 `LATINOS` 来说，最佳长期方案不是继续补单文件 HTML，也不是立刻把全站做成一个大 React SPA，而是用 Astro 建前台壳、用 React 承担局部交互、用真实路由拆页面、用 typed content/data 管内容。**

这条路最稳，也最适合你后面持续用 AI 来改。

## 参考来源

- React: [Thinking in React](https://react.dev/learn/thinking-in-react)
- Astro: [Islands architecture](https://docs.astro.build/en/concepts/islands/)
- Astro: [Content collections](https://docs.astro.build/en/guides/content-collections/)
- Next.js: [Project structure and organization](https://nextjs.org/docs/app/getting-started/project-structure)
