import React, {Component} from 'react';
import Article from './section';
import FeedItem from './feedItem';
import Footer from './footer';
import Source from './source';

export default class Page extends Component {
    static displayName = 'ArticlePage';

    render() {
        return (
            <Article
                {...this.props}
                feedItemClass={FeedItem}
                footerMetaClass={Source}
                footerComponentClass={Footer}
                />
        );
    }
}
