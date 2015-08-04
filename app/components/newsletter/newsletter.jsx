import React, {Component, PropTypes} from 'react';

export default class FooterNewsletter extends Component {
    constructor(...args) {
        super(...args);
    }
    static propTypes = {
        url: PropTypes.string.isRequired
    }
    render() {
        if (!this.props.url) return null;
        return <div className="newsletter"><iframe src={this.props.url} scrolling="no" seamless="seamless"></iframe></div>;
    }
}
