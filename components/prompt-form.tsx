'use client'

import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import { useActions, useUIState } from 'ai/rsc'

import { UserMessage } from './stocks/message'
import { type AI } from '@/lib/chat/actions'
import { Button } from '@/components/ui/button'
import { IconArrowDown, IconPlus } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/navigation'

import { useLocalStorage } from '@/lib/hooks/use-local-storage'

const COOLDOWN_TIME = 30 // seconds

export function PromptForm({
  input,
  setInput,
  isOnCooldown,
  setIsOnCooldown,
  cooldownTime,
  setCooldownTime
}: {
  input: string
  setInput: (value: string) => void
  isOnCooldown: boolean
  setIsOnCooldown: (value: boolean) => void
  cooldownTime: number
  setCooldownTime: (value: number) => void
}) {
  const router = useRouter()
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const { submitUserMessage } = useActions()
  const [_, setMessages] = useUIState<typeof AI>()
  const [apiKey, setApiKey] = useLocalStorage('groqKey', '')

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isOnCooldown) {
      return
    }

    // Blur focus on mobile
    if (window.innerWidth < 600) {
      e.currentTarget.querySelector('textarea')?.blur()
    }

    const value = input.trim()
    setInput('')
    if (!value) return

    // Start cooldown
    setIsOnCooldown(true)
    setCooldownTime(COOLDOWN_TIME)

    // Optimistically add user message UI
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: nanoid(),
        display: <UserMessage>{value}</UserMessage>
      }
    ])

    // Submit and get response message
    try {
      const responseMessage = await submitUserMessage(value, apiKey)
      setMessages(currentMessages => [...currentMessages, responseMessage])
    } catch (error) {
      console.error('Error submitting message:', error)
      // Можно добавить toast уведомление об ошибке здесь
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:border sm:px-12">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-[14px] size-8 rounded-full bg-background p-0 sm:left-4"
              onClick={() => {
                router.push('/new')
              }}
            >
              <IconPlus />
              <span className="sr-only">New Chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder={
            isOnCooldown
              ? `Please wait ${cooldownTime}s before next message...`
              : 'Send a message.'
          }
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={isOnCooldown}
        />
        <div className="absolute right-0 top-[13px] sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                disabled={input === '' || isOnCooldown}
                className={isOnCooldown ? 'cursor-not-allowed opacity-50' : ''}
              >
                {isOnCooldown ? (
                  <div className="text-xs font-medium">{cooldownTime}s</div>
                ) : (
                  <div className="rotate-180">
                    <IconArrowDown />
                  </div>
                )}
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isOnCooldown ? `Wait ${cooldownTime}s` : 'Send message'}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}
