import React, { Component } from 'react';

import HeaderComponent from '@bxm/site-header';
import PropTypes from 'prop-types';
import { connectToStores } from '@bxm/flux';
import CheckHeaderTheme from '../helpers/checkHeaderTheme';
import ContentComponent from '../section/sponsorTag/section';
import ContentHeaderComponent from '../section/header';
import FooterComponent from '../site-footer';
import PageTemplate from '../templates/pageTemplate/PageTemplate';
import Renderer from '../templates/templateRenderer';
import SiteAlert from '../siteAlert';

export class CampaignPage extends Component {
    static propTypes = {
        content: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        siteAlert: PropTypes.object,
        contentErrorStatus: PropTypes.object,
        currentNavigateError: PropTypes.object,
        headerNavItems: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        hamburgerNavItems: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        currentUrl: PropTypes.string.isRequired,
        articles: PropTypes.array.isRequired,
        list: PropTypes.object.isRequired,
        listNextParams: PropTypes.object.isRequired
    };

    static defaultProps = {
        headerNavItems: [],
        hamburgerNavItems: [],
        contentErrorStatus: null,
        currentNavigateError: null,
        siteAlert: {}
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
            list,
            listNextParams
        } = this.props;

        const templateProps = {
            classModifier: 'campaign-section-page',
            hamburgerNavItems,
            headerNavItems,
            currentUrl,
            contentProps: { content, articles, list, listNextParams },
            contentErrorStatus,
            currentNavigateError,
            withAdsWrapper: true,
            HeaderComponent,
            ContentHeaderComponent,
            ContentComponent,
            FooterComponent,
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

export default connectToStores(CheckHeaderTheme(CampaignPage), ['PageStore', 'NavigationStore'], context => {
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
        list: PageStore.getList(),
        listNextParams: PageStore.getListNextParams()
    };
});
