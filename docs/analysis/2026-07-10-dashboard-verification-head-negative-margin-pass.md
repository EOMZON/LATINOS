# 2026-07-10 `Dashboard Verification` head negative margin pass

## 背景

今天继续沿用已经锁定的 `390px mobile compaction loop`：

- `single-point only`
- 只有当 `route 总高度` 和 `目标 section 高度` 同时下降，才算 pass
- 失败候选不能写回源码

上一轮刚把：

- `.dashboard-page #dashboard-proof-risk-gate .compact-sec-head`

压到 `-4px`，把 `/dashboard` 从 `1600` 继续收到了当前基线。

这一轮开始前，真实 `390px` fresh-prod 状态为：

- `/dashboard = 1600`

其中剩余尚未做单点收缩的主要 section 是：

- `#dashboard-verification = 123.56`
- `#dashboard-guardrails = 125.56`
- `#dashboard-ops = 123.56`

## 本轮目标

继续只看 `/dashboard` 剩余的 header 候选：

- `verification`
- `guardrails`
- `ops`

目标是继续找出一条：

- 数值收益真实
- 截图复核不挤
- 可以正式留在源码里的单点规则

## 预检

先做 injected preflight。

### `margin-bottom: -4px`

- `verification_mn4`
  - `/dashboard = 1591`
  - `#dashboard-verification = 114.56`
- `guardrails_mn4`
  - `/dashboard = 1591`
  - `#dashboard-guardrails = 116.56`
- `ops_mn4`
  - `/dashboard = 1591`
  - `#dashboard-ops = 114.56`

### `margin-bottom: -6px`

- `verification_mn6`
  - `/dashboard = 1589`
  - `#dashboard-verification = 112.56`
- `guardrails_mn6`
  - `/dashboard = 1589`
  - `#dashboard-guardrails = 114.56`
- `ops_mn6`
  - `/dashboard = 1589`
  - `#dashboard-ops = 112.56`

## 为什么选 `verification_mn6`

从纯数值上看：

- 三个 `-6px` 候选都能把 `/dashboard` 压到 `1589`

但这轮最终选：

- `.dashboard-page #dashboard-verification .compact-sec-head { margin-bottom: -6px }`

原因是：

1. 它直接作用在三张验证卡片上方，section 结构规整，压缩后最容易复核
2. `#dashboard-verification` 自身高度明显下降：
   - `123.56 -> 112.56`
3. mobile screenshot 复核后，标题和三张卡片的上缘仍然没有出现挤压
4. 相比 `guardrails` 和 `ops`，这一块的标题与内容之间原始间隙更充裕，视觉余量更好

## 视觉复核

这轮额外做了最终 `390px` mobile screenshot：

- `/tmp/dashboard-verification-final-mobile.png`
- `/tmp/dashboard-verification-section-final-mobile.png`

复核结论：

- `验证状态` 标题仍然清楚
- 标题和三张卡片上缘未出现明显贴边
- 这一刀在真实页面节奏里是安全的

## 正式改动

修改文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

正式值：

- `.dashboard-page #dashboard-verification .compact-sec-head { margin-bottom: -6px }`

## 完整验证

本轮按正式串行链路验证：

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

## A/B 对照

- `baseline_m5`
  - `/dashboard = 1600`
  - `#dashboard-verification = 123.56`
- `candidate_mn6`
  - `/dashboard = 1589`
  - `#dashboard-verification = 112.56`

这证明这轮收益来自这条规则本身。

## fresh `390px` broad remeasure

- `/ = 1513`
- `/daily-latin = 1591`
  - `#today-loop-demo = 219.5`
  - `#daily-library = 67.53`
  - `#live-return-bridge = 128.14`
- `/dashboard = 1589`
  - `#dashboard-verification = 112.56`
  - `#dashboard-guardrails = 125.56`
  - `#dashboard-proof-risk-gate = 108.86`
  - `#dashboard-route-map = 114.59`
  - `#dashboard-witness-archive = 130.84`
  - `#dashboard-ops = 123.56`
- `/dance-os = 1597`
  - `#dance-assets = 253.56`
  - `#body-map-practice-queue = 255.55`
  - `#dance-sources = 106.34`

## 结论

这轮 pass 正式成立。

当前 broad mobile 排名：

- `/dashboard = 1589`
- `/daily-latin = 1591`
- `/dance-os = 1597`

这意味着：

- `/dashboard` 已不再是最厚 route
- 当前最厚 route 重新回到 `/dance-os`

## 下一步

下一轮继续保持：

- `single-point only`
- 先 injected preflight
- 再 screenshot 复核
- 再 fresh-prod 验证

更适合继续看的点：

1. `/dance-os`
   - 因为它现在重新成为 broad mobile 最厚 route
2. `/dashboard` 的剩余未单点压过候选：
   - `guardrails`
   - `ops`
