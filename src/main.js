$ = jQuery = require('jquery');

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var App = require('./components/app');

React.render(<App />, document.getElementById('app'));

