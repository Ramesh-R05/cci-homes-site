import React, {Component, PropTypes} from 'react';

export default class FooterSocialIcon extends Component {
    constructor(...args) {
        super(...args);
    }
    static propTypes = {
        svg: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    };

    fireEvent = () => {
        window.dataLayer.push({ event: `click:social:${this.props.name}` });
    };

    render() {
        if (!this.props.svg || !this.props.label || !this.props.url || !this.props.name) return null;

        return (
            <span className="social-link">
                <a href={this.props.url} target="_blank" onClick={this.fireEvent}>
                    <span className="social-link__icon"
                          dangerouslySetInnerHTML={{ __html: this.props.svg }}
                    />
                    <span className="social-link__label">
                        {this.props.label}
                    </span>
                </a>
            </span>
        );
    }
}
