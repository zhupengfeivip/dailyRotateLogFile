const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');

/**
 * 
 * 实际测试运行结果，日志最多保留maxFiles个，每个日志大小maxSize，如果一天内日志过多，超过了maxSize，则可能会删除其他日志的数据。
 * 整个目录下最多maxFiles个，
 * 
 **/

var transport = new transports.DailyRotateFile({
    frequency: '4h',
    filename: 'run-%DATE%.log',
    dirname: 'log/',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false,
    maxSize: '2k',
    maxFiles: 3,
});

transport.on('rotate', function (oldFilename, newFilename) {
    // do something fun
    console.log(oldFilename, newFilename);
});

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

var logger = createLogger({
    format: combine(
        label({ label: 'index2.js' }),
        timestamp(),
        myFormat
    ),
    transports: [
        transport,
        // new winston.transports.Console(),
        // new transports.File({ filename: 'error.log', level: 'error' }),
    ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.simple(),
    }));
}

for (let index = 0; index < 1000; index++) {
    logger.info('Hello World!' + index);

}
