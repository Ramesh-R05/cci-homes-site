import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '@bxm/site-header';
import { connectToStores } from '@bxm/flux';
import PageTemplate from '../templates/pageTemplate/PageTemplate';
import Renderer from '../templates/templateRenderer';
import HomeContentHeader from '../home/header';
import ContentComponent from '../home/homeContent';
import SiteFooter from '../site-footer';
import CheckHeaderTheme from '../helpers/checkHeaderTheme';

export class HomePage extends Component {
    static propTypes = {
        content: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
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
        currentNavigateError: null
    };

    render() {
        const { headerNavItems, hamburgerNavItems, currentUrl, theme, content, contentErrorStatus, currentNavigateError } = this.props;

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
                isExpanded: true,
                wrapperClassName: 'header',
                headerClassName: 'header__inner'
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
        contentErrorStatus: PageStore.getErrorStatus(),
        headerNavItems: NavigationStore.getHeaderItems(),
        hamburgerNavItems: NavigationStore.getHamburgerItems()
    };
});
