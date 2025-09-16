'use client'

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80 shadow-soft hover:shadow-primary-glow",
        destructive:
          "bg-strength text-white hover:bg-strength/80 shadow-soft hover:shadow-strength-glow",
        outline:
          "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white shadow-soft hover:shadow-primary-glow",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-soft hover:shadow-secondary-glow",
        ghost: "hover:bg-primary/10 hover:text-primary hover:shadow-soft",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/80 hover:to-secondary/80 shadow-soft hover:shadow-glow",
        glass: "backdrop-blur-md bg-white/10 border border-white/20 text-foreground hover:bg-white/20 shadow-soft hover:shadow-medium",
        energy: "bg-energy text-energy-900 hover:bg-energy-400 shadow-soft hover:shadow-energy-glow animate-energy-boost",
        strength: "bg-strength text-white hover:bg-strength/80 shadow-soft hover:shadow-strength-glow",
        cardio: "bg-cardio text-white hover:bg-cardio/80 shadow-soft hover:shadow-cardio-glow",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg font-semibold",
        touch: "min-h-touch px-6 py-3 rounded-lg text-sm", // 44px minimum touch target
        "touch-lg": "min-h-touch-lg px-8 py-4 rounded-xl text-base", // 56px large touch target
        icon: "h-10 w-10 rounded-lg",
        "icon-lg": "h-12 w-12 rounded-xl",
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
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
