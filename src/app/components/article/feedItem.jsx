import React from 'react';
import FeedItem from '@bxm/article/lib/components/feed/feedItem';
import TagLink from '@bxm/tags/lib/components/link';
import theme from '../helpers/theme';

class HomesFeedItems extends FeedItem {
    static getTagName(tagObject) {
        const tag = tagObject.find(t => t.name.includes('Topic'));
        return tag || {};
    }

    renderTaxonomy() {
        const { item } = this.props;
        let tagName = '';

        if (item && item.tagsDetails) {
            tagName = HomesFeedItems.getTagName(item.tagsDetails).displayName;
        }

        return (
            <span className="feed-item__body-source">
                <TagLink name={tagName} className="feed-item__body-source" />
            </span>
        );
    }
}

export default theme(HomesFeedItems, 'item.source');
