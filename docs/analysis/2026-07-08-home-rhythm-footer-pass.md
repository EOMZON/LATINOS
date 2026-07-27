# 2026-07-08 Home Rhythm Footer Pass

## 背景

在前面几轮里，首页已经连续完成了：

- hero 入口具体化
- workbench openness 收口
- desktop queue strip 收口

这时再看当前首页和参考稿的差距，会发现它已经不太像“结构问题”了。

当前更像还差：

- section 之间最后一层节奏
- 页尾最后一层收口
- 整页的“单件作品完成感”

并且这轮前的量化也说明：

- 桌面端总高已经基本贴近参考稿

所以这轮不再追求：

- 再加更多内容
- 再改模块结构
- 再做新的大布局

而是集中做一次：

- `section rhythm + footer quiet pass`

## 问题定义

真正要解决的是：

**怎样在不改坏现有结构与验证链的前提下，把首页的顶部、heatmap、workbench 和 footer 之间的最后一层节奏收口得更像同一件作品。**

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/page.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

这轮没有动：

- route 结构
- queue 逻辑
- module 结构
- smoke 逻辑

说明这轮是一次明确的：

- `home rhythm/footer polish pass`

### 1. Workbench header 文案再收短

`工作台` 右侧说明从：

- `先回到最近一轮，再进对应页面`

收成：

- `先回到最近一轮，再进对应入口`

这一步很小，但作用明确：

- 减少“页面层”解释感
- 更像首页入口层

### 2. Footer copy 继续压成更短的收口句

footer 左侧从：

- `先从恰恰重启、直播回流或拍子卡点里选一条。`

收成：

- `恰恰重启 / 直播回流 / 拍子卡点，先选一条。`

这让页尾不再像再解释一次首页逻辑，而更像：

- 对整页入口主题的静态收束

### 3. 顶部与 section 的垂直节奏再静一点

这轮在共享样式层里做了小幅 rhythm 收口：

- `.main` 底部 padding：
  - `96 -> 88`
- `.topline-home`：
  - `38 -> 34`
- `.hero` margin-bottom：
  - `42 -> 40`
- `.home-heatmap-section` margin-bottom：
  - `32 -> 30`
- `.home-lower-cluster` margin-bottom：
  - `22 -> 18`
- `.compact-home-footer`：
  - padding-top 更轻
  - 字级更轻

这里不是为了“变短”，而是为了：

- 减少页面收尾的松散感
- 让 footer 更像静的终点
- 让整页更像一条连续完成的叙事带

## 截图

这轮补了新的首页截图：

- 桌面端：
  - `/tmp/latinos-home-after-rhythm-footer-pass-desktop.png`
- 手机端：
  - `/tmp/latinos-home-after-rhythm-footer-pass-mobile.png`
- 上一轮桌面端：
  - `/tmp/latinos-home-after-desktop-queue-strip-pass-desktop.png`
- 上一轮手机端：
  - `/tmp/latinos-home-after-desktop-queue-strip-pass-mobile.png`
- 参考桌面端：
  - `/tmp/reference-home-desktop.png`

## 验证

已通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- 首页 hero 正常可见
- 首页 queue 仍会随着 archive 更新
- `Daily Latin` / `Dance OS` 交互 smoke 继续通过
- mobile shell 正常切换
- mobile home / daily 无横向 overflow

## 这轮后的判断

这轮是典型的小改动、大收口。

它没有带来新的结构变化，但把首页继续推向：

- 更少解释感
- 更安静的页尾
- 更完整的一体化作品感

尤其在桌面端，这轮价值在于：

- 当前页面不再继续像“很多区块串起来”
- 而更像一件被做完的 workbench 作品

## 仍然没完成的主要缺口

这轮之后首页仍然没有达到“近似同款完成度”。

当前最后几个残留 gap 继续收敛到：

1. hero / heatmap / workbench 三段之间最后一层整体完成感
2. 顶部 narrative 与下半段入口层之间的最后一点作品一致性
3. 个别字级、留白和块间比例的 very small polish

## 下一轮最值得继续做什么

1. 再做一次首页 desktop + mobile 总体 visual audit
2. 如果还要继续收，优先做：
   - very small spacing pass
   - very small type hierarchy pass
3. 继续避免大改，保持“每轮只收一层”的节奏
