import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./stores/store.ts";
import { ErrorBoundary } from "react-error-boundary";
import { Router } from "./navigation/Router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallback={<p>🤓 Empty</p>}>
      <Provider store={store}>
        <Router />
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
