import type { NormalizedLandmark } from '@mediapipe/tasks-vision'
import {
  BODY_CONNECTIONS,
  COLOR_GOOD,
  connectionPart,
  partColor,
  type BodyPart,
  type BodyPose,
} from '../lib/bodyPose'

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
