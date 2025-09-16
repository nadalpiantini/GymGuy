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
      <section className="relative overflow-hidden bg-gradient-mesh section-padding">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="container-modern relative">
          <div className="text-center animate-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent-foreground border border-accent/20 mb-8 animate-in-delay-1">
              <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse"></span>
              Professional Grade • Science Based • Free to Use
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 animate-in-delay-2">
              Fitness{' '}
              <span className="text-gradient bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Calculators
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed animate-in-delay-3">
              Calculate your fitness metrics, nutritional needs, and training parameters 
              with our comprehensive set of scientifically validated tools.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="section-padding bg-background">
        <div className="container-modern">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary-foreground border border-primary/20 mb-6">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              Essential Tools
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Everything You Need to{' '}
              <span className="text-gradient">Optimize</span> Your Training
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Professional-grade calculators used by fitness experts worldwide, 
              now available for free with instant results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-animation">
            {tools.map((tool) => (
              <Link key={tool.id} href={tool.href} className="group">
                <div className="card-modern p-8 interactive-card">
                  <div className={`w-16 h-16 bg-gradient-to-br ${tool.gradient} rounded-2xl flex items-center justify-center mb-6 icon-container`}>
                    <tool.icon className="h-8 w-8 text-current" style={{ color: tool.textColor.replace('text-', '') }} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {tool.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {tool.description}
                  </p>
                  
                  <div className={`inline-flex items-center ${tool.textColor} ${tool.hoverColor} font-semibold group-hover:translate-x-1 transition-transform`}>
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
      <section className="section-padding bg-muted/30">
        <div className="container-modern">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/10 text-secondary-foreground border border-secondary/20 mb-6">
                <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                Why Choose Our Tools
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Built for{' '}
                <span className="text-gradient">Precision</span> & Accuracy
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Scientific Accuracy</h4>
                    <p className="text-muted-foreground leading-relaxed">All calculators use scientifically validated formulas including Mifflin-St Jeor, Katch-McArdle, and multiple 1RM estimation methods.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Instant Results</h4>
                    <p className="text-muted-foreground leading-relaxed">Get immediate calculations with detailed explanations and recommendations for your specific goals.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Trusted by Thousands</h4>
                    <p className="text-muted-foreground leading-relaxed">Used by fitness professionals, athletes, and enthusiasts worldwide for accurate fitness calculations.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card-glass p-8 lg:p-12 space-y-8">
              <h3 className="text-2xl md:text-3xl font-bold">
                Professional Formulas
              </h3>
              <div className="space-y-6">
                <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                  <h4 className="font-semibold text-primary mb-2">BMR & TDEE</h4>
                  <p className="text-sm text-muted-foreground">Mifflin-St Jeor, Harris-Benedict, Katch-McArdle equations</p>
                </div>
                <div className="bg-green-500/5 p-4 rounded-xl border border-green-500/10">
                  <h4 className="font-semibold text-green-600 mb-2">1RM Calculations</h4>
                  <p className="text-sm text-muted-foreground">Epley, Brzycki, Lombardi, Mayhew formulas</p>
                </div>
                <div className="bg-purple-500/5 p-4 rounded-xl border border-purple-500/10">
                  <h4 className="font-semibold text-purple-600 mb-2">Heart Rate Zones</h4>
                  <p className="text-sm text-muted-foreground">Age-predicted maximum and Karvonen methods</p>
                </div>
                <div className="bg-orange-500/5 p-4 rounded-xl border border-orange-500/10">
                  <h4 className="font-semibold text-orange-600 mb-2">Macro Distribution</h4>
                  <p className="text-sm text-muted-foreground">Goal-based ratios with customizable preferences</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-16 bg-background">
        <div className="container-modern">
          <div className="card-modern p-8 lg:p-12 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Important Disclaimer</h3>
              <p className="text-muted-foreground leading-relaxed">
                These tools provide scientifically-based estimates and should be used as a starting point 
                for your fitness journey. Always consult with healthcare professionals for personalized advice.
              </p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
              <p className="text-sm text-foreground">
                <strong className="text-yellow-600">Note:</strong> Individual results may vary based on genetics, medical conditions, 
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
        <div className="container-modern relative text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
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
              <Button size="xl" variant="secondary" className="group bg-white text-primary hover:bg-white/90 shadow-large">
                <span>Create Your Workout</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/programs">
              <Button size="xl" variant="glass" className="group border-white/20 text-white hover:bg-white/10">
                <span>Browse Programs</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
