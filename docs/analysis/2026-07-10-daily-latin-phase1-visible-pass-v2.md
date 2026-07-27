# 2026-07-10 Daily Latin Phase 1 Visible Pass v2

## 背景

在首页 `/` 与 `/dance-os` 都已经完成第二轮 visible pass 后，`/daily-latin` 变成了当前 `Phase 1` 最明显的 `Top 1`：

- 它仍然带着更强的“系统说明页”感
- 首屏 overview 和 `本页依据` 仍然偏密
- `Today Loop Demo / 回流区 / 动作库` 还残留多轮 ultra-compact 试验的痕迹

所以这一轮要解决的不是补功能，而是：

**把 `/daily-latin` 真正收成第二轮 frontdoor visible pass，让它更像“今天就能进入的一页”，而不是“结构已经很多的一页”。**

## 这轮改了什么

主改文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/daily.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/daily.ts)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/app/daily-latin/page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/daily-latin/page.tsx)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/route-smoke.mjs](/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/route-smoke.mjs)

### 1. 内容层先减重

这轮没有新增模块，而是先把最重的说明文案压短：

- `dailyLead` 改成更短的 frontdoor 入口句
- `dailyRows` 从 6 条压成 4 条
- `dailyEntryCards / dailyFlowCards / dailyLegacyPrinciples` 的 note 明显收短
- `dailyDemoStates / dailyDemoTasks / dailyReturnModeSeeds / dailyStageSignals` 的 compact 文案进一步减重

结果：

- 首屏不再像“系统介绍 + 页面说明”叠在一起
- demo 区和回流区的字块感更轻
- 内容仍然 grounded 在飞书 / 旧站 proof 上，而不是改回模板词

### 2. section 标题右侧说明不再抢注意力

在页面层：

- `本页依据`
- `入口状态`
- `Daily Loop`
- `Today Loop Demo`
- `Live Return / Clip Bridge / Archive Jump`
- `旧站已验证的起步原则`
- `Daily Latin 动作库`

这些 section 的 `more` 文案都改成了更短的版本。

在样式层：

- `<= 860px` 时统一隐藏 `/daily-latin` 的 section `more`

结果：

- 手机端不再被一排排右上角解释句打断节奏
- 桌面端仍保留必要的“旁注感”

### 3. 把残留的 ultra-compact daily-specific override 重新压回可读态

这轮不是只调通用 class，而是专门对 `#daily-overview / #today-loop-demo / #live-return-bridge / #daily-sources / #daily-library` 补了更高优先级的 route-specific override，覆盖掉之前积累的超压缩规则。

重点恢复：

- `#daily-overview .compact-detail-daily-top`
- `#today-loop-demo .compact-ledger-shell`
- `#live-return-bridge .compact-daily-return-board .daily-return-panel`
- `#daily-sources .compact-source-matrix-daily-side-panel .source-row`
- `#daily-library .compact-tabs / .compact-move-grid / .compact-move-card`

结果：

- 首屏 detail panel 不再被旧的极限压缩规则拖回去
- demo 区重新回到可用卡片，而不是“勉强能点”
- 回流区卡片恢复正常 padding
- 动作库从 tiny asset wall 拉回成真正的 library cards

### 4. 动作库和回流区更像 frontdoor 模块，而不是附属资产墙

这轮最明显的视觉收口点之一是底部两块：

- `#daily-library` 改成桌面 5 列、移动 2 列
- move card 恢复 subtitle 和 meta
- `#live-return-bridge` 的 mode cards / CTA padding 恢复

结果：

- 动作库不再只剩一排微型标签
- 回流区不再像被压扁的工具块

### 5. 验证合同同步到新标题

因为这轮把 `/daily-latin` 页头标题从：

- `把今天怎么开始练压成最小入口`

改成了：

- `把今天这一轮压成最小入口`

所以同步更新了：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/route-smoke.mjs](/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/route-smoke.mjs)

避免“页面已更新，但验证仍盯旧文案”的假失败。

## 用户可见结果

这一轮之后，`/daily-latin` 的变化可以概括成 4 点：

1. 首屏和来源区明显更短、更清楚，不再像系统说明叠层
2. `Today Loop Demo` 保持交互完整，但文本负担更轻
3. `Live Return / Clip Bridge / Archive Jump` 与动作库更像 frontdoor 模块
4. 手机端仍然 dense，但已经从“超压缩实验页”回到“可直接看的成品态”

## fresh-prod 截图

- 桌面：
  - `/tmp/frontdoor-daily-desktop-2026-07-10-phase1-visible-pass-v2.png`
- 移动：
  - `/tmp/frontdoor-daily-mobile-2026-07-10-phase1-visible-pass-v2.png`

## 验证

在 [/Users/zon/Desktop/LATINOS/sites/frontdoor](/Users/zon/Desktop/LATINOS/sites/frontdoor) fresh-prod 通过：

1. `pnpm typecheck`
2. `CI=1 pnpm build`
3. `pkill -f "next start --hostname 127.0.0.1 --port 3200" || true`
4. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
6. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
7. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

并且 `browser-smoke` 继续证明：

- `mobile daily-latin` 无横向溢出
- Daily loop demo 交互仍正常
- Daily → Dance OS bridge 仍正常

## 这轮之后的判断

现在可以明确把这轮记为：

- `Phase 1 / daily-latin visible pass v2`

当前更准确的 `Phase 1` 状态是：

- 首页 `/` 已有第二轮 visible pass
- `/dance-os` 已有第二轮 visible pass
- `/daily-latin` 已有第二轮 visible pass

但这依然不自动等于：

- `Phase 1 done`

更合理的下一步应该是：

1. 对 `/`、`/daily-latin`、`/dance-os` 做一次并排验收
2. 判断三页里是否仍有明显掉队页
3. 只有当三页都达到“可直接评判的完成态”后，才进入辅助页
