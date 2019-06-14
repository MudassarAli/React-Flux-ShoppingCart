'use strict';
var React = require('react');

var ShoppingCart = React.createClass({

    getInitialState: function () {
        return {
            productsInShoppingcart: []
        }
    },

    _hideShoppingCart: function (e) {
        e.preventDefault();
        this.props.hideShoppingCart();
        this._removeProduct = this._removeProduct.bind(this);
    },

    _removeProduct: function (item, index, e) {
        e.preventDefault();
        this.props.removeproduct(item, index);
    },

    render: function () {
        var TotalAmount = 0;
        var GrandTotal = 0;
        var astyle = {
            width: "72px",
            height: "72px"    
        };       

        var items = this.props.soldproducts.map((item, index) => {
            TotalAmount = +TotalAmount + +item.price;
            GrandTotal = (+GrandTotal + +TotalAmount)

            return (
                <tr>
                    <td className="col-sm-8 col-md-6">
                        <div className="media">
                            <a className="thumbnail pull-left" href="#"> <img className="media-object" src={item.imageurl} style={astyle}/></a>
                            <div className="media-body">
                                <h4 className="media-heading"><a href="#">{item.name}</a></h4>
                                <p>{item.description} </p>
                                <span>Status: </span><span className="text-success"><strong>In Stock</strong></span>
                            </div>
                        </div>
                    </td>
                    <td className="col-sm-1 col-md-1">
                        <input type="text" className="form-control" id="exampleInputEmail1" value="1" value="1" min="1" />
                    </td>
                    <td className="col-sm-1 col-md-1 text-center"><strong>{item.price}</strong></td>
                    <td className="col-sm-1 col-md-1 text-center"><strong>{item.price}</strong></td>
                    <td className="col-sm-1 col-md-1">
                        <button type="button" className="btn btn-danger" onClick={() => this._removeProduct(item, index, event)}>
                            <span className="glyphicon glyphicon-remove"></span>Remove
                        </button>
                    </td>
                </tr>
            );
        });

        return (
            <div class="container">
                <div>
                    <a href="#" className="btn btn-primary" onClick={this._hideShoppingCart}>GO BACK</a>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-10 col-md-offset-1">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th className="text-center">Price</th>
                                    <th className="text-center">Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {items}

                                <tr>
                                    <td>   </td>
                                    <td>   </td>
                                    <td>   </td>
                                    <td><h5>Subtotal</h5></td>
                                    <td className="text-right"><h5><strong>${GrandTotal}</strong></h5></td>
                                </tr>
                                <tr>
                                    <td>   </td>
                                    <td>   </td>
                                    <td>   </td>
                                    <td><h5>Estimated shipping</h5></td>
                                    <td className="text-right"><h5><strong>$6</strong></h5></td>
                                </tr>
                                <tr>
                                    <td>   </td>
                                    <td>   </td>
                                    <td>   </td>
                                    <td>
                                        <h3>Total</h3>
                                    </td>
                                    <td className="text-right"><h3><strong>${GrandTotal * 6}</strong></h3></td>
                                </tr>
                                <tr>
                                    <td>   </td>
                                    <td>   </td>
                                    <td>   </td>
                                    <td>
                                        <button type="button" className="btn btn-default">
                                            <span className="glyphicon glyphicon-shopping-cart"></span> Continue Shopping
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-success">
                                            Checkout <span className="glyphicon glyphicon-play"></span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = ShoppingCart;