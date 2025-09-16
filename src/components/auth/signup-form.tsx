'use client'

import { useState } from 'react'
import { useAuth } from './auth-provider'
import { Button } from '@/components/ui/button'
import { getTranslation } from '@/lib/i18n'

interface SignUpFormProps {
  onSuccess?: () => void
  onSwitchToLogin?: () => void
  locale?: 'en' | 'es'
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
      <div className="text-center space-y-4">
        <div className="text-green-600 text-lg font-medium">
          {getTranslation('auth.signup_success', locale)}
        </div>
        <p className="text-gray-600">
          {getTranslation('auth.check_email', locale)}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          {getTranslation('auth.name', locale)}
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={getTranslation('auth.name_placeholder', locale)}
        />
      </div>

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

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          {getTranslation('auth.confirm_password', locale)}
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={getTranslation('auth.confirm_password_placeholder', locale)}
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
        {loading ? getTranslation('auth.creating_account', locale) : getTranslation('auth.create_account', locale)}
      </Button>

      {onSwitchToLogin && (
        <div className="text-center">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            {getTranslation('auth.have_account', locale)}
          </button>
        </div>
      )}
    </form>
  )
}
