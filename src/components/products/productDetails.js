'use strict';
var React = require('react');
var ProductApi = require("../../api/productsApi");
var Router = require('react-router');
var Link = Router.Link;
var toastr = require('toastr');

var ProductDetails = React.createClass({
    getInitialState: function () {
        return {
            selectedProduct: ""
        };
    },

    componentWillMount: function () {
        var productId = this.props.params.id;
        var product = ProductApi.getProductById(productId);
        this.setState({
            selectedProduct: product
        });
    },

    _buyProduct: function () {
        var index = parseInt(this.props.index);
        toastr.success('Product added to shopping cart', 'Success');
        //this.props.buyProduct(index);
    },

    render: function () {
        return (
            <div className="container">
                <Link to="productslist" className="btn btn-default">
                    Back
                </Link>
                <div>
                    <img src={this.state.selectedProduct.imageurl} alt="Card image cap" />
                    <div className="">
                        <h5 className="">{this.state.selectedProduct.name}</h5>
                        <p className=""><span> Description</span> {this.state.selectedProduct.description}</p>
                        <p className=""><span> Price</span> ${this.state.selectedProduct.price}</p>
                        <p className=""><span> Total</span> {this.state.selectedProduct.total}</p>

                        {this.state.selectedProduct.total === 0 ?
                            <a className="btn btn-danger disabled">Sold out</a> :
                            <a className="btn btn-success" onClick={this._buyProduct}>Buy</a>
                        }
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = ProductDetails;