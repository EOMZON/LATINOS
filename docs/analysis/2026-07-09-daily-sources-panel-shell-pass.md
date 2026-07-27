# Daily Sources Panel Shell Pass

## 背景

在上一轮 `Daily Loop Entry Shell Pass` 成立之后，fresh `390px` broad mobile heights 是：

- `/ = 1513`
- `/daily-latin = 1835`
- `/dashboard = 1823`
- `/dance-os = 1840`

这意味着当轮 broad mobile Top1 是：

- `/daily-latin = 1835`

继续拆 `/daily-latin` 后，当前 section 高度是：

- `#today-loop-demo = 267.47`
- `#daily-sources = 168.06`
- `#live-return-bridge = 153.14`
- `#daily-library = 151.53`

## 为什么这轮选 `#daily-sources`

对 `#daily-sources` 的默认空态拆解显示：

- `section = 168.06`
- `head = 19.19`
- `matrix = 145.88`

进一步拆 matrix 后确认：

- `panel1 = 59.44`
- `panel2 = 59.44`
- `title1 = 15.34`
- `title2 = 15.34`
- `list1 = 31.09`
- `list2 = 31.09`

而当前最终命中层已经把 row 文案压得很薄：

- `.source-row = 14.05`
- `padding = 2px 3px`

说明当前这块的真实厚点不再是 row 本体，而是：

- 两个 source panel 的壳体 padding
- panel title 的底部间距
- panel 自身默认 `margin-bottom`

所以这轮继续只做 panel shell pass，不碰数据内容。

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

只在最终命中的 `@media (min-width:390px) and (max-width:430px)` 覆盖层里，对 `#daily-sources` 做 very small shell pass：

- `#daily-sources .compact-source-matrix-daily-side-panel`
  - `padding: 5px -> 4px`
  - `gap: 5px -> 4px`
  - `margin-bottom: 8px -> 6px`
- `#daily-sources .compact-source-matrix-daily-side-panel .source-panel-title`
  - `margin-bottom: 3px -> 2px`

没有改：

- row 文案
- route 结构
- 组件逻辑
- 其他 section

## 验证动作

按既定串行链验证：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh `390px` remeasure

## 量化结果

fresh `390px` broad mobile heights：

- `/ = 1513`
- `/daily-latin = 1825`
- `/dashboard = 1823`
- `/dance-os = 1840`

对应量化收益：

- `/daily-latin 390`
  - `1835 -> 1825`
- `#daily-sources`
  - `168.06 -> 158.06`

其余关键 section 保持：

- `#today-loop-demo = 267.47`
- `#live-return-bridge = 153.14`
- `#daily-library = 151.53`

## 为什么这轮成立

这轮成立，因为：

1. `typecheck` 通过
2. `build` 通过
3. `route smoke` 通过
4. `browser smoke` 通过
5. fresh `390px` route 总高真实下降
6. 收益可直接归因到 panel shell 收紧，而不是测量噪音

## 结果意义

- `daily-sources` 当前仍有真实的 panel shell 收口空间
- 这轮收益明显高于上一轮的 `1px` 级收益
- `/daily-latin` 已被继续拉低到接近 `/dashboard`

## 下一步

这轮后 fresh broad mobile heights 是：

- `/daily-latin = 1825`
- `/dashboard = 1823`
- `/dance-os = 1840`

下一轮优先建议：

1. 继续留在 `/daily-latin`
2. 优先回到：
   - `#today-loop-demo = 267.47`
   - 或再次审视 `/dashboard = 1823`
3. 仍然先做 `390px` very small pass
