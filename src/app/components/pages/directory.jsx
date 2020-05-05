import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connectToStores } from '@bxm/flux';
import DirectoryFooter from '../listings/components/listingFooter';
import DirectoryHeader from '../listings/components/DirectoryHeader';
import DirectoryNodeTypeCheck from '../helpers/directoryNodeTypeCheck';
import PageTemplate from '../templates/pageTemplate/PageTemplate';
import Renderer from '../templates/templateRenderer';

export class DirectoryPage extends Component {
    static propTypes = {
        classModifier: PropTypes.string.isRequired,
        content: PropTypes.object.isRequired,
        ContentComponent: PropTypes.func.isRequired,
        listingCategories: PropTypes.array.isRequired,
        theme: PropTypes.shape({
            headerSmallBackground: PropTypes.string,
            headerMediumBackground: PropTypes.string,
            headerLargeBackground: PropTypes.string,
            headerLogoAlignment: PropTypes.string,
            headerLogoColour: PropTypes.string,
            themeAlignment: PropTypes.string,
            themeColour: PropTypes.string,
            themeImage: PropTypes.string
        }),
        contentErrorStatus: PropTypes.object,
        currentNavigateError: PropTypes.object,
        headerNavItems: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        hamburgerNavItems: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        currentUrl: PropTypes.string.isRequired
    };

    static defaultProps = {
        headerNavItems: [],
        hamburgerNavItems: [],
        contentErrorStatus: null,
        currentNavigateError: null,
        theme: null
    };

    render() {
        const {
            headerNavItems,
            hamburgerNavItems,
            currentUrl,
            content,
            contentErrorStatus,
            currentNavigateError,
            ContentComponent,
            classModifier,
            listingCategories
        } = this.props;

        const templateProps = {
            classModifier,
            hamburgerNavItems,
            headerNavItems,
            currentUrl,
            ContentComponent,
            contentProps: { content },
            contentErrorStatus,
            currentNavigateError,
            withAdsWrapper: false,
            HeaderComponent: DirectoryHeader,
            FooterComponent: DirectoryFooter,
            footerProps: {
                categories: listingCategories
            },
            headerProps: {
                permanentlyFixedIfShorterThan: 49,
                theme: {},
                isExpanded: false,
                wrapperClassName: 'header',
                headerClassName: 'header__inner',
                content
            }
        };

        return <Renderer Template={PageTemplate} templateProps={templateProps} />;
    }
}

export default connectToStores(DirectoryNodeTypeCheck(DirectoryPage), ['PageStore', 'DirectoryStore', 'NavigationStore'], context => {
    const DirectoryStore = context.getStore('DirectoryStore');

    return {
        content: DirectoryStore.getContent(),
        contentErrorStatus: DirectoryStore.getErrorStatus(),
        headerNavItems: DirectoryStore.getHeaderItems(),
        hamburgerNavItems: DirectoryStore.getHamburgerItems(),
        listingCategories: DirectoryStore.getCategoriesItems()
    };
});
