import { useEffect, useRef } from 'react'
import { BODY_CONNECTIONS, type BodyPose } from '../lib/bodyPose'

/** Just Dance pictogram 等价物:下一个关键动作的静态骨架预告卡(镜像,与主画面一致) */
export default function KeyPoseCard({ body, remain }: { body: BodyPose; remain: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const w = canvas.width
    const h = canvas.height
    ctx.clearRect(0, 0, w, h)
    const scale = h / 3.2
    const ox = w / 2
    const oy = h * 0.42 // 髋部中点
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    for (const c of BODY_CONNECTIONS) {
      const a = body[c.start - 11]
      const b = body[c.end - 11]
      if (!a || !b || a.v < 0.3 || b.v < 0.3) continue
      ctx.beginPath()
      ctx.moveTo(ox - a.x * scale, oy + a.y * scale) // x 取反 = 镜像
      ctx.lineTo(ox - b.x * scale, oy + b.y * scale)
      ctx.stroke()
    }
  }, [body])

  return (
    <div className="pointer-events-none flex flex-col items-center rounded-lg border border-neutral-700 bg-black/60 p-2 backdrop-blur">
      <canvas ref={canvasRef} width={84} height={112} />
      <div className="mt-1 text-[10px] text-neutral-400">下一个动作</div>
      <div className="text-sm font-bold tabular-nums text-emerald-300">{remain.toFixed(1)}s</div>
    </div>
  )
}
