import React, {Component, PropTypes} from 'react';
import {canUseDOM} from 'react/lib/ExecutionEnvironment';
import classNames from 'classnames';
import platform from '@bxm/ui/lib/common/platform';
import ContentBody from '@bxm/ui/lib/markdown/components/contentBody';
import Ad from '@bxm/ad/src/google/components/ad';
import Footer from './footer';
import Header from './header';
import theme from '../helpers/theme';
import breakpoints from '../../breakpoints';

class Article extends Component {

    constructor(props, context) {
        super(props, context);
        if (canUseDOM) {
            platform.set(navigator.userAgent);
        }
    }

    render() {
        const {pageId, url, className, contentBody, credits, heroItem, source, summary, tags, title, themeClass} = this.props;
        const cssClass = classNames(`article`, className, themeClass);
        const sizes = {
            small: 'banner',
            banner: 'banner',
            leaderboard: 'leaderboard',
            railBanner: 'banner',
            railLeaderboard: 'leaderboard',
            xlarge: ['billboard', 'leaderboard']
        };

        return (
            <article className={cssClass}>
                <Ad
                    className="ad--article-top"
                    displayFor={['medium', 'large', 'xlarge']}
                    sizes={sizes}
                />
                <Header
                    pageId={pageId}
                    url={url}
                    heroItem={heroItem}
                    summary={summary}
                    title={title}
                />
                <ContentBody
                    body={contentBody}
                    breakpoints={breakpoints}
                    className="article__body article__body--top-border"
                />
                <Footer
                    credits={credits}
                    source={source}
                    tags={tags}
                />

                <Ad
                    className="ad--article-beneath-recommendations"
                    displayFor={['small', 'medium', 'large', 'xlarge']}
                    sizes={sizes}
                />
            </article>
        );
    }
}

Article.propTypes = {
    pageId: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    contentBody: PropTypes.array.isRequired,
    heroItem: PropTypes.object.isRequired,
    tags: PropTypes.array.isRequired,
    source: PropTypes.string,
    summary: PropTypes.string,
    credits: PropTypes.object,
    className: PropTypes.string,
    themeClass: PropTypes.string
};

export default theme(Article, 'source');
