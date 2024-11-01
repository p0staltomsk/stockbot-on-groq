import React, { useEffect, useState, useCallback } from 'react'

export function LoadingIndicator() {
  const [dots, setDots] = useState('')
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'initial' | 'loading' | 'finalizing'>(
    'initial'
  )
  const [opacity, setOpacity] = useState(0)

  // Плавное появление индикатора
  useEffect(() => {
    const fadeIn = setTimeout(() => setOpacity(1), 50)
    return () => clearTimeout(fadeIn)
  }, [])

  // Анимация точек
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'))
    }, 400)
    return () => clearInterval(dotsInterval)
  }, [])

  // Симуляция прогресса загрузки с разными фазами
  const simulateProgress = useCallback(() => {
    // Начальная фаза (0-40%)
    if (progress < 40) {
      setProgress(prev => Math.min(40, prev + Math.random() * 5))
      setPhase('initial')
      return 150
    }
    // Фаза загрузки (40-80%)
    if (progress < 80) {
      setProgress(prev => Math.min(80, prev + Math.random() * 3))
      setPhase('loading')
      return 300
    }
    // Финальная фаза (80-99%)
    if (progress < 99) {
      setProgress(prev => Math.min(99, prev + Math.random() * 1))
      setPhase('finalizing')
      return 500
    }
    return null
  }, [progress])

  useEffect(() => {
    const interval = simulateProgress()
    if (interval === null) return

    const timer = setTimeout(() => {
      simulateProgress()
    }, interval)

    return () => clearTimeout(timer)
  }, [progress, simulateProgress])

  const getLoadingText = () => {
    switch (phase) {
      case 'initial':
        return 'Initializing TradingView widget'
      case 'loading':
        return 'Loading market data'
      case 'finalizing':
        return 'Finalizing'
      default:
        return 'Loading'
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black/80 transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="flex flex-col items-center gap-4 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
        <div className="size-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {getLoadingText()}
            {dots}
          </p>
          <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {Math.round(progress)}% complete
          </p>
        </div>
      </div>
    </div>
  )
}

// Добавляем функцию для внешнего управления индикатором
export const createLoadingController = () => {
  let forceComplete: () => void

  const promise = new Promise<void>(resolve => {
    forceComplete = () => {
      resolve()
    }
  })

  return {
    promise,
    complete: () => forceComplete()
  }
}
