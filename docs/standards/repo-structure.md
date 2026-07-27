# Repo Structure

## 设计原则

这个仓库按“长期演化层级”组织，而不是按“一次任务产物”组织。

## 根目录只允许放什么

- `README.md`
- `AGENTS.md`
- `MEMORY.md`
- `.gitignore`
- 一级功能目录

不要把以下内容直接丢在根目录：

- 临时 html
- 临时截图
- demo 草稿
- 飞书复制文本
- 未归类脚本

## 一级目录职责

### `memory/`

日记式上下文、当天决定、临时记录。

### `docs/analysis/`

深度分析、方案对比、best-minds 落盘。

### `docs/standards/`

不会频繁变、但会反复使用的规则。

### `docs/legacy/`

旧项目、旧路径、旧站、旧版本映射。

### `data/feishu/`

飞书来源索引、token、结构说明。

### `sites/frontdoor/`

新前台入口，不直接等同于旧站生产代码。

### `apps/demos/`

用于孵化工具型、交互型、产品型 demo。

## 命名规则

- 目录名用小写加连字符，或现有约定名
- 文档名优先表达职责，不要用 `new-final-v2`
- 分析文档统一：
  - `YYYY-MM-DD-topic.md`

## 代码投放规则

- 正式前台页面：
  - `sites/frontdoor/`
- demo：
  - `apps/demos/<demo-name>/`
- 工具脚本：
  - 之后统一收进 `scripts/`

## 归档规则

如果要保存历史版本，不要直接堆在当前工作目录。

优先：

- 写入 `docs/legacy/`
- 或为明确版本单开子目录
