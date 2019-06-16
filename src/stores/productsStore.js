"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _products = [];

var ShoppingCartStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	getAllProducts: function() {
		return _products;
	},

	getProductById: function(id) {
		return _.find(_products, {id: id});
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case ActionTypes.INITIALIZE:
			_products = action.initialData.products;
			ShoppingCartStore.emitChange();
			break;
		case ActionTypes.ADD_Product:
			_products.push(action.author);
			ShoppingCartStore.emitChange();
			break;		
		case ActionTypes.DELETE_AUTHOR:
			_.remove(_products, function(author) {
				return action.id === author.id;
			});
			ShoppingCartStore.emitChange();
			break;
		default:
			// no op
	}
});

module.exports = ShoppingCartStore;