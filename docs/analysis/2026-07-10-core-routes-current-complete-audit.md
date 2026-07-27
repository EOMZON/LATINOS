# Core Routes Current Complete Audit

## 背景

当前 goal 仍然要求：

- 先完成首页 `/`
- `/daily-latin`
- `/dance-os`

的用户可见完成态，然后再进入后续阶段。

在今天已经先后完成：

- `/daily-latin` 的 `entry rail` visible pass
- 首页 `/` 的 `workbench shell` visible pass

之后，需要再做一次同一时间点的并排验收，确认当前这三条核心路由里是否还存在一个明显掉队页。

## 审计对象

最新同一时间点截图目录：

- `/tmp/latinos-core-final-audit-2026-07-10`

包含：

- `home-desktop.png`
- `home-mobile.png`
- `daily-latin-desktop.png`
- `daily-latin-mobile.png`
- `dance-os-desktop.png`
- `dance-os-mobile.png`

## 结论

基于当前页面事实、同一时间点截图和已通过的验证链，这一批核心页当前可以判定为：

- **已没有明显掉队页**

这不代表它们永久不再改，而是代表：

- 当前不再存在一个必须继续当 `Top 1` 收口的核心页
- 可以结束本轮“核心页 visible pass”主线
- 应按唯一主合同切回 `Dance OS Demo`

## 页面级判断

### `/`

当前首页已具备：

- 成立的 hero
- 成立的热力图
- 成立的 `workbench shell`

下半段工作台现在已被收成统一 frontdoor board，不再像散开的队列和模块卡清单。

### `/daily-latin`

当前已具备：

- 成立的 snapshot
- 成立的 `entry rail`
- 成立的 loop demo
- 成立的 live return / bridge

前半段已经不再像两个平铺说明区，而是单一入口板。

### `/dance-os`

当前已具备：

- 成立的 summary
- 成立的模块库
- 成立的 correction ledger
- 成立的 body map / practice queue

当前更像聚焦 demo 页，而不是还停在说明页状态。

## 为什么现在可以切回 Demo 主线

如果继续停在核心页主线，前提应该是：

- 仍有一个明显掉队页
- 或者当前某页明显不够像前台完成态

但当前这批证据表明：

- 首页 `/` 已补完最近一轮收口
- `/daily-latin` 已补完最近一轮收口
- `/dance-os` 没有显示出明显掉队状态

因此，继续停在核心页平均打磨，收益已经低于切回当前唯一主合同所要求的 demo 主线。

## 已有验证证据

当前 frontdoor 最近一轮通过：

1. `pnpm typecheck`
2. `CI=1 pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

## 下一步

当前更合理的下一步是：

1. 结束这轮核心页 visible pass 主线
2. 按唯一主合同切回：
   - `/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo`
3. 继续只做一个最小产品切片：
   - `witness archive`
4. 再下一轮继续：
   - `queue`
   - `return trigger`
