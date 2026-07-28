# 更密集人体姿态表示调研(浏览器端拉丁跟练 demo)

日期:2026-07-28
背景:demo 现用 MediaPipe Pose Landmarker 33 点(11-32 身体点),用户反馈「骨骼点太少,看不出胯部旋转/肌肉发力」。本文调研更密的姿态表示与浏览器端实时方案。

## 1. 更密的姿态表示盘点

| 表示 | 点数 | 覆盖 | 精度/速度要点 | 来源 |
|---|---|---|---|---|
| COCO / MoveNet | 17 | 无手/脚细节,脚只有 ankle | MoveNet Lightning/Thunder 在现代笔记本/手机均 30+ FPS;训练数据含 Google 内部 Active 数据集(yoga/fitness/dance 视频标注),对舞蹈类运动模糊更稳 | TensorFlow blog "Next-Generation Pose Detection with MoveNet and TensorFlow.js" (2021) |
| OpenPose BODY_25 | 25(+手/脸可扩到 135) | 脚有 heel/big_toe/small_toe | Caffe 时代重型模型,无第一方 Web 支持;非商用 license,商用不可用 | OpenPose 项目(CMU) |
| BlazePose(33) | 33 | 手:每手 pinky/index/thumb 3 点;脚:heel + foot_index(对拉丁脚步很关键);脸 10 点 | tasks-vision 有 lite/full/heavy 三档;heavy 精度明显高于 full;输出含 3D world landmarks(米制,髋中心原点) | MediaPipe Pose Landmarker 文档;tfjs-models/pose-detection README |
| BlazePose GHUM(TFJS) | 33(2D/3D)+ 可选分割 | 同上,3D 基于 GHUM 参数化身体模型(BlazePose GHUM, CVPR 2020) | TFJS 官方基准(MBP 2019 i9 + Vega 20):MediaPipe runtime lite/full/heavy = 70/59/31 FPS;桌面 i9-10900K + GTX1070 = 123/112/70 FPS。分割可关闭提速 | TensorFlow blog "3D Pose Detection with MediaPipe BlazePose GHUM and TensorFlow.js" (2021) |
| MediaPipe Holistic | 543 = 33 pose + 468 face + 2×21 hand | 全手指关节、全脸 | 对舞蹈只需手+pose 部分;脸 468 点是冗余开销;旧版 solutions 文档明示 | MediaPipe docs/solutions/holistic.md |
| COCO-WholeBody / RTMW | 133 = 23 body + 68 face + 2×21 hand + 6 foot(脚趾) | 目前最全 2D 标注体系,脚含 toe 点 | RTMW-l 在 COCO-WholeBody val 70.1 mAP;RTMPose-m wholebody ORT 延迟 13.5ms(i7-11700 CPU,≈74 FPS) | MMPose RTMPose 项目 README(arXiv:2303.07399) |
| DensePose(Facebook) | UV 稠密对应(非关键点,≈ 每像素表面对应) | 全身表面 | 基于 Detectron2 + GPU 推理,无可行的浏览器 runtime;不适合 | DensePose 项目(facebookresearch) |
| SMPL/SMPL-X 3D 路线 | 24(SMPL)/~52(含手指)关节,旋转+位移 | 学术界舞蹈动作标准表示 | 需多目或重型回归模型;浏览器单目实时不现实 | SMPL (Loper 2015);AIST++/FineDance 数据集 |

## 2. 浏览器端实时可行性(2026 现状)

### 2.1 MediaPipe Holistic 在 tasks-vision 的可用性 —— 重要更正
- 旧认知:「Holistic 只有旧版 solutions」。实际上 **HolisticLandmarker 自 @mediapipe/tasks-vision v0.10.10(2024-02)起已进 tasks API,含 Web JS**(npm 官方 README 有 HolisticLandmarker 示例代码;GitHub issue #5154 确认 v0.10.10 可用)。
- 但有坑:Web GPU delegate 下 outputFaceBlendshapes 会报 UNIMPLEMENTED(issue #5576);Holistic 在笔记本上是 pose+face+hands 三个模型串行,延迟约为单独 Pose 的 2-3 倍,老机器可能掉到 15-25 FPS。
- 结论:要手指可用 tasks-vision 的 **HandLandmarker(21 点/手)与 PoseLandmarker 并行跑**,比整个 Holistic 更省(不需要脸)。

### 2.2 各方案浏览器性能
- **MediaPipe Pose Landmarker(tasks-vision)**:唯一第一方浏览器支持;heavy 模型是现成的精度升级位(免换框架)。来源:@mediapipe/tasks-vision。
- **TFJS MoveNet**:17 点,无脚/手细节,点数比我们现有还少;只是换引擎,不解决诉求。其优势是舞蹈训练数据,但点数硬伤排除。
- **TFJS BlazePose GHUM**:33 点同构,可换 heavy + 拿 3D + 分割,但与我们现有 MediaPipe 路线无本质增益。
- **RTMPose/RTMW(ONNX Runtime Web)**:有真实 Web demo:哈佛 EZ-MMLA RTMPose 工具(浏览器 ONNX Runtime Web,WASM 后端,RTMPose-s 22MB + RTMDet-nano 3MB,实时摄像头);konyshevgmbh/pose_estimation_flutter(GitHub Pages live demo,RTMPose-t 17 点 Web)。RTMW-m(133 点)ONNX 已导出,桌面 CPU ORT 13.5ms,浏览器 WASM 预计 30-60 FPS 可达,但无官方 JS 管线,需要自己写检测→裁剪→SimCC 解码,工程量中等偏大。
- **OpenPose / DensePose / SMPL 回归**:浏览器端不可行(重型框架、无 Web runtime 或 license 问题)。

## 3. 拉丁舞场景特殊性

- **快速旋转 + 运动模糊**:MoveNet 官方明确针对 fitness/dance 运动模糊训练(Active 数据集);MediaPipe 靠 tracking ROI 复用抗快速动作(BlazePose 论文管线)。任何单帧 2D 模型在 360° 转身时都会丢失部分点 —— 这是 2D 单目的上限,不是点数问题。
- **脚步细节**:BlazePose 33 点已含 heel/foot_index(29-32),是 17 点 COCO 系没有的;COCO-WholeBody/RTMW 进一步有 6 个 foot 点(heel/big_toe/small_toe 左右脚)。拉丁的脚跟-脚尖滚动在 33 点里有基础信号,但踩地时机(foot contact)需要从时序速度推导,不是加点能给的。
- **胯部扭转**:这是用户抱怨的核心,但 **2D 关键点的髋部只有两个点(23/24),骨盆旋转(yaw)在正面视角几乎不可见**。学术界舞蹈数据(AIST++ 用 24 关节 SMPL 旋转参数,60 FPS,1363 序列;FineDance 用 52 关节含手指,30 FPS,7.7 小时动捕)全部用 **3D 关节旋转 + foot contact 特征** 表示舞蹈 —— 说明舞蹈社区共识是「3D 旋转 + 时序特征」而非「更多 2D 点」。来源:AIST++(Li et al. 2021)、FineDance(Li et al. 2023)及多篇 music-to-dance 论文的数据集对比表。
- **好消息**:tasks-vision PoseLandmarker 已输出 3D world landmarks(米制,髋原点),胯部 yaw 可以从左右髋的 z 差推导 —— 我们已经在拿这个数据,只是没用/没渲染。

## 4. 「骨骼看不出动作」的替代呈现

- **身体剪影(分割)**:MediaPipe Selfie Segmentation / ImageSegmenter 完全可行:模型 447KB(106K 参数),笔记本 WASM SIMD 5-10ms/帧(30-60 FPS),WebGPU 1-3ms;TFJS 官方基准 MBP i9 125/130 FPS、桌面 GTX1070 185/225 FPS。还有 6 类 multiclass(背景/头发/身体皮肤/脸/衣服/其他)。来源:TensorFlow blog "Body Segmentation with MediaPipe and TensorFlow.js" (2022)、Fora Soft Selfie Segmentation V2 with WebGPU 分析。
- **Just Dance 类产品惯例**:Ubisoft Just Dance 及同类从不渲染原始骨架 —— 用的是「教练视频/剪影 + 评分反馈 + 轨迹拖尾」,判定基于时序动作匹配。也就是说「用户看不懂骨架」是行业已知问题,业界答案是换呈现层,不是换模型。
- **DensePose 表面渲染**:浏览器不可行,排除。

## 5. 结论:最务实的两条路径

### 路径 A(推荐,1-2 天):不加模型,升级「呈现 + 特征」
1. 换用 **Pose Landmarker heavy 模型**(现成 .task,精度一档提升,零框架改动);
2. 用上 **3D world landmarks**:渲染 3D 骨架(可侧转视角)、由左右髋 z 差推导骨盆旋转角并可视化(髋部扭转指示器)、由脚踝/foot_index 速度推导踩地节奏;
3. 叠加 **Selfie Segmentation 剪影**(447KB,30+ FPS)做 Just Dance 式身体轮廓填充,骨架退为辅助线。
- 成本:低,全部在现有 tasks-vision 技术栈内;模型均可本地化。
- 收益:直接回应「看不出胯部旋转」—— 用角度数值/指示器表达,而不是靠用户脑补骨架;剪影解决「骨骼不像人」。

### 路径 B(中期,3-5 天):加手部细节
用 tasks-vision **HandLandmarker 与 PoseLandmarker 并行**(或 HolisticLandmarker 单图,关 face blendshapes 绕开 issue #5576),把手从 3 点升到 21 点/手。拉丁手位(styling)是动作辨识度的第二来源。
- 成本:中;延迟上升约 30-80%,需在 demo 实测能否保 30 FPS(必要时手模型降频推理)。
- 收益:手部表现力显著提升;但**对胯部诉求没有帮助**,所以应在 A 之后做。

### 明确不建议
- MoveNet(17 点,倒退)、OpenPose(license + 无 Web)、DensePose/SMPL 回归(浏览器不可行)、RTMW 133 点 Web 化(收益主要在脸/手指,工程量大,且 133 点里躯干点反而比 BlazePose 少,胯部问题依旧)。
