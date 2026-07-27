# 2026-07-08 Home Lower Rail Pass

## 背景

在连续把：

- `Dance OS`
- `/roadmap`
- `/tools`
- `/about`
- `dashboard`

这些页面的 route-level 完成感补上之后，整站最主要的差距重新收敛回首页。

对照参考稿：

- `/Users/zon/Downloads/latin-workbench (2).html`

当前首页最明显的问题已经不在 hero，而在 hero 下面的下半段：

1. `Next Session Queue` 比参考稿里的下层工作台更厚
2. `工作台` 模块入口比参考稿更像细密信息卡，而不是开放式入口

## 问题定义

真正要解决的不是“首页信息够不够多”，而是：

**怎样让首页下半段更接近参考稿那种开放式工作台节奏，而不是把回流和入口都做成厚功能板。**

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/feature/next-session-queue.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/components/cards/home-module-card.tsx`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. 把首页 queue 从厚卡片组收成 return rail

`NextSessionQueue` 原先在首页里仍然更像：

- 三张功能卡

这和参考稿下层的开放式工作台节奏不一致。

这轮改成：

- 更轻的 rail 结构
- `LATEST / DAILY / DANCE` 三条 return lines
- 保留 CTA，但不再用厚卡片堆叠

同时把 header 文案改得更明确：

- 首页先给回流入口
- 不把“继续这一轮”做成厚功能板

### 2. 把首页 module card 收成更像开放式入口

`HomeModuleCard` 原先会逐条渲染 `rows`，造成：

- 入口卡信息密度偏高
- 更像 compact data card

这轮改成：

- 把 rows values 压成一条 summary line
- note 继续保留
- 卡片整体继续是轻边界、开放式入口，而不是小型信息表

### 3. 首页专属样式继续收轻

在共享 CSS 层对首页下半段继续做了针对性收口：

- queue rail item 更轻
- queue links 更像顶部 route pills
- module card 高度下降
- summary 与 note 字级进一步收短
- 维持手机端两列 module 结构，但整体更轻

## 量化结果

真实测量：

- 当前首页桌面端：
  - `1428`
- 当前首页手机端：
  - `2768`

参考稿测量：

- 参考桌面端：
  - `1428`
- 参考手机端：
  - `2936`

这说明：

- 桌面端整页高度已经与参考稿持平
- 手机端高度也已经明显接近同一量级

## 截图

- 当前首页桌面端：
  - `/tmp/home-after-lower-rail-pass-desktop.png`
- 当前首页手机端：
  - `/tmp/home-after-lower-rail-pass-mobile.png`
- 参考桌面端：
  - `/tmp/reference-home-desktop.png`
- 参考手机端：
  - `/tmp/reference-home-mobile.png`

## 验证

已通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`

过程中还修掉了一个真实回归：

- queue rail 按钮一度写成 `Daily Latin`
- 与移动端导航的同名 link 冲突，触发 browser smoke 严格匹配双命中
- 最终把 rail 按钮文案收回更轻的 `Daily`

最终验证继续全绿。

## 这轮后的判断

这轮价值很高，因为首页的主要差距终于不再只是：

- hero 好不好看

而是：

- hero 下方整体是不是同一套工作台节奏

现在首页下半段已经明显更接近参考稿那种：

- 开放式
- 模块入口优先
- 回流入口存在但不抢壳

## 下一轮最值得继续做什么

1. 再做一次整站级 completion audit，判断是否还存在比首页更明显的掉队块
2. 如果继续做首页，优先看 hero 文案密度与热力图完成感，而不是重新把下半段做厚
3. 继续把“真实内容回填”作为主线，而不是再扩新结构
