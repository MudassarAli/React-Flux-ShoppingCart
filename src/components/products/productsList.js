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
            selectedCategoriIndex: -1,
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
        this.setState({ selectedCategori: 0 });
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

    _selectedCategory: function (index) {      
        this.setState({ selectedCategori: index });
        this.setState({ products: _(ProductsStore.getAllProducts()).pluck('items').__wrapped__[index] });
    },

    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <Search searchProducts={this._searchProducts} />
                        <br></br>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-2">
                        <ProductCategories productCategories={this.state.categories}
                            selectedCategori={this._selectedCategory} />
                        <br></br>
                    </div>
                    <div className="col-lg-10">
                        {
                            this.state.products.map((item, index) => {
                                return <Product
                                    item={item}
                                    index={index}
                                    buyProduct={this._buyProduct} />
                            })
                        }
                    </div>

                </div>
            </div>
        );
    }
}
);
module.exports = App;
