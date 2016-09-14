var React = require('react');
var Loading = require('./Loading');

function isHL(hl) {
    if(hl===1){return 'High'}
    if(hl===2){return 'Low'}
    else{return ''}
}

var DataPanel = React.createClass({
    getDefaultProps: function () {
        return {
            data:[]
        }
    },
    render: function () {
        return (
            <div className='data-panel'>
                <h3 className='subtitle'>{this.props.subtitle}</h3>
                {this.props.isLoading === true
                ? <Loading text='loading' speed={800}/>
                : <dl>
                    {this.props.data.map((item, index) => {
                        var hl = isHL(item.highlow) !== 'High' ? 'line' : '';
                        if(item.unit!==''){item.value = isNaN(item.value)? ' - ': item.value}
                        return (
                            <span key={index}>
                                <dt className={hl}>
                                    {item.name || ' '}
                                </dt>
                                <dd className={hl}>
                                    {isHL(item.highlow)} {item.value} {item.unit} {item.highlow ? item.date : ''}
                                </dd>
                            </span>
                        )
                    })}
                </dl>}
            </div>
        )
    },
    propTypes : {
        isLoading: React.PropTypes.bool.isRequired
    }
});



module.exports = DataPanel;