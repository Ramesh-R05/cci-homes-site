import React, {Component, PropTypes} from 'react';
import {canUseDOM} from 'exenv';
import {connectToStores} from '@bxm/flux';
import isUndefined from 'lodash/lang/isUndefined';
import * as FacetedModuleActions from '../../../actions/facetedModule';
import * as TagUtils from '@bxm/tags/lib/utils';
import CustomInlineGallery from '../../inlineGallery/customInlineGallery';
import GenericSection from '../section';

class Section extends Component {

    static displayName = 'NavigationTagSection';

    static contextTypes = {
        config: PropTypes.object,
        getStore: PropTypes.func
    };

    static propTypes = {
        articles: PropTypes.arrayOf(PropTypes.object).isRequired,
        content: PropTypes.object.isRequired,
        galleries: PropTypes.array,
        isSideMenuOpen: PropTypes.bool,
        tags: PropTypes.array.isRequired
    };

    static defaultProps = {
        articles: [],
        galleries: [],
        isSideMenuOpen: false,
        tags: []
    };

    constructor(...args) {
        super(...args);
        this.nbLoadMoreClicks = 0;
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
            />
        );
    }
}

export default connectToStores(Section, ['AppStore'], (context) => {
    return {
        content: context.getStore('AppStore').getContent(),
        articles: context.getStore('AppStore').getItems(),
        galleries: context.getStore('AppStore').getModuleItems('galleries'),
        list: context.getStore('AppStore').getList(),
        listNextParams: context.getStore('AppStore').getListNextParams(),
        tags: context.getStore('AppStore').getNavigationTags()
    };
});
