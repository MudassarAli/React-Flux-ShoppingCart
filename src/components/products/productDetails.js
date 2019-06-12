'use strict';
var React = require('react');

var ProductDetails = React.createClass({  

    _buyProduct: function () {
        var index = parseInt(this.props.index);
        this.props.buyProduct(index);
    },

    _hideShoppingCart: function (e) {
        e.preventDefault();
        this.props.hideShoppingCart();
    },

    render: function () {
        return (
            <div className="container">
                <div>
                    <a href="#" className="btn btn-primary" onClick={this._hideShoppingCart}>GO BACK</a>
                </div>
                <img src={this.props.selectedProduct.imageurl} alt="Card image cap" />
                <div className="">
                    <h5 className="">{this.props.selectedProduct.name}</h5>
                    <p className=""><span> Description</span> {this.props.selectedProduct.description}</p>
                    <p className=""><span> Price</span> ${this.props.selectedProduct.price}</p>
                    <p className=""><span> Total</span> {this.props.selectedProduct.total}</p>

                    {this.props.selectedProduct.total === 0 ?
                        <a href="#" className="btn btn-danger disabled">Sold out</a> :
                        <a href="#" className="btn btn-success" onClick={this._buyProduct}>Buy</a>
                    }
                </div>
            </div>
        );
    }

});

module.exports = ProductDetails;