import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

const spinnerVariants = cva("animate-spin text-muted-foreground", {
  variants: {
    size: {
      small: "h-4 w-4",
      medium: "h-8 w-8",
      large: "h-16 w-16",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
  fullscreen?: boolean;
  spinning?: boolean;
  children?: React.ReactNode;
}

export function Spinner({
  className,
  fullscreen,
  size,
  spinning = true,
  children,
}: SpinnerProps) {
  const spinnerElement = (
    <Loader2 className={cn(spinnerVariants({ size }), className)} />
  );

  if (fullscreen && spinning) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80">
        {spinnerElement}
      </div>
    );
  }

  if (children) {
    return (
      <div className="relative">
        {spinning && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/50">
            {spinnerElement}
          </div>
        )}
        <div className={cn(spinning && "opacity-50 blur-[0.5px]")}>
          {children}
        </div>
      </div>
    );
  }

  return spinning ? spinnerElement : null;
}
