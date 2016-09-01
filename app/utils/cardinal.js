module.exports = (degree) => {
    var nsew = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"];
    var res = Math.abs(Math.round(degree/22.5));
    return nsew[res] || ' - ';
};