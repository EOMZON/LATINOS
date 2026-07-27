# 2026-07-08 Home Service Promise Pass

## 背景

在前面几轮里，首页已经连续完成了：

- 壳体去系统感
- workbench rail 薄化
- mobile density 收口

这时再看桌面端首页与参考稿的差距，最大残留问题已经不再是：

- 页面太厚
- 结构太散

而更像是：

- 首页主叙事还不够“具体地指向今天从哪开始”

也就是说，结构已经很接近参考稿，但主叙事 still slightly 偏：

- 正确的入口说明

而不是：

- 一个真实的、今天就能进入的练习入口

## 问题定义

真正要解决的是：

**怎样在不伪造具体训练数据的前提下，把首页 hero 收成更像旧站已经验证过的服务承诺和真实入口动作。**

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/route-smoke.mjs`

### 1. 顶部主标题直接回到旧站已验证过的 service promise

原先：

- `想练拉丁舞，不知道从哪开始？`

它是一个正确的问题，但仍然只是“提出问题”。

这轮直接收成：

- `给成人初学者、重拾者和有具体卡点的人：先选你今天的状态，把这一轮做完。`

这句的价值在于：

- 先说清服务谁
- 再说清今天怎么做

它更像一个已经被验证过的入口 promise，而不是一个概念标题。

### 2. Hero 左侧从“抽象开始”收成“今天三类入口”

原先 phase note：

- `重启 / 直播后 / 具体卡点`

这轮把它进一步收成入口动作句：

- `今天先选 / 1 条入口`

同时把 hero tag 收成更直接的分类：

- `今天：重启 / 直播后 / 具体卡点`

这使得首页一打开就能感受到：

- 今天不是来理解系统
- 而是先判断自己落在哪一类入口

### 3. Hero 描述继续回到旧站长期成立的判断逻辑

这轮保留并强化：

- `不是资料库；先判断、再开始、再修一个具体问题。`
- `旧站起步页和新入口都服务这件事。`

这让首页核心叙事更接近：

- 为什么这条线存在

而不是：

- 为什么这个 frontdoor 要这样组织

### 4. Hero 右侧 CTA 从泛入口改成真实 restart entry

原先：

- CTA 指向 `/daily-latin`
- 文案为：
  - `先做 Daily 一轮 →`

这轮把它直接落到真实 restart path：

- `/daily-latin?state=restart&dance=cha#today-loop-demo`

并把文案改成：

- `先从重启开始 →`

这意味着首页 CTA 不再只是“去 Daily”，而是：

- 直接送进一个真实、已存在、可执行的第一轮入口

### 5. Hero 右侧状态也更具体

原先：

- `现在先去 / 重启 / 直播后 / 卡点`

这轮继续收成：

- `现在先去 / 先从重启开始`

同时将 ring 内容从：

- `58% / 本周入口就绪`

改为更入口化的：

- `3条 / 今天入口`

这样右侧不再像内部进度环，而更像：

- 今天有几种真实可进入的入口

### 6. Smoke 基线同步更新

由于首页标题改成了新的 service promise，这轮同步更新：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/route-smoke.mjs`

把首页 route title 检查改成新文案，避免假失败。

## 量化结果

这轮没有改布局，但文案换行让桌面端 page height 轻微变化。

基于本地 prod 预览 `http://127.0.0.1:3200` 的真实测量：

- 桌面端全页：
  - `1455`
- 手机端全页：
  - `2456`
- 桌面端 `hero`：
  - `368`
- 桌面端 `home-lower-cluster`：
  - `434.84`

- 手机端 `hero`：
  - `547.36`
- 手机端 `home-lower-cluster`：
  - `599.86`

这说明：

- 结构没有被破坏
- desktop 基本稳定
- mobile 也仍保持在当前已明显压短的区间

## 截图

- 当前首页桌面端：
  - `/tmp/home-after-service-promise-pass-desktop.png`
- 当前首页手机端：
  - `/tmp/home-after-service-promise-pass-mobile.png`
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

- 首页 CTA 现在直接落到真实 restart path
- 既有 `Daily Latin` / `Dance OS` / `dashboard` 交互 smoke 未回退
- mobile home / daily 无横向 overflow

## 这轮后的判断

这轮价值很高，因为首页 hero 终于更明显地像：

- 一个真实练习入口
- 一个服务承诺
- 而不是只是“正确地讲结构”

当前首页已经更接近参考稿那种：

- 打开后就能理解这条线在干什么
- 并且知道今天先从哪类入口进

## 仍然没完成的主要缺口

这轮之后首页仍未达到“近似同款完成度”。

当前更明显的剩余 gap 开始继续集中到：

1. hero / heatmap / workbench 三段之间最后一层整体完成感
2. 首页虽然更具体了，但仍没有参考稿那种“今天具体练的是什么动作”的现场感
3. 最后几轮已经更像整体 polish，而不是结构或信息架构修复

## 下一轮最值得继续做什么

1. 再做一次只看首页的 desktop + mobile visual audit
2. 判断最后的 Top1 gap 是否是：
   - hero 现场感
   - hero / heatmap spacing
   - 整页完成感微收口
3. 继续只做首页最后几轮高 ROI polish
