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

    render() {
        const {source, tags} = this.props;
        const cssClass = classNames(`article`, this.props.className, this.props.themeClass);
        const adKeywords = getKeywordsFromTags(tags);
        const adSizes = {
            small: 'banner',
            banner: 'banner',
            leaderboard: 'leaderboard',
            railBanner: 'banner',
            railLeaderboard: 'leaderboard',
            xlarge: ['billboard', 'leaderboard']
        };

        return (
            <article className={cssClass} itemScope itemType="http://schema.org/NewsArticle">
                <SchemaArticle
                    image={this.props.imageUrl}
                    publisher={source}
                    datePublished={this.props.dateCreated}
                />
                <Ad
                    className="ad--article-top"
                    displayFor={['medium', 'large', 'xlarge']}
                    sizes={adSizes}
                    targets={{
                        brand: source,
                        keyword: adKeywords,
                        position: 1
                    }}
                />
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
                <Ad
                    className="ad--article-beneath-recommendations"
                    displayFor={['small', 'medium', 'large', 'xlarge']}
                    sizes={adSizes}
                    targets={{
                        brand: source,
                        keyword: adKeywords,
                        position: 2
                    }}
                />
            </article>
        );
    }
}

export default theme(Article, 'source');
