# AGENTS.md

你现在在 `LATINOS`。

这是一个长期主题母仓，不是临时实验目录。

## Session Startup

- 普通开发或 Git 治理先读 `README.md`，按目标路径加载适用合同；已读且未变化的内容可复用。
- 内容源、课堂材料或飞书映射：读 `docs/standards/source-of-truth.md` 和 `data/feishu/latinos-sources.json`。私有课堂原文、身份和未授权媒体不得进入公共仓库。
- 新文件归属或目录调整：读 `docs/standards/repo-structure.md`。
- 网页、demo、域名或旧站承接：读 `docs/standards/website-strategy.md` 和 `docs/legacy/latindance-map.md`；沿用下方生产域名保护。
- 明确恢复项目长期上下文时，再读 `MEMORY.md` 和相关日期的 `memory/`；普通审计不默认加载日记。

## 这条线真正要做什么

不要把这里理解成“做一个页面”。

这里要服务的是：

`Latin Dance OS = Daily Latin IP + 拉丁成长网站 + Dance Tools / Demos`

也就是说：

- 直播 / 内容 是 `IP`
- 网站 / 页面 是 `资产承接`
- 工具 / 反馈系统 / 动作实验 是 `产品化`

## Source Of Truth

### 强规则

- 这条线的内容源以 `Feishu` 为准
- 如果历史材料里提到 `Notion`
  - 默认视为旧提法
  - 要翻译回当前对应的飞书文档或飞书结构
- 不要继续扩写新的 Notion 工作流

### 当前飞书组

至少要知道这 3 个文档：

- `LATIN`
- `直播计划`
- `拉丁dance os构思`
- `DANCE OS DEMO v1.0`

详见 `data/feishu/latinos-sources.json`。

## 目录投放规则

### 新规则 / 新约束

写到：

- `docs/standards/`
- `AGENTS.md`
- `MEMORY.md`

### 深度分析 / 决策记录

写到：

- `docs/analysis/`

### 旧站承接 / 迁移说明

写到：

- `docs/legacy/`

### 新前台页面

写到：

- `sites/frontdoor/`

### 新 demo

写到：

- `apps/demos/<demo-name>/`

### 每日上下文

写到：

- `memory/YYYY-MM-DD.md`

## 对旧站的态度

旧站是已上线 proof，不是垃圾。

已知旧站：

- live: `https://latindance.zondev.top/`
- source: `/Users/zon/Desktop/MINE/9_latin/apps/latinDance`

默认策略：

- `保留`
- `映射`
- `并行`

不要默认：

- 推倒重做
- 直接迁目录
- 直接改生产域名首页

如果要改旧站生产代码、改旧域名入口、或做大迁移，先看 `docs/standards/website-strategy.md`。

## Domain / Deploy Guardrails

- 没有明确要求时，不要直接改 `latindance.zondev.top` 的生产指向
- 可以先做：
  - 本地 frontdoor
  - preview 部署
  - 并行 demo
- 如果真的要上生产域名，先确认：
  - 部署路径
  - 项目类型
  - preview 还是 prod
  - 是否绑自定义域名

## 风格与信息架构

- 默认走克制、清晰、长期主义的方向
- 优先信息结构，不要先堆视觉效果
- 首页的职责不是解释宇宙观，而是：
  - 给入口
  - 给状态
  - 给下一步

## Stop Doing

- 不要再把新旧版本混写在同一个随意目录
- 不要让 demo 和正式内容共用一套含糊命名
- 不要在没记录 decision 的前提下改基础结构
- 不要把旧 Notion 表述原样继续沿用
