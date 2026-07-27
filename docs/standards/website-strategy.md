# Website Strategy

## 当前状态

已知线上旧站：

- `https://latindance.zondev.top/`

已知旧站源码：

- `/Users/zon/Desktop/MINE/9_latin/apps/latinDance`

旧站不是废稿，而是已上线的公开 proof。

## 当前推荐策略

### Phase 1

先保留旧站生产入口不动。

新工作在 `LATINOS` 里做：

- 新 frontdoor
- 新 demo
- 新规范
- 新承接说明

### Phase 2

等新 frontdoor 足够稳后，再决定：

- 是否把旧域名首页切到新 frontdoor
- 是否把旧站改成：
  - `/legacy`
  - `/v1`
  - 或“旧版入口”

### Phase 3

再把两个新 demo 接上：

- `Daily Latin Demo`
- `Dance OS Demo`

## 为什么不建议现在就改旧站

因为现在有 3 个动作不应该绑在一起：

1. 建新目录规范
2. 设计新 frontdoor
3. 改生产入口

把它们绑在一起，最容易同时把结构和线上站都搞乱。

## 推荐的信息架构

### 新 frontdoor 首页

应该至少有 3 个入口：

1. `继续看旧版 / 现有起步页`
2. `进入新的 Daily Latin`
3. `进入 Dance OS / Tools`

### 旧站

短期只做 `保留 + 链接回流`。

## 强约束

- 没有明确要求时，不直接修改旧站源码
- 没有明确要求时，不直接切 `latindance.zondev.top` 首页
- 没有 preview 验证时，不直接做生产替换

## 未来最优方向

长期最优并不是“旧站继续膨胀”，而是：

- 旧站成为 legacy proof
- 新 frontdoor 成为统一入口
- 新 demo 在清晰边界内持续长出来
