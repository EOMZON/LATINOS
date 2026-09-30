# latindance.top 首页设计系统 · Component Contracts v0.1

> 日期：2026-09-30
> 状态：草案（云端），进 LATINOS `docs/design-system/`（PR #2 追加 commit）
> 上游：Design Tokens v0.1、Color Roles v0.1（同目录）；2026-09-17 黑紫 Visual DNA；`asset-prompt-guideline.md`；product-hub#193

## 0. 阅读说明

- 本文件是**接口文档**，不是实现。所有 runtime 实现（raster 资产、`data/visual-asset-ledger.json`、`lib/body-force/**`、共享组件/页面）归 **G-latindance-3 single-writer**；本文件只定义"实现必须满足什么"。
- 每个组件 contract = 数据输入 ＋ 视觉规则 ＋ 验收门。验收门不通过，实现打回。
- 需本机验证的项标。
- SEO 字段已对齐 G-latindance-1 `seo-metadata-fields` v0.1（2026-09-30，直核原文）；其合同仍为草案，若变更，此处跟随调整。

## 1. 通用验收门（DNA §6 七问转门）

凡含人体/force 元素的组件，发布前必须逐条回答：

| 门 | 问题 | 不通过即 |
|---|---|---|
| G1 承重可读 | 不看文字，能否看出承重侧与身体方向？ | 打回资产或 overlay |
| G2 舞种真实 | 若替换舞种，姿态是否仍真实（非串味）？ | 打回 pose |
| G3 分层独立 | 去掉 ribbon 后，body asset 是否仍可独立复用？ | 打回（bake 了 overlay） |
| G4 overlay 可控 | ribbon / node 是否由 SVG/CSS 独立控制？ | 打回（写死在图里） |
| G5 研究感 | 是否像"舞蹈运动研究图"而非时装姿势图？ | 打回视觉处理 |
| G6 移动端 | mobile 裁切后是否不丢核心身体关系？ | 打回构图/响应式规则 |
| G7 证据链 | 姿态是否有 reference 证据（非纯 prompt 推断）？ | 打回资产来源 |

## 2. Hero（首页首屏）

**数据输入：**

```yaml
headline: string # serif 主标题（中文衬线）
subhead: string # sans 副标题，一句话价值主张
primary_cta: { label, href} # 主按钮 → learn.latindance.top 或对应 hub
secondary_cta: { label, href} # 次按钮 → /daily 或五舞种 hub
body_asset_id: string # ledger 中的资产 id（G-3 维护，透明 WebP/AVIF）
force_spec: ForceOverlay # 见 §5，ribbon/node/arc 参数
trust_line: string # 一行可信背书（#193 §3：原创内容/联系方式指向 footer）
```

**视觉规则：**

1. 分层（自下而上）：`surface` ivory 底 → 细网格线（`line`，装饰性，`aria-hidden`）→ body raster（charcoal 人体，右/左侧 editorial 构图，大留白）→ force overlay（SVG，`force` 角色）→ 文字层（HTML，serif 标题 ＋ sans 标签）。
2. 人体只占视觉重心的一侧，另一侧留白给标题；标题不压人体面部/承重脚。
3. 比例门：整屏视觉 80% HTML/CSS/SVG ＋ 20% raster（DNA §5）；**禁上线整张 AI 设计稿**。
4. 首屏不出现"紫色大色块"（Color Roles 反模式 1）。

**验收门：** G1、G3、G4、G5、G6 必过。

## 3. Topic Hub 卡片 / 区块（五舞种共用结构）

**数据输入：**

```yaml
dance: rumba | cha-cha | samba | jive | paso-doble
name_en: string # "Rumba"
name_zh: string # "伦巴"
character: string # 该舞种 character（一句话，见下表）
pose_asset_id: string # 该舞种 signature pose 资产 id
ribbon_geometry: { length, wave, emphasis} # 该舞种 ribbon 参数（见下表）
timing_note: string # timing character（一句话）
links: [{ label, href}] # 入门 / 进阶 / 相关 daily / blog
seo:  # 已对齐 G-latindance-1 seo-metadata-fields v0.1（2026-09-30，直核原文）
  title: string            # 必填，模板「{页面名}｜LatinDance 拉丁舞」，≤30 中文字符
  meta_description: string # 必填，中文一句话价值说明，≤80 字，不堆关键词
  canonical: string        # 必填，绝对 URL（apex canonical；不带尾 slash；path 全小写）
  robots: string           # 必填，默认 index,follow
  og: { title, description, url, type, image_1200x630, locale_zh_CN, site_name_LatinDance }
  twitter_card: { card: summary_large_image, title, description, image }
  theme_color: "#FBF8F1"  # G-2 决策：浏览器 chrome 色取 ivory，禁紫
  json_ld: object         # hub 页按需 ItemList / Article（首页为 Organization + WebSite）
```

**五舞种 character ＋ ribbon 参数**（继承 DNA §4、prompt guideline §4–§8）：

| 舞种 | character | ribbon | 禁止 |
|---|---|---|---|
| Rumba 伦巴 | continuous / grounded / controlled / connected | 长、连续、绕身体链，不过度夸张 | 夸张扭腰替代承重链；红裙表演海报化 |
| Cha-cha 恰恰 | crisp / compact / quick / precise | 短、紧、方向变化清楚 | 通用弯膝时尚 pose 替代 reference |
| Samba 桑巴 | elastic / pulsing / continuous / grounded | 波浪/pulse；≠ 跳离地面 | 只表现"跳高" |
| Jive 牛仔 | light / rebound / compact / quick | 短弧、回弹、快速释放 | 只表现腾空；遮挡脚位 |
| Paso Doble 斗牛 | directional / sculptural / upright / controlled drama | 宽幅、定向、清晰空间占有 | 套 Cuban Motion 语言；只有夸张手臂没有轴和支撑 |

**视觉规则：**

1. 五个 hub 卡片**共享同一版式**（标题/pose/character/ribbon/links 位置固定），差异只走上表的 character 文案 ＋ ribbon geometry ＋ pose 资产。
2. 禁给某舞种发明专属主题色（Color Roles §3）。
3. 卡片内 pose 资产必须通过 G2（舞种真实）门。

**验收门：** G2、G3、G4、G6 必过。

## 4. Force Overlay 层

独立 contract，因为它是"可交互的数据驱动层"，不是装饰图。

**数据输入：**

```yaml
elements:
- { type: ribbon, path: <svg-path-data>, width: [min, max], alpha: force-alpha-mid}
- { type: pressure-node, at: [x, y], level: primary | secondary}
- { type: rotation-arc, center: [x, y], radius: r, sweep: deg}
- { type: axis, from: [x, y], to: [x, y]}
- { type: ground-line, y: number}
hotspots: [{ at: [x, y], label_key: string}] # 可选交互热点
```

**视觉规则：**

1. 全部 SVG/CSS 实现，`pointer-events: none`（除 hotspots 外）；随容器缩放，描边用矢量保持。
2. 颜色只用 `force` 角色（Color Roles §1）；透明度走 `--force-alpha-*` 阶梯，不许随意取 alpha。
3. **禁 bake**：overlay 元素不许出现在 raster 资产里（prompt guideline §3；验收门 G3/G4）。
4. 移动端：ribbon 简化为单线 ＋ 主 pressure node；arc/axis 在 `<720px` 可隐藏，但承重关系（G1）不得丢失。
5. 动画（如有）：只允许 opacity / stroke-dashoffset 的克制过渡，禁弹跳/旋转大动画（museum-study 气质）。

**验收门：** G3、G4 必过；有动画加测"降级为静态后信息不丢失"。

## 5. Nav（主导航）

**数据输入：** `links: [{ label, href}]`（五舞种 hub ＋ /force、/tools、/daily、/blog）、`cta: { label, href: learn.latindance.top}`、wordmark。

**视觉规则：**

1. `surface` 底 ＋ 底部 1px `line`；wordmark 用 `--font-display` serif，不做图形 logo 替代文字（SEO 与可访问性）。
2. 当前 hub 高亮只用 `text-primary` 加粗/下划线，**禁用 force 紫做导航高亮**（Color Roles 反模式 3）。
3. 移动端折叠菜单保持全部九路由可达。

## 6. Footer ＋ Trust Block

**数据输入：** sitemap 链接组、联系方式、法律链接（隐私/条款）、原创声明。

**视觉规则：**

1. Trust Block 为独立区块（#193 §3 要求：原创内容、清晰导航、联系/隐私/条款等基础可信信息），含：联系方式、隐私政策、服务条款、内容原创声明四项，缺一不可。
2. 视觉：`surface-sunken` 底，`text-secondary`，`--font-technical` 做备案/版权行。
3. sitemap 镜像主域九路由，与 G-1 的 URL IA 合同保持一致（provisional：以 #193 §2 为准）。

## 7. 待本机验证项

- Hero 在真实首屏的 80/20 视觉比例观感（截图确认，G-3）。
- Force overlay 在 375px 宽度下的 G1/G6（截图确认，G-3）。
- `text-muted` 在 ivory 上的实际可读性（对比度工具测量，G-3）。
