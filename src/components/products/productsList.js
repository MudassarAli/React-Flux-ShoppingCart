'use strict';
var React = require('react');
var Search = require("../search/search");
var Product = require("./product");
var ProductApi = require("../../api/productsApi");
var Router = require('react-router');
var Link = Router.Link;
var toastr = require('toastr');
var ProductsStore = require("../../stores/productsStore");
var ProductsAction = require('../../actions/productsActions');

var App = React.createClass({
    getInitialState: function () {
        return {
            products: [],
            productsInShoppingCart: [],
            selectedProduct: ""
        };
    },

    componentWillMount: function () {
        ProductsStore.addChangeListener(this._onChange);
    },

    componentDidMount: function () {
        this.setState({ products: ProductsStore.getAllProducts() });
    },

    //Clean up when this component is unmounted
    componentWillUnmount: function () {
        ProductsStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({ products: ProductsStore.getAllProducts() });      
    },        

    _buyProduct: function (index) {
        var products = ProductsStore.getAllProducts();
        var product = products[index];
        ProductsAction.addProductToShoppingCart(product, index);       
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
