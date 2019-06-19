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
var _ = require('lodash');
var ProductCategories = require("./productCategories");

var App = React.createClass({
    getInitialState: function () {
        return {
            products: [],
            categories: [],
            productsInShoppingCart: [],
            selectedProduct: ""
        };
    },

    componentWillMount: function () {
        ProductsStore.addChangeListener(this._onChange);
    },

    componentDidMount: function () {
        var items = ProductsStore.getAllProducts();
        var _categories = _(items).pluck('category').__wrapped__;       
        this.setState({ categories: _categories });
     
        this.setState({ products: _(ProductsStore.getAllProducts()).pluck('items').__wrapped__[0] });
    },

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

    render: function () {
        return (
            <div className="container">

                <Search searchProducts={this._searchProducts} />
                <br></br>
                <ProductCategories productCategories= {this.state.categories} />
                <br></br>

                {
                    this.state.products.map((item, index) => {
                        return <Product
                            item={item}
                            index={index}
                            buyProduct={this._buyProduct} />
                    })
                }

            </div>
        );
    }
}
);
module.exports = App;
