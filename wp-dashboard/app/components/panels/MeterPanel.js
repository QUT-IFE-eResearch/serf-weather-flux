var React = require('react');
var LinearGauge = require('../LinearGauge');

var meterType = [
    {name:'temp',stop1:'#c00',stop2:'yellow',stop3:'#0c0'},
    {name:'rain',stop1:'#2868F1',stop2:'white',stop3:'#D1D3D7'}
];

var MeterPanel = React.createClass({
    getDefaultProps: function () {
        return {
            data:[]
        }
    },
    render: function () {
        return (
            <div className='meter-panel'>
            {this.props.data.map((item, index) => {
                if(item.isMeter) {
                    return (
                        <div className='meter' key={index}>
                            <h4 className='meter-title'>{item.name}</h4>
                            <div>{item.value} {item.unit}</div>
                            <div className='meter-container'>
                                <LinearGauge
                                    id={index}
                                    GHeight={200} GWidth={60}
                                    height={300} width={60} max={item.max}
                                    value={item.value} type={item.name === 'Rain' ? meterType[1] : meterType[0]}
                                />
                            </div>
                        </div>
                    )
                }
            })}
            </div>
        )
    }
});

module.exports = MeterPanel;