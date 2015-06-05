import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import ArticleStore from '../../stores/article';
import FeedItem from './feedItem';

class Feed extends Component {

    constructor(props, context) {
        super(props, context);
    }

    getFeedItems() {
        return this.props.items.map((item, i) => {
            return (
                <FeedItem
                    key={`feed-item-${i}`}
                    gtmClass={`feed-item-${i}`}
                    item={item}/>
            );
        });
    }

    render() {
        return (
            <aside className="feed">
                <ul className="feed__container">
                    {this.getFeedItems()}
                </ul>
            </aside>
        );
    }

}

Feed = connectToStores(Feed, [ArticleStore], (stores) => {
    return {
        items: stores.ArticleStore.getItems()
    };
});

Feed.propTypes = {
    items: PropTypes.array.isRequired
};

Feed.contextTypes = {
    getStore: PropTypes.func,
    executeAction: PropTypes.func
};

export default Feed;
