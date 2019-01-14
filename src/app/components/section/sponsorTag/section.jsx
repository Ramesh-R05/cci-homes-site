import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connectToStores } from '@bxm/flux';
import GenericSection from '../section';

class Section extends Component {
    static displayName = 'SponsorTagSection';

    static contextTypes = {
        config: PropTypes.object,
        executeAction: PropTypes.func,
        getStore: PropTypes.func
    };

    static propTypes = {
        articles: PropTypes.array,
        content: PropTypes.object.isRequired
    };

    static defaultProps = {
        articles: []
    };

    render() {
        return <GenericSection {...this.props} />;
    }
}

export default connectToStores(Section, ['PageStore'], context => {
    const { getStore } = context;
    const pageStore = getStore('PageStore');

    return {
        articles: pageStore.getItems(),
        content: pageStore.getContent(),
        list: pageStore.getList(),
        listNextParams: pageStore.getListNextParams()
    };
});
