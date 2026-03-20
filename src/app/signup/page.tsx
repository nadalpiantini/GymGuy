'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LoginForm } from '@/components/auth/login-form'
import { SignUpForm } from '@/components/auth/signup-form'
import { Card } from '@/components/ui/card'
import { Dumbbell } from 'lucide-react'

export default function SignUpPage() {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-[var(--accent)]" />
            <span className="text-2xl font-bold text-[var(--text-primary)]">GymGuy</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[var(--text-primary)]">
          {isLogin ? 'Sign in to your account' : 'Create your account'}
        </h2>
        <p className="mt-2 text-center text-sm text-[var(--text-secondary)]">
          {isLogin ? (
            <>
              Or{' '}
              <button
                onClick={() => setIsLogin(false)}
                className="font-medium text-[var(--accent)] hover:text-[var(--accent)]/80"
              >
                create a new account
              </button>
            </>
          ) : (
            <>
              Or{' '}
              <button
                onClick={() => setIsLogin(true)}
                className="font-medium text-[var(--accent)] hover:text-[var(--accent)]/80"
              >
                sign in to your existing account
              </button>
            </>
          )}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 sm:px-10">
          {isLogin ? (
            <LoginForm
              onSuccess={() => window.location.href = '/'}
              onSwitchToSignUp={() => setIsLogin(false)}
            />
          ) : (
            <SignUpForm
              onSuccess={() => window.location.href = '/'}
              onSwitchToLogin={() => setIsLogin(true)}
            />
          )}
        </Card>
      </div>
    </div>
  )
}
