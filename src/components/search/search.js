'use strict';
var React = require('react');

var Search = React.createClass({

    getInitialState: function () {
        return null;
    },

    _onChange: function (e) {
        e.preventDefault();
        this.props.searchProducts((e.target).value);
    },

    render: function () {
        return (
            <div>
                <form>
                    <input className="form-control" type="search" placeholder="Search" onChange={this._onChange} />
                </form>
            </div>
        );
    }
});

module.exports = Search;