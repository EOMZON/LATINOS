# 2026-07-10 Home Phase 1 Frontdoor Visible Pass v3

## 背景

在 `/daily-latin` 完成第二轮 visible pass 后，重新做三页并排验收，当前最明显仍需要继续收口的核心页重新回到了首页 `/`。

原因不是首页最差，而是它和参考稿相比还保留了一个很明显的差距：

- hero 已经有了
- heatmap 也已经有了
- 但下半区 `工作台` 仍然偏像“同权重模块列表”
- 主入口与支撑入口的层级感不够强

也就是说，当前首页最大的不足不再是“信息不够”，而是：

**信息层级还不够 frontdoor。**

## 这轮改了什么

主改文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/components/cards/home-module-card.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/components/cards/home-module-card.tsx)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/home.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/home.ts)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/app/page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/page.tsx)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

### 1. 首页模块不再 6 张同权重平铺

之前首页 `工作台` 区的问题之一是：

- `旧站起步页`
- `Daily Latin`
- `Dance OS`
- `来源与规则`
- `路线图`
- `当前状态`

这 6 张卡虽然都能点，但视觉上还是近似同权重。

这轮改成：

- `homePrimaryModules`
  - `旧站起步页`
  - `Daily Latin`
  - `Dance OS`
- `homeSupportModules`
  - `来源与规则`
  - `路线图`
  - `当前状态`

结果：

- 首页终于有了“主入口三张 + 支撑入口三张”的层级
- 更接近参考稿那种“先给最重要入口，再给次级入口”的结构

### 2. `HomeModuleCard` 增加 featured / support 两种呈现

这轮没有复制新组件，而是在原组件内继续组件化：

- `variant="featured"`
- `variant="support"`

并且新增：

- `home-module-detail`

让 featured 卡能直接显示：

- 第一层：入口摘要
- 第二层：关键动作 / 作用
- 第三层：一句短说明

结果：

- 主入口卡不再只是“标题 + 一句说明”
- 更像一个真实 frontdoor 卡，而不是链接壳

### 3. 首页 `工作台` 文案进一步收短

同步收短：

- `homeWorkbench.intro`
- `来源与规则 / 路线图 / 旧站起步页` 等几张卡的 note

结果：

- 首页下半区继续减少工程说明感
- 不再需要靠长文案解释“这些模块为什么存在”

### 4. 首页样式从“薄卡列表”继续拉向“主入口卡 + 支撑卡”

样式层主要做了这些：

- `home-module-board-featured`
- `home-module-board-support`
- featured 卡改成有边框、有圆角、有轻微紫色梯度的 card surface
- support 卡继续保持克制，但不再和 featured 争主视觉
- 移动端：
  - featured 区改成单列
  - support 区保持两列

结果：

- 桌面端下半区更像真正的前台入口层
- 手机端也更能一眼分清“先看哪三张”

## 用户可见结果

这轮之后，首页最明显的用户可见变化是：

1. `工作台` 区不再是 6 张同权重薄卡
2. `旧站起步页 / Daily Latin / Dance OS` 三张终于更像主入口
3. `来源与规则 / 路线图 / 当前状态` 更自然地退到支撑层
4. 整个首页更接近参考稿那种“强 hero + 强入口层级”的完成态

## fresh-prod 截图

- 参考锁定：
  - `/tmp/latinos-home-reference.png`
- 当前桌面：
  - `/tmp/frontdoor-home-desktop-2026-07-10-phase1-audit-v2.png`
- 当前移动：
  - `/tmp/frontdoor-home-mobile-2026-07-10-phase1-audit-v2.png`

## 验证

在 [/Users/zon/Desktop/LATINOS/sites/frontdoor](/Users/zon/Desktop/LATINOS/sites/frontdoor) fresh-prod 通过：

1. `pnpm typecheck`
2. `CI=1 pnpm build`
3. `pkill -f "next start --hostname 127.0.0.1 --port 3200" || true`
4. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
6. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
7. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

并且 smoke 继续证明：

- 首页 hero 可见
- 首页 queue 回流仍正常
- mobile home 无横向溢出
- Daily / Dance 关键交互未回归

## 这轮之后的判断

这轮可以记为：

- `Phase 1 / home visible pass v3`

当前更准确的 `Phase 1` 状态依然是：

- 首页 `/` 已继续收口到第三轮 visible pass
- `/daily-latin` 已有第二轮 visible pass
- `/dance-os` 已有第二轮 visible pass

但这仍然不自动等于：

- `Phase 1 done`

更合理的下一步仍然是：

1. 再做一次 `/`、`/daily-latin`、`/dance-os` 的并排验收
2. 判断三页中是否还有一张明显掉队
3. 只有三页都能直接被评价为“接近最终版”后，才进入辅助页
