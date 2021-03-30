import React, { Component } from 'react';

import Header from '@bxm/site-header';
import PropTypes from 'prop-types';
import { connectToStores } from '@bxm/flux';
import CheckHeaderTheme from '../helpers/checkHeaderTheme';
import ContentComponent from '../home/homeContent';
import HomeContentHeader from '../home/header';
import PageTemplate from '../templates/pageTemplate/PageTemplate';
import Renderer from '../templates/templateRenderer';
import SiteAlert from '../siteAlert';
import SiteFooter from '../site-footer';

export class HomePage extends Component {
    static propTypes = {
        content: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        siteAlert: PropTypes.object,
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
        siteAlert: {}
    };

    render() {
        const { headerNavItems, hamburgerNavItems, currentUrl, theme, siteAlert, content, contentErrorStatus, currentNavigateError } = this.props;

        const templateProps = {
            classModifier: 'home-page',
            hamburgerNavItems,
            headerNavItems,
            currentUrl,
            contentProps: { content },
            contentErrorStatus,
            currentNavigateError,
            withAdsWrapper: true,
            HeaderComponent: Header,
            ContentHeaderComponent: HomeContentHeader,
            ContentComponent,
            FooterComponent: SiteFooter,
            headerProps: {
                permanentlyFixedIfShorterThan: 49,
                theme,
                isExpanded: false,
                wrapperClassName: 'header',
                headerClassName: 'header__inner',
                SubHeaderComponent: siteAlert && siteAlert.isEnabled ? SiteAlert : null,
                subHeaderComponentProps: siteAlert && siteAlert.isEnabled ? siteAlert : {}
            }
        };

        return <Renderer Template={PageTemplate} templateProps={templateProps} />;
    }
}

export default connectToStores(CheckHeaderTheme(HomePage), ['PageStore', 'NavigationStore'], context => {
    const PageStore = context.getStore('PageStore');
    const NavigationStore = context.getStore('NavigationStore');

    return {
        content: PageStore.getContent(),
        theme: PageStore.getTheme(),
        siteAlert: PageStore.getSiteAlert(),
        contentErrorStatus: PageStore.getErrorStatus(),
        headerNavItems: NavigationStore.getHeaderItems(),
        hamburgerNavItems: NavigationStore.getHamburgerItems()
    };
});
