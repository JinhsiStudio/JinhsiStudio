import React from "react";
import { List, Spin } from "antd";
import { Button } from "@/components/ui/button";
import { LoadingOutlined } from "@ant-design/icons";

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
  const clickable = !!onClick;

  const primary = (
    <div style={{ display: "flex", alignItems: "center", fontSize: "1rem" }}>
      <span>{label}</span>
      {extra && <div style={{ marginLeft: "auto" }}>{extra}</div>}
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

  return clickable ? (
    <List.Item>
      <Button
        onClick={handleClick}
        disabled={isLoading}
        style={{ width: "100%" }}
      >
        <List.Item.Meta title={primary} description={secondary} />
        {isLoading ? (
          <Spin
            indicator={<LoadingOutlined style={{ color: "blue" }} spin />}
          />
        ) : (
          <LoadingOutlined />
        )}
      </Button>
    </List.Item>
  ) : (
    <List.Item>
      <List.Item.Meta title={primary} description={secondary} />
      {children}
    </List.Item>
  );
};

interface SettingListProps {
  title: string;
  children: React.ReactNode;
}

const SettingList: React.FC<SettingListProps> = (props) => (
  <List
    header={
      <div style={{ fontSize: "1rem", fontWeight: "700" }}>{props.title}</div>
    }
  >
    {props.children}
  </List>
);

export { SettingItem, SettingList };
