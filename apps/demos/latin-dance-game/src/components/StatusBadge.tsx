import { usePoseEngine } from '../game/engine'

/** FPS / 模型状态角标(各游戏屏左上角常驻) */
export default function StatusBadge() {
  const engine = usePoseEngine()
  const { status, modelType } = engine
  const dot =
    status.modelStatus === 'ready'
      ? 'bg-emerald-400'
      : status.modelStatus === 'error'
        ? 'bg-red-500'
        : 'bg-amber-400 animate-pulse'
  const text =
    status.modelStatus === 'loading'
      ? '模型加载中…'
      : status.modelStatus === 'error'
        ? '模型加载失败'
        : `${modelType === 'lite' ? 'lite(省性能)' : 'full(更准)'} · ${status.delegate}`
  return (
    <div className="flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 font-mono text-[10px] text-white/80 backdrop-blur sm:text-xs">
      <span className={`inline-block h-2 w-2 rounded-full ${dot}`} />
      <span>FPS {status.fps}</span>
      <span className="text-white/30">|</span>
      <span>{text}</span>
      {status.modelSource === 'cdn' && <span className="text-amber-400">(CDN 模型)</span>}
    </div>
  )
}
