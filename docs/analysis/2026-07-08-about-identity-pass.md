# 2026-07-08 About Identity Pass

## 背景

在 `/roadmap` 和 `/tools` 都完成 route-level density pass 之后，继续做整站完成感复核时，剩下最明显仍偏“说明页”的 route 集中到：

- `/about`

它原先已经有真实内容，但主要问题有两层：

1. 上半段过度依赖 prose
2. 顶部 `DetailPanel` 的 stage 区在改成结构化后，仍然缺少真正的共享 workbench 内容

也就是说，这页的问题已经不只是信息组织，而是：

- route identity
- top shell completion

## 这轮目标

把 `/about` 从“项目说明页”继续推进成：

- 这条产品线的身份页
- frontdoor 体系里的 route-level identity page
- 一页能直接说清“这条线服务什么、当前不是什么、现在真正要成立什么”的页面

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/about/page.tsx`

### 1. 先把 prose-heavy 结构改成 route-level identity 结构

新增内容：

- `aboutIdentityRows`
- `aboutFocusCards`
- `aboutRouteLeft`
- `aboutRouteRight`

把上半段从大段解释改成：

- 身份面板
- route 负责说清什么
- 当前真正要成立

### 2. 再把顶部 stage 区接到共享 RouteStagePanel

新增：

- `aboutStageMetrics`
- `aboutStageSignals`

并把 `DetailPanel` 的 stage 区替换成：

- `RouteStagePanel`
- `compact-route-stage`

这样 `/about` 的顶部不再是一块空的 stage 壳，而是重新回到和 `Daily Latin` / `Dance OS` 同一套 workbench 语言。

## 视觉结果

### 之前的问题

- 页面更像文字说明页
- route 身份不够清晰
- 顶部 stage 壳体完成感不足

### 这轮后的变化

`/about` 现在更像：

- 一个 route-level identity page
- 一页能回答“这条线到底是什么、当前服务什么、为什么不是单页网站、为什么先保留旧站”的工作台页

尤其顶部变化最明显：

- 左侧 stage 区从空壳变成共享 stage panel
- 右侧身份 rows 与 chips 的关系更清楚
- 整页更贴近当前 frontdoor 已有的共享视觉语言

## 量化与截图

真实测量：

- `/about` 桌面端：
  - `2164`
- `/about` 手机端：
  - `4926`

截图：

- 桌面端：
  - `/tmp/about-after-stage-panel-desktop.png`
- 手机端：
  - `/tmp/about-after-stage-panel-mobile.png`

## 验证

已通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`

继续确认：

- `/about` 路由标题稳定
- 新增共享 stage panel 未误伤其他 route
- 既有 smoke 继续通过

## 这轮后的判断

这轮价值不在于把一页压短，而在于修复了一个整站级一致性问题：

- `/about` 终于不再像站外说明纸
- 而开始更像 frontdoor 体系内部的一页身份工作台

## 下一轮最值得继续做什么

1. 再回首页和 `dashboard` 做一次整站级统一复核，确认当前最掉队页是否已经从次级 route 转回首页整体完成感
2. 继续替换剩余模板感强的文字块
3. 在需要时再补更细的共享壳体 polish，而不是默认继续扩新内容块
