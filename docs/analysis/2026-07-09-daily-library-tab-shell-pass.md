# Daily Library Tab Shell Pass

## 背景

在上一轮 `Dance BodyMap Compact Copy Pass` 成立之后，fresh `390px` broad mobile heights 是：

- `/ = 1513`
- `/daily-latin = 1841`
- `/dashboard = 1823`
- `/dance-os = 1840`

这意味着当轮 broad mobile Top1 是：

- `/daily-latin = 1841`

继续拆 `/daily-latin` 后，当前 section 高度是：

- `#today-loop-demo = 268.50`
- `#daily-sources = 168.06`
- `#live-return-bridge = 153.14`
- `#daily-library = 156.19`

虽然 `#today-loop-demo` 仍然最大，但从默认空态和 very small pass 的角度看，`#daily-library` 是更稳的收口对象。

## 为什么这轮选 `#daily-library`

对 `#daily-library` 的当前 compact 状态拆解显示：

- `section = 156.19`
- `tabs = 30`
- `grid = 94`
- 单张 `compact-move-card = 46`

同时：

- compact 场景下已经没有 library panel
- 剩余主要是：
  - `section head`
  - tab 行
  - 三列 move card grid

继续拆 tab 行后确认：

- `#daily-library .compact-tabs = 30`
- `#daily-library .compact-tabs .tab = 26`
- 当前命中的最终 `390px` 覆盖层仍然是：
  - `gap: 4px`
  - `margin-bottom: 8px`
  - `font-size: 10px`
  - `padding: 4px 9px`

因此这轮最高 ROI 不是去改卡片内容，而是继续只收 tab shell。

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 改动策略

只在最终命中的 `@media (min-width:390px) and (max-width:430px)` 覆盖层里，对 `#daily-library` 做 very small pass：

- `.compact-tabs`
  - `gap: 4px -> 3px`
  - `margin-bottom: 8px -> 6px`
- `.compact-tabs .tab`
  - `font-size: 10px -> 9.6px`
  - `padding: 4px 9px -> 3px 8px`

没有改：

- route 结构
- move card 内容
- tab 数据
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
- `/daily-latin = 1836`
- `/dashboard = 1823`
- `/dance-os = 1840`

对应量化收益：

- `/daily-latin 390`
  - `1841 -> 1836`
- `#daily-library`
  - `156.19 -> 151.53`

其余关键 section 保持：

- `#today-loop-demo = 268.50`
- `#daily-sources = 168.06`
- `#live-return-bridge = 153.14`

## 为什么这轮成立

这轮成立，因为：

1. `typecheck` 通过
2. `build` 通过
3. `route smoke` 通过
4. `browser smoke` 通过
5. fresh `390px` route 总高真实下降
6. 收益可直接归因到 tab shell 收紧，而不是测量噪音

## 结果意义

- `daily-library` 当前仍然有少量但真实的 tab shell 收口空间
- 这轮收益来自：
  - tab gap 缩小
  - tab padding 缩小
  - tab 行 margin-bottom 缩小
- `/daily-latin` 仍然是 broad mobile Top1，但已经继续被拉低

## 下一步

这轮后 fresh broad mobile heights 是：

- `/daily-latin = 1836`
- `/dance-os = 1840`

下一轮优先建议：

1. 继续留在 `/daily-latin`
2. 优先回到：
   - `#today-loop-demo = 268.50`
   - 或 `#daily-sources = 168.06`
3. 仍然先做 `390px` very small pass
