# 2026-07-08 Home Hero Subject Pass

## 背景

在上一轮完成：

- hero hierarchy pass

之后，首页 hero 上半部的主从关系已经更干净了。

但继续对照参考稿与当前截图，会发现还剩一个更细的差距：

- 主句虽然已经不是入口列表
- 但还更像一句操作提示

而参考稿在这里更像：

- 今天这一轮的主题标题

所以这轮继续只做首页，而且只收：

- `hero subject feel`

## 问题定义

真正要解决的是：

**怎样在不丢掉真实入口信息的前提下，把首页 hero 左侧主句从“操作提示”继续收成更像单日主题标题。**

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`

这轮没有动：

- route 结构
- 组件结构
- hero 样式
- queue / workbench

说明这轮是一次明确的：

- `hero subject pass`

### 1. 主句从 CTA 语气收成主题语气

原先 hero 主句更接近：

- `先从恰恰重启开始`

这很直接，但也更像 CTA。

这轮收成：

- `今天：恰恰重启（Restart Loop）`

这样首页 hero 左侧更像：

- 今天这一轮的主题

而右侧按钮仍然承担：

- 去执行这个入口

### 2. 描述也同步从“判断入口”收成“补充说明”

这轮把描述继续收成：

- 直播回流和拍子卡点，也先从这 3 条入口里判断
- 今天先把这一轮做完

这样主句是主题，描述只是补充说明，不再和主句抢角色。

## 截图

这轮补了新的首页截图：

- 桌面端：
  - `/tmp/latinos-home-after-hero-subject-pass-desktop.png`
- 手机端：
  - `/tmp/latinos-home-after-hero-subject-pass-mobile.png`
- 上一轮桌面端：
  - `/tmp/latinos-home-after-hero-hierarchy-pass-desktop.png`
- 上一轮手机端：
  - `/tmp/latinos-home-after-hero-hierarchy-pass-mobile.png`
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

这轮虽然只动了一句主句和一小段描述，但收益很明确：

- hero 左侧终于更像单日主题标题
- 右侧 CTA 继续负责动作

当前首页更接近参考稿那种：

- 标题是主题
- 按钮是动作

## 仍然没完成的主要缺口

这轮之后首页仍然没有达到“近似同款完成度”。

当前最后几个 gap 已继续收敛到：

1. very small 的字级层次差距
2. very small 的块比例与留白差距
3. 整页最后一点“同一作品气质”

## 下一轮最值得继续做什么

1. 再做一次首页总体 visual audit
2. 如果继续收，优先：
   - very small type hierarchy pass
   - very small proportion pass
3. 继续保持单轮只收一层
