# Frontdoor Dance OS Independent Demo Entry Pass

## 背景

按当前唯一主合同，上一轮已经完成：

- `Dance OS Demo` 的第一刀 shared assets

因此当前更合理的新 `Top 1` 不再是继续抽内部边界，而是：

- `frontdoor` 对独立 `Dance OS Demo` 的真实入口映射

当前最明显的缺口是：

- `/dance-os` 这页虽然已经有产品语言、route demo 和模块库
- 但还没有把“独立 `Dance OS Demo` 已经存在，并且现在该怎么进入”收成一个明确前台入口

## 问题定义

真正要解决的不是“再多一个说明段”，而是：

**让 `/dance-os` 不只是在讲这个工具未来会做什么，而是明确给出当前 frontdoor route 与独立 demo 壳之间的入口关系。**

## 这轮改动

### 1. 给 `/dance-os` 增加了独立 demo 入口块

文件：

- [page.tsx](/Users/zon/Desktop/LATINOS/sites/frontdoor/app/dance-os/page.tsx)

这轮新增了：

- `独立 Demo` anchor
- `独立 Dance OS Demo 入口` 详情块

并明确给出两个入口动作：

1. `打开独立 Demo（本机 3301）`
2. `继续看本页 route demo`

这让 `/dance-os` 当前不再只是：

- “这里有 correction / queue / body map”

而是更明确变成：

- “frontdoor 先承接，再把独立工具壳单独长”

### 2. 入口块的阶段语言回到了当前真实事实

文件：

- [dance.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/dance.ts)

这轮新增了：

- `danceIndependentDemoRows`
- `danceIndependentDemoMetrics`
- `danceIndependentDemoSignals`

内容上明确同步成当前真实阶段：

- 已成立链路：
  - `archive -> queue -> return trigger`
- 当前入口：
  - 本机 `3301` 独立壳
  - 本页 route demo 对照入口
- 当前约束：
  - 先本地 / preview
  - 不直接切旧域名首页

这样这块不再像抽象方向卡，而是回到当前真实推进状态。

### 3. `/dance-os` 的信息架构更像前台入口，而不是单一内部壳

这轮后，这页的结构变成：

1. 总览
2. 独立 Demo
3. 模块库
4. 纠错
5. 队列
6. 依据

相比之前，这让用户更容易理解：

- 本页是 frontdoor 承接层
- 独立 demo 是正在单独长出来的产品壳
- 两者不是互相替代，而是承接与孵化关系

## 当前结果

这一轮后，`/dance-os` 已经从：

- 只是解释 `Dance OS` 会做什么

推进到：

- 明确承接当前独立 demo 的真实入口关系

用户现在至少能直接看见：

- 独立 demo 已经存在
- 当前该从哪里进入
- 当前为什么还是 `frontdoor + 独立壳` 并行，而不是直接切生产入口

## 验证

在 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 当前重新验证通过：

1. `pnpm typecheck`
2. `CI=1 pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

补充事实：

- `typecheck` 第一次运行时卡在 `.next/types` 缺失
- 在当前工作树重新生成后已稳定通过
- 最终通过证据以成功复跑后的结果为准

## 截图证据

目录：

- `/tmp/latinos-frontdoor-dance-independent-entry-2026-07-11`

文件：

- `dance-os-desktop.png`
- `dance-os-mobile.png`

## 结论

这轮已经把 `frontdoor` 对独立 `Dance OS Demo` 的入口映射做成第一版前台结果。

当前更合理的下一步不该直接平均扩散，而是继续只选一个新的 `Top 1`，在以下候选里二选一：

1. 看首页是否也需要更直接地承接这个独立 demo
2. 或回到 `Dance OS Demo` 内继续抽第二刀 shared assets
