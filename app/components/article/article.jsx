import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import ContentBody from '@bxm/ui/lib/markdown/components/contentBody';
import Ad from '@bxm/ad/lib/google/components/ad';
import NativeAd from '@bxm/ad/lib/google/components/nativeAd';
import {getKeywordsFromTags} from '@bxm/ad/lib/utils/tagsUtils';
import Footer from './footer';
import Header from './header';
import Recommendations from '@bxm/recommendations/lib/components/recommendations';
import theme from '../helpers/theme';
import breakpoints from '../../breakpoints';
import SchemaArticle from '@bxm/article/lib/components/schema/article';
import RelatedContentComponent from './relatedContent';
import {getFirstTagNameForCategory} from '@bxm/tags/lib/utils';
import isEmpty from 'lodash/lang/isEmpty';
import isUndefined from 'lodash/lang/isUndefined';

class Article extends Component {

    static propTypes = {
        authorProfiles: PropTypes.array,
        className: PropTypes.string,
        contentBody: PropTypes.array.isRequired,
        dateCreated: PropTypes.string.isRequired,
        heroItem: PropTypes.object.isRequired,
        imageUrl: PropTypes.string.isRequired,
        nodeType: PropTypes.string.isRequired,
        pageId: PropTypes.string.isRequired,
        source: PropTypes.string,
        summary: PropTypes.string,
        tags: PropTypes.array.isRequired,
        themeClass: PropTypes.string,
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    };

    static contextTypes = {
        config: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
    }

    renderAds(position, adClassName) {
        const {tags} = this.props;
        const adKeywords = getKeywordsFromTags(tags);
        const adSizes = {
            small: 'banner',
            banner: 'banner',
            leaderboard: 'leaderboard',
            railBanner: 'banner',
            railLeaderboard: 'leaderboard',
            xlarge: ['billboard', 'leaderboard']
        };
        let screenSizes = ['medium', 'large', 'xlarge'];

        // Add "small" screen for bottom ad
        if (position === 2) screenSizes.unshift('small');

        let targets = {
            brand: this.props.source,
            keyword: adKeywords,
            position
        };

        const kingtag = getFirstTagNameForCategory(tags, 'Homes navigation');

        // Add "kingtag" prop if defined
        if (!isUndefined(kingtag) && !isEmpty(kingtag)) targets.kingtag = kingtag;

        return (
            <Ad
                className={adClassName}
                displayFor={screenSizes}
                sizes={adSizes}
                targets={targets}
                />
        );
    }

    render() {
        const {source, tags} = this.props;
        const cssClass = classNames(`article`, this.props.className, this.props.themeClass);

        return (
            <article className={cssClass} itemScope itemType="http://schema.org/NewsArticle">
                <SchemaArticle
                    image={this.props.imageUrl}
                    publisher={source}
                    datePublished={this.props.dateCreated}
                />

                {this.renderAds(1, 'ad--article-top')}

                <NativeAd
                    className="ad--article-native"
                    displayFor={['medium', 'large', 'xlarge']}
                />
                <Header
                    pageId={this.props.pageId}
                    url={this.props.url}
                    heroItem={this.props.heroItem}
                    summary={this.props.summary}
                    title={this.props.title}
                    source={source}
                />
                <ContentBody
                    body={this.props.contentBody}
                    breakpoints={breakpoints}
                    className="article__body article__body--top-border"
                    config={this.context.config}
                    relatedContentComponent={RelatedContentComponent}
                />
                <Footer
                    authorProfiles={this.props.authorProfiles}
                    source={source}
                    tags={tags}
                />
                <Recommendations
                    nodeType={this.props.nodeType}
                    nodeId={this.props.pageId}
                />

                {this.renderAds(2, 'ad--article-beneath-recommendations')}
            </article>
        );
    }
}

export default theme(Article, 'source');
