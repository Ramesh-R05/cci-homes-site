var _ = require('lodash');

var SafadaMock = function(context, name) {
    this.name = name;
    this.props = {};
    this.context = context;
    this.reactComponent = null;
};

_.extend(SafadaMock.prototype, {
    createComponent: function() {
        var _this = this;
        return this.context.React.createClass({
            render: function() {
                _this.props = this.props;
                return _this.context.React.DOM.div();
            }
        });
    },
    getReactComponent: function() {
        if(!this.reactComponent){
            this.reactComponent = this.createComponent();
        }
        return this.reactComponent;
    }
});

module.exports = SafadaMock;