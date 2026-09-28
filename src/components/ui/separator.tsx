import * as React from "react";
import { cn } from "@/src/lib/utils";

const Separator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    orientation?: "horizontal" | "vertical";
    decorative?: boolean;
    dashed?: boolean;
  }
>(
  (
    { className, orientation = "horizontal", dashed = false, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "shrink-0",
        dashed
          ? orientation === "horizontal"
            ? "border-t border-dashed border-[var(--line)] w-full"
            : "border-l border-dashed border-[var(--line)] h-full"
          : orientation === "horizontal"
          ? "h-[1px] w-full bg-[var(--line)]"
          : "h-full w-[1px] bg-[var(--line)]",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = "Separator";

export { Separator };
