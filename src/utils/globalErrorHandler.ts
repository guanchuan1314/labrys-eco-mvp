import { logError } from "../services/error.service";

/**
 * Global error handler that catches unhandled errors and promise rejections
 */
export const initGlobalErrorHandler = () => {
  // Handle uncaught errors
  window.addEventListener("error", (event) => {
    console.error("Uncaught error:", event.error);

    const errorMessage = event.error?.message || event.message || "Unknown error occurred";
    const stack = event.error?.stack || "";
    const location = `${event.filename}:${event.lineno}:${event.colno}`;

    const fullMessage = `[Uncaught Error] ${errorMessage}\nLocation: ${location}\nStack: ${stack}`;
    logError(fullMessage);

    // Prevent default browser error handling
    event.preventDefault();
  });

  // Handle unhandled promise rejections
  window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled promise rejection:", event.reason);

    let errorMessage = "Unhandled promise rejection";
    let stack = "";

    if (event.reason instanceof Error) {
      errorMessage = event.reason.message;
      stack = event.reason.stack || "";
    } else if (typeof event.reason === "string") {
      errorMessage = event.reason;
    } else if (event.reason?.message) {
      errorMessage = event.reason.message;
      stack = event.reason.stack || "";
    }

    const fullMessage = `[Unhandled Promise] ${errorMessage}\nStack: ${stack}`;
    logError(fullMessage);

    // Prevent default browser error handling
    event.preventDefault();
  });

  console.log("Global error handler initialized");
};
