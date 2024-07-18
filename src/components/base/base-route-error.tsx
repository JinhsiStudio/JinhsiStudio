import { useRouteError } from "react-router-dom";

export default function RouteErrorPage() {
    const error: any = useRouteError();
    console.error(error);
    return (
        <div id="route-error-page">
            <h1>404</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}