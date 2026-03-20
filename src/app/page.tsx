'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
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
      <section className="relative overflow-hidden bg-black pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center animate-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-8 animate-in-delay-1 shadow-primary-glow/20">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
              Open Source • Self-Hostable • Community Driven
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-teko-bold mb-8 animate-in-delay-2 relative">
              <span className="brand-text bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent animate-pulse">
                Build Your Perfect Workout
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed animate-in-delay-3">
              Create personalized workouts, follow structured programs, and track your fitness journey 
              with our comprehensive platform. Modern, intuitive, and built for the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in-delay-3">
              <Link href="/workouts">
                <Button size="lg" variant="default" className="group">
                  <span>Create Workout</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/programs">
                <Button size="lg" variant="secondary" className="group">
                  <span>Explore Programs</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/10 text-secondary border border-secondary/20 mb-6 shadow-secondary-glow/20">
              <span className="w-2 h-2 bg-secondary rounded-full mr-2 animate-pulse"></span>
              Powerful Features
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-teko-bold mb-6">
              Everything You Need for{' '}
              <span className="brand-text">Fitness Success</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              From workout generation to progress tracking, we provide all the tools 
              you need to achieve your fitness goals with style and efficiency.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-animation">
            <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-soft p-8 group transition-all duration-300 hover:shadow-primary-glow hover:animate-card-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:animate-muscle-highlight transition-all duration-300">
                <Dumbbell className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-teko-bold text-primary mb-4">Workout Generator</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Create personalized workouts by selecting your available equipment and target muscle groups. 
                Get exercise recommendations with videos and instructions.
              </p>
              <Link href="/workouts" className="inline-flex items-center text-primary hover:text-primary/80 font-semibold group-hover:translate-x-1 transition-transform">
                Start Building
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-soft p-8 group transition-all duration-300 hover:shadow-secondary-glow hover:animate-card-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                <Calendar className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-teko-bold text-primary mb-4">Structured Programs</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Follow professionally designed programs for different fitness levels and goals. 
                Track your progress and stay consistent with your training.
              </p>
              <Link href="/programs" className="inline-flex items-center text-secondary hover:text-secondary/80 font-semibold group-hover:translate-x-1 transition-transform">
                Browse Programs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-soft p-8 group transition-all duration-300 hover:shadow-accent-glow hover:animate-card-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                <BarChart3 className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-teko-bold text-primary mb-4">Progress Tracking</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Monitor your fitness journey with detailed statistics, weight tracking, 
                and performance analytics to stay motivated and on track.
              </p>
              <Link href="/statistics" className="inline-flex items-center text-accent hover:text-accent/80 font-semibold group-hover:translate-x-1 transition-transform">
                View Statistics
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-soft p-8 group transition-all duration-300 hover:shadow-energy-glow hover:animate-card-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-energy/20 to-energy/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                <Calculator className="h-8 w-8 text-energy/80" />
              </div>
              <h3 className="text-2xl font-teko-bold text-primary mb-4">Fitness Tools</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Calculate your TDEE, BMI, macronutrients, heart rate zones, and 1RM. 
                All the tools you need for optimal training and nutrition.
              </p>
              <Link href="/tools" className="inline-flex items-center text-energy/80 hover:text-energy/90 font-semibold group-hover:translate-x-1 transition-transform">
                Use Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-soft p-8 group transition-all duration-300 hover:shadow-cardio-glow hover:animate-card-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-cardio/20 to-cardio/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                <Trophy className="h-8 w-8 text-cardio" />
              </div>
              <h3 className="text-2xl font-teko-bold text-primary mb-4">Community</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Compete with other users on the leaderboard, share your achievements, 
                and stay motivated with our supportive fitness community.
              </p>
              <Link href="/leaderboard" className="inline-flex items-center text-cardio hover:text-cardio/80 font-semibold group-hover:translate-x-1 transition-transform">
                Join Community
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-soft p-8 group transition-all duration-300 hover:shadow-accent-glow hover:animate-card-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-accent/30 to-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                <Crown className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-teko-bold text-primary mb-4">Premium Features</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Unlock advanced statistics, unlimited history, premium programs, 
                and 1-on-1 coaching sessions with our premium membership.
              </p>
              <Link href="/premium" className="inline-flex items-center text-accent hover:text-accent/80 font-semibold group-hover:translate-x-1 transition-transform">
                Go Premium
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 mb-6 shadow-accent-glow/20">
              <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse"></span>
              Why Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-teko-bold mb-6">
              Why Choose{' '}
              <span className="brand-text animate-glow">GymGuy</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We&apos;re different from other fitness platforms. Here&apos;s what makes us special and unique.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h3 className="text-3xl md:text-4xl font-teko-bold text-primary">Open Source & Self-Hostable</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:animate-set-complete transition-transform">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h4 className="text-xl font-teko-bold text-primary mb-2">Always Free</h4>
                    <p className="text-gray-400">The core platform will always remain free and open source.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:animate-set-complete transition-transform">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h4 className="text-xl font-teko-bold text-primary mb-2">Self-Hostable</h4>
                    <p className="text-gray-400">Run your own instance with full control over your data.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:animate-set-complete transition-transform">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h4 className="text-xl font-teko-bold text-primary mb-2">Community Driven</h4>
                    <p className="text-gray-400">Built by the community, for the community. Contribute and shape the future.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:animate-set-complete transition-transform">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h4 className="text-xl font-teko-bold text-primary mb-2">No Vendor Lock-in</h4>
                    <p className="text-gray-400">Your data, your rules. Export everything and move to your own server anytime.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-soft p-8 lg:p-12 hover:shadow-glow transition-all duration-300">
              <h4 className="text-2xl font-teko-bold mb-6 text-primary">Modern Alternative</h4>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                GymGuy was created to provide a modern, actively maintained alternative 
                to outdated fitness platforms. We&apos;re committed to continuous improvement 
                and community support.
              </p>
              <div className="bg-primary/10 p-6 rounded-xl border border-primary/20 shadow-primary-glow/30">
                <p className="text-primary font-teko-bold">
                  <strong>Our Mission:</strong> To provide the best free fitness platform 
                  that puts users in control of their data and experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="relative overflow-hidden bg-black py-24 lg:py-32 animate-glow">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/10 animate-float"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-teko-bold text-primary mb-8">
            Ready to Transform Your{' '}
            <span className="text-white animate-glow">
              Fitness Journey
            </span>?
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of users who are already building better workouts and achieving their goals with our modern platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/workouts">
              <Button size="lg" variant="default" className="group">
                <span>Create Your First Workout</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="group">
                <span>Learn More About Us</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
