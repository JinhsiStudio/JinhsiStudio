import { useRouteError } from "react-router-dom";

export default function RouteErrorPage() {
  const error: unknown = useRouteError();
  console.error(error);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "48px", color: "#ff4d4f" }}>404</h1>
      <p style={{ fontSize: "24px", color: "#8c8c8c" }}>
        Sorry, the page you visited does not exist.
      </p>
    </div>
  );
}
