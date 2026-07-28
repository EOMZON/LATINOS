import { useEffect, useRef } from 'react'
import type { BodyPose } from '../lib/bodyPose'
import { drawBodyPoseFigure } from '../game/drawing'

/** 小型静态骨架图示(泳道卡片 / 教学教练 / 章节图标通用,镜像与主画面一致) */
export default function SkeletonFigure({
  body,
  width = 84,
  height = 112,
  color = 'rgba(255, 255, 255, 0.9)',
  lineWidth,
  className,
}: {
  body: BodyPose
  width?: number
  height?: number
  color?: string
  lineWidth?: number
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const w = canvas.width
    const h = canvas.height
    ctx.clearRect(0, 0, w, h)
    const scale = h / 3.6
    drawBodyPoseFigure(ctx, body, w / 2, h * 0.48, scale, color, lineWidth ?? Math.max(1.5, h / 60), true)
  }, [body, color, lineWidth])

  return <canvas ref={canvasRef} width={width} height={height} className={className} />
}
