'use strict';
var React = require('react');

var Product = React.createClass({

    _buyProduct: function () {
        var index = parseInt(this.props.index);
        this.props.buyProduct(index);
    },

    _selectedProduct: function (e) {
        e.preventDefault();
        this.props.selectedProduct(this.props.item, this.props.index);
    },

    render: function () {
        return (
            <div className="col">
                <img src={this.props.item.imageurl} alt="" />

                <h5 className="">{this.props.item.name}</h5>
                <p className=""><span> Description: </span> {this.props.item.description}</p>
                <p className=""><span> Price: </span> ${this.props.item.price}</p>
                <p className=""><span> Total: </span> {this.props.item.total}</p>

                <a href="#" className="btn btn-primary" onClick={this._selectedProduct} >ViewDetails</a>

                {this.props.item.total === 0 ?
                    <a href="#" className="btn btn-danger disabled">Sold out</a> :
                    <a href="#" className="btn btn-success" onClick={this._buyProduct}>Buy</a>
                }

            </div>
        );
    }

});

module.exports = Product;