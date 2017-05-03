import React, { Component, PropTypes } from 'react';
import InlineSVG from 'react-inlinesvg';
import { canUseDOM } from 'exenv';

export default class SocialIcons extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        url: PropTypes.string,
        title: PropTypes.string,
        gtmClass: PropTypes.string
    };

    fireEvent = () => {
        if (canUseDOM) window.dataLayer.push({ event: `click:social:${this.props.name}` });
    };

    render() {
        if (!this.props.name || !this.props.url) return null;

        const { name, url, gtmClass } = this.props;
        const src = `/assets/icons/social/${name}.svg`;
        const image = <img src={src} />;
        const inlineSvg = <InlineSVG src={src}>{ image }</InlineSVG>;

        return (
            <span className={`social-link social-link--${name}`}>
                <a
                  href={url} className={gtmClass}
                  target="_blank" onClick={this.fireEvent}
                >
                    <span className="social-link__icon">
                        { canUseDOM ? inlineSvg : image }
                    </span>
                </a>
            </span>
        );
    }
}
