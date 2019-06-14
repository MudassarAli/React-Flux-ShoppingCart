"use strict";

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
  <Route name="app" path="/" handler={require('./components/app')}>
    <DefaultRoute handler={require('./components/Home/homePage')} />
    <Route name="products" handler={require('./components/products/productlist')} />
    <Route name="about" handler={require('./components/about/aboutPage')} />
    
  </Route>
);

module.exports = routes;