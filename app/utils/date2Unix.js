var moment = require('moment');

module.exports = (value) => {
    var momentFormat = 'YYYY-MM-DD HH:mm:SS';
    var r = moment(value, momentFormat);
    if(r.isValid()){
        return r.valueOf();
    }else {
        return null
    }
};