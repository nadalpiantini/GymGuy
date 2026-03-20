import { Badge } from "./badge"

interface PageHeroProps {
  badge?: string
  title: string
  subtitle?: string
  children?: React.ReactNode
}

export function PageHero({ badge, title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          {badge && (
            <div className="flex justify-center mb-6">
              <Badge>
                <span className="w-2 h-2 bg-[var(--accent)] rounded-full mr-2 inline-block" />
                {badge}
              </Badge>
            </div>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed mb-8">
              {subtitle}
            </p>
          )}
          {children && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
