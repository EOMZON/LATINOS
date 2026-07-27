# Daily Loop Second Compact Label Pass

## 背景

在上一轮把 `daily-library` 的 section head 收掉之后，fresh `390px` broad mobile Top1 仍然是：

- `/daily-latin = 2060`

重新拆 `/daily-latin` 后确认当前最厚的 section 仍然是：

- `#today-loop-demo = 374.59`

继续拆内部块后发现：

- `STEP 3` 的 4 张 task 按钮里
- 前两张已经回到单行
- 后两张仍然更高

当时按钮高度是：

- task 1 = `24.55`
- task 2 = `24.55`
- task 3 = `35.59`
- task 4 = `35.59`

说明当前更值得继续收的不是大结构，而是：

- compact label 仍然偏长

## 这轮做法

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/data/content.ts`

继续把后两个 task 的 compact label 压短：

- `只留 1 点 -> 留1点`
- `写 witness -> 写回流`

这轮没有去碰：

- task 排布逻辑
- 保存 witness 流程
- 其他 route

## fresh 验证

在 fresh `3200` 上重新执行：

- `pnpm build`
- `pnpm typecheck`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

继续确认：

- daily loop demo 交互正常
- mobile shell 正常
- `home` / `daily-latin` 无横向 overflow

## 量化结果

fresh `390px` sweep：

- `/ = 1513`
- `/daily-latin = 2049`
- `/dashboard = 2053`
- `/dance-os = 1930`

`Today Loop Demo`：

- `374.59 -> 363.55`

task button 高度最终变成：

- task 1 = `24.55`
- task 2 = `24.55`
- task 3 = `24.55`
- task 4 = `24.55`

## 这轮成立的结论

这轮 second compact label pass 已被 fresh 数据证明有效：

- `/daily-latin 390`
  - `2060 -> 2049`
- `#today-loop-demo`
  - `374.59 -> 363.55`

这说明：

- 这轮收益依然来自数据层 compact 文案
- 而不是继续堆 CSS
- `Today Loop Demo` 里剩余高度确实还可以通过 label 长度继续收

## 一个未成立尝试

这轮后续还试过把 compact 下的 note 输入从 `textarea` 收成单行 `input`。

那一刀虽然让输入形态更像一条回流 cue，但 fresh `390px` 下：

- route 总高没有变化

因此不把那一刀记成成立 pass。

## broad mobile Top1 状态

这轮后 fresh `390px` broad mobile Top1 仍然是：

- `/dashboard = 2053`

同时：

- `/daily-latin = 2049`
- `/dance-os = 1930`

因此下一轮应切回：

- `/dashboard`

