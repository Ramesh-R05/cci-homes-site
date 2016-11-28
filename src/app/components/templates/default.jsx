import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import PageStore from '../../stores/page';
import MenuStore from '../../stores/menu';
import NetworkHeader from '@bxm/header/lib/header/header';
import Header from '../header/header';
import Footer from '../footer/footer';
import SideMenu from '../side-menu/sideMenu';
import HomePageHandler from '../home/home';
import HomesArticleHandler from '../article/page';
import NavigationSectionHandler from '../section/navigationTag/section';
import TagSectionHandler from '../section/tag/section';
import BrandSectionHandler from '../brand/section';
import CampaignSectionHandler from '../section/sponsorTag/section';
import GalleryHandler from '@bxm/gallery/lib/components/page/gallery';
import ErrorHandlerBuilder from '../error/errorHandlerBuilder';
import cx from 'classnames';
import {load} from '@bxm/config';
const config = load();

class DefaultTemplate extends Component {

    static propTypes = {
        content: PropTypes.object,
        isSideMenuOpen: PropTypes.bool,
        headerNavItems: PropTypes.array,
        contentErrorStatus: PropTypes.object
    };

    static defaultProps = {
        content: null,
        isSideMenuOpen: false,
        headerNavItems: [],
        contentErrorStatus: null
    };

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired
    };

    constructor(...args) {
        super(...args);
    }

    componentDidMount() {
        // Temp added here due to unforseen update of versions when updating react.
        // This loads <picture> element in older browsers and IE
        require('picturefill');
    }

    render() {
        const {Handler, hideNetworkHeader, hideFooter, hideHeader, isExpanded} = this.getPageMetadata();
        const localeData = config.get('localeData');
        const menuSliderClassName = cx('side-menu-slider', {
            'side-menu-slider--side-menu-open': this.props.isSideMenuOpen
        });

        return (
            <div className="default-template">
                <div className={cx('global-header-slider', menuSliderClassName)}>
                    {hideNetworkHeader ? null : <NetworkHeader/>}
                </div>
                {hideHeader ? null :
                    <Header
                        isExpanded={isExpanded}
                        isSideMenuOpen={this.props.isSideMenuOpen}
                        navItems={this.props.headerNavItems}
                    />
                }
                <SideMenu
                    open={this.props.isSideMenuOpen}
                    navItems={this.props.headerNavItems}
                    data={localeData}
                />
                <Handler
                    content={this.props.content}
                    isSideMenuOpen={this.props.isSideMenuOpen}
                />
                {hideFooter ? null : <Footer config={localeData} />}
            </div>
        );
    }

    getPageMetadata() {
        // Error cases
        if (this.props.contentErrorStatus) {
            return this.handleContentError(this.props.contentErrorStatus);
        } else if (!this.props.content) {
            return this.handleNoContent();
        }

        switch (this.props.content.nodeType) {
            case 'Homepage':
                return {
                    Handler: HomePageHandler,
                    isExpanded: true
                };
            case 'HomesArticle':
                return {
                    Handler: HomesArticleHandler,
                    hideFooter: true
                };
            case 'NavigationSection':
                return {
                    Handler: NavigationSectionHandler
                };
            case 'TagSection':
                return {
                    Handler: TagSectionHandler
                };
            case 'BrandSection':
                return {
                    Handler: BrandSectionHandler
                };
            case 'Campaign':
                return {
                    Handler: CampaignSectionHandler
                };
            case 'Gallery':
                return {
                    Handler: GalleryHandler,
                    hideNetworkHeader: true,
                    hideHeader: true,
                    hideFooter: true
                };
            default:
                console.error({message: `Unsupported nodeType (${this.props.content.nodeType})`});
                return this.handleNoContent();
        }
    }

    handleNoContent() {
        return {
            Handler: ErrorHandlerBuilder(500)
        };
    }

    handleContentError(errorStatus) {
        return {
            Handler: ErrorHandlerBuilder(errorStatus.status) || ErrorHandlerBuilder(500)
        };
    }
}

export default connectToStores(DefaultTemplate, ['AppStore', PageStore, MenuStore], (context) => {

    //START********************************
    //NOTE: this is a temporary fix until ALL pages (tag, nav tag, brand, article, gallery) are available via the BFF.
    let headerNavItems = context.getStore('AppStore').getHeaderItems();

    if(!headerNavItems || headerNavItems.length === 0)
        headerNavItems = getNavItems();

    function getNavItems() {
        return [
            { name: 'Home tours', url: '/home-tours' },
            { name: 'Interiors', url: '/interiors' },
            { name: 'Outdoor', url: '/outdoor' },
            { name: 'Renovate', url: '/renovate' },
            { name: 'My Ideal House', url: '/my-ideal-house' }
        ];
    }
    //*******************************END

    return {
        content: context.getStore(PageStore).getContent(),
        contentErrorStatus: context.getStore(PageStore).getErrorStatus(),
        isSideMenuOpen: context.getStore(MenuStore).isSideMenuOpen(),
        headerNavItems: headerNavItems
    };
});
