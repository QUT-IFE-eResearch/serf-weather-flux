'use strict';

var fs = require('fs');
var csv = require('fast-csv');
const log = require('./logger')();

module.exports.lastLine = function(fileLocation, line) {
    return new Promise((resolve, reject) => {
        var file = [];
        var stream = fs.createReadStream(fileLocation);
        csv
            .fromStream(stream)
            .on("data", function (data) {
                file.push(data);
            })
            .on("end", function (n) {
                resolve(file[n - line]);
            })
        .on("error", (error) => {
                log.error(error);
                reject(new Error(error));
            });

    });
};