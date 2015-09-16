import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import collectionSplice from '@bxm/ui/lib/common/collectionSplice';
import {getKeywordsFromTags} from '@bxm/ad/lib/utils/tagsUtils';
import pin from '../helpers/pin';
import FeedItem from './feedItem';
import PolarFeedItem from '../polar/polarFeedItem';
import FeedAd from './feedAd';

const firstAdIndex = 2;
const adSpacing = 12;
const polarAdIndex = 4;

class Feed extends Component {

    static propTypes = {
        items: PropTypes.array.isRequired,
        tags: PropTypes.arrayOf(React.PropTypes.string).isRequired,
        pageId: PropTypes.string.isRequired,
        source: PropTypes.string.isRequired,
        pinned: PropTypes.bool,
        isSideMenuOpen: PropTypes.bool
    };

    static defaultProps = {
        pinned: false,
        items: [],
        isSideMenuOpen: false
    };

    static contextTypes = {
        getStore: PropTypes.func,
        executeAction: PropTypes.func
    };

    constructor(props, context) {
        super(props, context);
    }

    getFeedItems() {
        const {items, pageId, tags, source} = this.props;

        let feedItems = items.map((item, i) =>
            <FeedItem
                key={`feed-item-${i}`}
                gtmClass={`feed-item-${i}`}
                item={item}
            />
        );

        // Make sure the array has some elements before replacing with polar ad
        if (feedItems.length > polarAdIndex) {
            // Get the 6th item and replace with Polar Ad
            const polarItem = items[polarAdIndex];

            feedItems.splice(polarAdIndex, 1,
                <PolarFeedItem
                    key="polar-feed-item"
                    gtmClass="polar-feed-item"
                    ad={{label: 'article_feed_item_1'}}
                    item={polarItem}
                />
            );
        }

        const keyword = getKeywordsFromTags(tags);
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
        const className = classnames({
            'feed': true,
            'feed--pinned': this.props.pinned,
            'feed--side-menu-open': this.props.isSideMenuOpen
        });

        return (
            <aside className={className}>
                <div className="feed__container">
                    <ul className="feed__items">
                        {this.getFeedItems()}
                    </ul>
                </div>
            </aside>
        );
    }

}

export default pin(Feed, {
    small: { pinPoint: 51 },
    medium: { pinPoint: 51 },
    large: { pinPoint: 51 },
    xlarge: { pinPoint: 51 }
});
