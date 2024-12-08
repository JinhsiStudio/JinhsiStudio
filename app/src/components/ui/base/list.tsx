import * as React from "react";
import { cn } from "@/lib/utils";

interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

interface ListItemMetaProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  avatar?: React.ReactNode;
  className?: string;
}

interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  meta?: ListItemMetaProps;
}

const List = React.forwardRef<HTMLDivElement, ListProps>(
  ({ className, header, footer, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col space-y-1", className)}
        {...props}
      >
        {header && (
          <div className="px-4 py-2 text-sm font-semibold text-foreground">
            {header}
          </div>
        )}
        <div className="flex flex-col">{children}</div>
        {footer && (
          <div className="px-4 py-2 text-sm text-muted-foreground">
            {footer}
          </div>
        )}
      </div>
    );
  },
);
List.displayName = "List";

const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  ({ className, children, meta, ...props }, ref) => {
    const renderMeta = () => {
      if (!meta) return null;
      const { title, description, avatar, className: metaClassName } = meta;

      return (
        <div className={cn("flex flex-1 space-x-4", metaClassName)}>
          {avatar && <div className="flex-shrink-0">{avatar}</div>}
          <div className="flex-1 space-y-1">
            {title && (
              <div className="text-sm font-medium leading-none">{title}</div>
            )}
            {description && (
              <div className="text-sm text-muted-foreground">{description}</div>
            )}
          </div>
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center px-4 py-2 hover:bg-muted/50 transition-colors",
          className,
        )}
        {...props}
      >
        {meta ? renderMeta() : children}
      </div>
    );
  },
);
ListItem.displayName = "ListItem";

const ListNamespace = Object.assign(List, {
  Item: ListItem,
});

export { ListNamespace as List };
