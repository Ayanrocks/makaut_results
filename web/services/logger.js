const winston = require("winston");
const path = require("path");

var options = {
  file: {
    level: "debug",
    filename: path.join(__dirname, "../.logs/app.log"),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

var logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.File({ filename: path.join(__dirname, "../.logs/combined.log") }),
    new winston.transports.File({ filename: path.join(__dirname, "../.logs/error.log"), level: "error" }),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
});

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  }
};

module.exports = logger;
