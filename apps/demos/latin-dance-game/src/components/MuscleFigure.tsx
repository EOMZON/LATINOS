import type { MuscleActivation, MuscleId } from '../game/muscleMap'

/**
 * 肌肉发力地图 L1 的可视化:前面 + 背面两个示意小人,
 * 肌群用色块表示,强度 0–1 映射 紫(低)→ 红(高)热力。
 * 示意图形(非解剖精确),定位「该用哪里发力」的教学提示。
 */

/** 强度 → 颜色:0 幽灵灰,低→高 = 紫 → 品红 → 红,透明度随强度增加 */
function heat(i: number): string {
  if (i < 0.02) return 'rgba(255,255,255,0.07)'
  const hue = 280 - 280 * Math.min(1, i)
  const alpha = 0.3 + 0.6 * Math.min(1, i)
  return `hsla(${hue}, 90%, 58%, ${alpha})`
}

interface Blob {
  muscle: MuscleId
  cx: number
  cy: number
  rx: number
  ry: number
  rotate?: number
}

/** 前面(viewBox 0 0 100 190):肩/臂/腹直/腹斜/股四头/小腿前侧 */
const FRONT_BLOBS: Blob[] = [
  { muscle: 'shoulderL', cx: 66, cy: 47, rx: 9, ry: 6 },
  { muscle: 'shoulderR', cx: 34, cy: 47, rx: 9, ry: 6 },
  { muscle: 'armL', cx: 74, cy: 68, rx: 5.5, ry: 16, rotate: 8 },
  { muscle: 'armR', cx: 26, cy: 68, rx: 5.5, ry: 16, rotate: -8 },
  { muscle: 'abs', cx: 50, cy: 78, rx: 8, ry: 15 },
  { muscle: 'obliqueL', cx: 61, cy: 80, rx: 4.5, ry: 12, rotate: -6 },
  { muscle: 'obliqueR', cx: 39, cy: 80, rx: 4.5, ry: 12, rotate: 6 },
  { muscle: 'quadL', cx: 58, cy: 122, rx: 7, ry: 19 },
  { muscle: 'quadR', cx: 42, cy: 122, rx: 7, ry: 19 },
  { muscle: 'calfL', cx: 57, cy: 163, rx: 5, ry: 14 },
  { muscle: 'calfR', cx: 43, cy: 163, rx: 5, ry: 14 },
]

/** 背面:上背/臀/腘绳/小腿后侧(左右与前面镜像——背面图左侧 = 解剖学左) */
const BACK_BLOBS: Blob[] = [
  { muscle: 'upperBack', cx: 50, cy: 55, rx: 15, ry: 12 },
  { muscle: 'armL', cx: 26, cy: 68, rx: 5.5, ry: 16, rotate: -8 },
  { muscle: 'armR', cx: 74, cy: 68, rx: 5.5, ry: 16, rotate: 8 },
  { muscle: 'gluteL', cx: 42, cy: 99, rx: 8, ry: 8.5 },
  { muscle: 'gluteR', cx: 58, cy: 99, rx: 8, ry: 8.5 },
  { muscle: 'hamL', cx: 42, cy: 128, rx: 7, ry: 16 },
  { muscle: 'hamR', cx: 58, cy: 128, rx: 7, ry: 16 },
  { muscle: 'calfL', cx: 43, cy: 163, rx: 5.5, ry: 14 },
  { muscle: 'calfR', cx: 57, cy: 163, rx: 5.5, ry: 14 },
]

/** 人形轮廓(两面共用) */
function BodyOutline() {
  return (
    <g stroke="rgba(255,255,255,0.28)" strokeWidth="1.6" fill="none">
      {/* 头 */}
      <circle cx="50" cy="22" r="10" />
      {/* 躯干 */}
      <path d="M35 40 Q50 34 65 40 L68 92 Q50 100 32 92 Z" />
      {/* 手臂 */}
      <path d="M35 42 Q22 50 21 84" />
      <path d="M65 42 Q78 50 79 84" />
      {/* 腿 */}
      <path d="M38 96 L36 148 L40 180" />
      <path d="M62 96 L64 148 L60 180" />
    </g>
  )
}

function Figure({ blobs, act, label }: { blobs: Blob[]; act: MuscleActivation; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 100 190" className="h-full w-full">
        {blobs.map((b, i) => (
          <ellipse
            key={i}
            cx={b.cx}
            cy={b.cy}
            rx={b.rx}
            ry={b.ry}
            fill={heat(act[b.muscle])}
            transform={b.rotate ? `rotate(${b.rotate} ${b.cx} ${b.cy})` : undefined}
            style={{ transition: 'fill 200ms linear' }}
          />
        ))}
        <BodyOutline />
      </svg>
      <span className="text-[9px] text-white/40">{label}</span>
    </div>
  )
}

export default function MuscleFigure({
  activation,
  className,
}: {
  activation: MuscleActivation
  className?: string
}) {
  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-1">
        <Figure blobs={FRONT_BLOBS} act={activation} label="正面" />
        <Figure blobs={BACK_BLOBS} act={activation} label="背面" />
      </div>
    </div>
  )
}
