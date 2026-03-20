'use client'

import { useState } from 'react'
import { useAuth } from './auth-provider'
import { Button } from '@/components/ui/button'
import { getTranslation } from '@/lib/i18n'

interface SignUpFormProps {
  onSuccess?: () => void
  onSwitchToLogin?: () => void
  locale?: 'en'
}

export function SignUpForm({ onSuccess, onSwitchToLogin, locale = 'en' }: SignUpFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const { signUp } = useAuth()
  const errorId = 'signup-error'
  const formId = 'signup-form'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError(getTranslation('auth.password_mismatch', locale))
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError(getTranslation('auth.password_too_short', locale))
      setLoading(false)
      return
    }

    const { error } = await signUp(email, password, name)

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      onSuccess?.()
    }

    setLoading(false)
  }

  if (success) {
    return (
      <div className="text-center space-y-4" role="status" aria-live="polite">
        <div className="text-[var(--success)] text-lg font-medium">
          {getTranslation('auth.signup_success', locale)}
        </div>
        <p className="text-[var(--text-secondary)]">
          {getTranslation('auth.check_email', locale)}
        </p>
      </div>
    )
  }

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className="space-y-4"
      aria-label="Sign up form"
      noValidate
    >
      <div>
        <label htmlFor="signup-name" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
          {getTranslation('auth.name', locale)}
        </label>
        <input
          id="signup-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          aria-required="true"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg-tertiary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
          placeholder={getTranslation('auth.name_placeholder', locale)}
        />
      </div>

      <div>
        <label htmlFor="signup-email" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
          {getTranslation('auth.email', locale)}
        </label>
        <input
          id="signup-email"
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
        <label htmlFor="signup-password" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
          {getTranslation('auth.password', locale)}
          <span className="text-[var(--text-secondary)] text-xs ml-1">(min 6 characters)</span>
        </label>
        <input
          id="signup-password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-required="true"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : 'password-requirements'}
          minLength={6}
          className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg-tertiary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
          placeholder={getTranslation('auth.password_placeholder', locale)}
        />
        <span id="password-requirements" className="sr-only">Password must be at least 6 characters</span>
      </div>

      <div>
        <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
          {getTranslation('auth.confirm_password', locale)}
        </label>
        <input
          id="signup-confirm-password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          aria-required="true"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg-tertiary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
          placeholder={getTranslation('auth.confirm_password_placeholder', locale)}
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
        aria-label={loading ? getTranslation('auth.creating_account', locale) : getTranslation('auth.create_account', locale)}
      >
        {loading ? (
          <>
            <span aria-hidden="true">⏛</span>
            <span>{getTranslation('auth.creating_account', locale)}</span>
          </>
        ) : (
          getTranslation('auth.create_account', locale)
        )}
      </Button>

      {onSwitchToLogin && (
        <div className="text-center">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-[var(--accent)] hover:text-[var(--accent)]/80 text-sm"
          >
            {getTranslation('auth.have_account', locale)}
          </button>
        </div>
      )}
    </form>
  )
}
