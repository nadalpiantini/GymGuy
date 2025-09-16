import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/auth/auth-provider'
import { Navigation } from '@/components/layout/navigation'
import { HydrationFix } from '@/components/hydration-fix'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GymGuy - Build Your Perfect Workout',
  description: 'Create personalized workouts, follow structured programs, and track your fitness journey with our comprehensive platform.',
  keywords: 'workout, fitness, exercise, training, gym, health, wellness',
  authors: [{ name: 'GymGuy Team' }],
  openGraph: {
    title: 'GymGuy - Build Your Perfect Workout',
    description: 'Create personalized workouts, follow structured programs, and track your fitness journey.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GymGuy - Build Your Perfect Workout',
    description: 'Create personalized workouts, follow structured programs, and track your fitness journey.',
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
          <div className="min-h-screen bg-background">
            <Navigation />
            <main>
              {children}
            </main>
            <footer className="bg-muted/30 border-t border-border py-16 mt-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                  <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-primary-glow animate-motivate-pulse">
                        <span className="text-white font-bold text-xl">💪</span>
                      </div>
                      <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">GymGuy</span>
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                      Build your perfect workout with our comprehensive fitness platform. 
                      Create personalized routines, follow structured programs, and track your progress.
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                      <span>Open source</span>
                      <span>•</span>
                      <span>Self-hostable</span>
                      <span>•</span>
                      <span>Community driven</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
                      Product
                    </h3>
                    <ul className="space-y-3">
                      <li><a href="/workouts" className="text-muted-foreground hover:text-primary transition-colors">Workout Generator</a></li>
                      <li><a href="/programs" className="text-muted-foreground hover:text-primary transition-colors">Programs</a></li>
                      <li><a href="/tools" className="text-muted-foreground hover:text-primary transition-colors">Tools</a></li>
                      <li><a href="/statistics" className="text-muted-foreground hover:text-primary transition-colors">Statistics</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
                      Community
                    </h3>
                    <ul className="space-y-3">
                      <li><a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
                      <li><a href="/leaderboard" className="text-muted-foreground hover:text-primary transition-colors">Leaderboard</a></li>
                      <li><a href="/premium" className="text-muted-foreground hover:text-primary transition-colors">Premium</a></li>
                      <li><a href="/donate" className="text-muted-foreground hover:text-primary transition-colors">Donate</a></li>
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-border mt-12 pt-8">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-muted-foreground text-sm">
                      © 2024 GymGuy. Open source and self-hostable.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                      <a href="/legal/privacy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Privacy</a>
                      <a href="/legal/terms" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Terms</a>
                      <a href="https://github.com/gymguy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">GitHub</a>
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
