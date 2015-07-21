import React, {Component, PropTypes} from 'react';
import collectionSplice from '@bxm/ui/lib/common/collectionSplice';
import {getKeywordsFromTags} from '@bxm/ad/lib/utils/tagsUtils';
import FeedItem from './feedItem';
import FeedAd from './feedAd';

const firstAdIndex = 2;
const adSpacing = 12;

export default class Feed extends Component {

    static propTypes = {
        items: PropTypes.array.isRequired,
        articleTags: PropTypes.arrayOf(React.PropTypes.string).isRequired,
        pageId: PropTypes.string.isRequired,
        source: PropTypes.string.isRequired
    };

    static contextTypes = {
        getStore: PropTypes.func,
        executeAction: PropTypes.func
    };

    constructor(props, context) {
        super(props, context);
    }

    getFeedItems() {
        const {items, pageId, articleTags, source} = this.props;
        const feedItems = items.map((item, i) =>
            <FeedItem
                key={`feed-item-${i}`}
                gtmClass={`feed-item-${i}`}
                item={item}
            />
        );

        const keyword = getKeywordsFromTags(articleTags);
        let adPosition = 0;
        collectionSplice.given(feedItems)
            .forEvery(adSpacing)
            .startingFrom(firstAdIndex)
            .insert(() => {
                adPosition++;
                return (
                    <FeedAd
                        key={`feed-ad-${adPosition}`}
                        position={adPosition}
                        keyword={keyword}
                        pageId={pageId}
                        source={source}
                    />
                );
            });

        return feedItems;
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
