import React, {Component} from 'react';
import Article from './section';
import FeedItem from './feedItem';
import Footer from './footer';
import Source from './source';
import Ad from '@bxm/ad/lib/google/components/ad';

export default class Page extends Component {
    static displayName = 'ArticlePage';

    render() {
        return (
            <div>
                <Ad
                    label={{
                        "active": false
                    }}
                    sizes="teads"
                />
                <Article
                    {...this.props}
                    feedItemClass={FeedItem}
                    footerMetaClass={Source}
                    footerComponentClass={Footer}
                    />
            </div>
        );
    }
}
