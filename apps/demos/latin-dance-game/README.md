# Latin Fever · 拉丁舞动(latin-dance-game)

Just Dance(舞动全开)式的拉丁舞游戏化跟练 demo。
Vite + React + TypeScript + Tailwind + 浏览器内 MediaPipe Pose Landmarker
(33 关键点,**只保留身体 11–32 号点,不做任何面部识别/渲染**,全部本地运算不上传)。

引擎层(模型/wasm 本地化、One Euro Filter 治抖、跟练打分、关键姿态提取、参考缓存)
复用自同仓 `apps/demos/skeleton-live`,本 demo 在其上重写了完整游戏 UI 层。

## 运行

```bash
npm install
npm run dev                  # 默认端口 3000
npm run dev -- --host --port 3001   # 支持参数透传(局域网调试 / 换端口)
npm run build                # 生产构建(tsc -b && vite build)
npm run precompute           # 离线预提取参考视频姿态(见「如何新增一个模式」)
```

**参考视频已预提取**:`public/references/58_raw.poses.json`(lite 模型 + 中档平滑 +
2 帧采样,698 帧 / 35 个关键姿态),页面打开秒级载入;替换或新增视频后重新跑
`npm run precompute` 即可(需要系统装有 Chrome / Chromium / Edge,脚本自动检测)。

摄像头功能需要 **localhost 或 https** 环境。模型与 wasm 均已本地化:

- `public/wasm/` — MediaPipe vision wasm 运行时
- `public/models/pose_landmarker_lite.task`(5.8 MB,默认,省性能)
- `public/models/pose_landmarker_full.task`(9.4 MB,更准)

本地模型缺失时自动回退 MediaPipe 官方 CDN(角标会标注「CDN 模型」)。

## 游戏流程

1. **标题屏** →「开始跳舞」
2. **开场引导**(首次自动进入,之后可在模式选择页点「重新引导」;每一步都可跳过):
   - **摄像头权限引导**:说明用途(只识别身体、本地运算不上传)
   - **站位引导**:屏幕显示半透明人形站位轮廓,实时检测肩/腕/髋/膝/踝是否入镜,
     **中文语音部位级播报 + 远距离可读大字**引导(「右手没入镜」「退后一点」),
     站好后 3-2-1 倒计时(详见「站位引导」一节)
   - **动作教学**:骨架教练演示 3 个基础姿态(拉丁站姿、手臂打开、重心换腿),
     跟做达标(复用打分特征,阈值放宽到 55 分并保持 0.8s)才进入下一步
3. **模式选择** → 卡片选模式 → 曲目信息(时长/关键动作数/难度)→ 开始
4. **游戏中**:预告泳道 + 判定弹字(PERFECT/GREAT/GOOD/MISS)+ 连击 + 实时分数 + 进度条 + 部位染色,可暂停/退出(Esc)
5. **结算屏**:总分 + 评级(SS/S/A/B/C)+ 星星(1–5)+ 判定统计 + 最大连击 +
   做得最好/最需要练的动作 top3 + 再来一次/返回

## 模式列表(注册表驱动)

| 模式 | 玩法 | 说明 |
| --- | --- | --- |
| 58 号示范 · 全程跟练 | follow | 伦巴基本步,46.5s 完整跟练,关键动作逐个判定 |
| 分段章节练习 | chapters | 58 号示范自动切成 9s 一章,逐段练习、逐段给星(3 星制),≥1 星解锁下一章,进度存 localStorage |
| 闯关模式 | challenge | 每个关键动作是一道关卡,MISS 满 3 次失败重开,结算显示闯过关数 |
| 自由模式 | free | 无参考、不打分,纯骨骼可视化 |
| 直播模式 | live | 纯 `#00ff00` 绿幕骨骼输出(供 OBS 色度抠像),叠加实时判定特效(判定文字非绿色,抠像后保留);判定参考为 58 号示范,循环播放 |
| 恰恰基本步 · 待补充 | 占位卡 | 点击显示解锁说明 |
| 牛仔 · 待补充 | 占位卡 | 点击显示解锁说明 |

## 视觉风格(三套紫色系 skin)

同一套功能、三套视觉方向,**token 化切换**(一套 skin = `src/index.css` 里一组
`[data-skin]` CSS 变量),运行时切换不刷新页面,选择持久化到 localStorage
(`latin-dance-game:skin`),默认第 1 版。

| skin | 方向 | 底 | 主色 | 点缀/氛围 |
| --- | --- | --- | --- | --- |
| `esports` 深紫电竞(默认) | 游戏感最强 | `#0b0714` 深灰近黑 | `#a855f7` 饱和紫 | `#c084fc` 霓虹紫高光 + 细网格氛围 |
| `light` 浅紫简约 | 最接近「简约时尚」 | `#f7f5fc` 近白淡紫灰 | `#7c3aed` 紫 | `#8b5cf6` + 柔光晕、大留白 |
| `stage` 紫金舞台 | 拉丁味最足 | `#120a1c` 深底 | `#9333ea` 紫 | `#f5c542` 金色 + 顶部聚光渐变 |

- **切换入口**:标题屏「视觉风格 · 点卡即换装」三张缩略卡(用各 skin 真实配色预览,
  点即整套界面即时换装);模式选择页顶栏有同款分段控件。
- **判定色是功能色,与主题色分层**:PERFECT 金 `#f5c542`、GREAT `#2dffc4` /
  GOOD `#67e8f9`(绿青系)、MISS 红 `#ff4d5e`,三套 skin 下保持一致,
  定义在 `src/game/judgments.ts`,不参与换肤。
- **实现**:所有界面(标题/引导/模式选择/游戏 HUD/结算)统一使用语义类
  (`.sk-scene/.sk-card/.sk-btn/.sk-title/.sk-lane/.sk-fill` 等,见 `index.css`),
  画布绘制场景(泳道当前卡、骨架教练、自由模式)通过 `cssVar('--accent')`
  读取当前主题色;已去掉随机光斑动效,换成各主题统一、克制的氛围层。
- 预览截图:`docs/skin-previews/`(title-/modes-/onboarding-stand- 各张)。

## 站位引导(语音 + 大字,远距离可用)

站位引导按「人站 2–3 米外、看不清屏幕小字」的场景设计,**语音为主、大字为辅**:

- **TTS 中文语音,部位级播报**:用 `speechSynthesis` 直接说出问题部位与方向——
  「右手没入镜」「左脚没有看见」「退后一点」「向左站一点」「站好了」,以及
  倒计时数字和教学指令(「跟我做,拉丁站姿」「做到了」)。中文 voice 优先
  (xiaoxiao/ting/mei 等,找不到回退任意 zh voice),语速 1.05。
- **播报触发逻辑**:`evaluateStand()` 每帧产出 `speech` 签名,**状态变化才播**;
  voice 层再做同文 2s 去重。播报分两级:important(「站好了」/倒计时/教学指令)
  会 cancel 打断当前播报;normal 不打断进行中的 important(直接丢弃),不吵。
  首次播报挂在「允许摄像头」点击之后,满足浏览器自动播放策略。
- **语音开关**:站位步与教学步右上角 pill(🔊/🔇),持久化到
  localStorage(`latin-dance-game:voice`),默认开。
- **静默降级**:无 `speechSynthesis`、无可用 voice、或播报报错时全部静默跳过,
  纯视觉引导照常工作,不影响流程。
- **大字规范(10-foot UI)**:主提示 `clamp(40px, 6vw, 64px)` 加粗高对比 pill,
  方向箭头 72px 脉动,一句话原则(主提示 + 一行次级小字);站好锁定后轮廓变
  accent 实线 + 发光 + 头部进度弧,并播 confirm 双音(784+1175Hz)。
- **部位级视觉反馈**:轮廓上 10 个部位状态点(左右肩/腕/髋/膝/踝)——
  入镜绿点 `#2dffc4`,未入镜红点 `#ff4d5e` 正弦闪烁,远处一眼看出缺哪。
- **阈值可调**:判定阈值集中在 `src/game/standGuide.ts` 的 `STAND_THRESHOLDS`
  (可见度 0.5 / 肩宽距离区间 0.13–0.45 / 水平容差 0.08 / 上下边缘),
  判定优先级:部位缺失(最多报 2 个)> 距离 > 边缘 > 水平偏移。

## 如何新增一个模式

模式系统由 `src/modes/registry.ts` 驱动,**3 步**:

1. **放视频**:把示范视频(全身出镜、建议 30–60s、mp4)放进 `public/references/`,例如 `chacha_basic.mp4`
2. **注册表加记录**:打开 `src/modes/registry.ts`,在 `MODES` 数组里加一条:

   ```ts
   {
     id: 'follow-chacha',                 // 全局唯一
     name: '恰恰基本步 · 全程跟练',
     dance: '恰恰',                        // '伦巴' | '恰恰' | '桑巴' | '牛仔' | null
     difficulty: 1,                        // 1–3 星
     kind: 'follow',                       // follow | chapters | challenge | free | live
     referenceId: 'references/chacha_basic.mp4',
     description: '一句话玩法说明,会显示在卡片和详情里。',
   },
   ```

3. **跑离线预提取**(强烈推荐):

   ```bash
   npm run precompute
   ```

   脚本会用系统 Chrome(headless)在浏览器环境里跑与线上一致的 MediaPipe 提取
   (lite 模型 + One Euro Filter 中档 + 每 2 帧采样),为 `public/references/` 下每个视频
   产出 `<视频名>.poses.json`(姿态序列 + 关键姿态 + 参数指纹)。
   之后页面打开**秒级载入,不再在浏览器里提取**。
   没跑预提取也没关系:首次打开会自动退回浏览器内实时提取(10–20s)并写 localStorage 缓存。

### 加载链与指纹校验

`src/game/referenceLoader.ts` 的加载优先级:

1. **预计算 JSON**(`references/xxx.poses.json`):存在且**参数指纹**与当前设置一致才命中——
   指纹包含平滑档 / 模型 / 采样步长(预提取固定为 中档 + lite + 2 帧,所以只有当前设置也是
   默认值时才命中;你切了「强」档或 full 模型会自动走下面的链路),并用 HEAD 请求对比
   **视频文件大小**,防止视频被替换后误用旧姿态。命中时界面显示「参考已就位 ✓」。
2. **localStorage 缓存**:此前浏览器内提取的结果(含非默认平滑档/模型的组合)。
3. **浏览器内实时提取**:兜底,10–20s,完成后写 localStorage。

视频内容变了(同名替换)大小通常会变 → 预计算自动失效;保险起见也可以重新跑
`npm run precompute` 覆盖。localStorage 缓存清法:DevTools → Application →
Local Storage → 删 `skeleton-live:ref:v1:*` 开头的项。

## 判定与打分说明

- **特征**:只用身体关键点计算 9 维关节角度特征(左右肩/肘/髋/膝夹角 + 躯干倾斜角),
  以双髋中点为原点、肩宽为单位长度归一化,消除身高/站位影响;镜像只是显示层变换。
- **帧分**:每个特征角度差 `d` 映射为 `max(0, 100 × (1 − d/90°))`,9 维等权平均;
  界面显示分用 0.5s 滑动平均防抖。
- **关键动作判定**:每个关键姿态时刻 ±0.3s 窗口内的平均分 →
  PERFECT ≥85 / GREAT ≥70 / GOOD ≥50 / MISS <50(窗口内未入镜也算 MISS)。
- **连击**:PERFECT/GREAT/GOOD 连击 +1,MISS 清零。
- **评级**:全程平均分 → SS ≥92 / S ≥85 / A ≥75 / B ≥60 / C;星星 1–5。
- **章节星**:章节平均分 → 3 星 ≥88 / 2 星 ≥68 / 1 星 ≥50,≥1 星解锁下一章。
- **部位染色**:左臂/右臂/左腿/右腿/躯干平均角度差 <15° 青绿,15–30° 黄,>30° 红。
- 任一打分所需关键点 visibility < 0.5 的帧跳过不计分,并提示「未识别到完整身体」。

## 平滑档位(One Euro Filter,治抖动红线)

对 22 个身体关键点的 x/y 各维护一个 One Euro Filter(慢速强平滑压抖动、
快速降低截止频率跟动作),应用在实时渲染、参考提取、打分特征三处。
默认 **「中」档**,模式选择页可切换:

| 档位 | minCutoff | beta | 说明 |
| --- | --- | --- | --- |
| 关 | — | — | 原始坐标(抖,不建议) |
| 轻 | 1.7 | 0.020 | 最跟手 |
| 中(默认) | 1.0 | 0.007 | 推荐 |
| 强 | 0.5 | 0.003 | 最稳,快速动作略拖影 |

visibility < 0.5 的点该帧跳过滤波;连续丢失约 12 帧后重现会重置该点滤波器,防止飞线。

## 手机使用

- 布局响应式:手机上画布全屏,卡片与按钮为触屏尺寸,模式详情为底部弹出抽屉。
- **手机浏览器要求 https 才能开摄像头**,局域网 `http://192.168.x.x:3000` 会被拦截。
  正确姿势:`npm run build` 后部署到支持 https 的平台(Vercel / Netlify 等),
  或本机 `npm run dev -- --host` 配合自签证书 / 反向代理。
- 首次加载建议保持默认 lite 模型。

## 直播模式(OBS)

1. OBS 添加来源 → 浏览器(Browser Source),URL 填本页地址
2. 进入「直播模式」:画面变为纯绿幕 + 骨骼 + 判定特效
3. OBS 给浏览器源加「色度键」滤镜抠掉绿色,骨骼和 PERFECT/COMBO 特效就叠在你的摄像头画面上了
4. Esc 或右下角按钮退出

## 已知限制

- 同步跟练对节奏错位敏感:跳慢了判定会掉,因为比的是「当前时刻」的参考帧(v0 不做 DTW)。
- 2D 图像平面角度对朝向摄像机的旋转(前后转身)不敏感,z 轴深度未参与特征。
- 预计算 JSON 只在默认提取参数(中档平滑 + lite 模型)下命中;切换平滑档或模型后
  会退回 localStorage 缓存 / 实时提取(这是指纹校验的预期行为)。
- 浏览器内实时提取已降级为兜底路径(未跑 `npm run precompute` 且缓存未命中时才触发)。
- 教学引导的 3 个目标姿态是手工构造的归一化姿态,阈值已放宽,但站位太远/太暗时
  仍可能匹配不上,可以点「跳过这个动作」。
- 章节按固定 9s 切分,没有按音乐节拍对齐;后续可换成按关键姿态密度切。
- 音效为 WebAudio 简单合成,首次用户点击后才启用(浏览器自动播放策略)。

## 目录结构(新增部分)

```
scripts/precompute-references.mjs  # 离线预提取:临时 vite + headless 系统 Chrome 跑 MediaPipe,写 poses.json
precompute.html                    # 预提取专用页(仅 dev server 用,不进生产构建)
public/references/58_raw.poses.json # 预计算产物:姿态序列 + 关键姿态 + 参数指纹
src/
  game/
    engine.tsx          # 姿态引擎 Provider:摄像头 + 推理循环 + 平滑 + FPS/模型状态
    referenceLoader.ts  # 加载链:预计算 JSON → localStorage → 实时提取兜底(含指纹校验)
    judgments.ts        # PERFECT/GREAT/GOOD/MISS、评级、星星
    drawing.ts          # 骨骼/幽灵/姿态图示画布绘制
    tutorial.ts         # 教学引导的 3 个目标姿态(手工构造)
    progress.ts         # 章节进度持久化
    audio.ts            # WebAudio 合成音效(含 confirm 锁定音)
    voice.ts            # TTS 语音引导(zh voice 优先 / 2s 去重 / important 打断 / 开关持久化)
    standGuide.ts       # 站位判定:STAND_THRESHOLDS + 10 部位映射 + evaluateStand()
    types.ts            # 屏幕路由与结算数据类型
  modes/registry.ts     # 模式注册表(新增模式只改这里)
  screens/              # Title / Onboarding / ModeSelect / Game / Free / Live / Results
  components/           # SkeletonFigure(小型骨架图示)、StatusBadge(FPS/模型角标)
  lib/                  # 复用 skeleton-live 引擎层(pose/bodyPose/keyPoses/oneEuroFilter/refCache/reference)
  precompute.ts         # 预提取页逻辑(与 referenceLoader 兜底提取同参数)
```
