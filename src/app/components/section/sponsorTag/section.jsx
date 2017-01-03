import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import GenericSection from '../section';
import SponsorArticlesStore from '../../../stores/sponsor';
import PageStore from '../../../stores/page';
import TaggedArticlesStore from '../../../stores/facetedStores/taggedArticles';

class Section extends Component {
    static displayName = 'SponsorTagSection';

    static contextTypes = {
        config: PropTypes.object,
        executeAction: PropTypes.func,
        getStore: PropTypes.func
    };

    static propTypes = {
        articles: PropTypes.array.isRequired,
        isSideMenuOpen: PropTypes.bool,
        moduleConfig: PropTypes.object,
        content: PropTypes.object.isRequired
    };

    static defaultProps = {
        articles: [],
        isSideMenuOpen: false,
        moduleConfig: {}
    };

    constructor(...args) {
        super(...args);
    }

    render() {
        return (<GenericSection
                {...this.props}
                isLoading={false}
                nbLoadMoreClicks={0}
            />
        );
    }
}

export default connectToStores(Section, [PageStore, SponsorArticlesStore, TaggedArticlesStore], (context) => {
    return {
        articles: context.getStore(SponsorArticlesStore).getItems(),
        moduleConfig: context.getStore(TaggedArticlesStore).getConfiguration(),
        content: context.getStore(PageStore).getContent()
    };
});
