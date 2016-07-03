'use strict';

const log4js = require('log4js');
const settings = require('../settings.json');

log4js.clearAppenders();
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file(settings.logFile), 'main');

module.exports = function () {
    let logger = log4js.getLogger('main');
    logger.setLevel(settings.logLevel);
    return logger;
};