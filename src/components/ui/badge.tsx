import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-[var(--accent-surface)] text-[var(--accent)]",
        success: "bg-[var(--success)]/10 text-[var(--success)]",
        warning: "bg-[var(--warning)]/10 text-[var(--warning)]",
        premium: "bg-gradient-to-r from-[var(--accent)]/20 to-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
