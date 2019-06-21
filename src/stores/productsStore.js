"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _products = [];
var _productsInShoppingCart = [];
var _selectedCategoriIndex = 0;

var ProductsStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function (callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function (callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function () {
		this.emit(CHANGE_EVENT);
	},

	getAllProducts: function () {
		return _products;
	},
	getSelectedCategoriIndex: function () {
		return _selectedCategoriIndex;
	},

	getProductById: function (id) {
		return _.find(_products, { id: id });
	},

	getProductsFromShoppingCart: function () {
		return _productsInShoppingCart;
	}
});

Dispatcher.register(function (action) {
	switch (action.actionType) {
		case ActionTypes.INITIALIZE:
			_products = action.initialData.products;
			ProductsStore.emitChange();
			break;
		case ActionTypes.UPDATE_SELECTED_CATEGORI_INDEX:
			_selectedCategoriIndex = action.updatedindex;
			ProductsStore.emitChange();
			break;
		case ActionTypes.GET_PRODUCTS_FROM_SHOPPINGCART:
			_productsInShoppingCart.push(action.products);
			ProductsStore.emitChange();
			break;
		case ActionTypes.ADD_PRODUCT_TO_SHOPPINGCART:
			var product = action.addproduct.product;
			var index = action.addproduct.productindex;
			_productsInShoppingCart.push(product);
			var items = _(_products).pluck('items').__wrapped__[_selectedCategoriIndex];
			product.total = product.total - 1;
			items.splice(index, 1, product);
			ProductsStore.emitChange();
			break;
		case ActionTypes.REMOVE_PRODUCT_FROM_SHOPPINGCART:
			var prodcstindex = action.remove.productindex;
			var producttoremove = action.remove.product;
			_productsInShoppingCart.splice(prodcstindex, 1);
			var prodObject = _(_products).pluck('items').__wrapped__[_selectedCategoriIndex].find(function (obj) { return obj.name === producttoremove.name; });
			prodObject.total = prodObject.total + 1;
			ProductsStore.emitChange();
			break;
		default:
		// no op
	}
});

module.exports = ProductsStore;