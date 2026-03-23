import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'
import Image from 'next/image'
import './globals.css'
import { AuthProvider } from '@/components/auth/auth-provider'
import { HydrationFix } from '@/components/hydration-fix'
import { NavBar } from '@/components/ui/nav-bar'

const inter = Inter({ subsets: ['latin'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'The Core by Alberto Mateo — Train With Purpose',
  description: 'Entrenamientos personalizados, programas estructurados y seguimiento de progreso. El gym de Alberto Mateo.',
  keywords: 'the core, alberto mateo, entrenamiento, gym, fitness, programas, salud',
  authors: [{ name: 'Alberto Mateo' }],
  icons: {
    icon: '/images/the-core-logo.png',
    apple: '/images/the-core-logo.png',
  },
  openGraph: {
    title: 'The Core by Alberto Mateo — Train With Purpose',
    description: 'Entrenamientos personalizados, programas estructurados y seguimiento de progreso.',
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: '/images/the-core-logo.png',
        width: 1200,
        height: 630,
        alt: 'The Core by Alberto Mateo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Core by Alberto Mateo — Train With Purpose',
    description: 'Entrenamientos personalizados, programas estructurados y seguimiento de progreso.',
    images: ['/images/the-core-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <HydrationFix />
        <AuthProvider>
          <div className="min-h-screen bg-[var(--bg-primary)]">
            {/* Skip to main content link for keyboard navigation */}
            <a href="#main-content" className="skip-to-content">
              Skip to main content
            </a>
            <NavBar logo="/images/the-core-logo.png" brandName="The Core" />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border)] py-16 mt-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                  <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 rounded-xl overflow-hidden">
                        <Image
                          src="/images/the-core-logo.png"
                          alt="The Core Logo"
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-2xl font-extrabold text-[var(--accent)]">The Core</span>
                        <span className="text-xs text-[var(--text-secondary)] uppercase tracking-wider -mt-1">BY ALBERTO MATEO</span>
                      </div>
                    </div>
                    <p className="text-[var(--text-secondary)] mb-6 leading-relaxed text-lg">
                      Entrena con propósito. Programas diseñados por Alberto Mateo para
                      llevarte al siguiente nivel, sin importar tu punto de partida.
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-[var(--text-secondary)]">
                      <span className="w-2 h-2 bg-[var(--accent)] rounded-full"></span>
                      <span>Entrenamiento real</span>
                      <span>•</span>
                      <span>Resultados reales</span>
                      <span>•</span>
                      <span>Alberto Mateo Coach</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider mb-6">
                      Plataforma
                    </h3>
                    <ul className="space-y-3">
                      <li><a href="/workouts" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Generador de Rutinas</a></li>
                      <li><a href="/programs" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Programas</a></li>
                      <li><a href="/tools" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Herramientas</a></li>
                      <li><a href="/statistics" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Estadísticas</a></li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider mb-6">
                      Comunidad
                    </h3>
                    <ul className="space-y-3">
                      <li><a href="/about" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Sobre Nosotros</a></li>
                      <li><a href="/leaderboard" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Leaderboard</a></li>
                      <li><a href="/premium" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Premium</a></li>
                      <li><a href="/donate" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Donar</a></li>
                    </ul>
                  </div>
                </div>

                <div className="border-t border-[var(--border)] mt-12 pt-8">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-[var(--text-secondary)] text-sm">
                      © 2025 The Core by Alberto Mateo. Todos los derechos reservados.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                      <a href="/legal/privacy" className="text-[var(--text-secondary)] hover:text-[var(--accent)] text-sm transition-colors">Privacy</a>
                      <a href="/legal/terms" className="text-[var(--text-secondary)] hover:text-[var(--accent)] text-sm transition-colors">Terms</a>
                      <a href="https://www.instagram.com/albertomateocoach/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent)] text-sm transition-colors">Instagram</a>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
