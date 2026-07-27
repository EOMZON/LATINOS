# 2026-07-10 Dance OS Phase 1 Visible Pass

## 背景

在 `/` 和 `/daily-latin` 都已有一轮 `Phase 1` visible pass 之后，剩下最需要优先推进的核心页是：

- `/dance-os`

当前它的问题不是功能缺失，而是：

- 桌面端基本能看
- 但移动端仍明显带有“压缩实验页”痕迹
- `summary / 模块库 / correction ledger / body map / 来源依据` 都被压得过紧
- 用户虽然能看到模块，但很难把它当成一个真正可反复使用的练习入口

也就是说，这轮真正要解决的是：

**把 `/dance-os` 从“系统层可运行”推进到“前台层可直接读、可直接用”的 visible pass。**

## 这轮改了什么

本轮主要改动：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dance-os/page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dance-os/page.tsx)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/dance.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/dance.ts)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

### 1. 给 `/dance-os` 补了一句 frontdoor lead

- 新增 `danceLead`
- 放在 anchor tabs 下方

作用：

- 不再一上来就是模块、面板和工具名
- 先把这页真正负责的链路说清楚：
  - 录一轮
  - 看回放
  - 只修一个点
  - 下次还能继续回来

### 2. 首屏 summary 在移动端恢复成可读说明区

主要改动：

- `compact-detail-dance-top` 在 `<= 860px` 下改为单列
- `RouteStagePanel` 的 metrics / signals 恢复更大的可读 spacing
- 首屏 `kv / subtitle / chips` 恢复正常阅读密度

结果：

- 手机上的 `Dance OS Demo` 首屏不再像被挤扁的系统卡
- 页面一打开就更像前台入口，而不是内部结构页

### 3. 模块库在移动端不再像“微型资产墙”

主要改动：

- `compact-library-panel` 恢复更大的 padding
- `asset-grid` 从过度紧凑的小格恢复到 `2 列`
- `cap-note / asset-meta / asset-state` 在手机端重新恢复展示

结果：

- 模块库不再只剩标题和角标
- 更接近参考稿那种“模块存在感明确”的节奏

### 4. `Correction Ledger Demo` 在移动端恢复成可操作 demo

主要改动：

- `compact-ledger-shell` 改回单列 `ledger-grid`
- `ledger-stack` 改回单列
- `choice-grid.compact.secondary` 不再 4 列强塞
- `ledger-result-grid` 改回单列
- note field / buttons / explanatory copy 恢复可操作尺寸

结果：

- 手机上的 correction demo 不再只是“能点”
- 重新像“能真正完成一轮”的 demo

### 5. `Body Map / Practice Queue` 在移动端恢复成可读结构

主要改动：

- `bodymap-grid` 改回单列
- `bodymap-focus-list` 改回单列
- `proof / cue / latest / queue note` 在手机端恢复显示
- panel / cards / buttons 恢复正常 padding

结果：

- 这部分不再像压成热区缩略图
- 用户能真正看见每块身体区域在说什么、下一轮该从哪里继续

### 6. `本页依据` 区域恢复成依据说明，而不是压扁矩阵

主要改动：

- `compact-source-matrix` 在手机端改成单列
- panel / row / mini 的 spacing 恢复

结果：

- `真实来源 / 产品成立条件` 更像 frontdoor 的依据层
- 不再像只为了把信息塞进去而存在

## 用户可见结果

这轮之后，`/dance-os` 的用户可见结果主要有 4 点：

1. 移动端从压缩实验页回到可读成品态
2. correction / body map / queue 这条主链更容易直接理解
3. 模块库和依据层恢复存在感，不再只是挤在一起的结构块
4. 页面更接近“反复使用的练习入口”，而不是“能跑起来的工具页”

## 证据截图

fresh-prod 截图：

- `/tmp/frontdoor-dance-desktop-2026-07-10-phase1-visible-pass.png`
- `/tmp/frontdoor-dance-mobile-2026-07-10-phase1-visible-pass.png`

## 验证

在 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 执行并通过：

1. `pnpm typecheck`
2. `CI=1 pnpm build`
3. kill 旧的 `next start`
4. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
6. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
7. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

并且 `browser-smoke` 继续证明：

- Dance OS route 正常渲染
- correction ledger 交互正常
- body map / queue 正常
- anchor / source 切换正常

## 这轮之后的判断

这轮可以记为：

- `Phase 1 / dance-os visible pass`

当前 `Phase 1` 的状态更新为：

- `/` 已有一轮 visible pass
- `/daily-latin` 已有一轮 visible pass
- `/dance-os` 已有一轮 visible pass

但这仍然不自动等于：

- `Phase 1 done`

下一轮更合理的动作是：

1. 对 3 个核心页做一次并排验收
2. 判断哪一页还需要第二轮结构收口
3. 在没有证明 `Phase 1` 已整体达标前，不切回辅助页
