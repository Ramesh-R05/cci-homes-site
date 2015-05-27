import React, {Component, PropTypes} from 'react';
import {canUseDOM} from 'react/lib/ExecutionEnvironment';
import classNames from 'classnames';
import platform from '@bxm/ui/lib/common/platform';
import ContentBody from '@bxm/ui/lib/markdown/components/contentBody';
import Footer from './footer';
import Header from './header';
import breakpoints from '../../breakpoints';

class Article extends Component {

    constructor(props, context) {
        super(props, context);

        if (canUseDOM) {
            platform.set(navigator.userAgent);
        }
    }

    render() {
        const {className, contentBody, credits, heroItem, source, summary, tags, title} = this.props;
        const cssClass = classNames(`article`, className);

        return (
            <article className={cssClass}>
                <Header
                    heroItem={heroItem}
                    summary={summary}
                    title={title}/>
                <ContentBody
                    body={contentBody}
                    breakpoints={breakpoints}
                    className="article__body article__body--top-border"/>
                <Footer
                    credits={credits}
                    source={source}
                    tags={tags}/>
            </article>
        );
    }
}

Article.propTypes = {
    title: PropTypes.string.isRequired,
    contentBody: PropTypes.array.isRequired,
    heroItem: PropTypes.object.isRequired,
    tags: PropTypes.array.isRequired,
    source: PropTypes.string,
    summary: PropTypes.string,
    credits: PropTypes.object,
    className: PropTypes.string
};

export default Article;
