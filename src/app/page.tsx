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
        badge="The Core • by Alberto Mateo"
        title="Entrena Con Propósito"
        subtitle="Programas diseñados por Alberto Mateo para llevarte al siguiente nivel. Desde principiantes hasta atletas — aquí se trabaja en serio."
      >
        <Link href="/workouts">
          <Button size="lg">Empezar Entrenamiento <ArrowRight className="ml-2 h-5 w-5" /></Button>
        </Link>
        <Link href="/programs">
          <Button size="lg" variant="outline">Ver Programas</Button>
        </Link>
      </PageHero>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Lo que incluye The Core"
            title="Todo lo que necesitas para transformarte"
            subtitle="Alberto Mateo diseñó cada herramienta pensando en resultados reales. Sin relleno, sin excusas — solo trabajo inteligente."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card variant="interactive" className="p-8">
              <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center mb-6">
                <Dumbbell className="h-8 w-8 text-[var(--accent)]" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--accent)] mb-4">Generador de Rutinas</h3>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                Crea tu entrenamiento del día seleccionando equipamiento disponible y grupos musculares.
                Ejercicios con videos e instrucciones paso a paso.
              </p>
              <Link href="/workouts" className="inline-flex items-center text-[var(--accent)] hover:text-[var(--accent)]/80 font-semibold transition-transform hover:translate-x-1">
                Crear Rutina
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            <Card variant="interactive" className="p-8">
              <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center mb-6">
                <Calendar className="h-8 w-8 text-[var(--accent)]" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Programas Estructurados</h3>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                Sigue los programas diseñados por Alberto para distintos niveles y objetivos.
                Progresión real, semana a semana.
              </p>
              <Link href="/programs" className="inline-flex items-center text-[var(--accent)] hover:text-[var(--accent)]/80 font-semibold transition-transform hover:translate-x-1">
                Ver Programas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            <Card variant="interactive" className="p-8">
              <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="h-8 w-8 text-[var(--accent)]" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Seguimiento de Progreso</h3>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                Estadísticas detalladas, control de peso y análisis de rendimiento.
                Ver los números crecer es la mejor motivación.
              </p>
              <Link href="/statistics" className="inline-flex items-center text-[var(--accent)] hover:text-[var(--accent)]/80 font-semibold transition-transform hover:translate-x-1">
                Ver Estadísticas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            <Card variant="interactive" className="p-8">
              <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center mb-6">
                <Calculator className="h-8 w-8 text-[var(--accent)]" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Herramientas de Entrenamiento</h3>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                Calcula tu TDEE, IMC, macros, zonas de frecuencia cardíaca y 1RM.
                Todo lo que necesitas para entrenar con precisión.
              </p>
              <Link href="/tools" className="inline-flex items-center text-[var(--accent)] hover:text-[var(--accent)]/80 font-semibold transition-transform hover:translate-x-1">
                Usar Herramientas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            <Card variant="interactive" className="p-8">
              <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center mb-6">
                <Trophy className="h-8 w-8 text-[var(--accent)]" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Comunidad The Core</h3>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                Compite en el leaderboard, comparte tus logros y mantente motivado
                con una comunidad que entiende lo que es el trabajo de verdad.
              </p>
              <Link href="/leaderboard" className="inline-flex items-center text-[var(--accent)] hover:text-[var(--accent)]/80 font-semibold transition-transform hover:translate-x-1">
                Unirse a la Comunidad
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>

            <Card variant="interactive" className="p-8">
              <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center mb-6">
                <Crown className="h-8 w-8 text-[var(--accent)]" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Coaching Premium</h3>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                Estadísticas avanzadas, historial ilimitado, programas exclusivos
                y sesiones 1-a-1 con Alberto Mateo.
              </p>
              <Link href="/premium" className="inline-flex items-center text-[var(--accent)] hover:text-[var(--accent)]/80 font-semibold transition-transform hover:translate-x-1">
                Ver Premium
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
            badge="Por qué The Core"
            title="¿Por qué entrenar con Alberto Mateo?"
            subtitle="No es un gym más. Es un método. Aquí hay resultados reales de personas reales."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h3 className="text-3xl md:text-4xl font-bold text-[var(--accent)]">Metodología que funciona</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[var(--success)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-[var(--success)]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[var(--text-primary)] mb-2">Programas basados en ciencia</h4>
                    <p className="text-[var(--text-secondary)]">Cada programa está diseñado con principios de periodización probados para maximizar tu progreso.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[var(--success)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-[var(--success)]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[var(--text-primary)] mb-2">Para todos los niveles</h4>
                    <p className="text-[var(--text-secondary)]">Desde tu primer día en el gym hasta preparación de competencia — el método escala contigo.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[var(--success)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-[var(--success)]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[var(--text-primary)] mb-2">Comunidad activa</h4>
                    <p className="text-[var(--text-secondary)]">Miles de personas siguiendo los mismos programas, compartiendo resultados y apoyándose mutuamente.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[var(--success)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-[var(--success)]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[var(--text-primary)] mb-2">Flexibilidad total</h4>
                    <p className="text-[var(--text-secondary)]">Entrena en el gym, en casa o donde sea. Los programas se adaptan a tu equipamiento disponible.</p>
                  </div>
                </div>
              </div>
            </div>
            <Card className="p-8 lg:p-12">
              <h4 className="text-2xl font-bold mb-6 text-[var(--text-primary)]">El entrenador detrás del método</h4>
              <p className="text-[var(--text-secondary)] mb-8 leading-relaxed text-lg">
                Alberto Mateo lleva años transformando cuerpos y mentalidades. Su filosofía es simple:
                consistencia + progresión inteligente + comunidad = resultados garantizados.
              </p>
              <div className="bg-[var(--accent)]/10 p-6 rounded-xl border border-[var(--border)]">
                <p className="text-[var(--accent)] font-bold">
                  &ldquo;No se trata de entrenar más duro. Se trata de entrenar más inteligente.&rdquo;
                  <span className="block text-sm font-normal text-[var(--text-secondary)] mt-2">— Alberto Mateo</span>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="¿Listo para transformar tu entrenamiento?"
        subtitle="Únete a The Core y empieza a progresar con un método que realmente funciona."
      >
        <Link href="/workouts">
          <Button size="lg">Empezar Ahora <ArrowRight className="ml-2 h-5 w-5" /></Button>
        </Link>
        <Link href="/programs">
          <Button size="lg" variant="outline">Ver Programas</Button>
        </Link>
      </CTASection>
    </div>
  )
}
