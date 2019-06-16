'use strict';
var React = require('react');
var ProductsStore = require('../../stores/productsStore');

var HomePage = React.createClass({

    getInitialState: function () {
        return {
            item: "",
        };
    },

    componentWillMount: function () {
        var _products = ProductsStore.getAllProducts();//ProductApi.getAllProducts();
        var randomProduct = _products[Math.floor(Math.random() * _products.length)];

        this.setState({
            item: randomProduct
        });
    },

    render: function () {
        return (
            <div className="container">
                <div className="jumbotron text-center">
                    <h1>Product of the day</h1>                   
                </div>
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