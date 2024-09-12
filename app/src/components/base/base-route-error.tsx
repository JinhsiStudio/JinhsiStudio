import { Result } from "antd";
import { useRouteError } from "react-router-dom";

export default function RouteErrorPage() {
  const error: unknown = useRouteError();
  console.error(error);
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
    />
  );
}
