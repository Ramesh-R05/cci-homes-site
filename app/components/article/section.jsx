import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import cx from 'classnames';
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
        feedItems: PropTypes.array.isRequired,
        isSideMenuOpen: PropTypes.bool
    };

    static contextTypes = {
        getStore: PropTypes.func,
        executeAction: PropTypes.func
    };

    static defaultProps = {
        feedItems: [],
        isSideMenuOpen: false
    };

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        const tags = this.props.content.tags;
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
        const {content} = this.props;
        const heroItem = this.getHero();

        const menuSliderClassName = cx('side-menu-slider', {
            'side-menu-slider--side-menu-open': this.props.isSideMenuOpen
        });

        return (
            <div>
                <div className={`article-section main-wrapper container row ${menuSliderClassName}`}>
                    <Article
                        title={this.props.title}
                        heroItem={heroItem}
                        contentBody={content.body}
                        imageUrl={content.imageUrl}
                        source={content.source}
                        summary={content.summary}
                        tags={content.tags}
                        authorProfiles={content.authorProfiles}
                        nodeType={this.props.nodeType}
                        pageId={content.id}
                        dateCreated={content.dateCreated}
                        url={content.url}
                    />
                </div>

                <div className="article-feed-container container row">
                    <Feed
                        items={this.props.feedItems}
                        pageId={content.id}
                        tags={content.tags}
                        source={content.source}
                        isSideMenuOpen={this.props.isSideMenuOpen}
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
