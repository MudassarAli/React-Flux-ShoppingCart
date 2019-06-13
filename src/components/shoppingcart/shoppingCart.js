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
        var items = this.props.soldproducts.map((item, index) => {
            TotalAmount = TotalAmount + item.price;
            GrandTotal = (GrandTotal + TotalAmount) * 0.035

            return (
                <tr>
                    <td className="col-sm-8 col-md-6">
                        <div className="media">
                            <div className="col-sm-2 hidden-xs"><img src={item.imageurl} alt="..." className="img-responsive" /></div>
                            <div className="col-sm-10">
                                <h4 className="nomargin">{item.name}</h4>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    </td>
                    <td data-th="Price">{item.price}</td>
                    <td data-th="Quantity">
                        <input type="number" className="form-control text-center" value="1" />
                    </td>
                    <td data-th="Subtotal" class="text-center">1.99</td>
                    <td className="actions" data-th="">
                        <button className="btn btn-info btn-sm"><i className="fa fa-refresh"></i></button>
                        <button className="btn btn-danger btn-sm" onClick={() => this._removeProduct(item, index, event)}><i class="fa fa-trash-o"></i></button>
                    </td>
                </tr>
            );
        });

        return (
            <div class="container">
                <div>
                    <a href="#" className="btn btn-primary" onClick={this._hideShoppingCart}>GO BACK</a>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-md-10 col-md-offset-1">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th class="text-center">Price</th>
                                    <th class="text-center">Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {items}
                            </tbody>
                            <tfoot>
                                <tr className="visible-xs">
                                    <td className="text-center"><strong>Total 1.99</strong></td>
                                </tr>
                                <tr>
                                    <td><a href="#" className="btn btn-warning"><i class="fa fa-angle-left"></i> Continue Shopping</a></td>
                                    <td colspan="2" className="hidden-xs"></td>
                                    <td className="hidden-xs text-center"><strong>Total $1.99</strong></td>
                                    <td><a href="#" className="btn btn-success btn-block">Checkout <i class="fa fa-angle-right"></i></a></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

});

module.exports = ShoppingCart;