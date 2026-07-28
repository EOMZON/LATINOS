import { SKINS, useSkin, type SkinId } from '../game/skin'

/** 视觉风格切换器:cards = 标题屏三张缩略卡;compact = 模式选择页分段控件 */
export default function SkinSwitcher({ variant }: { variant: 'cards' | 'compact' }) {
  const [skin, setSkin] = useSkin()

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-1 rounded-full p-1" style={{ background: 'var(--chip-bg)' }}>
        {SKINS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSkin(s.id)}
            title={s.desc}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-colors ${
              skin === s.id ? 'skin-seg active font-bold' : 'skin-seg'
            }`}
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: `linear-gradient(120deg, ${s.swatch.primary}, ${s.swatch.accent})` }}
            />
            {s.name}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="mt-8 w-full max-w-xl">
      <p className="sk-faint mb-3 text-center text-xs tracking-[0.3em]">视觉风格 · 点卡即换装</p>
      <div className="grid grid-cols-3 gap-3">
        {SKINS.map((s) => (
          <SkinCard key={s.id} id={s.id} active={skin === s.id} onPick={setSkin} />
        ))}
      </div>
    </div>
  )
}

function SkinCard({
  id,
  active,
  onPick,
}: {
  id: SkinId
  active: boolean
  onPick: (id: SkinId) => void
}) {
  const meta = SKINS.find((s) => s.id === id)!
  return (
    <button
      onClick={() => onPick(id)}
      className={`skin-card rounded-2xl p-3 text-left ${active ? 'active' : ''}`}
    >
      {/* 缩略预览:用该 skin 的真实配色画迷你界面 */}
      <div
        className="relative h-20 overflow-hidden rounded-xl"
        style={{ background: meta.swatch.bg, border: '1px solid rgba(128,128,128,0.25)' }}
      >
        <div
          className="absolute left-2 top-2 h-1.5 w-10 rounded-full"
          style={{ background: meta.swatch.primary }}
        />
        <div
          className="absolute left-2 top-5 h-1 w-14 rounded-full opacity-40"
          style={{ background: meta.swatch.primary }}
        />
        <div
          className="absolute bottom-2 left-2 rounded-full px-2 py-0.5 text-[8px] font-bold"
          style={{ background: meta.swatch.primary, color: '#fff' }}
        >
          开始跳舞
        </div>
        <div
          className="absolute bottom-2 right-2 h-6 w-6 rounded-md"
          style={{ background: meta.swatch.accent, opacity: 0.85 }}
        />
      </div>
      <p className="mt-2 flex items-center gap-1.5 text-sm font-bold" style={{ color: 'var(--tx)' }}>
        {meta.name}
        {active && <span className="sk-accent text-xs">✓</span>}
      </p>
      <p className="sk-faint mt-0.5 text-[11px] leading-snug">{meta.desc}</p>
    </button>
  )
}
