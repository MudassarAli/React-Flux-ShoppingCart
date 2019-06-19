"use strict";

//This file is mocking a web API by hitting hard coded data.
var products = require("./productsData").products;
var _ = require('lodash');

//This would be performed on the server in a real app. Just stubbing in.
var _generateId = function (product) {
    return product.firstName.toLowerCase() + '-' + product.lastName.toLowerCase();
};

var _clone = function (item) {
    return JSON.parse(JSON.stringify(item)); //return cloned copy so that the item is passed by value instead of by reference
};

var ProductApi = {
    getProductCategories: function () {
        return _clone(products.category);
    },

    getAllProducts: function () {      
        return _clone(products);
    },

    getProductById: function (id) {
        var product = _.find(products, { id: id });
        return _clone(product);
    },

    saveProduct: function (product) {
        //pretend an ajax call to web api is made here
        console.log("Pretend this just saved the author to the DB via AJAX call...");

        if (product.id) {
            var existingAuthorIndex = _.indexOf(products, _.find(products, { id: product.id }));
            products.splice(existingAuthorIndex, 1, product);
        } else {
            //Just simulating creation here.
            //The server would generate ids for new authors in a real app.
            //Cloning so copy returned is passed by value rather than by reference.
            product.id = _generateId(product);
            products.push(product);
        }

        return _clone(product);
    },

    removeProduct: function (id) {
        console.log("Pretend this just deleted the author from the DB via an AJAX call...");
        _.remove(products, { id: id });
    }
};

module.exports = ProductApi;