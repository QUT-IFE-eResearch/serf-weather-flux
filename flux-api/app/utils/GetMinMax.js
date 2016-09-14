'use strict';

var moment = require('moment');

function mToUnix(s, momentFormat) {
    var r = moment(s, momentFormat);
    if(r.isValid()){
        return r.valueOf();
    }else {
        return null
    }
}

var GetMinMax = function (xyed) {
    
    var momentFormat = 'YYYY-MM-DD HH:mm:SS';
    
    //Get min and max for the XY'ed array
    var maxCB = (max, cur) => Math.max(max, cur);
    var minCB = (min, cur) => Math.min(cur, min);

    var minX = xyed.map(el => mToUnix(el.x, momentFormat) ).reduce(minCB, Infinity);
    var minY = xyed.map(el => parseFloat(el.y)).reduce(minCB, Infinity);

    var maxX = xyed.map(el => mToUnix(el.x, momentFormat) ).reduce(maxCB, -Infinity);
    var maxY = xyed.map(el => parseFloat(el.y)).reduce(maxCB, -Infinity);

    minX = moment(minX).format(momentFormat);
    maxX = moment(maxX).format(momentFormat);

    return {
        minX: minX, minY: minY, maxX: maxX, maxY: maxY
    }
};

module.exports = GetMinMax;