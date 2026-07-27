# Dance Ledger Output Padding Pass

## 背景

在上一轮 fresh `390px` broad baseline 里：

- `/ = 1513`
- `/daily-latin = 1718`
- `/dashboard = 1710`
- `/dance-os = 1726`

因此当前 broad mobile Top1 仍然是：

- `/dance-os = 1726`

重新拆 `/dance-os` 后，当前最厚 section 仍然是：

- `#correction-ledger-demo = 335.94`

这一轮继续按 very small pass 规则，只在 `Correction Ledger` 范围内做 runtime preflight。

## preflight

基线：

- route:
  - `/dance-os = 1726`
- target section:
  - `#correction-ledger-demo = 335.94`

候选结果：

- `ledger-output-pad-1`
  - `/dance-os: 1726 -> 1725`
  - `#correction-ledger-demo: 335.94 -> 334.08`
- `ledger-output-pad-0`
  - `/dance-os: 1726 -> 1725`
  - `#correction-ledger-demo: 335.94 -> 334.08`
- `result-card-pad-2`
  - `/dance-os: 1726 -> 1725`
  - `#correction-ledger-demo: 335.94 -> 334.08`
- `choice-btn-pad-6`
  - 无收益
- `choice-note-line1`
  - 无收益
- `ledger-copy-line1`
  - 无收益
- `result-p-line1`
  - `/dance-os: 1726 -> 1725`
  - `#correction-ledger-demo: 335.94 -> 334.08`
- `choice-btn-compact-pad-5`
  - 无收益

因此这一轮选择最直接、最局部的一刀：

- `.dance-os-page #correction-ledger-demo .compact-ledger-shell .ledger-output`
- `padding: 4px -> 1px`

## 改动

文件：

- [/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css](/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css)

动作：

- 在文件末尾追加更晚的 `@media (min-width:390px) and (max-width:430px)` override
- 将：
  - `.dance-os-page #correction-ledger-demo .compact-ledger-shell .ledger-output`
  - `padding: 4px`
- 收成：
  - `padding: 1px`

## 验证链

这轮中途一度因为把 `typecheck` 和 `build` 并行触发，打乱了 `.next/types` 生成物，导致：

- `build`
  - `ENOENT ... .next/types/routes.d.ts`
- `typecheck`
  - 多个 `.next/types/**/*.ts not found`

这不是代码回归，而是验证顺序被破坏。

随后按既定合同修回串行链路：

1. 清理被打乱的 `.next/types`
2. 串行 `pnpm typecheck`
3. 串行 `pnpm build`
4. fresh `pnpm exec next start --hostname 127.0.0.1 --port 3200`
5. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
6. `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`
7. fresh `390px` remeasure

最终结果：

- `typecheck`: pass
- `build`: pass
- `route smoke`: pass
- `browser smoke`: pass
- mobile overflow:
  - `home`: no overflow
  - `daily-latin`: no overflow

## 量化结果

fresh `390px` remeasure：

- `/dance-os`
  - `1726 -> 1725`
- `#correction-ledger-demo`
  - `335.94 -> 334.08`
- `#body-map-practice-queue`
  - `290.55 -> 290.55`

这说明这轮 pass 满足成立条件：

- route 总高下降
- 目标 section 高度下降

## 结论

这是一轮成立的 `/dance-os` single-point pass。

当前 fresh `390px` broad route heights 更新为：

- `/ = 1513`
- `/daily-latin = 1718`
- `/dashboard = 1710`
- `/dance-os = 1725`

当前 broad mobile Top1 仍然是：

- `/dance-os = 1725`

## 额外结论

这轮再次确认：

- 这条线的验证链必须严格串行
- 不要把 `typecheck` 和 `build` 并行跑
- 即使代码没问题，也会因为 `.next/types` 生成过程互相踩踏而制造假失败
