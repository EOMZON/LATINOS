# 2026-07-08 Home Hero Focus Pass

## 背景

在上一轮完成：

- copy quiet pass

之后，首页整体已经明显更安静了。

但再和参考稿对照，会发现还有一个更具体的小差距：

- hero 左侧仍然稍微偏“说明型”
- 还不够像一个单日主题句

参考稿在这一块更像：

- `今天是什么`
- `这一轮干什么`

而不是：

- 首页在解释自己给了哪几类入口

所以这轮不再继续收整页，而是只抓：

- `hero single-day focus`

## 问题定义

真正要解决的是：

**怎样在不丢失真实入口信息的前提下，把首页 hero 左侧收得更像一个单日主题，而不是一段结构说明。**

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

这轮没有动：

- route 结构
- queue 结构
- section rhythm
- footer 结构

说明这轮是一次明确的：

- `hero focus pass`

### 1. Hero phase note 再压短

`phaseNote` 从：

- `今天先选 / 1 条入口`

收成：

- `先选 / 1 条入口`

这样它更像辅助提示，而不是再重复解释首页任务。

### 2. Hero 主句从“三段并列说明”收成更像单日主题

`tag` 从：

- 带更强分段感的写法

收成：

- `今天：恰恰重启 · 直播回流 · 拍子卡点`

这样桌面端更接近：

- 一条单日主题句

而不是：

- 视觉上分成 3 段列表

### 3. Hero 描述继续收成动作句

描述从更解释型的：

- 先说明首页有 3 条真实入口

收成：

- `先从 3 条真实入口里选一条。`
- `先判断，再开始，再修一个具体问题。`

这一步让 hero 左侧更少“介绍 frontdoor”的味道，更像：

- 今天这件事本身

### 4. Hero CTA 同步更具体

CTA 从：

- `先从重启开始 →`

收成：

- `先从恰恰重启开始 →`

这样右侧 CTA 与左侧主句更一致，也让首页更像：

- 当前已经锁定的具体入口

### 5. Hero 文本比例再做一层小收口

配合文案变化，这轮在共享样式层继续微调：

- `hero-phase-note` 字级与最大宽度
- `hero-tag` 字级、行高、最大宽度
- `hero-desc` 行高、宽度与顶部间距

目的不是让 hero 变小，而是让它：

- 更聚焦
- 更像单个主题块
- 更少被拆成多段说明

## 截图

这轮补了新的首页截图：

- 桌面端：
  - `/tmp/latinos-home-after-hero-focus-pass-desktop.png`
- 手机端：
  - `/tmp/latinos-home-after-hero-focus-pass-mobile.png`
- 上一轮桌面端：
  - `/tmp/latinos-home-after-copy-quiet-pass-desktop.png`
- 上一轮手机端：
  - `/tmp/latinos-home-after-copy-quiet-pass-mobile.png`
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

这轮虽然只动了 hero 左侧，但收益很明确：

- 首页更像一个单日主题页
- 不再那么像在解释自己有哪些入口类型

尤其在桌面端，这轮让首页更接近参考稿那种：

- 打开就看到今天这一轮是什么

## 仍然没完成的主要缺口

这轮之后首页仍然没有达到“近似同款完成度”。

当前最后几个 gap 已继续收敛到：

1. very small 的 type hierarchy 差距
2. hero / heatmap / workbench 之间最后一点比例感
3. 桌面端与参考稿之间最后一点“同一作品气质”差距

## 下一轮最值得继续做什么

1. 再做一次首页总体 visual audit
2. 如果继续收，优先：
   - very small type hierarchy pass
   - very small proportion pass
3. 继续避免重开结构层
