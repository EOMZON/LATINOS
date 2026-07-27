# Dance OS Demo Lifecycle Snapshot Second Shared-Assets Pass

## 这轮为什么选它

按当前 active goal 的旧合同和当前仓库事实继续推进时：

- `Phase 1` 已完成
- `Phase 2` 已完成
- 当前默认主线仍然是：
  - `/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo`

并且当前最直接、最不该继续悬空的一轮，是已经落到代码里的 shared-assets 第二刀。

这轮不是继续回切 frontdoor，而是把已经存在的：

- lifecycle snapshot
- stage cards
- shared stage prompts

真正补齐到：

- fresh build
- 真实交互 smoke
- 桌面截图
- 移动截图
- analysis / memory 同步

## 本轮 `Top 1`

- `Dance OS Demo` shared-assets 第二刀完整验收

## 当前代码事实

这轮对应的前台变化已经存在于：

- [demo-shell.tsx](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/components/demo-shell.tsx:1)
- [demo.ts](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/data/demo.ts:1)
- [witness-flow-stage-card.tsx](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/components/witness-flow-stage-card.tsx:1)
- [globals.css](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/app/globals.css:1)

当前这刀新增并成立的 shared-assets 边界是：

1. `lifecycle snapshot` 作为页面级状态总览
2. `WitnessFlowStageCard` 作为 archive / queue / return 的共享阶段卡
3. `demoFlowStagePrompts` 作为三阶段共享提示配置

用户现在能在正式页面上直接看到：

- `archive -> queue -> return`
  当前走到哪
- 保存 witness 后三段状态如何同步变化
- queue 被消费或清空后 snapshot 如何回落

## 真实验证

在 `/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo` 严格串行重新通过：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3301`

之后通过 Python Playwright 做真实交互 smoke。

### smoke 路径

1. 选择：
   - `拍子总乱`
   - `恰恰`
   - `脚下`
2. 验证输出区的下一轮动作句切换为：
   - `恰恰 · 下一轮先把步幅收小，把节拍边界和脚下方向守清楚。`
3. 输入备注：
   - `下次先守住 2-3 的重心，再看脚下方向。`
4. 点击：
   - `保存这一轮 witness`
5. 验证 lifecycle snapshot 三段同时更新：
   - archive：
     - `1 条 witness`
     - `恰恰 · 脚下`
   - queue：
     - `1 条待继续`
     - `恰恰 · 脚下`
   - return：
     - `已武装回来入口`
     - `恰恰 · 脚下`
6. 验证 archive / queue / return 对应正文块也同步更新
7. 点击 queue 中：
   - `继续这条`
8. 验证备注被真实带回输入区
9. 点击：
   - `清除回来入口`
10. 验证 return snapshot 回落到空态
11. 点击：
   - `标记完成`
12. 验证 queue snapshot 回落到：
   - `还没有待继续队列`
   - queue 数量为：
     - `0`

### smoke 输出证据

本轮真实断言输出要点包括：

1. `next-step-updates`
   - `恰恰 · 下一轮先把步幅收小，把节拍边界和脚下方向守清楚。`
2. `lifecycle-snapshot-after-save`
   - archive / queue / return 三块均显示 `恰恰 · 脚下`
3. `archive-queue-return-updated`
   - archiveLatest = `恰恰 · 脚下`
   - queueHead = `恰恰 · 脚下`
   - returnTitle = `恰恰 · 脚下`
4. `resume-refills-note`
   - 备注完整回填
5. `return-cleared`
   - return 卡回到未武装状态
6. `queue-falls-back-after-complete`
   - queue 卡回到空态
   - queueCount = `0`

## 截图证据

目录：

- `/tmp/latinos-dance-os-demo-lifecycle-snapshot-second-pass-2026-07-11`

关键截图：

- `/tmp/latinos-dance-os-demo-lifecycle-snapshot-second-pass-2026-07-11/demo-desktop.png`
- `/tmp/latinos-dance-os-demo-lifecycle-snapshot-second-pass-2026-07-11/demo-mobile.png`

当前截图证明：

1. 桌面端下 lifecycle snapshot 与下方 archive / queue / return 实体块节奏一致
2. 移动端下三段 stage card 改为单列，页面没有塌掉
3. shared card 语言在三段状态之间已经保持一致

## 这轮的意义

这轮不是新增另一套方向，而是把已经落代码的第二刀 shared-assets pass 真正收口。

收口之后，当前 `Dance OS Demo` 的事实变成：

1. `archive -> queue -> return trigger` 最小产品链继续成立
2. `demo-store`、`witness-record-card`、`witness-flow-stage-card`、`demoFlowStagePrompts`
   都已经进入真实可运行资产
3. 页面级状态总览不再只是隐藏在各块正文里，而是被抬升成可直接判断的 snapshot

## 下一步

在当前 old goal 的真实阶段判断下，更合理的新 `Top 1` 不应回到首页或核心三页平均推进。

当前更合理的候选顺序是：

1. 继续只服务 `Dance OS Demo`
2. 优先做一刀更 grounded 的真实内容 pass
3. 或继续抽下一刀最小 shared-assets 边界
4. 只有 demo 暴露 frontdoor 口径落后时，才按需回切 `sites/frontdoor`
