import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "btn-glass relative inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium text-[#f4f4f2] transition duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        white: "btn-glass-hl",
        glass: "",
        metal: "",
        dark: "",
        chip: "btn-chip text-white/65 data-[state=active]:text-white aria-pressed:text-white",
      },
      size: {
        default: "px-6 py-3.5 text-base",
        sm: "px-5 py-2.5 text-sm",
        chip: "px-4 py-2 text-[13px] font-normal",
        full: "w-full px-4 py-3.5 text-base",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});
Button.displayName = "Button";
