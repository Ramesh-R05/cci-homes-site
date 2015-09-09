import React, {Component, PropTypes} from 'react';
import {canUseDOM} from 'react/lib/ExecutionEnvironment';
import {connectToStores} from '@bxm/flux';
import isUndefined from 'lodash/lang/isUndefined';
import EntityStore from '../../../stores/entity';
import GalleryOfGalleriesStore from '../../../stores/facetedStores/galleryOfGalleries';
import TaggedArticlesStore from '../../../stores/facetedStores/taggedArticles';
import * as FacetedModuleActions from '../../../actions/facetedModule';
import * as TagUtils from '@bxm/tags/lib/utils';
import CustomInlineGallery from '../../inlineGallery/customInlineGallery';
import GenericSection from '../section';

class Section extends Component {

    static displayName = 'NavigationTagSection';

    static contextTypes = {
        config: PropTypes.object,
        executeAction: PropTypes.func,
        getStore: PropTypes.func
    };

    static propTypes = {
        articles: PropTypes.array.isRequired,
        content: PropTypes.object.isRequired,
        currentPage: PropTypes.number.isRequired,
        galleries: PropTypes.array,
        galleriesModuleConfig: PropTypes.any,
        isLoading: PropTypes.bool.isRequired,
        isSideMenuOpen: PropTypes.bool,
        moduleConfig: PropTypes.object,
        paging: PropTypes.object.isRequired,
        tags: PropTypes.array.isRequired
    };

    static defaultProps = {
        articles: [],
        currentPage: 0,
        galleries: [],
        isSideMenuOpen: false,
        moduleConfig: {},
        paging: {
            pages: 0,
            isLoading: false
        },
        tags: []
    };

    constructor(...args) {
        super(...args);
        this.nbLoadMoreClicks = 0;
    }

    getAsyncData() {
        const page = this.props.currentPage ? this.props.currentPage : 0;

        this.context.executeAction(FacetedModuleActions.getPage, {
            params: {
                page: page,
                tags: this.props.tags
            },
            moduleConfig: this.props.moduleConfig
        });

        this.context.executeAction(FacetedModuleActions.getPage, {
            params: {
                page: 0,
                tags: this.props.tags
            },
            moduleConfig: this.props.galleriesModuleConfig
        });
    }

    componentWillMount() {
        if (!canUseDOM) this.getAsyncData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentPage !== this.props.currentPage) {
            this.nbLoadMoreClicks++;
            this.getAsyncData();
        }
    }

    render() {
        const {tags} = this.props;
        let inlineGalleries;
        let sectionTitle;

        if (!isUndefined(tags) && Array.isArray(tags) && tags.length) {
            sectionTitle = TagUtils.getTagName(tags[0]).toLowerCase();
        }

        if (sectionTitle && sectionTitle !== 'renovate') {
            inlineGalleries = <CustomInlineGallery galleries={this.props.galleries}/>;
        }

        return (
            <GenericSection
                {...this.props}
                inlineGalleries={inlineGalleries}
                pagination={this.context.config.pagination}
                nbLoadMoreClicks={this.nbLoadMoreClicks}
            />
        );
    }
}

export default connectToStores(Section, [EntityStore, GalleryOfGalleriesStore, TaggedArticlesStore], (stores) => {
    return {
        content: stores.EntityStore.getContent(),
        articles: stores.TaggedArticlesStore.getItems(),
        galleriesModuleConfig: stores.GalleryOfGalleriesStore.getConfiguration(),
        galleries: stores.GalleryOfGalleriesStore.getItems(),
        moduleConfig: stores.TaggedArticlesStore.getConfiguration(),
        tags: stores.EntityStore.getNavigationTags(),
        paging: stores.TaggedArticlesStore.getPaging(),
        currentPage: stores.TaggedArticlesStore.getCurrentPage(),
        isLoading: stores.TaggedArticlesStore.getIsLoading()
    };
});
