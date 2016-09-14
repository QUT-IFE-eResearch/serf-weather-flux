require("babel-polyfill");
var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./config/routes');

require('./css/main.css');

ReactDOM.render(
    routes,
    document.getElementById('app')
);