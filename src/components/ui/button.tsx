'use client'

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group min-h-[44px] min-w-[44px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80 shadow-soft hover:shadow-primary-glow font-teko-medium",
        destructive:
          "bg-strength text-white hover:bg-strength/80 shadow-soft hover:shadow-strength-glow font-teko-medium",
        outline:
          "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white shadow-soft hover:shadow-primary-glow font-teko-medium",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-soft hover:shadow-secondary-glow font-teko-medium",
        ghost: "hover:bg-primary/10 hover:text-primary hover:shadow-soft font-teko-medium",
        link: "text-primary underline-offset-4 hover:underline font-teko-medium",
        gradient: "bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/80 hover:to-secondary/80 shadow-soft hover:shadow-glow font-teko-bold",
        glass: "backdrop-blur-md bg-white/10 border border-white/20 text-foreground hover:bg-white/20 shadow-soft hover:shadow-medium font-teko-medium",
        energy: "bg-energy text-energy-900 hover:bg-energy-400 shadow-soft hover:shadow-energy-glow animate-energy-boost font-teko-bold",
        strength: "bg-strength text-white hover:bg-strength/80 shadow-soft hover:shadow-strength-glow font-teko-bold",
        cardio: "bg-cardio text-white hover:bg-cardio/80 shadow-soft hover:shadow-cardio-glow font-teko-bold",
        trunkforce: "bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 shadow-primary-glow hover:shadow-glow-lg font-teko-bold transform hover:scale-105 transition-all duration-300",
      },
      size: {
        default: "min-h-[44px] px-4 py-2",
        sm: "min-h-[36px] rounded-lg px-3 text-xs",
        lg: "min-h-[48px] rounded-lg px-8 text-base",
        xl: "min-h-[56px] rounded-xl px-10 text-lg font-semibold",
        touch: "min-h-[44px] px-6 py-3 rounded-lg text-sm", // WCAG minimum touch target
        "touch-lg": "min-h-[56px] px-8 py-4 rounded-xl text-base", // Large touch target
        icon: "h-[44px] w-[44px] rounded-lg p-0", // Square icon button with min touch target
        "icon-lg": "h-[56px] w-[56px] rounded-xl p-0", // Large square icon button
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
