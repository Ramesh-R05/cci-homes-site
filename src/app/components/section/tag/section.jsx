import React, { Component, PropTypes } from 'react';
import { connectToStores } from '@bxm/flux';
import GenericSection from '../section';

class Section extends Component {

    static displayName = 'TagSection';

    static propTypes = {
        articles: PropTypes.array.isRequired,
        content: PropTypes.object.isRequired,
        isSideMenuOpen: PropTypes.bool,
        navigationTags: PropTypes.array.isRequired
    };

    static defaultProps = {
        articles: [],
        isSideMenuOpen: false,
        navigationTags: []
    };

    constructor() {
        super();
    }

    render() {
        return (
            <GenericSection
              {...this.props}
            />
        );
    }
}

export default connectToStores(Section, ['PageStore'], (context) => {
    const pageStore = context.getStore('PageStore');

    return {
        content: pageStore.getContent(),
        articles: pageStore.getItems(),
        list: pageStore.getList(),
        listNextParams: pageStore.getListNextParams()
    };
});
