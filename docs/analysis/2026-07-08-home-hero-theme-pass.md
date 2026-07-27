# 2026-07-08 Home Hero Theme Pass

## 背景

上一轮已经做过：

- hero focus pass

但复核最新截图后，会发现首页 hero 左侧虽然更聚焦了，仍然保留一点：

- `入口列表感`
- 而不是更彻底的 `单日主题感`

参考稿在这里更像：

- 今天这一轮是什么

而不是：

- 今天有哪些入口类型

所以这轮继续只做首页，而且只收：

- `hero theme feel`

## 问题定义

真正要解决的是：

**怎样在不牺牲真实入口信息的前提下，把首页 hero 左侧从“入口分类说明”继续收成更像一个单日主题块。**

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

这轮没有动：

- route 结构
- queue 结构
- workbench 结构
- section rhythm

说明这轮是一次明确的：

- `hero theme pass`

### 1. Hero 主句从“入口列表”收成“当前主入口”

上一轮 hero 主句仍然带有更明显的多入口并列表达。

这轮收成：

- `今天：先从恰恰重启开始`

这样 hero 左侧不再首先呈现：

- 3 类入口并列

而更像：

- 当前这一轮的主入口

### 2. 其他入口退到辅助说明层

为了不丢失真实信息，这轮没有删除：

- `直播回流`
- `拍子卡点`

而是把它们退到描述层，变成：

- `直播回流和拍子卡点，也先从这 3 条入口里判断。`

这让信息仍然存在，但主从关系更清楚：

- 主句 = 当前主题
- 描述 = 其他入口仍然成立

### 3. CTA 与主主题完全对齐

这轮保留并强化：

- `先从恰恰重启开始 →`

让左侧主句和右侧 CTA 不再只是语义相关，而是：

- 完全对齐到同一个主入口

### 4. Hero 文本比例继续微调

配合新文案，这轮继续微调：

- `hero-tag`
- `hero-desc`

让它们更贴合“单主题”而不是“说明块”的节奏。

## 截图

这轮补了新的首页截图：

- 桌面端：
  - `/tmp/latinos-home-after-hero-theme-pass-desktop.png`
- 手机端：
  - `/tmp/latinos-home-after-hero-theme-pass-mobile.png`
- 上一轮桌面端：
  - `/tmp/latinos-home-after-hero-focus-pass-desktop.png`
- 上一轮手机端：
  - `/tmp/latinos-home-after-hero-focus-pass-mobile.png`
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

这轮的价值在于：

- hero 左侧终于更像“今天这一轮是什么”
- 而不再首先像“今天有哪些入口类型”

当前首页更接近参考稿那种：

- 打开就先看到今天主题

## 仍然没完成的主要缺口

这轮之后首页仍然没有达到“近似同款完成度”。

当前最后几个 gap 继续收敛到：

1. very small 的 type hierarchy 差距
2. very small 的 block proportion 差距
3. 整页最后一点“同一作品气质”

## 下一轮最值得继续做什么

1. 再做一次首页整体 visual audit
2. 如果继续收，优先：
   - very small type hierarchy pass
   - very small proportion pass
3. 继续保持单轮只收一层
