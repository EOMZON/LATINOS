# Dance OS Demo Grounded Shared Data Pass

## 这轮为什么选它

按当前 active goal 的真实阶段继续推进时：

- 首页、`/daily-latin`、`/dance-os` 当前没有新的掉队证据
- `Dance OS Demo` shared-assets 第二刀已经完成真实验收

因此这轮更合理的唯一 `Top 1` 不是回切 core routes，而是继续只服务：

- `/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo`

并且优先做一刀：

- **更 grounded 的真实内容 + 更稳定的共享数据边界**

真正要解决的不是再补一个隐形抽象，而是：

1. 让 demo 里的状态 / 舞种 / 身体落点不再停在较薄的本地副本
2. 让 frontdoor 与独立 demo 共享同一套拉丁语义数据
3. 让用户前台直接看到：
   - 不同舞种下同一落点的 next step 确实不同
   - 为什么当前先修这里
   - 什么情况下这轮还没闭环

## 本轮 `Top 1`

- `Dance OS Demo` grounded shared data pass

## 这轮改动

### 1. 新增仓库级共享数据模块

新增：

- [dance-os-demo-shared.ts](/Users/zon/Desktop/LATINOS/data/dance-os-demo-shared.ts:1)

这轮把当前 `Dance OS Demo` 相关的核心真实数据抽成仓库级共享边界：

1. `sharedDanceDemoProfiles`
2. `sharedDanceDemoStates`
3. `sharedDanceDemoFocuses`
4. `sharedDanceDemoChecklist`

这不是空抽象。

它实际收的是真正会影响产品行为和文案的那层数据：

- 舞种差异
- 不同身体落点的修正句
- 当前状态的 lens / 退出条件
- checklist 的详细说明

### 2. frontdoor 与独立 demo 现在共用同一套数据源

更新：

- [sites/frontdoor/data/dance.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/dance.ts:1)
- [apps/demos/dance-os-demo/data/demo.ts](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/data/demo.ts:1)

现在这两层不再各自维护一套相近但可能漂移的数据副本。

当前成立的共享事实是：

1. frontdoor route demo 用共享数据
2. 独立 `Dance OS Demo` 也用共享数据
3. 后续如果要继续改：
   - `恰恰`
   - `伦巴`
   - `桑巴`
   在不同落点下的具体修正句
4. 不再需要两边分别找和改

### 3. 独立 demo 的动作句从“按落点通用句”升级为“按舞种 + 落点真实句”

更新：

- [demo-shell.tsx](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/components/demo-shell.tsx:1)

这轮最重要的前台变化是：

当前 `nextStep` 不再只是：

- `profile.label + focus.nextStep`

而是改为：

- `profile.label + profile.corrections[focus.id]`

这意味着用户现在前台直接能看到：

- `恰恰 + 脚下`
  和
- `伦巴 + 脚下`

不再共用一句过于泛化的“脚下 next step”。

这更接近真实练习语义，而不是模板式占位。

### 4. demo 前台新增 grounded 解释层

同样更新：

- [demo-shell.tsx](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/components/demo-shell.tsx:1)
- [globals.css](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/app/globals.css:1)

新增了两块前台结果：

1. `为什么先修这里`
   - 使用 `focus.proof`
2. `如果这轮还没闭环`
   - 使用 `state.nextStep`

这两块的意义是：

- 不只告诉用户“下一轮做什么”
- 也告诉用户“为什么现在先修这里”
- 以及“什么时候说明这轮其实还没收住”

### 5. checklist 也从薄列表升级成详细说明

之前 checklist 更像四句短语。

这轮后它直接展示：

- label
- detail

这样“先录 15 秒 / 只修 1 个点 / 回看时先说问题 / 留下下一步”这四条，不再只是标题，而是有了前台可读的具体语义。

### 6. 两个 Next 项目都补了 externalDir 接入

更新：

- [apps/demos/dance-os-demo/tsconfig.json](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/tsconfig.json:1)
- [apps/demos/dance-os-demo/next.config.mjs](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/next.config.mjs:1)
- [sites/frontdoor/tsconfig.json](/Users/zon/Desktop/LATINOS/sites/frontdoor/tsconfig.json:1)
- [sites/frontdoor/next.config.mjs](/Users/zon/Desktop/LATINOS/sites/frontdoor/next.config.mjs:1)

这样共享数据不再只是“理论上可共用”，而是实际被两个独立 Next 项目同时消费。

## 用户可见结果

这轮后，在独立 `Dance OS Demo` 前台已经能直接看到：

1. `恰恰 + 脚下` 的动作句变成：
   - `恰恰 · & 拍收小一点，锁步不要跨太大。`
2. 页面新增：
   - `为什么先修这里`
   - `如果这轮还没闭环`
3. checklist 改成：
   - 标题 + 详细说明
4. 保存后的 witness 也会把更 grounded 的动作句沉到 archive / queue / return 链里

## 验证

### `Dance OS Demo`

在 `/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo` 重新通过：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3301`

并额外通过 Python Playwright 真实 smoke：

1. 清空 localStorage
2. 选择：
   - `拍子总乱`
   - `恰恰`
   - `脚下`
3. 验证输出区动作句变成：
   - `恰恰 · & 拍收小一点，锁步不要跨太大。`
4. 验证：
   - `为什么先修这里`
   - `如果这轮还没闭环`
   两块真实出现 grounded 文案
5. 验证详细 checklist 出现
6. 保存 witness
7. 验证 archive 中保存的 witness 也使用这条 grounded 动作句

### `frontdoor`

因为这轮把 frontdoor 也接到了共享数据源，所以也重新完整验证：

在 `/Users/zon/Desktop/LATINOS/sites/frontdoor` 通过：

1. `pnpm typecheck`
2. `CI=1 pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

关键通过事实：

- 所有核心与辅助路由仍然 `200`
- `dance correction ledger interaction works`
- `daily loop demo interaction works`
- `home next session queue updates from archive`
- mobile overflow 仍然通过

## 截图证据

目录：

- `/tmp/latinos-dance-os-demo-grounded-shared-data-pass-2026-07-11`

关键截图：

- `/tmp/latinos-dance-os-demo-grounded-shared-data-pass-2026-07-11/demo-desktop.png`
- `/tmp/latinos-dance-os-demo-grounded-shared-data-pass-2026-07-11/demo-mobile.png`

当前截图证明：

1. 桌面端下 grounded 解释层已经进入输出主区
2. 移动端下新增块没有打坏页面节奏
3. archive / queue / return 仍然延续上一轮已成立的状态链

## 这轮的意义

这轮不是回到前台平均推进，也不是单纯再抽一层结构。

它真正推进了两件事：

1. 用户前台看到的动作句和判断语义更接近真实拉丁练习语境
2. 同一套语义数据开始真正服务：
   - frontdoor
   - 独立 demo

这更符合当前主合同里真正想做的：

- 数据与组件分离
- 共享资产可持续沉淀
- 一处调整，不再牵出两套相近副本

## 下一步

在当前 active goal 的阶段事实下，更合理的下一步仍然应该继续只服务 `Dance OS Demo`。

当前更合理的候选顺序是：

1. 再做一刀更 grounded 的真实内容 pass
   - 尤其是把 witness / queue / return 的文案进一步贴近真实使用场景
2. 或继续抽下一刀最小 shared-assets
3. 只有 demo 暴露 frontdoor 口径落后时，才按需回切 frontdoor
