import React, {Component, PropTypes} from 'react';

export default class Sponsor extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired
    };

    static defaultProps = {
        name: ''
    };

    render() {
        const name = this.props.name;

        if (name === '') return null;

        return (
            <p className="teaser__tags">Powered by {name}</p>
        );
    }
}

