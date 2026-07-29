import type { BodyPose } from './bodyPose'

/**
 * 舞步口令词汇表：由关键姿态的身体坐标推导一句【专业动作引导】，
 * 而不是伪造舞步名（自动切段的关键动作没有语义标签，硬编「纽约步 /
 * 库克拉卡」会误导）。走运动科学语言：重心脚、胯部扭转、手臂上举、屈膝下沉。
 *
 * 坐标约定（见 bodyPose.ts toBodyPose）：
 *   - 归一化以双髋中点为原点、肩宽为单位，y 向下为正
 *   - 脚踝 y 更大 = 更靠下 = 着地支撑；手腕 y 小于肩 = 上举
 *   - BodyPose 索引 = MediaPipe landmark index − 11
 */

// BodyPose 内索引（landmark − 11）
const IDX = {
  shoL: 0,
  shoR: 1,
  wriL: 4,
  wriR: 5,
  hipL: 12,
  hipR: 13,
  kneL: 14,
  kneR: 15,
  ankL: 16,
  ankR: 17,
} as const

type V = { x: number; y: number }

function yaw(a: V, b: V): number {
  return Math.atan2(b.y - a.y, b.x - a.x)
}

function kneeAngle(body: BodyPose, hip: number, knee: number, ank: number): number {
  const v1 = { x: body[knee].x - body[hip].x, y: body[knee].y - body[hip].y }
  const v2 = { x: body[ank].x - body[knee].x, y: body[ank].y - body[knee].y }
  const dot = v1.x * v2.x + v1.y * v2.y
  const cross = v1.x * v2.y - v1.y * v2.x
  return (Math.atan2(Math.abs(cross), dot) * 180) / Math.PI
}

function fallback(): string {
  return '保持 Latin 架型，延伸线条'
}

/** 判重心脚：踝更靠下（y 更大）一侧为支撑；不可见返回 null */
export function weightFootOf(body: BodyPose | null | undefined): 'L' | 'R' | null {
  if (!body || body.length < 18) return null
  return body[IDX.ankL].y > body[IDX.ankR].y ? 'L' : 'R'
}

export interface CueOptions {
  /** 与上一个关键动作相比重心脚发生变化 → 强调「重心转移到 X 腿」 */
  transfer?: boolean
}

/**
 * 由单帧关键姿态推导一句口令。
 * body 为 null / 不可见时返回通用占位引导（不会报错）。
 * 不伪造舞步名（自动切段无语义标签），走运动科学语言。
 */
export function deriveCue(body: BodyPose | null | undefined, opts: CueOptions = {}): string {
  if (!body || body.length < 18) return fallback()

  const p = (i: number): V => body[i]

  // 重心脚：踝更靠下（y 更大）一侧为支撑
  const weightFoot = weightFootOf(body) ?? 'R'
  const footText = weightFoot === 'L' ? '左腿' : '右腿'

  // 肩线 / 髋线夹角差 → 扭转（Latin 标志性动作）
  const shoulderYaw = yaw(p(IDX.shoL), p(IDX.shoR))
  const hipYaw = yaw(p(IDX.hipL), p(IDX.hipR))
  let twist = shoulderYaw - hipYaw
  twist = ((twist + Math.PI) % (2 * Math.PI)) - Math.PI
  const twistDeg = (Math.abs(twist) * 180) / Math.PI

  // 手臂上举：任一手腕明显高于同侧肩
  const armUpL = p(IDX.wriL).y < p(IDX.shoL).y - 0.25
  const armUpR = p(IDX.wriR).y < p(IDX.shoR).y - 0.25
  const armUp = armUpL || armUpR

  // 屈膝下沉：任一膝角偏小时
  const bent = Math.min(kneeAngle(body, IDX.hipL, IDX.kneL, IDX.ankL), kneeAngle(body, IDX.hipR, IDX.kneR, IDX.ankR)) < 120

  const parts: string[] = []
  if (opts.transfer) parts.push(`重心转移到${footText}`)
  else parts.push(`${footText}支撑`)
  if (twistDeg > 12) parts.push('胯部扭转（Latin 标志）')
  if (armUp) parts.push(armUpL && armUpR ? '双臂上举延伸' : '手臂上举延伸')
  if (bent) parts.push('屈膝下沉')

  return parts.join('，')
}
