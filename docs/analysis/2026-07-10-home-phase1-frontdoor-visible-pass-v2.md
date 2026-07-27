# 2026-07-10 Home Phase 1 Frontdoor Visible Pass v2

## 背景

按当前 `Goal Mode Priority Reset Prompt`，当前主线仍然是：

- 继续停留在 `Phase 1`
- 只处理核心前台：
  - `/`
  - `/daily-latin`
  - `/dance-os`

在 `/`、`/daily-latin`、`/dance-os` 都已有一轮 visible pass 后，这一轮先做了并排验收。

结论是：

- `/daily-latin` 和 `/dance-os` 仍然更像“系统页”
- 但当前最该继续收口的 `Top 1` 仍然是首页 `/`

原因不是首页最差，而是：

1. 首页最直接决定用户对“现在是不是已经接近成品”的判断
2. 首页相对已经最接近参考稿，最适合继续把“最后一口工程感”收掉
3. 当前首页最明显的剩余差距仍集中在：
   - `工作台` 解释偏工程化
   - `刚做完的一轮 → 下一轮` 区太厚
   - 模块卡文字层级偏碎，仍像系统说明块

## 这轮改了什么

本轮主要改动：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/next-session-queue.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/next-session-queue.tsx)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/components/cards/home-module-card.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/components/cards/home-module-card.tsx)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/home.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/home.ts)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

### 1. 首页回流 rail 收薄

- `NextSessionQueue` 的 `rail` 变体不再显示整段解释文案
- 首页 `LATEST / DAILY / DANCE` 回流块改成：
  - 标题
  - context
  - 单个动作链接

结果：

- 首页下半段不再被回流区撑成一个厚工程板
- 更接近参考稿那种“这里有入口，但不抢首页主体”的节奏

### 2. 首页模块卡从“三层说明”收成“两层入口”

- `HomeModuleCard` 去掉了额外的 `detail` 层
- 每张卡现在只保留：
  - 模块名
  - 入口摘要
  - 一句短说明

结果：

- 模块卡明显更克制
- 更接近参考稿里“先看入口，再点进去”的信息密度

### 3. 首页文案收短，少解释，多指向

- `homeWorkbench.intro` 改得更像入口说明，而不是概念说明
- `homeModules` 的 note 全部收短

结果：

- 首页不再一上来就解释很多系统逻辑
- 页面更像真的 frontdoor，而不是系统页目录

### 4. 首页 workbench 样式重新拉开节奏

- 缩短 `workbench intro`
- 把回流区文案和按钮进一步压薄
- 把模块卡改成更低、更清楚、更少层的入口卡
- 保留桌面端与移动端无横向溢出

结果：

- 桌面端下半段更像参考稿的工作台区
- 手机端模块区也更清楚，不再显得像被塞满的内部模块表

## 用户可见结果

这轮之后，首页的变化主要有 4 点：

1. `工作台` 更像入口区，而不是解释区
2. 回流 rail 更薄，更像“刚做完的一轮 → 下一轮”的导流层
3. 模块卡更克制，更接近参考稿那种轻量入口格
4. 手机端仍保持完整可读，没有横向溢出

## 证据截图

参考稿：

- `/tmp/latinos-home-reference.png`

fresh-prod 截图：

- `/tmp/frontdoor-home-desktop-2026-07-10-phase1-home-pass-v2.png`
- `/tmp/frontdoor-home-mobile-2026-07-10-phase1-home-pass-v2.png`

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

- 首页 hero 可见
- 首页 next session queue 仍能基于 archive 回流
- mobile home 无横向溢出
- Daily / Dance 的关键交互仍正常

## 当前判断

这一轮可以记为：

- `Phase 1 / 首页 second visible pass`

但这仍然不是：

- `Phase 1 done`

当前更合理的下一步是：

1. 保留首页这轮结果
2. 回到 `/daily-latin` 与 `/dance-os` 做并排验收
3. 选出下一个还保留最大“系统页感”的核心页，做第二轮 visible pass
