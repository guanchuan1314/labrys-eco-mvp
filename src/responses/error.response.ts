interface ErrorResponse {
  success: boolean;
  message: string;
  timestamp: string;
  errorId?: string;
  error?: string;
}

export const errorResponse = (response: any): ErrorResponse => {
  const validatedResponse: ErrorResponse = {
    success: response.success ?? false,
    message: response.message || "No message provided",
    timestamp: response.timestamp || new Date().toISOString(),
  };

  if (response.errorId) {
    validatedResponse.errorId = response.errorId;
  }

  if (response.error) {
    validatedResponse.error = response.error;
  }

  // Validate success field is boolean
  if (typeof validatedResponse.success !== "boolean") {
    console.warn("Invalid success field in error response:", validatedResponse.success);
    validatedResponse.success = false;
  }

  return validatedResponse;
};
