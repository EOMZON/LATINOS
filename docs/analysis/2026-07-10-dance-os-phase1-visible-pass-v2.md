# 2026-07-10 Dance OS Phase 1 Visible Pass v2

## 背景

按当前 `Goal Mode Priority Reset Prompt`，首页 `/` 完成第二轮 visible pass 后，下一步不能切回辅助页，而是必须继续在：

- `/daily-latin`
- `/dance-os`

之间选下一个 `Top 1`。

这轮先做了并排验收，结论是：

- `/daily-latin` 仍然很密
- 但 `/dance-os` 当前更容易被一眼判断成“还没收完”

原因不是它不能用，而是它有一个特别明显的用户可见缺口：

1. `Dance OS 模块库` 仍像半空的资产墙
2. 大块卡片虽然存在，但前台入口感不够
3. section 的辅助说明仍然偏工程说明，不够像成品页语言

也就是说，这轮更合理的 `Top 1` 是：

- `/dance-os`

## 这轮改了什么

本轮主要改动：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dance-os/page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dance-os/page.tsx)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/dance.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/dance.ts)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

### 1. `Dance OS 模块库` 从海报墙收成入口卡

这轮最核心的改动是把模块库的资产卡从：

- 高而空
- 更像 poster / placeholder
- 一眼看过去像“模块还没长出来”

收成：

- 更低、更密的入口卡
- 信息先读得到，再决定点不点
- 更接近 reference 那种“真实模块入口”而不是“空资产墙”

具体做法：

- 桌面端改成 `3 列`
- 去掉卡片上那层明显的海报渐变覆盖感
- 去掉高纵向 poster 感，改成更像信息卡的最小高度
- 把 `note / meta / state` 重新排到真正可读的位置

### 2. `/dance-os` 的前台语言收短

这轮同步把：

- `danceLead`
- `danceRows`
- section header 的 `more`
- `danceProducts` 模块说明

都收成更短、更像入口页的语言。

结果：

- 页面不再总在解释“它是什么系统”
- 而是更像在说“这一页现在怎么用”

### 3. 模块卡内容更像真实产品模块

`danceProducts` 的文案从偏抽象描述，改成更像实际用途：

- `Session Lens`
- `Correction Ledger`
- `Body Map`
- `Practice Queue`
- `Witness Archive`
- `Return Trigger`

现在每张卡更清楚地表达：

- 这是什么模块
- 这轮为什么会用到它
- 它在这条练习链上承担什么作用

## 用户可见结果

这轮之后，`/dance-os` 的变化主要有 4 点：

1. 模块库不再像半空资产墙，而更像真实入口模块区
2. 页面整体更少工程说明感，更像练习入口页
3. correction / body map / queue 这条主链仍然保留，没有因为收样式而被削弱
4. 手机端模块区也更清楚，仍保持可读和可点

## 证据截图

上一轮：

- `/tmp/frontdoor-dance-desktop-2026-07-10-phase1-visible-pass.png`
- `/tmp/frontdoor-dance-mobile-2026-07-10-phase1-visible-pass.png`

本轮 fresh-prod：

- `/tmp/frontdoor-dance-desktop-2026-07-10-phase1-visible-pass-v2.png`
- `/tmp/frontdoor-dance-mobile-2026-07-10-phase1-visible-pass-v2.png`

## 验证

在 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 执行并通过：

1. `pnpm typecheck`
2. `CI=1 pnpm build`
3. `pkill -f "next start --hostname 127.0.0.1 --port 3200" || true`
4. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
6. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
7. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

其中 `browser-smoke` 继续证明：

- Dance OS route 正常渲染
- correction ledger 交互仍正常
- sources anchor 仍正常
- mobile shell 正常

## 当前判断

这一轮可以记为：

- `Phase 1 / dance-os second visible pass`

但这仍然不是：

- `Phase 1 done`

当前更合理的下一步是：

1. 保留首页 `/` 与 `/dance-os` 的第二轮 visible pass 结果
2. 回到 `/daily-latin` 做第二轮并排验收
3. 如果没有反证，下一轮 `Top 1` 应切到 `/daily-latin`
