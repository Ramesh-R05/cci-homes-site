import assign from 'lodash/object/assign';
import React, {Component} from 'react';

export default (SubComponent) => class TestableComponent extends Component {
    constructor(props) {
        super(props);
        this.__props = { props };
    }

    getProps() {
        return this.__props;
    }

    setProps(newProps) {
        assign(this.__props, newProps);
        this.forceUpdate();
    }

    replaceProps(newProps) {
        this.__props = newProps;
        this.forceUpdate();
    }

    render() {
        return <SubComponent {...this.__props}/>;
    }
};
