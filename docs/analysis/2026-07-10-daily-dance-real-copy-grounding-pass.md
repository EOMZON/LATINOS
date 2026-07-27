# 2026-07-10 Daily / Dance real copy grounding pass

## 背景

前两轮已经完成了：

- `Next.js App Router + React + TypeScript` 主线锁定
- route 级页面结构稳定
- `data/` 按 route / 主题拆分
- page / component 导入边界继续收窄
- `390px` mobile compact baseline 持续收口

但继续检查内容层时，`daily.ts` 和 `dance.ts` 里仍有一块明显问题：

- 一些文案虽然已经不算假数据
- 但口吻仍偏“项目说明 / 产品说明 / 路线图说明”
- 还不够像真实会把人送进这一轮、送回下一轮的拉丁入口语言

这和本地已有旧站 proof 不匹配。

旧站里已经有更强、更直接、也更成立的表达，例如：

- `想练拉丁舞，不知道从哪开始？`
- `先选你今天的状态，把这一轮做完。`
- `不是资料库；先判断、再开始、再修一个具体问题。`
- `你不用很会跳，才配开始跳。`

因此这轮目标不是改结构，而是把 `Daily Latin` 和 `Dance OS` 的内容层继续往这些真实表达上收口。

## 本轮目标

在不改 route、不改组件边界、不改 demo 结构的前提下：

1. 继续把 `daily.ts` 里模板感 / 说明感较强的区域改成更真实的入口语言
2. 继续把 `dance.ts` 里偏“产品概况”的区域改成更接近真实练习闭环的语言
3. 保持 `data` 与 `components` 分离不被破坏
4. 让 smoke 继续对齐当前真实文案与交互，而不是被过时断言卡住

## 参考依据

主要参考：

- [/Users/zon/Desktop/MINE/9_latin/apps/latinDance/lib/site.ts](/Users/zon/Desktop/MINE/9_latin/apps/latinDance/lib/site.ts)
- [/Users/zon/Desktop/MINE/9_latin/apps/latinDance/app/page.tsx](/Users/zon/Desktop/MINE/9_latin/apps/latinDance/app/page.tsx)
- [/Users/zon/Desktop/LATINOS/docs/legacy/latindance-map.md](/Users/zon/Desktop/LATINOS/docs/legacy/latindance-map.md)

本轮特别借用了旧站已经成立的语言骨架：

- `先判断`
- `再开始`
- `只修一个点`
- `你不用很会跳，才配开始跳`
- `不是资料库`
- `把这一轮做完`

## 改动

修改文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/daily.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/daily.ts)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/data/dance.ts](/Users/zon/Desktop/LATINOS/sites/frontdoor/data/dance.ts)
- [/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/browser-smoke.py](/Users/zon/Desktop/LATINOS/sites/frontdoor/scripts/browser-smoke.py)

### 1. `daily.ts` 更像真实 daily 入口，而不是项目描述

本轮重点收口了：

- `dailyRows`
- `dailyEntryCards`
- `dailyFlowCards`
- `dailyDemoStates`
- `dailyReturnModeSeeds`
- `dailyStageSignals`

#### 这轮的主要变化

- `dailyRows` 的定位从较泛的“daily 入口页”改成：
  - `成人拉丁自练支持系统的 daily 入口，不是内容目录页`
- 核心动作更明确对齐旧站：
  - `先选你今天的状态，把这一轮做完`
- `ENTRY 01` 直接引入了旧站已成立的签名句：
  - `你不用很会跳，才配开始跳`
- `ENTRY 02 / ENTRY 03` 明确反对：
  - 先补旧课
  - 再看一堆理论
- `LOOP 03` 改成更硬的闭环判断：
  - 如果说不出下次先改哪里，这轮就还没成立
- `after-live` 状态不再只是“内容回流”抽象说法，而是更明确地改成：
  - 直播看完不是结束
  - 要把那一句动作句落回这一轮

### 2. `dance.ts` 更像“练完后怎么继续”的产品层

本轮重点收口了：

- `danceRows`
- `danceFuture`
- `danceDemoStates`
- `danceStageSignals`

#### 这轮的主要变化

- `danceRows` 的定位从较泛的“把练习过程变成产品体验”改成：
  - `把“练完一轮怎么继续”做成产品体验`
- `最小模块` 更接近真实动作闭环：
  - `录 15 秒、看回放、只修 1 个点、下轮还记得先改哪里`
- `最大风险` 改得更贴近当前真实问题：
  - 不是功能少
  - 而是模块越来越多，但用户做完后还是不知道下次先改哪里
- `danceFuture` 从偏空泛的 future tooling，进一步改成更接近真实习惯与回流动作
  - 不是素材仓
  - 是 witness 轨迹
  - 不是只看浏览停留
  - 是判断会不会回来下一轮
- `danceDemoStates` 里原本稍偏“产品视角”的描述，被收成更像真人练习时的判断语言：
  - `别先追表现`
  - `先守住脚下和节拍边界`
  - `别再模糊地说感觉不对`
  - `录切片不是为了更花，而是为了下轮更会练`

### 3. `browser-smoke.py` 不再硬编码旧文案

本轮验证时实际暴露了一个回归点：

- `Dance OS demo did not update the next-step plan`

根因不是页面坏了，而是 smoke 仍在硬编码一条旧文案：

- `如果还是乱，就让下一轮只守住拍子`

但本轮真实内容已经改成：

- `如果还是乱，下一轮就只守住拍子，不追加别的要求`

因此这轮顺手把 `browser-smoke.py` 收稳成更可维护的断言：

- 不再依赖一整句固定文案
- 而是验证 `#correction-ledger-demo .ledger-next-step p` 里是否同时包含：
  - `拍子`
  - `脚下`

这更符合当前主线：

- smoke 要对齐真实结构与真实交互
- 不要因为内容继续变好，就被过时的硬编码文案误伤

## 验证

本轮最终按串行顺序完整重跑：

1. `pnpm typecheck`
2. `CI=1 pnpm build`
3. kill 旧 `next start`
4. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
6. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
7. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 node ./scripts/structure-smoke.mjs`

结果：

- `pnpm typecheck`: pass
- `CI=1 pnpm build`: pass
- fresh `next start`: pass
- `smoke:routes`: pass
- `smoke:browser`: pass
- `structure-smoke`: pass

其中 `smoke:browser` 最终通过并验证了：

- `Dance OS` correction ledger 交互
- `Dance OS` body map / practice queue 回流
- `Daily Latin` loop demo 交互
- `Daily -> Dance` bridge 参数回传
- `Dashboard` witness archive 展示
- `Home` next session queue 回流
- `390px` home / daily 无横向溢出

## 结论

这轮没有增加新模块，但它对长期 Goal 模式很关键：

- `Daily Latin` 更像真实入口，不像结构说明页
- `Dance OS` 更像练习闭环，不像概念工具台
- 旧站已经验证过的语言资产被更明确地带回新前台
- smoke 也不再被过时文案绑死

这更符合当前主线要求：

- 样式继续逼近参考稿
- 架构继续稳住
- 内容继续回到真实拉丁资料
- 验证继续对齐当前真实实现

## 下一步

下一轮更适合继续推进的方向：

1. 继续检查 `daily.ts / dance.ts` 是否还有剩余的“项目说明口吻”
2. 回到 `390px compact loop`
   - 优先 `/dashboard`
   - 再看 `/dance-os`
3. 之后再考虑是否把 `workbench.css` 从超大文件继续向更清楚的样式层级收口
