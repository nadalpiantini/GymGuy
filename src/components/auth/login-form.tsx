'use client'

import { useState } from 'react'
import { useAuth } from './auth-provider'
import { Button } from '@/components/ui/button'
import { getTranslation } from '@/lib/i18n'

interface LoginFormProps {
  onSuccess?: () => void
  onSwitchToSignUp?: () => void
  locale?: 'en'
}

export function LoginForm({ onSuccess, onSwitchToSignUp, locale = 'en' }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { signIn } = useAuth()
  const errorId = 'login-error'
  const formId = 'login-form'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
    } else {
      onSuccess?.()
    }

    setLoading(false)
  }

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className="space-y-4"
      aria-label="Login form"
      noValidate
    >
      <div>
        <label htmlFor="login-email" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
          {getTranslation('auth.email', locale)}
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-required="true"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg-tertiary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
          placeholder={getTranslation('auth.email_placeholder', locale)}
        />
      </div>

      <div>
        <label htmlFor="login-password" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
          {getTranslation('auth.password', locale)}
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-required="true"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg-tertiary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
          placeholder={getTranslation('auth.password_placeholder', locale)}
        />
      </div>

      {error && (
        <div
          id={errorId}
          role="alert"
          aria-live="assertive"
          className="text-[var(--danger)] text-sm bg-[var(--danger)]/10 border border-[var(--danger)]/20 p-3 rounded-md"
        >
          <span className="sr-only">Error:</span> {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
        aria-busy={loading}
        aria-label={loading ? getTranslation('auth.signing_in', locale) : getTranslation('auth.sign_in', locale)}
      >
        {loading ? (
          <>
            <span aria-hidden="true">⌛</span>
            <span>{getTranslation('auth.signing_in', locale)}</span>
          </>
        ) : (
          getTranslation('auth.sign_in', locale)
        )}
      </Button>

      {onSwitchToSignUp && (
        <div className="text-center">
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="text-[var(--accent)] hover:text-[var(--accent)]/80 text-sm underline focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] rounded px-2 py-1"
          >
            {getTranslation('auth.no_account', locale)}
          </button>
        </div>
      )}
    </form>
  )
}
