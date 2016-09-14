
var Weather = {
    getPragma: function(table){
        var q = Settings.url + '/' + Settings.pragma + '/' + table;
        return fetch(q);
    },
    getWeather: function (table, col) {
        var q = Settings.url + '/' + Settings.flux + '/' + table + '/';
        return fetch(q + 'TIMESTAMP.' + col);
    },
    getWeather2: function (table, col) {
        var q = Settings.url + '/' + Settings.flux2 + '/' + table + '/';
        return fetch(q + 'TIMESTAMP.' + col);
    },
    getSummary: function () {
        var q = Settings.url + '/summary' ;
        return fetch(q);
    }
};

module.exports = Weather;