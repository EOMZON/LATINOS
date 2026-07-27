# 2026-07-08 Home Today Realness Pass

## 背景

在前几轮 `hero ratio / hierarchy / micro` 收口之后，首页已经不再有明显结构问题。

但和参考稿相比，还留着一层更细的差距：

- 样式已经很近
- 结构也已经稳定
- 但首页上半屏还少一点“今天到底先练什么”的现场感

也就是说，当前最大的缺口不再是布局错，而是：

**首页 hero 与 workbench rail 还略偏“系统说明”，不够像一个已经进入今天这一轮的真实工作台。**

参考锁定仍然是：

- `/Users/zon/Downloads/latin-workbench (2).html`

## 问题定义

这一轮不做新的结构改造。

只判断一件事：

**是否可以只通过首页内容层与轻量共享入口文案的收口，让首页更具体、更像“今天这一轮已经开始”，同时不破坏已经稳定的桌面端 / 手机端比例。**

## 这轮动作

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/page.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/next-session-queue.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/route-smoke.mjs`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/structure-smoke.mjs`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/browser-smoke.py`

### 1. 首页 hero 文案从“入口说明”压成“今天先做什么”

动作：

- `eyebrow`
  - 从：
    - `给成人初学者、重拾者和有具体卡点的人`
  - 收到：
    - `给成人初学者、重拾者和有卡点的人`
- `title`
  - 从：
    - `先选你今天的状态，把这一轮做完。`
  - 收到：
    - `先选今天的状态，把这一轮做完。`
- `phaseNote`
  - 从：
    - `先选 1 条入口`
  - 收到：
    - `先做 1 条入口`
- `tag`
  - 从：
    - `今天：恰恰重启（Restart Loop）`
  - 收到：
    - `今天先做：恰恰重启 1 轮`
- `description`
  - 改成更具体的动作判断：
    - `先把恰恰的脚下边界做清楚。`
    - `直播回流或拍子卡点，也先回到这一轮。`
- 右卡 session copy 也从“现在先去”改成更具体的：
  - `这一轮先守住`
  - `恰恰脚下边界，不急着加快`
- CTA 改成：
  - `先去做恰恰这一轮 →`

意义：

- 首页不再只是说“你可以选入口”
- 而是更像一个已经明确告诉你“今天先做哪一轮、先守住什么”的工作台入口

### 2. 首页 workbench header 与 queue rail 去系统味

动作：

- 首页 `工作台` 说明从：
  - `回到最近一轮，再进入口`
- 收到：
  - `先回到刚做完的一轮，再进入口`
- `NextSessionQueue` rail title 从：
  - `刚留下的 witness → 下一轮`
- 收到：
  - `刚做完的一轮 → 下一轮`

意义：

- 这轮不是否定 witness 结构
- 而是让首页 copy 更接近日常练习动作语言，而不是内部系统词

### 3. 同步更新 smoke 基线

动作：

- `route-smoke`
  - 更新首页标题匹配
- `structure-smoke`
  - 更新首页 queue rail 文案匹配
- `browser-smoke`
  - 更新首页 rail 可见文案匹配

意义：

- 这轮虽然以 copy 为主，但仍然属于真实产品变更
- 因此必须把 smoke expectation 和新的前台表达同步

## 量化结果

这一轮不是布局压缩 pass，但首页高度依然继续收了一点：

### 桌面端

- `hero`
  - `368`
- `topline-title`
  - `17.91`
- `home-workbench-stack`
  - `423.69`
- 首页总高度：
  - `1403`

### 手机端

- `hero`
  - `542.23`
- `topline-title`
  - `35.09`
- `home-workbench-stack`
  - `501.61`
- 首页总高度：
  - `2330`

判断：

- 这轮没有把首页重新拉长
- 反而在不动大结构的前提下，桌面端和手机端都继续保持紧凑
- mobile 标题换行也比上一版更干净

## 视觉证据

这轮截图：

- 桌面端：
  - `/tmp/latinos-home-after-today-realness-pass-desktop.png`
- 手机端：
  - `/tmp/latinos-home-after-today-realness-pass-mobile.png`

参考稿：

- 桌面端：
  - `/tmp/reference-home-desktop.png`
- 手机端：
  - `/tmp/reference-home-mobile.png`

## 验证

这轮后通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- 首页 hero 继续正常渲染
- `Daily Latin` / `Dance OS` 交互 smoke 继续通过
- mobile shell 继续正确切换
- mobile home / daily 继续无横向 overflow

## 这轮后的判断

这轮的价值不在于“页面看起来变化很大”。

它真正缩小的是这层差距：

- 从：
  - 首页像一个抽象入口系统
- 到：
  - 首页更像一个今天已经开始的练习工作台

也就是说：

- 结构边界没有变差
- smoke 继续稳定
- 但首页的“现场感”更接近参考稿那种真实当下的工作状态

## 剩余差距

当前仍然不能判定完成。

剩余差距继续集中在：

1. 首页 `hero -> heatmap -> workbench` 的最后一层整体完成感
2. workbench 下半段桌面端的块面呼吸与参考稿仍有 very small 差距
3. 仍需要继续做整站一致性 sweep，而不是把首页当成已经结束

## 下一步

下一轮最值得继续做的是：

1. 再做一次首页与关键二级页的一致性 sweep
2. 优先看首页下半屏桌面端：
   - queue rail
   - module grid
   - footer rhythm
3. 如果没有更高 ROI 的 route 掉队问题，再做一轮 very small 的首页比例 polish
