# Dance OS Demo First Shell

## 背景

`Phase 3` 当前已经明确：

- 两个 demo 需要先定义边界
- 当前推荐的 `Top 1` 是：
  - `Dance OS Demo`

如果只停在 README 与边界说明，下一轮依然会卡在：

- 还没真正开始独立孵化
- 还没有可访问壳体
- 还没有最小交互证据

所以这轮真正要做的不是再解释为什么选它，而是：

**给 `apps/demos/dance-os-demo/` 搭一版最小可运行独立壳，并用最小交互证明这条线已经开始从定义进入实现。**

## 这轮改动

目录：

- `/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo`

新增文件：

- [package.json](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/package.json)
- [tsconfig.json](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/tsconfig.json)
- [next-env.d.ts](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/next-env.d.ts)
- [next.config.mjs](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/next.config.mjs)
- [app/layout.tsx](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/app/layout.tsx)
- [app/page.tsx](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/app/page.tsx)
- [app/globals.css](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/app/globals.css)
- [data/demo.ts](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/data/demo.ts)
- [components/demo-shell.tsx](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/components/demo-shell.tsx)
- [.gitignore](/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo/.gitignore)

## 当前这版壳成立了什么

### 1. 它已经是独立 Next 壳

不是 frontdoor 子页，而是：

- 独立 `Next.js App Router`
- 独立 `package.json`
- 独立 `typecheck / build / start`

这让后续继续长：

- witness archive
- queue
- return trigger

时，不必先把所有逻辑继续塞回 frontdoor。

### 2. 它已经有最小输入输出结构

当前输入：

- 当前状态
- 舞种
- 身体落点

当前输出：

- 状态判断
- 回看 lens
- 当前只修 1 个点
- 下一轮动作句

这符合当前 `Dance OS Demo` 的边界定义：

- 录一轮
- 回看
- 只修一个点
- 留下下一轮动作句

### 3. 它已经有一轮最小交互

当前 chip 交互会驱动右侧结果变化。

这意味着：

- 它不再只是静态板子
- 已经开始进入“最小可验证工具壳”

## 当前证据

### 构建与类型证据

在 `/Users/zon/Desktop/LATINOS/apps/demos/dance-os-demo` 已通过：

- `pnpm approve-builds --all`
- `pnpm typecheck`
- `pnpm build`

补充事实：

- 第一次安装依赖时，`pnpm` 卡在 `sharp` 的 build approval
- 已通过：
  - `pnpm approve-builds --all`
  解除

并在目录内生成：

- `pnpm-workspace.yaml`
  - 记录 `sharp` 已允许 build

### 运行与交互证据

本轮已成功：

- `pnpm exec next start --hostname 127.0.0.1 --port 3301`

并通过轻量交互 smoke：

- 打开首页
- 切换：
  - 状态
  - 舞种
  - 身体落点
- 验证右侧“下一轮动作句”真实变化

### 截图证据

目录：

- `/tmp/latinos-dance-os-demo-v1-2026-07-10`

文件：

- `dance-os-demo-desktop.png`
- `dance-os-demo-mobile.png`

## 结论

这一轮后，`Dance OS Demo` 已从：

- “只有定义、只有 README”

推进到：

- “有独立目录、有可运行 Next 壳、有最小交互、有截图和验证证据的第一版孵化壳”

这意味着 `Phase 3` 已经不是只停在决策层，而是开始进入真实孵化。

## 下一步

当前更合理的下一步是：

1. 继续以 `Dance OS Demo` 作为 `Top 1`
2. 给这版壳补：
   - witness archive
   - queue
   - return trigger
3. 再决定哪些逻辑值得从 frontdoor 抽成共享资产
