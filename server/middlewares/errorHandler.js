const logger = require('../utils/logger');  // Import the logger

const errorHandler = (err, req, res, next) => {
  // Log the error stack using the logger
  logger.error(`Error occurred: ${err.stack || err}`);

  // Determine the status code and message
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Respond with the error
  res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = errorHandler;
