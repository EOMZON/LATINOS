import type { NormalizedLandmark } from '@mediapipe/tasks-vision'
import type { WorldSample } from './reference'

/**
 * 拉丁 3D 特征:基于 MediaPipe world landmarks(米制、髋原点)计算
 * 2D 骨骼看不出来的东西——胯部旋转(俯视朝向)、肩髋分离、重心脚。
 *
 * 坐标约定(MediaPipe pose world):x 向右,y 向下,z 朝摄像机为负。
 * 俯视朝向角 hipYawDeg:0° = 髋线正对镜头,顺时针(向自己右转)为正,范围 ±90°。
 */

export interface DanceFeatures {
  /** 髋线俯视朝向角(度);正对镜头为 0,右转为正 */
  hipYawDeg: number
  /** 肩线俯视朝向角(度);仅实时侧有(参考采样不存肩) */
  shoulderYawDeg: number | null
  /** 肩髋分离角(度,shoulder - hip);拉丁的「上下分离」指标 */
  separationDeg: number | null
  /** 重心脚:哪只脚承重(踝部离髋中心水平距离 + 抬脚高度综合判定) */
  weightFoot: 'left' | 'right' | 'both'
}

/** 俯视面朝向角:髋/肩线两端点 → atan2(dz, dx),折算到 ±90° */
function yawDeg(lx: number, lz: number, rx: number, rz: number): number {
  const dx = lx - rx
  const dz = lz - rz
  if (Math.abs(dx) < 1e-6 && Math.abs(dz) < 1e-6) return 0
  let deg = (Math.atan2(dz, dx) * 180) / Math.PI
  // 髋线向量正对镜头时约 0°;把 ±180 折回 ±90 区间(人背对镜头视为同向)
  if (deg > 90) deg -= 180
  if (deg < -90) deg += 180
  return deg
}

/** 抬脚判定阈值:一脚比另一脚高出这个值(米)即认为该脚离地 */
const RAISE_M = 0.06
/** 重心水平差阈值:两踝离髋中心水平距离差小于该值(米)视为双脚均分 */
const CENTER_M = 0.05

function weightFootFrom(
  aLx: number, aLy: number, aLz: number,
  aRx: number, aRy: number, aRz: number,
): 'left' | 'right' | 'both' {
  // y 向下为正:值更小 = 更高 = 抬起
  if (aRy - aLy > RAISE_M) return 'right' // 左脚抬起 → 重心在右
  if (aLy - aRy > RAISE_M) return 'left'
  // 都在地上:离髋中心(world 原点)水平更近的脚承重
  const dl = Math.hypot(aLx, aLz)
  const dr = Math.hypot(aRx, aRz)
  if (dl - dr > CENTER_M) return 'right'
  if (dr - dl > CENTER_M) return 'left'
  return 'both'
}

/** 从实时 world landmarks(33 点)计算全部特征;髋/踝缺失返回 null */
export function featuresFromWorld(wl: NormalizedLandmark[] | null | undefined): DanceFeatures | null {
  if (!wl) return null
  const hl = wl[23]
  const hr = wl[24]
  const sl = wl[11]
  const sr = wl[12]
  const al = wl[27]
  const ar = wl[28]
  if (!hl || !hr || !al || !ar) return null
  if ((hl.visibility ?? 1) < 0.3 || (hr.visibility ?? 1) < 0.3) return null
  const hipYaw = yawDeg(hl.x, hl.z, hr.x, hr.z)
  let shoulderYaw: number | null = null
  if (sl && sr && (sl.visibility ?? 1) >= 0.3 && (sr.visibility ?? 1) >= 0.3) {
    shoulderYaw = yawDeg(sl.x, sl.z, sr.x, sr.z)
  }
  return {
    hipYawDeg: hipYaw,
    shoulderYawDeg: shoulderYaw,
    separationDeg: shoulderYaw !== null ? shoulderYaw - hipYaw : null,
    weightFoot: weightFootFrom(al.x, al.y, al.z, ar.x, ar.y, ar.z),
  }
}

/** 从参考 WorldSample(10 值:髋 L/R xz + 踝 L/R xyz)计算参考侧特征 */
export function featuresFromWorldSample(s: WorldSample): Pick<DanceFeatures, 'hipYawDeg' | 'weightFoot'> | null {
  if (!s) return null
  return {
    hipYawDeg: yawDeg(s[0], s[1], s[2], s[3]),
    weightFoot: weightFootFrom(s[4], s[5], s[6], s[7], s[8], s[9]),
  }
}

/**
 * 特征 EMA 平滑:world landmarks 未过 One Euro,直接用会抖。
 * 角度线性 EMA(范围 ±90°,无缠绕问题);重心脚用多数投票窗口防闪跳。
 */
export class FeatureSmoother {
  private hipYaw: number | null = null
  private sep: number | null = null
  private feet: Array<'left' | 'right' | 'both'> = []
  private alpha: number
  private footWindow: number

  constructor(alpha = 0.3, footWindow = 7) {
    this.alpha = alpha
    this.footWindow = footWindow
  }

  reset() {
    this.hipYaw = null
    this.sep = null
    this.feet = []
  }

  push(f: DanceFeatures): DanceFeatures {
    this.hipYaw = this.hipYaw === null ? f.hipYawDeg : this.hipYaw + this.alpha * (f.hipYawDeg - this.hipYaw)
    if (f.separationDeg !== null) {
      this.sep = this.sep === null ? f.separationDeg : this.sep + this.alpha * (f.separationDeg - this.sep)
    }
    this.feet.push(f.weightFoot)
    if (this.feet.length > this.footWindow) this.feet.shift()
    const counts = { left: 0, right: 0, both: 0 }
    for (const w of this.feet) counts[w] += 1
    const foot =
      counts.left > counts.right && counts.left > counts.both
        ? 'left'
        : counts.right > counts.left && counts.right > counts.both
          ? 'right'
          : 'both'
    return {
      hipYawDeg: this.hipYaw,
      shoulderYawDeg: f.shoulderYawDeg,
      separationDeg: this.sep,
      weightFoot: foot,
    }
  }
}
