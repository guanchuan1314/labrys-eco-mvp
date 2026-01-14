export const errorRequest = (body: any) => {
  if (!body.message || typeof body.message !== "string") {
    throw new Error("Error message is required and must be a string");
  }

  let message = body.message;
  if (message.length > 5000) {
    message = message.substring(0, 5000) + "... (truncated)";
  }

  return {
    message,
  };
};
