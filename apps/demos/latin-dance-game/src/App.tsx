import { useState } from 'react'
import { PoseEngineProvider } from './game/engine'
import type { Screen } from './game/types'
import type { ChapterDef, ModeDef } from './modes/registry'
import TitleScreen from './screens/TitleScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import ModeSelectScreen from './screens/ModeSelectScreen'
import GameScreen from './screens/GameScreen'
import FreeScreen from './screens/FreeScreen'
import LiveScreen from './screens/LiveScreen'
import ResultsScreen from './screens/ResultsScreen'

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: 'title' })
  // 每次开局 +1,强制 GameScreen 重新挂载(再来一次)
  const [round, setRound] = useState(0)

  const play = (mode: ModeDef, chapter?: ChapterDef) => {
    setRound((r) => r + 1)
    setScreen({ name: 'game', mode, chapter })
  }

  return (
    <PoseEngineProvider>
      {screen.name === 'title' && (
        <TitleScreen
          onStart={(skipOnboarding) =>
            setScreen(skipOnboarding ? { name: 'modes' } : { name: 'onboarding' })
          }
        />
      )}

      {screen.name === 'onboarding' && (
        <OnboardingScreen
          onDone={() => setScreen({ name: 'modes' })}
          onBack={() => setScreen({ name: 'title' })}
        />
      )}

      {screen.name === 'modes' && (
        <ModeSelectScreen
          onPlay={play}
          onReOnboard={() => setScreen({ name: 'onboarding' })}
          onBack={() => setScreen({ name: 'title' })}
        />
      )}

      {screen.name === 'game' && screen.mode.kind === 'free' && (
        <FreeScreen onExit={() => setScreen({ name: 'modes' })} />
      )}

      {screen.name === 'game' && screen.mode.kind === 'live' && (
        <LiveScreen mode={screen.mode} onExit={() => setScreen({ name: 'modes' })} />
      )}

      {screen.name === 'game' &&
        (screen.mode.kind === 'follow' ||
          screen.mode.kind === 'chapters' ||
          screen.mode.kind === 'challenge') && (
          <GameScreen
            key={`${screen.mode.id}:${screen.chapter?.index ?? 'all'}:${round}`}
            mode={screen.mode}
            chapter={screen.chapter}
            onFinish={(result) =>
              setScreen({ name: 'results', result, mode: screen.mode, chapter: screen.chapter })
            }
            onExit={() => setScreen({ name: 'modes' })}
          />
        )}

      {screen.name === 'results' && (
        <ResultsScreen
          result={screen.result}
          mode={screen.mode}
          chapter={screen.chapter}
          onRetry={() => play(screen.mode, screen.chapter)}
          onNextChapter={
            screen.result.nextChapter
              ? () => play(screen.mode, screen.result.nextChapter)
              : undefined
          }
          onExit={() => setScreen({ name: 'modes' })}
        />
      )}
    </PoseEngineProvider>
  )
}
