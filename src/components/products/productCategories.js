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

    render: function () {
        return (
            <div className="container">
                <ul>
                    {this.props.productCategories.map((categori, index) => {
                        return <li>{categori}</li>
                    })
                    }
                </ul>
            </div>
        );
    }
});

module.exports = ProductCategories;