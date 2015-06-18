import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import ArticleStore from '../../stores/article';
import FeedItem from './feedItem';
import FeedAd from './feedAd';

const firstAdIndex = 2;
const adSpacing = 11;

class Feed extends Component {

    constructor(props, context) {
        super(props, context);
    }

    getFeedItems() {
        const items = [];

        this.props.items.forEach((item, i) => {
            items.push(
                <FeedItem
                    key={`feed-item-${i}`}
                    gtmClass={`feed-item-${i}`}
                    item={item}/>
            );
            if ((i - firstAdIndex + 1) % adSpacing === 0) {
                items.push(<FeedAd key={`feed-ad-${i}`}/>);
            }
        });

        return items;
    }

    render() {
        return (
            <aside className="feed">
                <div className="feed__container">
                    <ul className="feed__items">
                        {this.getFeedItems()}
                    </ul>
                </div>
            </aside>
        );
    }

}

Feed.propTypes = {
    items: PropTypes.array.isRequired
};

Feed.contextTypes = {
    getStore: PropTypes.func,
    executeAction: PropTypes.func
};

Feed = connectToStores(Feed, [ArticleStore], (stores) => {
    return {
        items: stores.ArticleStore.getItems()
    };
});

export default Feed;
