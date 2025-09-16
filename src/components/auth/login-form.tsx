'use client'

import { useState } from 'react'
import { useAuth } from './auth-provider'
import { Button } from '@/components/ui/button'
import { getTranslation } from '@/lib/i18n'

interface LoginFormProps {
  onSuccess?: () => void
  onSwitchToSignUp?: () => void
  locale?: 'en' | 'es'
}

export function LoginForm({ onSuccess, onSwitchToSignUp, locale = 'en' }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { signIn } = useAuth()

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          {getTranslation('auth.email', locale)}
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={getTranslation('auth.email_placeholder', locale)}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          {getTranslation('auth.password', locale)}
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={getTranslation('auth.password_placeholder', locale)}
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? getTranslation('auth.signing_in', locale) : getTranslation('auth.sign_in', locale)}
      </Button>

      {onSwitchToSignUp && (
        <div className="text-center">
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            {getTranslation('auth.no_account', locale)}
          </button>
        </div>
      )}
    </form>
  )
}
