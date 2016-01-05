import React, {Component, PropTypes} from 'react';
import {canUseDOM} from 'exenv';
import {connectToStores} from '@bxm/flux';
import EntityStore from '../../../stores/entity';
import RequestStore from '../../../stores/request';
import TagSectionStore from '../../../stores/facetedStores/tagSection';
import * as FacetedModuleActions from '../../../actions/facetedModule';
import GenericSection from '../section';

class Section extends Component {

    static displayName = 'TagSection';

    static contextTypes = {
        config: PropTypes.object,
        executeAction: PropTypes.func,
        getStore: PropTypes.func
    };

    static propTypes = {
        articles: PropTypes.array.isRequired,
        content: PropTypes.object.isRequired,
        currentPage: PropTypes.number.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isSideMenuOpen: PropTypes.bool,
        moduleConfig: PropTypes.object,
        navigationTags: PropTypes.array.isRequired,
        paging: PropTypes.object.isRequired,
        tags: PropTypes.array
    };

    static defaultProps = {
        articles: [],
        currentPage: 0,
        isSideMenuOpen: false,
        moduleConfig: {},
        navigationTags: [],
        paging: {
            pages: 0,
            isLoading: false
        }

    };

    constructor(...args) {
        super(...args);
        this.nbLoadMoreClicks = 0;
    }

    getAsyncData() {
        const page = this.props.currentPage ? this.props.currentPage : 0;
        const params = {
            page: page,
            tags: this.props.tags
        };

        this.context.executeAction(FacetedModuleActions.getPage, {
            params: params,
            moduleConfig: this.props.moduleConfig
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
        const tags = this.props.tags.map((tag) => tag.replace(/-/g, ' '));

        return (
            <GenericSection
                {...this.props}
                pagination={this.context.config.pagination}
                nbLoadMoreClicks={this.nbLoadMoreClicks}
                tags={tags}
            />
        );
    }
}

export default connectToStores(Section, [TagSectionStore, EntityStore, RequestStore], (context) => {
    return {
        content: context.getStore(EntityStore).getContent(),
        articles: context.getStore(TagSectionStore).getItems(),
        moduleConfig: context.getStore(TagSectionStore).getConfiguration(),
        paging: context.getStore(TagSectionStore).getPaging(),
        currentPage: context.getStore(TagSectionStore).getCurrentPage(),
        isLoading: context.getStore(TagSectionStore).getIsLoading(),
        tags: context.getStore(RequestStore).getTagLeaf()
    };
});
