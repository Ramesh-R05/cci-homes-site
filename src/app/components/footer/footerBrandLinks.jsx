import React, { Component, PropTypes } from 'react';
import InlineSVG from 'react-inlinesvg';
import { canUseDOM } from 'exenv';

export default class FooterBrandLinks extends Component {

    static propTypes = {
        footerBrands: PropTypes.array.isRequired,
        className: PropTypes.string
    };

    render() {
        if (!this.props.footerBrands || this.props.footerBrands.length <= 0) return null;

        const { footerBrands, className: footerOuterClass } = this.props;
        // TODO - remove slice when new brands go live
        const footerLogos = footerBrands.slice(0, 6).map(
            (item, i) => {
                const { id, title, url, imageUrl } = item;
                const image = <img src={imageUrl} alt={title} className={`footer__logos-${id}`} />;
                const inlineSvg = <InlineSVG src={imageUrl}>{ image }</InlineSVG>;
                return (
                    <li className="footer__logos-list-item" key={i}>
                        <a href={url} title={title} className="gtm-footer-brand">
                            <span className={`${footerOuterClass}-icon-${id}`}>
                                { canUseDOM ? inlineSvg : image }
                            </span>
                        </a>
                    </li>
                );
            }
        );

        return (
            <ul className={footerOuterClass}>
                { footerLogos }
            </ul>
        );
    }
}
