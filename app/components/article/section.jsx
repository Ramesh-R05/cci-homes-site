import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import EntityStore from '../../stores/entity';
import FeedStore from '../../stores/facetedStores/feed';
import Article from './article';
import Feed from '../feed/feed';
import {getCategoryFirstTag} from '../../utils/tagUtils';
import * as FacetedModuleActions from '../../actions/facetedModule';

class Section extends Component {

    static propTypes = {
        content: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        nodeType: PropTypes.string,
        feedModuleConfig: PropTypes.any,
        feedItems: PropTypes.array.isRequired
    };

    static contextTypes = {
        getStore: PropTypes.func,
        executeAction: PropTypes.func
    };

    static defaultProps = {
        feedItems: []
    };

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        const tags = this.props.content.articleTags;
        const navigationTag = getCategoryFirstTag(tags, 'Homes navigation');
        this.context.executeAction(FacetedModuleActions.getPage, {
            page: 0,
            params: { tags: [navigationTag] },
            moduleConfig: this.props.feedModuleConfig
        });
    }

    getHero() {
        const { imageUrl, imageAltText, imageCaption, video } = this.props.content;
        return { imageUrl, imageAltText, imageCaption, video };
    }

    render() {
        const {title, content, feedItems} = this.props;
        const {id: pageId, articleTags, body, source, summary, url, authorProfiles} = content;
        const heroItem = this.getHero();

        return (
            <div>
                <div className="main-wrapper article-section container row">
                    <Article
                        title={title}
                        heroItem={heroItem}
                        contentBody={body}
                        source={source}
                        summary={summary}
                        tags={articleTags}
                        authorProfiles={authorProfiles}
                        pageId={pageId}
                        url={url}
                    />

                    <Feed
                        items={feedItems}
                        pageId={pageId}
                        articleTags={articleTags}
                        source={source}
                    />
                </div>
            </div>
        );
    }

}

export default connectToStores(Section, [EntityStore, FeedStore], (stores) => {
    return {
        content: stores.EntityStore.getContent(),
        title: stores.EntityStore.getTitle(),
        feedModuleConfig: stores.FeedStore.getConfiguration(),
        feedItems: stores.FeedStore.getItems()
    };
});
