'use client'

import React, { useEffect, useRef, memo, useState } from 'react'
import { LoadingIndicator } from './loading-indicator'

export function MarketTrending({}) {
  const container = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!container.current) return

    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js'
    script.type = 'text/javascript'
    script.async = true

    // Add load handlers
    script.onload = () => setIsLoading(false)
    script.onerror = () => setIsLoading(false)

    script.innerHTML = JSON.stringify({
      colorTheme: 'light',
      dateRange: '1D',
      exchange: 'US',
      showChart: true,
      locale: 'en',
      largeChartUrl: '',
      isTransparent: false,
      showSymbolLogo: true,
      showFloatingTooltip: true,
      width: '100%',
      height: '100%',
      plotLineColorGrowing: 'rgba(106, 168, 79, 1)',
      plotLineColorFalling: 'rgba(255, 0, 0, 1)',
      gridLineColor: 'rgba(0, 0, 0, 0)',
      scaleFontColor: 'rgba(19, 23, 34, 1)',
      belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
      belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)',
      belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
      belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
      symbolActiveColor: 'rgba(60, 120, 216, 0.12)'
    })

    container.current.appendChild(script)

    return () => {
      if (container.current) {
        container.current.removeChild(script)
      }
    }
  }, [])

  return (
    <div style={{ height: '500px' }}>
      {isLoading && <LoadingIndicator />}
      <div
        className={`tradingview-widget-container ${isLoading ? 'hidden' : ''}`}
        ref={container}
        style={{ height: '100%', width: '100%' }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: 'calc(100% - 32px)', width: '100%' }}
        ></div>
        <div className="tradingview-widget-copyright">
          
        </div>
      </div>
    </div>
  )
}

export default memo(MarketTrending)
