'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, User } from 'lucide-react'
import { useAuth } from '@/components/auth/auth-provider'

const navLinks = [
  { href: '/workouts', label: 'Workouts' },
  { href: '/programs', label: 'Programs' },
  { href: '/tools', label: 'Tools' },
  { href: '/leaderboard', label: 'Leaderboard' },
]

interface NavBarProps {
  logo: string
  brandName: string
}

export function NavBar({ logo, brandName }: NavBarProps) {
  const pathname = usePathname()
  const { user } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const linkClass = (href: string) =>
    `text-sm transition-colors ${
      pathname === href || pathname.startsWith(href + '/')
        ? 'text-[var(--accent)]'
        : 'text-[var(--text-secondary)] hover:text-[var(--accent)]'
    }`

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        className="w-full max-w-[900px] bg-[var(--bg-secondary)]/80 backdrop-blur-md border border-[var(--border)] rounded-xl px-4 py-3"
        aria-label="Main navigation"
      >
        {/* Desktop row */}
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg overflow-hidden">
              <Image
                src={logo}
                alt={`${brandName} logo`}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-extrabold text-[var(--accent)] text-sm">
              {brandName}
            </span>
          </Link>

          {/* Desktop nav links (center) */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop auth (right) */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link
                href="/profile"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--accent-surface)] text-[var(--accent)] hover:bg-[var(--accent)]/20 transition-colors"
                aria-label="Profile"
              >
                <User className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-sm px-3 py-1.5 rounded-lg bg-[var(--accent)] text-[var(--bg-primary)] font-medium hover:bg-[var(--accent)]/90 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-8 h-8 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-[var(--border)] flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${linkClass(link.href)} text-base py-1`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-[var(--border)]">
              {user ? (
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors py-1"
                  onClick={() => setMobileOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="inline-block text-sm px-3 py-1.5 rounded-lg bg-[var(--accent)] text-[var(--bg-primary)] font-medium hover:bg-[var(--accent)]/90 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}
