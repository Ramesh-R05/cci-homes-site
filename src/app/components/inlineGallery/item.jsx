import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Item extends Component {
    static propTypes = {
        tagsDetails: PropTypes.arrayOf(PropTypes.object),
        imageAltText: PropTypes.string,
        imageUrl: PropTypes.string.isRequired,
        source: PropTypes.string,
        title: PropTypes.string,
        url: PropTypes.string.isRequired
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { tagsDetails, imageAltText, imageUrl, source, title, url } = this.props;

        if (!imageUrl || !url) return null;

        let topic;

        tagsDetails && tagsDetails.forEach((item) => {
            if (item.name.includes('Topic')) {
                topic = item.displayName;
            }
        });

        const sourceClass = source ? `gallery-item--${source.replace(/[^a-z]/gi, '_').toLowerCase()}` : '';
        const itemClass = classnames('gallery-item', sourceClass);
        const metaClass = classnames('gallery-item__meta', { hide: !title });
        const topicClass = classnames('gallery-item__topic', { hide: !topic });

        return (
            <div className={itemClass}>
                <a className="gallery-item__link" href={url} title={imageAltText}>
                    <img className="gallery-item__image" src={imageUrl} alt={imageAltText} />
                    <div className={metaClass}>
                        <span className={topicClass}>{topic}</span>
                        <span className="gallery-item__title">{title}</span>
                    </div>
                </a>
            </div>
        );
    }
}

export default Item;
