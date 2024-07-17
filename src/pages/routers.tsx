
import HomePage from "./home";
import RouteErrorPage from "../components/base/base-route-error";
import GachaPage from "./gacha";
import { BaseErrorBoundary } from "../components/base/base-error-boundary";

export const routers = [
    {
        label: "Label-Home",
        path: "/",
        element: <HomePage></HomePage>,
        errorElement: <RouteErrorPage></RouteErrorPage>
    },
    {
        label: "Label-Home",
        path: "/gacha",
        element: <GachaPage></GachaPage>,
        errorElement: <RouteErrorPage></RouteErrorPage >
    }
].map((router) => ({
    ...router,
    element: (
        <BaseErrorBoundary key={router.label}>{router.element}</BaseErrorBoundary>
    ),
}))