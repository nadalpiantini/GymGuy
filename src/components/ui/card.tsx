import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-6 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "",
        interactive: "cursor-pointer hover:border-[var(--accent)]/30 hover:shadow-[0_0_20px_var(--accent-glow)]",
        stat: "text-center",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export function Card({ className, variant, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant }), className)} {...props} />
}
