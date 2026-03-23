'use client'

import Image from 'next/image'
import { Instagram, Dumbbell, Users, Target, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/ui/page-hero'
import { Card } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <PageHero
        badge="Sobre nosotros"
        title="The Core by Alberto Mateo"
        subtitle="Un método de entrenamiento construido sobre resultados reales, no promesas vacías."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        {/* Alberto Section */}
        <Card className="mb-12 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Photo */}
            <div className="relative h-80 md:h-auto min-h-[320px]">
              <Image
                src="/images/alberto-mateo.jpeg"
                alt="Alberto Mateo — The Core Coach"
                fill
                className="object-cover"
              />
            </div>
            {/* Bio */}
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-widest mb-3">
                Fundador & Head Coach
              </span>
              <h2 className="text-3xl font-extrabold text-[var(--text-primary)] mb-2">
                Alberto Mateo
              </h2>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                Alberto es entrenador personal certificado con años de experiencia transformando
                cuerpos y mentalidades. Su filosofía combina periodización inteligente,
                nutrición práctica y una comunidad que te empuja a ser mejor cada día.
              </p>
              <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                Fundó The Core con una visión clara: hacer accesible el entrenamiento de
                élite para cualquier persona, sin importar su nivel o dónde entrene.
              </p>
              <a
                href="https://www.instagram.com/albertomateocoach/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="inline-flex items-center gap-2 w-fit">
                  <Instagram className="h-4 w-4" />
                  @albertomateocoach
                </Button>
              </a>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Users, label: 'Atletas entrenados', value: '1,000+' },
            { icon: Dumbbell, label: 'Programas diseñados', value: '20+' },
            { icon: Target, label: 'Años de experiencia', value: '10+' },
            { icon: Award, label: 'Transformaciones reales', value: '500+' },
          ].map(({ icon: Icon, label, value }) => (
            <Card key={label} className="p-6 text-center">
              <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <div className="text-2xl font-extrabold text-[var(--accent)] mb-1">{value}</div>
              <div className="text-sm text-[var(--text-secondary)]">{label}</div>
            </Card>
          ))}
        </div>

        {/* Mission */}
        <Card className="p-8 lg:p-12">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">La misión de The Core</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              The Core nació de la frustración con plataformas de fitness genéricas que ofrecen
              programas cookie-cutter sin atención personalizada ni progresión real.
            </p>
            <p>
              Nuestra misión es simple: democratizar el acceso al entrenamiento de calidad.
              Programas diseñados por Alberto Mateo, herramientas inteligentes de seguimiento
              y una comunidad activa que te acompaña en cada etapa de tu transformación.
            </p>
            <p>
              Ya sea que estés empezando desde cero o buscando romper tu plateau, aquí
              encontrarás el método, las herramientas y la comunidad para lograrlo.
            </p>
          </div>
          <div className="bg-[var(--accent)]/10 p-6 rounded-xl border border-[var(--border)] mt-8">
            <p className="text-[var(--accent)] font-bold text-lg">
              &ldquo;No se trata de entrenar más duro. Se trata de entrenar más inteligente.&rdquo;
            </p>
            <p className="text-[var(--text-secondary)] text-sm mt-2">— Alberto Mateo</p>
          </div>
        </Card>

      </div>
    </div>
  )
}
