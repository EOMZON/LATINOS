# Frontdoor Dance Next Bridge Pass

## 这轮为什么选它

当前 active goal 的旧口径明确要求：

- 先首页
- 再 `/daily-latin`
- 再 `/dance-os`
- 先把这三页推进到用户可见完成态

首页已经补过：

- 独立 `Dance OS Demo` 承接

`/daily-latin` 已经补过：

- 页面级 `next bridge`

因此当前自然轮到：

- `/dance-os`

当前这页虽然已经有：

- 总览
- 独立 demo 入口
- 模块库
- `Correction Ledger Demo`
- `Body Map / Practice Queue`
- 来源

但还缺少一层**页面级的“从这里怎么继续”承接**。

也就是说，现在虽然：

- route demo 已可用
- 独立 demo 已可进
- Daily 回退路径也存在

但用户还需要自己推断：

- 什么时候继续本页 route demo
- 什么时候进入独立 demo 壳
- 什么时候其实还没到 OS 层，应该先回 Daily

因此这轮的唯一 `Top 1` 是：

**给 `/dance-os` 增加一个显式的 next bridge 区，把“继续 route demo / 进入独立壳 / 先回 Daily”做成页面级可见去向。**

## 本轮目标

让 `/dance-os` 从“功能块都在”推进到：

1. 页面级明确展示 3 条去向
2. 顶部 anchor 能直接跳到这块
3. 这块与首页和 `/daily-latin` 的承接语言保持一致
4. 不破坏已有 correction / queue / source 结构
5. 保持桌面与移动端可用

## 实现

### 1. 新增 `danceBridgeCards`

更新：

- [dance.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/dance.ts)

新增：

- `danceBridgeCards`

包括 3 张卡：

1. `继续本页 route demo`
2. `进入独立 Dance OS Demo`
3. `还没说清卡点，先回 Daily`

每张卡都包含：

- 适合现在
- 下一步
- note
- 真实 href

### 2. 在页面里加入 next bridge 区

更新：

- [page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dance-os/page.tsx)

新增：

- `HomeModuleCard` 引入
- `danceBridgeCards` 引入
- `#dance-next-bridge` section

它位于：

- `独立 Demo` 入口块之后
- 模块库之前

这样页面顺序变成：

1. 总览
2. 独立 demo 入口
3. **从这里怎么继续**
4. 模块库
5. correction ledger
6. body map / queue
7. 来源

### 3. 顶部 anchor 补上“去向”

同样更新：

- [page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dance-os/page.tsx)

在 `AnchorTabs` 中新增：

- `去向`

对应：

- `#dance-next-bridge`

### 4. 新增 bridge 样式

更新：

- [workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

新增：

- `dance-bridge-section`
- `dance-bridge-grid`

并补齐：

- 桌面端三列
- 移动端单列

## 用户可见结果

这轮后，`/dance-os` 不再只是告诉用户：

- 这里有独立 demo
- 这里有 correction
- 这里有 body map

而是更直接告诉用户：

1. 已经知道这轮要修什么，但还没压出 next step：
   - 继续 route demo
2. 想直接看独立壳当前怎么成立：
   - 先看独立 demo 入口
3. 其实还没说清卡点，还停在重启 / 回流层：
   - 先回 Daily

这使得页面从“内部结构齐了”推进到了“下一步承接已可见”。

## 验证

在 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 严格串行重新通过：

1. `pnpm typecheck`
2. `CI=1 pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

关键通过事实：

- `/`、`/daily-latin`、`/dance-os` 都仍然 `200`
- `dance correction ledger interaction works`
- `dance sources anchor works`
- `daily loop demo interaction works`
- `home next session queue updates from archive`
- mobile overflow 仍然通过：
  - `homeOverflow.scrollWidth = 390`
  - `homeOverflow.innerWidth = 390`
  - `dailyOverflow.scrollWidth = 390`
  - `dailyOverflow.innerWidth = 390`

## 截图证据

目录：

- `/tmp/latinos-frontdoor-dance-next-bridge-pass-2026-07-11`

关键截图：

- `/tmp/latinos-frontdoor-dance-next-bridge-pass-2026-07-11/dance-os-desktop.png`
- `/tmp/latinos-frontdoor-dance-next-bridge-pass-2026-07-11/dance-os-mobile.png`

移动端截图额外说明：

- 采用等待：
  - `data-testid='dance-state-restart'`
  再截图
- 避免抓到 `Suspense` 恢复态

## 对当前 goal 的意义

这轮仍然没有声称：

- 整个 old goal 已全部完成

但它把核心三页里的第三页也推进了一步：

- `/dance-os`

而且推进方式仍符合当前 active goal 的顺序：

- 首页
- `/daily-latin`
- `/dance-os`

## 当前更重要的结论

截至这轮，核心三页都已经各自完成了一刀明确的页面级承接：

1. 首页：
   - 独立 `Dance OS Demo` 承接
2. `/daily-latin`：
   - `这轮做完后，从哪里继续`
3. `/dance-os`：
   - `从这里怎么继续`

在当前 active goal 口径下，下一步已经可以开始重新审计：

- 是否进入辅助页 / 资产沉淀 / deploy 阶段

但不应重新回到平均推进。
