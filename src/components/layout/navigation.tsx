'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/auth-provider'
import { Button } from '@/components/ui/button'
import { getTranslation } from '@/lib/i18n'
import { 
  Home, 
  Dumbbell, 
  Calendar, 
  BarChart3, 
  Calculator, 
  Trophy, 
  Crown, 
  Info,
  Menu,
  X,
  User,
  LogOut
} from 'lucide-react'

interface NavigationProps {
  locale?: 'en' | 'es'
}

export function Navigation({ locale = 'en' }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { user, profile, signOut } = useAuth()

  const navItems = [
    { href: '/', label: getTranslation('nav.home', locale), icon: Home },
    { href: '/workouts', label: getTranslation('nav.workouts', locale), icon: Dumbbell },
    { href: '/programs', label: getTranslation('nav.programs', locale), icon: Calendar },
    { href: '/statistics', label: getTranslation('nav.statistics', locale), icon: BarChart3 },
    { href: '/tools', label: getTranslation('nav.tools', locale), icon: Calculator },
    { href: '/leaderboard', label: getTranslation('nav.leaderboard', locale), icon: Trophy },
    { href: '/premium', label: getTranslation('nav.premium', locale), icon: Crown },
    { href: '/about', label: getTranslation('nav.about', locale), icon: Info },
  ]

  const handleSignOut = async () => {
    await signOut()
    setIsOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50 shadow-soft">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Dumbbell className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">GymGuy</span>
        </Link>

        <div className="flex items-center space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link group"
            >
              <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-muted/50 backdrop-blur-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">{profile?.name || user.email}</span>
                  {profile?.plan === 'premium' && (
                    <Crown className="h-4 w-4 text-yellow-500 animate-pulse" />
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="group">
                <LogOut className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                {getTranslation('auth.sign_out', locale)}
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="hover:bg-muted/50">
                  {getTranslation('auth.sign_in', locale)}
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" variant="gradient" className="shadow-soft">
                  {getTranslation('auth.sign_up', locale)}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-background/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50 shadow-soft">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Dumbbell className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">GymGuy</span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="px-4 pb-6 space-y-3 bg-background/95 backdrop-blur-md">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link flex items-center space-x-3 w-full group"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="border-t border-border/50 pt-4 mt-4 space-y-3">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 px-3 py-3 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-foreground">{profile?.name || user.email}</span>
                      {profile?.plan === 'premium' && (
                        <Crown className="h-4 w-4 text-yellow-500 animate-pulse" />
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200 group"
                  >
                    <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>{getTranslation('auth.sign_out', locale)}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full hover:bg-muted/50">
                      {getTranslation('auth.sign_in', locale)}
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsOpen(false)}>
                    <Button size="sm" variant="gradient" className="w-full shadow-soft">
                      {getTranslation('auth.sign_up', locale)}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
