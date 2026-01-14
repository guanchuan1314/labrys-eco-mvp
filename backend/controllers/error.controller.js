const { errorRequest } = require('../requests/error.request');
const { errorResponse: standardErrorResponse, errorValidationResponse } = require('../responses/error.response');
const logger = require('../utils/logger');

exports.error = async (req, res, next) => {
  try {
    const sanitizedError = errorRequest(req.body);
    logger.error('Frontend Error:', sanitizedError.message, {
      user_id: req.user_id,
      address: req.address
    });

    return standardErrorResponse(res, {
      success: true,
      message: 'Error logged successfully'
    });
  } catch (error) {
    if (error.message.includes('required')) {
      return errorValidationResponse(res, error.message);
    }

    logger.error('Error logging endpoint failed:', error);
    next(error);
  }
};