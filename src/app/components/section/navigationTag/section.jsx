import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connectToStores } from '@bxm/flux';
import GenericSection from '../section';

class Section extends Component {
    static displayName = 'NavigationTagSection';

    static propTypes = {
        articles: PropTypes.arrayOf(PropTypes.object),
        content: PropTypes.object.isRequired,
        galleries: PropTypes.array,
        hero: PropTypes.object
    };

    static defaultProps = {
        articles: [],
        galleries: [],
        hero: {}
    };

    render() {
        return <GenericSection {...this.props} />;
    }
}

export default connectToStores(Section, ['PageStore'], context => {
    const pageStore = context.getStore('PageStore');

    return {
        content: pageStore.getContent(),
        articles: pageStore.getItems(),
        galleries: pageStore.getModuleItems('galleries'),
        list: pageStore.getList(),
        listNextParams: pageStore.getListNextParams(),
        hero: pageStore.getHeroItem()
    };
});
