/**
 * Standardizes error logging response
 * Returns consistent response format for error reporting endpoints
 *
 * @param {Object} res - Express response object
 * @param {Object} options - Response options
 * @param {boolean} options.success - Whether error was logged successfully
 * @param {string} options.errorId - Optional error tracking ID
 * @param {string} options.message - Optional response message
 * @returns {Object} Express response
 */
exports.errorResponse = (res, options = {}) => {
  const {
    success = true,
    errorId = null,
    message = 'Error logged successfully'
  } = options;

  const response = {
    success,
    message,
    timestamp: new Date().toISOString()
  };

  // Only include errorId if provided
  if (errorId) {
    response.errorId = errorId;
  }

  const statusCode = success ? 200 : 500;

  return res.status(statusCode).json(response);
};

/**
 * Standardizes error response for validation failures
 *
 * @param {Object} res - Express response object
 * @param {string} validationError - Validation error message
 * @returns {Object} Express response
 */
exports.errorValidationResponse = (res, validationError) => {
  return res.status(400).json({
    success: false,
    message: 'Validation failed',
    error: validationError,
    timestamp: new Date().toISOString()
  });
};