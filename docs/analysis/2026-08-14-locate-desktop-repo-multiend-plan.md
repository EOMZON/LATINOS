# 定位你之前的「电脑版」拉丁舞仓库 + 多端（手机/桌面）推进计划

> 路由器：`skill-orchestration-router` → `best-minds`（定位/对比/方案）+ 文件系统检索（证据）
> 日期：2026-08-14 · 主题：把"之前只做电脑端"的拉丁舞动作监测，推进到桌面+手机多端，并明确部署

---

## 0. 一句话结论

你之前做的「电脑版本」就是 **`mediePipe`**（Python + 老版 MediaPipe），而且**它和你想对比的 MediaPipe Pose 其实是同一个东西**——你早就已经选了 MediaPipe。真正的问题不是"选不选 MediaPipe"，而是"**用哪个 MediaPipe + 哪种架构**才能方便地多端"。

答案已经现成：**LATINOS 工作区里的 `skeleton-live` 用的就是新版 Tasks Vision `PoseLandmarker`（2D/3D 轻量、GPU 加速、Web/Android/iOS 统一）**，是最适合多端的那一个。直接以它为底座，把 `mediePipe` 里真正有用的舞步识别/节拍器逻辑搬过来即可。

---

## 1. 定位到的仓库（具体路径）

| 仓库 | 路径 | 技术栈 | 状态 | 角色 |
|---|---|---|---|---|
| **mediePipe** ⭐你的电脑版 | `/Users/zon/Desktop/MINE/9_latin/latin_SYSTEM/mediePipe` | Python Flask + **老版** `mp.solutions.pose` | 功能最全 | 桌面端 MVP（本地 localhost:8080） |
| v0-latin-dance | `/Users/zon/Desktop/MINE/9_latin/latin_SYSTEM/v0-latin-dance` | Next.js + TS + **老版** `@mediapipe/pose`(CDN) | 已部署 Vercel | 浏览器版，但仍是 legacy API |
| **skeleton-live** ✅多端样板 | `/Users/zon/Desktop/LATINOS/apps/demos/skeleton-live` | **Vite + React + 新版 `@mediapipe/tasks-vision`** | 现有 demo | **多端最佳底座** |
| latin-dance-game | `/Users/zon/Desktop/LATINOS/apps/demos/latin-dance-game` | 同 skeleton-live 现代 stack | 现有 demo | 同底座 |
| frontdoor | `/Users/zon/Desktop/LATINOS/sites/frontdoor` | Next.js（Latin Dance OS 入口） | 现有 | 统一入口候选 |

**`mediePipe` 里有什么（值得搬的价值）**：
- `src/skeleton_detector.py`：33 关键点骨骼（老 API）
- `src/moves/`：**真实拉丁舞步识别器** `basic_step` / `spot_turn` / `sliding_doors` / `cucaracha`（这是别处没有的核心资产）
- `src/focus_detector.py`：face_mesh 专注检测
- 节拍器 `generate_metronome_audio.py`
- 但不便移动：检测在**服务端**跑，前端 Base64 传帧 → 手机要连局域网 IP + HTTPS 才能用摄像头，实际不可用。

---

## 2. 对比：之前实现 vs MediaPipe Pose（2D/3D 轻量）

### 2.1 你"之前实现"和 MediaPipe 的关系
`mediePipe` / `v0-latin-dance` 用的就是 MediaPipe（BlazePose 33 点）。所以不是二选一，而是**同一样东西的两个时代**：

| 维度 | 老版 `@mediapipe/pose` / `mp.solutions.pose`（mediePipe / v0 用） | 新版 **Tasks Vision `PoseLandmarker`**（skeleton-live 用） |
|---|---|---|
| API 代际 | Solutions API（维护模式，官方不再主推） | Tasks Vision（当前主推，活跃维护） |
| 多端一致性 | Web 能用，但打包/wasm 重、CDN 依赖 | **Web / Android / iOS 同一模型同一 API** |
| 性能 | 一般 | GPU delegate（失败回退 CPU），lite 模型手机实时 |
| 2D / 3D | 2D + 近似 3D | **2D + 3D world landmarks**（full 模型） |
| 模型体积 | 较大 | `.task` float16，更小（lite/full 可选） |

**结论：Multi-end 便利性上，新版 `PoseLandmarker` 明显更方便。** 你纠结的"哪个更方便"——答案就是这个已经在 LATINOS 里的现代版。

### 2.2 架构对比（更关键）
- **Python 服务端**（mediePipe）：检测在服务器，手机端摄像头基本不可用 → **不适合多端**。
- **浏览器端**（v0 / skeleton-live）：检测在客户端，手机直接开同一 URL（HTTPS 下 `getUserMedia` 可用）→ **天然多端**。

所以"多端最方便" = **浏览器端 + 新版 PoseLandmarker**（skeleton-live 现成样板）。

---

## 3. 多端推进计划（方案）

### 阶段 0 · 先跑起来看现状（半天）
- 进 `LATINOS/apps/demos/skeleton-live`，`npm install && npm run dev`，开 `localhost` 摄像头验证 33 点骨骼 + 实时性。
- 同时 `cd` 到 `mediePipe` 跑 `python3 run_web_app.py` 回忆一下旧版的舞步识别/节拍器长啥样，盘点要搬的功能清单。

### 阶段 1 · 合并价值（1–2 天）
- 把 `mediePipe/src/moves/*`（basic_step/spot_turn/sliding_doors/cucaracha 识别器）+ 节拍器 + 专注检测，**移植到 skeleton-live 的客户端架构**（用 PoseLandmarker 输出的 landmarks 驱动，不再走 Python 服务端）。
- `mediePipe` 的 Python 部分只保留为**可选离线批量分析后端**（重计算/录像分析），不进移动路径。
- 参考 `v0-latin-dance` 已写的 `analyzePose`（姿态打分/建议）逻辑，合并进新架构。

### 阶段 2 · 多端化（1 天）
- skeleton-live 做成**响应式 + PWA**（manifest + service worker，或至少"添加到主屏幕"可用）。
- 一套代码覆盖桌面 + 手机；相机在 HTTPS 下自动可用。
- 移动端性能：默认 `lite` 模型 + GPU delegate；需要更准时切 `full`。

### 阶段 3 · 部署（半天）
- `npm run build` → `dist/` 静态产物。
- 部署到 **Vercel / Netlify / EdgeOne Pages**（均免费给 HTTPS，满足摄像头安全要求）。v0 已在 Vercel，可沿用。
- 模型 `.task` 与 wasm **自托管**（放站点静态目录，不走 Google storage 外链）→ 离线可用 + 隐私，契合上一轮"无外网/隐私"方向。
- ⚠️ 遵循 LATINOS `AGENTS.md` 域名护栏：不要动 `latindance.zondev.top` 生产指向，走 preview / parallel 部署。

### 阶段 4 · 可选原生 App（不紧急）
- 若真要上 App Store：Tasks Vision `PoseLandmarker` 同模型可跑 Android/iOS，用 Capacitor 套壳或 React Native 复用，v1 不必做。

---

## 4. 部署要点（防踩坑）

1. **摄像头必须 HTTPS**：prod 环境 `getUserMedia` 只在 HTTPS（或 localhost）可用。本地 dev 用 localhost 即可，上线必须 HTTPS 平台。
2. **模型/wasm 自托管**：避免运行时强依赖 Google storage / jsdelivr（外网、隐私、离线）。
3. **移动端性能**：lite 模型 + GPU delegate；full 仅在需要 3D 精度时切。
4. **不破坏体验**：保持纯浏览器/无穿戴，与"单手表+手机"约束一致（见上一轮分析）。
5. **参考级反馈**：沿用上一轮结论——DTW/关节角偏差对比标准动作 + 逆动力学推发力，不要包装成裁判级。

---

## 5. 反方 / 风险

- **旧版 legacy API 已被官方边缘化**：新项目别再基于 `@mediapipe/pose`，统一切 Tasks Vision。
- **mediePipe 服务端架构别往移动端硬搬**：手机摄像头 + 局域网 IP 的坑很多，直接放弃该路径。
- **移植舞步识别器的成本**：mediePipe 的识别器是 Python + 老 landmarks 索引，搬到 TS 客户端要重写坐标映射（33 点索引在两版一致，迁移可控）。
- **skeleton-live 当前可能只是 demo 骨架**：需先确认它是否已含完整 UI/反馈，再决定是在它之上加功能还是另起 `dance-os-demo`。

---

*证据：直接读取仓库 README / package.json / 源码（`mediePipe/README.md`、`v0-latin-dance/package.json`、`lib/pose-detector.ts`、`skeleton-live/src/lib/pose.ts`、`skeleton-live/src/lib/bodyPose.ts`、LATINOS `apps/demos` 目录枚举）。所有结论基于真实文件，非推断。*
