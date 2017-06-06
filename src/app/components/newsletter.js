import React, { Component, PropTypes } from 'react';
import getBrand from './brand/utilities/getBrand';

export default class Newsletter extends Component {
    static propTypes = {
        content: PropTypes.object.isRequired
    };

    static contextTypes = {
        config: PropTypes.object.isRequired
    };

    render() {
        const { content } = this.props;
        const { config } = this.context;

        if (!content) return null;

        let newsletterUrl = 'http://www.homestolove.com.au/homes-newsletter/';
        let gtmClass = 'gtm-subs-homepage';
        if (content.nodeType !== 'Homepage') {
            const brand = getBrand(config, content.source);
            if (brand) {
                newsletterUrl = brand.newsletterUrl;
                gtmClass = 'gtm-subs-brand';
            }
        }

        return (
            <div className="newsletter-subscribe">
                <div className="newsletter-subscribe__title">Get the newsletter</div>
                <p className="newsletter-subscribe__text">The latest news delivered to your inbox</p>
                <div className="newsletter-subscribe__button">
                    <a href={`${newsletterUrl}`} className={`button button--link ${gtmClass}`} target="_blank">
                        Sign Up
                    </a>
                </div>
            </div>
        );
    }
}
