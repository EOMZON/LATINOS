import { SENSITIVITY_PRESETS, type Sensitivity } from '../game/judgments'

/** 判定灵敏度三档切换(严格/标准/宽松):即时生效,标定权交还用户 */
export default function SensitivitySwitcher({
  value,
  onChange,
}: {
  value: Sensitivity
  onChange: (s: Sensitivity) => void
}) {
  return (
    <div
      className="flex items-center gap-1 rounded-full bg-black/60 px-1.5 py-1.5 backdrop-blur"
      title={`判定灵敏度 · ${SENSITIVITY_PRESETS[value].desc}`}
    >
      <span className="px-1 text-[10px] text-white/45">灵敏度</span>
      {(['strict', 'standard', 'relaxed'] as Sensitivity[]).map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`tap rounded-full px-2.5 py-1 text-xs font-bold transition-colors ${
            value === s ? 'bg-white/25 text-white' : 'text-white/60 hover:bg-white/10'
          }`}
        >
          {SENSITIVITY_PRESETS[s].label}
        </button>
      ))}
    </div>
  )
}
