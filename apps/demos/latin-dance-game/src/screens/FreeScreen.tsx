import { useEffect, useRef } from 'react'
import { usePoseEngine } from '../game/engine'
import { drawCameraFrame, drawLiveSkeleton, neutralPartColors } from '../game/drawing'
import { cssVar } from '../game/skin'
import StatusBadge from '../components/StatusBadge'

/** 自由模式:无参考、不打分,纯骨骼可视化 */
export default function FreeScreen({ onExit }: { onExit: () => void }) {
  const engine = usePoseEngine()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointColor = cssVar('--accent', '#c084fc')

  useEffect(() => {
    engine.startCamera().catch(() => {})
    let raf = 0
    const loop = () => {
      raf = requestAnimationFrame(loop)
      const canvas = canvasRef.current
      const video = engine.videoRef.current
      const ctx = canvas?.getContext('2d')
      if (!canvas || !ctx || !video) return
      if (video.readyState < 2 || video.videoWidth === 0) return
      if (canvas.width !== video.videoWidth) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
      }
      const w = canvas.width
      const h = canvas.height
      drawCameraFrame(ctx, video, w, h, 0.4)
      const lm = engine.landmarksRef.current
      if (lm) drawLiveSkeleton(ctx, lm, w, h, neutralPartColors(), pointColor)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onExit()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onExit])

  return (
    <div className="fixed inset-0 overflow-hidden select-none" style={{ background: 'var(--bg)' }}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-contain" />
      <div className="absolute left-3 top-3 sm:left-5 sm:top-5">
        <StatusBadge />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-16 flex justify-center sm:top-20">
        <p className="rounded-full bg-black/50 px-4 py-1.5 text-xs text-white/60 backdrop-blur">
          自由模式 · 不打分,想怎么跳就怎么跳
        </p>
      </div>
      {engine.status.cameraError && (
        <div className="absolute inset-x-4 top-24 mx-auto max-w-md rounded-2xl border border-red-500/40 bg-red-950/85 px-4 py-3 text-sm text-red-200">
          {engine.status.cameraError}
          <button
            onClick={() => engine.startCamera().catch(() => {})}
            className="ml-3 rounded-full bg-red-500/30 px-3 py-1 text-xs hover:bg-red-500/50"
          >
            重新打开摄像头
          </button>
        </div>
      )}
      <button
        onClick={onExit}
        className="sk-ghost absolute bottom-5 right-5 rounded-full px-5 py-2.5 text-sm backdrop-blur"
      >
        退出(Esc)
      </button>
    </div>
  )
}
