import { Badge } from "./badge"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  badge?: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
  className?: string
}

export function SectionHeader({ badge, title, subtitle, align = 'center', className }: SectionHeaderProps) {
  return (
    <div className={cn(align === 'center' ? 'text-center' : 'text-left', 'mb-12', className)}>
      {badge && (
        <div className={cn("mb-4", align === 'center' && "flex justify-center")}>
          <Badge>{badge}</Badge>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-[var(--text-secondary)] max-w-3xl leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
