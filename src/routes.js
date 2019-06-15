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
    <Route name="productslist" handler={require('./components/products/productsList')} />
    <Route name="about" handler={require('./components/about/aboutPage')} />     
    <Route name ="shoppingcart" handler={require('./components/shoppingcart/shoppingCart')}/> 
    <Route name ="productdetails" path="/product/:id" handler={require('./components/products/productDetails')}/>
  </Route>
);

module.exports = routes;