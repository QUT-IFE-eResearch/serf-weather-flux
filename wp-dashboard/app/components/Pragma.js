var React = require('react');
var styles = require('../styles');

var Pragma = React.createClass({
    getInitialState: function() {
        return {
            selected: this.props.selected
        }
    },
    isActive: function(name){
        return 'list-group-item ' + ((name === this.state.selected) ? 'active' : 'default');
    },
    setActiveLiItem: function(el) {
        this.setState({selected: el.name || null});
        this.props.selectColumn(el);
    },
    render: function () {
        return (
                <ul className='list-group' style={styles.pragma}>
                    <li className='list-group-item disabled'>Select a Value</li>
                    {this.props.columns.map(function(el, i){
                        if(el.name === 'TIMESTAMP' || el.name === 'RECORD'){
                            return ''
                        }else {
                            return (
                                <li className={this.isActive(el.name)}
                                    key={el.name}
                                    onClick={this.setActiveLiItem.bind(null, el)}
                                    style={styles.cursor}
                                >{el.name.replace(new RegExp('_', 'g'), ' ')}</li>
                            )
                        }
                    }.bind(this))}
                </ul>
        )
    }
});

module.exports = Pragma;

