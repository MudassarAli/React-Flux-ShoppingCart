'use strict';
var React = require('react');
var ProductApi = require("../../api/productsApi");
var Router = require('react-router');
var ProductsStore = require("../../stores/productsStore");
var Link = Router.Link;
var toastr = require('toastr');
var _ = require('lodash');

var ProductCategories = React.createClass({
    getInitialState: function () {
        return null;
    },
    handleClick: function (index, event) {
        this.props.selectedCategori(index);
    },

    render: function () {
        return (
            <div className="list-group">
                {this.props.productCategories.map((categori, index) => {
                    return <a onClick={() => this.handleClick(index)} className="list-group-item list-group-item-action"> {categori}</a>
                })
                }
            </div>
        );
    }
});

module.exports = ProductCategories;