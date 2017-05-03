import React, { Component, PropTypes } from 'react';

export default class Sponsor extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        caption: PropTypes.string
    };

    static defaultProps = {
        name: '',
        caption: ''
    };

    render() {
        const name = this.props.name;

        if (name === '') return null;

        return (
            <p className="teaser__tags">{this.props.caption} {name}</p>
        );
    }
}

