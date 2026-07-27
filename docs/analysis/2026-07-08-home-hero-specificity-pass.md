# 2026-07-08 Home Hero Specificity Pass

## 背景

在上一轮完成：

- desktop rail 继续薄化

之后，重新看当前桌面端首页与参考稿的差距，会发现最大的残留问题已经不再主要是：

- 结构厚度
- 或壳体系统感

而更像是：

- 首页主叙事仍然稍微偏抽象

也就是说，当前页面已经很像“一个正确的前台入口”，但离参考稿那种：

- 一看就知道“今天在练什么 / 该从哪进”

的具体性，还差一层。

## 问题定义

真正要解决的是：

**在不伪造具体练习数据的前提下，让首页 hero 更明确地回答“这条线服务谁、今天有哪些真实入口”。**

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/route-smoke.mjs`

这轮没有动：

- 样式结构
- 组件边界
- 路由壳体

说明这轮是一次明确的：

- `hero content specificity pass`

### 1. 顶部主标题改成旧站已经验证过的入口句

原先首页 शीर्ष部标题是：

- `想练拉丁舞，不知道从哪开始？`

这句没问题，但仍然偏“问题提出”。

这轮收成旧站已经验证过的更强入口句：

- `先选你今天的状态，把这一轮做完。`

这一步让首页更直接进入行动。

### 2. Hero 左侧补足“服务谁”的具体性

原先 hero 左侧更像：

- 开始 / 入口 / 清楚入口

但没有明确说清：

- 这条线主要服务谁

这轮收成：

- `给成人初学者、重拾者和有具体卡点的人`

同时把 phase note 从：

- `从这里开始 / 先做一轮`

收成更具体的三类入口：

- `重启 / 直播后 / 具体卡点`

这让首页不再只是说“开始”，而是说清今天大概从哪三种入口进。

### 3. Hero 描述回到旧站长期成立的判断逻辑

原先 hero 描述更像新站组织说明。

这轮收成更贴近旧站一直成立的判断语言：

- `不是资料库；先判断、再开始、再修一个具体问题。`
- `旧站起步页和新入口都服务这件事。`

这样主叙事更接近：

- 为什么存在这条线

而不是：

- 这套前台结构怎么组织

### 4. Hero 右侧也一起更具体

原先：

- `58% / 本周入口就绪`
- `现在先去 / Daily / Dance OS 选一条`

这轮收成更具体但仍不伪造数据的版本：

- `3条 / 今天入口`
- `现在先去 / 重启 / 直播后 / 卡点`

这样右侧也更像：

- 现在有几类真实入口

而不是：

- 一个偏内部推进的百分比仪表盘

### 5. Smoke 基线同步更新

由于首页标题变了，这轮同步更新：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/route-smoke.mjs`

把首页预期标题从：

- `想练拉丁舞，不知道从哪开始？`

改成：

- `先选你今天的状态，把这一轮做完。`

避免出现“页面已对齐、smoke 仍盯旧标题”的假失败。

## 量化结果

这轮没有动布局，但由于文案换行变化，手机端 hero 轻微变高。

基于本地 prod 预览 `http://127.0.0.1:3200` 的真实测量：

- 桌面端全页：
  - `1437`
- 手机端全页：
  - `2456`
- 桌面端 `hero`：
  - `368`
- 桌面端 `home-lower-cluster`：
  - `434.84`

- 手机端 `hero`：
  - `564.75`
- 手机端 `home-lower-cluster`：
  - `599.86`

这说明：

- 桌面端结构基本稳定
- 手机端 hero 因文案更具体略有增高
- 但整页仍明显短于前几轮

## 截图

- 当前首页桌面端：
  - `/tmp/home-after-hero-specificity-pass-desktop.png`
- 当前首页手机端：
  - `/tmp/home-after-hero-specificity-pass-mobile.png`
- 上一轮首页桌面端：
  - `/tmp/home-after-desktop-rail-pass-desktop.png`
- 上一轮首页手机端：
  - `/tmp/home-after-desktop-rail-pass-mobile.png`
- 参考首页桌面端：
  - `/tmp/reference-home-desktop.png`

## 验证

已通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- 这轮只动内容层，没有误伤组件逻辑
- `Daily Latin` / `Dance OS` / `dashboard` 交互 smoke 继续通过
- mobile home / daily 无横向 overflow

## 这轮后的判断

这轮价值很高，因为首页主叙事现在明显更接近参考稿那种：

- 不是抽象主题
- 而是清楚指向“今天从哪类入口开始”

当前首页已经更接近：

- 一个真实练习入口
- 而不是一个只讲结构的 frontdoor

## 仍然没完成的主要缺口

这轮之后首页仍未达到“近似同款完成度”。

当前更明显的剩余 gap 开始继续集中到：

1. hero / heatmap / workbench 三段之间最后一层整体完成感
2. 桌面端虽然更具体了，但和参考稿相比仍少一点“今天具体在练什么”的指向感
3. 最后几轮更像整体 polish，而不是结构修复

## 下一轮最值得继续做什么

1. 再做一次只看首页的 desktop + mobile visual audit
2. 判断最后 Top1 gap 是：
   - hero specificity 还需不需要再进一层
   - hero / heatmap spacing
   - 整页完成感 polish
3. 继续只做首页最后几轮高 ROI 微收口
