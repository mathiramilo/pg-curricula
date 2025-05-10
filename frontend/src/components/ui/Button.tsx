import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { cn } from "@/utils";

export const buttonVariants = tv({
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-principal-100 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  variants: {
    variant: {
      default:
        "bg-principal text-slate-100 enabled:hover:bg-principal/90 enabled:active:bg-principal/80",
      outline:
        "border border-bordes text-fuente-principal bg-slate-50 enabled:hover:bg-slate-100 enabled:active:bg-slate-300 enabled:focus-visible:ring-slate-100",
      ghost:
        "enabled:hover:bg-black/5 enabled:hover:text-fuente-principal enabled:active:bg-black/10 enabled:focus-visible:ring-black/30",
      destructive:
        "bg-red-500 text-slate-100 enabled:hover:bg-red-600 enabled:active:bg-red-700 enabled:focus-visible:ring-red-200",
      link: "text-principal underline-offset-4 enabled:hover:underline enabled:focus-visible:ring-principal-50",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "size-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
