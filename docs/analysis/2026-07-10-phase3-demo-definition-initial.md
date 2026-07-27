# Phase 3 Demo Definition Initial

## 背景

`Phase 2` 完成后，当前主线已经切到：

- `Phase 3：两个 demo 的定义与孵化`

但如果只说“去定义两个 demo”，而没有把边界、入口和目录说清楚，下一轮很容易重新回到：

- frontdoor 和 demo 混写
- Daily 与 Dance OS 逻辑互相污染
- 两个 demo 一起平均推进

## 问题定义

真正要解决的不是“先做哪个更酷”，而是：

**把两个 demo 的职责边界、目录位置、入口来源、输入输出和验证方式先写清楚，然后只选一个 `Top 1 demo` 先独立孵化。**

## 当前建议的两个 demo

### 1. Daily Latin Demo

建议定义为：

- 一个 `内容回流 / 起步闭环 demo`

当前职责：

- 状态分流
- 10-15 分钟最小起步
- 从围观到做一轮
- 留下 witness
- 必要时桥接到 Dance OS

更像什么：

- `frontdoor 入口分支`
- `Daily Latin route 的独立实验壳`

不该承担什么：

- 重工具纠错壳
- Body Map / Ledger / Queue 的完整产品链
- 过重的后台与 dashboard

当前推荐目录：

- `apps/demos/daily-latin-demo/`

但当前策略上：

- 先继续让 `sites/frontdoor/daily-latin` 承担主入口
- 独立 demo 目录只承接更明确的实验壳，不急着先做成最重资产

### 2. Dance OS Demo

建议定义为：

- 一个 `动作反馈 / 纠错 / 下一轮回流 demo`

当前职责：

- 录一轮
- 回看
- 只修 1 个点
- 把问题落到身体部位
- 留下下一轮动作句
- 用 queue / archive / return trigger 判断产品是否成立

更像什么：

- `第一批最适合独立孵化的产品化 demo`
- `工具型主壳`

不该承担什么：

- Why Latin / fit check
- 直播入口页
- 旧站式内容承接主壳

当前推荐目录：

- `apps/demos/dance-os-demo/`

## 为什么当前推荐 `Dance OS Demo` 作为 Top 1

当前更推荐先孵化：

- `Dance OS Demo`

原因：

1. 它的产品边界更清楚  
   `feedback / correction / queue / archive / return trigger` 已经比 Daily Latin 更接近独立产品壳。

2. 它更适合脱离 frontdoor 独立长  
   Daily Latin 天然仍与 frontdoor 内容承接高度耦合，而 Dance OS 更适合先抽成工具型 demo。

3. 它与 `DANCE OS DEMO v1.0` 的飞书来源更直接  
   当前本地可见 source 里，Dance OS 的产品语言已经更明确。

4. 它更能验证“产品化”这一层  
   Daily Latin 更偏入口和内容回流；Dance OS 更能直接回答“这是不是一个会让人回来下一轮的工具”。

## 当前建议的孵化顺序

1. 先把 `Daily Latin Demo` 和 `Dance OS Demo` 的边界写清楚
2. 先选 `Dance OS Demo` 作为 `Top 1`
3. 在 `apps/demos/dance-os-demo/` 下开始第一轮独立孵化
4. `Daily Latin Demo` 暂时继续以 frontdoor route 为主、独立 demo 目录为辅

## 当前不建议做的事

- 同时重做两个 demo
- 把 Daily Latin 和 Dance OS 逻辑混进一个“总 demo”
- 还没定义边界就开始 deploy / 域名切换
- 还没定义目录就先抽共享组件

## 下一步

当前更合理的下一步是：

1. 以 `Dance OS Demo` 作为 `Top 1`
2. 给 `apps/demos/dance-os-demo/` 补第一版：
   - 目标
   - 输入
   - 输出
   - 最小页面结构
   - 验证方式
3. 然后再看是否需要给 `Daily Latin Demo` 补一个更轻的独立实验壳
