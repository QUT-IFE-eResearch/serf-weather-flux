var settings = require('../settings');

var Weather = {
    getPragma: function(table){
        var q = settings.url + '/' + settings.pragma + '/' + table;
        return fetch(q);
    },
    getWeather: function (table, col) {
        var q = settings.url + '/' + settings.flux + '/' + table + '/';
        return fetch(q + 'TIMESTAMP.' + col);
    },
    getWeather2: function (table, col) {
        var q = settings.url + '/' + settings.flux2 + '/' + table + '/';
        return fetch(q + 'TIMESTAMP.' + col);
    },
    getSummary: function () {
        var q = settings.url + '/summary' ;
        return fetch(q);
    }
};

module.exports = Weather;