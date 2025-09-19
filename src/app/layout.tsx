import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import './globals.css'
import { AuthProvider } from '@/components/auth/auth-provider'
import { HydrationFix } from '@/components/hydration-fix'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://gymguy.sujeto10.com'),
  title: 'GymGuy - Build Your Perfect Workout',
  description: 'Create personalized workouts, follow structured programs, and track your fitness journey with our comprehensive platform.',
  keywords: 'workout, fitness, exercise, training, gym, health, wellness',
  authors: [{ name: 'GymGuy Team' }],
  icons: {
    icon: '/images/ponteroca-logo.jpg',
    apple: '/images/ponteroca-logo.jpg',
  },
  openGraph: {
    title: 'GymGuy - Build Your Perfect Workout',
    description: 'Create personalized workouts, follow structured programs, and track your fitness journey.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/ponteroca-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'PONTEROCA Logo - GymGuy Fitness Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GymGuy - Build Your Perfect Workout',
    description: 'Create personalized workouts, follow structured programs, and track your fitness journey.',
    images: ['/images/ponteroca-logo.jpg'],
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
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <HydrationFix />
        <AuthProvider>
          <div className="min-h-screen bg-black">
            {/* Skip to main content link for keyboard navigation */}
            <a href="#main-content" className="skip-to-content">
              Skip to main content
            </a>
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <footer className="bg-gray-900 border-t border-gray-800 py-16 mt-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                  <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shadow-primary-glow animate-motivate-pulse">
                        <Image
                          src="/images/ponteroca-logo.jpg"
                          alt="PONTEROCA Logo"
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-2xl font-teko-bold brand-text">GymGuy</span>
                        <span className="text-sm brand-slogan -mt-1">UNSTOPPABLE STRENGTH</span>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-6 leading-relaxed text-lg">
                      Build your perfect workout with our comprehensive fitness platform. 
                      Create personalized routines, follow structured programs, and track your progress.
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                      <span>Open source</span>
                      <span>•</span>
                      <span>Self-hostable</span>
                      <span>•</span>
                      <span>Community driven</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">
                      Product
                    </h3>
                    <ul className="space-y-3">
                      <li><a href="/workouts" className="text-gray-400 hover:text-primary transition-colors">Workout Generator</a></li>
                      <li><a href="/programs" className="text-gray-400 hover:text-primary transition-colors">Programs</a></li>
                      <li><a href="/tools" className="text-gray-400 hover:text-primary transition-colors">Tools</a></li>
                      <li><a href="/statistics" className="text-gray-400 hover:text-primary transition-colors">Statistics</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">
                      Community
                    </h3>
                    <ul className="space-y-3">
                      <li><a href="/about" className="text-gray-400 hover:text-primary transition-colors">About</a></li>
                      <li><a href="/leaderboard" className="text-gray-400 hover:text-primary transition-colors">Leaderboard</a></li>
                      <li><a href="/premium" className="text-gray-400 hover:text-primary transition-colors">Premium</a></li>
                      <li><a href="/donate" className="text-gray-400 hover:text-primary transition-colors">Donate</a></li>
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-gray-800 mt-12 pt-8">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                      © 2024 GymGuy. Open source and self-hostable.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                      <a href="/legal/privacy" className="text-gray-400 hover:text-primary text-sm transition-colors">Privacy</a>
                      <a href="/legal/terms" className="text-gray-400 hover:text-primary text-sm transition-colors">Terms</a>
                      <a href="https://github.com/gymguy" className="text-gray-400 hover:text-primary text-sm transition-colors">GitHub</a>
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
