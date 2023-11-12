const moment = require('moment');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const now = moment().format('YYYY-MM-DD HH:mm:ss');

const logFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(
        (info) => `${now} : ${info.message}`,
    ),
);

const transport = new DailyRotateFile({
  filename: './/logs//NodeWinstonApp-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  prepend: true,
  level: null,
  localTime: true,
});

transport.on('rotate', (oldFilename, newFilename) => {
  // call function like upload to s3 or on cloud
});

const logger = winston.createLogger({
  format: logFormat,
  transports: [
    transport,
    new winston.transports.Console({
      level: 'info',
    }),
  ],
});

module.exports = logger;
