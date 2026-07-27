# Daily Live Return Compact Label Pass

## 背景

在当前 fresh `390px` broad mobile baseline 下：

- `/ = 1513`
- `/daily-latin = 1857`
- `/dashboard = 1823`
- `/dance-os = 1851`

这意味着当轮 broad mobile Top1 是：

- `/daily-latin = 1857`

继续拆 `/daily-latin` 后，当前 section 高度是：

- `#today-loop-demo = 268.50`
- `#live-return-bridge = 169.14`
- `#daily-sources = 168.06`
- `#daily-library = 156.19`

这轮没有直接回去碰 `#today-loop-demo`，而是先复核 `#live-return-bridge` 的默认空态，因为 broad sweep 使用的是干净浏览器状态，默认不会带已有 witness。

## 为什么这轮选 `#live-return-bridge`

对默认空态的内部拆解显示：

- `#live-return-bridge = 169.14`
- 左侧 `mode panel = 144.95`
- 右侧 empty queue panel = `81.27`

进一步看左侧三张 compact mode card：

- 每张 `.daily-return-mode-card = 85.34`
- 顶部 `.archive-label` 高度都是 `32`
- 说明：
  - `LIVE RETURN`
  - `CLIP BRIDGE`
  - `DANCE BRIDGE`

在当前窄列宽度里都发生了两行换行。

因此这轮最高 ROI 不是继续压壳体 padding，而是做一个更低风险的 compact copy pass：

- 保持结构不变
- 保持交互不变
- 只把 compact 场景顶部 label 压短到单行

## 改动文件

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/daily-return-board.tsx`

## 改动策略

这轮只做了数据层与读取逻辑的 very small pass。

### 1. 给 `dailyReturnModeSeeds` 增加 compact label

新增：

- `LIVE RETURN -> LIVE`
- `CLIP BRIDGE -> CLIP`
- `DANCE BRIDGE -> BRIDGE`

### 2. compact 场景优先读取 `compactLabel`

在 `DailyReturnBoard` 的 `buildReturnModes(...)` 中：

- `compact` 时优先使用 `seed.compactLabel`
- 非 `compact` 时仍保持原始 label

所以：

- 桌面与正常展示不变
- 只影响 `390px` 下 compact mode card 顶部的 mono label

## 验证动作

按既定串行链 fresh 验证：

1. `pnpm typecheck`
2. `pnpm build`
3. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
6. fresh `390px` remeasure

## 量化结果

fresh `390px` broad mobile heights：

- `/ = 1513`
- `/daily-latin = 1841`
- `/dashboard = 1823`
- `/dance-os = 1851`

对应量化收益：

- `/daily-latin 390`
  - `1857 -> 1841`
- `#live-return-bridge`
  - `169.14 -> 153.14`

进一步复核 compact mode card：

- 单张 `.daily-return-mode-card`
  - `85.34 -> 69.34`
- 顶部 label 高度
  - `32 -> 16`
- 最终 label 文案
  - `LIVE`
  - `CLIP`
  - `BRIDGE`

其余关键 section 保持：

- `#today-loop-demo = 268.50`
- `#daily-sources = 168.06`
- `#daily-library = 156.19`

## 为什么这轮成立

这轮成立，因为：

1. `typecheck` 通过
2. `build` 通过
3. `route smoke` 通过
4. `browser smoke` 通过
5. fresh `390px` route 总高真实下降
6. 收益来源可被明确归因到 compact label 单行化，而不是测量噪音

## 结果意义

- `live-return-bridge` 的默认空态仍有明确的 compact copy 收口空间
- 这轮收益来自：
  - 顶部 mono label 换行消失
  - mode card shell 高度随之下降
- 不需要再碰结构层，就拿到了真实 route-level 降高

## 下一步

这轮后 fresh broad mobile Top1 切到：

- `/dance-os = 1851`

所以下一轮优先建议：

1. 回到 `/dance-os`
2. 优先继续看：
   - `#correction-ledger-demo = 394.08`
   - `#dance-assets = 312.56`
   - `#body-map-practice-queue = 309.14`
3. 仍然先做 `390px` very small pass
