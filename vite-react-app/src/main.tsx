import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ReduxProvider from "./redux/ReduxProvider.tsx";
import { AppThemeContextProvider } from "./context/AppThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider>
      <AppThemeContextProvider>
        <App />
      </AppThemeContextProvider>
    </ReduxProvider>
  </StrictMode>,
);
