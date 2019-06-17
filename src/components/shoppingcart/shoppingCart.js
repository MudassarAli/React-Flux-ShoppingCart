'use strict';
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var toastr = require('toastr');
var swal = require('sweetalert');
var ProductsStore = require("../../stores/productsStore");
var ProductsAction = require('../../actions/productsActions');

var ShoppingCart = React.createClass({
    getInitialState: function () {
        return {
            _productsInShoppingCart: []
        };
    },

    componentWillMount: function () {
        ProductsStore.addChangeListener(this._onChange);
    },

    componentDidMount: function () {
        this.setState({ _productsInShoppingCart: ProductsStore.getProductsFromShoppingCart() });
    },

    componentWillUnmount: function () {
        ProductsStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({ _productsInShoppingCart: ProductsStore.getProductsFromShoppingCart() });
    },

    _removeProduct: function (product, itemIndex) {
        swal({
            title: "Are you sure?",
            text: "Sure you want to remove product?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    ProductsAction.removeProductFromShoppingCart(product, itemIndex);
                    swal("Product removed!", { icon: "success", });                   
                } else {
                    swal("Product not removed!");
                }
            });
    },

    render: function () {
        var TotalAmount = 0;
        var GrandTotal = 0;
        var astyle = {
            width: "72px",
            height: "72px"
        };

        var items = this.state._productsInShoppingCart.map((item, index) => {
            TotalAmount = +TotalAmount + +item.price;
            GrandTotal = (+GrandTotal + +TotalAmount)

            return (
                <tr>
                    <td className="col-sm-8 col-md-6">
                        <div className="media">
                            <a className="thumbnail pull-left" href="#"> <img className="media-object" src={item.imageurl} style={astyle} /></a>
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
            <div className="container">
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
                                        <Link to="productslist" className="btn btn-default">
                                            <span className="glyphicon glyphicon-shopping-cart"></span> Continue Shopping
                                        </Link>
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