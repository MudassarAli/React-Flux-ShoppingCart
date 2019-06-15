'use strict';
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

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
            <div className="col-md-4">
                <img width="150px" src={this.props.item.imageurl} alt="" />

                <h5 className="">{this.props.item.name}</h5>
                <p className=""><span> Description: </span> {this.props.item.description}</p>
                <p className=""><span> Price: </span> ${this.props.item.price}</p>
                <p className=""><span> Total: </span> {this.props.item.total}</p>

                <Link to={`/product/${this.props.item.id}`} className="btn btn-primary">
                         <span>View details</span>
                </Link>               

                {this.props.item.total === 0 ?
                    <Link to="app" className="btn btn-danger disabled">
                         <span>Sold Out</span>
                    </Link>
                    :
                    <a className="btn btn-success" onClick={this._buyProduct}>Buy</a>
                }
                <br></br><br></br>
            </div>
            
        );
    }

});

module.exports = Product;