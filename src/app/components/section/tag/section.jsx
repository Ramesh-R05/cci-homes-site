import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import RequestStore from '../../../stores/request';
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
        moduleConfig: {},
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

export default connectToStores(Section, ['AppStore'], (context) => {
    return {
        content: context.getStore('AppStore').getContent(),
        articles: context.getStore('AppStore').getItems(),
        list: context.getStore('AppStore').getList(),
        listNextParams: context.getStore('AppStore').getListNextParams()
    };
});
