import React from "react";
import { List } from "@/components/ui/base/list";
import { Spinner } from "@/components/ui/base/spinner";
import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const isAsyncFunction = (func: Function) => {
  return func.constructor.name === "AsyncFunction";
};

interface ItemProps {
  label: React.ReactNode;
  extra?: React.ReactNode;
  children?: React.ReactNode;
  secondary?: React.ReactNode;
  onClick?: () => void | Promise<void>;
}

const SettingItem: React.FC<ItemProps> = (props) => {
  const { label, extra, children, secondary, onClick } = props;
  const [loading, setLoading] = React.useState(false);

  const primary = (
    <div className="flex items-center text-base">
      <span>{label}</span>
      {(extra || loading) && (
        <div className="ml-auto">
          {loading ? <Spinner size="medium" /> : extra}
        </div>
      )}
    </div>
  );

  const handleClick = () => {
    if (onClick) {
      if (isAsyncFunction(onClick)) {
        setLoading(true);
        onClick()?.finally(() => setLoading(false));
      } else {
        onClick();
      }
    }
  };

  return (
    <List.Item
      onClick={loading ? undefined : handleClick}
      className={cn(
        loading && "opacity-50",
        onClick && !loading && "cursor-pointer",
      )}
      meta={{
        title: primary,
        description: secondary,
      }}
    >
      {children}
    </List.Item>
  );
};

interface SettingListProps {
  title: string;
  children: React.ReactNode;
}

const SettingList: React.FC<SettingListProps> = (props) => (
  <List header={<div className="text-base font-bold">{props.title}</div>}>
    {props.children}
  </List>
);

export { SettingItem, SettingList };
