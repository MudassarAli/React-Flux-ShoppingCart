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
    getAllProducts: function () {
        return _clone(products);
    },

    getProductById: function (id) {
        var author = _.find(products, { id: id });
        return _clone(author);
    },

    saveProduct: function (author) {
        //pretend an ajax call to web api is made here
        console.log("Pretend this just saved the author to the DB via AJAX call...");

        if (author.id) {
            var existingAuthorIndex = _.indexOf(products, _.find(products, { id: author.id }));
            products.splice(existingAuthorIndex, 1, author);
        } else {
            //Just simulating creation here.
            //The server would generate ids for new authors in a real app.
            //Cloning so copy returned is passed by value rather than by reference.
            author.id = _generateId(author);
            products.push(author);
        }

        return _clone(author);
    },

    deleteAuthor: function (id) {
        console.log("Pretend this just deleted the author from the DB via an AJAX call...");
        _.remove(products, { id: id });
    }
};

module.exports = ProductApi;