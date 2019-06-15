'use strict';
var React = require('react');
var ProductApi = require("../../api/productsApi");

var HomePage = React.createClass({

    getInitialState: function () {
        return {
            item: "",
        };
    },

    componentWillMount: function () {
        var _products = ProductApi.getAllProducts();
        var rand = _products[Math.floor(Math.random() * _products.length)];

        this.setState({
            item: rand
        });

    },

    render: function () {
        return (
            <div className="container">
                <div className="col-lg-12 text-center">
                    <img width="300px" src={this.state.item.imageurl} alt="" />

                    <h5 className="">{this.state.item.name}</h5>
                    <p className=""><span> Description: </span> {this.state.item.description}</p>
                    <p className=""><span> Price: </span> ${this.state.item.price}</p>
                </div>                
            </div>
        );
    }

});

module.exports = HomePage;