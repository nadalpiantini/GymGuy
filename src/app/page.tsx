'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SectionHeader } from '@/components/ui/section-header'
import { PageHero } from '@/components/ui/page-hero'
import { CTASection } from '@/components/ui/cta-section'
import {
  Dumbbell,
  Calendar,
  BarChart3,
  Calculator,
  Trophy,
  Crown,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge="Open Source • Self-Hostable • Community Driven"
        title="Build Your Perfect Workout"
        subtitle="Create personalized workouts, follow structured programs, and track your fitness journey with our comprehensive platform."
      >
        <Link href="/workouts">
          <Button size="lg">Create Workout <ArrowRight className="ml-2 h-5 w-5" /></Button>
        </Link>
        <Link href="/programs">
          <Button size="lg" variant="outline">Explore Programs</Button>
        </Link>
      </PageHero>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Powerful Features"
            title="Everything You Need for Fitness Success"
            subtitle="From workout generation to progress tracking, we provide all the tools you need to achieve your fitness goals with style and efficiency."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card variant="interactive" className="p-8">
              <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center mb-6">
                <Dumbbell className="h-8 w-8 text-[var(--accent)]" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--accent)] mb-4">Workout Generator</h3>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                Create personalized workouts by selecting your available equipment and target muscle groups.
                Get exercise recommendations with videos and instructions.
              </p>
              <Link href="/workouts" className="inline-flex items-center text-[var(--accent)] hover:text-[var(--accent)]/80 font-semibold transition-transform hover:translate-x-1">
                Start Building
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            <Card variant="interactive" className="p-8">
              <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center mb-6">
                <Calendar className="h-8 w-8 text-[var(--accent)]" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Structured Programs</h3>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                Follow professionally designed programs for different fitness levels and goals.
                Track your progress and stay consistent with your training.
              </p>
              <Link href="/programs" className="inline-flex items-center text-[var(--accent)] hover:text-[var(--accent)]/80 font-semibold transition-transform hover:translate-x-1">
                Browse Programs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            <Card variant="interactive" className="p-8">
              <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="h-8 w-8 text-[var(--accent)]" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Progress Tracking</h3>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                Monitor your fitness journey with detailed statistics, weight tracking,
                and performance analytics to stay motivated and on track.
              </p>
              <Link href="/statistics" className="inline-flex items-center text-[var(--accent)] hover:text-[var(--accent)]/80 font-semibold transition-transform hover:translate-x-1">
                View Statistics
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            <Card variant="interactive" className="p-8">
              <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center mb-6">
                <Calculator className="h-8 w-8 text-[var(--accent)]" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Fitness Tools</h3>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                Calculate your TDEE, BMI, macronutrients, heart rate zones, and 1RM.
                All the tools you need for optimal training and nutrition.
              </p>
              <Link href="/tools" className="inline-flex items-center text-[var(--accent)] hover:text-[var(--accent)]/80 font-semibold transition-transform hover:translate-x-1">
                Use Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            <Card variant="interactive" className="p-8">
              <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center mb-6">
                <Trophy className="h-8 w-8 text-[var(--accent)]" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Community</h3>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                Compete with other users on the leaderboard, share your achievements,
                and stay motivated with our supportive fitness community.
              </p>
              <Link href="/leaderboard" className="inline-flex items-center text-[var(--accent)] hover:text-[var(--accent)]/80 font-semibold transition-transform hover:translate-x-1">
                Join Community
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            <Card variant="interactive" className="p-8">
              <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center mb-6">
                <Crown className="h-8 w-8 text-[var(--accent)]" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Premium Features</h3>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                Unlock advanced statistics, unlimited history, premium programs,
                and 1-on-1 coaching sessions with our premium membership.
              </p>
              <Link href="/premium" className="inline-flex items-center text-[var(--accent)] hover:text-[var(--accent)]/80 font-semibold transition-transform hover:translate-x-1">
                Go Premium
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Why Choose Us"
            title="Why Choose GymGuy?"
            subtitle="We're different from other fitness platforms. Here's what makes us special and unique."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h3 className="text-3xl md:text-4xl font-bold text-[var(--accent)]">Open Source & Self-Hostable</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[var(--success)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-[var(--success)]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[var(--text-primary)] mb-2">Always Free</h4>
                    <p className="text-[var(--text-secondary)]">The core platform will always remain free and open source.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[var(--success)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-[var(--success)]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[var(--text-primary)] mb-2">Self-Hostable</h4>
                    <p className="text-[var(--text-secondary)]">Run your own instance with full control over your data.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[var(--success)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-[var(--success)]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[var(--text-primary)] mb-2">Community Driven</h4>
                    <p className="text-[var(--text-secondary)]">Built by the community, for the community. Contribute and shape the future.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[var(--success)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-[var(--success)]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[var(--text-primary)] mb-2">No Vendor Lock-in</h4>
                    <p className="text-[var(--text-secondary)]">Your data, your rules. Export everything and move to your own server anytime.</p>
                  </div>
                </div>
              </div>
            </div>
            <Card className="p-8 lg:p-12">
              <h4 className="text-2xl font-bold mb-6 text-[var(--text-primary)]">Modern Alternative</h4>
              <p className="text-[var(--text-secondary)] mb-8 leading-relaxed text-lg">
                GymGuy was created to provide a modern, actively maintained alternative
                to outdated fitness platforms. We&apos;re committed to continuous improvement
                and community support.
              </p>
              <div className="bg-[var(--accent)]/10 p-6 rounded-xl border border-[var(--border)]">
                <p className="text-[var(--accent)] font-bold">
                  <strong>Our Mission:</strong> To provide the best free fitness platform
                  that puts users in control of their data and experience.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Transform Your Training?"
        subtitle="Join thousands using GymGuy to build better workouts and track their progress."
      >
        <Link href="/workouts">
          <Button size="lg">Create Your Workout <ArrowRight className="ml-2 h-5 w-5" /></Button>
        </Link>
        <Link href="/programs">
          <Button size="lg" variant="outline">Browse Programs</Button>
        </Link>
      </CTASection>
    </div>
  )
}
