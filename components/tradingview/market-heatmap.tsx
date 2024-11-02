'use client'

import React, { useEffect, useRef, memo, useState } from 'react'
import { useTheme } from 'next-themes'
import { LoadingIndicator } from './loading-indicator'

export function MarketHeatmap({}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadWidget = () => {
      if (!containerRef.current) return

      try {
        // Очищаем контейнер
        containerRef.current.innerHTML = ''

        // Создаем контейнер для виджета
        const widget = document.createElement('div')
        widget.className = 'tradingview-widget-container__widget'
        widget.style.height = 'calc(100% - 32px)'
        widget.style.width = '100%'
        containerRef.current.appendChild(widget)

        // Создаем скрипт
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.src =
          'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js'

        // Add load handlers
        script.onload = () => setIsLoading(false)
        script.onerror = () => setIsLoading(false)

        // Конфигурация виджета
        const config = {
          exchanges: [],
          dataSource: 'SPX500',
          grouping: 'sector',
          blockSize: 'market_cap_basic',
          blockColor: 'change',
          locale: 'en',
          symbolUrl: '',
          colorTheme: theme === 'dark' ? 'dark' : 'light',
          hasTopBar: false,
          isDataSetEnabled: false,
          isZoomEnabled: true,
          hasSymbolTooltip: true,
          isMonoSize: false,
          width: '100%',
          height: '100%'
        }

        script.innerHTML = JSON.stringify(config)

        // Добавляем скрипт в контейнер
        containerRef.current.appendChild(script)
      } catch (error) {
        console.error('Error initializing Market Heatmap widget:', error)
        setIsLoading(false)
      }
    }

    // Запускаем инициализацию виджета после небольшой задержки
    const timer = setTimeout(loadWidget, 100)

    return () => {
      clearTimeout(timer)
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [theme])

  return (
    <div style={{ height: '500px' }}>
      {isLoading && <LoadingIndicator />}
      <div
        className={`tradingview-widget-container ${isLoading ? 'hidden' : ''}`}
        ref={containerRef}
        style={{ height: '100%', width: '100%' }}
      >
        <div className="tradingview-widget-copyright">
          
        </div>
      </div>
    </div>
  )
}

export default memo(MarketHeatmap)
