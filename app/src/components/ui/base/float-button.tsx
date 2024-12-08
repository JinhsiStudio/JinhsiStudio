import * as React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

interface FloatButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  tooltip?: string;
  isGroupItem?: boolean;
}

interface FloatButtonGroupProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const FloatButton = React.forwardRef<HTMLButtonElement, FloatButtonProps>(
  ({ className, icon, tooltip, isGroupItem, ...props }, ref) => {
    const button = (
      <Button
        ref={ref}
        variant="secondary"
        size="icon"
        className={cn(
          "h-12 w-12 rounded-full shadow-lg",
          !isGroupItem && "fixed bottom-6 right-6 z-50",
          className,
        )}
        {...props}
      >
        {icon}
      </Button>
    );

    if (tooltip) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return button;
  },
);
FloatButton.displayName = "FloatButton";

const FloatButtonGroup = ({
  children,
  icon = <MoreHorizontal />,
}: FloatButtonGroupProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <FloatButton
          icon={icon}
          onClick={() => setOpen(!open)}
          className={cn(
            "relative",
            open && "rotate-90 transition-transform duration-200",
          )}
          isGroupItem
        />
        <div
          className={cn(
            "absolute bottom-full right-0 mb-2 flex flex-col-reverse items-end gap-2 transition-all duration-200",
            open
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0",
          )}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                isGroupItem: true,
                className: "relative",
              } as Partial<FloatButtonProps>);
            }
            return child;
          })}
        </div>
      </div>
    </div>
  );
};

FloatButtonGroup.displayName = "FloatButtonGroup";

export { FloatButton, FloatButtonGroup };
