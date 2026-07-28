import type { NormalizedLandmark } from '@mediapipe/tasks-vision'
import {
  BODY_CONNECTIONS,
  COLOR_GOOD,
  COLOR_WARN,
  connectionPart,
  partColor,
  type BodyPart,
  type BodyPose,
} from '../lib/bodyPose'
import type { DanceFeatures } from '../lib/danceFeatures'

/** 画布绘制工具:只画身体骨骼,不画面部 */

export type PartColors = Record<BodyPart, string>

export function neutralPartColors(): PartColors {
  return {
    leftArm: COLOR_GOOD,
    rightArm: COLOR_GOOD,
    leftLeg: COLOR_GOOD,
    rightLeg: COLOR_GOOD,
    torso: COLOR_GOOD,
  }
}

export function partColorsFromErr(partErrDeg: Record<BodyPart, number>): PartColors {
  return {
    leftArm: partColor(partErrDeg.leftArm),
    rightArm: partColor(partErrDeg.rightArm),
    leftLeg: partColor(partErrDeg.leftLeg),
    rightLeg: partColor(partErrDeg.rightLeg),
    torso: partColor(partErrDeg.torso),
  }
}

/** 镜像摄像头画面 + 暗色蒙版 */
export function drawCameraFrame(
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  w: number,
  h: number,
  dim = 0.45,
) {
  ctx.save()
  ctx.translate(w, 0)
  ctx.scale(-1, 1)
  ctx.drawImage(video, 0, 0, w, h)
  ctx.restore()
  if (dim > 0) {
    ctx.fillStyle = `rgba(0, 0, 0, ${dim})`
    ctx.fillRect(0, 0, w, h)
  }
}

/** 实时骨骼(镜像显示,按部位染色) */
export function drawLiveSkeleton(
  ctx: CanvasRenderingContext2D,
  landmarks: NormalizedLandmark[],
  w: number,
  h: number,
  colors: PartColors,
  pointColor = '#ff5c8a',
) {
  ctx.save()
  ctx.translate(w, 0)
  ctx.scale(-1, 1)
  ctx.lineWidth = Math.max(2, w / 240)
  ctx.lineCap = 'round'
  for (const conn of BODY_CONNECTIONS) {
    const a = landmarks[conn.start]
    const b = landmarks[conn.end]
    if (!a || !b) continue
    if ((a.visibility ?? 1) < 0.3 || (b.visibility ?? 1) < 0.3) continue
    ctx.strokeStyle = colors[connectionPart(conn.start, conn.end)]
    ctx.beginPath()
    ctx.moveTo(a.x * w, a.y * h)
    ctx.lineTo(b.x * w, b.y * h)
    ctx.stroke()
  }
  ctx.fillStyle = pointColor
  const r = Math.max(3, w / 320)
  for (let i = 11; i < landmarks.length; i++) {
    const p = landmarks[i]
    if ((p.visibility ?? 1) < 0.3) continue
    ctx.beginPath()
    ctx.arc(p.x * w, p.y * h, r, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.restore()
}

/**
 * 画一个归一化身体姿态(参考幽灵 / 教学教练 / 泳道卡片通用)。
 * BodyPose 以髋部中点为原点、肩宽为单位长度;y 向下为正。
 */
export function drawBodyPoseFigure(
  ctx: CanvasRenderingContext2D,
  body: BodyPose,
  cx: number,
  cy: number,
  scale: number,
  color: string,
  lineWidth: number,
  mirror = true,
) {
  ctx.strokeStyle = color
  ctx.lineWidth = lineWidth
  ctx.lineCap = 'round'
  const m = mirror ? -1 : 1
  for (const c of BODY_CONNECTIONS) {
    const a = body[c.start - 11]
    const b = body[c.end - 11]
    if (!a || !b || a.v < 0.3 || b.v < 0.3) continue
    ctx.beginPath()
    ctx.moveTo(cx + m * a.x * scale, cy + a.y * scale)
    ctx.lineTo(cx + m * b.x * scale, cy + b.y * scale)
    ctx.stroke()
  }
}

/**
 * 胯部俯视仪表盘:半圆刻度盘显示髋线朝向(0° = 正对镜头)。
 * - 有参考时画目标扇区(accent 半透明),实时指针在区内变绿、区外变黄;
 * - 底部两个圆点是重心脚(镜像显示:解剖学左脚画在屏幕右侧,和镜像画面一致);
 * - 参考缺 world 数据时只画实时指针。
 * 画在主画布上,调用方给圆心和半径。
 */
export function drawHipDial(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  live: DanceFeatures | null,
  refHipYawDeg: number | null,
  refWeightFoot: 'left' | 'right' | 'both' | null,
  tolDeg: number,
  accent: string,
) {
  ctx.save()
  ctx.translate(cx, cy)

  // 底盘(上半圆,-90°..+90°;屏幕正上方 = 0° 正对镜头)
  ctx.beginPath()
  ctx.arc(0, 0, r, Math.PI, 2 * Math.PI)
  ctx.closePath()
  ctx.fillStyle = 'rgba(0,0,0,0.55)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.25)'
  ctx.lineWidth = 1.5
  ctx.stroke()

  // 角度 → 画布弧度:0° 指向正上(-90°),镜像显示(解剖学右转 = 屏幕左偏)
  const toRad = (deg: number) => (-90 - deg) * (Math.PI / 180)

  // 目标扇区
  if (refHipYawDeg !== null) {
    const a0 = toRad(refHipYawDeg - tolDeg)
    const a1 = toRad(refHipYawDeg + tolDeg)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.arc(0, 0, r * 0.92, Math.min(a0, a1), Math.max(a0, a1))
    ctx.closePath()
    ctx.fillStyle = `${accent}55`
    ctx.fill()
    // 目标中线
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(Math.cos(toRad(refHipYawDeg)) * r * 0.92, Math.sin(toRad(refHipYawDeg)) * r * 0.92)
    ctx.strokeStyle = accent
    ctx.lineWidth = 1.5
    ctx.stroke()
  }

  // 中央刻度(0°)
  ctx.beginPath()
  ctx.moveTo(0, -r)
  ctx.lineTo(0, -r * 0.86)
  ctx.strokeStyle = 'rgba(255,255,255,0.4)'
  ctx.lineWidth = 1.5
  ctx.stroke()

  // 实时指针
  if (live) {
    const inZone = refHipYawDeg === null || Math.abs(live.hipYawDeg - refHipYawDeg) <= tolDeg
    const a = toRad(live.hipYawDeg)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(Math.cos(a) * r * 0.8, Math.sin(a) * r * 0.8)
    ctx.strokeStyle = inZone ? COLOR_GOOD : COLOR_WARN
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(0, 0, 3.5, 0, Math.PI * 2)
    ctx.fillStyle = inZone ? COLOR_GOOD : COLOR_WARN
    ctx.fill()
  }

  // 标签
  ctx.fillStyle = 'rgba(255,255,255,0.75)'
  ctx.font = `${Math.max(9, r * 0.22)}px sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.fillText('胯', 0, -r * 0.62)

  // 重心脚圆点(镜像:解剖学左脚在屏幕右)
  if (live) {
    const dotY = r * 0.38
    const dotR = Math.max(4, r * 0.13)
    const feet: Array<{ foot: 'left' | 'right'; x: number; label: string }> = [
      { foot: 'right', x: -r * 0.42, label: '右' },
      { foot: 'left', x: r * 0.42, label: '左' },
    ]
    for (const f of feet) {
      const liveOn = live.weightFoot === f.foot || live.weightFoot === 'both'
      const refOn = refWeightFoot !== null && (refWeightFoot === f.foot || refWeightFoot === 'both')
      ctx.beginPath()
      ctx.arc(f.x, dotY, dotR, 0, Math.PI * 2)
      ctx.fillStyle = liveOn ? COLOR_GOOD : 'rgba(255,255,255,0.15)'
      ctx.fill()
      // 参考要求承重的脚:描 accent 圈
      if (refOn) {
        ctx.strokeStyle = accent
        ctx.lineWidth = 2
        ctx.stroke()
      }
      ctx.fillStyle = liveOn ? '#04252b' : 'rgba(255,255,255,0.55)'
      ctx.font = `bold ${dotR * 1.1}px sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(f.label, f.x, dotY + 0.5)
    }
  }
  ctx.restore()
}

/** 幽灵骨架:贴着用户髋部位置画的参考动作 */
export function drawGhost(
  ctx: CanvasRenderingContext2D,
  body: BodyPose,
  landmarks: NormalizedLandmark[] | null,
  w: number,
  h: number,
  color = 'rgba(255, 255, 255, 0.4)',
) {
  let ox = w / 2
  let oy = h * 0.62
  let sc = h * 0.18
  if (landmarks) {
    const hl = landmarks[23]
    const hr = landmarks[24]
    const sl = landmarks[11]
    const sr = landmarks[12]
    if (hl && hr && sl && sr) {
      ox = ((hl.x + hr.x) / 2) * w
      oy = ((hl.y + hr.y) / 2) * h
      sc = Math.hypot((sl.x - sr.x) * w, (sl.y - sr.y) * h) || sc
    }
  }
  ctx.save()
  ctx.translate(w, 0)
  ctx.scale(-1, 1)
  drawBodyPoseFigure(ctx, body, ox, oy, sc, color, Math.max(2, w / 300), false)
  ctx.restore()
}
