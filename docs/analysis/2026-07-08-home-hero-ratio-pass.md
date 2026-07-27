# 2026-07-08 Home Hero Ratio Pass

## 背景

在 `Daily Latin` 连续几轮被收短之后，整站当前最明显还没贴近参考稿的位置，重新集中回了首页 hero。

参考锁定仍然是：

- `/Users/zon/Downloads/latin-workbench (2).html`

这一轮不是继续发散改别的页，而是只做一件事：

- 把首页 hero 的比例和呼吸感继续往参考稿靠

## 问题定义

这轮开始前，首页 hero 最明确的差距是：

1. 左右块比例还不对
2. hero 总高度偏短
3. 右卡圆环偏小
4. `当前阶段` session 区太薄
5. 左卡内部字级和上下留白仍有一点压缩感

从桌面端量化结果看，改前大致是：

- hero 总高：`313.94`
- 左卡宽：`550.02`
- 右卡宽：`517.98`
- ring：`150`
- live session 高：`47.94`

而参考稿是：

- hero 总高：`377`
- 左卡宽：`580.80`
- 右卡宽：`475.19`
- ring：`170`
- live session 高：`61`

所以真正要解决的不是“再加一点装饰”，而是：

**让首页 hero 回到更接近参考稿的结构比例，同时不破坏当前已经收紧过的下半屏节奏。**

## 这轮动作

改动文件：

- `/Users/zon/Desktop/LATINOS/sites/frontdoor/styles/workbench.css`

### 1. hero 栅格比例直接对齐参考

动作：

- `grid-template-columns` 从：
  - `1.03fr .97fr`
- 改成：
  - `1.1fr .9fr`
- `gap` 从：
  - `16px`
- 改成：
  - `28px`

意义：

- 左卡拿回应有宽度
- 右卡收回过宽问题
- 整个 hero 更接近参考稿的主从关系

### 2. 左卡重新拉出纵向呼吸

动作：

- 左卡 padding 增加
- `min-height` 提高
- `day-row` 改回更接近 baseline 的关系
- `PHASE 1.5` 的 line-height 提高
- `phase note / tag / desc / stat strip` 的字级与间距一起上调

意义：

- 左卡不再像被压扁的工程面板
- 更接近参考稿那种：
  - 主字
  - 旁注
  - 主句
  - 说明
  - stats
  的完整层次

### 3. 右卡恢复参考稿式的 ring + session 比例

动作：

- 右卡 padding 提高
- `justify-content` 改成更接近居中分布
- ring 从：
  - `150`
- 改到：
  - `170`
- `live-session` 的 top padding、标题和 value 字级一起上调
- hero CTA 单独加大，而不是顺手放大全站按钮

意义：

- 右卡不再显得“上面一个小圆环，下面一条很薄的状态条”
- 更接近参考稿里：
  - 上半段 ring
  - 下半段 session + CTA
  的完成感

### 4. 手机端只做保守同步，不追求盲目放大

动作：

- 手机端 hero gap 恢复到更合理的纵向节奏
- 左右卡 padding 小幅增加
- ring 从：
  - `132`
- 提到：
  - `140`
- `live-session` 略增厚

意义：

- 保持桌面端和手机端语言一致
- 但不把手机端直接做成参考稿那种更夸张的大体量

## 量化结果

### 桌面端

这轮后实测：

- hero 总高：`357.80`
- 左卡宽：`580.80`
- 右卡宽：`475.19`
- ring：`170`
- live session 高：`55`

对比改前：

- hero：`313.94` -> `357.80`
- 左卡宽：`550.02` -> `580.80`
- 右卡宽：`517.98` -> `475.19`
- ring：`150` -> `170`
- live session：`47.94` -> `55`

对比参考稿：

- 左右宽度已经贴近到几乎同值
- ring 已直接对齐参考值
- hero 总高与 session 厚度仍略低于参考，但差距已明显缩小

### 手机端

这轮后实测：

- hero 总高：`564.50`
- ring：`140`
- live session：`45.83`

对比改前：

- hero：`549.98` -> `564.50`
- ring：`132` -> `140`
- live session：`43.11` -> `45.83`

## 视觉证据

当前桌面端截图：

- `/tmp/latinos-home-after-hero-pass.png`

当前手机端截图：

- `/tmp/latinos-home-after-hero-pass-mobile.png`

这轮前桌面端截图：

- `/tmp/latinos-home-before-hero-pass.png`

参考稿桌面端截图：

- `/tmp/latinos-reference-current-check.png`

## 验证

这轮之后已通过：

- `pnpm verify`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:routes`
- `FRONTDOOR_BASE_URL=http://127.0.0.1:3200 pnpm smoke:browser`

额外确认：

- 桌面端首页 hero 可见且未回退
- `Dance OS` 交互 smoke 继续通过
- `Daily Latin` 交互 smoke 继续通过
- mobile shell 继续正确切换
- mobile home / daily 页面没有横向 overflow

## 这轮后的判断

这轮的价值很高，因为它不是“再润一点 hero 文案”，而是把当前首页和参考稿之间最明确的结构差距压掉了一大块。

当前首页 hero 已经明显更接近参考稿，尤其是在：

- 左右宽度关系
- 圆环大小
- 右卡整体完成感
- 左卡主字与 stats 的纵向节奏

## 剩余差距

当前仍然不能宣称完成。

还剩下的差距更细，主要在：

1. hero 总高度仍略低于参考
2. `当前阶段` session 区仍比参考薄一点
3. 整页顶部 `topline -> hero` 的最终完成感还差最后一层微调

## 下一步

下一轮最值得做的仍然是首页，但不再是大改。

优先级：

1. 再看是否只需 very small pass 就能把 hero 高度和 session 厚度再贴近一点
2. 然后做整站一致性 sweep：
   - `/`
   - `/daily-latin`
   - `/dance-os`
   - mobile shell
3. 在新的基线下继续做内容回填，而不是一直停在视觉比对
