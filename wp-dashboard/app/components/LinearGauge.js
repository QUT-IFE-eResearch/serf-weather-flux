var React = require('react');

var LinearGauge = React.createClass({
    getDefaultProps: function () {
        return {
            GWidth: 100,
            GHeight: 300,
            width: 0,
            height: 0,
            value: 0,
            max: 100,
            min: 0
        }
    },
    calcPos: function () {
        return (-this.props.value + this.props.max) * this.props.GHeight/this.props.max;
    },
    render: function() {
        return (
            <svg width={this.props.GWidth} height={this.props.GHeight}>
                <defs>
                    <linearGradient
                        id={'gradient_'+this.props.id} x1="0%" y1="0%" x2="0%" y2="100%" spreadMethod="pad">
                        <stop offset="0%" stopColor={this.props.type.stop1} stopOpacity="1"></stop>
                        <stop offset="50%" stopColor={this.props.type.stop2} stopOpacity="1"></stop>
                        <stop offset="100%" stopColor={this.props.type.stop3} stopOpacity="1"></stop>
                    </linearGradient>
                </defs>
                <g>
                    <rect x="0" y="0" width={this.props.width} height="100%" fill={'url(#gradient_'+this.props.id+')'}></rect>
                </g>
                <g>
                    <line x1={this.props.width} y1={this.calcPos()} x2="0" y2={this.calcPos()} strokeWidth="3" stroke="black"></line>
                </g>
                <g>
                    <circle cx={this.props.width/2} cy={this.calcPos()} r="10"></circle>
                </g>
            </svg>
        )
    }
});

module.exports = LinearGauge;