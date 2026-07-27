# Dance OS Demo Queue Pass

## 背景

当前主合同已经锁定：

- `Phase 1` 已完成
- `Phase 2` 已完成
- 当前唯一默认 `Top 1` 是：
  - `/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo`

在 `witness archive` 成立之后，下一轮最合理的最小切片不是继续美化输出句，而是：

- `queue`

因为如果保存后的 witness 只停在 archive 里，还不能证明这个 demo 真的能把“这一轮”变成“下一轮”。

## 问题定义

真正要解决的不是“再多显示一组列表”，而是：

**让保存后的 witness 自动进入 practice queue，并且用户真的能从队列里恢复这一条、继续这一条、再把它标记完成。**

## 这轮成立了什么

### 1. witness 不只保存，还会自动进入 practice queue

文件：

- [demo-shell.tsx](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/components/demo-shell.tsx)

当前保存 witness 时，会同时更新：

- `savedWitnesses`
- `practiceQueue`

处理方式：

- 新保存的 witness 自动进入队首
- 同状态 / 同舞种 / 同身体落点的旧 queue 项会被去重
- queue 最多保留 4 条

这让 archive 不再只是“留档”，而是开始承担“下一轮要继续什么”的真实职责。

### 2. queue 成了可操作队列，而不是静态展示区

文件：

- [demo-shell.tsx](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/components/demo-shell.tsx)
- [demo.ts](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/data/demo.ts)

当前每条 queue item 都提供：

- `继续这条`
- `标记完成`

并且行为已经成立：

- `继续这条`
  - 会把该条 witness 的
    - 状态
    - 舞种
    - 身体落点
    - 备注
    回填到当前输入区
- `标记完成`
  - 会把这一条从 queue 中移除
  - 并把最新 queue 状态写回 `localStorage`

### 3. 本地存储已经从单数组升级成对象 store

文件：

- [demo-shell.tsx](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/components/demo-shell.tsx)

当前本地存储结构已经升级为：

- `savedWitnesses`
- `practiceQueue`

并带有兼容逻辑：

- 如果历史存储还是旧的“仅数组 archive”格式
- 会自动迁成：
  - `savedWitnesses`
  - `practiceQueue`

这样这轮不是破坏性重写，而是在现有 archive 基础上继续长。

### 4. queue 有了前台完成态

文件：

- [globals.css](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/app/globals.css)

这轮 queue 的前台结构已经补齐：

- `queue-section`
- `queue-summary`
- `queue-list`
- `queue-item`
- `queue-actions`
- `queue-btn`

当前在桌面端和手机端都已经能直接看见：

- 队列总数
- 当前队首
- 每条 queue item 的状态 / 舞种 / 身体落点 / 下一轮动作句
- 两个动作按钮

## 当前结果

这一轮后，`Dance OS Demo` 已从：

- 只能留下 witness archive

推进到：

- 保存后的 witness 会真的进入下一轮队列
- 用户能从 queue 继续这一条
- 用户能把完成的这条从 queue 里清掉

这意味着 `Dance OS Demo` 已经不只是“记录这轮”，而是开始形成：

- `archive -> queue -> return`

这条真实产品主链的中段。

## 验证

在 `/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo` 当前重新验证通过：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3301`

并额外通过一次真实交互 smoke：

1. 选择：
   - `拍子总乱`
   - `恰恰`
   - `脚下`
2. 输入备注：
   - `queue smoke：先把 2-3 的脚下方向守清楚。`
3. 点击：
   - `保存这一轮 witness`
4. 验证 queue 真实出现：
   - `Queue 1 · 拍子总乱 · 恰恰`
   - 队列数量变成：
     - `1`
5. 点击：
   - `继续这条`
6. 验证当前输入区被真实回填：
   - 备注被恢复
   - 输出句变成：
     - `恰恰 · 下一轮先把步幅收小，把节拍边界和脚下方向守清楚。`
7. 点击：
   - `标记完成`
8. 验证队列数量回到：
   - `0`
9. 验证空态文案重新出现

## 截图证据

目录：

- `/tmp/latinos-dance-os-demo-queue-pass-2026-07-10`

文件：

- `demo-desktop.png`
- `demo-mobile.png`

## 结论

这轮已经把 `Dance OS Demo` 从：

- `witness archive`

推进到：

- `queue`

当前最合理的下一步继续收窄为：

1. 继续只服务 `Dance OS Demo`
2. 下一刀补：
   - `return trigger`
3. 只有当 `return trigger` 也成立后，再讨论 shared assets 或 frontdoor 按需回切
