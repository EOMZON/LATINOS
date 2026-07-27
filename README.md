# LATINOS

`LATINOS` 是新的拉丁主题母仓。

它不是旧站的替代品，也不是单一 demo 文件夹，而是之后这条线的：

- 规则层
- memory 层
- frontdoor 层
- demo 孵化层
- 旧资产承接层

## 当前定位

这个仓库服务的是一条长期主题：

`Latin Dance OS = Daily Latin IP + 拉丁成长网站 + Dance Tools / Demos`

当前已经确认的策略：

- `Feishu` 是唯一内容源，不再把 `Notion` 当成真实来源
- 旧站 `https://latindance.zondev.top/` 先保留，不直接推倒
- 新内容先在这个仓库里规范化，再决定如何挂到旧域名
- 这个仓库优先承担“新 frontdoor + 新 demo + 规则中控”

## 目录约定

- `AGENTS.md`
  - 未来 AI / agent 进入本目录后的必读规则
- `MEMORY.md`
  - 长期记忆，保存不该每次重新判断的结论
- `memory/`
  - 每日工作日志与临时上下文
- `docs/analysis/`
  - 深度分析、决策依据、best-minds 落盘
- `docs/standards/`
  - 目录规范、内容源规范、网站策略、agent 规则
- `docs/legacy/`
  - 对旧站与旧资产的映射，不直接混进新代码
- `data/feishu/`
  - 飞书来源索引、token、说明
- `sites/frontdoor/`
  - 新前台入口的本地静态骨架
- `apps/demos/`
  - 新 demo 的孵化位置

## 已知旧资产

- 线上旧站：`https://latindance.zondev.top/`
- 旧站源码：
  - `/Users/zon/Desktop/MINE/9_latin/apps/latinDance`
- 旧拉丁母体工作区：
  - `/Users/zon/Desktop/MINE/9_latin`

## 先做什么

1. 先读 `AGENTS.md`
2. 再读 `MEMORY.md`
3. 再读 `docs/standards/source-of-truth.md`
4. 再决定要改的是：
   - 规则
   - frontdoor
   - demo
   - 旧站承接

## 暂不做什么

- 不在没有明确要求时改动旧站生产源码
- 不把飞书里的想法随手落到无结构目录
- 不继续扩 `Notion` 相关工作流
- 不把 demo、正式站、归档内容混在同一层
