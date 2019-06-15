'use strict';
var React = require('react');
var Search = require("../search/search");
var Product = require("./product")
var ProductApi = require("../../api/productsApi");
var Router = require('react-router');
var Link = Router.Link;
var toastr = require('toastr');

var App = React.createClass({
    getInitialState: function () {
        return {
            products: [],
            soldProducts: [],
            selectedProduct: ""
        };
    },

    componentWillMount: function () {
        var _soldProducts = JSON.parse(localStorage.getItem("soldproducts"));
        if (_soldProducts && _soldProducts.length > 0) {
            this.setState({
                soldProducts: _soldProducts
            })
        }
    },

    componentDidMount: function () {
        var _products = ProductApi.getAllProducts();
        this.setState({ products: _products });
    },

    componentWillUnmount: function () {
        localStorage.setItem("soldproducts", JSON.stringify(this.state.soldProducts));
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
        toastr.success('Product added to shopping cart', 'Success');
    },

    _searchProducts: function (value) {
        var updatedList = this.state.products;
        updatedList = updatedList.filter(function (item) {
            return item.name.indexOf(value) !== -1;
        });
        this.setState({ products: updatedList });
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
        return (
            <div className="container">
                <div className="container" >
                    <Link to="shoppingcart"><span className="glyphicon glyphicon-shopping-cart">
                        {this.state.soldProducts.length}</span></Link>
                    <Search searchProducts={this._searchProducts} />
                    {
                        this.state.products.map((item, index) => {
                            return <Product
                                item={item}
                                index={index}
                                buyProduct={this._buyProduct}
                                removeProduct={this._removeProduct} />
                        })
                    }
                </div>
            </div>
        );
    }
}
);
module.exports = App;
