# Dance OS Demo Return Trigger Pass

## 背景

当前主合同已经明确：

- 当前唯一默认 `Top 1` 是：
  - `/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo`
- 当前切片顺序应继续沿着：
  - `witness archive`
  - `queue`
  - `return trigger`

在 `queue` 成立之后，页面已经能证明：

- 这一轮会沉到 archive
- 保存后的 witness 会进入 queue
- 用户能继续这一条，也能标记完成

但还缺最后一层：

- **哪一条才是真正让用户下次回来就直接开始的入口**

所以这轮只做：

- `return trigger`

## 问题定义

真正要解决的不是“再多加一个列表”，而是：

**让 queue 里被选中的那一条，不只回填一次输入，而是被提升成一个单独的 return trigger，让用户下次回来时有一条明确的开练入口。**

## 这轮成立了什么

### 1. 本地 store 增加了 `returnTrigger`

文件：

- [demo-shell.tsx](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/components/demo-shell.tsx)

本地存储现在不只包含：

- `savedWitnesses`
- `practiceQueue`

还新增：

- `returnTrigger`

兼容逻辑也同时成立：

- 旧数组 archive 存储仍可迁移
- 旧对象 store 如没有 `returnTrigger`
  - 会优先用 queue 队首作为回退值

这样这轮不是另起一套状态，而是在现有 archive / queue 基础上继续长出“回来入口”。

### 2. queue 中的“继续这条”现在会武装 return trigger

文件：

- [demo-shell.tsx](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/components/demo-shell.tsx)

当前点击：

- `继续这条`

会同时完成两件事：

1. 把该条 witness 的：
   - 状态
   - 舞种
   - 身体落点
   - 备注
   回填到当前输入区
2. 把该条 witness 写成当前：
   - `returnTrigger`

这让 queue 从“候选列表”变成：

- 候选队列

而 `return trigger` 成为：

- 真正下次回来就能直接开练的入口

### 3. 页面上新增了独立的 return trigger 卡

文件：

- [demo-shell.tsx](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/components/demo-shell.tsx)
- [demo.ts](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/data/demo.ts)
- [globals.css](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/app/globals.css)

这轮新增了：

- `demoReturnPrompts`
- `return-trigger-section`
- `return-trigger-card`

当前卡片会展示：

- 当前回来入口
- 建议回来窗口
- 下一轮动作句
- 回看 lens
- 备注

并提供两个动作：

- `带回输入区`
- `清除回来入口`

### 4. return trigger 不会打坏现有 queue 行为

当前 `标记完成` 逻辑已经更新为：

- 如果当前完成的是 return trigger 对应的 queue item
  - 会自动把 return trigger 切到下一条 queue
  - 如果 queue 已空，则清空 return trigger

这意味着：

- return trigger
- queue
- archive

三者已经开始形成同一条状态链，而不是三个互不相关的显示区。

## 当前结果

这一轮后，`Dance OS Demo` 已从：

- `archive`
- `queue`

推进到：

- `return trigger`

现在页面已经能更明确回答：

- 用户会不会真的回来下一轮

因为它不再只是把 witness 存下来，也不只是把候选动作放进队列，而是已经能保留：

- **下次回来先做哪一条**

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
   - `return smoke：回来先做 15 秒，不加别的点。`
3. 点击：
   - `保存这一轮 witness`
4. 点击 queue 中的：
   - `继续这条`
5. 验证页面里真实出现独立 return trigger：
   - `恰恰 · 脚下`
   - 对应下一轮动作句
   - 对应备注
6. 验证输入区备注已被真实回填
7. 点击：
   - `清除回来入口`
8. 验证 return trigger 空态重新出现
9. 点击：
   - `标记完成`
10. 验证 queue 数量回到：
   - `0`

## 截图证据

目录：

- `/tmp/latinos-dance-os-demo-return-trigger-2026-07-10`

文件：

- `demo-desktop.png`
- `demo-mobile.png`

## 结论

这轮已经把 `Dance OS Demo` 从：

- `witness archive`
- `queue`

推进到：

- `return trigger`

当前这条最小产品链已经成立为：

- `archive -> queue -> return trigger`

下一步才值得进入：

1. 复核哪些状态该继续沉成 shared assets
2. 判断是否需要给 frontdoor 增加更真实的 demo 入口映射
3. 再往后才讨论 preview / deploy / 域名
