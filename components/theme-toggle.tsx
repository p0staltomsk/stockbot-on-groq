'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { IconMoon, IconSun } from '@/components/ui/icons'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Используем useEffect для предотвращения проблем с гидратацией
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Не рендерим ничего на сервере
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'dark' ? (
        <IconMoon className="size-5" />
      ) : (
        <IconSun className="size-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
