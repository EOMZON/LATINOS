# Daily Library Shell Pass

## 背景

在 `2026-07-09-dance-assets-header-pass` 之后，fresh `390px` broad mobile heights 是：

- `/ = 1513`
- `/daily-latin = 1892`
- `/dashboard = 1880`
- `/dance-os = 1875`

当前 broad mobile Top1 是：

- `/daily-latin = 1892`

其中更高的几块是：

- `#today-loop-demo = 282.25`
- `#daily-library = 178.12`
- `#live-return-bridge = 169.14`
- `#daily-sources = 168.06`

## 问题定义

这一轮不是去重做 `Daily Latin` 的结构。

这一轮要解决的是：

**在不碰组件结构和交互语义的前提下，用一刀最小的 `390px` shell 收口，把 `/daily-latin` 从 `1892` 继续往下拉。**

## 拆解

重新拆 `#daily-library` 后，当前组成是：

- `section = 178.12`
- `head = 19.19`
- `tabs = 32.94`
- `grid = 111`
- 每张 `compact-move-card = 54`

进一步确认：

- `head .more` 已经被隐藏，不再是可收点
- panel 在 `compact + hidePanelInCompact` 下本来就不渲染
- 真正还能继续收的是：
  - `compact tabs`
  - `compact move grid`
  - `compact move card` shell
  - 卡片里低收益的 `meta`

## 本轮改动

文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

动作：

- 只在 `390px` block 里继续收 `#daily-library`
- 收 `compact tabs`：
  - `gap`
  - `margin-bottom`
  - `tab` font-size / padding
- 收 `compact move grid`：
  - `gap`
- 收 `compact move card`：
  - `min-height`
  - `padding`
  - `tag` 位置、字级、padding
  - `h4` 字级、行高
- 直接隐藏低收益的：
  - `.compact-move-card .meta`

没有改：

- `TabbedMoveLibrary` 组件结构
- data/content
- tabs 数量和交互逻辑

## 验证

这轮通过了：

- `pnpm typecheck`
- `pnpm build`
- fresh `next start --hostname 127.0.0.1 --port 3200`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
- fresh `390px` remeasure

## 量化结果

- `/daily-latin 390`
  - `1892 -> 1871`
- `#daily-library`
  - `178.12 -> 156.19`

当前复测：

- `daily-library-tabs = 30`
- `daily-library-grid = 94`
- `daily-library-card1 = 46`
- `daily-library-card2 = 46`
- `daily-library-card3 = 46`

## fresh broad mobile heights

- `/ = 1513`
- `/daily-latin = 1871`
- `/dashboard = 1880`
- `/dance-os = 1875`

新的 broad mobile Top1 切到：

- `/dashboard = 1880`

## 结论

这轮成立。

它说明：

- `Daily Latin` 当前继续适合走 `shell / density / low-yield meta` 收口路线
- 不需要每次都回到 `today-loop-demo`

## 下一步

优先回到当前 broad mobile Top1：

- `/dashboard = 1880`

如果之后再回到 `/daily-latin`，当前更值得继续看的顺序是：

1. `#today-loop-demo`
2. `#live-return-bridge`
3. `#daily-sources`
