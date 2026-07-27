# 2026-07-08 Tools Execution Density Pass

## 背景

在上一轮把 `/roadmap` 从“阶段说明页”补成更像 route-level 决策页之后，继续按整站 route 完成感复核，新的明显缺口集中到：

- `/tools`

这页原先已经有：

- source matrix
- rule cards

但下半段仍然主要靠一段 prose 承接，因此整体更像：

- 规则说明页
- 文档摘要页

而不像同一套深色 workbench 语言里的执行页。

## 这轮目标

不是继续加抽象解释，而是把 `/tools` 变成一页真正回答下面问题的 route：

- source of truth 怎样进入当前执行链
- 为什么要先有 standards 和 memory
- 为什么 frontdoor 要先 preview 再决定生产
- 哪些事情当前明确停做

## 实际改动

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`
- `/Users/zon/Desktop/LATINOS/sites/frontdoor/app/tools/page.tsx`

### 1. 新增执行链内容

新增：

- `toolExecutionCards`

内容按真实执行顺序组织：

1. `Feishu → 内容真相`
2. `Standards → 结构护栏`
3. `Frontdoor → 新入口`
4. `Preview → 再决定生产`

这不是新造概念，而是把当前仓库已经成立的执行逻辑前台化。

### 2. 新增停做项内容

新增：

- `toolStopDoingCards`

把当前最重要的 stop doing 前台化：

- 不继续扩 Notion
- 不把新旧混写
- 不跳过 preview 直接切生产

这比一段 prose 更接近参考稿里 route-level workbench 的信息组织方式。

### 3. 移除文档式 prose 承接

`/tools` 原先底部的说明文字块被替换为：

- `当前执行链`
- `当前停做项`

这样页面不再只是“把规则讲一遍”，而是更像：

- 一个现在就能指导前台与部署动作的执行页

## 视觉结果

### 之前的问题

主要缺口不是结构错，而是：

- 下半段完成感不足
- route 身份偏文档页
- 与 `dashboard` / `roadmap` / `Daily` / `Dance OS` 的工作台气质不一致

### 这轮后的变化

`/tools` 现在更像：

- 真实 source-of-truth 与执行护栏页
- frontdoor 体系里的 route，而不是旁边的 README 摘要

桌面端和手机端都更接近参考稿那种：

- 上半段来源矩阵
- 中段规则层
- 下半段执行链和 stop doing

## 量化与截图

真实测量：

- `/tools` 桌面端：
  - `1540`
- `/tools` 手机端：
  - `3964`

注意：

- 这轮和 `/roadmap` 一样，不是为了压短
- 而是为了把原本偏空、偏文档化的 route 补成完成度更高的工作台页

截图：

- 桌面端：
  - `/tmp/tools-after-density-desktop.png`
- 手机端：
  - `/tmp/tools-after-density-mobile.png`

## 验证

已通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`

继续确认：

- `/tools` 路由标题稳定
- 新增结构未误伤其他 route
- 整站既有 smoke 继续通过

## 这轮后的判断

这轮价值在于，它继续修的不是单个组件，而是：

- route 身份
- route 完成感
- route 与真实执行逻辑之间的对齐

现在 `/tools` 已经明显更像 route-level 执行页。

## 下一轮最值得继续做什么

1. 继续复核 `/about` 是否仍偏说明页
2. 继续替换剩余模板感较强的内容块
3. 只在必要时再回到局部密度微调，而不是默认所有页面都继续做压短 pass
