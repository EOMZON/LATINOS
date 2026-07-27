# 2026-07-08 Home Hero Micro Pass

## 背景

在上一轮 `home hero ratio pass` 之后，首页 hero 已经明显更接近参考稿，但还剩下一层很细的差距：

- `topline -> hero` 的间距略紧
- hero 总高度还略低
- 右卡 `当前阶段` session 仍然偏薄

参考锁定仍然是：

- `/Users/zon/Downloads/latin-workbench (2).html`

## 问题定义

这一轮不是再做大改，而是判断：

**是否可以只通过 very small 的 home-only 样式收口，把首页再往参考稿推进一点，同时不把已经收紧过的下半屏重新拉长。**

## 这轮动作

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/sections/page-header.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/page.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. 给 `PageHeader` 加上可选 `className`

动作：

- `PageHeader` 新增可选 `className`
- 首页 `app/page.tsx` 传入：
  - `topline-home`

意义：

- 不再用全局方式去放大所有 route header
- 让首页能够做更贴近参考稿的 header / hero 节奏
- 同时保持其他路由 header 不被顺手带偏

### 2. 首页专属地拉开 `topline -> hero`

动作：

- 新增：
  - `.topline-home { margin-bottom: 38px }`
- 手机端继续保持：
  - `20px`

意义：

- 桌面端首页更接近参考稿的上半屏留白
- 手机端不被无意义地继续拉长

### 3. hero 再加一层 very small 厚度

动作：

- hero 左右卡 `min-height`：
  - `346` / 实际上一轮视觉高度约 `357.80`
  - 进一步改成 `368`
- `hero-right-lower` gap：
  - `14` -> `16`
- `live-session`：
  - `padding-top: 16px -> 18px`
  - value 字级轻微上调

意义：

- 这不是再重排结构
- 而是把 hero 往参考稿的厚度和完成感继续推一点

## 量化结果

### 桌面端

上一轮实测：

- hero：`357.80`
- live session：`55`
- hero top：`92.91`
- ring top：`121.91`

这一轮后实测：

- hero：`368`
- live session：`57.55`
- hero top：`112.91`
- ring top：`144.73`

参考稿：

- hero：`377`
- live session：`61`
- hero top：`125.59`
- ring top：`154.59`

判断：

- hero 高度已经从“明显偏短”推进到“略低于参考”
- session 也继续往参考值靠近
- `topline -> hero` 间距明显更接近参考稿

### 手机端

上一轮实测：

- hero：`564.50`
- live session：`45.83`

这一轮后实测：

- hero：`564.75`
- live session：`46.08`

判断：

- 手机端只发生了非常轻微变化
- 没有被这轮桌面端收口显著拉长

## 视觉证据

这轮桌面端截图：

- `/tmp/latinos-home-after-very-small-pass.png`

这轮手机端截图：

- `/tmp/latinos-home-after-very-small-pass-mobile.png`

上一轮桌面端截图：

- `/tmp/latinos-home-after-hero-pass.png`

参考稿桌面端截图：

- `/tmp/latinos-reference-turn.png`

## 验证

这轮后继续通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- 首页 hero 可见
- `Dance OS` 交互 smoke 继续通过
- `Daily Latin` 交互 smoke 继续通过
- `Dashboard` 密集 section 继续通过
- mobile shell 继续正确切换
- mobile home / daily 继续无横向 overflow

## 这轮后的判断

这轮是有价值的，但它的价值不是“视觉变化很大”，而是：

- 用很小的 home-only 改动
- 继续压近参考稿
- 又没有破坏其他 route 的 header 节奏

这说明当前 frontdoor 的组件边界和共享样式边界比之前更稳了。

## 剩余差距

当前仍然还不能判定完成。

剩余差距已经更细，主要在：

1. 首页 hero 仍比参考稿略紧一点
2. 首页顶部完成感还差最后非常细的一层 polish
3. 整站还需要继续做一致性 sweep，而不是只盯首页

## 下一步

下一轮优先级：

1. 做整站一致性 sweep：
   - `/`
   - `/daily-latin`
   - `/dance-os`
   - mobile shell
2. 在一致性 sweep 下继续看是否还有 route 级别的 header / section 节奏差异
3. 继续做真实内容回填，不要长期停在“结构已经不错”的阶段
