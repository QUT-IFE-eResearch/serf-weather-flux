var React = require('react');
var Gauge = require('./Gauge');

var WindGauge = React.createClass({
    getDefaultProps:function () {
        return {
            wind:{}
        }
    },
    render: function () {
        var value = isNaN(this.props.wind.value) ? ' ' : this.props.wind.value;
        return (
            <Gauge value={value} unit={this.props.wind.unit} max={this.props.wind.max} color={"#06477F"} width={400} height={320} label={"Wind " + this.props.wind.direction} />
        )
    }
});

module.exports = WindGauge;