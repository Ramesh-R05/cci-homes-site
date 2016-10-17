import React from 'react';
import FeedItem from '@bxm/article/lib/components/feed/feedItem';
import TagLink from '@bxm/tags/lib/components/link';
import getFirstTagNameForCategory from '@bxm/tags/lib/utils/getFirstTagNameForCategory';
import theme from '../helpers/theme';

class HomesFeedItems extends FeedItem {
    renderTaxonomy() {
        const tagName = getFirstTagNameForCategory(this.props.item.tags, 'Topic');
        return (
            <span className="feed-item__body-source">
                <TagLink name={tagName} className="feed-item__body-source" />
            </span>
        );
    }
}

export default theme(HomesFeedItems, 'item.source');
