'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/auth-provider'
import { supabase } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/ui/page-hero'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Crown,
  Check,
  X,
  Star,
  Users,
  BarChart3,
  Calendar,
  MessageCircle,
  Zap,
  Shield,
  Heart
} from 'lucide-react'

interface PremiumFeatures {
  unlimited_history: boolean
  advanced_stats: boolean
  pro_programs: boolean
  personal_coach: boolean
  priority_support: boolean
  no_ads: boolean
}

export default function PremiumPage() {
  const { user, profile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly')

  // Using the imported supabase client from supabase-client.ts

  const plans = {
    monthly: {
      price: 9.99,
      period: 'month',
      savings: null
    },
    annual: {
      price: 99.99,
      period: 'year',
      savings: '17%'
    }
  }

  const features: PremiumFeatures = {
    unlimited_history: true,
    advanced_stats: true,
    pro_programs: true,
    personal_coach: true,
    priority_support: true,
    no_ads: true
  }

  const freeFeatures = {
    unlimited_history: false,
    advanced_stats: false,
    pro_programs: false,
    personal_coach: false,
    priority_support: false,
    no_ads: false
  }

  const handleSubscribe = async () => {
    if (!user) {
      alert('Please sign in to subscribe to premium')
      return
    }

    setLoading(true)
    try {
      // In a real implementation, you would:
      // 1. Create a Stripe checkout session
      // 2. Redirect to Stripe checkout
      // 3. Handle the webhook to update user's premium status

      // For now, we'll simulate the process
      const { error } = await supabase
        .from('gymguy_payments')
        .insert({
          user_id: user.id,
          plan: 'premium',
          status: 'completed',
          amount: plans[selectedPlan].price,
          currency: 'usd',
          period_start: new Date().toISOString(),
          period_end: new Date(Date.now() + (selectedPlan === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000).toISOString()
        })

      if (error) throw error

      // Update user profile
      await supabase
        .from('gymguy_profiles')
        .update({ plan: 'premium' })
        .eq('id', user.id)

      alert('Premium subscription activated! Welcome to premium!')
      window.location.reload()
    } catch (error) {
      console.error('Error subscribing:', error)
      alert('Error processing subscription. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelSubscription = async () => {
    if (!user) return

    if (!confirm('Are you sure you want to cancel your premium subscription?')) {
      return
    }

    setLoading(true)
    try {
      // In a real implementation, you would:
      // 1. Cancel the Stripe subscription
      // 2. Update the user's plan to free

      await supabase
        .from('gymguy_profiles')
        .update({ plan: 'free' })
        .eq('id', user.id)

      alert('Premium subscription cancelled. You can resubscribe anytime.')
      window.location.reload()
    } catch (error) {
      console.error('Error cancelling subscription:', error)
      alert('Error cancelling subscription. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <PageHero
        badge="Premium"
        title="Go Premium"
        subtitle="Unlock advanced features, support the project, and take your fitness journey to the next level"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Community Stats */}
        <Card className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 text-center">
            Join Our Growing Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Users className="h-8 w-8 text-[var(--accent)] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[var(--text-primary)]">15,000+</div>
              <div className="text-sm text-[var(--text-secondary)]">Active Athletes</div>
            </div>
            <div className="text-center">
              <BarChart3 className="h-8 w-8 text-[var(--accent)] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[var(--text-primary)]">2.5M+</div>
              <div className="text-sm text-[var(--text-secondary)]">Workouts Completed</div>
            </div>
            <div className="text-center">
              <Star className="h-8 w-8 text-[var(--accent)] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[var(--text-primary)]">4.8/5</div>
              <div className="text-sm text-[var(--text-secondary)]">User Rating</div>
            </div>
            <div className="text-center">
              <Zap className="h-8 w-8 text-[var(--accent)] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[var(--text-primary)]">98%</div>
              <div className="text-sm text-[var(--text-secondary)]">Success Rate</div>
            </div>
          </div>
        </Card>

        {/* Pricing Plans */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              Choose Your Plan
            </h2>
            <div className="flex justify-center">
              <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-1">
                <button
                  onClick={() => setSelectedPlan('monthly')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedPlan === 'monthly'
                      ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setSelectedPlan('annual')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedPlan === 'annual'
                      ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  Annual
                  {plans.annual.savings && (
                    <span className="ml-1 px-2 py-0.5 bg-[var(--success)]/10 text-[var(--success)] text-xs rounded-full">
                      Save {plans.annual.savings}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Free</h3>
                <div className="text-4xl font-bold text-[var(--text-primary)] mb-2">$0</div>
                <div className="text-[var(--text-secondary)]">Forever</div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-[var(--success)] mr-3" />
                  <span className="text-[var(--text-primary)]">Workout Generator</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-[var(--success)] mr-3" />
                  <span className="text-[var(--text-primary)]">Basic Exercise Library</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-[var(--success)] mr-3" />
                  <span className="text-[var(--text-primary)]">6 Months History</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-[var(--success)] mr-3" />
                  <span className="text-[var(--text-primary)]">Basic Statistics</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-[var(--success)] mr-3" />
                  <span className="text-[var(--text-primary)]">Community Access</span>
                </li>
                <li className="flex items-center">
                  <X className="h-5 w-5 text-[var(--text-secondary)] mr-3" />
                  <span className="text-[var(--text-secondary)]">Premium Programs</span>
                </li>
                <li className="flex items-center">
                  <X className="h-5 w-5 text-[var(--text-secondary)] mr-3" />
                  <span className="text-[var(--text-secondary)]">Advanced Analytics</span>
                </li>
                <li className="flex items-center">
                  <X className="h-5 w-5 text-[var(--text-secondary)] mr-3" />
                  <span className="text-[var(--text-secondary)]">1-on-1 Coaching</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full" disabled>
                Current Plan
              </Button>
            </Card>

            {/* Premium Plan */}
            <Card className="border-[var(--accent)]/30 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge variant="premium" className="px-4 py-1">
                  Most Popular
                </Badge>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Premium</h3>
                <div className="text-4xl font-bold text-[var(--text-primary)] mb-2">
                  ${plans[selectedPlan].price}
                </div>
                <div className="text-[var(--text-secondary)]">per {plans[selectedPlan].period}</div>
                {selectedPlan === 'annual' && (
                  <div className="text-sm text-[var(--success)] mt-1">
                    Save ${(9.99 * 12) - 99.99} per year
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-[var(--success)] mr-3" />
                  <span className="text-[var(--text-primary)]">Everything in Free</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-[var(--success)] mr-3" />
                  <span className="text-[var(--text-primary)]">Unlimited History</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-[var(--success)] mr-3" />
                  <span className="text-[var(--text-primary)]">Advanced Statistics</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-[var(--success)] mr-3" />
                  <span className="text-[var(--text-primary)]">All Premium Programs</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-[var(--success)] mr-3" />
                  <span className="text-[var(--text-primary)]">1-on-1 Coaching Sessions</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-[var(--success)] mr-3" />
                  <span className="text-[var(--text-primary)]">Priority Support</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-[var(--success)] mr-3" />
                  <span className="text-[var(--text-primary)]">Ad-Free Experience</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-[var(--success)] mr-3" />
                  <span className="text-[var(--text-primary)]">Early Access to Features</span>
                </li>
              </ul>

              {profile?.plan === 'premium' ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleCancelSubscription}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Cancel Subscription'}
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={handleSubscribe}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Upgrade to Premium'}
                </Button>
              )}
            </Card>
          </div>
        </div>

        {/* Feature Comparison */}
        <Card className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8 text-center">
            Feature Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-4 px-6 font-medium text-[var(--text-primary)]">Features</th>
                  <th className="text-center py-4 px-6 font-medium text-[var(--text-primary)]">Free</th>
                  <th className="text-center py-4 px-6 font-medium text-[var(--text-primary)]">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {Object.entries(features).map(([key, value]) => (
                  <tr key={key}>
                    <td className="py-4 px-6 font-medium text-[var(--text-primary)]">
                      {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {freeFeatures[key as keyof typeof freeFeatures] ? (
                        <Check className="h-5 w-5 text-[var(--success)] mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-[var(--text-secondary)] mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="h-5 w-5 text-[var(--success)] mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* FAQ */}
        <Card className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-[var(--text-secondary)]">
                Yes! You can cancel your premium subscription at any time. You&apos;ll continue to have
                access to premium features until the end of your current billing period.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                Is the core platform still free?
              </h3>
              <p className="text-[var(--text-secondary)]">
                Absolutely! The core workout generator, basic statistics, and community features
                will always remain free. Premium adds advanced features and supports the project.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-[var(--text-secondary)]">
                We accept all major credit cards, debit cards, and PayPal through our secure
                Stripe payment processor.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                Can I self-host the premium version?
              </h3>
              <p className="text-[var(--text-secondary)]">
                Yes! Since we&apos;re open source, you can self-host the entire platform including
                premium features. Premium subscriptions support the hosted version and development.
              </p>
            </div>
          </div>
        </Card>

        {/* Open Source Notice */}
        <Card className="text-center">
          <Shield className="h-12 w-12 text-[var(--accent)] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">
            Open Source &amp; Self-Hostable
          </h3>
          <p className="text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
            GymGuy is and will always be open source. You can self-host the entire platform
            for free. Premium subscriptions support the hosted version and help us continue development.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={() => window.open('https://github.com/workout-cool', '_blank')}>
              View on GitHub
            </Button>
            <Button variant="outline" onClick={() => window.open('/docs/self-hosting', '_blank')}>
              Self-Hosting Guide
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
