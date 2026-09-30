# latindance.top 首页设计系统 · Color Roles v0.1

> 日期：2026-09-30
> 状态：草案（云端），进 LATINOS `docs/design-system/`（PR #2 追加 commit）
> 上游：Design Tokens v0.1（同目录）；2026-09-17 黑紫 Visual DNA；product-hub#193 §5

## 0. 适用范围声明（G 父线 2026-09-30 裁决）

- 黑紫基线适用：**latindance.top 主站 + 舞蹈内容子域**（五舞种 Topic Hub）。
- 明确豁免：**silu.latindance.top 保持 ink-brass，不做对齐**；未来其他非舞蹈产品子域先立豁免、再另行定规范，不自动继承本基线。
- 本文件只定义角色语义，具体色值见 Design Tokens；**角色 ≠ 色板**——同一角色在不同上下文可映射不同 token，但不许反向（不许拿 force 紫去画按钮底色）。

## 1. 角色定义

| 角色 | 语义 | 映射 token | 允许的上下文 |
|---|---|---|---|
| `surface` | 页面/卡片底 | `--color-ivory-50/100` | 全站底色、卡片、弹窗 |
| `surface-sunken` | 下沉分隔面 | `--color-ivory-200` | 分隔条、描边底、表格头 |
| `body` | 舞者人体 | `--color-charcoal-900/700` | **仅人体 raster / 人体结构线**，不做大面积底色、不做文字色以外的装饰 |
| `force` | 力语言 overlay | `--color-force-*` ＋ `--force-alpha-*` | ribbon / pressure node / rotation arc / axis / ground line（SVG/CSS 分层渲染，禁 bake 进图） |
| `text-primary` | 主文本 | `--color-text-primary` | 标题、正文 |
| `text-secondary` | 次文本 | `--color-text-secondary` | 说明、元信息 |
| `text-muted` | 弱文本 | `--color-text-muted` | 技术注脚、占位 |
| `line` | 细网格线 | `--color-hairline` | 网格、分隔线（1px） |
| `focus` | 键盘焦点环 | `--color-focus-ring` | **唯一允许进入交互态的紫色** |

## 2. 功能态的克制处理

DNA 是 museum-study / editorial 系统，不引入高饱和功能色体系：

- 成功/错误/警告：用 `text-primary` ＋ 文字说明表达，不另起红绿色板；图标用 charcoal 线条 иконка。
- 禁用态：`text-muted` ＋ 透明度，不用灰底大色块。
- 如未来确需语义色（表单校验等），另立提案，不在本基线内私自扩展。

## 3. 五舞种规则

- **五舞种不配独立主题色**。共享同一套角色，舞种差异只走 ribbon geometry / emphasis / pose（继承 DNA §4、prompt guideline §4–§8）。
- `force` 角色在五舞种 hub 中的允许变化：ribbon 长度/波形/方向、node 强调位置、arc 开合；不允许改色相。

## 4. 对比度基线

- `text-primary` / `text-secondary` on `surface` 须满足 WCAG AA（4.5:1）；`text-muted` 仅用于非关键信息。
- 精确对比度实测标（G-latindance-3 本机截图 + 工具测量后回写）。

## 5. 反模式（违反即 reject）

1. 整站紫色主题（#193 §5）。
2. `body`（炭黑）做整页底色——炭黑只属于舞者人体。
3. `force` 紫做按钮、徽章、导航高亮等 UI 装饰。
4. 给某舞种发明专属主题色。
5. 在 `surface-sunken` 上再压一层半透明 force 紫"营造氛围"。
