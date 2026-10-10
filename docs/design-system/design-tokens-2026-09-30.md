# latindance.top 首页设计系统 · Design Tokens v0.1

> 日期：2026-09-30
> 状态：草案（云端），待 G 父线无异议后进 LATINOS `docs/design-system/`
> 上游契约：2026-09-17 黑紫 Visual DNA（`latinDance` 分支 `codex/body-force-visual-system-v2-20260917` / `docs/design/visual-system/visual-dna-reference.md`）；`asset-prompt-guideline.md`
> 跨仓协调：product-hub#193；主线 latinDance#36

## 0. 适用范围声明（G 父线 2026-09-30 裁决）

- 黑紫基线适用：**latindance.top 主站 + 舞蹈内容子域**（五舞种 Topic Hub：`/rumba`、`/cha-cha`、`/samba`、`/jive`、`/paso-doble`）。
- 明确豁免：**silu.latindance.top 保持 ink-brass，不做对齐**；未来其他非舞蹈产品子域同理——先立豁免、再另行定规范，不自动继承本基线。

## 1. 颜色 Tokens

语义（继承 DNA §2）：`warm ivory / bone white` 外壳 ＋ `charcoal / black` 人体 ＋ `translucent lavender-violet` force language。以下数值为**提议值**，精确色板待本机视觉验收微调（见 §6）。

```css
:root {
/* 外壳：暖象牙白 */
--color-ivory-50: #FBF8F1; /* 页面底 */
--color-ivory-100: #F5F0E4; /* 次级面 */
--color-ivory-200: #E9E1D1; /* 分隔/描边底 */

/* 人体：炭黑（仅用于舞者人体，不做大面积底色） */
--color-charcoal-900: #141417; /* 人体主色 */
--color-charcoal-700: #2B2B31; /* 人体结构线 */
--color-charcoal-500: #55555E; /* 次级线条 */

/* force language：薰衣草紫（仅用于 ribbon / node / arc / axis overlay） */
--color-force-300: #B7ABDF;
--color-force-500: #8A76CC;
--color-force-700: #6350A8;
--force-alpha-soft: 0.14; /* 大面积 ribbon 填充 */
--force-alpha-mid: 0.32; /* ribbon 主体 */
--force-alpha-line: 0.72; /* node / axis 细线 */

/* 功能色 */
--color-text-primary: #1C1C20;
--color-text-secondary: #55555E;
--color-text-muted: #8A8A93;
--color-hairline: #E3DCCB; /* 细网格线 */
--color-focus-ring: #8A76CC; /* 键盘焦点环（force 紫，唯一允许进交互的紫） */
}
```

## 2. 字体 Tokens

DNA 要求：黑色高对比 serif headline ＋ 极简 sans label；museum-study / editorial。中西文配对决策如下（token 名稳定，具体字族可换，替换需保持"衬线标题/黑体标签"的角色不变）。

```css
:root {
/* 标题：衬线（英文 serif + 中文宋体系） */
--font-display: "Cormorant Garamond", "Noto Serif SC", "Songti SC", "SimSun", serif;

/* 标签/正文：黑体（克制） */
--font-label: "Inter", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;

/* 技术注脚：等宽（technical caption / 网格标注） */
--font-technical: "IBM Plex Mono", "Noto Sans Mono", monospace;
}
```

字阶（`clamp` 保证 editorial 大留白在移动端不塌）：

| Token | 字号 | 行高 | 字间距 | 用途 |
|---|---|---|---|---|
| `--text-display` | `clamp(2.5rem, 6vw, 4.5rem)` | 1.05 | -0.01em | 首页主标题（serif） |
| `--text-h1` | `clamp(1.75rem, 4vw, 2.75rem)` | 1.12 | 0 | Hub 标题 |
| `--text-h2` | `1.375rem` | 1.25 | 0 | 区块标题 |
| `--text-body` | `1rem` | 1.7 | 0 | 正文（sans） |
| `--text-label` | `0.8125rem` | 1.5 | 0.08em | 标签/按钮（sans，大写+字间距） |
| `--text-technical` | `0.75rem` | 1.6 | 0.04em | 技术注脚（mono） |

## 3. 间距与网格

- 基准：`--space-unit: 8px`；区块纵向节奏 `--space-section: clamp(64px, 10vw, 160px)`（大留白是 DNA 的一等特征，不压缩）。
- 网格：12 列；细网格线 `--color-hairline` 1px（DNA"细网格"）。
- 内容最大宽：`--measure-editorial: 72ch`（正文），`--measure-display: 1200px`（展示区）。

## 4. 反模式（硬规则，违反即 reject）

1. **禁整站紫色主题**（#193 §5）：紫色只出现在 force language overlay 与焦点环，不做底色、不做大面积色块。
2. 禁直接复制参考图的整页排版；禁把 `BODY FORCE` 海报标题本身作为网站视觉（DNA §3）。
3. 禁把淡紫色设成五舞种唯一色彩——五舞种差异走 ribbon geometry / emphasis，不走配色（DNA §4）。
4. 人物 raster 与 SVG/HTML force language 必须分层；禁把 ribbon / node / 文字 bake 进图片（prompt guideline §3）。
5. 上线页面视觉比例目标：80% HTML/CSS/SVG ＋ 20% raster（DNA §5）。

## 5. 与上游契约的对应关系

| 本 Token | 上游来源 |
|---|---|
| ivory / charcoal / force 紫 | DNA §2 Human Base / Force Language / Layout |
| serif headline + sans label + technical caption | DNA §2 Layout/Typography |
| 大留白 / 细网格 | DNA §2 |
| 反模式 1–5 | DNA §3、§5；#193 §5；prompt guideline §3 |

## 6. 待本机验证项

- §1 色板提议值的屏幕实测（Mac 实际渲染 + 与 charcoal 人体资产的叠加观感），G-latindance-3 本机验证时微调，回写本文件。
- `--font-display` 中文字族在真实标题字号下的观感（宋体系在小字号发虚问题），本机截图确认。
