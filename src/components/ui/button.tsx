'use client'

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group min-h-[44px] min-w-[44px]",
  {
    variants: {
      variant: {
        default: "bg-[var(--accent)] text-[var(--bg-primary)] hover:bg-[var(--accent)]/90 font-medium",
        destructive:
          "bg-[var(--danger)] text-white hover:bg-[var(--danger)]/90 font-medium",
        outline:
          "border border-[var(--border)] text-[var(--text-primary)] bg-transparent hover:bg-[var(--bg-tertiary)] font-medium",
        secondary:
          "bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] font-medium",
        ghost: "hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] font-medium",
        link: "text-[var(--accent)] underline-offset-4 hover:underline font-medium",
      },
      size: {
        default: "min-h-[44px] px-4 py-2",
        sm: "min-h-[36px] rounded-lg px-3 text-xs",
        lg: "min-h-[48px] rounded-lg px-8 text-base",
        xl: "min-h-[56px] rounded-xl px-10 text-lg font-semibold",
        icon: "h-[44px] w-[44px] rounded-lg p-0", // Square icon button with min touch target
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    // Ensure button has proper type attribute
    const buttonProps = asChild ? props : {
      type: 'button' as const,
      ...props
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...buttonProps}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
