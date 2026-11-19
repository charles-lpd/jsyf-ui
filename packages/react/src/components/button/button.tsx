import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { Slot as SlotPrimitive } from "radix-ui";

import { cn } from "../../lib/cn.js";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary/40 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-90",
        secondary: "bg-secondary text-secondary-foreground hover:opacity-80",
        outline: "border border-border bg-background text-foreground hover:bg-muted",
        ghost: "text-foreground hover:bg-muted",
        destructive: "bg-destructive text-white hover:opacity-90",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-12 px-6",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
  loading?: boolean;
  size?: VariantProps<typeof buttonVariants>["size"];
  variant?: VariantProps<typeof buttonVariants>["variant"];
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, children, className, disabled, loading = false, size, type, variant, ...props }, ref) => {
    const Component = asChild ? SlotPrimitive.Slot : "button";

    return (
      <Component
        ref={ref}
        aria-busy={loading || undefined}
        className={cn(buttonVariants({ className, size, variant }))}
        disabled={disabled || loading}
        type={asChild ? undefined : (type ?? "button")}
        {...props}
      >
        {loading ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : null}
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";
