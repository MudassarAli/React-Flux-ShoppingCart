"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ProductsApi = require('../api/productsApi');
var ActionTypes = require('../constants/actionTypes');
var ProductsStore = require("../stores/productsStore");

var AuthorActions = {
    getProductsFromShoppingCart: function () {
        Dispatcher.dispatch({
            actionType: ActionTypes.Get_Products_From_ShoppingCart,
            products: ProductsStore.getProductsFromShoppingCart()
        });
    },

    addProductToShoppingCart: function (product, index, indexSelectedCategori) {
        var newProduct = ProductsApi.saveProduct(product);

        //Hey dispatcher, go tell all the stores that an author was just created.
        Dispatcher.dispatch({
            actionType: ActionTypes.ADD_PRODUCT_TO_SHOPPINGCART,
            addproduct: {
                product: newProduct,
                productindex: index,
                categoriIndex: indexSelectedCategori
            }
        });
    },
    updateSelectedCategoriIndex: function (index) {
        //ProductsApi.removeProduct(index);

        Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_SELECTED_CATEGORI_INDEX,
            updatedindex: index
        });
    },

    removeProductFromShoppingCart: function (product, index) {
        //ProductsApi.removeProduct(index);

        Dispatcher.dispatch({
            actionType: ActionTypes.REMOVE_PRODUCT_FROM_SHOPPINGCART,
            remove: {
                product: product,
                productindex: index
            }
        });
    }
};

module.exports = AuthorActions;