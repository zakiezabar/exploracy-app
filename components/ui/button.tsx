import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-background-100 border-mono-200 border-2 border-b-4 active:border-b-2 hover:bg-mono-100 text-secondary-900 gap-1",
        primary: "bg-primary-400 text-secondary-900 hover:bg-primary-500/80 border-primary-500 border-b-4 active:border-b-0",
        primaryOutline: "bg-background-100 border-primary-500 border-2 border-b-4 active:border-b-2 hover:bg-mono-100 text-secondary-900",
        secondary: "bg-secondary-900 text-mono-100 hover:bg-secondary-800 border-secondary-600 border-b-4 active:border-b-0",
        secondaryOutline: "bg-background-100 border-secondary-600 border-2 border-b-4 active:border-b-2 hover:bg-secondary-100 text-secondary-600",
        destructive:
          "bg-rose-500 text-mono-100 hover:bg-rose-400 border-rose-600 border-b-4 active:border-b-0",
        sidebar: "bg-transparent text-mono-800 font-bold text-base border-transparent border-0 hover:bg-background-200",
        sidebarActive: "bg-transparent text-secondary-400 font-normal text-base border-transparent border-0 hover:bg-background-100",
        ghost: "bg-transparent text-secondary-600 border-transparent border-0 hover:bg-background-200",
        link: "text-secondary-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 p-6 text-base capitalize",
        icon: "h-10 w-10",
        rounded: "rounded-full",
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
