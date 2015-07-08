import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import EntityStore from '../../stores/entity';
import FeedStore from '../../stores/facetedStores/feed';
import Article from './article';
import Feed from '../feed/feed';
import {getTagsForCategory} from '../../utils/tagUtils';
import * as FacetedModuleActions from '../../actions/facetedModule';

class Section extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        const tags = this.props.content.articleTags;
        const navigationTags = getTagsForCategory(tags, 'Homes navigation');
        this.context.executeAction(FacetedModuleActions.getPage, {
            page: 0,
            params: { tags: navigationTags },
            moduleConfig: this.props.feedModuleConfig
        });
    }

    render() {
        const {title, content, feedItems} = this.props;
        // Hero data
        const {id: pageId, articleTags} = content;
        const {imageUrl, imageAltText, imageCaption, video} = content;
        const heroItem = {imageUrl, imageAltText, imageCaption, video};
        // Article data
        const {body, source, summary} = content;
        //url
        const {url} = content;


        // TODO (thatzi): strings set temporary until credits are set up in CMS
        const credits = {
            writer: 'John Doe',
            photographer: 'Julia Smith',
            stylist: 'Julie Brooks',
            experter: 'Andrew White'
        };

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
                        credits={credits}
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

Section.propTypes = {
    content: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    nodeType: PropTypes.string,
    feedModuleConfig: PropTypes.any,
    feedItems: PropTypes.array.isRequired
};

Section.contextTypes = {
    getStore: PropTypes.func,
    executeAction: PropTypes.func
};

Section.defaultProps = {
    feedItems: []
};

export default connectToStores(Section, [EntityStore, FeedStore], (stores) => {
    return {
        content: stores.EntityStore.getContent(),
        title: stores.EntityStore.getTitle(),
        feedModuleConfig: stores.FeedStore.getConfiguration(),
        feedItems: stores.FeedStore.getItems()
    };
});
