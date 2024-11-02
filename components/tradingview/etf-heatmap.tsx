'use client'

import React, { useEffect, useRef, memo, useState } from 'react'
import { LoadingIndicator } from './loading-indicator'

export function ETFHeatmap({}) {
  const container = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!container.current) return

    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-etf-heatmap.js'
    script.type = 'text/javascript'
    script.async = true

    // Add load handlers
    script.onload = () => setIsLoading(false)
    script.onerror = () => setIsLoading(false)

    script.innerHTML = JSON.stringify({
      dataSource: 'AllUSEtf',
      blockSize: 'aum',
      blockColor: 'change',
      grouping: 'asset_class',
      locale: 'en',
      symbolUrl: '',
      colorTheme: 'light',
      hasTopBar: true,
      isDataSetEnabled: true,
      isZoomEnabled: true,
      hasSymbolTooltip: true,
      isMonoSize: false,
      width: '100%',
      height: '100%'
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

export default memo(ETFHeatmap)
