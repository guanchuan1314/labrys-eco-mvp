import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { Web3ReactProvider } from "@web3-react/core";
import { initGlobalErrorHandler } from "./utils/globalErrorHandler";
import ErrorView from "./components/ErrorView";

import connectors from "./connectors/index";

// Initialize global error handler
initGlobalErrorHandler();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorView>
      <Web3ReactProvider connectors={connectors as any}>
        <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "right" }}>
          <App />
        </SnackbarProvider>
      </Web3ReactProvider>
    </ErrorView>
  </React.StrictMode>
);

