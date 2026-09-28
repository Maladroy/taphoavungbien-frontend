import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--ginger-tint)] text-[var(--ginger-deep)] font-bold",
        secondary:
          "border-transparent bg-[var(--bg-alt)] text-[var(--ink)]",
        destructive:
          "border-transparent bg-[var(--seal-tint)] text-[var(--seal)] font-semibold",
        outline: "text-[var(--ink-soft)] border-[var(--line)]",
        tea: "border-transparent bg-[var(--tea-tint)] text-[var(--tea)] font-bold",
        indigo: "border-transparent bg-[var(--indigo-tint)] text-[var(--indigo)] font-bold",
        stamp: "border-dashed border-[var(--seal)] bg-[var(--seal-tint)] text-[var(--seal)] -rotate-3 font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
