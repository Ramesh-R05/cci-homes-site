import React, {Component, PropTypes} from 'react';
import FeedItem from '../feed/feedItem';

class RelatedContent extends Component{
    static propTypes = {
        items: PropTypes.array.isRequired
    };

    constructor(props, context) {
        super(props, context);
    };

    render() {
        const items = this.props.items;
        if (!items || !items.length) return null;
        const relatedItems = items.map((item, i) => {
            const id = `related-content-${i}`;

            return (
                <FeedItem
                    key={id}
                    gtmClass="gtm-related-link"
                    item={item}
                    />
            );
        });

        return (
            <section className="content-body__related-content related-content">
                <h2 className="related-content__heading">
                    Related Articles
                </h2>
                <div className="related-content-wrapper">
                    <ul className="related-content-items">
                        {relatedItems}
                    </ul>
                </div>
            </section>
        );
    }
}

export default RelatedContent;
