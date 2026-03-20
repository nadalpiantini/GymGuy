'use client'

import {
  Heart,
  Coffee,
  Gift,
  Users,
  Code,
  Zap,
  Shield,
  Globe
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/ui/page-hero'
import { Card } from '@/components/ui/card'

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <PageHero
        badge="Support"
        title="Donate"
        subtitle="Help us keep the project running, growing, and improving. Every contribution makes a difference in building the future of fitness."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Why Support Section */}
        <Card className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 text-center">
            Why Support Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Always Free</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Core features will always remain free and open source
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Open Source</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Transparent development with full source code available
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Continuous Updates</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Regular improvements and new features based on feedback
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Global Impact</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Helping thousands of people worldwide achieve their fitness goals
              </p>
            </div>
          </div>
        </Card>

        {/* Donation Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Ko-fi */}
          <Card className="text-center">
            <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Coffee className="h-8 w-8 text-[var(--accent)]" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Buy us a Coffee</h3>
            <p className="text-[var(--text-secondary)] mb-6">
              Support us on Ko-fi with a one-time donation. Perfect for showing appreciation
              for the project or specific features you love.
            </p>
            <Button
              size="lg"
              className="w-full"
              onClick={() => window.open('https://ko-fi.com/workoutcool', '_blank')}
            >
              <Coffee className="h-5 w-5 mr-2" />
              Support on Ko-fi
            </Button>
          </Card>

          {/* Premium Subscription */}
          <Card className="text-center">
            <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Gift className="h-8 w-8 text-[var(--accent)]" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Go Premium</h3>
            <p className="text-[var(--text-secondary)] mb-6">
              Get premium features while supporting ongoing development.
              Includes advanced statistics, unlimited history, and exclusive programs.
            </p>
            <Button
              size="lg"
              className="w-full"
              onClick={() => window.location.href = '/premium'}
            >
              <Gift className="h-5 w-5 mr-2" />
              Upgrade to Premium
            </Button>
          </Card>
        </div>

        {/* How Your Support Helps */}
        <Card className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 text-center">
            How Your Support Helps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Development</h3>
              <ul className="text-[var(--text-secondary)] space-y-2">
                <li>• New features and improvements</li>
                <li>• Bug fixes and performance optimization</li>
                <li>• Mobile app development</li>
                <li>• API enhancements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Infrastructure</h3>
              <ul className="text-[var(--text-secondary)] space-y-2">
                <li>• Server hosting and maintenance</li>
                <li>• Database management</li>
                <li>• CDN and performance optimization</li>
                <li>• Security and monitoring</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Community</h3>
              <ul className="text-[var(--text-secondary)] space-y-2">
                <li>• Documentation and tutorials</li>
                <li>• Community support and moderation</li>
                <li>• Educational content creation</li>
                <li>• Event organization</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Alternative Ways to Support */}
        <Card className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 text-center">
            Other Ways to Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Contribute Code</h3>
              <p className="text-[var(--text-secondary)] mb-4">
                Help us build new features, fix bugs, and improve the platform.
              </p>
              <Button
                variant="outline"
                onClick={() => window.open('https://github.com/workout-cool', '_blank')}
              >
                View on GitHub
              </Button>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Spread the Word</h3>
              <p className="text-[var(--text-secondary)] mb-4">
                Share GymGuy with friends, family, and your fitness community.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'GymGuy',
                      text: 'Check out this amazing fitness platform!',
                      url: window.location.origin
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.origin)
                    alert('Link copied to clipboard!')
                  }
                }}
              >
                Share
              </Button>
            </div>
          </div>
        </Card>

        {/* Thank You */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            Thank You for Your Support!
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Every contribution, no matter how small, helps us continue building
            the best fitness platform for our community. Together, we&apos;re making
            fitness more accessible and enjoyable for everyone.
          </p>
        </div>
      </div>
    </div>
  )
}
