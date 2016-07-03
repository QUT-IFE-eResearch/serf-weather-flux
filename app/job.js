'use strict';

var CronJob = require('cron').CronJob;
var waterfall = require('async-waterfall');
const settings = require('../settings.json');

module.exports.job = new CronJob({
    cronTime: set.cronTime,
    onTick: function() {
        getLineAndInsert(1)
            .then(()=>{
                getLineAndInsert(2)
        });
    },
    start: false,
    timeZone: 'Australia/Brisbane'
});


function getLineAndInsert(line){
    return new Promise((resolve, reject) => {
        for(var i = 0; i < settings.tables.length; i++) {
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
        }
    });
}