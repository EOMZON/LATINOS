# Dance OS Demo Shared Assets First Pass

## 背景

按当前唯一主合同，`Dance OS Demo` 已经至少完成：

- `witness archive`
- `queue`
- `return trigger`

当前最合理的下一步不再是继续补同层小功能，而是只选一组最小共享边界，判断它是否值得先沉成 shared assets。

这轮的唯一 `Top 1` 是：

- `Dance OS Demo` 的第一刀 shared assets

## 问题定义

真正要解决的不是“继续加更多卡片”，而是：

**把已经在 archive / queue / return trigger 三处重复出现的 witness 展示壳和本地 store 边界先抽成共享资产，避免后续 AI 一改一处、三处又开始漂。**

## 这轮改动

### 1. 把 demo store 边界抽到独立 `lib`

新增文件：

- [demo-store.ts](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/lib/demo-store.ts)

这轮把原来散在 `demo-shell.tsx` 里的：

- `StoredWitness`
- `DemoStore`
- `STORAGE_KEY`
- `normalizeWitnesses`
- `loadStore`

全部抽到独立 `lib` 层。

这意味着：

- witness 数据结构有了单独边界
- 本地存储迁移逻辑不再和页面渲染混写
- 后续如果 frontdoor 或其他 demo 要复用这套 witness store，会更容易判断接缝

### 2. 把 archive / queue / return trigger 的重复卡片抽成共享组件

新增文件：

- [witness-record-card.tsx](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/components/witness-record-card.tsx)

这轮把三个区域共同拥有的结构抽成统一组件：

- 头部
- 时间
- meta 行
- 下一轮动作句
- 回看 lens
- 备注
- 动作按钮区

这样 `archive / queue / return trigger` 不再各自维护一套近似但不同的壳体。

### 3. `demo-shell` 只保留编排和动作逻辑

文件：

- [demo-shell.tsx](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/components/demo-shell.tsx)

这轮之后：

- `demo-shell`
  - 主要负责状态编排、保存、继续、完成、清除
- `demo-store`
  - 负责 witness / store 边界
- `witness-record-card`
  - 负责 witness 展示壳

这正是当前主合同里要求的：

- 不先大抽象
- 只在真实产品链已成立之后，抽一刀最小共享边界

### 4. 前台也同步得到可见一致性

文件：

- [globals.css](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/app/globals.css)

这轮不是纯内部重构。

页面上能直接看到的变化是：

- archive / queue / return trigger 三块的卡片语言更统一
- 头部、meta、动作句、lens、备注和按钮节奏统一
- return trigger 仍保留更强强调态，但不再是完全另一套壳

## 当前结果

这一轮后，`Dance OS Demo` 已经不只是有产品链：

- `archive -> queue -> return trigger`

还多了第一刀真实 shared assets：

- `demo-store`
- `witness-record-card`

这让后续继续改：

- witness 展示
- queue 结构
- return trigger 节奏

时，不容易再次出现三套壳一起漂的情况。

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
   - `shared assets smoke：回来先做脚下，不加第二个点。`
3. 点击：
   - `保存这一轮 witness`
4. 验证 archive 卡片正常出现：
   - `拍子总乱 · 恰恰`
5. 点击 queue 中：
   - `继续这条`
6. 验证 return trigger 正常出现：
   - `恰恰 · 脚下`
7. 验证输入区备注被真实回填
8. 点击：
   - `清除回来入口`
9. 点击：
   - `标记完成`
10. 验证 queue 数量回到：
   - `0`

## 截图证据

目录：

- `/tmp/latinos-dance-os-demo-shared-assets-2026-07-11`

文件：

- `demo-desktop.png`
- `demo-mobile.png`

## 结论

这轮已经把 `Dance OS Demo` 从：

- 只有产品切片成立

推进到：

- 有第一刀真实 shared assets

当前更合理的下一步是：

1. 继续只选一个新的 `Top 1`
2. 优先判断：
   - frontdoor 是否需要给独立 demo 增加更真实的入口映射
3. 或继续在 demo 内只抽下一刀最小共享边界
