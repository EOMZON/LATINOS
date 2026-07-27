# Daily Source Matrix Component Fix Pass

## 背景

在前一轮稳定基线里，`/daily-latin 390` 仍停在：

- `2297`

同时已经有一个明确未收口的问题：

- `#daily-sources` 的 compact source matrix 之前尝试过一轮 CSS-only 补丁
- 目标是把 `.mini` 辅助行在 `daily-latin` 的窄屏 compact 视图下拿掉
- 但 fresh rebuild 之后没有生效

这说明当前问题不再适合继续赌 CSS 选择器优先级，而应该回到组件边界层面处理。

## 问题定义

这轮要解决的不是“继续压一层字号”。

这轮真正要解决的是：

**让 `daily-latin` 的 `#daily-sources` 在组件层拥有显式的 compact 能力，避免继续依赖失效的 CSS 猜测，同时继续守住当前 locked architecture。**

进一步检查后，问题原因很明确：

- `SourceMatrix` 会把传入的整串 `className` 同时拼到容器和 panel 后缀类名里
- `SourcePanel` 本身会无条件渲染 `.mini`
- 因此 `daily-latin` 这块如果想稳定去掉 `.mini`
  - 最稳的做法不是再写一条更强的 CSS
  - 而是让组件自己知道什么时候不渲染 `.mini`

## 为什么这轮选组件层修复

这轮如果继续走 CSS-only，会有三个问题：

1. 选择器层级已经很多，再叠一层只会让后续 AI 更难判断真实生效来源
2. 当前 `SourceMatrix` / `SourcePanel` 是多路由共享结构，特例若长期藏在 CSS 里会继续增加维护噪音
3. 用户当前目标不是“临时把一屏压短”，而是让这套结构以后能长期被 AI 改而不易改崩

因此这轮最佳动作是：

- 给共享组件加显式能力
- 在 `daily-latin` 精准启用
- 把无效 CSS 试探补丁去掉

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/sections/source-panel.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/sections/source-matrix.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/daily-latin/page.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. `SourcePanel` 增加显式 `hideMini` 能力

- 新增：
  - `hideMini?: boolean`
- 行为：
  - 默认仍渲染 `.mini`
  - 只有显式传入 `hideMini` 时才不渲染

作用：

- 保持共享组件默认行为不变
- 避免把 `mini` 的显示逻辑长期绑死在样式猜测上

### 2. `SourceMatrix` 继续向下透传 `hideMini`

- 新增：
  - `hideMini?: boolean`
- 同时把这个能力传给左右两个 `SourcePanel`

作用：

- 保持 `SourceMatrix` 仍然是共享组合层
- 让 route 级页面可以用显式参数控制 compact 信息密度

### 3. 只在 `daily-latin` 的 `#daily-sources` 启用

在：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/daily-latin/page.tsx`

里，对当前 source matrix 增加：

- `hideMini`

作用：

- 只影响 `daily-latin`
- 不波及 `dashboard / dance-os / tools / about / roadmap`

### 4. 清理无效 CSS 试探补丁

从：

- `#daily-sources .compact-source-matrix-daily-side-panel .source-row .mini{display:none}`

这类未实际站住的选择器试探，回退成更干净的样式层。

作用：

- 避免后续 agent 误以为这段 CSS 仍然承担真实职责
- 让“为什么 `.mini` 消失”回到组件层单一来源

## 验证过程中的一个关键分歧

这轮验证时发现一个重要现象：

- `pnpm verify` 内部自启的 `3101` 生产实例是绿的
- 但手动对已有 `127.0.0.1:3200` 实例运行 `browser smoke` 时，曾短暂出现：
  - `Sidebar should be hidden on mobile`

进一步检查确认：

- `3200` 上当时跑的是一个旧的 `next start` 进程
- 它来自同一目录，但不是这轮 fresh build 之后重新拉起的实例

因此这轮处理不是去改 `sidebar` 逻辑，而是：

1. 先确认问题来自旧实例不一致
2. 停掉旧的 `3200` 进程
3. 用 fresh build 重新启动 `127.0.0.1:3200`
4. 再对 fresh `3200` 实例重跑 smoke

这一步很重要，因为它把“验证分歧”从代码问题和环境问题里区分开了。

## 量化结果

在 fresh `127.0.0.1:3200` 的 `390px` 实测下：

- `#daily-sources` section height：
  - `185.47`
- `#daily-sources .source-matrix` height：
  - `159.88`
- `#daily-sources .mini` count：
  - `0`
- `#daily-sources .source-row` count：
  - `8`

这说明这轮的关键目标已经成立：

- `mini` 辅助行不再渲染
- source matrix 的 dense compact 行为已经回到组件层可控状态

## 验证

这轮通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

其中 fresh `3200` browser smoke 继续确认：

- home hero 正常
- dance-os 关键交互正常
- daily loop demo 正常
- dashboard dense sections 正常
- mobile shell 正常
- mobile home 无横向 overflow
- mobile daily-latin 无横向 overflow

## 结论

这轮最重要的价值不是“把一个区块再压短一点”。

而是：

1. 把 `daily-sources` 的 compact 行为从失效 CSS 猜测切回组件层显式能力
2. 保持现有 `Next.js App Router + React + TypeScript` 主线不变的前提下，继续强化共享组件边界
3. 把 `3200` 旧实例造成的验证噪音清掉，重新建立 fresh production preview 的可信验证口径

## 下一步

下一轮更值得继续做的是：

1. 重新测 fresh `390px` 全路由 sweep
   - `/`
   - `/daily-latin`
   - `/dashboard`
   - `/dance-os`
2. 如果 `daily-latin` 仍然不是最优密度档位
   - 优先继续看 `#today-loop-demo` 或 `#legacy-daily-principles`
   - 但只做 high-ROI small pass
3. 如果 route-level mobile density 已接近平齐
   - 切回整站 completion 视角
   - 继续收首页与二级页的“近似同款完成度”
