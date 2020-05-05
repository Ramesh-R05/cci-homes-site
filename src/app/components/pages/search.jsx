import React, { Component } from 'react';

import Header from '@bxm/site-header';
import PropTypes from 'prop-types';
import { connectToStores } from '@bxm/flux';
import CheckHeaderTheme from '../helpers/checkHeaderTheme';
import ContentComponent from '../search/searchContent';
import PageTemplate from '../templates/pageTemplate/PageTemplate';
import Renderer from '../templates/templateRenderer';
import SearchContentHeader from '../section/header';
import SiteAlert from '../siteAlert';
import SiteFooter from '../site-footer';

export class SearchResultsPage extends Component {
    static propTypes = {
        articles: PropTypes.array,
        content: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        siteAlert: PropTypes.object,
        list: PropTypes.object,
        listNextParams: PropTypes.object.isRequired,
        contentErrorStatus: PropTypes.object,
        currentNavigateError: PropTypes.shape({
            statusCode: PropTypes.number.isRequired
        }),
        headerNavItems: PropTypes.array,
        hamburgerNavItems: PropTypes.array,
        title: PropTypes.string.isRequired,
        searchTotal: PropTypes.number.isRequired,
        currentUrl: PropTypes.string.isRequired
    };

    static defaultProps = {
        articles: [],
        list: {},
        siteAlert: {},
        contentErrorStatus: null,
        currentNavigateError: null,
        headerNavItems: [],
        hamburgerNavItems: []
    };

    render() {
        const {
            headerNavItems,
            hamburgerNavItems,
            currentUrl,
            content,
            siteAlert,
            searchTotal,
            title,
            contentErrorStatus,
            currentNavigateError,
            theme,
            list,
            listNextParams,
            articles
        } = this.props;

        const templateProps = {
            classModifier: 'search-results-page',
            hamburgerNavItems,
            headerNavItems,
            currentUrl,
            contentProps: { content, list, listNextParams, articles },
            contentErrorStatus,
            currentNavigateError,
            withAdsWrapper: true,
            HeaderComponent: Header,
            ContentHeaderComponent: SearchContentHeader,
            ContentComponent,
            FooterComponent: SiteFooter,
            headerProps: {
                permanentlyFixedIfShorterThan: 49,
                theme,
                isExpanded: true,
                wrapperClassName: 'header',
                headerClassName: 'header__inner',
                SubHeaderComponent: siteAlert && siteAlert.isEnabled ? SiteAlert : null,
                subHeaderComponentProps: siteAlert && siteAlert.isEnabled ? siteAlert : {}
            },
            contentHeaderProps: {
                title: `${searchTotal} ${title} results`,
                splitTitle: false
            }
        };

        return <Renderer Template={PageTemplate} templateProps={templateProps} />;
    }
}

export default connectToStores(CheckHeaderTheme(SearchResultsPage), ['SearchStore', 'NavigationStore', 'PageStore'], context => {
    const searchStore = context.getStore('SearchStore');
    const navigationStore = context.getStore('NavigationStore');
    const PageStore = context.getStore('PageStore');

    return {
        title: searchStore.getTitle(),
        siteAlert: PageStore.getSiteAlert(),
        listNextParams: searchStore.getSearchListNextParams(),
        searchTotal: searchStore.getSearchTotal(),
        articles: searchStore.getInitialSearchResults(),
        list: searchStore.getSearchResultsList(),
        content: { nodeType: 'search' },
        headerNavItems: navigationStore.getHeaderItems(),
        hamburgerNavItems: navigationStore.getHamburgerItems(),
        contentErrorStatus: searchStore.getErrorStatus()
    };
});
