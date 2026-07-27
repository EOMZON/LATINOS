# 2026-07-08 Daily Ledger Mobile Workbench Pass

## 背景

- 在上一轮 `dance-os` 压缩之后，重新做全站顺序 sweep：
  - `/` mobile：`1730`
  - `/daily-latin` mobile：`3644`
  - `/dance-os` mobile：`3583`
  - `/dashboard` mobile：`3583`
- 这意味着新的 mobile Top1 又回到：
  - `/daily-latin`

## 问题定义

不是继续平均缩 `daily-latin` 整页。

而是只回答一个高 ROI 问题：

**怎样在不改 demo 逻辑的前提下，把 `Today Loop Demo` 从“窄屏完全纵向堆叠”重新拉回更接近参考稿的 mobile workbench 结构？**

## 关键约束

- 继续保留：
  - `Next.js App Router + React + TypeScript`
  - 真实路由
  - 组件化
  - 数据与组件分离
- 不改交互逻辑，只做布局层收口
- 不能为了变短把更窄手机压成不可读
- 必须继续通过：
  - `pnpm verify`
  - `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
  - `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

## 先量内部结构

实际测到 `#today-loop-demo` mobile 高度主要由 `compact-ledger-shell` 造成：

- `Today Loop Demo`：`1049`
- `compact-ledger-shell`：`1001`
- `ledger-stack`：`554`
- `ledger-output`：`422`

进一步看：

- `STEP 1`：`176`
- `STEP 2`：`176`
- `STEP 3`：`186`

结论很明确：

- 当前最大浪费不是文字本身
- 而是 mobile 下把整个 ledger 强行改成单列
- 导致 `stack + output` 完全串行叠高

## 候选实验

在浏览器里先注入候选 CSS 做 A/B 测量，再决定是否落盘：

- baseline：
  - `Today Loop Demo`：`1049`
- 仅恢复双列 shell：
  - `718`
- 恢复双列 shell + 左侧 step cards 变回 2 列 workbench：
  - `637`
- 更激进的超紧凑版本：
  - `581`

其中最激进版本虽然更短，但在 `360px` 宽度下已经开始把中文压成近似竖排，不适合作为默认策略。

## 最终选择

只把“窄屏工作台”恢复到一个安全门槛内：

- 新规则只在：
  - `@media (min-width:375px) and (max-width:860px)`
  生效
- 做法：
  - `ledger-grid` 恢复成双列
  - `ledger-stack` 恢复成 2 列，`STEP 3` 继续跨满整行
  - `ledger-output` 做轻量 padding / result card / note field 压缩
- 更窄手机继续保持原来的单列安全布局

## 实际改动

- 改动文件：
  - `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

## 量化结果

### `Today Loop Demo`

- mobile：
  - `1049 -> 637`

### `/daily-latin`

- mobile total：
  - `3644 -> 3233`

## 改动后的整站顺序 sweep

- `/` mobile：`1730`
- `/daily-latin` mobile：`3233`
- `/dance-os` mobile：`3583`
- `/dashboard` mobile：`3583`

这意味着当前 mobile Top1 已不再是 `daily-latin`，而是：

- `/dance-os`
- `/dashboard`

并列。

## 验证

- 已通过：
  - `pnpm verify`
  - `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
  - `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

## 截图

- `Today Loop Demo` mobile：
  - `/tmp/latinos-daily-ledger-mobile-workbench-pass.png`
- `daily-latin` full page mobile：
  - `/tmp/latinos-daily-page-mobile-workbench-pass.png`

## 这轮后的判断

- 这轮是高 ROI 布局级修正，不是继续抠文案
- `daily-latin` 已经从新的 mobile Top1 掉队项里退出
- 下一轮如果继续追 Top1，最值得看的就不再是 `daily-latin`
- 应直接回到：
  - `/dance-os`
  - `/dashboard`
  的并列收口判断
