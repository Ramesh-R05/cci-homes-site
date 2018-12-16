import React, { Component, PropTypes } from 'react';
import InlineSVG from 'react-inlinesvg';
import { canUseDOM } from 'exenv';

export default class SocialIcons extends Component {
    static displayName = 'SocialIcons';

    static propTypes = {
        name: PropTypes.string.isRequired,
        url: PropTypes.string,
        gtmClass: PropTypes.string
    };

    static defaultProps = {
        url: null,
        gtmClass: null
    };

    fireEvent = () => {
        const { name } = this.props;

        if (canUseDOM) {
            window.dataLayer.push({ event: `click:social:${name}` });
        }
    };

    render() {
        const { name, url, gtmClass } = this.props;

        if (!name || !url) {
            return null;
        }

        const src = `/assets/icons/social/${name}.svg`;
        const image = <img src={src} alt="" />;
        const inlineSvg = <InlineSVG src={src}>{image}</InlineSVG>;

        return (
            <span className={`social-link social-link--${name}`}>
                <a href={url} className={gtmClass} target="_blank" onClick={this.fireEvent}>
                    <span className="social-link__icon">{canUseDOM ? inlineSvg : image}</span>
                </a>
            </span>
        );
    }
}
