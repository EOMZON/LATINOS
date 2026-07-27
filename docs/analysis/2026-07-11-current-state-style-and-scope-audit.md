# Current State Style And Scope Audit

## 背景

用户当前真正要确认的是：

1. 到底已经做成了什么
2. 还差什么
3. 现在的结果是否已经按照最初参考样式与最初诉求完成

这里的“最初参考样式”当前以：

- `/Users/zon/Downloads/latin-workbench (2).html`

为样式锚点。

这里的“最初诉求”至少包括：

1. 样式和布局尽量贴近参考稿
2. 不只是样式，还要把真实拉丁内容填进去
3. 要有长期可维护架构：
   - React / Next
   - 组件化
   - 数据与组件分离
4. 响应式要能在电脑和手机上正常访问
5. 不丢旧站，旧站与新内容要并行承接
6. 后续 AI 能长期维护，不要一改一大片失控

## 已经做成的部分

### 1. 仓库层已经从“临时目录”变成“长期母仓”

已建立：

1. `AGENTS.md`
2. `README.md`
3. `MEMORY.md`
4. `docs/standards/`
5. `docs/legacy/`
6. `memory/`
7. `data/feishu/`

这意味着：

- 结构、来源、旧站态度、部署边界、长期规则已经不再散乱

### 2. 前台架构已经不是散乱 HTML，而是长期维护型结构

当前 frontdoor 已是：

- `Next.js App Router`
- `React`
- `TypeScript`
- 组件化
- 数据与组件分离

关键位置：

1. 页面：
   - `sites/frontdoor/app/`
2. 组件：
   - `sites/frontdoor/components/`
3. 数据：
   - `sites/frontdoor/data/`
4. 样式：
   - `sites/frontdoor/styles/workbench.css`
   - `sites/frontdoor/styles/tokens.css`

这部分已经符合“以后 AI 好维护、可抽公共组件”的长期方向。

### 3. 样式方向已经明显迁到参考稿同一体系

当前 frontdoor 的样式系统已经明显继承了参考稿的核心语言：

1. 深色工作台底色
2. 克制的黑灰面板
3. 紫色作为稀疏强调色
4. sidebar + main shell
5. editorial / dashboard 式 hero 与 section rhythm
6. heatmap / cards / detail panel / tabs / asset grid 这一整套工作台语法

从 CSS token 和结构看，不是“完全另做了一套风格”，而是已经迁到同一风格族。

### 4. 核心 frontdoor 页已经真实完成并通过验证

已完成并验证：

1. `/`
2. `/daily-latin`
3. `/dance-os`

同时辅助页也都能访问：

1. `/legacy`
2. `/tools`
3. `/roadmap`
4. `/dashboard`
5. `/about`

已通过的真实验证链：

1. `pnpm typecheck`
2. `CI=1 pnpm build`
3. `pnpm exec next start --hostname 127.0.0.1 --port 3200`
4. `pnpm smoke:routes`
5. `pnpm smoke:browser`
6. `node ./scripts/structure-smoke.mjs`

### 5. 真实内容 grounding 已经不是空模板

当前并不是只有假文案。

已经有真实 grounding 的部分包括：

1. `Feishu` source of truth 约束
2. 旧站 proof 的映射
3. `Daily Latin` 的状态分流、回流、桥接逻辑
4. `Dance OS` 的 correction / queue / return 结构
5. 仓库级共享拉丁数据
6. source-backed sections 与 route-level evidence

### 6. 旧站并没有被粗暴推倒

已经落实的态度是：

1. 保留旧站
2. 在新仓库里做映射和承接
3. 不直接切旧域名首页

这点是符合最初长期诉求的。

## 还差什么

### 1. 还不能诚实地说“和参考稿一模一样”

当前更准确的说法是：

- `frontdoor` 已经“非常明显贴近参考稿体系”
- 但还不能凭当前证据说“已经逐页、逐模块、逐细节完全一模一样”

原因：

1. 没有做逐页视觉 diff 审计
2. 没有逐模块对照 reference HTML 的所有 section
3. 当前不同页面已按真实 IA 重组，不再是 reference 单页原样照抄

所以：

- `风格方向` 是对的
- `像不像` 已经比较接近
- `是否完全一模一样` 还不能说已经证明

### 2. 独立 `Dance OS Demo` 还没有完全收口

当前主线 demo 已经做到：

- `archive -> queue -> return trigger`

也已经做过：

1. shared assets 第一刀
2. shared assets 第二刀
3. grounded shared data pass

但最新 open pass 仍在：

- grounded witness chain pass 的最终完整验收

也就是说：

- demo 不是没做出来
- 但也还不是“所有最新一刀都完全验收结束”

### 3. 响应式已经做了，但不是所有页面都拿到同等级证明

目前真实 smoke 已证明：

1. mobile shell 正常切换
2. 首页无横向溢出
3. `daily-latin` 无横向溢出

但当前证据里还没有同等级写死：

1. `dance-os` 移动端 overflow 数值审计
2. 所有辅助页逐页移动端截图和逐页溢出证明

所以这块更准确的状态是：

- 已明显进入可用态
- 但全站移动端“逐页无死角验收”还没彻底做完

### 4. 内容已经部分真实化，但还没到“全站都被真实材料充分填满”

当前已经不是模板站，但也还不能说：

- 所有页面都已经被本地历史材料和飞书内容最大化填满

还存在一些结构性说明卡片、产品语言卡片、方向描述卡片，这些更偏：

1. 信息架构解释
2. 产品成立条件
3. 阶段性 bridge copy

而不是更厚的真实案例 / 长期轨迹 / 具体练习沉淀。

### 5. 生产域名并行承接还没最终完成

当前已经明确：

1. 不直接改旧站生产
2. 新站先本地 / preview 验证

这符合策略，但也意味着：

- “新旧内容在正式域名层怎么并行出现”

这件事还没有最终落地到生产入口。

## 是否按照最初参考样式和诉求完成

## 样式层面

结论：

- `部分完成，而且方向正确，但还不能说 100% 最终完成`

更准确地说：

1. 当前 frontdoor 已经明显迁到参考稿的同一视觉系统
2. 不是跑偏风格
3. 但还没有证据证明它已经做到逐页逐细节“完全一模一样”

## 架构层面

结论：

- `已经完成得比较好`

因为这部分已经达到：

1. 组件化
2. 数据与组件分离
3. Next / React / TypeScript
4. 适合长期 AI 维护
5. 适合后续抽公共组件

这块是当前完成度最高、最接近长期目标的一层。

## 内容层面

结论：

- `已经从模板期进入真实化阶段，但还没有全部做满`

也就是说：

1. 已经不只是样式模板
2. 已经引入飞书、旧站、真实拉丁结构
3. 但距离“所有关键页面都被真实内容充分填实”还有距离

## 交付层面

结论：

- `frontdoor 已经可用，独立 demo 还在继续收口`

## 最重要的一句判断

如果只问“有没有按最初方向在做”：

- 有，而且已经做到了正确轨道上

如果问“是不是已经把最初所有诉求完全做完了”：

- 还没有

如果问“现在最真实的状态是什么”：

- `基础结构 + 核心 frontdoor + 风格迁移 + 组件化架构` 已经成立
- `独立 demo 的最后几刀验收 + 更彻底的响应式 / 内容填实 / 生产承接` 还没全部收完

## 下一步最优先

不要再泛泛改全站。

当前最优先顺序应是：

1. 先收 `Dance OS Demo` 当前 open pass 的完整验收
2. 再补一轮“参考稿一致性审计”
3. 再补“全站响应式逐页验收”
4. 再决定 preview / production 并行承接

## Stop Doing

1. 不要把“已经很像参考稿”说成“已经 100% 一模一样”
2. 不要把“核心页完成”误说成“全站所有诉求都已经完结”
3. 不要重新回到大范围平均推进
