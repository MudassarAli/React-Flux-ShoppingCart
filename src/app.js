'use strict';
var React = require('react');
var ShoppingCart = require("./components/shoppingcart/shoppingCart");
var ProductList = require("./components/products/productlist");
var ProductDetails = require("./components/products/productDetails");
var Search = require("./components/search/search");
var ProductApi = require("./api/productsApi");

var App = React.createClass({

  getInitialState: function () {
    return {
      products: [],
      soldProducts: [],
      selectedProduct: "",
      selecteditemIndex: -1,
      sold: -1,
      showShoppingCart: false,
      show: false
    };
  },

  componentDidMount: function () {
    var _products = ProductApi.getAllProducts();
    this.setState({ products: _products });
  },

  _buyProduct: function (index) {
    var products = this.state.products;
    var item = products[index];
    item.total = item.total - 1;
    products.splice(index, 1, item);
    this.setState({ products: products });

    var soldProducts = this.state.soldProducts;
    soldProducts.push(item);
    this.setState({ soldProducts: soldProducts });

    this.setState({ showShoppingCart: false });
  },

  _searchProducts: function (value) {
    var updatedList = this.state.products;
    updatedList = updatedList.filter(function (item) {
      return item.name.indexOf(value) !== -1;
    });
    this.setState({ products: updatedList });
  },

  _selectedProduct: function (item, index) {
    this.setState({ selecteditemIndex: index });
    this.setState({ selectedProduct: item });
  },

  _showShoppingCart: function () {
    if (this.state.soldProducts.length <= 0) {
      alert("Nothing in shopping cart");
    } else {
      this.setState({ showShoppingCart: true });
    }
  },

  _hideShoppingCart: function () {
    this.setState({ selectedProduct: "" });
    this.setState({ showShoppingCart: false });
  },

  _goToHomePage: function () {
    this.setState({ showShoppingCart: true });
  },

  _removeProduct: function (product, itemIndex) {
    var soldproducts = this.state.soldProducts;
    soldproducts.splice(itemIndex, 1);
    this.setState({ soldProducts: soldproducts });

    var products = this.state.products;
    var prodObject = products.find(function (obj) { return obj.name === product.name; });
    prodObject.total = prodObject.total + 1;
    this.setState({ products: products });
  },

  render: function () {
    var activeComponent = null;
    var searchComponent = null;

    if (this.state.soldProducts.length > 0 && this.state.showShoppingCart) {
      activeComponent = <ShoppingCart hideShoppingCart={this._hideShoppingCart}
        soldproducts={this.state.soldProducts} removeproduct={this._removeProduct} />;
    } else if (this.state.selectedProduct === "") {
      activeComponent = <ProductList items={this.state.products} buyProduct={this._buyProduct}
        selectedProduct={this._selectedProduct} />;
      searchComponent = <Search searchProducts={this._searchProducts} />;
    } else {
      activeComponent = <ProductDetails hideShoppingCart={this._hideShoppingCart}
        index={this.state.selecteditemIndex} selectedProduct={this.state.selectedProduct}
        buyProduct={this._buyProduct} />;
      searchComponent = <Search searchProducts={this._searchProducts} />;
    }

    return (
      <div className="container">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="/">
            <span>Contoso shopping center</span>
          </a>

          <a href="#" className="btn btn-info btn-lg" onClick={this._showShoppingCart}>
            <span className="glyphicon glyphicon-shopping-cart"></span> {this.state.soldProducts.length}
          </a>
        </nav>

        <br />
        <div className="container" >
          {searchComponent}
          <br />
          {activeComponent}
        </div>
      </div>
    );
  }
}
);
module.exports = App;
