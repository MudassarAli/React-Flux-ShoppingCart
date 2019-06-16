"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ProductsApi = require('../api/productsApi');
var ActionTypes = require('../constants/actionTypes');

var AuthorActions = {
    addProduct: function (product) {
        var newProduct = ProductsApi.saveProduct(product);

        //Hey dispatcher, go tell all the stores that an author was just created.
        Dispatcher.dispatch({
            actionType: ActionTypes.ADD_Product,
            product: newProduct
        });
    },

    removeProduct: function (id) {
        ProductsApi.removeProduct(id);

        Dispatcher.dispatch({
            actionType: ActionTypes.REMOVE_PRODUCT,
            id: id
        });
    }
};

module.exports = AuthorActions;