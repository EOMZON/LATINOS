# Dance OS Demo Witness Archive Pass

## 背景

在核心页当前批次已无明显掉队页后，当前主线应按唯一主合同切回：

- `/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo`

这条线之前已经有：

- 独立 Next 壳
- 状态 / 舞种 / 身体落点选择
- 输出句随选择变化

但它还只是：

- 输入输出壳

还没有一条真实产品切片证明：

- 这一轮能不能留下可回看的证据

因此这轮只做第一刀：

- `witness archive`

## 问题定义

真正要解决的不是继续让右侧输出更好看，而是：

**让用户把当前这轮的状态、舞种、身体落点、下一轮动作句真正保存成一条 witness，并在页面里立刻看到 archive 结果。**

## 这轮改动

### 1. 给 demo 增加 archive 文案配置

文件：

- [demo.ts](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/data/demo.ts)

新增：

- `demoArchivePrompts`

把 archive 相关的：

- 标题
- 空态文案
- 保存按钮文案
- 备注输入文案

继续放在 data 层，而不是散落在组件里。

### 2. 把当前选择保存成真正 witness

文件：

- [demo-shell.tsx](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/components/demo-shell.tsx)

新增：

- `StoredWitness` 结构
- `localStorage` 读写
- 备注输入 `note`
- `保存这一轮 witness`

当前保存的内容包括：

- 当前状态
- 舞种
- 身体落点
- 下一轮动作句
- 回看 lens
- 用户备注
- 保存时间

保存后页面会立刻出现：

- archive 数量
- 最近一条 witness
- witness 列表

### 3. 给 archive 补真正可用的界面

文件：

- [globals.css](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/app/globals.css)

新增：

- `archive-compose`
- `note-field`
- `save-btn`
- `archive-summary`
- `archive-list`
- `archive-item`

这样这轮不再只是逻辑有了，而是前台可直接看到：

- 输入
- 保存
- 结果

## 当前结果

这一轮后，`Dance OS Demo` 已从：

- 只会根据选择改变右侧输出

推进到：

- 能把当前一轮真正保存成 witness
- 能立刻看到 archive 结果
- 有了第一批“练习如何沉成证据”的产品雏形

## 验证

在 `/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo` 已通过：

1. `pnpm typecheck`
2. `pnpm build`
3. `pnpm exec next start --hostname 127.0.0.1 --port 3301`

并额外通过一次真实交互 smoke：

- 选择：
  - 状态
  - 舞种
  - 身体落点
- 填写备注
- 点击 `保存这一轮 witness`
- 验证页面中真实出现：
  - 保存后的 witness 条目
  - 对应舞种与落点
  - 对应备注

## 截图证据

目录：

- `/tmp/latinos-dance-os-demo-witness-archive-2026-07-10`

文件：

- `demo-desktop.png`
- `demo-mobile.png`

## 结论

这轮不是继续停在“独立壳”，而是已经把 `Dance OS Demo` 推进到：

- 第一条真实产品切片成立：
  - `witness archive`

## 下一步

当前更合理的下一步是：

1. 继续只服务 `Dance OS Demo`
2. 在已有 archive 之上继续补：
   - `queue`
3. 再下一轮补：
   - `return trigger`
