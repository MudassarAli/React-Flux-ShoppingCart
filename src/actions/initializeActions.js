"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var ProductsApi = require('../api/productsApi');

var InitializeActions = {
	initApp: function() {
		Dispatcher.dispatch({
			actionType: ActionTypes.INITIALIZE,
			initialData: {
				products: ProductsApi.getAllProducts()
			}
		});
	}
};

module.exports = InitializeActions;