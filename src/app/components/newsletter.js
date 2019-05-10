import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import getBrand from './brand/utilities/getBrand';

export default class Newsletter extends Component {
    static propTypes = {
        content: PropTypes.object.isRequired,
        classModifier: PropTypes.string
    };

    static contextTypes = {
        config: PropTypes.object.isRequired
    };

    static defaultProps = {
        classModifier: null
    };

    render() {
        const { content, classModifier } = this.props;
        const { config } = this.context;

        if (!content) {
            return null;
        }

        const rootClass = classNames('newsletter-subscribe', {
            [`newsletter-subscribe--${classModifier}`]: classModifier
        });

        let newsletterUrl = 'https://www.homestolove.com.au/homes-newsletter/';
        let gtmClass = 'gtm-subs-homepage';

        if (content.nodeType !== 'Homepage') {
            const brand = getBrand(config, content.source);

            if (brand) {
                const { newsletterUrl: brandNewsletterUrl } = brand;

                newsletterUrl = brandNewsletterUrl;
                gtmClass = 'gtm-subs-brand';
            }
        }

        return (
            <div className={rootClass}>
                <div className="newsletter-subscribe__title">Get the newsletter</div>
                <p className="newsletter-subscribe__text">The latest news delivered to your inbox</p>
                <div className="newsletter-subscribe__button">
                    <a href={`${newsletterUrl}`} className={`button button--link button--without-border-radius ${gtmClass}`} target="_blank">
                        Sign Up
                    </a>
                </div>
            </div>
        );
    }
}
