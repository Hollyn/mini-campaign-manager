import { ReactNode, useEffect, useMemo, useRef } from 'react'

import { cn } from '../../lib/utils'
import { isRichTextEmpty, normalizeRichTextHtml } from '../../lib/rich-text'

type RichTextCommand = 'bold' | 'formatBlock' | 'insertOrderedList' | 'insertUnorderedList' | 'italic' | 'underline'

interface RichTextAction {
  command: RichTextCommand
  label: string
  value?: string
}

interface RichTextEditorProps {
  actions: RichTextAction[]
  disabled?: boolean
  onChange: (value: string) => void
  placeholder: string
  value: string
}

const getActionIcon = (action: RichTextAction): ReactNode => {
  if (action.command === 'bold') {
    return <span className="text-base font-semibold">B</span>
  }

  if (action.command === 'italic') {
    return <span className="text-base italic">I</span>
  }

  if (action.command === 'underline') {
    return <span className="text-base underline underline-offset-2">U</span>
  }

  if (action.command === 'insertUnorderedList') {
    return (
      <svg aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
        <circle cx="6" cy="7" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="6" cy="12" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="6" cy="17" r="1.25" fill="currentColor" stroke="none" />
        <path d="M10 7h8" />
        <path d="M10 12h8" />
        <path d="M10 17h8" />
      </svg>
    )
  }

  if (action.command === 'insertOrderedList') {
    return (
      <svg aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
        <path d="M4.5 7h2v4" />
        <path d="M4.5 11h2" />
        <path d="M4.5 15.5h2l-2 2h2" />
        <path d="M10 7h8" />
        <path d="M10 12h8" />
        <path d="M10 17h8" />
      </svg>
    )
  }

  if (action.command === 'formatBlock' && action.value === 'blockquote') {
    return (
      <svg aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
        <path d="M8.5 9H6.75A1.75 1.75 0 0 0 5 10.75V12.5A1.5 1.5 0 0 0 6.5 14h2v3l2-2.5V10.5A1.5 1.5 0 0 0 9 9Z" />
        <path d="M17.5 9h-1.75A1.75 1.75 0 0 0 14 10.75V12.5a1.5 1.5 0 0 0 1.5 1.5h2v3l2-2.5V10.5A1.5 1.5 0 0 0 18 9Z" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
      <path d="M5 7h14" />
      <path d="M9 7v10" />
      <path d="M9 12h6" />
      <path d="M9 17h7" />
    </svg>
  )
}

export const RichTextEditor = ({ actions, disabled = false, onChange, placeholder, value }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const isEmpty = useMemo(() => isRichTextEmpty(value), [value])

  useEffect(() => {
    if (!editorRef.current) {
      return
    }

    const normalizedValue = normalizeRichTextHtml(value)

    if (editorRef.current.innerHTML !== normalizedValue) {
      editorRef.current.innerHTML = normalizedValue
    }
  }, [value])

  const syncValue = () => {
    if (!editorRef.current) {
      return
    }

    onChange(normalizeRichTextHtml(editorRef.current.innerHTML))
  }

  const handleAction = (action: RichTextAction) => {
    if (disabled || !editorRef.current) {
      return
    }

    editorRef.current.focus()
    document.execCommand(action.command, false, action.value)
    syncValue()
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 rounded-[1.25rem] bg-surface-container-low p-2">
        {actions.map((action) => (
          <button
            aria-label={action.label}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-on-background transition-colors hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-50"
            disabled={disabled}
            key={`${action.command}-${action.label}`}
            onClick={() => handleAction(action)}
            title={action.label}
            type="button"
          >
            {getActionIcon(action)}
          </button>
        ))}
      </div>

      <div className="relative rounded-[1.25rem] bg-surface-container-highest p-1">
        {isEmpty ? (
          <div className="pointer-events-none absolute left-5 top-5 text-sm text-on-surface-variant/70">{placeholder}</div>
        ) : null}

        <div
          className={cn(
            'rich-text-content min-h-[320px] rounded-[1rem] bg-white px-4 py-4 text-sm text-on-surface focus:outline-none',
            disabled ? 'cursor-not-allowed opacity-70' : 'focus:ring-2 focus:ring-primary/30'
          )}
          contentEditable={!disabled}
          onBlur={syncValue}
          onInput={syncValue}
          ref={editorRef}
          suppressContentEditableWarning
        />
      </div>
    </div>
  )
}
