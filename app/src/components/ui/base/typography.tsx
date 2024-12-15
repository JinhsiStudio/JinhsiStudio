import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  level?: 1 | 2 | 3 | 4 | 5;
  children: React.ReactNode;
}

const Title = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ level = 1, className, children, ...props }, ref) => {
    const Component = `h${level}` as const;

    const styles = {
      1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      2: "scroll-m-20 text-3xl font-semibold tracking-tight",
      3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      4: "scroll-m-20 text-xl font-semibold tracking-tight",
      5: "scroll-m-20 text-lg font-medium tracking-tight",
    };

    return (
      <Component ref={ref} className={cn(styles[level], className)} {...props}>
        {children}
      </Component>
    );
  },
);
Title.displayName = "Typography.Title";

const Text = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <p ref={ref} className={cn("leading-7", className)} {...props}>
      {children}
    </p>
  );
});
Text.displayName = "Typography.Text";

export const Typography = {
  Title,
  Text,
};
