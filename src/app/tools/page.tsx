import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/ui/page-hero'
import { Card } from '@/components/ui/card'
import { SectionHeader } from '@/components/ui/section-header'
import { CTASection } from '@/components/ui/cta-section'
import {
  Calculator,
  Heart,
  Scale,
  Target,
  Zap,
  ArrowRight,
  CheckCircle,
  Shield,
  Users
} from 'lucide-react'

export default function ToolsPage() {
  const tools = [
    {
      id: 'calorie',
      title: 'Calorie Calculator',
      description: 'Calculate your BMR and TDEE to determine your daily calorie needs for weight management.',
      icon: Calculator,
      href: '/tools/calorie',
    },
    {
      id: 'bmi',
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index to assess your weight status and health risk.',
      icon: Scale,
      href: '/tools/bmi',
    },
    {
      id: 'macro',
      title: 'Macro Calculator',
      description: 'Calculate your daily macronutrient needs (protein, carbs, fats) based on your goals.',
      icon: Target,
      href: '/tools/macro',
    },
    {
      id: 'heart-rate',
      title: 'Heart Rate Zones',
      description: 'Calculate your maximum heart rate and training zones for optimal cardiovascular training.',
      icon: Heart,
      href: '/tools/heart-rate',
    },
    {
      id: '1rm',
      title: '1RM Calculator',
      description: 'Estimate your one-rep maximum strength for any exercise using multiple formulas.',
      icon: Zap,
      href: '/tools/1rm',
    }
  ]

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <PageHero
        badge="Professional Grade • Science Based"
        title="Fitness Calculators"
        subtitle="Calculate your fitness metrics, nutritional needs, and training parameters with our comprehensive set of scientifically validated tools."
      />

      {/* Tools Grid */}
      <section className="py-16 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Essential Tools"
            title="Everything You Need to Optimize Your Training"
            subtitle="Professional-grade calculators used by fitness experts worldwide, now available for free with instant results."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <Link key={tool.id} href={tool.href} className="group">
                <Card variant="interactive" className="p-8 h-full">
                  <div className="w-16 h-16 bg-[var(--accent-surface)] rounded-xl flex items-center justify-center mb-6">
                    <tool.icon className="h-8 w-8 text-[var(--accent)]" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">
                    {tool.title}
                  </h3>

                  <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="inline-flex items-center text-[var(--accent)] group-hover:translate-x-1 transition-transform">
                    <span>Try Calculator</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <SectionHeader
                badge="Why Choose Our Tools"
                title="Built for Precision & Accuracy"
                align="left"
                className="mb-0"
              />
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[var(--success)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-[var(--success)]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-[var(--accent)]">Scientific Accuracy</h4>
                    <p className="text-[var(--text-secondary)] leading-relaxed">All calculators use scientifically validated formulas including Mifflin-St Jeor, Katch-McArdle, and multiple 1RM estimation methods.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[var(--accent)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-[var(--accent)]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-[var(--accent)]">Instant Results</h4>
                    <p className="text-[var(--text-secondary)] leading-relaxed">Get immediate calculations with detailed explanations and recommendations for your specific goals.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[var(--accent)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-[var(--accent)]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-[var(--accent)]">Trusted by Thousands</h4>
                    <p className="text-[var(--text-secondary)] leading-relaxed">Used by fitness professionals, athletes, and enthusiasts worldwide for accurate fitness calculations.</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8 lg:p-12 space-y-8">
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--accent)]">
                Professional Formulas
              </h3>
              <div className="space-y-6">
                <div className="bg-[var(--accent)]/10 p-4 rounded-xl border border-[var(--accent)]/20">
                  <h4 className="font-bold text-[var(--accent)] mb-2">BMR & TDEE</h4>
                  <p className="text-sm text-[var(--text-secondary)]">Mifflin-St Jeor, Harris-Benedict, Katch-McArdle equations</p>
                </div>
                <div className="bg-[var(--success)]/10 p-4 rounded-xl border border-[var(--success)]/20">
                  <h4 className="font-bold text-[var(--success)] mb-2">1RM Calculations</h4>
                  <p className="text-sm text-[var(--text-secondary)]">Epley, Brzycki, Lombardi, Mayhew formulas</p>
                </div>
                <div className="bg-[var(--accent)]/10 p-4 rounded-xl border border-[var(--accent)]/20">
                  <h4 className="font-bold text-[var(--accent)] mb-2">Heart Rate Zones</h4>
                  <p className="text-sm text-[var(--text-secondary)]">Age-predicted maximum and Karvonen methods</p>
                </div>
                <div className="bg-[var(--warning)]/10 p-4 rounded-xl border border-[var(--warning)]/20">
                  <h4 className="font-bold text-[var(--warning)] mb-2">Macro Distribution</h4>
                  <p className="text-sm text-[var(--text-secondary)]">Goal-based ratios with customizable preferences</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-16 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 lg:p-12 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[var(--accent)] mb-4">Important Disclaimer</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                These tools provide scientifically-based estimates and should be used as a starting point
                for your fitness journey. Always consult with healthcare professionals for personalized advice.
              </p>
            </div>
            <div className="bg-[var(--warning)]/10 border border-[var(--warning)]/20 rounded-xl p-6">
              <p className="text-sm text-[var(--text-secondary)]">
                <strong className="text-[var(--warning)]">Note:</strong> Individual results may vary based on genetics, medical conditions,
                and other factors. These calculations are estimates and should not replace professional medical,
                nutritional, or fitness guidance.
              </p>
            </div>
          </Card>
        </div>
      </section>

      <CTASection
        title="Ready to Optimize Your Training?"
        subtitle="Use our comprehensive fitness tools to create data-driven workout plans and nutrition strategies tailored to your goals."
      >
        <Link href="/workouts">
          <Button size="lg" className="group">
            <span>Create Your Workout</span>
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
        <Link href="/programs">
          <Button size="lg" variant="outline">
            <span>Browse Programs</span>
          </Button>
        </Link>
      </CTASection>
    </div>
  )
}
