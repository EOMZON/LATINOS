# 2026-07-08 Home Today Entry Pass

## 背景

在前面几轮里，首页已经连续完成了：

- hero 比例收口
- heatmap 壳体收口
- queue rail 薄化
- mobile density 收口

这时再看首页与参考稿的差距，最大问题已经不再是：

- 太厚
- 太散
- 壳体完全不对

而更像是：

- 首页虽然已经像 workbench
- 但“今天具体从哪条真实入口进去”的感觉还不够强

也就是说，当前主要缺口开始从结构问题，转向：

- `today-specific immediacy`
- `workbench copy completion`

## 问题定义

真正要解决的是：

**在不伪造训练数据的前提下，让首页 hero、queue、module cards 更明确地对齐当前已经真实存在的入口路径，而不是停留在泛化的入口说明。**

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/next-session-queue.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/structure-smoke.mjs`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/browser-smoke.py`

这轮没有动：

- 路由结构
- 组件分层
- 首页大布局
- 共享样式 tokens

说明这轮是一次很明确的：

- `home entry specificity + workbench copy polish pass`

### 1. Hero 从“泛入口分类”收成“真实入口类型”

`homeHero.tag` 从：

- `今天：重启 / 直播后 / 具体卡点`

收成：

- `今天：恰恰重启 / 直播回流 / 拍子卡点`

这一步的价值在于：

- 不是只说入口类别
- 而是直接贴到当前真实存在的 fallback routes 与 demo path

同时 `description` 也从更抽象的入口说明，收成：

- 首页先给 3 条真实入口
- 然后再回到旧站已验证过的判断逻辑：
  - 先判断
  - 再开始
  - 再修一个具体问题

### 2. Hero CTA 与 session 更明确对齐当前真实入口

`sessionValue` 从：

- `先从重启开始`

收成：

- `先从恰恰重启开始`

这样 hero 右侧不再只是“去某类入口”，而更像：

- 今天真实先从哪一条入口进去

### 3. Queue fallback 直接贴到真实首页工作流

这轮把首页 fallback queue items 从更像解释的写法，收成更贴 route 的入口短句：

- `恰恰 · 断练后重启`
- `伦巴 · 刚看完直播`
- `伦巴 · 拍子卡点`

同时 context 也收成更贴当前系统的短标签：

- `Daily Loop · restart`
- `Daily Return · live`
- `Dance OS · correction`

这让首页在没有真实 archive 数据时，仍然更像：

- 当前就可以直接点进去的入口板

而不是：

- 模板化的回流示意

### 4. Queue rail 语言收成更像“刚做完这一轮后的回流条”

`NextSessionQueue` 的 rail heading 从：

- `最近 witness → 下一轮`

收成：

- `刚留下的 witness → 下一轮`

同时右侧小标签从：

- `overall / return`

收成：

- `刚完成 / 回流`

这样首页下半段的语气更像：

- 刚练完之后继续回来的入口

而不是：

- 系统内部标签

### 5. Module cards 的文案继续压成入口动作

这轮没有改 module grid 结构，而是继续压内容层：

- `旧站 Proof` 更明确成已上线 proof 的入口判断作用
- `Daily Latin` 更明确成“今天这轮做完”
- `Dance OS` 更明确成“把卡点压成下一步”
- `路线图` 更明确成“入口先站稳 / 旧域名先不急着切”
- `状态看板` 更明确成“先看现在跑到哪”

这让首页下半段更接近参考稿那种：

- 是入口台
- 不是说明墙

### 6. Smoke 基线同步更新

由于首页 rail 文案发生真实变化，这轮同步更新：

- `structure-smoke.mjs`
- `browser-smoke.py`

把首页 rail 的检查从：

- `最近 witness`

改成：

- `刚留下的 witness`

避免出现：

- 页面已经按新文案成立
- smoke 仍然盯着旧文本误报失败

## 截图

这轮补了当前首页真实渲染截图：

- 桌面端：
  - `/tmp/latinos-home-after-today-entry-pass-desktop.png`
- 手机端：
  - `/tmp/latinos-home-after-today-entry-pass-mobile.png`
- 参考桌面端：
  - `/tmp/reference-home-desktop.png`
- 参考手机端：
  - `/tmp/reference-home-mobile.png`

## 验证

已通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- 首页 hero 可见
- 首页 next-session rail 可见且文案已更新
- `Daily Latin` / `Dance OS` 交互 smoke 继续通过
- mobile shell 正常切换
- mobile home / daily 无横向 overflow

## 这轮后的判断

这轮价值很高，因为首页现在比上一轮更像：

- 今天就能进的一组真实入口
- 而不是对“入口类型”的抽象说明

尤其在：

- hero 左侧具体性
- hero 右侧 first action
- queue rail 的回流语气
- module cards 的入口动作感

这四个点上，已经更接近参考稿那种：

- 打开就知道今天从哪条入口开始

## 仍然没完成的主要缺口

这轮之后首页仍然没有达到“近似同款完成度”。

当前更可能的剩余 gap 是：

1. 首页虽然更具体了，但和参考稿相比仍少一点“单日作品完成感”
2. workbench modules 虽然已更轻，但还可以再看：
   - 标题密度
   - 文案厚度
   - 空白与留气
3. hero / heatmap / workbench 三段的最终整体完成感还可以继续 polish

## 下一轮最值得继续做什么

1. 继续只看首页，重新做一次 desktop + mobile visual audit
2. 判断下一轮 Top1 gap 是否已经从“内容具体性”转回：
   - 模块区的最后一层留白与比例
   - hero / heatmap / workbench 的整体完成感
3. 继续优先改共享层或内容层，不回到大规模页级改造
