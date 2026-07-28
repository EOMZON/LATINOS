import { FilesetResolver, ImageSegmenter } from '@mediapipe/tasks-vision'
import { BODY_CONNECTIONS, connectionPart, type BodyPose } from './bodyPose'

/**
 * 人体剪影轮廓提取(预提取管线用):
 *   MediaPipe Selfie Segmenter(249KB,本地模型,CDN 兜底)
 *   → confidence mask → 降采样网格二值化
 *   → Moore 边界追踪(取最大连通域外轮廓)
 *   → Chaikin 平滑 + Douglas-Peucker 抽稀
 *   → 归一化多边形(相对视频帧 0–1 坐标)
 * 渲染侧直接当 SVG path / canvas path 填平色即可。
 */

/** 归一化剪影多边形点 [x, y](0–1,相对视频帧,未镜像) */
export type SilhouettePts = Array<[number, number]>

export interface SilhouetteEntry {
  /** 秒,与对应关键姿态同时间 */
  t: number
  pts: SilhouettePts
}

const LOCAL_MODEL = `${import.meta.env.BASE_URL}models/selfie_segmenter.tflite`
const CDN_MODEL =
  'https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite'

/** 加载 ImageSegmenter:本地模型优先、CPU delegate(headless 预提取环境最稳) */
export async function loadImageSegmenter(): Promise<ImageSegmenter> {
  const vision = await FilesetResolver.forVisionTasks(`${import.meta.env.BASE_URL}wasm`)
  let modelAssetPath = CDN_MODEL
  try {
    const res = await fetch(LOCAL_MODEL, { method: 'HEAD' })
    if (res.ok) modelAssetPath = LOCAL_MODEL
  } catch {
    // 本地不可达,走 CDN
  }
  return ImageSegmenter.createFromOptions(vision, {
    baseOptions: { modelAssetPath, delegate: 'CPU' },
    runningMode: 'VIDEO',
    outputConfidenceMasks: true,
    outputCategoryMask: false,
  })
}

// ---------- mask → 多边形 ----------

const GRID = 128 // 降采样网格边长(mask 原生全分辨率,128 保留手臂/腿部分离度)
const FG_THRESHOLD = 0.5
const DP_EPSILON = 1.4 // Douglas-Peucker 容差(网格像素单位,先抽稀保形状)
const CHAIKIN_ITERATIONS = 1 // 抽稀后再切角圆化,点少且边缘顺滑

/** confidence mask(Float32,person 通道)→ 归一化剪影多边形;前景过少返回 null。
 *  anchor(髋部中心等姿态锚点,归一化视频坐标)用于在多连通域(镜面反射/背景误检)
 *  中选出真人所在的轮廓;不传则取最长轮廓。 */
export function maskToPolygon(
  data: Float32Array,
  mw: number,
  mh: number,
  anchor?: { x: number; y: number },
): SilhouettePts | null {
  // 1. 降采样到 GRID×GRID 布尔网格(块平均)
  const grid = new Uint8Array(GRID * GRID)
  let fgCount = 0
  for (let gy = 0; gy < GRID; gy++) {
    for (let gx = 0; gx < GRID; gx++) {
      const x0 = Math.floor((gx / GRID) * mw)
      const x1 = Math.max(x0 + 1, Math.floor(((gx + 1) / GRID) * mw))
      const y0 = Math.floor((gy / GRID) * mh)
      const y1 = Math.max(y0 + 1, Math.floor(((gy + 1) / GRID) * mh))
      let sum = 0
      let n = 0
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          sum += data[y * mw + x]
          n += 1
        }
      }
      if (n > 0 && sum / n >= FG_THRESHOLD) {
        grid[gy * GRID + gx] = 1
        fgCount += 1
      }
    }
  }
  // 人至少要占网格 2%(遮挡太狠 / 没人的帧不给轮廓)
  if (fgCount < GRID * GRID * 0.02) return null
  return gridToPolygon(grid, anchor)
}

/** 布尔网格 → 归一化剪影多边形(Moore 追踪 + DP 抽稀 + Chaikin 圆化) */
function gridToPolygon(grid: Uint8Array, anchor?: { x: number; y: number }): SilhouettePts | null {
  // Moore 边界追踪:收集各连通域外轮廓(最多 10 个),
  // 有锚点时选质心离锚点最近的(排除镜面反射/背景误检),否则取最长
  const isFg = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < GRID && y < GRID && grid[y * GRID + x] === 1
  const isBoundary = (x: number, y: number) =>
    isFg(x, y) && (!isFg(x - 1, y) || !isFg(x + 1, y) || !isFg(x, y - 1) || !isFg(x, y + 1))

  // 顺时针 8 邻域(y 向下):E SE S SW W NW N NE
  const DIRS: Array<[number, number]> = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
  ]

  const traceFrom = (sx: number, sy: number): Array<[number, number]> => {
    const contour: Array<[number, number]> = [[sx, sy]]
    let cx = sx
    let cy = sy
    // 起始 backtrack 方向:西(起点是最上最左,西侧必为背景)
    let back = 4
    const maxSteps = GRID * GRID * 4
    for (let step = 0; step < maxSteps; step++) {
      // 从 backtrack 的顺时针下一格开始找前景点
      let found = false
      for (let k = 1; k <= 8; k++) {
        const d = (back + k) % 8
        const nx = cx + DIRS[d][0]
        const ny = cy + DIRS[d][1]
        if (isFg(nx, ny)) {
          back = (d + 4) % 8 // 新 backtrack = 来向的反方向
          cx = nx
          cy = ny
          contour.push([cx, cy])
          found = true
          break
        }
      }
      if (!found) break // 孤立点
      // Jacob 停止条件:回到起点且下一步会重复第二格
      if (cx === sx && cy === sy && contour.length > 2) break
    }
    return contour
  }

  const contours: Array<Array<[number, number]>> = []
  const visited = new Set<number>()
  for (let y = 0; y < GRID && contours.length < 10; y++) {
    for (let x = 0; x < GRID && contours.length < 10; x++) {
      if (!isBoundary(x, y)) continue
      const key = y * GRID + x
      if (visited.has(key)) continue
      const c = traceFrom(x, y)
      for (const [px, py] of c) visited.add(py * GRID + px)
      if (c.length >= 8) contours.push(c)
    }
  }
  if (contours.length === 0) return null

  let best: Array<[number, number]>
  if (anchor) {
    // 质心离锚点(归一化坐标 × GRID)最近的连通域 = 真人
    const ax = anchor.x * GRID
    const ay = anchor.y * GRID
    let bestDist = Infinity
    best = contours[0]
    for (const c of contours) {
      let cx = 0
      let cy = 0
      for (const [px, py] of c) {
        cx += px
        cy += py
      }
      cx /= c.length
      cy /= c.length
      const d = Math.hypot(cx - ax, cy - ay)
      if (d < bestDist) {
        bestDist = d
        best = c
      }
    }
  } else {
    best = contours.reduce((a, b) => (b.length > a.length ? b : a), contours[0])
  }

  // 3. Douglas-Peucker 抽稀(先保形状关键点)
  let pts = douglasPeucker(best, DP_EPSILON)

  // 4. Chaikin 平滑(闭多边形切角,把阶梯棱边圆化)
  for (let it = 0; it < CHAIKIN_ITERATIONS; it++) {
    const out: Array<[number, number]> = []
    for (let i = 0; i < pts.length; i++) {
      const [ax, ay] = pts[i]
      const [bx, by] = pts[(i + 1) % pts.length]
      out.push([ax * 0.75 + bx * 0.25, ay * 0.75 + by * 0.25])
      out.push([ax * 0.25 + bx * 0.75, ay * 0.25 + by * 0.75])
    }
    pts = out
  }

  // 5. 归一化到 0–1(相对视频帧;mask 与视频帧同比例拉伸映射)
  const round3 = (n: number) => Math.round(n * 1000) / 1000
  return pts.map(([x, y]) => [round3(x / GRID), round3(y / GRID)] as [number, number])
}

/** Douglas-Peucker(闭折线:先按最长边劈开成开折线处理) */
function douglasPeucker(points: Array<[number, number]>, eps: number): Array<[number, number]> {
  if (points.length <= 4) return points
  // 找距第一点最远的点,把闭折线劈成两段开折线
  let far = 0
  let farDist = 0
  for (let i = 1; i < points.length; i++) {
    const d = Math.hypot(points[i][0] - points[0][0], points[i][1] - points[0][1])
    if (d > farDist) {
      farDist = d
      far = i
    }
  }
  const segA = dpOpen(points.slice(0, far + 1), eps)
  const segB = dpOpen([...points.slice(far), points[0]], eps)
  // 拼接并去掉重复端点
  return [...segA.slice(0, -1), ...segB.slice(0, -1)]
}

function dpOpen(points: Array<[number, number]>, eps: number): Array<[number, number]> {
  if (points.length <= 2) return points
  const [ax, ay] = points[0]
  const [bx, by] = points[points.length - 1]
  const len = Math.hypot(bx - ax, by - ay) || 1e-9
  let maxDist = -1
  let maxIdx = 0
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i]
    const dist = Math.abs((bx - ax) * (ay - py) - (ax - px) * (by - ay)) / len
    if (dist > maxDist) {
      maxDist = dist
      maxIdx = i
    }
  }
  if (maxDist <= eps) return [points[0], points[points.length - 1]]
  const left = dpOpen(points.slice(0, maxIdx + 1), eps)
  const right = dpOpen(points.slice(maxIdx), eps)
  return [...left.slice(0, -1), ...right]
}

// ---------- 姿态胶囊剪影(Just Dance pictogram 式,无分割依赖) ----------

/**
 * 从 22 点身体姿态直接生成实心人形剪影多边形:
 * 骨骼连线光栅化为胶囊体(躯干粗、四肢细)+ 头部圆,
 * 再走同一套 网格→轮廓→抽稀→圆化 管线。
 *
 * 为什么需要它:Selfie Segmenter 为近距离自拍训练,对「远距离全身 + 镜面舞房」
 * 的参考视频会丢四肢、把镜中人误检为前景(实测 58_raw 的 mask 缺胳膊少腿);
 * 胶囊剪影与打分同源(同样的 22 个身体点),四肢永远完整,
 * 小尺寸泳道卡上可读性最好,是默认剪影来源。
 *
 * 归一化自适应:远处人的肩宽估计偏小,不能假设「肩宽=1 单位」——
 * 单位 u = max(肩宽, 躯干长/1.5),并按实际 bbox 自适应缩放居中。
 */
export function bodyToPolygon(body: BodyPose): SilhouettePts | null {
  const at = (lmIdx: number) => body[lmIdx - 11]
  const ok = (lmIdx: number) => {
    const p = at(lmIdx)
    return !!p && p.v >= 0.3
  }
  const sl = at(11)
  const sr = at(12)
  const hl = at(23)
  const hr = at(24)
  if (!sl || !sr || !hl || !hr) return null
  const shMid = { x: (sl.x + sr.x) / 2, y: (sl.y + sr.y) / 2 }
  const hipMid = { x: (hl.x + hr.x) / 2, y: (hl.y + hr.y) / 2 }
  const shoulderW = Math.hypot(sl.x - sr.x, sl.y - sr.y) || 1e-6
  const torsoLen = Math.hypot(shMid.x - hipMid.x, shMid.y - hipMid.y) || 1e-6
  const u = Math.max(shoulderW, torsoLen / 1.5)

  // 自适应视图:有效点 bbox + 头部余量,缩放居中到网格
  const xs: number[] = []
  const ys: number[] = []
  for (let i = 11; i <= 32; i++) {
    if (ok(i)) {
      xs.push(at(i)!.x)
      ys.push(at(i)!.y)
    }
  }
  if (xs.length < 8) return null
  const margin = 0.6 * u
  const minX = Math.min(...xs) - margin
  const maxX = Math.max(...xs) + margin
  const minY = Math.min(...ys) - 1.1 * u
  const maxY = Math.max(...ys) + margin
  const S = Math.min((0.94 * GRID) / (maxX - minX), (0.94 * GRID) / (maxY - minY))
  const CX = GRID / 2 - ((minX + maxX) / 2) * S
  const CY = GRID / 2 - ((minY + maxY) / 2) * S

  const grid = new Uint8Array(GRID * GRID)
  /** 胶囊:p1–p2 线段 + 半径(身体单位)光栅化 */
  const stamp = (x1: number, y1: number, x2: number, y2: number, rUnits: number) => {
    const r = rUnits * S
    const ax = CX + x1 * S
    const ay = CY + y1 * S
    const bx = CX + x2 * S
    const by = CY + y2 * S
    const minGx = Math.max(0, Math.floor(Math.min(ax, bx) - r))
    const maxGx = Math.min(GRID - 1, Math.ceil(Math.max(ax, bx) + r))
    const minGy = Math.max(0, Math.floor(Math.min(ay, by) - r))
    const maxGy = Math.min(GRID - 1, Math.ceil(Math.max(ay, by) + r))
    const dx = bx - ax
    const dy = by - ay
    const len2 = dx * dx + dy * dy || 1e-9
    for (let gy = minGy; gy <= maxGy; gy++) {
      for (let gx = minGx; gx <= maxGx; gx++) {
        const t = Math.max(0, Math.min(1, ((gx - ax) * dx + (gy - ay) * dy) / len2))
        const cx = ax + t * dx
        const cy = ay + t * dy
        if ((gx - cx) * (gx - cx) + (gy - cy) * (gy - cy) <= r * r) {
          grid[gy * GRID + gx] = 1
        }
      }
    }
  }

  let stamped = 0
  for (const c of BODY_CONNECTIONS) {
    const a = at(c.start)
    const b = at(c.end)
    if (!a || !b || a.v < 0.3 || b.v < 0.3) continue
    const part = connectionPart(c.start, c.end)
    const w = part === 'torso' ? 0.62 * u : part === 'leftArm' || part === 'rightArm' ? 0.3 * u : 0.34 * u
    stamp(a.x, a.y, b.x, b.y, w)
    stamped += 1
  }
  if (stamped < 4) return null

  // 颈 + 头(身体点不含面部,用肩线中点几何近似)
  if (ok(11) && ok(12)) {
    stamp(shMid.x, shMid.y, shMid.x, shMid.y - 0.5 * u, 0.22 * u)
    stamp(shMid.x, shMid.y - 0.62 * u, shMid.x, shMid.y - 0.62 * u, 0.38 * u)
  }

  return gridToPolygon(grid)
}

// ---------- 查询 ----------

/** 按时间找剪影(默认 ±0.12s 容差,兼容章节模式重定时偏移) */
export function findSilhouette(
  list: SilhouetteEntry[] | null | undefined,
  t: number,
  tol = 0.12,
): SilhouettePts | null {
  if (!list) return null
  let bestPts: SilhouettePts | null = null
  let bestDt = tol
  for (const s of list) {
    const dt = Math.abs(s.t - t)
    if (dt <= bestDt) {
      bestDt = dt
      bestPts = s.pts
    }
  }
  return bestPts
}
