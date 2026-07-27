# 2026-07-10 Home Phase 1 Frontdoor Visible Pass

## 背景

根据当前新的阶段优先级，`Phase 1` 不能再平均推进所有页面，而是要先把用户最能直接评价的核心前台收出可见完成态。

当前默认 `Top 1` 是首页 `/`。

这轮不再继续做看不见的 `1px / 2px` compaction，而是集中处理首页里最明显的用户可见差距：

- `工作台` 区域过于像工程看板
- 首页底部模块过紧、过碎、过像内部卡片
- `Daily / Dance` 的回流信息虽然存在，但露出方式不够像 frontdoor 入口

## 这轮改了什么

本轮主要改动：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/app/page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/page.tsx)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/components/cards/home-module-card.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/components/cards/home-module-card.tsx)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/home.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/home.ts)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/structure-smoke.mjs](/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/structure-smoke.mjs)

### 1. 首页 `工作台` 区域重新收成 frontdoor 入口层

- 新增 `homeWorkbench` 文案配置
- 给 `工作台` 区域补了明确 intro，不再一上来就是一排紧卡片
- 让这一区域更像：
  - 先理解今天从哪里继续
  - 再选择旧站 / Daily / Dance / 规则 / 路线 / 当前状态

### 2. `Next Session Queue` 在首页不再只剩压扁的工程条

- 首页 desktop 下保留 `latest / daily / dance` 三个回流块
- 不再把 `meta` 和 `next step` 直接隐藏掉
- 让用户在首页就能看见：
  - 最近一轮是什么
  - 它来自 Daily 还是 Dance
  - 下一步应该回到哪里

### 3. 首页模块卡收得更接近参考稿的密度

- 把首页模块从小而紧的“信息碎片卡”改成更高、更松的入口卡
- 每张卡统一成：
  - 模块名
  - 一句入口摘要
  - 一句真实说明
  - 一条底部作用说明
- 同时把模块命名拉回更接近真实入口语言：
  - `旧站起步页`
  - `来源与规则`
  - `当前状态`

### 4. 移动端不再把首页回流内容过度隐藏

- 在 `<= 860px` 的首页工作台里，不再直接隐藏 `daily / dance` 两块回流信息
- 首页移动端现在仍然保持无横向溢出，但信息更完整

## 用户可见结果

首页相较上一版，已经有以下明显可见变化：

1. `工作台` 区域不再只像“工程操作区”，而是更像 frontdoor 入口区
2. 首页底部模块卡的留白、层级和节奏更接近参考稿
3. Daily / Dance 回流逻辑在首页更能直接被看见，而不是藏在很薄的 rail 里
4. 手机宽度下仍可正常访问，没有横向溢出

## 证据截图

fresh-prod 证据截图：

- `/tmp/frontdoor-home-desktop-2026-07-10-phase1-home-pass.png`
- `/tmp/frontdoor-home-mobile-2026-07-10-phase1-home-pass.png`

参考稿：

- `/tmp/latinos-home-reference.png`

## 验证

在 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 执行并通过：

1. `pnpm typecheck`
2. `CI=1 pnpm build`
3. kill 旧的 `next start`
4. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
6. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
7. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

## 这轮之后的判断

这轮已经满足“首页有明显可见进步”的要求，但还没有证明 `Phase 1` 完成。

当前更合理的下一步不是回去做 dashboard compaction，而是：

1. 继续对照参考稿检查首页是否还需要第二轮结构收口
2. 然后切到 `/daily-latin`
3. 再切到 `/dance-os`

也就是说：

- 这轮是 `Phase 1 / 首页 visible pass`
- 不是 `Phase 1 done`
