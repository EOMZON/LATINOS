# 2026-07-08 Home Workbench Open Pass

## 背景

上一轮首页已经完成了：

- `today entry` 具体化
- hero 第一入口更真实
- queue rail 语言从系统标签收回回流语气

但对照参考稿和当前真实截图后，首页最大的残留 gap 进一步收敛到：

- `workbench` 下半段在桌面端仍偏密
- `workbench` 下半段在手机端更明显偏“功能堆叠”

也就是说，当前首页已经不太缺：

- 结构
- 路由
- 方向

更缺的是：

- 下半段的开放感
- 模块区的入口卡完成感
- 手机端 workbench 的节奏

## 问题定义

真正要解决的是：

**怎样在不破坏真实回流能力的前提下，把首页 workbench 区域收成更像参考稿那种开放式入口层，而不是密集功能层。**

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/cards/home-module-card.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

这轮没有动：

- route 结构
- data schema
- smoke 逻辑本身
- hero / heatmap 主结构

说明这轮是一次明确的：

- `home workbench openness pass`

### 1. Module cards 从“标题 + 长说明”收成“标题 + 两行入口短句”

原先 `HomeModuleCard` 用的是：

- 把两条 rows 合并成一段 summary
- 再额外展示一条 prose note

结果是：

- 卡片更像微型说明文档
- 尤其在首页下半段，会把 workbench 拉回更功能板的感觉

这轮改成：

- 第一条 row 作为 `summary`
- 第二条 row 作为 `detail`

也就是：

- 标题
- 一条入口/状态短句
- 一条动作/去向短句

这让模块卡更接近参考稿那种：

- 一眼可扫
- 像入口卡
- 不是解释块

### 2. Desktop module cards 继续拉开呼吸感

配合组件结构变化，这轮把桌面端 module cards 继续往“更开放”方向收：

- `min-height` 略增
- padding 略增
- 标题与正文间距再拉开
- summary 字号和行高略提高
- detail 改成更轻的第二行，而不是冗长 prose note

这一步不是为了让卡片更厚，而是为了让它们：

- 内容更少
- 读感更松
- 完成感更像参考稿里的入口组

### 3. Mobile queue rail 再薄化一层

对照参考稿手机端，当前最明显的问题不是 hero，而是：

- workbench 开头那条 queue rail 仍然太像完整功能列表

这轮在首页 mobile workbench 内做了更激进但仍安全的收口：

- 保留 `LATEST`
- 保留 `Daily / Dance OS` pills
- 隐藏 mobile 下的 `daily` 与 `dance` 两条 queue items

这样手机端仍然保留：

- 最新回流入口
- 去 Daily / Dance OS 的跳转 pills

但不再把 queue 本身展开成一大块三段式功能区。

这让 mobile workbench 更接近参考稿那种：

- 先给一个回流入口
- 然后马上进入模块入口层

### 4. Mobile module cards 改成更像入口卡

在 mobile breakpoint 里，这轮同步把 module cards 收成：

- 稍大一点的标题
- 更清楚的两行短句
- 更稳的最小高度

这样手机端不再是：

- 六个很密的文字格子

而更像：

- 六个更可扫的入口卡

## 截图

这轮补了新的首页截图：

- 桌面端：
  - `/tmp/latinos-home-after-workbench-open-pass-desktop.png`
- 手机端：
  - `/tmp/latinos-home-after-workbench-open-pass-mobile.png`
- 上一轮桌面端：
  - `/tmp/latinos-home-after-today-entry-pass-desktop.png`
- 上一轮手机端：
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

- 首页 hero 正常可见
- 首页 next-session queue 仍会随 archive 更新
- `Daily Latin` / `Dance OS` 交互 smoke 继续通过
- mobile shell 正常切换
- mobile home / daily 无横向 overflow

## 这轮后的判断

这轮价值非常高，因为当前首页最像“功能板”的一块，终于明显往参考稿的开放入口层推进了一层。

尤其在手机端，这轮收益更明显：

- queue 不再拖成长块
- module 区不再像很密的文字表
- 整个 workbench 更接近“先给入口，再给模块”的节奏

## 仍然没完成的主要缺口

这轮之后首页仍然没有达到“近似同款完成度”。

当前更可能的最后几类 gap 是：

1. hero / heatmap / workbench 三段的整体完成感仍可继续 polish
2. 桌面端 workbench 虽然更开了，但与参考稿相比还差最后一层“单日作品感”
3. 首页顶部 narrative 与底部入口层之间，仍有微小但真实的节奏差距

## 下一轮最值得继续做什么

1. 继续只看首页做一次 desktop + mobile visual audit
2. 判断最后的 Top1 gap 是否已转回：
   - section spacing
   - 细节字级层次
   - hero / lower 整体完成感
3. 继续优先共享层与内容层，不回到大范围页级改造
