interface CTASectionProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export function CTASection({ title, subtitle, children }: CTASectionProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden p-12 lg:p-16 text-center bg-gradient-to-br from-[var(--accent)]/10 via-[var(--accent)]/5 to-transparent border border-[var(--border)]">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed mb-10">
              {subtitle}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
