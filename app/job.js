'use strict';

var CronJob = require('cron').CronJob;
var settings = require('../settings.json');
var loadCsv = require('./loadCsv');
var db = require('./db');
var log = require('./logger')();

module.exports.job = new CronJob({
    cronTime: settings.cronTime,
    onTick: function() {
        getLineAndInsert(1)
            .then(() => {
                getLineAndInsert(2);
        });
    },
    start: false,
    timeZone: 'Australia/Brisbane'
});


function getLineAndInsert(line){
    return new Promise((resolve, reject) => {
        //TODO: change for map or something!
        settings.tables.map((table, i) => {
            loadCsv.lastLine(settings.dropboxDir + settings.tables[i].file, line, function (lastRow) {
                db.insertRow(settings.tables[i].name, lastRow, lastRow[1], function (err) {
                    if (err) {
                        log.error(err);
                        reject(new Error(err));
                    } else {
                        resolve();
                    }
                });
            });
        });
    });
}