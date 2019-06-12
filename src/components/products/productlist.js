'use strict';
var React = require('react');
var Product = require("./product");

var ProductsList = React.createClass({
  render: function () {
    var items = this.props.items.map((item, index) => {
      return (
        <Product key={index} item={item} index={index} buyProduct={this.props.buyProduct} selectedProduct={this.props.selectedProduct} />
      );
    });

    return (
      <div className="container">
        <div className="row">
          {items}
        </div>
      </div>
    );
  }

});

module.exports = ProductsList;