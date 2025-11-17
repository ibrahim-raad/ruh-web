import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppProviders } from "@/app/providers/AppProviders";
import { AppRouter } from "@/app/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <Suspense fallback={null}>
        <AppRouter />
      </Suspense>
    </AppProviders>
  </StrictMode>
);
