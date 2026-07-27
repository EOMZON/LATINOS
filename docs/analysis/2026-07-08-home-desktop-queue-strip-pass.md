# 2026-07-08 Home Desktop Queue Strip Pass

## 背景

上一轮首页已经把：

- module cards
- mobile workbench
- mobile queue

都明显收向了更开放的入口层。

但重新对照桌面端参考稿和当前截图后，会发现桌面端首页下半段还留着一个更具体的差距：

- queue 虽然已经很薄
- 但仍然更像 `3 个并列功能块`

而参考稿在同一位置更像：

- 一层开放式 return strip / entrance strip

也就是说，当前桌面端首页最值得继续收的，不是 hero，也不是 heatmap，而是：

- `desktop queue strip feel`

## 问题定义

真正要解决的是：

**怎样在保留首页真实回流证据和可点击跳转的前提下，让桌面端 queue 更像参考稿里的开放式入口条，而不是 3 个小功能块。**

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

这轮没有动：

- route 结构
- 组件逻辑
- 文案
- smoke 逻辑

说明这轮是一次明确的：

- `desktop queue strip polish pass`

### 1. 桌面端 queue rail 的列宽重新分配

原先 `home workbench` 下的 queue rail 是：

- `repeat(3, 1fr)`

这会让：

- latest
- daily
- dance

三个块看起来太均质，也更像功能卡阵列。

这轮把它收成：

- `latest` 略宽
- `daily / dance` 略窄

也就是：

- `minmax(0,1.08fr) repeat(2,minmax(0,.96fr))`

这样视觉重心更像：

- 左边是当前这轮的主入口
- 右边是两条更轻的回流条

### 2. Daily / Dance 两条 return item 改成更像条状入口

上一轮虽然已经隐藏了多余说明，但 daily / dance 仍然是：

- 垂直堆叠的小块

这轮把这两项在桌面端收成：

- `label row`
- `title + CTA` 同层更紧地排开

也就是：

- title 不再占太多高度
- button 不再把条目继续往下拉厚

结果是：

- still visible
- still clickable
- 但更像入口条而不是卡片

### 3. 继续保留真实 smoke 依赖

这轮没有删除：

- `断练后重启 · 恰恰`
- `伦巴 · 拍子总乱`
- `queue-resume-daily`
- `queue-resume-dance`

因此这轮不是把真实回流链路藏起来，而是：

- 保留真实证据
- 只收视觉厚度

## 截图

这轮补了新的首页截图：

- 桌面端：
  - `/tmp/latinos-home-after-desktop-queue-strip-pass-desktop.png`
- 手机端：
  - `/tmp/latinos-home-after-desktop-queue-strip-pass-mobile.png`
- 上一轮桌面端：
  - `/tmp/latinos-home-after-workbench-open-pass-desktop.png`
- 上一轮手机端：
  - `/tmp/latinos-home-after-workbench-open-pass-mobile.png`
- 参考桌面端：
  - `/tmp/reference-home-desktop.png`

## 验证

已通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- 首页 hero 正常可见
- 首页 queue 仍显示 Daily / Dance witness 证据
- 首页 queue 仍可正确跳转到：
  - `Daily Latin restart`
  - `Dance OS beat / rumba / feet`
- mobile shell 正常切换
- mobile home / daily 无横向 overflow

## 这轮后的判断

这轮虽然是小样式 pass，但方向很准。

当前首页桌面端下半段已经更接近参考稿那种：

- 左边是主入口
- 右边是更轻的 return strip
- 下方模块层继续展开

也就是说，queue 终于更像：

- 一层开放入口

而不是：

- 三个同质功能块

## 仍然没完成的主要缺口

这轮之后首页仍然没有达到“近似同款完成度”。

当前最后几个 gap 继续收敛到：

1. hero / heatmap / workbench 三段的整体完成感
2. section spacing 的最后一层比例
3. 首页顶部 narrative 与底部入口层之间的最后一层“单日作品感”

## 下一轮最值得继续做什么

1. 继续只看首页做一次整体 visual audit
2. 判断最后 Top1 gap 是否已经变成：
   - section vertical rhythm
   - 顶部和下半段的整体呼吸
   - 字级层次微收口
3. 继续避免大改，优先做共享层的小而准的 polish
