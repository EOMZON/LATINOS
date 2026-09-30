# latindance.top · 五舞种 Topic Hub 结构 v0.1

> 日期：2026-09-30
> 状态：草案（云端），进 LATINOS `docs/design-system/`（PR #2 追加 commit）
> 上游：Component Contracts v0.1（§3 Hub 卡片/§4 Force overlay）；G-latindance-1 `url-ia-contract` v0.1 / `seo-metadata-fields` v0.1（均直核原文）；2026-09-17 黑紫 Visual DNA；product-hub#193 §2/§3/§7

## 0. URL 契约（对齐 G-1，canonical 形式）

- canonical host：`https://latindance.top`（apex；www 301→apex）
- 形式：**无尾 slash**（根 `/` 除外）、**path 全小写**；变体 301 到规范形
- 五舞种 hub：

| Hub | Canonical URL | 中文 |
|---|---|---|
| Rumba | `https://latindance.top/rumba` | 伦巴 |
| Cha-cha | `https://latindance.top/cha-cha` | 恰恰 |
| Samba | `https://latindance.top/samba` | 桑巴 |
| Jive | `https://latindance.top/jive` | 牛仔 |
| Paso Doble | `https://latindance.top/paso-doble` | 斗牛舞 |

- 适用范围：黑紫基线覆盖以上 hub（G 父线 2026-09-30 裁决；silu 豁免）。

## 1. 共享 IA（五个 hub 相同区块顺序）

```
1. Hub Hero — 舞种 character（一句话）＋ signature pose 资产 ＋ force overlay
2. 技术基石 — weight transfer / axis（承重链，文字克制， pose 图解为主）
3. Timing — timing character（一句话）＋ 节奏注脚
4. Force Path 画廊 — 该舞种代表性 force path（data→asset→selector→component→page 分层，#193 §7-7）
5. 相关内容 — /daily、/blog 相关条目；/force、/tools 入口
6. CTA — → learn.latindance.top（绝对 URL）
```

区块顺序固定；各 hub 只替换内容参数（§2），不重排、不增删区块（保持 SEO 模板与爬虫预期稳定）。

## 2. 五舞种差异参数表

character / ribbon / 禁止项继承 DNA §4 与 prompt guideline §4–§8（已直核）。**内容 truth**（具体 pose ref、承重相位）以 latinDance production issues（#13 pose truth、#25、#28、#30）为准，本表只定义槽位，**不发明技术事实**，待 production truth 回填。

| 舞种 | character | ribbon geometry | 内容槽位（待 production truth 回填） | 禁止（prompt guideline） |
|---|---|---|---|---|
| Rumba 伦巴 | continuous / grounded / controlled / connected | 长、连续、绕身体链，不过度夸张 | signature_pose_ref / weight_transfer_phase / timing_note | 夸张扭腰替代承重链；红裙表演海报化 |
| Cha-cha 恰恰 | crisp / compact / quick / precise | 短、紧、方向变化清楚 | 同上 | 通用弯膝时尚 pose 替代 reference |
| Samba 桑巴 | elastic / pulsing / continuous / grounded | 波浪/pulse；≠跳离地面 | 同上 | 只表现"跳高" |
| Jive 牛仔 | light / rebound / compact / quick | 短弧、回弹、快速释放 | 同上 | 只表现腾空；遮挡脚位 |
| Paso Doble 斗牛 | directional / sculptural / upright / controlled drama | 宽幅、定向、清晰空间占有 | 同上 | 套 Cuban Motion；有臂无轴 |

视觉差异只走 ribbon geometry / emphasis / pose 资产；**禁各舞种独立主题色**（Color Roles §3）。

## 3. SEO 映射（对齐 G-1 字段清单 v0.1）

每 hub 必填：

- `<title>`：`{舞种中文} {dance_en}｜LatinDance 拉丁舞`（如「伦巴 Rumba｜LatinDance 拉丁舞」）
- `meta description`：中文一句话（character 意译 ＋ 价值），≤80 字
- `canonical`：上表绝对 URL；`robots`：`index,follow`
- OG：`og:type=article`，`og:image` 1200×630（pose 资产＋ivory 底，禁整页设计稿），`og:locale=zh_CN`
- JSON-LD：`Article`（＋可选 `ItemList` 挂画廊）
- `theme-color`：`#FBF8F1`（全站统一）

## 4. 与 Component Contracts 的关系

- 本文件定义**页面级 IA 与内容参数**；组件级 contract（Hub 卡片结构、Force overlay 元素、验收门）见 Component Contracts §3/§4。
- Hub Hero ＝ Hero contract（§2）的舞种实例化：headline 取 character 中文意译，body_asset 取该舞种 pose 资产。

## 5. 待办与边界

- 内容 truth 回填：latinDance#25/#28/#30 production 收口后，把 §2 槽位填实（G-3 实现侧消费）。
- 待本机验证：五 hub 在移动端的区块节奏与 pose 资产裁切（G-3 截图确认）。
- 本文件不定义 pose 技术细节——那是 latinDance 仓 production issues 的范围，不在 LATINOS 重复 truth（#193 §2 双仓职责）。
