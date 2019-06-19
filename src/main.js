var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var App = require('./components/app');
var InitializeActions = require('./actions/initializeActions');

InitializeActions.initApp();
//InitializeActions.initProductCategories();

Router.run(routes, function(Handler) {
	React.render(<Handler/>, document.getElementById('app'))
});
