'use client'

import React, { useEffect, useRef, memo, useState } from 'react'
import { LoadingIndicator } from './loading-indicator'

export function StockFinancials({ props: symbol }: { props: string }) {
  const container = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!container.current) return
    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-financials.js'
    script.type = 'text/javascript'
    script.async = true

    // Add load handlers
    script.onload = () => setIsLoading(false)
    script.onerror = () => setIsLoading(false)

    script.innerHTML = `
      {
        "isTransparent": true,
        "largeChartUrl": "",
        "displayMode": "regular",
        "width": "100%",
        "height": "100%",
        "colorTheme": "light",
        "symbol": "${symbol}",
        "locale": "en"
      }`

    container.current.appendChild(script)

    return () => {
      if (container.current) {
        const scriptElement = container.current.querySelector('script')
        if (scriptElement) {
          container.current.removeChild(scriptElement)
        }
      }
    }
  }, [symbol])

  return (
    <div style={{ height: '500px' }}>
      {isLoading && <LoadingIndicator />}
      <div
        className={`tradingview-widget-container ${isLoading ? 'hidden' : ''}`}
        ref={container}
      >
        <div className="tradingview-widget-container__widget"></div>
        <div className="tradingview-widget-copyright">
         
        </div>
      </div>
    </div>
  )
}

export default memo(StockFinancials)
