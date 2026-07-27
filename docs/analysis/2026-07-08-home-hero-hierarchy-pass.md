# 2026-07-08 Home Hero Hierarchy Pass

## 背景

在上一轮完成：

- hero theme pass

之后，首页 hero 左侧已经更像：

- 一个单日主题块

而不是：

- 入口列表

但再对照参考稿和当前截图，仍然存在一个更细的小差距：

- `TODAY` 与右侧小说明的主从关系还可以更干净
- 尤其手机端，`TODAY` 仍然略重，右侧辅助说明也仍稍抢

所以这轮继续只做首页，而且只收：

- `hero hierarchy`

## 问题定义

真正要解决的是：

**怎样在不动 hero 信息结构的前提下，把 `TODAY`、右侧辅助说明和主句之间的主从层级再拉开一点，让 hero 上半部更接近参考稿的阅读节奏。**

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

这轮没有动：

- route 结构
- 内容文案
- queue / workbench 结构

说明这轮是一次很纯粹的：

- `hero hierarchy pass`

### 1. Desktop `TODAY` 再收一层

这轮把桌面端：

- `day-row` gap
- `day-num` 字级
- `hero-phase-note` 字级、行高、宽度、顶部间距

继续压了一层。

目的不是让 hero 变小，而是让：

- `TODAY`
- `先选 / 1 条入口`

之间更接近参考稿那种：

- 大字是主题
- 右侧只是轻辅助

### 2. Mobile `TODAY` 与 phase note 同步收层级

手机端上一轮最大的残留问题之一，是：

- `TODAY` 和右侧辅助说明仍然略微抢层级

这轮同步收了 mobile breakpoint 下的：

- `day-row` gap
- `day-num`
- `hero-phase-note`

这样手机端 hero 顶部更接近：

- 一眼先读到主主题
- 再轻读辅助说明

而不是两个信息块在抢存在感

## 截图

这轮补了新的首页截图：

- 桌面端：
  - `/tmp/latinos-home-after-hero-hierarchy-pass-desktop.png`
- 手机端：
  - `/tmp/latinos-home-after-hero-hierarchy-pass-mobile.png`
- 上一轮桌面端：
  - `/tmp/latinos-home-after-hero-theme-pass-desktop.png`
- 上一轮手机端：
  - `/tmp/latinos-home-after-hero-theme-pass-mobile.png`
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
- 首页 queue 仍会随 archive 更新
- `Daily Latin` / `Dance OS` 交互 smoke 继续通过
- mobile shell 正常切换
- mobile home / daily 无横向 overflow

## 这轮后的判断

这轮虽然极小，但方向是对的：

- hero 上半部的主从关系更干净
- 手机端读起来也更像一个完成的主题块

当前首页更接近参考稿那种：

- 先看到今天主题
- 再看到辅助说明
- 再往下进入下一层

## 仍然没完成的主要缺口

这轮之后首页仍然没有达到“近似同款完成度”。

当前最后几个 gap 已进一步收敛到：

1. very small 的字级层次差距
2. very small 的块比例与留白差距
3. 整页最后一点“同一作品气质”

## 下一轮最值得继续做什么

1. 再做一次首页总体 visual audit
2. 如果还要继续收，优先：
   - very small type hierarchy pass
   - very small block proportion pass
3. 继续保持单轮只收一层，不回到结构层
