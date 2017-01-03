import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import CustomInlineGallery from '../../inlineGallery/customInlineGallery';
import GenericSection from '../section';

class Section extends Component {

    static displayName = 'NavigationTagSection';

    static propTypes = {
        articles: PropTypes.arrayOf(PropTypes.object).isRequired,
        content: PropTypes.object.isRequired,
        galleries: PropTypes.array,
        isSideMenuOpen: PropTypes.bool
    };

    static defaultProps = {
        articles: [],
        galleries: [],
        isSideMenuOpen: false
    };

    constructor() {
        super();
    }

    render() {
        const inlineGalleries = <CustomInlineGallery galleries={this.props.galleries}/>;

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
        listNextParams: context.getStore('AppStore').getListNextParams()
    };
});
