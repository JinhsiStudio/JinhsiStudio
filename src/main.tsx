import React from "react";
import ReactDOM from "react-dom/client";

import { BaseErrorBoundary } from "./components/base/base-error-boundary";
import { BrowserRouter } from "react-router-dom";
import RootLayoutPage from "./pages/layout";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>

        <BaseErrorBoundary>
            <BrowserRouter>
                <RootLayoutPage />
            </BrowserRouter>
        </BaseErrorBoundary>

    </React.StrictMode>
);
