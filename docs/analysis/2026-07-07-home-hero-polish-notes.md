# 2026-07-07 Home Hero Polish Notes

## 背景

这一轮不是继续加功能，而是继续把首页上半屏收得更像参考稿：

- `/Users/zon/Downloads/latin-workbench (2).html`

目标是缩小下面几个差距：

- `topline -> hero` 的信息强弱
- hero 左卡的内部结构
- hero 左右块的最终比例感
- 移动端 hero 是否和桌面端保持同一语言

## 这轮改动

实际改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/sections/page-header.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`

核心动作：

1. 把 `PageHeader` 从“弱说明”拉回更接近参考稿的短标题结构。
2. 把 hero 左卡从偏松散的 grid 感，收成更接近参考稿的：
   - 主字
   - 旁注
   - 主句
   - 说明
   - stats
3. 让 `phaseNote`、`tag`、`description` 的断行更主动，而不是被容器被动挤出来。
4. 让 stats 区和 hero 右卡的节奏更完整，减少空洞感。
5. 手机端同步采用同一套结构，而不是单独走另一套排版逻辑。

## 结果判断

从这轮桌面端和移动端真实截图看：

- 首页 hero 已经比前一轮更接近参考稿
- 左卡内部关系更清楚了
- `topline -> hero` 的节奏更成立
- 手机上半屏也更统一，不再像“桌面端做了一版、手机端另凑一版”

## 仍然存在的差距

当前还没有达到“近似同款完成度”。

剩余差距更集中在这些点：

1. hero 左右块比例还可以再微调
2. 左卡大字和右侧旁注之间的最终平衡还可以继续收
3. 首页顶部整体完成感虽然更强了，但和参考稿相比仍稍微偏“工程感”

## 当前推荐的下一轮动作

不要再发散去改别的页。

下一轮继续优先：

1. hero 左右块比例微调
2. 左卡主字与旁注的最终平衡
3. 上半屏最终留白和完成感 polish

## 后续补的一轮更细 hero 呼吸感收口

之后又补了一轮更小但更针对参考稿的收口，重点不是重排结构，而是：

- 把 hero 左卡的 `stats` 更明确地压到底部
- 把左卡中段拉出更像参考稿的呼吸感
- 把旁注的垂直位置再往参考稿靠近一点

这轮主要改的是：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 这轮后的新判断

从最新截图看：

- 左卡的下半段比上一轮更接近参考稿
- stats 不再显得“紧贴正文”，而是更像独立的底部信息带
- 整个 hero 左卡的完成感比上一轮更强

但剩余差距仍然存在：

1. 旁注在手机端仍然偏挤
2. hero 左右块比例虽然更接近了，但还可以再做最后一层微调
3. 整页的“参考稿完成感”仍然差最后一点非常细的 polish

## 后续又补了一轮旁注微调

之后又补了一轮非常小的微调，目标只有一个：

- 让 hero 旁注，尤其是手机端旁注，不要再显得那么挤

这轮改动依然只动：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

这轮主要做了：

- hero 左右块比例再轻微调整
- 桌面端 `day-row` gap 和旁注宽度更保守
- 手机端旁注字体、宽度和对齐方式再压一层

## 这轮后的最新判断

- 手机端旁注比上一轮更顺了
- hero 左卡顶部关系更自然
- 但距离“参考稿近似同款完成度”仍然还差最后一点点：
  - 整页仍然还有轻微工程感
- hero 比例已经很接近，但还不是完全锁定

## 后续又补了一轮 hero 组件化抽离

为了避免首页 hero 继续作为一大块内联结构留在：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/page.tsx`

之后又做了一轮偏架构层的收口：

- 新增：
  - `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/sections/home-hero.tsx`
- 同时让：
  - `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/page.tsx`
  - 直接改为调用 `HomeHero`

这一轮没有追求明显视觉改版，而是把当前已经收出来的 hero 结构稳定成独立 section，方便后续继续做最后一层视觉 polish，而不必每次在 page 文件里硬改大段 JSX。

## 这轮后的判断

- 组件化抽离后，当前视觉没有回退
- `pnpm verify` 和截图复核都继续通过
- 这让首页 hero 后续继续微调时更安全，也更符合长期 AI 可维护目标

## 后续又补了一轮 hero 右卡结构收口

在 `HomeHero` 独立组件已经成立之后，又继续把右卡从更平均的堆叠关系，收成更明确的：

- 上半段：ring
- 下半段：session + CTA

这轮主要改动：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/sections/home-hero.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 这轮后的判断

- 右卡结构更清楚了
- 桌面端和手机端都没有出现视觉回退
- 当前 hero 已经不只是更接近参考稿，也已经更像一个稳定的可复用 section

## 后续又补了一轮当前状态内容对齐

之后又补了一轮更偏“真实内容状态”的收口，目标不是改布局，而是让首页最上方状态更符合当前实际进展。

这轮主要更新：

- `pill` 从 `2026-07-06` 更新到 `2026-07-07`
- `sessionValue` 从更泛的 `routes / demos parallel` 改成更贴近当前状态的：
  - `frontdoor / demos parallel`

实际改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 这轮后的判断

- 首页顶部状态更接近当前真实进度
- 最新状态文案更新后，桌面端和手机端都没有视觉回退
- 这让当前首页不只是在“样子上像”，也在“状态表达上更真”

## 后续又补了一轮工作台矩阵轻量化

在继续看首页整体时，发现下半段 `工作台` 仍然是一个明显差距：

- 当前之前版本更像“卡片墙”
- 参考稿更像“轻量文本矩阵”

所以之后又继续把 `HomeModuleCard` 从重卡片壳收成更开放的矩阵单元。

这轮主要改动：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/cards/home-module-card.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 这轮后的判断

- 首页下半段比之前更接近参考稿
- 模块不再显得像一排产品卡，而更像工作台入口矩阵
- 桌面端和手机端都没有出现结构回退

## 后续又补了一轮 Queue 开放式收口

继续看首页下半段时，`Next Session Queue` 仍然偏厚：

- 它更像一个功能面板
- 参考稿语言则更偏开放式入口区

所以之后又继续把 queue 从“厚面板 + 小卡片”收成更开放的结构。

这轮主要改动：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 这轮后的判断

- queue 现在更像开放式入口区
- 首页下半段的 `queue + module matrix` 语言更统一
- 桌面端和手机端都没有视觉回退

## 后续又补了一轮首页信息密度收口

在 queue 变成开放式入口区之后，再看首页整体，会发现当前最主要的变化已经不是“大结构换没换”，而是：

- 首页上下半段的信息密度是否足够接近参考稿

这轮确认后的结论是：

- hero 已经是相对稳定的 section
- queue 已经从厚面板明显收轻
- workbench 也已经从卡片墙明显收成矩阵

也就是说，当前首页与参考稿之间的差距，已经越来越集中到非常细的文本密度和完成感 polish，而不是结构层面的错误。

## 这轮证据

参考：

- `/tmp/latinos-goal-evidence/reference-desktop-turn.png`
- `/tmp/latinos-goal-evidence/reference-mobile-turn.png`

当前：

- `/tmp/latinos-goal-evidence/home-desktop-hero-structure-pass.png`
- `/tmp/latinos-goal-evidence/home-mobile-hero-structure-pass.png`
- `/tmp/latinos-goal-evidence/home-desktop-hero-breathing-pass.png`
- `/tmp/latinos-goal-evidence/home-mobile-hero-breathing-pass.png`
- `/tmp/latinos-goal-evidence/home-desktop-hero-note-pass.png`
- `/tmp/latinos-goal-evidence/home-mobile-hero-note-pass.png`
- `/tmp/latinos-goal-evidence/home-desktop-hero-component-pass.png`
- `/tmp/latinos-goal-evidence/home-mobile-hero-component-pass.png`
- `/tmp/latinos-goal-evidence/home-desktop-hero-right-structure-pass.png`
- `/tmp/latinos-goal-evidence/home-mobile-hero-right-structure-pass.png`
- `/tmp/latinos-goal-evidence/home-desktop-latest-status-pass.png`
- `/tmp/latinos-goal-evidence/home-mobile-latest-status-pass.png`
- `/tmp/latinos-goal-evidence/home-desktop-module-matrix-pass.png`
- `/tmp/latinos-goal-evidence/home-mobile-module-matrix-pass.png`
- `/tmp/latinos-goal-evidence/home-desktop-queue-open-pass.png`
- `/tmp/latinos-goal-evidence/home-mobile-queue-open-pass.png`

## 后续又补了一轮 hero 完成感微调

之后又补了一轮更小的 hero 收口，这轮仍然没有改首页结构，而是继续做最后一层：

- 左卡旁注不要再被挤成 3 行
- 右卡状态文案不要再那么像工程占位词
- 左右卡整体比例和呼吸感再往参考稿靠一点

这轮主要改动：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

这轮核心动作：

1. 把 `phaseNote` 从：
   - `旧站保留 / 新入口并行`
   - 收成更短的：
   - `旧站保留 / 新线并行`
2. 把 hero 主句从：
   - `Daily · 成长站 / Dance Tools`
   - 收成更接近当前实际主线的：
   - `Daily · 成长站 / Dance OS`
3. 把右卡 `sessionValue` 从：
   - `frontdoor / demos parallel`
   - 收成更短的：
   - `frontdoor · demos`
4. 同时继续通过共享样式层微调：
   - hero 左右列比例
   - `day-row` gap
   - 旁注宽度和字级
   - 右卡 ring 尺寸
   - 右卡 session 区密度

## 这轮后的判断

从最新桌面端截图看：

- 左卡旁注已经不再被挤成 3 行，而是更接近参考稿那种 2 行短注
- 右卡状态区比前一轮更干净
- 整个 hero 的“工程感”又退了一点

从最新手机端截图看：

- 顶部文案和 pill 仍然稳定
- 没有出现新的横向溢出
- 移动端壳层和首页上半屏语言仍保持统一

## 这轮证据补充

最新当前截图：

- `/tmp/latinos-home-hero-after-polish.png`
- `/tmp/latinos-home-mobile-after-polish.png`

当前可确认：

- `pnpm verify` 继续通过
- 移动端 overflow 继续是绿的
- 这轮 hero 收口没有带来结构回退

## 后续又补了一轮首页下半屏并层收口

之后又补了一轮不再只盯着 hero 的首页收口。这轮不是继续缩字，而是直接处理首页下半屏和参考稿之间仍然很明显的差距：

- 当前之前版本：
  - `heatmap -> queue -> workbench -> footer`
  - 更像纵向叠三层
- 参考稿更像：
  - `heatmap`
  - 然后直接进入更统一的下半屏工作台完成面

所以这轮改成了：

- 把 `Next Session Queue`
- 和 `工作台`
- 从上下堆叠收成同一层双栏工作台

主要改动：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/page.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

这轮核心动作：

1. 首页新增 `home-lower-cluster`
2. 左栏让 `queue` 变成更像“回流入口列”
3. 右栏让 `module matrix` 在较窄栏宽里继续保持参考稿那种矩阵节奏
4. 去掉下半屏里不必要的 `queue strip`，减少噪音和页面长度

## 这轮后的量化结果

- 首页总高度：
  - 从 `1488`
  - 降到 `1372`
- 当前下半屏 cluster 高度：
  - `446.19`
- 当前：
  - `queue` 高度约 `386.64`
  - `workbench` 高度约 `446.19`

这说明这轮不是“看起来紧一点”，而是首页整体完成面已经实打实变短。

## 这轮后的判断

从最新桌面端截图看：

- 首页下半屏比上一轮更接近参考稿
- `queue` 不再像单独拖长页面的一大块
- `queue + module matrix + footer` 的关系更统一

从最新手机端截图看：

- 仍然保持同一套结构语言
- 没有出现新的横向溢出
- 首页在窄屏上仍然可读、可点、可继续下滑访问

## 这轮证据补充

最新当前截图：

- `/tmp/latinos-home-full-after-lower-cluster.png`
- `/tmp/latinos-home-bottom-after-lower-cluster.png`
- `/tmp/latinos-home-mobile-after-lower-cluster.png`

当前可确认：

- `pnpm verify` 继续通过
- route / prod smoke / browser smoke 继续通过
- 这轮首页下半屏结构收口没有带来功能回退

## 当前剩余差距

这一轮之后，首页更像进入真正最后阶段了，但仍然还没到“近似同款完成度”：

1. hero 顶部完成感仍然还差最后一层非常细的比例 polish
2. `Daily Latin` 仍然是整站最明显偏长的一页
3. 首页虽然已经更短更统一，但字重、对比度、呼吸感仍可再微调
