import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border border-white/10 bg-transparent hover:bg-white/[.07]",
        white: "border-0 bg-[#f4f4f2] text-black hover:bg-white hover:shadow-[0_0_50px_rgba(167,139,250,.5),0_0_90px_rgba(103,232,249,.25)]",
        glass: "glass hover:bg-white/10",
        metal:
          "border border-white/55 bg-gradient-to-b from-[#5a5a5c] via-[#2c2c2e] to-[#1d1d1f] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.45),inset_0_-1px_2px_rgba(0,0,0,.5),0_0_0_4px_rgba(255,255,255,.04),0_6px_20px_rgba(0,0,0,.5)] hover:border-white hover:from-[#6a6a6c] hover:via-[#353537] hover:to-[#222] hover:shadow-[inset_0_1px_0_rgba(255,255,255,.6),0_0_0_4px_rgba(255,255,255,.07),0_0_30px_rgba(255,255,255,.18)]",
        dark: "border border-white/15 bg-gradient-to-b from-[#262626] to-[#151515] text-white hover:border-white/35",
        chip: "border border-white/10 bg-transparent text-white/55 hover:bg-[#f4f4f2] hover:text-black data-[state=active]:bg-[#f4f4f2] data-[state=active]:text-black aria-pressed:bg-[#f4f4f2] aria-pressed:text-black",
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
