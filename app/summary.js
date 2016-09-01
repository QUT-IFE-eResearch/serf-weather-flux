'use strict';

var db = require('./db');
const cardinal = require('../app/utils/cardinal');
var moment = require('moment');

function myParse(value) {
    return parseFloat(value).toFixed(2);
}
function formatDate(date) {
    return moment(date).format('DD-MM-YYYY HH:mm:ss')
}
module.exports = function () {
    //This function will return current and highLow weather data
    var today = moment().format('YYYY-MM-DD');

    return Promise.all([
        db.getLastTimeStamp('CR3000_slow_met','TIMESTAMP'),
        db.getLastTimeStamp('CR3000_slow_met','Ta_HMP_01_Avg'),
        db.getLastTimeStamp('CR3000_slow_met','RH_HMP_01_Avg'),
        db.getLastTimeStamp('CR3000_slow_met','ps_7500_Avg'),
        db.getLastTimeStamp('CR3000_slow_met','WS_WS4_AVg'),
        db.getLastTimeStamp('CR3000_slow_met','WD_WS4_Avg'),
        db.getLastTimeStamp('CR3000_slow_met','Rain_Tot'),
        db.getMax('CR3000_slow_met','Ta_HMP_01_Avg','TIMESTAMP', today),
        db.getMax('CR3000_slow_met','RH_HMP_01_Avg','TIMESTAMP', today),
        db.getMax('CR3000_slow_met','ps_7500_Avg','TIMESTAMP', today),
        db.getMax('CR3000_slow_met','WS_WS4_AVg','TIMESTAMP', today),
        db.getMin('CR3000_slow_met','Ta_HMP_01_Avg','TIMESTAMP', today),
        db.getMin('CR3000_slow_met','RH_HMP_01_Avg','TIMESTAMP', today),
        db.getMin('CR3000_slow_met','ps_7500_Avg','TIMESTAMP', today),
        db.getMin('CR3000_slow_met','WS_WS4_AVg','TIMESTAMP', today),
        db.getSum('CR3000_slow_met','Rain_Tot','TIMESTAMP', today)

    ]).then((res) => {
        var d = formatDate(res[0].TIMESTAMP);
        var t = myParse(res[1].Ta_HMP_01_Avg);
        var h = myParse(res[2].RH_HMP_01_Avg) * 100;
        var b = myParse(res[3].ps_7500_Avg);
        var w = myParse(res[4].WS_WS4_AVg);
        var wd = cardinal(res[5].WD_WS4_Avg);
        var r = myParse(res[6].Rain_Tot);

        var tMax = myParse(res[7].max);
        var hMax = myParse(res[8].max)* 100;
        var bMax = myParse(res[9].max);
        var wMax = myParse(res[10].max);

        var tMin = myParse(res[11].min);
        var hMin = myParse(res[12].min)* 100;
        var bMin = myParse(res[13].min);
        var wMin = myParse(res[14].min);

        var rSum = myParse(res[15].sum);

        //highlow: low: 1, high: 2, none: ''
        return {
            current: [
                {name: 'Temperature', value: t, unit: '°C', max: 60, isMeter: true},
                {name: 'Humidity', value: h, unit: '%', max: 100, isMeter: true},
                {name: 'Barometer', value: b, unit: 'ps', max: 1070, isMeter: true},
                {name: 'Rain', value: r, unit: 'mm', max: 100, isMeter: true},
                {name: 'Wind', value: w, unit: 'km/hr', max: 100, isMeter: false},
                {name: 'Wind Direction', value: wd, unit: '', max: 100, isMeter: false}
            ],
            wind: {name: 'Wind', value: w, unit: 'km/hr', direction: wd, max: 100},
            highLow: [
                {name: 'Temperature', value: tMax, unit: '°C', highlow: 1},
                {name: '', value: tMin, unit: '°C', highlow: 2},
                {name: 'Humidity', value: hMax, unit: '%', highlow: 1},
                {name: '', value: hMin, unit: '%', highlow: 2},
                {name: 'Barometer', value: bMax, unit: 'ps', highlow: 1},
                {name: '', value: bMin, unit: 'ps', highlow: 2},
                {name: 'Wind', value: wMax, unit: 'km/hr', highlow: 1},
                {name: '', value: wMin, unit: 'km/hr', highlow: 2},
                {name: 'Today\'s Rain', value: rSum, unit: 'mm'}
            ],
            dateUpdated: d
        }
    });
};