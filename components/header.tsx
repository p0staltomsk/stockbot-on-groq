import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  IconGitHub,
  IconGroq,
  IconSeparator,
  IconVercel
} from '@/components/ui/icons'
import { Session } from '@/lib/types'
import { ThemeToggle } from '@/components/theme-toggle'

async function UserOrLogin() {
  return (
    <>
      <Link href="https://web.89281112.xyz/" rel="nofollow">
        Main
      </Link>

      <div className="flex items-center font-semibold">
        <IconSeparator className="size-6 text-muted-foreground/50" />
        <div className="flex items-center gap-2">
          <a
            href="/stockbot-on-groq"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: 'ghost' }))}
            style={{ borderRadius: 0, color: '#F55036', padding: '4px' }}
          >
            <span className="flex">Start New Chat</span>
          </a>
        </div>
      </div>
    </>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <ThemeToggle />
      </div>
    </header>
  )
}
