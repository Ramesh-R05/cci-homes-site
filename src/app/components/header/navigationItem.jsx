import React, {PropTypes, Component} from 'react';

export default class NavigationItem extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        linkClassName: PropTypes.string.isRequired
    };

    constructor(...args) {
        super(...args);
    }

    render() {
        if (!this.props.name || !this.props.url) return null;

        return <a className={this.props.linkClassName} href={this.props.url}>{this.props.name}</a>;
    }
}
