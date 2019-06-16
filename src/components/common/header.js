"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ProductActions = require('../../actions/productsActions');
var ProductsStore = require("../../stores/productsStore");

var Header = React.createClass({
  getInitialState: function () {
    return {
      _productsInShoppingCart: []
    };
  },

  componentWillMount: function () {
    ProductsStore.addChangeListener(this._onChange);
  },  

  //Clean up when this component is unmounted
  componentWillUnmount: function () {
    ProductsStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    var productsInShoppingCart = ProductsStore.getProductsFromShoppingCart();
    this.setState({ _productsInShoppingCart: productsInShoppingCart });
  },

  render: function () {
    var styles = {
      height: "30px",
      width: "70px"
    }

    return (
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <Link to="app" className="navbar-brand">
              <img style={styles} src="images/Contoso_logo.png" />
            </Link>
            <ul className="nav navbar-nav">
              <li><Link to="app">Home</Link></li>
              <li><Link to="productslist">products</Link></li>
              <li><Link to="about">About</Link></li>
              <li><Link to="shoppingcart">
                <span className="glyphicon glyphicon-shopping-cart">
                  {this.state._productsInShoppingCart.length}
                </span>
              </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
});

module.exports = Header;
