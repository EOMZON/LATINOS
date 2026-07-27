# Frontdoor Homepage Independent Demo Bridge Pass

## 这轮为什么选它

当前 active goal 重新把主线拉回：

- 先完成首页
- 再看 `/daily-latin`
- 再看 `/dance-os`

并强调要优先做**用户可见完成态**。

在当前真实状态下：

- `/daily-latin` 已经有：
  - 状态分流
  - `Today Loop Demo`
  - `Live Return / Clip Bridge / Archive Jump`
  - 来源与动作库
- `/dance-os` 已经有：
  - route demo
  - `独立 Demo` 入口块
  - correction / queue / sources

反而首页虽然已经能进：

- 旧站
- `Daily Latin`
- `Dance OS`

但还没有把**独立 `Dance OS Demo` 已经存在、该从哪里进入、为什么现在还是 frontdoor 先承接**这件事直接说清楚。

因此，这轮更合理的唯一 `Top 1` 是：

**给首页增加一个更直接、更明确的独立 `Dance OS Demo` 承接入口。**

## 本轮目标

让首页从“只有模块入口”推进到：

1. 明确告诉用户独立 `Dance OS Demo` 已经存在
2. 明确告诉用户当前应该先去哪里看入口关系
3. 保留本机直接打开独立壳的动作
4. 不破坏参考样式节奏
5. 不破坏桌面与移动端可用性

## 实现

### 1. 首页数据层新增独立 demo 承接对象

更新：

- [home.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/home.ts)

新增：

- `homeIndependentDemoBridge`

内容包括：

- bridge 标题
- bridge 描述
- 3 条当前事实
- 2 个动作：
  - 去 `/dance-os#independent-demo-entry`
  - 本机打开 `3301`

同时同步微调：

- `homeWorkbench.intro`
- `Dance OS` 模块卡片的 note

### 2. 首页工作台中新增独立 Demo 承接块

更新：

- [page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/page.tsx)

新增：

- `home-demo-bridge`

它位于：

- `NextSessionQueue`
  之后
- 模块入口区之前

这样首页顺序变成：

1. hero
2. 热力图
3. 最近 witness → 下一轮
4. **独立 `Dance OS Demo` 承接**
5. 今天先进入
6. 保持结构

这更符合当前阶段里：

- 首页负责给入口、给状态、给下一步

### 3. 新增响应式样式

更新：

- [workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

新增：

- `home-demo-bridge`
- `home-demo-bridge-copy`
- `home-demo-bridge-rows`
- `home-demo-bridge-actions`

并补齐多个现有断点下的缩放规则，保证：

- 桌面端三列承接
- 中屏收缩
- 手机端单列堆叠

## 用户可见结果

这轮后，首页已经不再只是抽象告诉用户：

- 旧站 / Daily / Dance

而是能直接看到：

- 独立 `Dance OS Demo` 已存在
- 当前已成立的链路：
  - `archive -> queue -> return trigger`
- 当前为什么还是：
  - frontdoor 先承接
  - 独立 demo 继续长产品链
- 该先点哪个入口

## 验证

在 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 严格串行通过：

1. `pnpm typecheck`
2. `CI=1 pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

关键通过事实：

- `/`、`/daily-latin`、`/dance-os` 均 `200`
- `daily loop demo interaction works`
- `dance correction ledger interaction works`
- `home next session queue updates from archive`
- mobile overflow 检查仍然通过：
  - `homeOverflow.scrollWidth = 390`
  - `homeOverflow.innerWidth = 390`
  - `dailyOverflow.scrollWidth = 390`
  - `dailyOverflow.innerWidth = 390`

## 截图证据

目录：

- `/tmp/latinos-frontdoor-core-routes-home-bridge-2026-07-11`

本轮关键截图：

- `/tmp/latinos-frontdoor-core-routes-home-bridge-2026-07-11/home-desktop.png`
- `/tmp/latinos-frontdoor-core-routes-home-bridge-2026-07-11/home-mobile.png`

补充截图：

- `/tmp/latinos-frontdoor-core-routes-home-bridge-2026-07-11/daily-latin-desktop.png`
- `/tmp/latinos-frontdoor-core-routes-home-bridge-2026-07-11/dance-os-desktop.png`

## 对当前 goal 的意义

这轮没有声称：

- 整个旧 prompt 已全部完成

但它确实把当前 active goal 中最直接的核心页缺口推进了一步：

- `homepage`

并且没有打坏：

- `/daily-latin`
- `/dance-os`

因此，这轮应视为：

- **核心三页用户可见完成态中的首页补全通过**

## 更合理的下一步

在当前 active goal 口径下，下一步更合理的是二选一：

1. 继续审计 `daily-latin` 是否还存在明显“用户看得见但没讲清楚”的缺口
2. 如果 `daily-latin` 当前已足够稳，则继续审计 `/dance-os` 是否还需要一刀更强的用户可见承接

仍然不建议：

- 回到辅助页平均推进
- 提前跳去 deploy / domain
