const morgan = require('morgan');
const logger = require('./logger'); // Winston Logger


// Create a custom Morgan format that logs via Winston
const morganLogger = morgan((tokens, req, res) => {
  const logMessage = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens['response-time'](req, res), // Response time (optional)
  ].join(' ');

  // Log the HTTP request using Winston
  if (tokens.status(req, res) >= 400) {
    logger.error(logMessage);  // Log errors in red
  } else {
    logger.info(logMessage);   // Log normal requests in green
  }

  return null; // Don't output to the console via morgan itself
});

module.exports = morganLogger;
