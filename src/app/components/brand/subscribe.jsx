import React, {Component, PropTypes} from 'react';
import Teaser from '../teaser/teaser';
import classNames from 'classnames';

export default class Subscribe extends Component {
    static propTypes = {
        className: PropTypes.string,
        image: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
    };

    static contextTypes = {
        config: PropTypes.object
    };

    constructor(...args) {
        super(...args);
    };

    render() {
        let {className, image, link} = this.props;

        if (!link) {
            link = this.context.config.get('localeData.magShop.magshopUrl') || '';
        }

        const cssClass = classNames('brand-subscribe', className);
        const summary = 'Subscribe to get your hands on more inspiring homes and gardens, plus renovating,' +
            ' decorating, food and travel stories.';

        return (
            <div className={cssClass}>
                <Teaser
                    id="brand-subscribe"
                    modifier="img-top"
                    title="Subscribe now"
                    url={link}
                    summary={summary}
                    imageUrl={image} />
            </div>
        );
    };
}
