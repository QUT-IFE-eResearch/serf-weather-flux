var React = require('react');

var DataView = React.createClass({
    render: function () {
        return (
            <div>
                <div>Select From</div>
                <div>Today</div>
                <div>Yesterday</div>
                <div>This Month</div>
                <div>This Year</div>
                <div><input type="submit"/></div>
            </div>
        )
    }
});


module.exports = DataView;