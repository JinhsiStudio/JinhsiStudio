import React from "react";
import { List } from "@/components/ui/base/list";

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

  const primary = (
    <div className="flex items-center text-base">
      <span>{label}</span>
      {extra && <div className="ml-auto">{extra}</div>}
    </div>
  );

  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = () => {
    if (onClick) {
      if (isAsyncFunction(onClick)) {
        setIsLoading(true);
        onClick()?.finally(() => setIsLoading(false));
      } else {
        onClick();
      }
    }
  };

  return (
    <List.Item
      onClick={isLoading ? undefined : handleClick}
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
