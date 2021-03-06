var React = require('react');
var TimerMixin = require('react-timer-mixin');

var Weather = require('../utils/Weather');
var MainContainer = require('./MainContainer');
var DataPanel = require('./panels/DataPanel');
var MeterPanel = require('./panels/MeterPanel');
var WindGauge = require('./panels/WindGauge');
var LineChartWData = require('./panels/LineChartWData');
var DataView = require('./panels/DataView');
var Loading = require('./Loading');

function getSummary () {
    Weather
        .getSummary()
        .then(res => res.json())
        .then(function (response) {
            var w = {
                current: response.current,
                highLow: response.highLow,
                wind: response.wind,
                dateUpdated: response.dateUpdated
            };
            this.setState({
                current: w.current,
                highLow: w.highLow,
                wind: w.wind,
                dateUpdated: w.dateUpdated,
                isLoading: false
            });
        }.bind(this))
        .catch(function (err) {
            //TODO: add alert
            reject(err);
        }.bind(this));
}

var Home = React.createClass({
    mixins: [TimerMixin],
    getInitialState: function () {
      return {
          selected: 'WEATHER',
          current: [],
          highLow: [],
          wind: {},
          dateUpdated: '',
          isLoading: true
      }
    },
    componentDidMount: function() {
       getSummary.bind(this)();
        this.setInterval(
            () => { getSummary.bind(this)(); },
            600000
        );
    },
    isActive: function (text) {
        return (text === this.state.selected) ? 'active' : 'default';
    },
    isPanelActive: function (text) {
        return 'panel-area ' + ((text === this.state.selected) ? 'show' : 'hide');
    },
    selectMenu: function (e) {
        e.preventDefault();
        this.setState({
            selected: e.target.text
        });
    },
    render: function () {
        return (
            <div className="main-container">
                <div className="main-item monitor-area">
                    <div className="monitor-area-item menu main-nav">
                        <ul className="main-nav-list">
                            <li><a href="#" className={this.isActive('WEATHER')} onClick={this.selectMenu}>WEATHER</a></li>
                            <li><a href="#" className={this.isActive('WIND')} onClick={this.selectMenu}>WIND</a></li>
                            <li><a href="#" className={this.isActive('CHARTS')} onClick={this.selectMenu}>CHARTS</a></li>
                            <li><a href="#" className={this.isActive('RAIN')} onClick={this.selectMenu}>RAIN</a></li>
                        </ul>
                    </div>
                    <div className="monitor-area-item panel">
                        {this.state.isLoading === true
                        ? <Loading text='loading' speed={800}/>
                        : ''}
                        <div className={this.isPanelActive('WEATHER')}>
                            <MeterPanel
                                data={this.state.current}/>
                        </div>
                        <div className={this.isPanelActive('WIND')}>
                            <div className="wind-panel">
                                <WindGauge wind={this.state.wind} />
                            </div>
                        </div>
                        <div className={this.isPanelActive('CHARTS')}>
                            <div className="chart-panel">
                                <LineChartWData
                                    table="CR3000_slow_met" column="Ta_HMP_01_Avg"
                                    title="Temperature" unit="°C" name="Temp"/>
                                < LineChartWData
                                    table="CR3000_slow_met" column="ps_7500_Avg"
                                    title="Pressure" unit="kPa" name="Pressure"/>
                            </div>
                        </div>
                        <div className={this.isPanelActive('RAIN')}>
                            <div className="chart-panel rain">
                                <LineChartWData
                                    table="CR3000_slow_met" column="Rain_Tot"
                                    title="Rain" unit="mm" name="Rain"/>
                            </div>
                        </div>
                    </div>
                    <div className="monitor-area-item footer">
                        <img src={require("./../images/qut-logo-50.jpg")} alt="QUT"/>
                        <div>SERF - Updated at {this.state.dateUpdated}</div>
                    </div>
                </div>
                <div className="main-item data-area">
                    <div className="data-1">
                        <DataPanel
                            isLoading={this.state.isLoading}
                            subtitle="Current Weather at Samford Ecological Research Facility, Queensland"
                            data={this.state.current}/>
                    </div>
                    <div style={{display:'none'}} className="justIE">
                        <p>Updated {this.state.dateUpdated}</p>
                    </div>
                    <div className="data-2">
                        <DataPanel
                            isLoading={this.state.isLoading}
                            subtitle="Today's Highs"
                            data={this.state.highLow}/>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Home;