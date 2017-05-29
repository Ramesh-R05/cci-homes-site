import React, { Component, PropTypes } from 'react';
import Article from './section';
import Source from './source';
import PolarFeedItem from '../polar/polarFeed';
import VerticalGallery from '@bxm/article/lib/gallery';

export default class Page extends Component {
    static displayName = 'ContentPage';

    static translationMap = {
        writer: { s: 'Writer', p: 'Writers' },
        photographer: { s: 'Photographer', p: 'Photographers' },
        stylist: { s: 'Stylist', p: 'Stylists' },
        renovation_expert: { s: 'Renovation expert', p: 'Renovation experts' }
    };

    getKingTag(tagObject) {
        return tagObject.find(tag => tag.name.includes('Homes navigation'));
    }

    static articleContentBodyConfig = {
        disableAds: true,
        inlineImage: {
            imageSizes: {
                s: { w: 690 },
                m: { w: 963 },
                l: { w: 922 },
                xl: { w: 640 }
            }
        },
        relatedContent: {
            imageSizes: {
                s: { w: 384, h: 216 },
                m: { w: 375, h: 211 },
                l: { w: 329, h: 185 },
                xl: { w: 296, h: 166 }
            }
        }
    };

    render() {
        const { content } = this.props;
        const targets = { brand: content.source };
        const kingtag = this.getKingTag(content.tagsDetails);
        const kingtagDisplayName = kingtag && kingtag.displayName;

        if (kingtagDisplayName) targets.kingtag = kingtag;

        const Ad = {
            type: 'Ad',
            config: {
                sizes: 'mrec',
                targets
            }
        };

        if (content.nodeType === "Gallery") {
            return (
                <div className={'content-wrapper'}>
                    <VerticalGallery
                      {...this.props}
                      enableTeads
                      articleHeaderOrder={['Hero', 'Source', 'Title', 'Summary', Ad]}
                      contentBodyConfig={Page.articleContentBodyConfig}
                      authorTranslationMap={Page.translationMap}
                      feedItemClass={PolarFeedItem}
                      showFeedOnRight
                      showAdBeforeRecommendations
                      adSpacing={6}
                      footerMetaClass={Source}
                      footerComponentClass={null}
                    />
                </div>
            );
        }

        return (
            <div>
                <Article
                  {...this.props}
                  enableTeads
                  articleHeaderOrder={['Hero', 'Source', 'Title', 'Summary', Ad]}
                  contentBodyConfig={Page.articleContentBodyConfig}
                  authorTranslationMap={Page.translationMap}
                  feedItemClass={PolarFeedItem}
                  showFeedOnRight
                  showAdBeforeRecommendations
                  adSpacing={6}
                  footerMetaClass={Source}
                  footerComponentClass={null}
                />
            </div>
        );
    }
}
