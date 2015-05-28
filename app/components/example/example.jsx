import React, {Component, PropTypes} from 'react';

export default class Example extends Component {
    render() {
        return <h1 className="type-article-title">{this.props.title}</h1>;
    }
}

Example.propTypes = {
    title: PropTypes.string
};
