import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'Recharts';
import Weather from '../utils/Weather';
import moment from 'moment';

function formatTick(d) {
    return moment(d).format('DD MMM HH:mm');
}

function yFormatter(num) {
    return Math.floor(parseFloat(num));
}

const LineChartWData = React.createClass({
    //data={this.state.series} mnmx={this.state.mnmx}
    getInitialState: function() {
        return {
            data: [],
            mnmx:{}
        }
    },
    componentDidMount: function() {
        var table = this.props.table;
        var column = this.props.column;
        Weather
            .getWeather2(table, column)
            .then(res => res.json())
            .then(function(response) {
                this.setState({
                    data: response.rows,
                    mnmx: response.mnmx
                })
            }.bind(this))
            .catch(function(err) {
                console.log(err)
            })
    },
    render: function() {
        return (
        <div className="data-chart">
            <div className="center">{this.props.title}</div>
            <LineChart width={600} height={300} data={this.state.data}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="x" minTickGap={70}
                       tickFormatter={formatTick} />
                <YAxis dataKey="y" allowDecimals={false} type="number"
                       domain={[this.state.mnmx.minY, this.state.mnmx.maxY]}
                       tickFormatter={yFormatter}/>
                <CartesianGrid strokeDasharray="6 8"/>
                <Tooltip content={<ContentTooltip unit={this.props.unit} name={this.props.name}/>}/>
                <Legend />
                <Line name={this.props.unit} type="monotone" dataKey="y" stroke="#8884d8" />
            </LineChart>
        </div>
        );
    }
});

module.exports = LineChartWData;

const tooltipStyle = {
    backgroundColor: 'white',
    border: '1px solid',
    borderColor: '#ccc',
    padding: '1em',
    margin: '1em'
};

const ContentTooltip = React.createClass({
  render: function() {
      return (
            <div style={tooltipStyle}>
                <div>{moment(this.props.payload[0].payload.x).format('DD-MM-YYYY HH:mm')}</div>
                <div>{this.props.name}:
                    {parseFloat(this.props.payload[0].payload.y).toFixed(1)}
                    {this.props.unit}
                </div>
            </div>
        )
    }
});

