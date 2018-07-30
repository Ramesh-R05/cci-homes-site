import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Teaser from '../teaser/teaser';

export default class Subscribe extends Component {
    static displayName = 'Subscribe';

    static propTypes = {
        className: PropTypes.string,
        image: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
    };

    static defaultProps = {
        className: ''
    };

    static contextTypes = {
        config: PropTypes.object
    };

    render() {
        const { config } = this.context;
        const { className, image } = this.props;
        let { link } = this.props;

        if (!link) {
            link = config.get('localeData.magShop.magshopUrl') || '';
        }

        const cssClass = classNames('brand-subscribe', className);
        const summary = 'Subscribe to get your hands on more inspiring homes and gardens, plus renovating,'
            + ' decorating, food and travel stories.';

        return (
            <div className={cssClass}>
                <Teaser
                  id="brand-subscribe"
                  modifier="img-top"
                  title="Subscribe now"
                  url={link}
                  summary={summary}
                  imageUrl={image}
                />
            </div>
        );
    }
}
