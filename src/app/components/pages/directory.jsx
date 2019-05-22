import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '@bxm/site-header';
import { connectToStores } from '@bxm/flux';
import PageTemplate from '../templates/pageTemplate/PageTemplate';
import Renderer from '../templates/templateRenderer';
import DirectoryFooter from '../listings/components/listingFooter';
import DirectoryNodeTypeCheck from '../helpers/directoryNodeTypeCheck';

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
            HeaderComponent: Header,
            FooterComponent: DirectoryFooter,
            footerProps: {
                categories: listingCategories
            },
            headerProps: {
                permanentlyFixedIfShorterThan: 49,
                theme: {},
                isExpanded: true,
                wrapperClassName: 'header',
                headerClassName: 'header__inner'
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
