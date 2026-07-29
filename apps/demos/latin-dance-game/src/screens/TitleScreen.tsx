import { useState } from 'react'
import { onboardingDone } from '../game/types'
import SkinSwitcher from '../components/SkinSwitcher'
import { getTodayCheckin, getStreak } from '../game/fitnessProgress'

/** 标题/开场屏(含「视觉风格」切换器,点卡即整套换装) */
export default function TitleScreen({
  onStart,
}: {
  onStart: (skipOnboarding: boolean) => void
}) {
  const [checkin] = useState(() => ({ done: !!getTodayCheckin(), streak: getStreak() }))

  return (
    <div className="sk-scene fixed inset-0 flex flex-col items-center justify-center overflow-y-auto px-6 py-10">
      <div className="relative z-10 flex flex-col items-center">
        <p className="sk-faint mb-3 text-sm font-medium tracking-[0.4em]">LATIN DANCE OS</p>
        <h1 className="sk-title text-center text-6xl font-black italic leading-tight sm:text-7xl">
          Latin Fever
        </h1>
        <h2 className="mt-2 text-2xl font-bold tracking-[0.5em] sm:text-3xl" style={{ color: 'var(--tx)' }}>
          拉丁舞动
        </h2>
        <p className="sk-dim mt-5 max-w-md text-center text-sm leading-relaxed">
          你的浏览器拉丁私人教练:摄像头识别身体骨骼,跟着老师示范跳,
          每个关键动作都有判定和打分。全部本地运算,不上传任何画面。
        </p>

        <p className="mt-7 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium" style={{ color: 'var(--tx)' }}>
          {checkin.done ? '✅ 今天已打卡' : '🔥 今天还没练'} · 连续{' '}
          <strong className="sk-accent">{checkin.streak}</strong> 天
        </p>

        <button
          onClick={() => onStart(onboardingDone())}
          className="sk-btn mt-6 rounded-full px-14 py-4 text-xl font-black"
        >
          开始跳舞
        </button>

        <SkinSwitcher variant="cards" />

        <p className="sk-faint mt-8 text-xs">
          需要摄像头 · 只识别身体骨骼,不做面部识别 · 建议全身入镜距离 2 米左右
        </p>
      </div>
    </div>
  )
}
