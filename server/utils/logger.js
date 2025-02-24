const winston = require('winston');
const colors = require('colors');

class Logger {
  constructor() {
    if (!Logger.instance) {
      this.logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          winston.format.printf(({ level, message, timestamp }) => {
            const colorizedTimestamp = colors.cyan(timestamp);
            const colorizedLevel =
              level === 'info'
                ? colors.green(level.toUpperCase())
                : level === 'warn'
                ? colors.yellow(level.toUpperCase())
                : level === 'error'
                ? colors.red(level.toUpperCase())
                : colors.white(level.toUpperCase());

            return `${colorizedTimestamp} [${colorizedLevel}]: ${message}`;
          })
        ),
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({ filename: 'logs/app.log' }) // Save logs to a file
        ],
      });

      Logger.instance = this;
    }
    return Logger.instance;
  }

  log(level, message) {
    this.logger.log({ level, message });
  }

  info(message) {
    this.logger.info(message);
  }

  warn(message) {
    this.logger.warn(message);
  }

  error(message) {
    this.logger.error(message);
  }
}

module.exports = new Logger();
