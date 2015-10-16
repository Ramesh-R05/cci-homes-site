import React, {Component, PropTypes} from 'react';
import {canUseDOM} from 'react/lib/ExecutionEnvironment';
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

export default connectToStores(Section, [TagSectionStore, EntityStore, RequestStore], (stores) => {
    return {
        content: stores.EntityStore.getContent(),
        articles: stores.TagSectionStore.getItems(),
        moduleConfig: stores.TagSectionStore.getConfiguration(),
        paging: stores.TagSectionStore.getPaging(),
        currentPage: stores.TagSectionStore.getCurrentPage(),
        isLoading: stores.TagSectionStore.getIsLoading(),
        tags: stores.RequestStore.getTagLeaf()
    };
});
