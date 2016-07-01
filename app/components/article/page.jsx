import React, {Component} from 'react';
import Article from './section';
import FeedItem from './feedItem';
import Footer from './footer';
import Source from './source';
import { getFirstTagNameForCategory } from '@bxm/tags/lib/utils';

export default class Page extends Component {
    static displayName = 'ArticlePage';

    static translationMap = {
        writer: { s: 'Writer', p: 'Writers' },
        photographer: { s: 'Photographer', p: 'Photographers' },
        stylist: { s: 'Stylist', p: 'Stylists' },
        renovation_expert: { s: 'Renovation expert', p: 'Renovation experts' }
    };

    render() {
        const { content } = this.props;
        const targets = { brand: content.source };
        const kingtag = getFirstTagNameForCategory(content.tags, 'Homes navigation');

        if (kingtag) targets.kingtag = kingtag;

        const Ad = {
            type: 'Ad',
            config: {
                targets
            }
        };

        return (
            <div>
                <Article
                    {...this.props}
                    enableTeads={true}
                    articleHeaderOrder={['Title', 'NativeAd', 'Hero', Ad, 'Social', 'Summary']}
                    authorTranslationMap={Page.translationMap}
                    feedItemClass={FeedItem}
                    footerMetaClass={Source}
                    footerComponentClass={Footer}
                    />
            </div>
        );
    }
}
