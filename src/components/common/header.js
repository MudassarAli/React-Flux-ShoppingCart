"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({
 
  render: function () {
    var styles= {
      height:"30px",
      width:"70px"
    }
    return (
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <Link to="app" className="navbar-brand">
              <img style={styles} src="images/Contoso_logo.png" />
            </Link>
            <ul className="nav navbar-nav">
              <li><Link to="app">Home</Link></li>
              <li><Link to="productslist">products</Link></li>
              <li><Link to="about">About</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
});

module.exports = Header;
