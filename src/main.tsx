import React from "react";
import ReactDOM from "react-dom/client";

import { BaseErrorBoundary } from "./components/base/base-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { RootLayoutPage } from "./pages/layout";
import "./services/i18n";
import '@/assets/styles/index.css'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>

        <BaseErrorBoundary>
            <BrowserRouter>
                <RootLayoutPage />
            </BrowserRouter>
        </BaseErrorBoundary>

    </React.StrictMode>
);
