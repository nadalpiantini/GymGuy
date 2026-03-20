import Link from 'next/link'
import { Button } from '@/components/ui/button'
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
      gradient: 'from-blue-500/20 to-blue-500/10',
      textColor: 'text-blue-600',
      hoverColor: 'hover:text-blue-500'
    },
    {
      id: 'bmi',
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index to assess your weight status and health risk.',
      icon: Scale,
      href: '/tools/bmi',
      gradient: 'from-green-500/20 to-green-500/10',
      textColor: 'text-green-600',
      hoverColor: 'hover:text-green-500'
    },
    {
      id: 'macro',
      title: 'Macro Calculator',
      description: 'Calculate your daily macronutrient needs (protein, carbs, fats) based on your goals.',
      icon: Target,
      href: '/tools/macro',
      gradient: 'from-purple-500/20 to-purple-500/10',
      textColor: 'text-purple-600',
      hoverColor: 'hover:text-purple-500'
    },
    {
      id: 'heart-rate',
      title: 'Heart Rate Zones',
      description: 'Calculate your maximum heart rate and training zones for optimal cardiovascular training.',
      icon: Heart,
      href: '/tools/heart-rate',
      gradient: 'from-red-500/20 to-red-500/10',
      textColor: 'text-red-600',
      hoverColor: 'hover:text-red-500'
    },
    {
      id: '1rm',
      title: '1RM Calculator',
      description: 'Estimate your one-rep maximum strength for any exercise using multiple formulas.',
      icon: Zap,
      href: '/tools/1rm',
      gradient: 'from-orange-500/20 to-orange-500/10',
      textColor: 'text-orange-600',
      hoverColor: 'hover:text-orange-500'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6 shadow-primary-glow/20">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
              Professional Grade • Science Based • Free to Use
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-teko-bold mb-6">
              <span className="brand-text">Fitness Calculators</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Calculate your fitness metrics, nutritional needs, and training parameters 
              with our comprehensive set of scientifically validated tools.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6 shadow-primary-glow/20">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              Essential Tools
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-teko-bold mb-6">
              Everything You Need to{' '}
              <span className="brand-text">Optimize</span> Your Training
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Professional-grade calculators used by fitness experts worldwide, 
              now available for free with instant results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <Link key={tool.id} href={tool.href} className="group">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-soft hover:shadow-primary-glow transition-all duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <tool.icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  <h3 className="text-2xl font-teko-bold mb-4 text-primary group-hover:text-primary/80 transition-colors">
                    {tool.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {tool.description}
                  </p>
                  
                  <div className="inline-flex items-center text-primary font-teko-medium group-hover:translate-x-1 transition-transform">
                    <span>Try Calculator</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/10 text-secondary border border-secondary/20 mb-6">
                <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                Why Choose Our Tools
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-teko-bold">
                Built for{' '}
                <span className="brand-text">Precision</span> & Accuracy
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Shield className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h4 className="text-xl font-teko-bold mb-2 text-primary">Scientific Accuracy</h4>
                    <p className="text-gray-400 leading-relaxed">All calculators use scientifically validated formulas including Mifflin-St Jeor, Katch-McArdle, and multiple 1RM estimation methods.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-teko-bold mb-2 text-primary">Instant Results</h4>
                    <p className="text-gray-400 leading-relaxed">Get immediate calculations with detailed explanations and recommendations for your specific goals.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-teko-bold mb-2 text-primary">Trusted by Thousands</h4>
                    <p className="text-gray-400 leading-relaxed">Used by fitness professionals, athletes, and enthusiasts worldwide for accurate fitness calculations.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 lg:p-12 space-y-8 shadow-soft">
              <h3 className="text-2xl md:text-3xl font-teko-bold text-primary">
                Professional Formulas
              </h3>
              <div className="space-y-6">
                <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                  <h4 className="font-teko-bold text-primary mb-2">BMR & TDEE</h4>
                  <p className="text-sm text-gray-400">Mifflin-St Jeor, Harris-Benedict, Katch-McArdle equations</p>
                </div>
                <div className="bg-success/10 p-4 rounded-xl border border-success/20">
                  <h4 className="font-teko-bold text-success mb-2">1RM Calculations</h4>
                  <p className="text-sm text-gray-400">Epley, Brzycki, Lombardi, Mayhew formulas</p>
                </div>
                <div className="bg-accent/10 p-4 rounded-xl border border-accent/20">
                  <h4 className="font-teko-bold text-accent mb-2">Heart Rate Zones</h4>
                  <p className="text-sm text-gray-400">Age-predicted maximum and Karvonen methods</p>
                </div>
                <div className="bg-energy/10 p-4 rounded-xl border border-energy/20">
                  <h4 className="font-teko-bold text-energy mb-2">Macro Distribution</h4>
                  <p className="text-sm text-gray-400">Goal-based ratios with customizable preferences</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 lg:p-12 max-w-4xl mx-auto shadow-soft">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-teko-bold text-primary mb-4">Important Disclaimer</h3>
              <p className="text-gray-400 leading-relaxed">
                These tools provide scientifically-based estimates and should be used as a starting point 
                for your fitness journey. Always consult with healthcare professionals for personalized advice.
              </p>
            </div>
            <div className="bg-energy/10 border border-energy/20 rounded-xl p-6">
              <p className="text-sm text-gray-300">
                <strong className="text-energy">Note:</strong> Individual results may vary based on genetics, medical conditions, 
                and other factors. These calculations are estimates and should not replace professional medical, 
                nutritional, or fitness guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-teko-bold text-white mb-8">
            Ready to Optimize Your{' '}
            <span className="text-gradient bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Training
            </span>?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Use our comprehensive fitness tools to create data-driven workout plans 
            and nutrition strategies tailored to your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/workouts">
              <Button size="xl" className="group bg-white text-primary hover:bg-white/90 shadow-large font-teko-medium">
                <span>Create Your Workout</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/programs">
              <Button size="xl" variant="outline" className="group border-white/20 text-white hover:bg-white/10 font-teko-medium">
                <span>Browse Programs</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
