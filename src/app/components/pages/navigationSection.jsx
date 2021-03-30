import React, { Component } from 'react';

import Header from '@bxm/site-header';
import PropTypes from 'prop-types';
import { connectToStores } from '@bxm/flux';
import CheckHeaderTheme from '../helpers/checkHeaderTheme';
import NavSectionContent from '../section/navigationTag/section';
import PageTemplate from '../templates/pageTemplate/PageTemplate';
import Renderer from '../templates/templateRenderer';
import SectionHeader from '../section/header';
import SiteAlert from '../siteAlert';
import SiteFooter from '../site-footer';

export class NavigationSection extends Component {
    static propTypes = {
        content: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        siteAlert: PropTypes.object,
        contentErrorStatus: PropTypes.object,
        currentNavigateError: PropTypes.object,
        headerNavItems: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        hamburgerNavItems: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        currentUrl: PropTypes.string.isRequired,
        articles: PropTypes.arrayOf(PropTypes.object),
        galleries: PropTypes.array.isRequired,
        hero: PropTypes.object.isRequired,
        list: PropTypes.object,
        listNextParams: PropTypes.object.isRequired
    };

    static defaultProps = {
        articles: [],
        list: {},
        headerNavItems: [],
        hamburgerNavItems: [],
        siteAlert: {},
        contentErrorStatus: null,
        currentNavigateError: null
    };

    render() {
        const {
            headerNavItems,
            hamburgerNavItems,
            currentUrl,
            theme,
            siteAlert,
            content,
            contentErrorStatus,
            currentNavigateError,
            articles,
            galleries,
            hero,
            listNextParams,
            list
        } = this.props;

        const useContentTitle = content && content.nodeType === 'CommercialTagSection';

        const templateProps = {
            classModifier: 'navigation-section-page',
            hamburgerNavItems,
            headerNavItems,
            currentUrl,
            contentProps: { content, articles, galleries, hero, listNextParams, list },
            contentErrorStatus,
            currentNavigateError,
            useContentTitle,
            withAdsWrapper: true,
            HeaderComponent: Header,
            ContentHeaderComponent: SectionHeader,
            ContentComponent: NavSectionContent,
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

export default connectToStores(CheckHeaderTheme(NavigationSection), ['PageStore', 'NavigationStore'], context => {
    const PageStore = context.getStore('PageStore');
    const NavigationStore = context.getStore('NavigationStore');

    return {
        content: PageStore.getContent(),
        theme: PageStore.getTheme(),
        siteAlert: PageStore.getSiteAlert(),
        contentErrorStatus: PageStore.getErrorStatus(),
        headerNavItems: NavigationStore.getHeaderItems(),
        hamburgerNavItems: NavigationStore.getHamburgerItems(),
        articles: PageStore.getItems(),
        galleries: PageStore.getModuleItems('galleries'),
        list: PageStore.getList(),
        listNextParams: PageStore.getListNextParams(),
        hero: PageStore.getHeroItem()
    };
});
