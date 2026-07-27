# 2026-07-08 Home Copy Quiet Pass

## 背景

在上一轮完成：

- rhythm / footer pass

之后，首页和参考稿的差距已经越来越不像：

- 布局没搭对
- 模块太厚
- 结构还没理顺

而更像：

- 页面上还残留一点解释味
- 辅助说明还略微偏“说明型”
- 还差最后一点安静的成品感

也就是说，当前首页更适合做的不是：

- 再改结构
- 再改节奏

而是：

- `copy quieting`

## 问题定义

真正要解决的是：

**怎样在不减少真实内容信息量的前提下，把首页几个还偏解释型的短句收得更克制，让页面更像参考稿那种安静的成品工作台。**

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/page.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

这轮没有动：

- route 结构
- queue 逻辑
- cards 结构
- layout 节奏

说明这轮是一次明确的：

- `home quieting pass`

### 1. 首页辅助说明继续去解释味

`工作台` 的辅助说明从：

- `回到最近一轮，再进入口`

继续收成更短的提示语气，而不是像功能说明句。

### 2. Heatmap 的辅助文字收短

这轮把 heatmap 的：

- `more`
- `note`

都收成更短、更静的表述。

目的不是减少信息，而是：

- 不让这一块像在解释规则
- 更像成品页上的轻说明

### 3. Hero 描述继续压缩解释感

hero 描述从：

- 先解释首页给什么入口
- 再解释怎么做

收成更像：

- 从 3 条真实入口里选一条
- 先判断，再开始，再修一个具体问题

也就是说，这轮让 hero 左侧更少“说明 frontdoor 如何组织”的感觉，而更像：

- 当前这件事本身

### 4. Footer 再安静一层

footer 左侧和右侧都继续压短：

- 左侧只留下入口主题
- 右侧只留下 3 个主去向名

并在样式层继续降低：

- `compact-sec-head .more`
- `compact-home-footer`

的存在感。

这让页尾更像：

- 低声收尾

而不是：

- 再讲一遍页面结构

## 截图

这轮补了新的首页截图：

- 桌面端：
  - `/tmp/latinos-home-after-copy-quiet-pass-desktop.png`
- 手机端：
  - `/tmp/latinos-home-after-copy-quiet-pass-mobile.png`
- 上一轮桌面端：
  - `/tmp/latinos-home-after-rhythm-footer-pass-desktop.png`
- 上一轮手机端：
  - `/tmp/latinos-home-after-rhythm-footer-pass-mobile.png`
- 参考桌面端：
  - `/tmp/reference-home-desktop.png`

## 验证

已通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- 首页 hero 正常可见
- 首页 queue 仍会随 archive 更新
- `Daily Latin` / `Dance OS` 交互 smoke 继续通过
- mobile shell 正常切换
- mobile home / daily 无横向 overflow

## 这轮后的判断

这轮不是大变化，但方向很对。

当前首页更明显地往参考稿那种：

- 少解释
- 少系统说明
- 更安静
- 更像成品

的方向推进了一层。

## 仍然没完成的主要缺口

这轮之后首页仍然没有达到“近似同款完成度”。

当前最后几个 gap 已经继续收敛到：

1. very small 的字级层次差距
2. 个别块之间最后一点比例差
3. 顶部 narrative 和下半段入口层之间的最后一点作品一致性

## 下一轮最值得继续做什么

1. 再做一次首页整体 visual audit
2. 如果继续收，优先：
   - very small type hierarchy pass
   - very small block proportion pass
3. 保持每轮只收一层，不重新打开结构层
