import { error } from "../apis/error.api";

// These functions can be called at try/catch or globally handle the error
export const logError = async (message: string) => {
  try {
    return await error(message);
  } catch (err) {
    console.error("Failed to log error to backend:", err);
    return null;
  }
};

export const logCaughtError = async (err: any, context?: string) => {
  let errorMessage = "Unknown error occurred";

  if (err instanceof Error) {
    errorMessage = err.message;
  } else if (typeof err === "string") {
    errorMessage = err;
  } else if (err?.message) {
    errorMessage = err.message;
  }

  if (context) {
    errorMessage = `[${context}] ${errorMessage}`;
  }

  return logError(errorMessage);
};
